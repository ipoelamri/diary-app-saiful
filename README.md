Diary App

Diary App adalah aplikasi berbasis web yang memungkinkan pengguna untuk menyimpan catatan harian mereka dengan fitur CRUD (Create, Read, Update, Delete). Aplikasi ini menggunakan Laravel sebagai backend dan React.js sebagai frontend.

Tools yang Digunakan

 Backend (Laravel)
- Laravel 11
- Sanctum (Autentikasi API)
- MySQL (Database)
- Storage untuk penyimpanan gambar
- API ZipCloud untuk pencarian kode pos

 Frontend (React.js)
- React 18 + Vite
- Tailwind CSS (Styling)
- Axios (HTTP Request)
- React Router (Navigasi)

 Gunakan Laragon atau Xampp atau tools semacamnya untuk menjalankan web server dan database server.
 Disini saya menggunakan Laragon dengan server Nginx

---

 Fitur Utama

Autentikasi User
- Register & Login** menggunakan Laravel Sanctum.
- Proteksi API dengan Bearer Token** untuk keamanan data.
- Tombol Logout** untuk keluar dari sesi.

Manajemen Diary
- Menambah diary dengan input teks & gambar.
- Melihat daftar diary yang sudah dibuat.
- Mengedit diary dengan update teks & mengganti gambar.
- Menghapus diary dengan modal konfirmasi.

Pencarian Kode Pos
- Menampilkan kode pos & alamat dengan API ZipCloud.
- Fitur Auto Fill untuk mencari alamat berdasarkan kode pos.
- Tombol Edit untuk mengubah kode pos & alamat.
- Tombol Save untuk menyimpan perubahan.



Cara Install & Menjalankan Proyek
Clone Repository**
bash
- git clone https://github.com/ipoelamri/diary-app-saiful
- cd diary-app-saiful

Setup Backend (Laravel)

- Masuk ke folder Backend (diary)

Install dependencies
- -composer install

Buat file .env dan konfigurasi database
- cp .env.example .env

Atur koneksi database di .env:
- DB_CONNECTION=mysql
- DB_HOST=127.0.0.1
- DB_PORT=3306
- DB_DATABASE=diary_db
- DB_USERNAME=root
- DB_PASSWORD=

Generate key & jalankan migrasi database
- php artisan key:generate
- php artisan migrate
- php artisan storage:link

Jalankan server Laravel
- php artisan serve


Setup Frontend (React.js)

- Masuk ke folder frontend (diary-frontend)

Install dependencies
- npm install

Jalankan frontend
- npm run dev
