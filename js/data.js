/**
 * EDUSCHOOL - CENTRALIZED DEMO DATA STORE
 * Seluruh data sekolah, pengguna demo, mata pelajaran, materi, kuis, absensi, jadwal, dan pengumuman.
 * Data di bawah dapat disesuaikan dan menjadi sumber awal (seed data) untuk localStorage.
 */

const DEFAULT_SCHOOL_DATA = {
  // Informasi Sekolah (Placeholder yang mudah diganti)
  meta: {
    note: "Seluruh data sekolah ini adalah placeholder demonstrasi frontend. Ubah nilai objek ini jika data resmi sekolah tersedia."
  },
  name: "SMA Unggulan EduSchool Nusantara",
  tagline: "Membina Generasi Unggul, Berkarakter, dan Menguasai Teknologi Global",
  npsn: "10293847",
  accreditation: "A (Unggul) - BAN-SM 2023",
  foundedYear: "2008",
  curriculum: "Kurikulum Merdeka Mandiri Berbagi",
  contact: {
    address: "Jl. Pendidikan Cendekia No. 45, Kompleks Prestasi, Jakarta 12340",
    phone: "(021) 7890-1234",
    whatsapp: "0812-3456-7890",
    email: "kontak@eduschool.sch.id",
    website: "https://eduschool.sch.id"
  },
  history: `Didirikan pada tahun 2008, SMA Unggulan EduSchool Nusantara dirancang sebagai institusi pelopor yang mengintegrasikan keunggulan akademik klasik dengan kecakapan literasi digital masa depan. Melalui perjalanan lebih dari satu dekade, sekolah telah meluluskan ribuan cendekiawan muda yang berkiprah di universitas terkemuka dunia dan industri teknologi internasional.`,
  vision: "Menjadi institusi pendidikan teladan yang mencetak pemimpin berintegritas tinggi, berwawasan global, dan unggul dalam inovasi sains serta teknologi komputasi.",
  mission: [
    "Menyelenggarakan pembelajaran berbasis komputasi, analitika, dan nalar kritis yang adaptif terhadap revolusi industri.",
    "Membentuk karakter santun, disiplin, berjiwa ksatria, dan bertanggung jawab terhadap peradaban manusia.",
    "Mengembangkan potensi siswa melalui ekosistem riset, kompetisi sains, dan proyek teknologi terapan.",
    "Menyediakan fasilitas pembelajaran digital mutakhir yang inklusif, humanis, dan ramah lingkungan."
  ],
  headmaster: {
    name: "Prof. Dr. Ir. Hendra Prasetya, M.Sc.",
    nip: "197208151998021001",
    title: "Kepala Sekolah",
    quote: "Pendidikan sejati bukan sekadar mengisi bejana, melainkan menyalakan lentera intelektual dan budi pekerti yang tak pernah padam.",
    avatar: "👨‍🏫"
  },
  teachers: [
    {
      id: "tch-1",
      name: "Dra. Sri Wahyuni, M.Kom.",
      nip: "198305142008012005",
      subject: "Informatika & Algoritma",
      education: "Magister Ilmu Komputer, Universitas Indonesia",
      avatar: "👩‍🏫"
    },
    {
      id: "tch-2",
      name: "Bambang Sudirman, S.Pd., M.Mat.",
      nip: "197911022005011003",
      subject: "Matematika Diskrit & Kalkulus",
      education: "Magister Pendidikan Matematika, ITB",
      avatar: "👨‍🏫"
    },
    {
      id: "tch-3",
      name: "Elizabeth Caroline, M.Ed.",
      nip: "198703212010022004",
      subject: "Bahasa Inggris Akademik",
      education: "Master of Education, Melbourne University",
      avatar: "👩‍🏫"
    },
    {
      id: "tch-4",
      name: "Dr. Agus Salim, M.Si.",
      nip: "197604122002121002",
      subject: "Fisika Komputasi",
      education: "Doktor Fisika Terapan, UGM",
      avatar: "👨‍🏫"
    }
  ],
  facilities: [
    {
      title: "Laboratorium Komputasi Modern",
      desc: "40 unit workstation spesifikasi tinggi dengan jaringan gigabit dan server lokal untuk praktik pemrograman dan kecerdasan buatan.",
      icon: "💻"
    },
    {
      title: "Perpustakaan Digital & Senyap",
      desc: "Akses ke 15.000 jurnal internasional, koleksi ebook terkurasi, dan ruang belajar individual dengan tata suara hening.",
      icon: "📚"
    },
    {
      title: "Studio Multimedia & Podcast",
      desc: "Peralatan broadcasting profesional untuk pembuatan konten edukatif, literasi media, dan dokumentasi riset siswa.",
      icon: "🎙️"
    },
    {
      title: "Laboratorium Robotika & IoT",
      desc: "Perangkat mikrokontroler, printer 3D, dan sensor lengkap untuk kompetisi sains terapan dan inovasi otomatisasi.",
      icon: "🤖"
    },
    {
      title: "Auditorium Graha Cendekia",
      desc: "Kapasitas 800 kursi dengan akustik auditorium elegan untuk simposium akademik, debat ilmiah, dan pertunjukan seni.",
      icon: "🏛️"
    },
    {
      title: "Pusat Olahraga & Kebugaran",
      desc: "Lapangan indoor serbaguna untuk basket, bulu tangkis, tenis meja, dan lintasan lari terstandarisasi.",
      icon: "🏸"
    }
  ],
  programs: [
    {
      title: "Kelas Unggulan Sains Komputasi",
      desc: "Kurikulum pengayaan khusus yang memperdalam algoritma lanjutan, struktur data, dan rekayasa perangkat lunak sejak bangku kelas X."
    },
    {
      title: "Inkubator Riset & Inovasi Siswa (IRIS)",
      desc: "Program bimbingan one-on-one bersama dosen tamu dan praktisi industri untuk menyiapkan karya ilmiah tingkat nasional dan internasional."
    },
    {
      title: "Sertifikasi Kompetensi Digital Global",
      desc: "Pelatihan resmi tersertifikasi internasional dalam keahlian Python Programming, Networking Fundamentals, dan Cybersecurity."
    }
  ],
  achievements: [
    { year: "2024", title: "Medali Emas Olimpiade Sains Nasional (OSN) Bidang Informatika", rank: "Juara 1 Nasional" },
    { year: "2023", title: "Juara 1 Lomba Cipta Perangkat Lunak Pelajar ASEAN", rank: "Tingkat Regional ASEAN" },
    { year: "2023", title: "Sekolah Ramah Literasi Digital Terbaik se-DKI Jakarta", rank: "Penghargaan Gubernur" },
    { year: "2022", title: "Medali Perak International Zhautikov Olympiad (Computer Science)", rank: "Internasional (Kazakhstan)" }
  ],
  gallery: [
    { title: "Sesi Diskusi Komputasional di Lab Komputer", category: "Akademik", tag: "Coding Lab" },
    { title: "Pameran Inovasi Proyek Sains dan Rekayasa", category: "Inovasi", tag: "Science Fair" },
    { title: "Sidang Presentasi Proyek Akhir Informatika", category: "Presentasi", tag: "Capstone Day" },
    { title: "Perpustakaan Digital EduSchool yang Nyaman", category: "Fasilitas", tag: "Digital Library" }
  ]
};

