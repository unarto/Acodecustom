# Rencana Peningkatan Fungsionalitas File Manager Acode

Dokumen ini berisi rencana pengembangan untuk membuat fitur File Manager di Acode menjadi lebih fungsional, fleksibel, dan memudahkan alur kerja (workflow) pengguna.

## Daftar Fitur yang Perlu Ditambahkan

- [x] **Dukungan Multi-Select (Pilih Banyak)**
  - Kemampuan untuk memilih lebih dari satu file atau folder sekaligus.
  - Memungkinkan operasi batch seperti: Copy, Cut, Delete, dan Compress secara bersamaan.

- [x] **Pencarian Global dan Filter Lanjutan (Global Search & Filtering)**
  - Fitur pencarian file berdasarkan nama secara *real-time* di dalam direktori.
  - Filter untuk hanya menampilkan tipe file tertentu (misal: hanya `.js`, `.html`, atau gambar).

- [x] **Kompresi & Ekstraksi File Arsip**
  - Dukungan native untuk mengekstrak file `.zip`, `.tar`, atau `.rar` langsung dari file manager (Format `.zip` telah diimplementasi).
  - Fitur untuk melakukan kompresi satu atau beberapa file/folder menjadi `.zip`.

- [x] **Integrasi Cloud Storage Tambahan**
  - Selain FTP/SFTP, menambahkan dukungan langsung untuk Google Drive, Dropbox, atau OneDrive.
  - Sinkronisasi file secara mulus antara lokal dan cloud.

- [x] **Fitur Drag and Drop (Tarik dan Lepas)**
  - Memungkinkan pengguna untuk memindahkan file/folder ke dalam sub-folder lain hanya dengan drag-and-drop.

- [x] **Bookmarking / Favorit Direktori**
  - Pin atau bookmark folder yang sering diakses (seperti *Quick Access* atau *Favorites*) agar muncul di panel atas atau *sidebar* khusus.

- [x] **Tampilan Informasi File (File Properties/Info)**
  - Melihat detail ukuran file, lokasi absolut, waktu modifikasi terakhir, dan *permissions* (chmod) secara detail.

- [x] **Opsi Sortir (Advanced Sorting)**
  - Mengurutkan file berdasarkan: Nama (A-Z, Z-A), Ukuran, Tanggal Dimodifikasi, dan Ekstensi File.
  - Toggle cepat untuk menampilkan/menyembunyikan file sistem (hidden files) yang diawali dengan titik (contoh: `.env`, `.gitignore`).

## Strategi Implementasi

1. **Fase 1: UI/UX & Interaksi Dasar**
   - Mengimplementasikan UI untuk fitur *Multi-Select* dan *Sorting*.
   - Menambahkan toggle *Hidden Files*.

2. **Fase 2: Utilitas & Manajemen File**
   - Mengintegrasikan modul untuk *Compress* dan *Extract* file ZIP.
   - Mengimplementasikan sistem *Bookmarking* direktori.

3. **Fase 3: Cloud & Tingkat Lanjut**
   - Menambahkan API untuk koneksi Google Drive / Dropbox.
   - Menyempurnakan fitur *Global Search* dan *Drag and Drop*.
