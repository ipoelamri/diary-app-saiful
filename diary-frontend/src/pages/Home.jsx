export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Muhammad Saiful Amri
        </h1>
        <p className="text-gray-700 text-lg mb-2">
          Mahasiswa{" "}
          <span className="font-semibold">
            Universitas Pamulang (PSDKU Serang)
          </span>
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Jurusan <span className="font-semibold">Sistem Informasi</span> -
          Fakultas Ilmu Komputer
        </p>
        <p className="text-gray-900 text-xl font-semibold bg-yellow-200 px-4 py-2 rounded-lg inline-block">
          IPK: 3.84
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
          Proyek yang Telah Dikerjakan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-800">
              Sistem Perpustakaan Online
            </h3>
            <p className="text-gray-700 text-sm">
              Web aplikasi berbasis Laravel untuk manajemen peminjaman buku
              secara online.
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-800">
              Aplikasi Tracking Cuaca
            </h3>
            <p className="text-gray-700 text-sm">
              Aplikasi mobile berbasis Flutter yang menampilkan cuaca di seluruh
              dunia secara real-time.
            </p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg shadow-md hover:shadow-lg transition ">
            <h3 className="text-xl font-semibold text-yellow-800">
              Aplikasi Pergudangan
            </h3>
            <p className="text-gray-700 text-sm">
              Sistem berbasis Java untuk manajemen stok barang di gudang.
            </p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg shadow-md hover:shadow-lg transition ">
            <h3 className="text-xl font-semibold text-yellow-800">
              Portofolio Sederhana Berbasis CMS
            </h3>
            <p className="text-gray-700 text-sm">
              Portofolio sederhana yang dibuat dengan tailwind dengan
              terintegrasi oleh database mysql yg dapat melakukan cms.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/diaries"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Lihat Diary Saya
          </a>
        </div>
      </div>
    </div>
  );
}
