# 🤖 INSTRUKSI DAN ATURAN KHUSUS UNTUK AGEN AI (AGENTS.md)

Dokumen ini berisi aturan arsitektur dan instruksi khusus yang wajib dipatuhi oleh setiap Agen AI yang berkontribusi dalam proyek ini.

---

## ⚠️ ATURAN UTAMA: ANTI-MOCK & ANTI-DUMMY DATA (CRITICAL)

1. **Dilarang Keras Menggunakan Data Simulasi / Mock / Placeholder**:
   - **JANGAN PERNAH** memasukkan data simulasi, data dummy, teks placeholder palsu, atau berkas biner palsu/buatan ke dalam codebase atau UI.
   - Menggunakan data mock tiruan membuat pendeteksian bug asli dan kesalahan sistem (runtime error/bugs) menjadi sangat sulit dideteksi karena tertutupi oleh data palsu.

2. **Gunakan Pendekatan "Empty-State" (Kosongkan Saja)**:
   - Jika suatu fitur, API, atau integrasi data belum tersedia atau belum terhubung secara real/nyata, **BIARKAN KOSONG** atau kembalikan nilai kosong (`[]`, `null`, atau state kosong yang bersih).
   - Lebih baik menampilkan UI dengan indikator "Belum Terhubung" atau halaman kosong daripada memenuhinya dengan data tiruan yang menyesatkan proses debugging.

3. **Gunakan Log Kesalahan Asli**:
   - Selalu biarkan error runtime meledak atau ditangkap secara jujur oleh sistem logging, agar pengembang dapat langsung melacak baris kode dan penyebab utama kesalahan secara akurat.

---

## 📊 KONSISTENSI STATUS (RSP & PROGRESS)
- Setiap agen wajib melanjutkan pekerjaan berdasarkan berkas pelacak kemajuan **`PROGRESS_MAP.md`**.
- Selalu patuhi prinsip modularitas yang ketat (Single Responsibility Principle) dan isolasi fitur guna mencegah file membengkak (*bloat*).