const DEFAULT_USERS = {
  currentRole: "siswa", // 'siswa' atau 'guru'
  siswa: {
    id: "usr-siswa-1",
    role: "siswa",
    name: "Ahmad Rizky Pratama",
    nis: "20241001",
    class: "X-Informatika 1",
    email: "rizky@eduschool.sch.id",
    phone: "0812-3456-7890",
    avatar: "👨‍🎓",
    bio: "Siswa peminatan Informatika & Algoritma. Tertarik pada pemrograman sistem dan kecerdasan buatan.",
    academicYear: "2024/2025 - Semester Ganjil"
  },
  guru: {
    id: "usr-guru-1",
    role: "guru",
    name: "Dra. Sri Wahyuni, M.Kom.",
    nip: "198305142008012005",
    subject: "Informatika",
    email: "sri.wahyuni@eduschool.sch.id",
    phone: "0812-9876-5432",
    avatar: "👩‍🏫",
    bio: "Pendidik Informatika Senior dengan pengalamanan riset komputasi 15 tahun. Koordinator Kurikulum Digital EduSchool.",
    handledClasses: ["X-Informatika 1", "X-Informatika 2", "XI-Sains 1"]
  }
};

const DEFAULT_STUDENTS = [
  { id: "usr-siswa-1", name: "Ahmad Rizky Pratama", nis: "20241001", class: "X-Informatika 1", email: "rizky@eduschool.sch.id", avatar: "👨‍🎓", scoreAvg: 88.5, attendanceRate: 95 },
  { id: "usr-siswa-2", name: "Siti Aisyah Rahma", nis: "20241002", class: "X-Informatika 1", email: "aisyah@eduschool.sch.id", avatar: "👩‍🎓", scoreAvg: 92.0, attendanceRate: 98 },
  { id: "usr-siswa-3", name: "Budi Santoso", nis: "20241003", class: "X-Informatika 1", email: "budi@eduschool.sch.id", avatar: "👨‍🎓", scoreAvg: 81.0, attendanceRate: 90 },
  { id: "usr-siswa-4", name: "Cantika Dewi", nis: "20241004", class: "X-Informatika 1", email: "cantika@eduschool.sch.id", avatar: "👩‍🎓", scoreAvg: 89.5, attendanceRate: 96 },
  { id: "usr-siswa-5", name: "Daffa Rayhan Putra", nis: "20241005", class: "X-Informatika 1", email: "daffa@eduschool.sch.id", avatar: "👨‍🎓", scoreAvg: 77.0, attendanceRate: 85 },
  { id: "usr-siswa-6", name: "Eka Putri Lestari", nis: "20241006", class: "X-Informatika 1", email: "ekaputri@eduschool.sch.id", avatar: "👩‍🎓", scoreAvg: 94.0, attendanceRate: 100 }
];

const DEFAULT_SUBJECTS = [
  {
    id: "sub-info",
    code: "INF-X",
    name: "Informatika",
    category: "Peminatan Sains & Teknologi",
    teacher: "Dra. Sri Wahyuni, M.Kom.",
    description: "Mempelajari cara berpikir komputasional, algoritma, pemrograman dasar, struktur data, jaringan internet, dan keamanan siber.",
    color: "#C5A253",
    totalLessons: 10,
    icon: "code"
  },
  {
    id: "sub-mat",
    code: "MAT-X",
    name: "Matematika Diskrit",
    category: "Sains Murni",
    teacher: "Bambang Sudirman, S.Pd., M.Mat.",
    description: "Kombinatorika, teori himpunan, logika proposisional, graf, dan relasi bilangan untuk fondasi analitis komputasi.",
    color: "#4A6FA5",
    totalLessons: 8,
    icon: "calculator"
  },
  {
    id: "sub-ing",
    code: "ENG-X",
    name: "Bahasa Inggris Akademik",
    category: "Bahasa & Komunikasi",
    teacher: "Elizabeth Caroline, M.Ed.",
    description: "Kecakapan menulis laporan ilmiah, presentasi teknis, dan pemahaman literatur teknologi internasional.",
    color: "#5B8E7D",
    totalLessons: 8,
    icon: "globe"
  },
  {
    id: "sub-fis",
    code: "FIS-X",
    name: "Fisika Komputasi",
    category: "Sains Terapan",
    teacher: "Dr. Agus Salim, M.Si.",
    description: "Mekanika klasik, termodinamika, dan elektromagnetika melalui simulasi model komputasi matematis.",
    color: "#8B5FBF",
    totalLessons: 6,
    icon: "zap"
  }
];

