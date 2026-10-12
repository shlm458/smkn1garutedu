/**
 * EDUSCHOOL - GRADES & ACADEMIC PERFORMANCE CONTROLLER
 * Menghitung GPA/Rata-rata, rekap nilai kuis & tugas, visualisasi grafik SVG,
 * dan fitur cetak transkrip nilai demonstrasi.
 */

const GradeManager = {
  init() {
    App.init("nilai");
    const user = AuthManager.getCurrentUser();

    if (user.role === "guru") {
      this.initTeacherGrades();
    } else {
      this.initStudentGrades();
    }
  },

  /**
   * --- TAMPILAN SISWA ---
   */
  initStudentGrades() {
    document.getElementById("view-student-grades").style.display = "block";
    document.getElementById("view-teacher-grades").style.display = "none";

    this.renderStudentOverview();
    this.renderStudentGradeTable();
    this.renderSvgPerformanceChart();
  },

  renderStudentOverview() {
    const user = AuthManager.getCurrentUser();
    const results = StorageManager.getQuizResults().filter(r => r.studentId === user.id);
    const lessons = StorageManager.getLessons();
    const progressMap = StorageManager.getLessonProgress();

    const completedLessons = Object.values(progressMap).filter(Boolean).length;
    const lessonPercent = lessons.length > 0 ? Math.round((completedLessons / lessons.length) * 100) : 0;

    let avg = 88.5;
    let highest = 90;
    if (results.length > 0) {
      const scores = results.map(r => r.score);
      highest = Math.max(...scores);
      avg = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
    }

    document.getElementById("student-grade-avg").textContent = avg;
    document.getElementById("student-grade-highest").textContent = highest;
    document.getElementById("student-grade-quizzes").textContent = `${results.length} Kuis`;
    document.getElementById("student-grade-progress").textContent = `${lessonPercent}%`;
  },

  renderStudentGradeTable() {
    const user = AuthManager.getCurrentUser();
    const results = StorageManager.getQuizResults().filter(r => r.studentId === user.id);
    const tbody = document.getElementById("student-grades-table-body");
    if (!tbody) return;

    if (results.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="empty-state-desc" style="text-align: center;">Belum ada data nilai kuis.</td></tr>`;
      return;
    }

    tbody.innerHTML = results
      .map(
        r => `
      <tr>
        <td style="font-weight: 600;">${r.quizTitle}</td>
        <td>${r.subjectName}</td>
        <td>${r.completedAt}</td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${r.timeSpent}</td>
        <td style="font-weight: 800; font-size: 1.15rem; color: ${r.score >= 75 ? "var(--success)" : "var(--danger)"};">
          ${r.score}
        </td>
        <td>
          <span class="badge ${r.score >= 75 ? "badge-success" : "badge-warning"}">
            ${r.score >= 75 ? "Tuntas" : "Remedial"}
          </span>
        </td>
      </tr>
    `
      )
      .join("");
  },

  renderSvgPerformanceChart() {
    const chartContainer = document.getElementById("svg-chart-container");
    if (!chartContainer) return;

    const dataPoints = [
      { label: "Modul 1", score: 85 },
      { label: "Modul 2", score: 90 },
      { label: "Modul 3", score: 95 },
      { label: "Modul 4", score: 88 },
      { label: "Modul 5", score: 92 },
      { label: "Kuis 1", score: 90 }
    ];

    const width = 600;
    const height = 220;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxScore = 100;
    const barWidth = 42;
    const step = chartWidth / dataPoints.length;

    let barsSvg = "";
    dataPoints.forEach((point, idx) => {
      const x = padding + idx * step + (step - barWidth) / 2;
      const barH = (point.score / maxScore) * chartHeight;
      const y = height - padding - barH;

      barsSvg += `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="4" fill="url(#goldGrad)" />
        <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="12" font-weight="700" fill="#222">${point.score}</text>
        <text x="${x + barWidth / 2}" y="${height - padding + 18}" text-anchor="middle" font-size="11" fill="#777">${point.label}</text>
      `;
    });

    chartContainer.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; max-height: 240px; overflow: visible;">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#C5A253" />
            <stop offset="100%" stop-color="#A58437" />
          </linearGradient>
        </defs>
        <!-- Garis Referensi Standar KKM (75) -->
        <line x1="${padding}" y1="${height - padding - (75 / 100) * chartHeight}" x2="${width - padding}" y2="${height - padding - (75 / 100) * chartHeight}" stroke="#E6D6AC" stroke-dasharray="4" stroke-width="1.5" />
        <text x="${width - padding + 5}" y="${height - padding - (75 / 100) * chartHeight + 4}" font-size="10" fill="#A58437">KKM: 75</text>
        <!-- Sumbu X Dasar -->
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#EAE6DC" stroke-width="1.5" />
        ${barsSvg}
      </svg>
    `;
  },

  /**
   * --- TAMPILAN GURU ---
   */
  initTeacherGrades() {
    document.getElementById("view-student-grades").style.display = "none";
    document.getElementById("view-teacher-grades").style.display = "block";

    const students = StorageManager.getStudents();
    const tbody = document.getElementById("teacher-grades-table-body");
    if (!tbody) return;

    tbody.innerHTML = students
      .map(
        std => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.1rem;">${std.avatar}</span>
            <div>
              <div style="font-weight: 600;">${std.name}</div>
              <div style="font-size: 0.74rem; color: var(--text-light);">NIS: ${std.nis}</div>
            </div>
          </div>
        </td>
        <td>${std.class}</td>
        <td style="font-weight: 800; font-size: 1.15rem; color: ${std.scoreAvg >= 85 ? "var(--success)" : "var(--text-dark)"};">
          ${std.scoreAvg}
        </td>
        <td>
          <span class="badge ${std.scoreAvg >= 75 ? "badge-success" : "badge-warning"}">
            ${std.scoreAvg >= 85 ? "Sangat Baik (A)" : std.scoreAvg >= 75 ? "Baik (B)" : "Cukup (C)"}
          </span>
        </td>
        <td>${std.attendanceRate}%</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="alert('Transkrip nilai digital ${std.name} siap dicetak.')">
            Cetak Rapor
          </button>
        </td>
      </tr>
    `
      )
      .join("");
  },

  printReportCard() {
    window.print();
  }
};
