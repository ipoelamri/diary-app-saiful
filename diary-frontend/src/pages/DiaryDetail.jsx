import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DiaryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/diaries/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setDiary(res.data))
      .catch(() => navigate("/diaries")); // Redirect jika data tidak ditemukan
  }, [id, navigate]);

  if (!diary) return <p className="text-center mt-10">Memuat...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => navigate("/diaries")}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        Kembali
      </button>
      <h2 className="text-3xl font-bold mb-2">{diary.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{diary.date}</p>
      {diary.image && (
        <img
          src={`http://localhost:8000/storage/${diary.image}`}
          alt={diary.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      <p className="text-lg">{diary.detail}</p>
    </div>
  );
}