// 10 Materi Lengkap Informatika
const DEFAULT_LESSONS = [
  {
    id: "les-01",
    subjectId: "sub-info",
    order: 1,
    title: "1. Pengantar Informatika dan Berpikir Komputasional",
    duration: "45 Menit",
    objectives: [
      "Memahami definisi dan ruang lingkup ilmu informatika dalam peradaban modern.",
      "Menguasai 4 pilar computational thinking: Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma.",
      "Mampu menerapkan pendekatan komputasional untuk memecahkan problem kompleks sehari-hari."
    ],
    content: `
      <p>Informatika bukan sekadar keahlian mengoperasikan komputer, melainkan sains terstruktur tentang pengolahan informasi, pemecahan masalah (problem solving), dan otomatisasi logika. Di era kontemporer, fondasi esensial dari disiplin ini adalah <strong>Berpikir Komputasional (Computational Thinking)</strong>.</p>
      
      <h4>Empat Pilar Fondasi Berpikir Komputasional:</h4>
      <ul>
        <li><strong>1. Dekomposisi (Decomposition):</strong> Kemampuan memecah persoalan besar dan rumit menjadi modul-modul sub-masalah yang lebih kecil, terisolasi, dan mudah ditangani.</li>
        <li><strong>2. Pengenalan Pola (Pattern Recognition):</strong> Kemampuan melihat kesamaan, tren, atau keteraturan berulang di antara problem-problem yang telah dipecah.</li>
        <li><strong>3. Abstraksi (Abstraction):</strong> Proses menyaring rincian yang tidak relevan dan hanya memusatkan perhatian pada konsep-konsep inti yang esensial.</li>
        <li><strong>4. Perancangan Algoritma (Algorithm Design):</strong> Menyusun langkah-langkah terurut, logis, dan presisi tanpa ambigu untuk menghasilkan solusi yang dapat direplikasi.</li>
      </ul>
    `,
    examples: `
      <div class="code-box">
        <strong>Studi Kasus Nyata: Mengelola Data Pendaftaran Siswa Baru</strong><br>
        1. Dekomposisi: Pisahkan proses jadi validasi dokumen, verifikasi nilai, dan penentuan kelas.<br>
        2. Pengenalan Pola: Setiap formulir memiliki kesamaan struktur (nama, NISN, nilai rapor).<br>
        3. Abstraksi: Fokus pada nilai rata-rata dan dokumen kelulusan; abaikan warna foto atau ukuran amplop.<br>
        4. Algoritma: Tuliskan prosedur berurutan: jika nilai >= 85, kelompokkan ke kelas peminatan A; jika tidak, lakukan uji bakat lanjutan.
      </div>
    `,
    keyPoints: [
      "Informatika adalah sains pengolahan informasi dan otomatisasi pemikiran.",
      "Empat pilar: Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma.",
      "Berpikir komputasional dapat diterapkan sebelum menyentuh kode program apapun."
    ],
    quizId: "quiz-info-01"
  },
  {
    id: "les-02",
    subjectId: "sub-info",
    order: 2,
    title: "2. Algoritma dan Pseudocode",
    duration: "60 Menit",
    objectives: [
      "Memahami esensi dan karakteristik utama algoritma (finiteness, definiteness, input, output, effectiveness).",
      "Menulis representasi algoritma menggunakan pseudocode berstandar industri.",
      "Mengidentifikasi 3 struktur kontrol dasar: Runtunan (Sequence), Pemilihan (Selection), dan Perulangan (Iteration)."
    ],
    content: `
      <p>Algoritma adalah urutan instruksi terhingga, terdefinisi secara presisi, dan tidak memiliki ambiguitas untuk menyelesaikan suatu tugas spesifik. Dalam rekayasa perangkat lunak, sebelum menulis kode mesin atau bahasa pemrograman tertentu, perancang menggunakan <strong>Pseudocode</strong>.</p>
      <p>Pseudocode adalah representasi algoritma berbasis bahasa manusia yang terstruktur rapi, menyerupai pola instruksi komputer namun bebas dari kerumitan sintaks bahasa pemrograman tertentu.</p>
      
      <h4>Tiga Struktur Kontrol Fundamental:</h4>
      <ul>
        <li><strong>Runtunan (Sequence):</strong> Baris instruksi dieksekusi baris demi baris dari atas ke bawah secara berurutan.</li>
        <li><strong>Pemilihan (Selection/Condition):</strong> Jalur eksekusi ditentukan berdasarkan evaluasi kebenaran kondisi logika (benar atau salah).</li>
        <li><strong>Perulangan (Iteration/Loop):</strong> Blok instruksi diulang beberapa kali hingga kondisi berhenti terpenuhi.</li>
      </ul>
    `,
    examples: `
      <div class="code-box">
        <strong>Contoh Pseudocode Menghitung Nilai Kelulusan:</strong><br>
        <pre>
ALGORITMA CekKelulusan
DEKLARASI:
    nama : STRING
    nilaiUjian : REAL
    status : STRING
DESKRIPSI:
    BACA nama, nilaiUjian
    JIKA (nilaiUjian >= 75) MAKA
        status <- "LULUS"
    SELAIN_ITU
        status <- "REMIDIAL"
    AKHIR_JIKA
    TAMPILKAN "Siswa ", nama, " dinyatakan: ", status
AKHIR_ALGORITMA
        </pre>
      </div>
    `,
    keyPoints: [
      "Algoritma harus memiliki kondisi berhenti (finiteness) dan tidak ambigu (definiteness).",
      "Pseudocode menjembatani logika pemikiran manusia dengan sintaks formal komputer.",
      "Semua program komputer tersusun dari tiga kombinasi dasar: runtunan, pemilihan, dan perulangan."
    ],
    quizId: "quiz-info-01"
  },
  {
    id: "les-03",
    subjectId: "sub-info",
    order: 3,
    title: "3. Flowchart (Diagram Alir)",
    duration: "50 Menit",
    objectives: [
      "Mengenal simbol-simbol standar internasional ANSI/ISO dalam perancangan diagram alir.",
      "Membaca dan memetakan alur logika percabangan serta perulangan melalui diagram visual.",
      "Menghindari kesalahan umum perancangan flowchart seperti 'infinite loop' dan arah panah tak berujung."
    ],
    content: `
      <p>Flowchart adalah representasi grafis dua dimensi dari suatu algoritma. Keunggulan flowchart adalah memberikan pemahaman visual intuitif kepada analis sistem, programmer, dan pemangku kepentingan tanpa terhalang baris sintaks.</p>
      
      <h4>Simbol-Simbol Standar Flowchart:</h4>
      <ul>
        <li><strong>Terminator (Oval / Kapsul):</strong> Menandai titik awal (Start) atau akhir (End) dari sebuah alur proses.</li>
        <li><strong>Input/Output (Jajaran Genjang):</strong> Menunjukkan proses pemasukan data atau pencetakan keluaran.</li>
        <li><strong>Proses (Persegi Panjang):</strong> Menunjukkan operasi komputasi aritmatika atau manipulasi data memori.</li>
        <li><strong>Decision (Belah Ketupat / Diamond):</strong> Menunjukkan percabangan keputusan logika bercabang dua (Yes/No atau True/False).</li>
        <li><strong>Flow Line (Garis Berpanah):</strong> Menunjukkan arah jalannya instruksi dari satu langkah ke langkah berikutnya.</li>
        <li><strong>Connector (Lingkaran Kecil):</strong> Menghubungkan alur pada satu halaman tanpa garis bersilangan.</li>
      </ul>
    `,
    examples: `
      <div class="code-box">
        <strong>Peta Logika Diagram Alir: Penarikan Uang Tunai ATM</strong><br>
        [Start] -> [/Input PIN/] -> <PIN Valid?> <br>
        &nbsp;&nbsp;├─ [TIDAK] -> [Tampilkan 'PIN Salah'] -> <Percobaan >= 3?> ── [YA] -> [/Kartu Diblokir/] -> [End]<br>
        &nbsp;&nbsp;└─ [YA] -> [/Input Nominal Saldo/] -> <Saldo Cukup?> <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ [TIDAK] -> [Tampilkan 'Saldo Kurang'] -> [End]<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ [YA] -> [Keluarkan Uang & Kurangi Saldo] -> [/Cetak Resi/] -> [End]
      </div>
    `,
    keyPoints: [
      "Simbol diamond selalu memiliki minimal dua cabang keluaran (Yes/No).",
      "Diagram alir yang baik hanya memiliki satu titik Mulai dan satu titik Selesai yang jelas.",
      "Garis alur tidak boleh terputus atau mengambang tanpa tujuan."
    ],
    quizId: "quiz-info-01"
  },
  {
    id: "les-04",
    subjectId: "sub-info",
    order: 4,
    title: "4. Dasar Pemrograman",
    duration: "55 Menit",
    objectives: [
      "Memahami konsep bahasa tingkat tinggi, tingkat menengah, dan bahasa mesin.",
      "Mengetahui perbedaan mekanisme kerja Compiler versus Interpreter.",
      "Mengenal lingkungan pengembangan perangkat lunak (IDE, editor kode, dan runtime)."
    ],
    content: `
      <p>Komputer pada tingkat perangkat keras hanya memahami bilangan biner (tegangan tinggi/rendah yang direpresentasikan sebagai 0 dan 1). Manusia menciptakan <strong>bahasa pemrograman tingkat tinggi</strong> (seperti Python, JavaScript, C++, Java) agar instruksi dapat ditulis dengan kosakata bahasa Inggris yang terstruktur.</p>
      
      <h4>Mekanisme Penerjemahan Kode:</h4>
      <ul>
        <li><strong>Kompilasi (Compiler):</strong> Seluruh kode sumber diterjemahkan sekaligus ke berkas biner eksekusi (.exe atau format mesin) sebelum dijalankan. Contoh: C++, Rust, Go. Keunggulan: eksekusi sangat cepat.</li>
        <li><strong>Interpretasi (Interpreter):</strong> Kode sumber dibaca, diurai, dan dieksekusi baris demi baris secara langsung saat program berjalan. Contoh: JavaScript di peramban web, Python standar. Keunggulan: fleksibilitas tinggi dan debugging interaktif.</li>
        <li><strong>Model Hibrida:</strong> Mengompilasi kode ke bytecode menengah terlebih dahulu, kemudian dijalankan oleh Virtual Machine (JVM pada Java, V8 JIT pada JavaScript).</li>
      </ul>
    `,
    examples: `
      <div class="code-box">
        <strong>Perbandingan Eksekusi Program:</strong><br>
        Kompilasi: Source Code (.cpp) ──[Compiler]──> Machine Code (.exe) ──> Eksekusi CPU<br>
        Interpretasi: Source Code (.js) ──[Browser Engine V8]──> Eksekusi Langsung Baris per Baris
      </div>
    `,
    keyPoints: [
      "Compiler menerjemahkan seluruh berkas sekaligus; Interpreter mengeksekusi baris demi baris.",
      "Sintaks adalah aturan tata bahasa pemrograman; Semantik adalah makna logika di balik kode.",
      "Bug sintaks terdeteksi saat parsing; bug logika hanya terlihat saat output tidak sesuai harapan."
    ],
    quizId: "quiz-info-01"
  },
  {
    id: "les-05",
    subjectId: "sub-info",
    order: 5,
    title: "5. Variabel, Tipe Data, dan Operator",
    duration: "60 Menit",
    objectives: [
      "Memahami fungsi variabel sebagai penampung data di memori komputer.",
      "Menguasai ragam tipe data primitif: Integer, Float/Real, String, Boolean.",
      "Menerapkan operator aritmatika, perbandingan, dan logika dalam ekspresi kalkulasi."
    ],
    content: `
      <p>Dalam memori komputer, <strong>variabel</strong> adalah label atau wadah bernama yang menunjuk pada alamat memori tertentu untuk menyimpan nilai yang dapat dimutasi selama eksekusi berlangsung.</p>
      
      <h4>Ragam Tipe Data Primitif:</h4>
      <ul>
        <li><strong>Integer (Bilangan Bulat):</strong> Nilai angka tanpa desimal (misal: -10, 0, 42).</li>
        <li><strong>Float / Real (Bilangan Pecahan):</strong> Nilai angka berdesimal presisi (misal: 3.14, 0.005).</li>
        <li><strong>String (Teks):</strong> Untaian karakter yang diapit tanda petik (misal: "EduSchool Indonesia").</li>
        <li><strong>Boolean (Kebenaran):</strong> Hanya memiliki dua kondisi pasti: <code>true</code> (benar) atau <code>false</code> (salah).</li>
      </ul>

      <h4>Kategori Operator:</h4>
      <ul>
        <li><strong>Aritmatika:</strong> Penjumlahan (+), Pengurangan (-), Perkalian (*), Pembagian (/), Modulo/Sisa Bagi (%).</li>
        <li><strong>Perbandingan / Relasional:</strong> Sama dengan (== atau ===), Tidak sama (!=), Lebih besar (>), Lebih kecil (<), >=, <=. Menghasilkan nilai boolean.</li>
        <li><strong>Logika:</strong> AND (&&), OR (||), NOT (!). Digunakan untuk menggabungkan kondisi kondisional.</li>
      </ul>
    `,
    examples: `
      <div class="code-box">
        <strong>Operasi Logika & Modulo:</strong><br>
        <pre>
let angka = 17;
let sisaBagi = angka % 2; // Menghasilkan 1
let isGanjil = (sisaBagi === 1); // Bernilai true

let usia = 16;
let punyaKartuPelajar = true;
let dapatDiskon = (usia < 18) && punyaKartuPelajar; // Bernilai true
        </pre>
      </div>
    `,
    keyPoints: [
      "Operator modulo (%) mengembalikan sisa pembagian bilangan bulat.",
      "Operator logika AND mensyaratkan semua operan bernilai benar untuk menghasilkan nilai true.",
      "Ketetapan tipe data menjamin ketepatan kalkulasi dan efisiensi alokasi memori RAM."
    ],
    quizId: "quiz-info-01"
  },
  {
    id: "les-06",
    subjectId: "sub-info",
    order: 6,
    title: "6. Percabangan dan Perulangan",
    duration: "65 Menit",
    objectives: [
      "Mengimplementasikan struktur percabangan: if, else if, else, dan switch-case.",
      "Membangun struktur perulangan terhitung (for loop) dan perulangan bersyarat (while, do-while).",
      "Memahami fungsi kendali perulangan: kata kunci break dan continue."
    ],
    content: `
      <p>Kemampuan komputer untuk mengambil keputusan dan melakukan tugas repetitif jutaan kali per detik diwujudkan melalui dua konstruksi sintaksis: <strong>Percabangan (Conditionals)</strong> dan <strong>Perulangan (Loops)</strong>.</p>
      
      <h4>Konstruksi Percabangan:</h4>
      <ul>
        <li><code>if - else</code>: Mengevaluasi ekspresi boolean; mengeksekusi blok kode alternatif bila kondisi awal salah.</li>
        <li><code>switch - case</code>: Memilih salah satu dari sekian banyak nilai konstan yang cocok secara langsung, lebih bersih dibanding if-else bertingkat.</li>
      </ul>

      <h4>Konstruksi Perulangan:</h4>
      <ul>
        <li><code>for loop</code>: Digunakan ketika jumlah iterasi telah diketahui pasti di awal (memiliki inisialisasi, kondisi henti, dan step counter).</li>
        <li><code>while loop</code>: Mengevaluasi kondisi di awal; terus berulang selama kondisi bernilai true. Berisiko infinite loop bila variabel kontrol tidak diubah di dalam blok.</li>
        <li><code>do-while loop</code>: Menjalankan badan perulangan minimal satu kali sebelum memeriksa kondisi henti.</li>
      </ul>
    `,
    examples: `
      <div class="code-box">
        <strong>Perulangan Menghitung Bilangan Genap:</strong><br>
        <pre>
let total = 0;
for (let i = 2; i <= 10; i += 2) {
    total += i; // 2 + 4 + 6 + 8 + 10 = 30
}
console.log("Total genap:", total);
        </pre>
      </div>
    `,
    keyPoints: [
      "Perulangan tanpa kondisi terminasi yang tercapai akan memicu hang (infinite loop).",
      "Pernyataan 'break' menghentikan perulangan seketika; 'continue' melompati iterasi saat ini ke iterasi berikutnya.",
      "Gunakan switch-case untuk pencocokan nilai diskrit tunggal yang banyak."
    ],
    quizId: "quiz-info-01"
  },
  {
    id: "les-07",
    subjectId: "sub-info",
    order: 7,
    title: "7. Struktur Data Dasar",
    duration: "60 Menit",
    objectives: [
      "Memahami pentingnya struktur data dalam efisiensi penyimpanan dan manipulasi informasi.",
      "Menguasai karakteristik Array/List, Stack (LIFO), dan Queue (FIFO).",
      "Mengenal struktur asosiatif (Hash Map, Dictionary, atau Objek Kunci-Nilai)."
    ],
    content: `
      <p>Algoritma tidak dapat bekerja tanpa data. Cara data diorganisasikan, dikaitkan, dan disimpan di dalam memori komputer disebut <strong>Struktur Data</strong>. Pemilihan struktur data yang tepat menentukan efisiensi komputasi dari segi waktu (waktu pemrosesan) dan ruang (penggunaan memori).</p>
      
      <h4>Kategori Struktur Data Dasar:</h4>
      <ul>
        <li><strong>Array (Larik):</strong> Kumpulan elemen data sejenis yang tersusun secara berurutan dan diakses menggunakan nomor indeks bilangan bulat (dimulai dari indeks 0).</li>
        <li><strong>Stack (Tumpukan):</strong> Berprinsip <em>LIFO (Last In First Out)</em> — elemen yang terakhir dimasukkan adalah elemen pertama yang dikeluarkan. Operasi utama: <code>push</code> (tambah) dan <code>pop</code> (ambil). Contoh: fitur 'Undo' pada pengolah kata.</li>
        <li><strong>Queue (Antrean):</strong> Berprinsip <em>FIFO (First In First Out)</em> — elemen yang pertama tiba adalah yang pertama dilayani. Operasi utama: <code>enqueue</code> (masuk) dan <code>dequeue</code> (keluar). Contoh: antrean pencetakan dokumen pada printer.</li>
        <li><strong>Key-Value Pair (Hash Map / Object):</strong> Menyimpan pasangan kunci unik dan nilai, memungkinkan pencarian instan berdasar label string.</li>
      </ul>
    `,
    examples: `
      <div class="code-box">
        <strong>Perbandingan LIFO vs FIFO:</strong><br>
        Stack (Tumpukan Piring): Piring baru ditumpuk di atas (push), piring teratas diambil dulu (pop).<br>
        Queue (Antrean Kasir): Pembeli pertama datang di depan (enqueue), kasir melayani pembeli terdepan dulu (dequeue).
      </div>
    `,
    keyPoints: [
      "Indeks Array pada mayoritas bahasa pemrograman modern berawal dari angka nol (0).",
      "Stack bekerja dengan prinsip LIFO; Queue bekerja dengan prinsip FIFO.",
      "Hash table memberikan kecepatan akses data rata-rata O(1) berbasis kunci unik."
    ],
    quizId: "quiz-info-01"
  },
  {
    id: "les-08",
    subjectId: "sub-info",
    order: 8,
    title: "8. Jaringan Komputer dan Internet",
    duration: "55 Menit",
    objectives: [
      "Memahami konsep dasar konektivitas, LAN, WAN, dan jaringan internet global.",
      "Mengenal model client-server, protokol komunikasi (TCP/IP, HTTP, HTTPS).",
      "Memahami fungsi IP Address, MAC Address, dan sistem penamaan Domain Name System (DNS)."
    ],
    content: `
      <p>Jaringan komputer adalah sistem yang menghubungkan dua atau lebih perangkat komputasi otonom untuk saling bertukar sumber daya, data, dan layanan komunikasi melalui media kabel atau nirkabel (wireless).</p>
      
      <h4>Komponen dan Protokol Jaringan Vital:</h4>
      <ul>
        <li><strong>IP Address:</strong> Alamat numerik unik yang mengidentifikasi setiap perangkat di internet (IPv4 format 32-bit misal 192.168.1.1, dan IPv6 format 128-bit).</li>
        <li><strong>DNS (Domain Name System):</strong> 'Buku telepon internet' yang menerjemahkan nama domain yang mudah diingat manusia (seperti <code>eduschool.sch.id</code>) menjadi IP address numerik mesin.</li>
        <li><strong>Protokol HTTP & HTTPS:</strong> Aturan baku transfer dokumen hiperteks pada World Wide Web. Huruf 'S' pada HTTPS menandakan adanya enkripsi <em>Transport Layer Security (TLS/SSL)</em>.</li>
        <li><strong>Arsitektur Client-Server:</strong> Client (seperti web browser di laptop siswa) mengirimkan permintaan (request), dan Server memproses lalu mengembalikan data respon (response).</li>
      </ul>
    `,
    examples: `
      <div class="code-box">
        <strong>Perjalanan Saat Membuka Website:</strong><br>
        1. Pengguna mengetik: "https://eduschool.sch.id"<br>
        2. Browser bertanya ke Server DNS: "Berapa IP dari eduschool.sch.id?" -> DNS menjawab: "103.20.15.8"<br>
        3. Browser membuat sambungan aman TLS ke 103.20.15.8 port 443.<br>
        4. Server mengembalikan berkas HTML, CSS, dan JavaScript ke browser.
      </div>
    `,
    keyPoints: [
      "DNS menerjemahkan nama domain manusia menjadi alamat IP perangkat keras.",
      "HTTPS mengenkripsi aliran lalu lintas data sehingga kebal dari penyadapan man-in-the-middle.",
      "Arsitektur client-server memisahkan pihak pemohon layanan dan pihak penyedia sumber daya."
    ],
    quizId: "quiz-info-01"
  },
  {
    id: "les-09",
    subjectId: "sub-info",
    order: 9,
    title: "9. Keamanan Digital dan Etika Siber",
    duration: "50 Menit",
    objectives: [
      "Mengidentifikasi ancaman keamanan siber: Malware, Phishing, Ransomware, dan Social Engineering.",
      "Menerapkan prinsip kebersihan siber (Cyber Hygiene): kata sandi kuat, Multi-Factor Authentication (MFA/2FA).",
      "Memahami jejak digital (digital footprint) dan etika privasi data pribadi."
    ],
    content: `
      <p>Keterbukaan ruang digital membawa risiko kerentanan data dan privasi. <strong>Keamanan Informasi (Cybersecurity)</strong> berlandaskan pada <em>Triad CIA</em>: Kerahasiaan (Confidentiality), Integritas (Integrity), dan Ketersediaan (Availability).</p>
      
      <h4>Bentuk Serangan Siber Paling Umum:</h4>
      <ul>
        <li><strong>Phishing:</strong> Rekayasa tipu daya lewat email, SMS, atau situs palsu untuk memancing korban menyerahkan kata sandi atau data perbankan rahasia.</li>
        <li><strong>Malware & Ransomware:</strong> Program jahat yang menginfeksi sistem, merusak berkas, atau menyandera data dengan enkripsi tebusan.</li>
        <li><strong>Social Engineering:</strong> Manipulasi psikologis manusia untuk membocorkan informasi rahasia tanpa sadar.</li>
      </ul>

      <h4>Langkah Perlindungan Praktis:</h4>
      <ul>
        <li>Gunakan kata sandi dengan entropi tinggi (kombinasi huruf besar, kecil, angka, simbol) dan jangan pernah menggunakan satu kata sandi untuk semua akun.</li>
        <li>Aktifkan <strong>Two-Factor Authentication (2FA)</strong> yang mengirimkan kode OTP atau kunci otentikator.</li>
        <li>Waspada terhadap tautan pendek yang mencurigakan dan jangan membagikan data identitas pribadi (NIK, nama ibu kandung) di media publik.</li>
      </ul>
    `,
    examples: `
      <div class="code-box">
        <strong>Pemeriksaan Tautan Phishing:</strong><br>
        Resmi: https://accounts.eduschool.sch.id/login (Domain utama adalah eduschool.sch.id)<br>
        Palsu: http://eduschool.sch.id.login-verifikasi.xyz (Domain aslinya adalah login-verifikasi.xyz, bukan eduschool!)
      </div>
    `,
    keyPoints: [
      "Mata rantai terlemah dalam keamanan siber kerap kali adalah faktor kelalaian manusia (social engineering).",
      "2FA memberikan lapisan pertahanan kedua bahkan jika kata sandi utama telah bocor.",
      "Jejak digital bersifat permanen dan dapat memengaruhi reputasi masa depan."
    ],
    quizId: "quiz-info-01"
  },
  {
    id: "les-10",
    subjectId: "sub-info",
    order: 10,
    title: "10. Analisis Data dan Literasi Digital",
    duration: "55 Menit",
    objectives: [
      "Memahami siklus hidup data: Pengumpulan, Pembersihan, Analisis, dan Visualisasi.",
      "Membedakan konsep data mentah, informasi, wawasan (insight), dan keputusan berbasis data.",
      "Mengenal prinsip dasar Kecerdasan Buatan (AI) serta etika penggunaan teknologi cerdas."
    ],
    content: `
      <p>Di era ekonomi berbasis data, data mentah diibaratkan seperti minyak bumi yang belum disuling. Melalui <strong>Analisis Data</strong>, sekumpulan angka mentah diolah menjadi informasi berharga yang memandu pengambilan keputusan strategis.</p>
      
      <h4>Tahapan Siklus Analisis Data:</h4>
      <ul>
        <li><strong>1. Pengumpulan (Data Collection):</strong> Menghimpun data relevan melalui sensor, formulir survei, atau log sistem.</li>
        <li><strong>2. Pembersihan (Data Cleaning):</strong> Menghapus data duplikat, memperbaiki nilai yang hilang (missing values), dan standardisasi format.</li>
        <li><strong>3. Analisis Eksploratif:</strong> Mencari korelasi, nilai rata-rata, median, persebaran frekuensi, dan anomali.</li>
        <li><strong>4. Visualisasi & Komunikasi:</strong> Menyajikan temuan dalam bentuk grafik batang, pie, atau diagram garis yang mudah dicerna khalayak.</li>
      </ul>

      <h4>Etika dan Kecerdasan Buatan (AI):</h4>
      <p>Pemanfaatan model pembelajaran mesin (Machine Learning) dan Generative AI harus diimbangi dengan integritas akademik, penghormatan terhadap hak cipta, dan verifikasi fakta terhadap potensi 'halusinasi data'.</p>
    `,
    examples: `
      <div class="code-box">
        <strong>Dari Data Menjadi Keputusan Cerdas:</strong><br>
        - Data Mentah: Nilai kuis siswa [55, 60, 58, 90, 85, 52]<br>
        - Informasi: 66% siswa memperoleh nilai di bawah standar KKM pada topik 'Struktur Data Dasar'.<br>
        - Wawasan (Insight): Materi struktur data membutuhkan metode pengajaran interaktif visual.<br>
        - Keputusan: Guru menjadwalkan sesi demonstrasi animasi visualisasi Stack dan Queue.
      </div>
    `,
    keyPoints: [
      "Data mentah tidak memiliki makna sebelum diproses dan dikontekstualisasikan menjadi informasi.",
      "Visualisasi data yang efektif menyederhanakan kompleksitas tanpa memanipulasi kebenaran statistik.",
      "Penggunaan teknologi AI harus dilandasi etika, transparansi, dan verifikasi kritis."
    ],
    quizId: "quiz-info-01"
  }
];

