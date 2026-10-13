/**
 * SMK AL-MADANI GARUT - CORE APP UI & SHARED CONTROLLER
 * Menangani rendering sidebar adaptif, topbar dinamis, sistem toast notifikasi,
 * modal dialog universal, dan ikon SVG terpadu.
 */

const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
  "file-text": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`,
  quiz: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`
};

function renderIcon(name) {
  return ICONS[name] || ICONS.book;
}

const App = {
  currentUser: null,

  init(activeMenuId) {
    this.currentUser = AuthManager.getCurrentUser();
    this.renderSidebar(activeMenuId);
    this.renderTopbar();
    this.setupToastContainer();
    this.setupGlobalEvents();
  },

  /**
   * Menampilkan toast pemberitahuan
   */
  toast(title, message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toastEl = document.createElement("div");
    toastEl.className = `toast toast-${type}`;

    let iconHtml = renderIcon("info");
    if (type === "success") iconHtml = renderIcon("check");
    if (type === "warning") iconHtml = renderIcon("clock");
    if (type === "danger") iconHtml = renderIcon("x");

    toastEl.innerHTML = `
      <div class="toast-icon">${iconHtml}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    container.appendChild(toastEl);
    requestAnimationFrame(() => {
      toastEl.classList.add("show");
    });

    setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => toastEl.remove(), 300);
    }, 4000);
  },

  setupToastContainer() {
    if (!document.getElementById("toast-container")) {
      const container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
  },

  /**
   * Render Sidebar sesuai peran saat ini (Siswa atau Guru)
   */
  renderSidebar(activeMenuId) {
    const sidebarEl = document.getElementById("app-sidebar");
    if (!sidebarEl) return;

    const role = this.currentUser.role;
    const isGuru = role === "guru";

    const siswaNav = [
      { id: "dashboard", label: "Dashboard", href: "dashboard-siswa.html", icon: "home" },
      { id: "mapel", label: "Mata Pelajaran", href: "mata-pelajaran.html", icon: "book" },
      { id: "materi", label: "Materi Belajar", href: "materi.html", icon: "file-text" },
      { id: "kuis", label: "Kuis Interaktif", href: "kuis.html", icon: "quiz" },
      { id: "absensi", label: "Simulasi Absensi", href: "absensi.html", icon: "check" },
      { id: "jadwal", label: "Jadwal Pelajaran", href: "jadwal.html", icon: "calendar" },
      { id: "nilai", label: "Nilai & Riwayat", href: "nilai.html", icon: "award" },
      { id: "pengumuman", label: "Pengumuman", href: "pengumuman.html", icon: "bell" },
      { id: "profil-sekolah", label: "Profil Sekolah", href: "profil-sekolah.html", icon: "building" }
    ];

    const guruNav = [
      { id: "dashboard", label: "Dashboard Guru", href: "dashboard-guru.html", icon: "home" },
      { id: "mapel", label: "Mata Pelajaran", href: "mata-pelajaran.html", icon: "book" },
      { id: "materi", label: "Kelola Materi", href: "materi.html", icon: "file-text" },
      { id: "kuis", label: "Kelola Kuis & Soal", href: "kuis.html", icon: "quiz" },
      { id: "absensi", label: "Rekap Presensi", href: "absensi.html", icon: "check" },
      { id: "jadwal", label: "Jadwal Mengajar", href: "jadwal.html", icon: "calendar" },
      { id: "nilai", label: "Hasil Siswa", href: "nilai.html", icon: "award" },
      { id: "pengumuman", label: "Buat Pengumuman", href: "pengumuman.html", icon: "bell" },
      { id: "profil-sekolah", label: "Profil Sekolah", href: "profil-sekolah.html", icon: "building" }
    ];

    const navList = isGuru ? guruNav : siswaNav;

    sidebarEl.innerHTML = `
      <div class="sidebar-header">
        <a href="index.html" class="brand-logo">
          <div class="brand-mark">${renderIcon("sparkles")}</div>
          <span class="brand-text">Edu<span>School</span></span>
        </a>
      </div>

      <div class="sidebar-nav">
        <div class="nav-section-title">Menu Utama (${isGuru ? "Pendidik" : "Siswa"})</div>
        ${navList
          .map(
            item => `
          <a href="${item.href}" class="nav-item ${activeMenuId === item.id ? "active" : ""}">
            ${renderIcon(item.icon)}
            <span>${item.label}</span>
          </a>
        `
          )
          .join("")}

        <div class="nav-section-title">Akses Cepat & Akun</div>
        <a href="profil.html" class="nav-item ${activeMenuId === "profil" ? "active" : ""}">
          ${renderIcon("user")}
          <span>Profil Pengguna</span>
        </a>
        <a href="javascript:void(0)" onclick="AuthManager.switchRole('${isGuru ? "siswa" : "guru"}')" class="nav-item">
          ${renderIcon("refresh")}
          <span>Ganti ke Akun ${isGuru ? "Siswa" : "Guru"}</span>
        </a>
      </div>

      <div class="sidebar-footer">
        <div class="user-snippet" onclick="window.location.href='profil.html'">
          <div class="user-avatar">${this.currentUser.avatar || "👤"}</div>
          <div class="user-meta">
            <div class="user-name">${this.currentUser.name}</div>
            <div class="user-role-badge">${isGuru ? "Guru Pengampu" : (this.currentUser.class || "Siswa")}</div>
          </div>
        </div>
        <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
          <button type="button" class="btn-reset-demo" onclick="if(confirm('Reset seluruh data demonstrasi ke kondisi awal?')) StorageManager.resetAllData()">
            ${renderIcon("refresh")} Reset Data Demo
          </button>
          <a href="javascript:void(0)" onclick="AuthManager.logout()" title="Keluar" style="color: var(--text-muted); display: flex; align-items: center;">
            ${renderIcon("logout")}
          </a>
        </div>
      </div>
    `;
  },

  /**
   * Render Topbar
   */
  renderTopbar() {
    const topbarEl = document.getElementById("app-topbar");
    if (!topbarEl) return;

    const role = this.currentUser.role;
    const isGuru = role === "guru";

    topbarEl.innerHTML = `
      <div class="topbar-left">
        <button class="mobile-toggle" id="btn-mobile-sidebar" aria-label="Toggle Menu">
          ${renderIcon("menu")}
        </button>
        <div class="page-title-group">
          <div class="page-breadcrumb">
            <span>SMK Al-Madani Garut</span>
            <span>/</span>
            <span style="color: var(--gold-dark); font-weight: 600;">${isGuru ? "Panel Guru" : "Portal Siswa"}</span>
          </div>
        </div>
      </div>

      <div class="topbar-actions">
        <!-- Role Switcher Pill -->
        <div class="role-switcher-pill">
          <button class="role-tab-btn ${!isGuru ? "active" : ""}" onclick="AuthManager.switchRole('siswa')">Siswa</button>
          <button class="role-tab-btn ${isGuru ? "active" : ""}" onclick="AuthManager.switchRole('guru')">Guru</button>
        </div>

        <a href="pengumuman.html" class="topbar-btn" title="Notifikasi Pengumuman">
          ${renderIcon("bell")}
          <span class="dot-indicator"></span>
        </a>

        <a href="profil.html" class="topbar-btn" title="Profil">
          ${renderIcon("user")}
        </a>
      </div>
    `;

    // Pasang toggle sidebar mobile
    const toggleBtn = document.getElementById("btn-mobile-sidebar");
    const sidebarEl = document.getElementById("app-sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (toggleBtn && sidebarEl) {
      toggleBtn.addEventListener("click", () => {
        sidebarEl.classList.toggle("mobile-open");
        if (overlay) overlay.classList.toggle("active");
      });
    }

    if (overlay) {
      overlay.addEventListener("click", () => {
        sidebarEl.classList.remove("mobile-open");
        overlay.classList.remove("active");
      });
    }
  },

  setupGlobalEvents() {
    // Tutup modal jika overlay diklik
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", e => {
        if (e.target === backdrop) {
          backdrop.classList.remove("active");
        }
      });
    });
  }
};

/**
 * Modal Helpers Universal
 */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}
