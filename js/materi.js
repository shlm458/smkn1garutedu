/**
 * EDUSCHOOL - CONTROLLER MATERI & KURIKULUM
 * Menangani pembacaan modul pembelajaran terstruktur untuk siswa,
 * penandaan status selesai (progress tracking), navigasi antar-modul,
 * serta aksi CRUD (Tambah, Edit, Hapus) materi lengkap untuk guru.
 */

const MateriManager = {
  currentLessonId: null,
  activeFilter: "all",
  searchKeyword: "",

  init() {
    App.init("materi");
    
    // Periksa query parameter ?id=...
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get("id");

    const lessons = StorageManager.getLessons();
    if (lessonId && lessons.some(l => l.id === lessonId)) {
      this.currentLessonId = lessonId;
    } else if (lessons.length > 0) {
      this.currentLessonId = lessons[0].id;
    }

    this.renderLessonsList();
    this.renderLessonDetail();
    this.setupTeacherControls();
  },

  /**
   * Render daftar materi di panel navigasi samping / list
   */
  renderLessonsList() {
    const listEl = document.getElementById("lessons-catalog-list");
    if (!listEl) return;

    let lessons = StorageManager.getLessons();
    const progressMap = StorageManager.getLessonProgress();
    const isGuru = AuthManager.getCurrentUser().role === "guru";

    if (this.searchKeyword) {
      lessons = lessons.filter(l =>
        l.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }

    if (lessons.length === 0) {
      listEl.innerHTML = `<div class="empty-state-desc" style="padding: 16px;">Tidak ada materi yang cocok.</div>`;
      return;
    }

    listEl.innerHTML = lessons
      .map(lesson => {
        const isActive = lesson.id === this.currentLessonId;
        const isCompleted = !!progressMap[lesson.id];

        return `
          <div class="lesson-sidebar-item ${isActive ? "active" : ""}" onclick="MateriManager.selectLesson('${lesson.id}')">
            <div class="lesson-item-check ${isCompleted ? "completed" : ""}">
              ${isCompleted ? renderIcon("check") : lesson.order}
            </div>
            <div class="lesson-item-info">
              <div class="lesson-item-title">${lesson.title}</div>
              <div class="lesson-item-meta">
                <span>⏱️ ${lesson.duration}</span>
                ${isCompleted ? '<span class="badge badge-success" style="font-size: 0.65rem; padding: 1px 6px;">Selesai</span>' : ""}
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  },

  /**
   * Pilih modul materi untuk dibaca
   */
  selectLesson(lessonId) {
    this.currentLessonId = lessonId;
    // Update URL tanpa reload
    const url = new URL(window.location);
    url.searchParams.set("id", lessonId);
    window.history.pushState({}, "", url);

    this.renderLessonsList();
    this.renderLessonDetail();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  /**
   * Render detail modul materi
   */
  renderLessonDetail() {
    const detailContainer = document.getElementById("lesson-detail-container");
    if (!detailContainer) return;

    const lessons = StorageManager.getLessons();
    const lesson = lessons.find(l => l.id === this.currentLessonId);

    if (!lesson) {
      detailContainer.innerHTML = `
        <div class="card empty-state">
          <div class="empty-state-icon">${renderIcon("file-text")}</div>
          <div class="empty-state-title">Materi Tidak Ditemukan</div>
          <div class="empty-state-desc">Pilih modul materi dari daftar di sisi kiri untuk mulai membaca.</div>
        </div>
      `;
      return;
    }

    const currentIndex = lessons.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    const progressMap = StorageManager.getLessonProgress();
    const isCompleted = !!progressMap[lesson.id];
    const user = AuthManager.getCurrentUser();
    const isGuru = user.role === "guru";

    detailContainer.innerHTML = `
      <div class="card" style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span class="badge badge-gold">Informatika & Algoritma</span>
              <span class="badge badge-neutral">Modul ${lesson.order} dari ${lessons.length}</span>
              ${
                isCompleted
                  ? '<span class="badge badge-success">✓ Sudah Dipelajari</span>'
                  : '<span class="badge badge-warning">Sedang Dipelajari</span>'
              }
            </div>
            <h2 style="font-size: 1.6rem; color: var(--text-dark); margin-bottom: 6px;">${lesson.title}</h2>
            <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 12px;">
              <span>⏱️ Estimasi Belajar: ${lesson.duration}</span>
              <span>•</span>
              <span>Pengampu: Dra. Sri Wahyuni, M.Kom.</span>
            </div>
          </div>

          <!-- Aksi Pendidik (Edit / Hapus) jika Guru -->
          ${
            isGuru
              ? `
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="MateriManager.openEditModal('${lesson.id}')">
                ${renderIcon("edit")} Edit Materi
              </button>
              <button class="btn btn-danger btn-sm" onclick="MateriManager.deleteLesson('${lesson.id}')">
                ${renderIcon("trash")} Hapus
              </button>
            </div>
          `
              : `
            <div>
              <button class="btn ${isCompleted ? "btn-outline" : "btn-primary"}" onclick="MateriManager.toggleComplete('${lesson.id}')">
                ${isCompleted ? "Batalkan Tandai Selesai" : "✓ Tandai Telah Selesai"}
              </button>
            </div>
          `
          }
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-subtle); margin: 20px 0;">

        <!-- 1. Tujuan Pembelajaran -->
        <div style="margin-bottom: 24px; background: var(--bg-subtle); padding: 20px; border-radius: var(--radius-md); border-left: 4px solid var(--gold-primary);">
          <h4 style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px; color: var(--text-dark);">
            🎯 Tujuan Pembelajaran
          </h4>
          <ul style="padding-left: 20px; color: var(--text-dark); font-size: 0.92rem; display: flex; flex-direction: column; gap: 6px;">
            ${(lesson.objectives || []).map(obj => `<li>${obj}</li>`).join("")}
          </ul>
        </div>

        <!-- 2. Isi Materi Inti -->
        <div class="lesson-rich-content" style="font-size: 0.95rem; line-height: 1.8; color: var(--text-dark); margin-bottom: 28px;">
          ${lesson.content}
        </div>

        <!-- 3. Contoh Penerapan & Kode -->
        ${
          lesson.examples
            ? `
          <div style="margin-bottom: 28px;">
            <h4 style="margin-bottom: 12px; color: var(--text-dark);">💡 Contoh Penerapan Logika & Kode</h4>
            <div style="background: #FAF8F5; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; font-family: monospace; font-size: 0.88rem; overflow-x: auto;">
              ${lesson.examples}
            </div>
          </div>
        `
            : ""
        }

        <!-- 4. Poin-Poin Kunci (Key Takeaways) -->
        <div style="background: var(--gold-subtle); border: 1px solid var(--gold-light); border-radius: var(--radius-md); padding: 20px; margin-bottom: 30px;">
          <h4 style="color: var(--gold-dark); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            📌 Poin-Poin Kunci Rangkuman
          </h4>
          <ul style="padding-left: 20px; color: #5B481B; font-size: 0.9rem; display: flex; flex-direction: column; gap: 6px;">
            ${(lesson.keyPoints || []).map(kp => `<li>${kp}</li>`).join("")}
          </ul>
        </div>

        <!-- Navigasi Bawah & CTA Kuis -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
          <div>
            ${
              prevLesson
                ? `
              <button class="btn btn-outline btn-sm" onclick="MateriManager.selectLesson('${prevLesson.id}')">
                ← Modul Sebelumnya: ${prevLesson.order}
              </button>
            `
                : '<span style="color: var(--text-light); font-size: 0.82rem;">Ini adalah modul pertama</span>'
            }
          </div>

          <div style="display: flex; gap: 10px;">
            <a href="kuis.html" class="btn btn-outline btn-sm">
              ${renderIcon("quiz")} Evaluasi Kuis Terkait
            </a>
            ${
              nextLesson
                ? `
              <button class="btn btn-primary btn-sm" onclick="MateriManager.selectLesson('${nextLesson.id}')">
                Modul Berikutnya: ${nextLesson.order} →
              </button>
            `
                : '<span class="badge badge-success">✓ Modul Terakhir</span>'
            }
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Siswa menandai materi telah selesai
   */
  toggleComplete(lessonId) {
    const progressMap = StorageManager.getLessonProgress();
    const isCompleted = !progressMap[lessonId];
    StorageManager.toggleLessonProgress(lessonId, isCompleted);

    App.toast(
      isCompleted ? "Materi Selesai!" : "Status Diperbarui",
      isCompleted
        ? "Selamat! Kemajuan belajar Anda telah diperbarui."
        : "Status materi ditandai belum selesai.",
      "success"
    );

    this.renderLessonsList();
    this.renderLessonDetail();
  },

  /**
   * Guru: Tambah Materi Baru
   */
  setupTeacherControls() {
    const btnAdd = document.getElementById("btn-add-lesson");
    if (btnAdd) {
      const isGuru = AuthManager.getCurrentUser().role === "guru";
      btnAdd.style.display = isGuru ? "inline-flex" : "none";
    }

    const searchInput = document.getElementById("search-lesson-input");
    if (searchInput) {
      searchInput.addEventListener("input", e => {
        this.searchKeyword = e.target.value.trim();
        this.renderLessonsList();
      });
    }
  },

  openAddModal() {
    document.getElementById("modal-lesson-title").textContent = "Tambah Materi Pembelajaran";
    document.getElementById("form-lesson-id").value = "";
    document.getElementById("form-lesson-order").value = StorageManager.getLessons().length + 1;
    document.getElementById("form-lesson-name").value = "";
    document.getElementById("form-lesson-duration").value = "45 Menit";
    document.getElementById("form-lesson-objectives").value = "";
    document.getElementById("form-lesson-content").value = "";
    document.getElementById("form-lesson-examples").value = "";
    document.getElementById("form-lesson-keypoints").value = "";

    openModal("modal-lesson-form");
  },

  openEditModal(lessonId) {
    const lessons = StorageManager.getLessons();
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    document.getElementById("modal-lesson-title").textContent = "Edit Materi Pembelajaran";
    document.getElementById("form-lesson-id").value = lesson.id;
    document.getElementById("form-lesson-order").value = lesson.order;
    document.getElementById("form-lesson-name").value = lesson.title;
    document.getElementById("form-lesson-duration").value = lesson.duration || "45 Menit";
    document.getElementById("form-lesson-objectives").value = (lesson.objectives || []).join("\n");
    document.getElementById("form-lesson-content").value = lesson.content;
    document.getElementById("form-lesson-examples").value = lesson.examples || "";
    document.getElementById("form-lesson-keypoints").value = (lesson.keyPoints || []).join("\n");

    openModal("modal-lesson-form");
  },

  saveLessonForm(event) {
    event.preventDefault();
    const id = document.getElementById("form-lesson-id").value;
    const order = parseInt(document.getElementById("form-lesson-order").value, 10) || 1;
    const title = document.getElementById("form-lesson-name").value.trim();
    const duration = document.getElementById("form-lesson-duration").value.trim() || "45 Menit";
    const objectivesRaw = document.getElementById("form-lesson-objectives").value.trim();
    const content = document.getElementById("form-lesson-content").value.trim();
    const examples = document.getElementById("form-lesson-examples").value.trim();
    const keypointsRaw = document.getElementById("form-lesson-keypoints").value.trim();

    if (!title || !content) {
      App.toast("Gagal", "Judul materi dan isi materi tidak boleh kosong.", "danger");
      return;
    }

    const objectives = objectivesRaw ? objectivesRaw.split("\n").filter(Boolean) : [];
    const keyPoints = keypointsRaw ? keypointsRaw.split("\n").filter(Boolean) : [];

    const lessons = StorageManager.getLessons();

    if (id) {
      // Edit materi yang sudah ada
      const index = lessons.findIndex(l => l.id === id);
      if (index !== -1) {
        lessons[index] = {
          ...lessons[index],
          order,
          title,
          duration,
          objectives,
          content,
          examples,
          keyPoints
        };
        App.toast("Sukses", "Materi berhasil diperbarui.", "success");
      }
    } else {
      // Tambah baru
      const newLesson = {
        id: `les-${Date.now()}`,
        subjectId: "sub-info",
        order,
        title,
        duration,
        objectives,
        content,
        examples,
        keyPoints,
        quizId: "quiz-info-01"
      };
      lessons.push(newLesson);
      this.currentLessonId = newLesson.id;
      App.toast("Sukses", "Materi pembelajaran baru berhasil ditambahkan.", "success");
    }

    // Sort berdasarkan order
    lessons.sort((a, b) => a.order - b.order);
    StorageManager.saveLessons(lessons);

    closeModal("modal-lesson-form");
    this.renderLessonsList();
    this.renderLessonDetail();
  },

  deleteLesson(lessonId) {
    if (!confirm("Apakah Anda yakin ingin menghapus materi ini dari kurikulum demonstrasi?")) return;

    let lessons = StorageManager.getLessons();
    lessons = lessons.filter(l => l.id !== lessonId);
    StorageManager.saveLessons(lessons);

    App.toast("Dihapus", "Materi telah dihapus dari daftar.", "warning");
    if (lessons.length > 0) {
      this.currentLessonId = lessons[0].id;
    } else {
      this.currentLessonId = null;
    }

    this.renderLessonsList();
    this.renderLessonDetail();
  }
};
