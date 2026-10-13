/**
 * SMK Al-Madani Garut - ANNOUNCEMENTS CONTROLLER
 * Menampilkan pengumuman resmi sekolah, filter kategori, status sudah/belum dibaca,
 * serta pembuatan pengumuman baru oleh guru.
 */

const AnnouncementManager = {
  currentCategory: "all",

  init() {
    App.init("pengumuman");
    this.renderAnnouncements();
    this.setupTeacherControls();
  },

  filterCategory(cat) {
    this.currentCategory = cat;
    document.querySelectorAll(".tab-announcement-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === cat);
    });
    this.renderAnnouncements();
  },

  renderAnnouncements() {
    let list = StorageManager.getAnnouncements();
    const container = document.getElementById("announcements-list-container");
    if (!container) return;

    if (this.currentCategory !== "all") {
      list = list.filter(a => a.category.toLowerCase() === this.currentCategory.toLowerCase());
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="card empty-state">
          <div class="empty-state-icon">${renderIcon("bell")}</div>
          <div class="empty-state-title">Belum Ada Pengumuman</div>
          <div class="empty-state-desc">Tidak ada warta informasi resmi dalam kategori ini.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = list
      .map(
        anc => `
      <div class="card" style="margin-bottom: 16px; border-left: 4px solid var(--gold-primary);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-gold">${anc.category}</span>
            <span style="font-size: 0.78rem; color: var(--text-light);">${anc.date}</span>
          </div>
          <span class="badge ${anc.read ? "badge-neutral" : "badge-success"}">
            ${anc.read ? "Sudah Dibaca" : "Baru / Belum Dibaca"}
          </span>
        </div>

        <h3 style="font-size: 1.15rem; margin-bottom: 8px; color: var(--text-dark);">${anc.title}</h3>
        <p style="font-size: 0.9rem; color: var(--text-dark); line-height: 1.6; margin-bottom: 14px;">
          ${anc.content}
        </p>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 10px; font-size: 0.78rem; color: var(--text-muted);">
          <span>Dipublikasikan oleh: <strong>${anc.author || "Pihak Sekolah"}</strong></span>
          ${
            !anc.read
              ? `<button class="btn btn-outline btn-sm" onclick="AnnouncementManager.markAsRead('${anc.id}')">Tandai Dibaca</button>`
              : ""
          }
        </div>
      </div>
    `
      )
      .join("");
  },

  markAsRead(ancId) {
    const list = StorageManager.getAnnouncements();
    const item = list.find(a => a.id === ancId);
    if (item) {
      item.read = true;
      StorageManager.saveAnnouncements(list);
      App.toast("Ditandai Dibaca", "Pengumuman berhasil ditandai telah dibaca.", "success");
      this.renderAnnouncements();
    }
  },

  setupTeacherControls() {
    const btnAdd = document.getElementById("btn-add-announcement");
    const isGuru = AuthManager.getCurrentUser().role === "guru";
    if (btnAdd) {
      btnAdd.style.display = isGuru ? "inline-flex" : "none";
    }
  },

  openAddModal() {
    document.getElementById("form-anc-title").value = "";
    document.getElementById("form-anc-category").value = "Akademik";
    document.getElementById("form-anc-content").value = "";
    openModal("modal-announcement-form");
  },

  saveAnnouncementForm(event) {
    event.preventDefault();
    const title = document.getElementById("form-anc-title").value.trim();
    const category = document.getElementById("form-anc-category").value;
    const content = document.getElementById("form-anc-content").value.trim();

    if (!title || !content) {
      App.toast("Gagal", "Judul dan isi pengumuman tidak boleh kosong.", "danger");
      return;
    }

    const user = AuthManager.getCurrentUser();
    const newAnc = {
      id: `anc-${Date.now()}`,
      title,
      category,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      author: user.name,
      read: false,
      content
    };

    const list = StorageManager.getAnnouncements();
    list.unshift(newAnc);
    StorageManager.saveAnnouncements(list);

    closeModal("modal-announcement-form");
    App.toast("Sukses", "Pengumuman baru berhasil diterbitkan.", "success");
    this.renderAnnouncements();
  }
};
