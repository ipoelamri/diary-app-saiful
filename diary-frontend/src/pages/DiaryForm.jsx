import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DiaryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    date: "",
    title: "",
    detail: "",
    image: null, // Tambahkan state untuk gambar
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/diaries/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setData({
            date: res.data.date,
            title: res.data.title,
            detail: res.data.detail,
            image: null, // Reset file input saat fetch data
          });

          // Jika ada gambar yang sudah tersimpan, tampilkan preview
          if (res.data.image) {
            setPreviewImage(`http://localhost:8000/storage/${res.data.image}`);
          }
        })
        .catch((err) => console.error("Error fetching diary:", err));
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("title", data.title);
    formData.append("detail", data.detail);

    if (data.image) {
      formData.append("image", data.image);
    }

    // Jika sedang update, tambahkan _method=PUT karena Laravel tidak menerima multipart dengan PUT
    if (id) {
      formData.append("_method", "PUT");
    }

    try {
      const url = id
        ? `http://localhost:8000/api/diaries/${id}`
        : "http://localhost:8000/api/diaries";
      const method = id ? "post" : "post";

      await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/diaries");
    } catch (err) {
      console.error("Error saving diary:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Edit Diary" : "Tambah Diary"}
        </h2>

        <label className="block font-medium mb-1">Tanggal</label>
        <input
          type="date"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block font-medium mb-1">Judul</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block font-medium mb-1">Detail</label>
        <textarea
          value={data.detail}
          onChange={(e) => setData({ ...data, detail: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          rows="4"
          required
        ></textarea>

        {previewImage && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">Gambar saat ini:</p>
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mt-2"
            />
          </div>
        )}

        <label className="block font-medium mb-1">Upload Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
        >
          {id ? "Update" : "Simpan"}
        </button>
      </form>
    </div>
  );
}
