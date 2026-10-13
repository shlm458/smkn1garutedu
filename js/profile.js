/**
 * SMK AL-MADANI GARUT - USER PROFILE CONTROLLER
 * Menampilkan detail profil pengguna (siswa atau guru), statistik aktivitas,
 * serta formulir edit profil yang tersimpan ke localStorage.
 */

const ProfileManager = {
  init() {
    App.init("profil");
    this.renderProfileDetails();
    this.populateEditForm();
  },

  renderProfileDetails() {
    const user = AuthManager.getCurrentUser();
    const isGuru = user.role === "guru";

    document.getElementById("profile-display-avatar").textContent = user.avatar || "👤";
    document.getElementById("profile-display-name").textContent = user.name;
    document.getElementById("profile-display-role").textContent = isGuru ? "Pendidik / Guru Pengampu" : `Siswa (${user.class || "X-Informatika 1"})`;
    document.getElementById("profile-display-id").textContent = isGuru ? `NIP: ${user.nip || "-"}` : `NIS: ${user.nis || "-"}`;
    document.getElementById("profile-display-email").textContent = user.email || "-";
    document.getElementById("profile-display-phone").textContent = user.phone || "-";
    document.getElementById("profile-display-bio").textContent = user.bio || "Tidak ada deskripsi bio.";

    // Detail aktivitas
    if (!isGuru) {
      const progressMap = StorageManager.getLessonProgress();
      const results = StorageManager.getQuizResults().filter(r => r.studentId === user.id);
      const completedCount = Object.values(progressMap).filter(Boolean).length;

      document.getElementById("profile-stat-activity-1").textContent = `${completedCount} Modul`;
      document.getElementById("profile-stat-activity-2").textContent = `${results.length} Kuis Selesai`;
    } else {
      const lessons = StorageManager.getLessons();
      const students = StorageManager.getStudents();
      document.getElementById("profile-stat-activity-1").textContent = `${lessons.length} Modul Terbit`;
      document.getElementById("profile-stat-activity-2").textContent = `${students.length} Siswa Bimbingan`;
    }
  },

  populateEditForm() {
    const user = AuthManager.getCurrentUser();
    document.getElementById("form-edit-name").value = user.name || "";
    document.getElementById("form-edit-email").value = user.email || "";
    document.getElementById("form-edit-phone").value = user.phone || "";
    document.getElementById("form-edit-bio").value = user.bio || "";
    document.getElementById("form-edit-avatar").value = user.avatar || "👨‍🎓";
  },

  saveProfile(event) {
    event.preventDefault();
    const user = AuthManager.getCurrentUser();

    const name = document.getElementById("form-edit-name").value.trim();
    const email = document.getElementById("form-edit-email").value.trim();
    const phone = document.getElementById("form-edit-phone").value.trim();
    const bio = document.getElementById("form-edit-bio").value.trim();
    const avatar = document.getElementById("form-edit-avatar").value;

    if (!name || !email) {
      App.toast("Gagal", "Nama dan email tidak boleh kosong.", "danger");
      return;
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.bio = bio;
    user.avatar = avatar;

    AuthManager.setCurrentUser(user);
    App.toast("Profil Disimpan", "Informasi profil berhasil diperbarui.", "success");

    // Re-render
    this.renderProfileDetails();
    App.renderSidebar("profil");
    App.renderTopbar();
  }
};
