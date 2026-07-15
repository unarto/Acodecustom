# Rencana Penghapusan Iklan (Ad-Free) Acode

Dokumen ini berisi rencana dan status penghapusan seluruh integrasi iklan dalam aplikasi Acode agar menjadi aplikasi tanpa iklan (ad-free) namun tetap berfungsi penuh.

## Daftar Tugas Penghapusan Iklan:

- [x] **Hapus Plugin AdMob**: Menghapus direktori `Acode/src/plugins/admob` beserta isinya.
- [x] **Pembersihan Konfigurasi Build & Setup**: 
  - Menghapus logika instalasi/konfigurasi AdMob di `Acode/utils/config.js`.
  - Menghapus referensi AdMob di `Acode/utils/setup.js`.
- [x] **Pembersihan Logika Iklan Banner & Interstitial**: 
  - Mengubah/menghapus logika inisiasi iklan di `Acode/src/lib/startAd.js` agar tidak melakukan inisialisasi iklan.
- [x] **Pembersihan Logika Ad Rewards (Iklan Berhadiah)**: 
  - Menghapus logika iklan berhadiah di `Acode/src/lib/adRewards.js` dan memberikan *bypass* fungsi berhadiah secara langsung.
- [x] **Pembersihan Event Iklan**: 
  - Menghapus *event listener* `admob.banner.size` di `Acode/src/handlers/keyboard.js`.
- [x] **Pembersihan `config.xml`**:
  - Menghapus referensi plugin/konfigurasi AdMob pada `Acode/config.xml`.
- [x] **Pencarian & Pembersihan Sisa Kode**: Melakukan *scan* ulang untuk kata kunci `admob` atau `AdView` untuk memastikan tidak ada sisa kode yang tertinggal.

---
*Catatan: Centang kotak (`[x]`) setelah tugas selesai dilakukan.*
