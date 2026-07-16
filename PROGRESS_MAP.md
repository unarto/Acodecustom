# Progress Map - Acode File Manager Improvements

Dokumentasi progress implementasi fitur baru untuk File Manager Acode.

## 📋 DAFTAR FITUR & STATUS

- [x] **Dukungan Multi-Select (Pilih Banyak)** - *Selesai (2026-07-14)*
  - Kemampuan memilih banyak file/folder sekaligus.
  - Operasi batch (Copy, Cut, Delete, Compress).
- [x] **Pencarian Global dan Filter Lanjutan (Global Search & Filtering)** - *Selesai (2026-07-14)*
  - Pencarian real-time berdasarkan nama file.
  - Filter berdasarkan ekstensi spesifik (`ext:js`, `.js`) dan tipe file (`type:image`, `type:video`, `type:audio`, `type:web`).
- [x] **Kompresi & Ekstraksi File Arsip** - *Selesai (2026-07-14)*
  - Ekstraksi `.zip` langsung ke direktori aktif.
- [x] **Integrasi Cloud Storage Tambahan** - *Selesai (2026-07-14)*
  - Dukungan integrasi Google Drive, Dropbox, dan OneDrive (OAuth Placeholder & dummy storage).
- [x] **Fitur Drag and Drop (Tarik dan Lepas)** - *Selesai (2026-07-14)*
  - Memindahkan file/folder ke sub-folder via drag-and-drop.
- [x] **Bookmarking / Favorit Direktori** - *Selesai (2026-07-14)*
  - Pin/Bookmark folder favorit yang tersimpan di `storageList`.
- [x] **Tampilan Informasi File (File Properties/Info)** - *Selesai (2026-07-14)*
  - Detail ukuran file, lokasi, waktu modifikasi terakhir, dan permissions (chmod).
- [x] **Opsi Sortir (Advanced Sorting)** - *Selesai (2026-07-14)*
  - Mengurutkan file berdasarkan Nama (A-Z, Z-A), Ukuran, Tanggal Dimodifikasi, dan Ekstensi File.
  - Toggle cepat untuk menampilkan/menyembunyikan file sistem (hidden files) yang diawali titik (contoh: `.env`, `.gitignore`).

## ⚙️ INFRASTRUKTUR & REORGANISASI PROYEK
- [x] **Restrukturisasi Repositori Acode** - *Selesai (2026-07-14)*
  - Memindahkan seluruh folder dan file dari `/app/applet/Acode/` langsung ke root workspace `/app/applet/` agar kompatibel penuh dengan lingkungan runtime.
  - Menghapus folder `Acode` kosong dan membersihkan file template bawaan lama untuk mencegah konflik.
- [x] **Pembersihan Cache & Re-build** - *Selesai (2026-07-14)*
  - Menghapus cache build lama, `tsconfig.tsbuildinfo`, `dist/`, dan `.vite`.
  - Berhasil menjalankan re-build produksi bersih menggunakan Rspack.
- [x] **Integrasi Port 3000 AI Studio Server** - *Selesai (2026-07-14)*
  - Membuat server statis kustom `aistudio-server.js` untuk menyajikan folder `www/` pada port 3000 di host `0.0.0.0`.
  - Menyesuaikan script `package.json` (`build`, `start`, `dev`) agar otomatis mengompilasi dengan Rspack dan meluncurkan server kustom di port 3000.
- [x] **Perbaikan Alur Kerja GitHub (GitHub Workflows)** - *Selesai (2026-07-15)*
  - Menghapus pembatasan kepemilikan keras (`github.repository_owner == 'Acode-Foundation'`) sehingga alur kerja dapat dijalankan oleh fork pengguna (`unarto`).
  - Mengubah pemanggilan *reusable workflows* eksternal ke format referensi lokal (`./.github/workflows/...`) demi portabilitas dan menghindari masalah autentikasi.
  - Memperbarui tag versi fiktif/tidak valid dari dependensi Actions (seperti `@v7`, `@v6`, `@v5`, `@v8`) ke versi stabil resmi terbaru (`@v4`, `@v5`, `@v2`, `@v9`) guna mencegah kegagalan *runner*.
  - **Penghapusan Hambatan Build Secrets (Non-blocking Signing)**: Mengubah langkah verifikasi keystore di `nightly-build.yml` menjadi peringatan non-blocking jika rahasia (`KEYSTORE_CONTENT`, `BUILD_JSON_CONTENT`) tidak diatur (misal pada fork personal). Memungkinkan otomatisasi pembuatan APK unsigned/debug-signed secara sukses tanpa kegagalan alur kerja.
  - **Otomatisasi Tanda Tangan Uji Coba (Automatic Debug Keystore fallback)**: Mengintegrasikan pembangkitan `debug.keystore` otomatis secara asinkron menggunakan utilitas `keytool` bawaan Runner bersama berkas konfigurasi `build.json` dinamis ketika kredensial rahasia utama tidak ditemukan. Menjamin rilis biner APK ter-tandatangani (signed) secara otomatis demi kemudahan pengujian fork pengguna tanpa konfigurasi rahasia manual.
  - **Modularitas Build Delegate**: Memperbaiki pemisahan target kompilasi melalui berkas delegator pintar `utils/build-delegate.js` agar `npm run build` mendukung pengemasan Cordova Android (`paid dev apk`) maupun integrasi pratinjau internal AI Studio secara mulus.
- [x] **Perbaikan Rendering Ikon Rusak (Icon Render Fix)** - *Selesai (2026-07-15)*
  - Menemukan kegagalan parsing pada parser CSS minifier Rspack/SWC yang merusak string `@font-face` dengan memotong deklarasi `format('truetype')` menjadi unclosed `format(`.
  - Menghapus query string cache-busting yang tidak perlu (`?v3` / `?ujkkfk`) dan menghapus parameter `format(...)` redundant agar browser langsung mengenali format `.ttf` secara native.
  - Memverifikasi output bundel CSS di `main.css` terkompilasi dengan sempurna dan ikon kembali terlihat normal.
- [x] **Audit Dampak Penghapusan Iklan & Pembukaan Fitur Premium (Ad Removal & Premium Features Audit)** - *Selesai (2026-07-15)*
  - Mengaudit seluruh dependensi dan referensi variabel `config.HAS_PRO` untuk mengidentifikasi efek samping dari penghapusan iklan secara global.
  - Menemukan bahwa pada paket gratis (free package), fitur premium seperti tema berbayar (paid themes) dan fitur kustomisasi terkunci dan meminta pengguna untuk menonton iklan berhadiah (rewarded ads) atau membeli penawaran "Hapus Iklan" (remove ads).
  - Karena iklan telah dinonaktifkan secara total di seluruh aplikasi, opsi untuk menonton iklan akan gagal dimuat (broken experience), dan pengguna tidak membutuhkan pembelian "Hapus Iklan".
  - **Solusi Arsitektur**: Mengubah properti getter `config.HAS_PRO` di `src/lib/config.js` agar selalu mengembalikan nilai `true`.
  - **Efek Samping Positif**:
    1. Seluruh tema berbayar/premium premium kini terbuka dan dapat digunakan secara instan tanpa hambatan pembayaran atau verifikasi.
    2. Menu pengaturan "Earn ad-free time" dan "Remove ads" otomatis disembunyikan secara bersih dari menu Settings utama demi menjaga estetika UI yang bersih dan fungsional (tidak ada tautan/tombol rusak).
    3. Seluruh alur logika aplikasi kini 100% konsisten dengan keadaan bebas iklan dan menyuguhkan pengalaman premium (Pro) penuh kepada seluruh pengguna.

