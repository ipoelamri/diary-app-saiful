<?php

namespace App\Http\Controllers;

use App\Models\Diary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DiaryController extends Controller
{
    public function index()
    {
        return response()->json(auth()->user()->diaries);
    }





    public function store(Request $request)
    {

        $request->validate([
            'date' => 'required|date',
            'title' => 'required|string',
            'detail' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        if ($request->hasFile('image')) {

            $imagePath = $request->file('image')->store('diary_images', 'public');
        } else {
            $imagePath = null;
        }


        $diary = Diary::create([
            'user_id' => auth()->id(),
            'date' => $request->date,
            'title' => $request->title,
            'detail' => $request->detail,
            'image' => $imagePath,
            8888
        ]);


        Log::info('Diary created with image:', ['image_path' => $imagePath]);


        return response()->json([
            'diary' => [
                'id' => $diary->id,
                'user_id' => $diary->user_id,
                'date' => $diary->date,
                'title' => $diary->title,
                'detail' => $diary->detail,
                'image' => $diary->image ? asset('storage/' . $diary->image) : null,
                'created_at' => $diary->created_at,
                'updated_at' => $diary->updated_at,
            ]
        ], 201);
    }





    public function show(Diary $diary)
    {
        if ($diary->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($diary);
    }

    public function update(Request $request, Diary $diary)
    {
        if ($diary->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'date' => 'required|date',
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        // Perbarui data kecuali gambar
        $diary->update($request->only(['date', 'title', 'detail']));

        // Jika ada file gambar baru, hapus gambar lama dan simpan yang baru
        if ($request->hasFile('image')) {
            if ($diary->image) {
                Storage::delete('public/' . $diary->image);
            }
            $diary->image = $request->file('image')->store('diary_images', 'public');
            $diary->save();
        }

        return response()->json($diary);
    }

    public function destroy(Diary $diary)
    {
        if ($diary->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        Storage::delete('public/' . $diary->image);
        $diary->delete();

        return response()->json(['message' => 'Diary deleted']);
    }
}
