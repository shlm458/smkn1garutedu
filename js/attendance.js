/**
 * SMK AL-MADANI GARUT - ATTENDANCE CONTROLLER
 * Menangani simulasi presensi mandiri bagi siswa dengan pencegahan absensi ganda,
 * serta rekapitulasi, filter, dan modifikasi status kehadiran oleh guru.
 */

const AttendanceManager = {
  currentFilterSubject: "all",
  currentFilterDate: "",

  init() {
    App.init("absensi");
    const user = AuthManager.getCurrentUser();

    if (user.role === "guru") {
      this.initTeacherView();
    } else {
      this.initStudentView();
    }
  },

  /**
   * --- TAMPILAN SISWA ---
   */
  initStudentView() {
    document.getElementById("view-student-attendance").style.display = "block";
    document.getElementById("view-teacher-attendance").style.display = "none";

    this.renderStudentStats();
    this.renderStudentHistory();
    this.checkTodayAttendanceState();
  },

  renderStudentStats() {
    const user = AuthManager.getCurrentUser();
    const allRecords = StorageManager.getAttendance();
    const records = allRecords.filter(r => r.studentId === user.id);

    const total = records.length;
    const hadir = records.filter(r => r.status === "Hadir").length;
    const izin = records.filter(r => r.status === "Izin").length;
    const sakit = records.filter(r => r.status === "Sakit").length;
    const alpa = records.filter(r => r.status === "Alpa").length;

    const rate = total > 0 ? Math.round((hadir / total) * 100) : 100;

    const elRate = document.getElementById("att-student-rate");
    if (elRate) elRate.textContent = `${rate}%`;

    const elTotal = document.getElementById("att-student-total");
    if (elTotal) elTotal.textContent = `${total} Sesi`;

    const elHadir = document.getElementById("att-student-hadir");
    if (elHadir) elHadir.textContent = `${hadir} Kali`;

    const elIzin = document.getElementById("att-student-izin");
    if (elIzin) elIzin.textContent = `${izin} Kali`;

    const elSakit = document.getElementById("att-student-sakit");
    if (elSakit) elSakit.textContent = `${sakit} Kali`;

    const elAlpa = document.getElementById("att-student-alpa");
    if (elAlpa) elAlpa.textContent = `${alpa} Kali`;
  },

  checkTodayAttendanceState() {
    const user = AuthManager.getCurrentUser();
    const today = new Date().toISOString().split("T")[0];
    const sessionName = "Pertemuan 8 - Jaringan Komputer & Internet";

    const records = StorageManager.getAttendance();
    const alreadyAttended = records.some(
      r => r.studentId === user.id && r.date === today && r.session === sessionName
    );

    const btnCheckIn = document.getElementById("btn-do-checkin");
    const statusNotice = document.getElementById("checkin-status-notice");

    if (btnCheckIn) {
      if (alreadyAttended) {
        btnCheckIn.disabled = true;
        btnCheckIn.className = "btn btn-outline";
        btnCheckIn.innerHTML = "✓ Sudah Melakukan Presensi Hari Ini";
        if (statusNotice) {
          statusNotice.innerHTML = `<span style="color: var(--success); font-weight: 600;">✓ Presensi sesi hari ini telah tercatat di sistem pada pukul 07:35 WIB.</span>`;
        }
      } else {
        btnCheckIn.disabled = false;
        btnCheckIn.className = "btn btn-primary";
        btnCheckIn.innerHTML = "Lakukan Simulasi Presensi Hadir Sekarang";
        if (statusNotice) {
          statusNotice.innerHTML = `<span>Sesi presensi aktif dibuka hingga pukul 08:30 WIB.</span>`;
        }
      }
    }
  },

  studentCheckIn() {
    const user = AuthManager.getCurrentUser();
    const today = new Date().toISOString().split("T")[0];
    const sessionName = "Pertemuan 8 - Jaringan Komputer & Internet";

    const records = StorageManager.getAttendance();
    const alreadyAttended = records.some(
      r => r.studentId === user.id && r.date === today && r.session === sessionName
    );

    if (alreadyAttended) {
      App.toast(
        "Presensi Ganda Dicegah",
        "Anda sudah melakukan presensi untuk sesi dan mata pelajaran ini hari ini.",
        "warning"
      );
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newRecord = {
      id: `att-${Date.now()}`,
      studentId: user.id,
      studentName: user.name,
      date: today,
      subject: "Informatika",
      teacher: "Dra. Sri Wahyuni, M.Kom.",
      time: timeStr,
      status: "Hadir",
      session: sessionName,
      note: "Presensi mandiri digital melalui portal siswa"
    };

    StorageManager.addAttendanceRecord(newRecord);
    App.toast("Presensi Berhasil", `Kehadiran Anda pada ${sessionName} berhasil dicatat.`, "success");

    this.renderStudentStats();
    this.renderStudentHistory();
    this.checkTodayAttendanceState();
  },

  renderStudentHistory() {
    const user = AuthManager.getCurrentUser();
    const records = StorageManager.getAttendance().filter(r => r.studentId === user.id);
    const tbody = document.getElementById("student-attendance-table-body");
    if (!tbody) return;

    if (records.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="empty-state-desc" style="text-align: center;">Belum ada riwayat presensi.</td></tr>`;
      return;
    }

    tbody.innerHTML = records
      .map(
        r => `
      <tr>
        <td style="font-weight: 600;">${r.date}</td>
        <td>${r.subject}</td>
        <td style="font-size: 0.84rem;">${r.session}</td>
        <td>${r.time}</td>
        <td>
          <span class="badge ${
            r.status === "Hadir"
              ? "badge-success"
              : r.status === "Izin"
              ? "badge-warning"
              : r.status === "Sakit"
              ? "badge-neutral"
              : "badge-danger"
          }">
            ${r.status}
          </span>
        </td>
        <td style="font-size: 0.8rem; color: var(--text-muted);">${r.note || "-"}</td>
      </tr>
    `
      )
      .join("");
  },

  /**
   * --- TAMPILAN GURU ---
   */
  initTeacherView() {
    document.getElementById("view-student-attendance").style.display = "none";
    document.getElementById("view-teacher-attendance").style.display = "block";

    this.renderTeacherStats();
    this.renderTeacherTable();

    // Event filter
    const subjectSelect = document.getElementById("filter-att-subject");
    if (subjectSelect) {
      subjectSelect.addEventListener("change", e => {
        this.currentFilterSubject = e.target.value;
        this.renderTeacherTable();
      });
    }

    const dateInput = document.getElementById("filter-att-date");
    if (dateInput) {
      dateInput.addEventListener("change", e => {
        this.currentFilterDate = e.target.value;
        this.renderTeacherTable();
      });
    }
  },

  renderTeacherStats() {
    const records = StorageManager.getAttendance();
    const students = StorageManager.getStudents();

    const hadir = records.filter(r => r.status === "Hadir").length;
    const izin = records.filter(r => r.status === "Izin").length;
    const sakit = records.filter(r => r.status === "Sakit").length;
    const alpa = records.filter(r => r.status === "Alpa").length;

    const rate = records.length > 0 ? Math.round((hadir / records.length) * 100) : 100;

    const elRate = document.getElementById("teacher-att-rate");
    if (elRate) elRate.textContent = `${rate}%`;

    const elHadir = document.getElementById("teacher-att-hadir");
    if (elHadir) elHadir.textContent = `${hadir}`;

    const elIzin = document.getElementById("teacher-att-izin");
    if (elIzin) elIzin.textContent = `${izin}`;

    const elSakit = document.getElementById("teacher-att-sakit");
    if (elSakit) elSakit.textContent = `${sakit}`;

    const elAlpa = document.getElementById("teacher-att-alpa");
    if (elAlpa) elAlpa.textContent = `${alpa}`;
  },

  renderTeacherTable() {
    let records = StorageManager.getAttendance();
    const tbody = document.getElementById("teacher-attendance-table-body");
    if (!tbody) return;

    if (this.currentFilterSubject !== "all") {
      records = records.filter(r => r.subject === this.currentFilterSubject);
    }

    if (this.currentFilterDate) {
      records = records.filter(r => r.date === this.currentFilterDate);
    }

    if (records.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-state-desc" style="text-align: center;">Tidak ada data presensi yang sesuai dengan filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = records
      .map(
        r => `
      <tr>
        <td style="font-weight: 600;">${r.studentName}</td>
        <td>${r.date}</td>
        <td>${r.subject}</td>
        <td style="font-size: 0.84rem;">${r.session}</td>
        <td>${r.time}</td>
        <td>
          <select class="form-control" style="padding: 4px 8px; font-size: 0.82rem; width: auto;" onchange="AttendanceManager.updateRecordStatus('${r.id}', this.value)">
            <option value="Hadir" ${r.status === "Hadir" ? "selected" : ""}>Hadir</option>
            <option value="Izin" ${r.status === "Izin" ? "selected" : ""}>Izin</option>
            <option value="Sakit" ${r.status === "Sakit" ? "selected" : ""}>Sakit</option>
            <option value="Alpa" ${r.status === "Alpa" ? "selected" : ""}>Alpa</option>
          </select>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="AttendanceManager.deleteRecord('${r.id}')" title="Hapus Record">
            ${renderIcon("trash")}
          </button>
        </td>
      </tr>
    `
      )
      .join("");
  },

  updateRecordStatus(recordId, newStatus) {
    const records = StorageManager.getAttendance();
    const target = records.find(r => r.id === recordId);
    if (!target) return;

    target.status = newStatus;
    StorageManager.saveAttendance(records);

    App.toast("Status Diperbarui", `Presensi ${target.studentName} diubah menjadi ${newStatus}.`, "success");
    this.renderTeacherStats();
  },

  deleteRecord(recordId) {
    if (!confirm("Hapus baris data presensi ini?")) return;

    let records = StorageManager.getAttendance();
    records = records.filter(r => r.id !== recordId);
    StorageManager.saveAttendance(records);

    App.toast("Dihapus", "Catatan presensi berhasil dihapus.", "warning");
    this.renderTeacherStats();
    this.renderTeacherTable();
  }
};