// Minimal 10 Soal Informatika Lengkap dengan Kunci Jawaban & Pembahasan Mendalam
const DEFAULT_QUIZZES = [
  {
    id: "quiz-info-01",
    subjectId: "sub-info",
    title: "Evaluasi Komprehensif Dasar Informatika & Algoritma",
    description: "Uji pemahaman komprehensif 10 modul pembelajaran Informatika mencakup computational thinking, algoritma, pemrograman, struktur data, jaringan, dan keamanan siber.",
    timeLimitMinutes: 20,
    passingScore: 75,
    questions: [
      {
        id: "q-1",
        text: "Memecah suatu permasalahan kompleks menjadi beberapa bagian komponen yang lebih kecil dan lebih terfokus agar lebih mudah dianalisis serta diselesaikan disebut pilar...",
        options: [
          "A. Abstraksi (Abstraction)",
          "B. Dekomposisi (Decomposition)",
          "C. Pengenalan Pola (Pattern Recognition)",
          "D. Perancangan Algoritma (Algorithm Design)"
        ],
        answerIndex: 1,
        explanation: "Dekomposisi adalah teknik komputasional untuk mengurai permasalahan kompleks menjadi sub-masalah kecil yang mandiri dan terkelola secara bertahap."
      },
      {
        id: "q-2",
        text: "Karakteristik penting dari sebuah algoritma yang menyatakan bahwa algoritma tersebut harus berhenti setelah mengeksekusi sejumlah langkah berhingga disebut...",
        options: [
          "A. Definiteness",
          "B. Effectiveness",
          "C. Finiteness",
          "D. Generality"
        ],
        answerIndex: 2,
        explanation: "Finiteness (keterhinggaan) mensyaratkan algoritma harus memiliki kondisi penghenti dan tidak boleh berjalan tanpa akhir (infinite loop)."
      },
      {
        id: "q-3",
        text: "Dalam diagram alir (flowchart) berstandar internasional ANSI, simbol berbentuk belah ketupat (diamond) secara spesifik digunakan untuk menggambarkan...",
        options: [
          "A. Masukan atau keluaran data (Input/Output)",
          "B. Titik awal atau akhir program (Terminator)",
          "C. Operasi pengolahan atau komputasi aritmatika",
          "D. Percabangan kondisi keputusan logika (Decision)"
        ],
        answerIndex: 3,
        explanation: "Simbol belah ketupat (diamond) melambangkan pengambilan keputusan logika dengan dua jalur keluaran berdasarkan evaluasi kondisi (Yes/No atau True/False)."
      },
      {
        id: "q-4",
        text: "Manakah perbedaan mendasar yang paling tepat antara Compiler dan Interpreter dalam mengeksekusi kode program komputer?",
        options: [
          "A. Compiler menerjemahkan seluruh kode program sekaligus menjadi kode objek, sedangkan Interpreter membaca dan mengeksekusi kode baris demi baris.",
          "B. Compiler hanya untuk bahasa web, sedangkan Interpreter hanya untuk sistem operasi.",
          "C. Interpreter tidak membutuhkan memori RAM, sedangkan Compiler membutuhkan internet aktif.",
          "D. Compiler selalu menghasilkan program yang lebih lambat dibanding Interpreter."
        ],
        answerIndex: 0,
        explanation: "Compiler mengonversi seluruh kode sumber ke bahasa mesin sebelum program dieksekusi, sedangkan Interpreter menerjemahkan serta mengeksekusi instruksi secara bertahap per baris saat program dijalankan."
      },
      {
        id: "q-5",
        text: "Jika variabel x = 19, maka hasil dari operasi aritmatika modulo: (x % 4) adalah...",
        options: [
          "A. 4",
          "B. 3",
          "C. 2",
          "D. 1"
        ],
        answerIndex: 1,
        explanation: "Operasi modulo (%) menghasilkan sisa pembagian bilangan bulat. 19 dibagi 4 menghasilkan 4 dengan sisa 3 (karena 4 * 4 = 16, dan 19 - 16 = 3)."
      },
      {
        id: "q-6",
        text: "Diberikan perulangan: for (let i = 1; i <= 5; i++) { if (i === 3) continue; cetak(i); }. Nilai yang TIDAK akan dicetak ke layar adalah...",
        options: [
          "A. 1",
          "B. 2",
          "C. 3",
          "D. 5"
        ],
        answerIndex: 2,
        explanation: "Pernyataan 'continue' memerintahkan eksekusi untuk melompati sisa blok kode pada iterasi saat ini dan langsung berpindah ke iterasi berikutnya, sehingga angka 3 tidak dicetak."
      },
      {
        id: "q-7",
        text: "Struktur data yang beroperasi dengan prinsip LIFO (Last In First Out) di mana data yang paling akhir dimasukkan menjadi data yang pertama kali diambil adalah...",
        options: [
          "A. Queue (Antrean)",
          "B. Stack (Tumpukan)",
          "C. Linked List",
          "D. Binary Search Tree"
        ],
        answerIndex: 1,
        explanation: "Stack berprinsip LIFO (Last In First Out), mirip tumpukan piring di mana piring paling atas yang baru ditaruh akan diambil pertama kali."
      },
      {
        id: "q-8",
        text: "Layanan pada jaringan internet yang bertugas menerjemahkan nama domain manusia (misal: eduschool.sch.id) menjadi alamat numerik IP Address adalah...",
        options: [
          "A. DHCP (Dynamic Host Configuration Protocol)",
          "B. DNS (Domain Name System)",
          "C. FTP (File Transfer Protocol)",
          "D. SNMP (Simple Network Management Protocol)"
        ],
        answerIndex: 1,
        explanation: "DNS (Domain Name System) berfungsi sebagai basis data direktori terdistribusi yang memetakan nama domain berhuruf menjadi alamat IP numerik."
      },
      {
        id: "q-9",
        text: "Metode serangan siber di mana pelaku menyamar sebagai entitas resmi tepercaya melalui pesan elektronik palsu demi memancing korban menyerahkan kredensial pribadi disebut...",
        options: [
          "A. Phishing",
          "B. Distributed Denial of Service (DDoS)",
          "C. Brute Force Attack",
          "D. SQL Injection"
        ],
        answerIndex: 0,
        explanation: "Phishing adalah bentuk manipulasi rekayasa sosial di mana penyerang membuat umpan digital palsu agar korban terdorong memberikan data sensitif secara sukarela."
      },
      {
        id: "q-10",
        text: "Mengapa tahap 'Data Cleaning' (Pembersihan Data) sangat krusial dalam siklus analisis data sebelum tahap pemodelan atau visualisasi?",
        options: [
          "A. Karena dapat mengubah data angka menjadi gambar secara otomatis tanpa software.",
          "B. Untuk mengeliminasi duplikasi, anomali, dan ketidakkonsistenan agar hasil keputusan tidak bias (Garbage In, Garbage Out).",
          "C. Agar ukuran berkas data selalu berkurang tepat 50% dari ukuran semula.",
          "D. Karena komputer tidak dapat membaca berkas yang memiliki lebih dari satu kolom."
        ],
        answerIndex: 1,
        explanation: "Data yang kotor menghasilkan inferensi yang keliru ('Garbage In, Garbage Out'). Pembersihan data menjamin integritas dan akurasi model analisis."
      }
    ]
  }
];

