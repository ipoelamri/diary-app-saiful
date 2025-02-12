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
        // Validasi request
        $request->validate([
            'date' => 'required|date',
            'title' => 'required|string',
            'detail' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048', // Validasi gambar
        ]);

        // Cek apakah ada file gambar
        if ($request->hasFile('image')) {
            // Simpan gambar ke storage dan ambil path-nya
            $imagePath = $request->file('image')->store('diary_images', 'public'); // Simpan di storage/app/public/diary_images
        } else {
            $imagePath = null; // Jika tidak ada gambar, set null
        }

        // Simpan data diary ke database
        $diary = Diary::create([
            'user_id' => auth()->id(),
            'date' => $request->date,
            'title' => $request->title,
            'detail' => $request->detail,
            'image' => $imagePath, // Simpan path gambar di kolom image
        ]);

        // Cek log jika gambar berhasil disimpan
        Log::info('Diary created with image:', ['image_path' => $imagePath]);

        // Kembalikan response dengan URL gambar
        return response()->json([
            'diary' => [
                'id' => $diary->id,
                'user_id' => $diary->user_id,
                'date' => $diary->date,
                'title' => $diary->title,
                'detail' => $diary->detail,
                'image' => $diary->image ? asset('storage/' . $diary->image) : null, // Menampilkan URL gambar
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
