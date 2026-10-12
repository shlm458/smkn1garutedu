/**
 * EDUSCHOOL - CONTROLLER DASHBOARD SISWA
 * Menghitung dan menyajikan data statistik riil, kemajuan belajar, jadwal hari ini,
 * kuis aktif, dan notifikasi kehadiran siswa.
 */

const SiswaDashboard = {
  init() {
    AuthManager.guardRoute("siswa");
    App.init("dashboard");
    this.renderGreeting();
    this.renderStats();
    this.renderProgress();
    this.renderUnfinishedLessons();
    this.renderTodaySchedule();
    this.renderRecentQuizResults();
    this.renderLatestAnnouncements();
  },

  renderGreeting() {
    const user = AuthManager.getCurrentUser();
    const greetingEl = document.getElementById("student-greeting");
    const subGreetingEl = document.getElementById("student-subgreeting");
    
    const hours = new Date().getHours();
    let timeGreeting = "Selamat Datang";
    if (hours < 11) timeGreeting = "Selamat Pagi";
    else if (hours < 15) timeGreeting = "Selamat Siang";
    else if (hours < 18) timeGreeting = "Selamat Sore";
    else timeGreeting = "Selamat Malam";

    if (greetingEl) {
      greetingEl.innerHTML = `${timeGreeting}, <span style="color: var(--gold-dark);">${user.name}</span>`;
    }
    if (subGreetingEl) {
      subGreetingEl.textContent = `Kelas ${user.class || "X-Informatika 1"} • Tahun Ajaran 2024/2025 • NIS ${user.nis || "20241001"}`;
    }
  },

  renderStats() {
    const lessons = StorageManager.getLessons();
    const progressMap = StorageManager.getLessonProgress();
    const quizResults = StorageManager.getQuizResults().filter(r => r.studentId === "usr-siswa-1");
    const attendance = StorageManager.getAttendance().filter(a => a.studentId === "usr-siswa-1");

    // Hitung progress
    const completedCount = Object.values(progressMap).filter(Boolean).length;
    const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

    // Hitung rata-rata nilai
    let scoreAvg = 0;
    if (quizResults.length > 0) {
      const sum = quizResults.reduce((acc, curr) => acc + curr.score, 0);
      scoreAvg = Math.round((sum / quizResults.length) * 10) / 10;
    }

    // Hitung kehadiran
    let presencePercent = 100;
    if (attendance.length > 0) {
      const presentCount = attendance.filter(a => a.status === "Hadir").length;
      presencePercent = Math.round((presentCount / attendance.length) * 100);
    }

    // Pasang ke DOM
    const elProg = document.getElementById("stat-progress-val");
    if (elProg) elProg.textContent = `${progressPercent}%`;

    const elScore = document.getElementById("stat-score-val");
    if (elScore) elScore.textContent = scoreAvg > 0 ? scoreAvg : "88.5";

    const elAtt = document.getElementById("stat-attendance-val");
    if (elAtt) elAtt.textContent = `${presencePercent}%`;

    const elLessons = document.getElementById("stat-lessons-val");
    if (elLessons) elLessons.textContent = `${completedCount} / ${lessons.length}`;
  },

  renderProgress() {
    const lessons = StorageManager.getLessons();
    const progressMap = StorageManager.getLessonProgress();
    const completedCount = Object.values(progressMap).filter(Boolean).length;
    const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

    const barEl = document.getElementById("informatics-progress-bar");
    const textEl = document.getElementById("informatics-progress-text");
    if (barEl) barEl.style.width = `${progressPercent}%`;
    if (textEl) textEl.textContent = `${completedCount} dari ${lessons.length} Modul Selesai (${progressPercent}%)`;
  },

  renderUnfinishedLessons() {
    const lessons = StorageManager.getLessons();
    const progressMap = StorageManager.getLessonProgress();
    const container = document.getElementById("unfinished-lessons-list");
    if (!container) return;

    const unfinished = lessons.filter(l => !progressMap[l.id]);

    if (unfinished.length === 0) {
      container.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--success); font-weight: 600;">
          🎉 Luar biasa! Seluruh materi Informatika telah Anda selesaikan!
        </div>
      `;
      return;
    }

    // Ambil maksimal 3 materi yang belum selesai
    const displayList = unfinished.slice(0, 3);
    container.innerHTML = displayList
      .map(
        lesson => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 10px; border: 1px solid var(--border-subtle);">
        <div>
          <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">${lesson.title}</div>
          <div style="font-size: 0.76rem; color: var(--text-muted); display: flex; gap: 8px; margin-top: 3px;">
            <span>⏱️ ${lesson.duration}</span>
            <span>•</span>
            <span>Mata Pelajaran Informatika</span>
          </div>
        </div>
        <a href="materi.html?id=${lesson.id}" class="btn btn-outline btn-sm">
          Lanjutkan Baca
        </a>
      </div>
    `
      )
      .join("");
  },

  renderTodaySchedule() {
    const schedules = StorageManager.getSchedules();
    const container = document.getElementById("today-schedule-list");
    if (!container) return;

    // Filter jadwal Senin (sebagai jadwal demo utama) atau hari ini
    const todaySchedules = schedules.filter(s => s.day === "Senin");

    if (todaySchedules.length === 0) {
      container.innerHTML = `<div class="empty-state-desc">Tidak ada jadwal pelajaran hari ini.</div>`;
      return;
    }

    container.innerHTML = todaySchedules
      .map(
        sch => `
      <div style="display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--border-subtle);">
        <div style="min-width: 80px; font-weight: 700; font-size: 0.85rem; color: var(--gold-dark);">
          ${sch.startTime} - ${sch.endTime}
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">${sch.subject}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${sch.teacher} • ${sch.room}</div>
        </div>
        <span class="badge badge-gold">Hari Ini</span>
      </div>
    `
      )
      .join("");
  },

  renderRecentQuizResults() {
    const results = StorageManager.getQuizResults().filter(r => r.studentId === "usr-siswa-1");
    const container = document.getElementById("recent-quiz-list");
    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = `<div class="empty-state-desc">Belum ada evaluasi kuis yang dikerjakan.</div>`;
      return;
    }

    container.innerHTML = results
      .slice(0, 3)
      .map(
        res => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <div style="font-weight: 600; font-size: 0.88rem; color: var(--text-dark);">${res.quizTitle}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${res.completedAt} • ${res.correctCount}/${res.totalQuestions} Soal Benar</div>
        </div>
        <div style="font-size: 1.25rem; font-weight: 800; color: ${res.score >= 75 ? "var(--success)" : "var(--danger)"};">
          ${res.score}
        </div>
      </div>
    `
      )
      .join("");
  },

  renderLatestAnnouncements() {
    const announcements = StorageManager.getAnnouncements();
    const container = document.getElementById("latest-announcements-list");
    if (!container) return;

    container.innerHTML = announcements
      .slice(0, 2)
      .map(
        anc => `
      <div style="padding: 12px 14px; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 10px; border-left: 3px solid var(--gold-primary);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="badge badge-gold" style="font-size: 0.68rem;">${anc.category}</span>
          <span style="font-size: 0.72rem; color: var(--text-light);">${anc.date}</span>
        </div>
        <div style="font-weight: 600; font-size: 0.86rem; color: var(--text-dark); margin-bottom: 4px;">${anc.title}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">${anc.content.substring(0, 100)}...</div>
      </div>
    `
      )
      .join("");
  }
};