// Riwayat Kuis Siswa
const DEFAULT_QUIZ_RESULTS = [
  {
    id: "res-01",
    studentId: "usr-siswa-1",
    studentName: "Ahmad Rizky Pratama",
    quizId: "quiz-info-01",
    quizTitle: "Evaluasi Komprehensif Dasar Informatika & Algoritma",
    subjectName: "Informatika",
    score: 90,
    totalQuestions: 10,
    correctCount: 9,
    wrongCount: 1,
    timeSpent: "11 Menit 42 Detik",
    completedAt: "2024-10-10 10:45",
    answers: { "q-1": 1, "q-2": 2, "q-3": 3, "q-4": 0, "q-5": 1, "q-6": 2, "q-7": 1, "q-8": 1, "q-9": 0, "q-10": 0 }
  },
  {
    id: "res-02",
    studentId: "usr-siswa-2",
    studentName: "Siti Aisyah Rahma",
    quizId: "quiz-info-01",
    quizTitle: "Evaluasi Komprehensif Dasar Informatika & Algoritma",
    subjectName: "Informatika",
    score: 100,
    totalQuestions: 10,
    correctCount: 10,
    wrongCount: 0,
    timeSpent: "09 Menit 15 Detik",
    completedAt: "2024-10-10 10:30",
    answers: {}
  },
  {
    id: "res-03",
    studentId: "usr-siswa-3",
    studentName: "Budi Santoso",
    quizId: "quiz-info-01",
    quizTitle: "Evaluasi Komprehensif Dasar Informatika & Algoritma",
    subjectName: "Informatika",
    score: 80,
    totalQuestions: 10,
    correctCount: 8,
    wrongCount: 2,
    timeSpent: "14 Menit 05 Detik",
    completedAt: "2024-10-10 11:10",
    answers: {}
  }
];

