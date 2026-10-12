# EduSchool — Website Pembelajaran Sekolah Modern & Elegan

EduSchool adalah platform pembelajaran digital terpadu untuk siswa dan tenaga pendidik tingkat sekolah menengah (SMA/SMK). Dibangun menggunakan **HTML5, CSS3 murni, dan JavaScript murni** tanpa ketergantungan pada framework eksternal seperti React, Vue, Tailwind CSS, Bootstrap, maupun backend database server. Seluruh interaktivitas data dan perubahan status dikelola secara persisten melalui **Web Storage API (localStorage)** peramban.

---

## 🎨 Identitas Visual & Estetika Desain

EduSchool mengusung gaya **Modern Minimalis, Elegan, Premium, dengan sentuhan Old-Money**:
- **Putih Bersih (`#FFFFFF`)**: Bidang kartu dan permukaan utama.
- **Off-white (`#F9F8F5`)**: Latar belakang halaman yang teduh dan nyaman di mata.
- **Gold Utama (`#C5A253`)**: Aksen mewah terukur pada status, border aktif, dan indikator.
- **Gold Muda (`#E6D6AC` / `#F7F3E8`)**: Latar belakang badge halus dan efek hover.
- **Hitam Lembut (`#222222`)**: Tipografi tajam dan kontras tinggi.
- **Abu-abu Sekunder (`#777777` / `#6B6861`)**: Metadata, subtitle, dan teks pendukung.
- **Border Lembut (`#EAE6DC`)**: Garis batas hairline yang rapi dan presisi.

---

## 👥 Pengguna & Akun Demonstrasi

Akses sistem menggunakan simulasi autentikasi frontend yang tertera pada halaman [login.html](login.html):

| Peran | Nama Demonstrasi | Nomor Induk (NIS/NIP) | Email Demonstrasi | Kata Sandi Demo |
| :--- | :--- | :--- | :--- | :--- |
| **Siswa** | Ahmad Rizky Pratama | `20241001` | `rizky@eduschool.sch.id` | `siswa123` |
| **Guru** | Dra. Sri Wahyuni, M.Kom. | `198305142008012005` | `sri.wahyuni@eduschool.sch.id` | `guru123` |

> **Pintasan Cepat:** Pada halaman `login.html`, tersedia tombol **"⚡ Masuk Instan sebagai Siswa Demo"** dan **"⚡ Masuk Instan sebagai Guru Demo"** untuk masuk dengan 1 klik tanpa harus mengetik manual. Pengguna juga dapat berganti peran secara instan melalui pill switcher di sidebar / topbar kapan saja.

---

## 📁 Struktur Berkas Proyek

```text
TEKNOLOGI PENDIDIKAN/
├── index.html              # Landing page publik (Hero, Kurikulum, Profil Singkat)
├── login.html              # Portal masuk simulasi autentikasi peran
├── profil-sekolah.html     # Profil resmi sekolah (Sejarah, Visi Misi, Fasilitas, Guru)
├── dashboard-siswa.html    # Dashboard personal siswa (Progress, Jadwal, Nilai)
├── dashboard-guru.html     # Dashboard manajemen pendidik (Statistik, Siswa Dummy, Absensi)
├── mata-pelajaran.html     # Katalog mata pelajaran dengan pencarian dan filter
├── materi.html             # Pembaca modul terstruktur (10 Modul) & CRUD Guru
├── kuis.html               # Engine kuis interaktif (Timer, Pembahasan) & Bank Soal Guru
├── absensi.html            # Simulasi presensi siswa (Anti-duplikat) & Rekap Guru
├── jadwal.html             # Jadwal pelajaran mingguan dengan penanda hari ini
├── nilai.html              # Transkrip nilai, GPA, grafik SVG, dan cetak rapor
├── pengumuman.html         # Warta sekolah, filter kategori, dan publikasi guru
├── profil.html             # Profil pengguna, biodata, dan formulir edit data
├── README.md               # Dokumentasi teknis proyek lengkap
├── css/
│   ├── style.css           # Design tokens, reset, typography, app shell layout
│   ├── components.css      # Card, button, badge, modal, toast, table, progress bar
│   └── responsive.css      # Responsivitas tablet, smartphone, dan print mode
└── js/
    ├── data.js             # Data seed awal terpusat (School, Lessons, Quizzes, dll.)
    ├── storage.js          # Pengelola localStorage, versioning, dan reset data
    ├── auth.js             # Pengelola sesi peran demonstrasi dan proteksi halaman
    ├── app.js              # UI controller bersama: sidebar, topbar, toast, icon SVG, modal
    ├── siswa.js            # Kalkulasi metrik dan render dashboard siswa
    ├── guru.js             # Metrik bimbingan dan rekap dashboard pendidik
    ├── school-profile.js   # Perender dinamis data profil sekolah dari data.js
    ├── materi.js           # Reader materi, tracking progress, dan CRUD modal guru
    ├── quiz.js             # Interactive quiz runner, auto-grading, pembahasan, bank soal
    ├── attendance.js       # Simulasi presensi mandiri, pencegah duplikasi, rekap guru
    ├── schedule.js         # Jadwal mingguan dan filter hari
    ├── grade.js            # Kalkulasi transkrip, grafik SVG, dan fitur print
    ├── announcement.js     # Pengumuman dan penanda status baca
    └── profile.js          # Biodata pengguna dan formulir edit profil
```

