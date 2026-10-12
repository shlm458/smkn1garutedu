/**
 * EDUSCHOOL - CONTROLLER DASHBOARD GURU
 * Mengelola metrik pengajaran, rekap kelas, evaluasi hasil kuis siswa dummy,
 * dan tindakan cepat untuk pendidik.
 */

const GuruDashboard = {
  init() {
    AuthManager.guardRoute("guru");
    App.init("dashboard");
    this.renderGreeting();
    this.renderStats();
    this.renderStudentList();
    this.renderQuizOverview();
    this.renderAttendanceSummary();
  },

  renderGreeting() {
    const user = AuthManager.getCurrentUser();
    const greetingEl = document.getElementById("teacher-greeting");
    const subGreetingEl = document.getElementById("teacher-subgreeting");

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
      subGreetingEl.textContent = `NIP: ${user.nip || "198305142008012005"} • Pengampu: ${user.subject || "Informatika"} • Koordinator Kurikulum Digital`;
    }
  },

  renderStats() {
    const lessons = StorageManager.getLessons();
    const students = StorageManager.getStudents();
    const quizzes = StorageManager.getQuizzes();
    const quizResults = StorageManager.getQuizResults();

    // Rata-rata nilai kuis kelas
    let avgScore = 0;
    if (quizResults.length > 0) {
      const sum = quizResults.reduce((acc, c) => acc + c.score, 0);
      avgScore = Math.round((sum / quizResults.length) * 10) / 10;
    }

    const elStudents = document.getElementById("teacher-stat-students");
    if (elStudents) elStudents.textContent = students.length;

    const elLessons = document.getElementById("teacher-stat-lessons");
    if (elLessons) elLessons.textContent = lessons.length;

    const elQuizzes = document.getElementById("teacher-stat-quizzes");
    if (elQuizzes) elQuizzes.textContent = quizzes.length;

    const elAvg = document.getElementById("teacher-stat-avg");
    if (elAvg) elAvg.textContent = avgScore > 0 ? avgScore : "90.0";
  },

  renderStudentList() {
    const students = StorageManager.getStudents();
    const container = document.getElementById("teacher-students-table-body");
    if (!container) return;

    container.innerHTML = students
      .map(
        std => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 1.2rem;">${std.avatar}</div>
            <div>
              <div style="font-weight: 600; color: var(--text-dark);">${std.name}</div>
              <div style="font-size: 0.76rem; color: var(--text-light);">NIS: ${std.nis}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-neutral">${std.class}</span></td>
        <td style="font-weight: 700; color: ${std.scoreAvg >= 85 ? "var(--success)" : "var(--text-dark)"};">
          ${std.scoreAvg}
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="progress-container" style="width: 70px;">
              <div class="progress-bar" style="width: ${std.attendanceRate}%;"></div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 600;">${std.attendanceRate}%</span>
          </div>
        </td>
        <td>
          <a href="absensi.html" class="btn btn-outline btn-sm" title="Periksa Kehadiran">
            Presensi
          </a>
        </td>
      </tr>
    `
      )
      .join("");
  },

  renderQuizOverview() {
    const results = StorageManager.getQuizResults();
    const container = document.getElementById("teacher-recent-results-list");
    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = `<div class="empty-state-desc">Belum ada siswa yang mengumpulkan kuis.</div>`;
      return;
    }

    container.innerHTML = results
      .slice(0, 4)
      .map(
        res => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <div style="font-weight: 600; font-size: 0.88rem; color: var(--text-dark);">${res.studentName}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${res.quizTitle} • Durasi: ${res.timeSpent}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.15rem; font-weight: 800; color: ${res.score >= 75 ? "var(--success)" : "var(--danger)"};">
            ${res.score}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-light);">${res.completedAt.split(" ")[0]}</div>
        </div>
      </div>
    `
      )
      .join("");
  },

  renderAttendanceSummary() {
    const attendance = StorageManager.getAttendance();
    const container = document.getElementById("teacher-attendance-today-list");
    if (!container) return;

    // Filter presensi terbaru
    const latest = attendance.slice(0, 5);
    container.innerHTML = latest
      .map(
        att => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <div style="font-weight: 600; font-size: 0.86rem; color: var(--text-dark);">${att.studentName}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">${att.session}</div>
        </div>
        <div>
          <span class="badge ${
            att.status === "Hadir"
              ? "badge-success"
              : att.status === "Izin"
              ? "badge-warning"
              : att.status === "Sakit"
              ? "badge-neutral"
              : "badge-danger"
          }">
            ${att.status} (${att.time})
          </span>
        </div>
      </div>
    `
      )
      .join("");
  }
};