// Progress Penyelesaian Materi Siswa (Map: lessonId -> boolean)
const DEFAULT_LESSON_PROGRESS = {
  "les-01": true,
  "les-02": true,
  "les-03": true,
  "les-04": true,
  "les-05": true,
  "les-06": false,
  "les-07": false,
  "les-08": false,
  "les-09": false,
  "les-10": false
};

// Data Absensi
const DEFAULT_ATTENDANCE = [
  {
    id: "att-101",
    studentId: "usr-siswa-1",
    studentName: "Ahmad Rizky Pratama",
    date: "2024-10-12",
    subject: "Informatika",
    teacher: "Dra. Sri Wahyuni, M.Kom.",
    time: "07:35",
    status: "Hadir", // Hadir, Izin, Sakit, Alpa
    session: "Pertemuan 8 - Jaringan Komputer & Internet",
    note: "Tepat waktu di lab komputer"
  },
  {
    id: "att-102",
    studentId: "usr-siswa-1",
    studentName: "Ahmad Rizky Pratama",
    date: "2024-10-10",
    subject: "Informatika",
    teacher: "Dra. Sri Wahyuni, M.Kom.",
    time: "07:31",
    status: "Hadir",
    session: "Pertemuan 7 - Struktur Data Dasar",
    note: "Hadir aktif"
  },
  {
    id: "att-103",
    studentId: "usr-siswa-1",
    studentName: "Ahmad Rizky Pratama",
    date: "2024-10-07",
    subject: "Informatika",
    teacher: "Dra. Sri Wahyuni, M.Kom.",
    time: "08:10",
    status: "Izin",
    session: "Pertemuan 6 - Percabangan dan Perulangan",
    note: "Izin mengikuti lomba sains luar kota"
  },
  {
    id: "att-104",
    studentId: "usr-siswa-1",
    studentName: "Ahmad Rizky Pratama",
    date: "2024-10-03",
    subject: "Informatika",
    teacher: "Dra. Sri Wahyuni, M.Kom.",
    time: "07:29",
    status: "Hadir",
    session: "Pertemuan 5 - Variabel & Tipe Data",
    note: "Hadir tepat waktu"
  },
  {
    id: "att-105",
    studentId: "usr-siswa-2",
    studentName: "Siti Aisyah Rahma",
    date: "2024-10-12",
    subject: "Informatika",
    teacher: "Dra. Sri Wahyuni, M.Kom.",
    time: "07:25",
    status: "Hadir",
    session: "Pertemuan 8 - Jaringan Komputer & Internet",
    note: "Hadir"
  },
  {
    id: "att-106",
    studentId: "usr-siswa-3",
    studentName: "Budi Santoso",
    date: "2024-10-12",
    subject: "Informatika",
    teacher: "Dra. Sri Wahyuni, M.Kom.",
    time: "-",
    status: "Sakit",
    session: "Pertemuan 8 - Jaringan Komputer & Internet",
    note: "Surat keterangan dokter terlampir"
  },
  {
    id: "att-107",
    studentId: "usr-siswa-4",
    studentName: "Cantika Dewi",
    date: "2024-10-12",
    subject: "Informatika",
    teacher: "Dra. Sri Wahyuni, M.Kom.",
    time: "07:38",
    status: "Hadir",
    session: "Pertemuan 8 - Jaringan Komputer & Internet",
    note: "Hadir"
  },
  {
    id: "att-108",
    studentId: "usr-siswa-5",
    studentName: "Daffa Rayhan Putra",
    date: "2024-10-12",
    subject: "Informatika",
    teacher: "Dra. Sri Wahyuni, M.Kom.",
    time: "-",
    status: "Alpa",
    session: "Pertemuan 8 - Jaringan Komputer & Internet",
    note: "Tanpa keterangan"
  }
];

