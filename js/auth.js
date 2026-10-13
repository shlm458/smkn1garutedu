/**
 * SMK AL-MADANI GARUT - AUTHENTICATION & SESSION MANAGER
 * Mengelola sesi demonstrasi, pemilihan peran (Siswa/Guru), dan proteksi rute halaman.
 * Catatan: Ini adalah autentikasi demonstrasi frontend berbasis localStorage, bukan keamanan produksi.
 */

const AuthManager = {
  /**
   * Mengambil pengguna yang sedang login saat ini
   */
  getCurrentUser() {
    const user = StorageManager.get(STORAGE_KEYS.CURRENT_USER);
    if (!user) {
      // Default fallback jika belum ada sesi: Masuk sebagai Siswa
      return DEFAULT_USERS.siswa;
    }
    return user;
  },

  /**
   * Menyimpan sesi pengguna saat ini
   */
  setCurrentUser(user) {
    StorageManager.set(STORAGE_KEYS.CURRENT_USER, user);
  },

  /**
   * Login demonstrasi dengan peran
   */
  loginAs(role) {
    if (role === "guru") {
      this.setCurrentUser(DEFAULT_USERS.guru);
      window.location.href = "dashboard-guru.html";
    } else {
      this.setCurrentUser(DEFAULT_USERS.siswa);
      window.location.href = "dashboard-siswa.html";
    }
  },

  /**
   * Login manual via form login demonstrasi
   */
  loginWithCredentials(identifier, password, selectedRole) {
    // Validasi dummy sederhana
    if (!identifier || !password) {
      return { success: false, message: "Kredensial tidak boleh kosong." };
    }

    if (selectedRole === "guru") {
      this.setCurrentUser(DEFAULT_USERS.guru);
      return { success: true, redirect: "dashboard-guru.html" };
    } else {
      this.setCurrentUser(DEFAULT_USERS.siswa);
      return { success: true, redirect: "dashboard-siswa.html" };
    }
  },

  /**
   * Beralih peran langsung (Quick Switch Role Siswa <-> Guru)
   */
  switchRole(targetRole) {
    if (targetRole === "guru") {
      this.setCurrentUser(DEFAULT_USERS.guru);
      window.location.href = "dashboard-guru.html";
    } else {
      this.setCurrentUser(DEFAULT_USERS.siswa);
      window.location.href = "dashboard-siswa.html";
    }
  },

  /**
   * Logout dan kembali ke halaman login demonstrasi
   */
  logout() {
    // Simpan role default kembali ke siswa atau bersihkan sesi
    this.setCurrentUser(DEFAULT_USERS.siswa);
    window.location.href = "login.html";
  },

  /**
   * Memeriksa hak akses halaman.
   * Jika dipanggil dengan requiredRole, pastikan role pengguna saat ini sesuai.
   */
  guardRoute(requiredRole = null) {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = "login.html";
      return false;
    }

    if (requiredRole && user.role !== requiredRole) {
      if (user.role === "guru") {
        window.location.href = "dashboard-guru.html";
      } else {
        window.location.href = "dashboard-siswa.html";
      }
      return false;
    }

    return true;
  }
};
