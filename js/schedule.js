/**
 * EDUSCHOOL - SCHEDULE CONTROLLER
 * Menampilkan jadwal pelajaran mingguan, penanda otomatis hari ini,
 * serta filter hari untuk siswa dan guru.
 */

const ScheduleManager = {
  currentDayFilter: "Semua",

  init() {
    App.init("jadwal");
    this.highlightCurrentDayTab();
    this.renderSchedules();
  },

  filterDay(day) {
    this.currentDayFilter = day;
    document.querySelectorAll(".tab-day-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.day === day);
    });
    this.renderSchedules();
  },

  highlightCurrentDayTab() {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const todayIndex = new Date().getDay();
    const todayName = days[todayIndex];

    const todayIndicator = document.getElementById("today-day-indicator");
    if (todayIndicator) {
      todayIndicator.textContent = `Hari ini: ${todayName}`;
    }
  },

  renderSchedules() {
    let schedules = StorageManager.getSchedules();
    const container = document.getElementById("schedules-grid");
    if (!container) return;

    if (this.currentDayFilter !== "Semua") {
      schedules = schedules.filter(s => s.day === this.currentDayFilter);
    }

    if (schedules.length === 0) {
      container.innerHTML = `
        <div class="card empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">${renderIcon("calendar")}</div>
          <div class="empty-state-title">Tidak Ada Jadwal</div>
          <div class="empty-state-desc">Tidak terdapat sesi pembelajaran yang dijadwalkan pada filter hari ini.</div>
        </div>
      `;
      return;
    }

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const todayName = days[new Date().getDay()];

    container.innerHTML = schedules
      .map(sch => {
        const isToday = sch.day === todayName || (todayName === "Minggu" && sch.day === "Senin");
        return `
          <div class="card" style="border-top: 4px solid ${sch.color || "var(--gold-primary)"}; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <span class="badge badge-gold">${sch.day}</span>
              ${isToday ? '<span class="badge badge-success">✓ Sesi Hari Ini</span>' : ""}
            </div>

            <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-dark); margin-bottom: 4px;">
              ${sch.subject}
            </div>

            <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--gold-dark); margin-bottom: 14px; font-size: 0.95rem;">
              ${renderIcon("clock")}
              <span>${sch.startTime} - ${sch.endTime} WIB</span>
            </div>

            <div style="background: var(--bg-subtle); padding: 10px 14px; border-radius: var(--radius-md); font-size: 0.84rem; display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-light);">Pengampu:</span>
                <span style="font-weight: 600; color: var(--text-dark);">${sch.teacher}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-light);">Ruangan:</span>
                <span style="font-weight: 600; color: var(--text-dark);">${sch.room}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-light);">Kelas:</span>
                <span style="font-weight: 600; color: var(--text-dark);">${sch.class}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }
};