// Jadwal Pelajaran Mingguan
const DEFAULT_SCHEDULES = [
  { id: "sch-1", day: "Senin", startTime: "07:30", endTime: "09:00", subject: "Informatika", teacher: "Dra. Sri Wahyuni, M.Kom.", room: "Lab Komputer 1", class: "X-Informatika 1", color: "#C5A253" },
  { id: "sch-2", day: "Senin", startTime: "09:30", endTime: "11:00", subject: "Matematika Diskrit", teacher: "Bambang Sudirman, S.Pd., M.Mat.", room: "Ruang Teori 102", class: "X-Informatika 1", color: "#4A6FA5" },
  { id: "sch-3", day: "Selasa", startTime: "07:30", endTime: "09:00", subject: "Bahasa Inggris Akademik", teacher: "Elizabeth Caroline, M.Ed.", room: "Ruang Bahasa 2", class: "X-Informatika 1", color: "#5B8E7D" },
  { id: "sch-4", day: "Selasa", startTime: "09:30", endTime: "11:00", subject: "Fisika Komputasi", teacher: "Dr. Agus Salim, M.Si.", room: "Lab Fisika Modern", class: "X-Informatika 1", color: "#8B5FBF" },
  { id: "sch-5", day: "Rabu", startTime: "07:30", endTime: "09:45", subject: "Informatika (Praktikum Pemrograman)", teacher: "Dra. Sri Wahyuni, M.Kom.", room: "Lab Komputer 1", class: "X-Informatika 1", color: "#C5A253" },
  { id: "sch-6", day: "Kamis", startTime: "08:00", endTime: "10:15", subject: "Matematika Diskrit", teacher: "Bambang Sudirman, S.Pd., M.Mat.", room: "Ruang Teori 102", class: "X-Informatika 1", color: "#4A6FA5" },
  { id: "sch-7", day: "Jumat", startTime: "07:30", endTime: "09:00", subject: "Pengembangan Proyek Riset (IRIS)", teacher: "Tim Pendidik Riset", room: "Studio Multimedia", class: "X-Informatika 1", color: "#B37D28" }
];

