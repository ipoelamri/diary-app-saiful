import { useState } from "react";
import axios from "axios";

export default function ZipCodeSearch() {
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = async () => {
    if (zipCode.length !== 7) {
      alert("Kode pos harus terdiri dari 7 digit!");
      return;
    }

    try {
      const res = await axios.get(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`
      );
      const data = res.data;

      if (data.results) {
        const fullAddress = `${data.results[0].address1}, ${data.results[0].address2}, ${data.results[0].address3}`;
        setAddress(fullAddress);
      } else {
        setAddress("Alamat tidak ditemukan.");
      }
    } catch (err) {
      console.error("Error fetching zip code:", err);
      alert("Gagal mencari kode pos. Coba lagi nanti.");
    }
  };

  const handleSave = () => {
    if (zipCode && address) {
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pencarian Kode Pos</h2>

      {!isEditing ? (
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-lg font-bold">Kode Pos: {zipCode || "-"}</p>
          <p className="text-gray-600">{address || "Belum ada data"}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Edit Data</h3>

          <label className="block font-medium mb-1">Kode Pos</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            maxLength="7"
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block font-medium mb-1">Alamat</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            rows="3"
          ></textarea>

          <div className="flex space-x-2">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Auto Fill
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