---

## 🚀 Panduan Menjalankan Website Secara Lokal

Website ini dibuat dengan standar web murni sehingga dapat dijalankan dengan berbagai cara:

### Cara 1: Langsung Membuka Berkas (Paling Mudah)
1. Buka folder proyek di File Explorer.
2. Klik dua kali pada berkas `index.html`.
3. Website akan langsung terbuka dan berfungsi penuh di Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari.

### Cara 2: Menjalankan via Local Web Server (Direkomendasikan)
Jika Anda menggunakan editor seperti Visual Studio Code atau terminal:

- **Menggunakan Python (bawaan Windows/Mac/Linux):**
  ```bash
  python -m http.server 8080
  ```
  Kemudian buka peramban di `http://localhost:8080`.

- **Menggunakan Node.js npx:**
  ```bash
  npx serve .
  ```

- **Menggunakan ekstensi VS Code Live Server:**
  Klik kanan pada `index.html` dan pilih **"Open with Live Server"**.

---

## 💻 10 Modul Pembelajaran Informatika Terstruktur

Pada halaman [materi.html](materi.html), telah disediakan 10 modul pembelajaran lengkap:
1. **Pengantar Informatika dan Berpikir Komputasional** (4 Pilar: Dekomposisi, Pola, Abstraksi, Algoritma)
2. **Algoritma dan Pseudocode** (Runtunan, Pemilihan, Perulangan)
3. **Flowchart (Diagram Alir)** (Simbol ANSI, Terminator, Proses, Percabangan Decision)
4. **Dasar Pemrograman** (Kompilasi vs Interpretasi, Bahasa Tingkat Tinggi)
5. **Variabel, Tipe Data, dan Operator** (Integer, Float, String, Boolean, Modulo)
6. **Percabangan dan Perulangan** (If-Else, Switch, For Loop, While Loop)
7. **Struktur Data Dasar** (Array, Stack LIFO, Queue FIFO, Hash Map)
8. **Jaringan Komputer dan Internet** (IP Address, DNS, Protokol HTTPS, Client-Server)
9. **Keamanan Digital dan Etika Siber** (Phishing, 2FA, Enkripsi, Jejak Digital)
10. **Analisis Data dan Literasi Digital** (Siklus Pengolahan Data, Visualisasi, Etika AI)

Setiap materi memiliki:
- 🎯 **Tujuan Pembelajaran** spesifik
- 📖 **Isi Materi Pembahasan** komprehensif
- 💡 **Contoh Penerapan / Kode Program**
- 📌 **Poin-Poin Kunci Rangkuman**
- Tombol **"Tandai Selesai"** (untuk siswa) yang memperbarui bar kemajuan di seluruh sistem.
- Tombol **"Edit Materi"** dan **"Hapus Materi"** (untuk guru) dengan modal interaktif.

---

## 📝 Fitur Kuis Interaktif & Bank Soal