// Pengumuman
const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "anc-01",
    title: "Pelaksanaan Evaluasi Tengah Semester (ETS) Ganjil TA 2024/2025",
    category: "Akademik",
    date: "11 Oktober 2024",
    author: "Wakil Kepala Sekolah Bidang Akademik",
    read: false,
    content: "Diberitahukan kepada seluruh siswa kelas X dan XI bahwa Evaluasi Tengah Semester (ETS) akan diselenggarakan serentak secara digital pada tanggal 21-25 Oktober 2024. Harap mempersiapkan akun EduSchool dan menyelesaikan modul prasyarat."
  },
  {
    id: "anc-02",
    title: "Pendaftaran Seleksi Internal Olimpiade Sains Nasional (OSN) Informatika",
    category: "Kompetisi",
    date: "08 Oktober 2024",
    author: "Dra. Sri Wahyuni, M.Kom.",
    read: true,
    content: "Pendaftaran klub pembinaan OSN bidang Komputer dan Informatika telah dibuka hingga akhir pekan ini. Siswa dengan nilai modul algoritma di atas 85 diundang untuk mengikuti tes saringan tertulis."
  },
  {
    id: "anc-03",
    title: "Pemeliharaan Jaringan Server Lab Komputasi Utama",
    category: "Fasilitas",
    date: "04 Oktober 2024",
    author: "Tim IT Support EduSchool",
    read: true,
    content: "Akan dilakukan upgrade firmware saklar gigabit dan pemeliharaan pendingin ruang server pada hari Sabtu pukul 14:00 - 18:00 WIB. Selama durasi tersebut, akses server lokal akan mengalami penurunan kecepatan sesaat."
  }
];
