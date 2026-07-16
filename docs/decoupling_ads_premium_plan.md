# 📄 Dokumentasi Arsitektur Pemisahan (Decoupling) Iklan & Fitur Premium Acode

Dokumen ini menjelaskan rancangan arsitektur, strategi isolasi, dan implementasi untuk memisahkan logika Iklan (AdMob/Ad-Rewards) dari Logika Fitur Premium (Pro), serta menjamin keandalan sistem agar tidak mengalami crash jika modul native plugin Cordova dicopot di masa mendatang.

---

## 1. Analisis Ketergantungan Sebelum Pemisahan (Legacy Coupling)
Pada sistem bawaan Acode asli, modul Iklan dan Premium saling tergantung erat (*tightly coupled*):
1. **Error Fatal Saat Build / Runtime**: Komponen JS mengakses variabel global `admob` dan `consent` secara langsung tanpa pembungkus pelindung (`window.admob` / `window.consent`). Jika plugin `cordova-plugin-admob` hilang atau dicopot dari proyek Cordova di sisi native, aplikasi akan langsung melempar `ReferenceError: admob is not defined` dan crash saat melakukan boot awal.
2. **Kopling Status**: Logika pemuatan iklan (`startAd.js` dan `adRewards.js`) bergantung langsung pada status `config.HAS_PRO`. Sementara itu, status premium ditentukan oleh jenis kemasan (`isFreePackage`), pembelian lokal, atau setelah menonton iklan berhadiah (`adRewards`).

---

## 2. Struktur Arsitektur Pemisahan Baru (Decoupled & Isolated Model)

Untuk mencapai desain modular yang memenuhi *Single Responsibility Principle (SRP)* dan kebal terhadap hilangnya plugin native, arsitektur baru didesain sebagai berikut:

```
                  ┌──────────────────────┐
                  │    premiumManager    │ (Mengelola lisensi premium secara independen)
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │    config.HAS_PRO    │ (Getter yang mendelegasikan ke premiumManager)
                  └──────────┬───────────┘
                             │
        ┌────────────────────┴────────────────────┐
        ▼                                         ▼
┌───────────────┐                         ┌───────────────┐
│  Core Editor  │                         │  admobStub    │ (Menyediakan fallback aman)
│  & UI Themes  │                         └───────┬───────┘
└───────────────┘                                 │ (Mencegah ReferenceError di native)
                                                  ▼
                                          ┌───────────────┐
                                          │   startAd     │ (Inisialisasi iklan pasif)
                                          │  adRewards    │ (Manajer status bebas-iklan)
                                          └───────────────┘
```

### A. Lapisan Abstraksi Mandiri (`src/lib/premiumManager.js`)
* Logika lisensi premium dikapsulasi sepenuhnya ke dalam `premiumManager`.
* Nilai premium ditetapkan permanen `true` secara global. Setter dinonaktifkan (`noop`) agar inisialisasi eksternal (misal pada `main.js`) tidak dapat mematikan fitur premium secara tidak sengaja.

### B. Lapisan Pelindung Kompatibilitas Cordova (`src/lib/admobStub.js`)
* Ini adalah kunci utama untuk mencegah kegagalan pada build native.
* `admobStub.js` mendaftarkan objek tiruan (dummy/mock) yang aman untuk `window.admob` dan `window.consent` jika modul asli tidak terdeteksi di lingkungan runtime.
* Jika pengembang mencopot plugin native AdMob, aplikasi JavaScript akan tetap berjalan dengan mulus tanpa ada lemparan *uncaught exceptions* / *ReferenceError*.

### C. Deaktivasi & Pembersihan Logika Iklan (`src/lib/startAd.js` & `src/lib/adRewards.js`)
* **`startAd.js`**: Seluruh sirkuit inisialisasi dipotong pendek (*short-circuited*). Fungsi `startAd()` dan `hideAd()` langsung mengembalikan nilai kosong secara pasif tanpa pernah memanggil SDK.
* **`adRewards.js`**: Disederhanakan total menjadi manajer status bebas-iklan pasif. Seluruh fungsi pemicu iklan berhadiah diubah untuk mengembalikan status "Permanen Bebas Iklan" dan menolak permintaan pemutaran iklan dengan pesan kegagalan yang aman.

---

## 3. Penghapusan Total Modul Iklan (Total Ads Elimination)
Dengan diterapkannya rancangan decoupling dan lapisan pelindung `admobStub.js`:
* Kita dapat **menghapus total folder iklan native `src/plugins/admob`** dari repositori.
* Proses kompilasi dan build native dijamin 100% aman, bersih, bebas iklan, dan menyuguhkan pengalaman Pro penuh kepada seluruh pengguna.