Pada halaman [kuis.html](kuis.html):
- **10 Butir Soal Informatika Lengkap** dengan opsi ganda A, B, C, D.
- **Timer Countdown** otomatis.
- **Navigator Soal Berwarna** (menandai soal yang sudah dan belum dijawab).
- **Validasi Pengumpulan** (memberikan konfirmasi jika terdapat soal yang terlewat).
- **Penilaian Otomatis** dengan skor 0–100 dan status kelulusan KKM (75).
- **Ulasan Pembahasan Mendalam** untuk setiap butir soal setelah dikumpulkan.
- **Riwayat Kuis** tersimpan di localStorage.
- **Fitur Guru:** Tambah soal baru, edit soal, hapus soal, ubah durasi & KKM, serta pantau tabel leger hasil seluruh siswa dummy.

---

## 🕒 Sistem Presensi & Anti-Duplikasi

Pada halaman [absensi.html](absensi.html):
- **Siswa:** Menampilkan persentase kehadiran dan tombol simulasi presensi untuk pertemuan aktif hari ini. Jika siswa telah melakukan presensi pada hari dan sesi yang sama, sistem **mencegah presensi ganda** dengan menonaktifkan tombol dan menampilkan pemberitahuan toast.
- **Guru:** Dapat memfilter data presensi berdasarkan mata pelajaran dan tanggal, serta **mengubah status kehadiran siswa** (Hadir, Izin, Sakit, Alpa) langsung dari dropdown tabel.
- **Disclaimer Edukasi:** Menyertakan catatan resmi bahwa presensi ini adalah simulasi digital frontend.

---

## 🔄 Fitur Reset Data Demonstrasi

Tersedia tombol **"🔄 Reset Data Demo"** di bagian bawah sidebar dan footer setiap halaman. Menekan tombol ini akan mengembalikan seluruh data `localStorage` (materi, kuis, absensi, pengumuman, dan riwayat nilai) ke kondisi awal default tanpa menghilangkan fungsionalitas.

---

## 📋 Daftar Informasi Sekolah yang Perlu Diganti (Placeholder)

Seluruh informasi sekolah pada tahap awal ini menggunakan data placeholder yang tersentralisasi di berkas [`js/data.js`](js/data.js) pada objek `DEFAULT_SCHOOL_DATA`. Ketika data resmi sekolah telah tersedia, Anda cukup mengganti nilai-nilai berikut:

1. **Nama & Slogan Sekolah:** `name`, `tagline`.
2. **Nomor Pokok & Akreditasi:** `npsn`, `accreditation`, `foundedYear`.
3. **Kontak Resmi:** Alamat fisik, nomor telepon, WhatsApp, email dinas, dan tautan website resmi.
4. **Visi & Misi:** Paragraf visi dan butir-butir misi sekolah.
5. **Kepala Sekolah:** Nama lengkap dengan gelar, NIP, kutipan sambutan, dan foto/avatar.
6. **Data Guru:** Nama, NIP, mata pelajaran yang diampu, riwayat pendidikan, dan foto pendidik.
7. **Fasilitas & Program:** Judul dan deskripsi sarana laboratorium, perpustakaan, serta program unggulan.
8. **Prestasi Sekolah:** Daftar perolehan medali, tahun, dan tingkat kejuaraan.

---

## ⚠️ Dokumentasi Keterbatasan Sistem Frontend

1. **Penyimpanan Lokal (localStorage):**
   - Data hanya tersimpan di peramban (browser) komputer yang sedang digunakan.
   - Perubahan data yang dilakukan guru akan langsung terlihat oleh siswa di komputer/browser yang sama, namun **tidak tersinkronisasi antar-perangkat komputer yang berbeda** karena tidak ada server database eksternal (PostgreSQL/MySQL/Firebase).
2. **Autentikasi Demonstrasi:**
   - Sistem login dirancang untuk memudahkan evaluasi antarmuka guru dan siswa, bukan sistem keamanan enkripsi kata sandi produksi (seperti bcrypt/JWT).
3. **Penyimpanan Berkas Gambar:**
   - Foto dan avatar menggunakan representasi visual SVG dan Emoji beresolusi tinggi yang tajam di layar Retina/HiDPI tanpa risiko broken image link.
