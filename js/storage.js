/**
 * SMK AL-MADANI GARUT - LOCALSTORAGE MANAGER
 * Mengelola persistensi data demonstrasi, inisialisasi awal, sinkronisasi state,
 * dan fitur reset data ke kondisi default.
 */

const STORAGE_KEYS = {
  VERSION: "smkalmadani_version_v1.0",
  SCHOOL: "smkalmadani_school_data",
  CURRENT_USER: "smkalmadani_current_user",
  STUDENTS: "smkalmadani_students_data",
  SUBJECTS: "smkalmadani_subjects_data",
  LESSONS: "smkalmadani_lessons_data",
  LESSON_PROGRESS: "smkalmadani_lesson_progress",
  QUIZZES: "smkalmadani_quizzes_data",
  QUIZ_RESULTS: "smkalmadani_quiz_results",
  ATTENDANCE: "smkalmadani_attendance_data",
  SCHEDULES: "smkalmadani_schedules_data",
  ANNOUNCEMENTS: "smkalmadani_announcements_data"
};

const StorageManager = {
  /**
   * Inisialisasi awal: jika localStorage kosong atau versinya berbeda, muat data bawaan
   */
  init() {
    const isInitialized = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (!isInitialized) {
      this.resetAllData(false); // Inisialisasi awal tanpa notifikasi toast
    }
  },

  /**
   * Mengambil data dari localStorage dengan fallback data default
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Gagal membaca localStorage [${key}]:`, e);
      return defaultValue;
    }
  },

  /**
   * Menyimpan data ke localStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Gagal menulis localStorage [${key}]:`, e);
      return false;
    }
  },

  /**
   * Mengambil data sekolah
   */
  getSchoolData() {
    return this.get(STORAGE_KEYS.SCHOOL, DEFAULT_SCHOOL_DATA);
  },

  /**
   * Menyimpan data sekolah
   */
  saveSchoolData(data) {
    return this.set(STORAGE_KEYS.SCHOOL, data);
  },

  /**
   * Mengambil daftar materi
   */
  getLessons() {
    return this.get(STORAGE_KEYS.LESSONS, DEFAULT_LESSONS);
  },

  /**
   * Menyimpan daftar materi
   */
  saveLessons(lessons) {
    return this.set(STORAGE_KEYS.LESSONS, lessons);
  },

  /**
   * Mengambil progress materi siswa
   */
  getLessonProgress(studentId) {
    const progressMap = this.get(STORAGE_KEYS.LESSON_PROGRESS, DEFAULT_LESSON_PROGRESS);
    return progressMap || {};
  },

  /**
   * Menandai status penyelesaian materi siswa
   */
  toggleLessonProgress(lessonId, isCompleted = true) {
    const progress = this.get(STORAGE_KEYS.LESSON_PROGRESS, DEFAULT_LESSON_PROGRESS);
    progress[lessonId] = isCompleted;
    this.set(STORAGE_KEYS.LESSON_PROGRESS, progress);
    return progress;
  },

  /**
   * Mengambil daftar kuis
   */
  getQuizzes() {
    return this.get(STORAGE_KEYS.QUIZZES, DEFAULT_QUIZZES);
  },

  /**
   * Menyimpan daftar kuis
   */
  saveQuizzes(quizzes) {
    return this.set(STORAGE_KEYS.QUIZZES, quizzes);
  },

  /**
   * Mengambil hasil kuis
   */
  getQuizResults() {
    return this.get(STORAGE_KEYS.QUIZ_RESULTS, DEFAULT_QUIZ_RESULTS);
  },

  /**
   * Menambahkan hasil kuis baru
   */
  addQuizResult(result) {
    const results = this.getQuizResults();
    results.unshift(result);
    this.set(STORAGE_KEYS.QUIZ_RESULTS, results);
    return results;
  },

  /**
   * Mengambil data absensi
   */
  getAttendance() {
    return this.get(STORAGE_KEYS.ATTENDANCE, DEFAULT_ATTENDANCE);
  },

  /**
   * Menyimpan data absensi
   */
  saveAttendance(records) {
    return this.set(STORAGE_KEYS.ATTENDANCE, records);
  },

  /**
   * Menambahkan record absensi baru
   */
  addAttendanceRecord(record) {
    const records = this.getAttendance();
    records.unshift(record);
    this.set(STORAGE_KEYS.ATTENDANCE, records);
    return records;
  },

  /**
   * Mengambil daftar siswa
   */
  getStudents() {
    return this.get(STORAGE_KEYS.STUDENTS, DEFAULT_STUDENTS);
  },

  /**
   * Mengambil jadwal pelajaran
   */
  getSchedules() {
    return this.get(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);
  },

  /**
   * Mengambil pengumuman
   */
  getAnnouncements() {
    return this.get(STORAGE_KEYS.ANNOUNCEMENTS, DEFAULT_ANNOUNCEMENTS);
  },

  /**
   * Menyimpan pengumuman
   */
  saveAnnouncements(list) {
    return this.set(STORAGE_KEYS.ANNOUNCEMENTS, list);
  },

  /**
   * Mengambil daftar mata pelajaran
   */
  getSubjects() {
    return this.get(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
  },

  /**
   * Reset seluruh data localStorage ke kondisi bawaan awal
   */
  resetAllData(reloadPage = true) {
    localStorage.setItem(STORAGE_KEYS.VERSION, "v1.0");
    localStorage.setItem(STORAGE_KEYS.SCHOOL, JSON.stringify(DEFAULT_SCHOOL_DATA));
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(DEFAULT_STUDENTS));
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(DEFAULT_LESSONS));
    localStorage.setItem(STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(DEFAULT_LESSON_PROGRESS));
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(DEFAULT_QUIZZES));
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(DEFAULT_QUIZ_RESULTS));
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(DEFAULT_ATTENDANCE));
    localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(DEFAULT_SCHEDULES));
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    
    // Default logged in user: Siswa
    const currentUser = DEFAULT_USERS.siswa;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));

    if (reloadPage && typeof window !== "undefined") {
      window.location.reload();
    }
  }
};

// Jalankan auto-init saat script terbaca
StorageManager.init();
