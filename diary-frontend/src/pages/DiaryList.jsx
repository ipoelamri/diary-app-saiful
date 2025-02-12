import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DiaryList() {
  const [diaries, setDiaries] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/diaries", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setDiaries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/diaries/${deleteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setDiaries(diaries.filter((diary) => diary.id !== deleteId));
        setIsModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Daftar Diary</h2>
      <Link
        to="/diary/add"
        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-700"
      >
        Tambah Diary
      </Link>
      <ul className="mt-4 space-y-3">
        {diaries.map((diary) => (
          <li
            key={diary.id}
            className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
          >
            <Link
              to={`/diary/${diary.id}`}
              className="flex items-center space-x-4 w-full"
            >
              {diary.image && (
                <img
                  src={`http://localhost:8000/storage/${diary.image}`}
                  alt={diary.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="text-lg font-bold">{diary.title}</h3>
                <p className="text-sm text-gray-600">{diary.date}</p>
              </div>
            </Link>
            <div className="flex space-x-2">
              <Link
                to={`/diary/edit/${diary.id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={() => openDeleteModal(diary.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-4">Apakah Anda yakin ingin menghapus diary ini?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
