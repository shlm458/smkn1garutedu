/**
 * EDUSCHOOL - INTERACTIVE QUIZ ENGINE & MANAGEMENT
 * Menjalankan engine kuis interaktif bagi siswa: timer, navigator soal, validasi,
 * penilaian otomatis, pembahasan mendalam, serta modul CRUD kuis dan soal untuk guru.
 */

const QuizEngine = {
  currentQuiz: null,
  currentQuestionIndex: 0,
  userAnswers: {}, // map: questionId -> optionIndex
  timerInterval: null,
  secondsRemaining: 0,
  isSubmitted: false,
  activeTab: "taker", // 'taker', 'history', 'teacher-manage', 'teacher-results'

  init() {
    App.init("kuis");
    const quizzes = StorageManager.getQuizzes();
    this.currentQuiz = quizzes.length > 0 ? quizzes[0] : null;

    const user = AuthManager.getCurrentUser();
    if (user.role === "guru") {
      this.activeTab = "teacher-manage";
    }

    this.renderTabs();
    this.switchTab(this.activeTab);
  },

  renderTabs() {
    const isGuru = AuthManager.getCurrentUser().role === "guru";
    const tabNav = document.getElementById("quiz-tab-nav");
    if (!tabNav) return;

    tabNav.innerHTML = isGuru
      ? `
        <button class="tab-btn ${this.activeTab === "teacher-manage" ? "active" : ""}" onclick="QuizEngine.switchTab('teacher-manage')">
          ⚙️ Kelola Kuis & Soal
        </button>
        <button class="tab-btn ${this.activeTab === "teacher-results" ? "active" : ""}" onclick="QuizEngine.switchTab('teacher-results')">
          📊 Rekap Hasil Siswa
        </button>
        <button class="tab-btn ${this.activeTab === "taker" ? "active" : ""}" onclick="QuizEngine.switchTab('taker')">
          👁️ Preview Simulasi Siswa
        </button>
      `
      : `
        <button class="tab-btn ${this.activeTab === "taker" ? "active" : ""}" onclick="QuizEngine.switchTab('taker')">
          ✍️ Kerjakan Kuis Aktif
        </button>
        <button class="tab-btn ${this.activeTab === "history" ? "active" : ""}" onclick="QuizEngine.switchTab('history')">
          📜 Riwayat Nilai & Pembahasan
        </button>
      `;
  },

  switchTab(tab) {
    this.activeTab = tab;
    this.renderTabs();

    document.getElementById("quiz-view-taker").style.display = tab === "taker" ? "block" : "none";
    const historyView = document.getElementById("quiz-view-history");
    if (historyView) historyView.style.display = tab === "history" ? "block" : "none";

    const manageView = document.getElementById("quiz-view-manage");
    if (manageView) manageView.style.display = tab === "teacher-manage" ? "block" : "none";

    const resultsView = document.getElementById("quiz-view-results");
    if (resultsView) resultsView.style.display = tab === "teacher-results" ? "block" : "none";

    if (tab === "taker") {
      this.renderQuizTakerIntro();
    } else if (tab === "history") {
      this.renderHistory();
    } else if (tab === "teacher-manage") {
      this.renderTeacherManage();
    } else if (tab === "teacher-results") {
      this.renderTeacherResults();
    }
  },

  /**
   * --- SISI SISWA: MENGERJAKAN KUIS ---
   */
  renderQuizTakerIntro() {
    const container = document.getElementById("quiz-runner-container");
    if (!container || !this.currentQuiz) return;

    if (this.isSubmitted) {
      this.renderQuizResultScreen();
      return;
    }

    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 40px 24px;">
        <div style="width: 68px; height: 68px; border-radius: 50%; background: var(--gold-subtle); color: var(--gold-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
          ${renderIcon("quiz")}
        </div>
        <span class="badge badge-gold" style="margin-bottom: 12px;">Kuis Informatif & Evaluasi</span>
        <h2 style="font-size: 1.6rem; color: var(--text-dark); margin-bottom: 12px;">${this.currentQuiz.title}</h2>
        <p style="max-width: 600px; margin: 0 auto 24px; color: var(--text-muted); font-size: 0.94rem;">
          ${this.currentQuiz.description}
        </p>

        <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 30px; flex-wrap: wrap;">
          <div style="background: var(--bg-subtle); padding: 12px 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.76rem; color: var(--text-light); text-transform: uppercase;">Jumlah Soal</div>
            <div style="font-size: 1.3rem; font-weight: 700; color: var(--text-dark);">${this.currentQuiz.questions.length} Butir</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 12px 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.76rem; color: var(--text-light); text-transform: uppercase;">Batas Waktu</div>
            <div style="font-size: 1.3rem; font-weight: 700; color: var(--text-dark);">${this.currentQuiz.timeLimitMinutes} Menit</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 12px 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.76rem; color: var(--text-light); text-transform: uppercase;">Passing Grade (KKM)</div>
            <div style="font-size: 1.3rem; font-weight: 700; color: var(--gold-dark);">${this.currentQuiz.passingScore} Poin</div>
          </div>
        </div>

        <div class="alert alert-info" style="max-width: 600px; margin: 0 auto 24px; text-align: left;">
          <div>
            <strong>Petunjuk Pengerjaan:</strong><br>
            • Pilih salah satu opsi jawaban yang paling tepat untuk setiap soal.<br>
            • Navigasi butir soal di sisi kanan menunjukkan status jawaban.<br>
            • Penilaian dan ulasan pembahasan akan langsung tampil setelah Anda menekan tombol kumpulkan.
          </div>
        </div>

        <button class="btn btn-primary btn-lg" onclick="QuizEngine.startQuiz()">
          Mulai Mengerjakan Sekarang →
        </button>
      </div>
    `;
  },

  startQuiz() {
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.isSubmitted = false;
    this.secondsRemaining = (this.currentQuiz.timeLimitMinutes || 20) * 60;

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.secondsRemaining--;
      this.updateTimerDisplay();
      if (this.secondsRemaining <= 0) {
        clearInterval(this.timerInterval);
        App.toast("Waktu Habis", "Waktu pengerjaan telah berakhir. Jawaban dikumpulkan otomatis.", "warning");
        this.submitQuiz(true);
      }
    }, 1000);

    this.renderQuestionScreen();
  },

  updateTimerDisplay() {
    const timerEl = document.getElementById("quiz-timer-display");
    if (!timerEl) return;
    const minutes = Math.floor(this.secondsRemaining / 60);
    const seconds = this.secondsRemaining % 60;
    timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  },

  renderQuestionScreen() {
    const container = document.getElementById("quiz-runner-container");
    if (!container || !this.currentQuiz) return;

    const questions = this.currentQuiz.questions;
    const q = questions[this.currentQuestionIndex];
    const answeredCount = Object.keys(this.userAnswers).length;
    const progressPercent = Math.round((answeredCount / questions.length) * 100);

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: flex-start;">
        
        <!-- Kolom Kiri: Pertanyaan & Opsi -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <span class="badge badge-gold">Soal No. ${this.currentQuestionIndex + 1} dari ${questions.length}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--gold-dark); background: var(--gold-subtle); padding: 6px 14px; border-radius: var(--radius-pill); border: 1px solid var(--gold-light);">
              ${renderIcon("clock")}
              <span id="quiz-timer-display">--:--</span>
            </div>
          </div>

          <div style="font-size: 1.15rem; font-weight: 600; line-height: 1.6; color: var(--text-dark); margin-bottom: 24px;">
            ${q.text}
          </div>

          <div class="quiz-options-list" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px;">
            ${q.options
              .map((opt, idx) => {
                const isSelected = this.userAnswers[q.id] === idx;
                return `
                <div class="quiz-option-card ${isSelected ? "selected" : ""}" onclick="QuizEngine.selectOption('${q.id}', ${idx})" style="
                  border: 1.5px solid ${isSelected ? "var(--gold-primary)" : "var(--border-color)"};
                  background: ${isSelected ? "var(--gold-subtle)" : "var(--bg-card)"};
                  padding: 14px 18px;
                  border-radius: var(--radius-md);
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  gap: 14px;
                  transition: var(--transition);
                ">
                  <div style="
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    border: 2px solid ${isSelected ? "var(--gold-primary)" : "var(--text-light)"};
                    background: ${isSelected ? "var(--gold-primary)" : "transparent"};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: 0.75rem;
                    flex-shrink: 0;
                  ">
                    ${isSelected ? "✓" : ""}
                  </div>
                  <div style="font-size: 0.94rem; color: var(--text-dark); font-weight: ${isSelected ? "600" : "400"};">
                    ${opt}
                  </div>
                </div>
              `;
              })
              .join("")}
          </div>

          <!-- Tombol Navigasi Bawah -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 18px; border-top: 1px solid var(--border-subtle);">
            <button class="btn btn-outline btn-sm" onclick="QuizEngine.prevQuestion()" ${this.currentQuestionIndex === 0 ? "disabled" : ""}>
              ← Soal Sebelumnya
            </button>
            
            ${
              this.currentQuestionIndex < questions.length - 1
                ? `
              <button class="btn btn-primary btn-sm" onclick="QuizEngine.nextQuestion()">
                Soal Berikutnya →
              </button>
            `
                : `
              <button class="btn btn-primary btn-sm" onclick="QuizEngine.confirmSubmit()">
                Kumpulkan Jawaban Selesai ✓
              </button>
            `
            }
          </div>
        </div>

        <!-- Kolom Kanan: Navigator Nomor Soal -->
        <div class="card" style="position: sticky; top: 90px;">
          <div class="card-header" style="margin-bottom: 14px; padding-bottom: 10px;">
            <div class="card-title" style="font-size: 1rem;">Navigasi Soal</div>
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--gold-dark);">${answeredCount}/${questions.length} Dijawab</span>
          </div>

          <div class="progress-container" style="margin-bottom: 16px;">
            <div class="progress-bar" style="width: ${progressPercent}%;"></div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 20px;">
            ${questions
              .map((item, idx) => {
                const isAnswered = this.userAnswers[item.id] !== undefined;
                const isCurrent = idx === this.currentQuestionIndex;
                let bg = "var(--bg-subtle)";
                let color = "var(--text-dark)";
                let border = "1px solid var(--border-color)";

                if (isCurrent) {
                  border = "2px solid var(--gold-primary)";
                }
                if (isAnswered) {
                  bg = "var(--gold-subtle)";
                  color = "var(--gold-dark)";
                  border = "1.5px solid var(--gold-primary)";
                }

                return `
                <button onclick="QuizEngine.jumpToQuestion(${idx})" style="
                  height: 38px;
                  background: ${bg};
                  color: ${color};
                  border: ${border};
                  border-radius: var(--radius-sm);
                  font-weight: 700;
                  font-size: 0.88rem;
                  cursor: pointer;
                  transition: var(--transition);
                ">
                  ${idx + 1}
                </button>
              `;
              })
              .join("")}
          </div>

          <button class="btn btn-primary" style="width: 100%;" onclick="QuizEngine.confirmSubmit()">
            Selesaikan Kuis
          </button>
        </div>

      </div>
    `;

    this.updateTimerDisplay();
  },

  selectOption(questionId, optionIndex) {
    this.userAnswers[questionId] = optionIndex;
    this.renderQuestionScreen();
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderQuestionScreen();
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderQuestionScreen();
    }
  },

  jumpToQuestion(index) {
    this.currentQuestionIndex = index;
    this.renderQuestionScreen();
  },

  confirmSubmit() {
    const questions = this.currentQuiz.questions;
    const answeredCount = Object.keys(this.userAnswers).length;
    const unansweredCount = questions.length - answeredCount;

    if (unansweredCount > 0) {
      if (!confirm(`Terdapat ${unansweredCount} soal yang belum Anda jawab. Apakah Anda yakin ingin tetap mengumpulkan sekarang?`)) {
        return;
      }
    } else {
      if (!confirm("Seluruh soal telah dijawab. Kumpulkan jawaban Anda sekarang?")) {
        return;
      }
    }

    this.submitQuiz(false);
  },

  submitQuiz(isTimeout = false) {
    clearInterval(this.timerInterval);
    this.isSubmitted = true;

    const questions = this.currentQuiz.questions;
    let correctCount = 0;

    questions.forEach(q => {
      if (this.userAnswers[q.id] === q.answerIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const wrongCount = questions.length - correctCount;

    // Hitung waktu terpakai
    const totalDurationSeconds = (this.currentQuiz.timeLimitMinutes || 20) * 60;
    const timeSpentSeconds = totalDurationSeconds - this.secondsRemaining;
    const spentMinutes = Math.floor(timeSpentSeconds / 60);
    const spentSecs = timeSpentSeconds % 60;
    const timeSpentStr = `${spentMinutes} Menit ${spentSecs} Detik`;

    const user = AuthManager.getCurrentUser();
    const resultObj = {
      id: `res-${Date.now()}`,
      studentId: user.id || "usr-siswa-1",
      studentName: user.name || "Ahmad Rizky Pratama",
      quizId: this.currentQuiz.id,
      quizTitle: this.currentQuiz.title,
      subjectName: "Informatika",
      score,
      totalQuestions: questions.length,
      correctCount,
      wrongCount,
      timeSpent: timeSpentStr,
      completedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      answers: { ...this.userAnswers }
    };

    StorageManager.addQuizResult(resultObj);
    App.toast("Kuis Selesai!", `Nilai Anda: ${score} / 100 (${correctCount} Soal Benar)`, "success");

    this.renderQuizResultScreen(resultObj);
  },

  renderQuizResultScreen(result = null) {
    const container = document.getElementById("quiz-runner-container");
    if (!container || !this.currentQuiz) return;

    if (!result) {
      const results = StorageManager.getQuizResults().filter(r => r.quizId === this.currentQuiz.id);
      result = results[0];
    }

    const isPassed = result.score >= (this.currentQuiz.passingScore || 75);
    const questions = this.currentQuiz.questions;

    container.innerHTML = `
      <div class="card" style="margin-bottom: 24px; text-align: center; padding: 36px 24px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">${isPassed ? "🏆" : "📝"}</div>
        <span class="badge ${isPassed ? "badge-success" : "badge-warning"}" style="font-size: 0.82rem; padding: 4px 14px; margin-bottom: 12px;">
          ${isPassed ? "LULUS EVALUASI" : "PERLU PENGAYAAN / REMIDI"}
        </span>
        <h2 style="font-size: 1.8rem; margin-bottom: 6px;">Hasil Evaluasi Kuis</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">${result.quizTitle}</p>

        <div style="display: inline-flex; align-items: baseline; gap: 8px; background: var(--bg-subtle); padding: 18px 36px; border-radius: var(--radius-xl); border: 2px solid ${isPassed ? "var(--success-border)" : "var(--warning-border)"}; margin-bottom: 28px;">
          <span style="font-size: 3.5rem; font-weight: 800; color: ${isPassed ? "var(--success)" : "var(--warning)"}; line-height: 1;">${result.score}</span>
          <span style="font-size: 1.2rem; color: var(--text-muted); font-weight: 600;">/ 100 Poin</span>
        </div>

        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 30px;">
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 10px 18px; border-radius: var(--radius-md);">
            <div style="font-size: 0.74rem; color: var(--text-light);">BENAR</div>
            <div style="font-size: 1.15rem; font-weight: 700; color: var(--success);">${result.correctCount} Soal</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 10px 18px; border-radius: var(--radius-md);">
            <div style="font-size: 0.74rem; color: var(--text-light);">SALAH / KOSONG</div>
            <div style="font-size: 1.15rem; font-weight: 700; color: var(--danger);">${result.wrongCount} Soal</div>
          </div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 10px 18px; border-radius: var(--radius-md);">
            <div style="font-size: 0.74rem; color: var(--text-light);">WAKTU TEMPUH</div>
            <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-dark);">${result.timeSpent}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 12px;">
          <button class="btn btn-outline" onclick="QuizEngine.isSubmitted = false; QuizEngine.renderQuizTakerIntro();">
            Ulangi Pengerjaan 🔄
          </button>
          <a href="#section-review-explanation" class="btn btn-primary" onclick="document.getElementById('section-review-explanation').scrollIntoView({behavior: 'smooth'})">
            Lihat Pembahasan Lengkap ↓
          </a>
        </div>
      </div>

      <!-- Pembahasan Lengkap Seluruh Soal -->
      <div id="section-review-explanation" class="card">
        <div class="card-header">
          <div class="card-title">📖 Pembahasan Soal & Kunci Jawaban</div>
          <span class="badge badge-gold">10 Butir Teranalisis</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          ${questions
            .map((q, idx) => {
              const studentAnswerIdx = result.answers[q.id];
              const isCorrect = studentAnswerIdx === q.answerIndex;
              const hasAnswered = studentAnswerIdx !== undefined;

              return `
              <div style="padding: 18px; border-radius: var(--radius-md); border: 1.5px solid ${isCorrect ? "var(--success-border)" : "var(--danger-border)"}; background: ${isCorrect ? "var(--success-bg)" : "var(--danger-bg)"};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="font-weight: 700; font-size: 0.95rem; color: var(--text-dark);">Soal ${idx + 1}</span>
                  <span class="badge ${isCorrect ? "badge-success" : "badge-danger"}">
                    ${isCorrect ? "✓ Benar" : hasAnswered ? "✗ Salah" : "○ Kosong"}
                  </span>
                </div>

                <div style="font-size: 1rem; font-weight: 600; color: var(--text-dark); margin-bottom: 12px; line-height: 1.5;">
                  ${q.text}
                </div>

                <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
                  ${q.options
                    .map((opt, oIdx) => {
                      const isKey = oIdx === q.answerIndex;
                      const isChosen = studentAnswerIdx === oIdx;
                      let badgeTag = "";
                      let style = "padding: 8px 12px; border-radius: var(--radius-sm); font-size: 0.88rem; ";

                      if (isKey) {
                        style += "background: #FFFFFF; font-weight: 700; color: var(--success); border: 1px solid var(--success);";
                        badgeTag = '<span style="margin-left: auto; font-size: 0.72rem; color: var(--success); font-weight: 700;">[KUNCI JAWABAN]</span>';
                      } else if (isChosen && !isKey) {
                        style += "background: #FFFFFF; font-weight: 600; color: var(--danger); text-decoration: line-through; border: 1px solid var(--danger);";
                        badgeTag = '<span style="margin-left: auto; font-size: 0.72rem; color: var(--danger); font-weight: 700;">[PILIHAN ANDA]</span>';
                      } else {
                        style += "color: var(--text-muted); opacity: 0.8;";
                      }

                      return `
                      <div style="display: flex; align-items: center; ${style}">
                        <span>${opt}</span>
                        ${badgeTag}
                      </div>
                    `;
                    })
                    .join("")}
                </div>

                <!-- Kotak Pembahasan -->
                <div style="background: #FFFFFF; border-left: 3px solid var(--gold-primary); padding: 12px 14px; border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-dark);">
                  <strong style="color: var(--gold-dark);">Penjelasan:</strong> ${q.explanation}
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;
  },

  /**
   * --- SISI SISWA: RIWAYAT KUIS ---
   */
  renderHistory() {
    const container = document.getElementById("quiz-history-container");
    if (!container) return;

    const user = AuthManager.getCurrentUser();
    const results = StorageManager.getQuizResults().filter(r => r.studentId === (user.id || "usr-siswa-1"));

    if (results.length === 0) {
      container.innerHTML = `
        <div class="card empty-state">
          <div class="empty-state-icon">${renderIcon("quiz")}</div>
          <div class="empty-state-title">Belum Ada Riwayat Kuis</div>
          <div class="empty-state-desc">Anda belum pernah menyelesaikan evaluasi kuis apapun.</div>
          <button class="btn btn-primary" onclick="QuizEngine.switchTab('taker')">Mulai Kerjakan Kuis</button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div class="card-title">📜 Riwayat Evaluasi Mandiri</div>
          <span class="badge badge-gold">${results.length} Kali Pengerjaan</span>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Judul Kuis</th>
                <th>Mata Pelajaran</th>
                <th>Nilai</th>
                <th>Jawaban Benar</th>
                <th>Waktu Tempuh</th>
                <th>Tanggal Selesai</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${results
                .map(
                  res => `
                <tr>
                  <td style="font-weight: 600;">${res.quizTitle}</td>
                  <td>${res.subjectName}</td>
                  <td style="font-weight: 800; font-size: 1.1rem; color: ${res.score >= 75 ? "var(--success)" : "var(--danger)"};">
                    ${res.score}
                  </td>
                  <td>${res.correctCount} / ${res.totalQuestions}</td>
                  <td>${res.timeSpent}</td>
                  <td style="font-size: 0.8rem; color: var(--text-muted);">${res.completedAt}</td>
                  <td>
                    <span class="badge ${res.score >= 75 ? "badge-success" : "badge-warning"}">
                      ${res.score >= 75 ? "Lulus" : "Remidi"}
                    </span>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  /**
   * --- SISI GURU: KELOLA KUIS & SOAL ---
   */
  renderTeacherManage() {
    const container = document.getElementById("teacher-manage-container");
    if (!container || !this.currentQuiz) return;

    const qList = this.currentQuiz.questions;

    container.innerHTML = `
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <div class="card-title">⚙️ Konfigurasi Kuis Aktif</div>
            <div class="card-subtitle">Pengaturan parameter umum kuis evaluasi kelas</div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="QuizEngine.openEditQuizModal()">
            ${renderIcon("edit")} Edit Kuis
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div>
            <div style="font-size: 0.76rem; color: var(--text-light); text-transform: uppercase;">Judul Kuis</div>
            <div style="font-weight: 700; font-size: 1rem; color: var(--text-dark);">${this.currentQuiz.title}</div>
          </div>
          <div>
            <div style="font-size: 0.76rem; color: var(--text-light); text-transform: uppercase;">Batas Waktu</div>
            <div style="font-weight: 700; font-size: 1rem; color: var(--text-dark);">${this.currentQuiz.timeLimitMinutes} Menit</div>
          </div>
          <div>
            <div style="font-size: 0.76rem; color: var(--text-light); text-transform: uppercase;">Standar KKM</div>
            <div style="font-weight: 700; font-size: 1rem; color: var(--gold-dark);">${this.currentQuiz.passingScore} Poin</div>
          </div>
          <div>
            <div style="font-size: 0.76rem; color: var(--text-light); text-transform: uppercase;">Total Soal</div>
            <div style="font-weight: 700; font-size: 1rem; color: var(--text-dark);">${qList.length} Butir Soal</div>
          </div>
        </div>
      </div>

      <!-- Daftar Soal -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">📝 Bank Butir Soal (${qList.length} Soal)</div>
            <div class="card-subtitle">Soal pilihan ganda beserta kunci jawaban dan pembahasannya</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="QuizEngine.openAddQuestionModal()">
            ${renderIcon("plus")} Tambah Soal Baru
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${qList
            .map(
              (q, idx) => `
            <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-card);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <span class="badge badge-gold">Nomor ${idx + 1}</span>
                <div style="display: flex; gap: 6px;">
                  <button class="btn btn-outline btn-sm" onclick="QuizEngine.openEditQuestionModal('${q.id}')">
                    ${renderIcon("edit")}
                  </button>
                  <button class="btn btn-danger btn-sm" onclick="QuizEngine.deleteQuestion('${q.id}')">
                    ${renderIcon("trash")}
                  </button>
                </div>
              </div>

              <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 10px; color: var(--text-dark);">
                ${q.text}
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px; margin-bottom: 10px;">
                ${q.options
                  .map(
                    (opt, oIdx) => `
                  <div style="padding: 6px 10px; font-size: 0.84rem; border-radius: var(--radius-sm); border: 1px solid ${
                    oIdx === q.answerIndex ? "var(--success)" : "var(--border-subtle)"
                  }; background: ${oIdx === q.answerIndex ? "var(--success-bg)" : "var(--bg-subtle)"}; color: ${
                      oIdx === q.answerIndex ? "var(--success)" : "var(--text-dark)"
                    }; font-weight: ${oIdx === q.answerIndex ? "700" : "400"};">
                    ${opt} ${oIdx === q.answerIndex ? " (Kunci)" : ""}
                  </div>
                `
                  )
                  .join("")}
              </div>

              <div style="font-size: 0.8rem; color: var(--text-muted); background: var(--bg-subtle); padding: 8px 12px; border-radius: var(--radius-sm);">
                <strong>Pembahasan:</strong> ${q.explanation}
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  },

  /**
   * --- SISI GURU: REKAP HASIL SELURUH SISWA ---
   */
  renderTeacherResults() {
    const container = document.getElementById("teacher-results-container");
    if (!container) return;

    const results = StorageManager.getQuizResults();

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">📊 Rekap Nilai Kuis Siswa</div>
            <div class="card-subtitle">Hasil pengerjaan kuis siswa dummy yang tersimpan di sistem</div>
          </div>
          <span class="badge badge-gold">${results.length} Peserta Mengerjakan</span>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Judul Kuis</th>
                <th>Nilai Akhir</th>
                <th>Skor Benar</th>
                <th>Waktu Tempuh</th>
                <th>Waktu Pengumpulan</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              ${results
                .map(
                  res => `
                <tr>
                  <td style="font-weight: 600;">${res.studentName}</td>
                  <td>${res.quizTitle}</td>
                  <td style="font-weight: 800; font-size: 1.1rem; color: ${res.score >= 75 ? "var(--success)" : "var(--danger)"};">
                    ${res.score}
                  </td>
                  <td>${res.correctCount} / ${res.totalQuestions}</td>
                  <td>${res.timeSpent}</td>
                  <td style="font-size: 0.8rem; color: var(--text-muted);">${res.completedAt}</td>
                  <td>
                    <span class="badge ${res.score >= 75 ? "badge-success" : "badge-warning"}">
                      ${res.score >= 75 ? "Tuntas" : "Remedial"}
                    </span>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // Modal Handlers Guru
  openAddQuestionModal() {
    document.getElementById("modal-q-title").textContent = "Tambah Soal Kuis Baru";
    document.getElementById("form-q-id").value = "";
    document.getElementById("form-q-text").value = "";
    document.getElementById("form-q-opt0").value = "";
    document.getElementById("form-q-opt1").value = "";
    document.getElementById("form-q-opt2").value = "";
    document.getElementById("form-q-opt3").value = "";
    document.getElementById("form-q-key").value = "0";
    document.getElementById("form-q-explanation").value = "";

    openModal("modal-question-form");
  },

  openEditQuestionModal(qId) {
    const q = this.currentQuiz.questions.find(item => item.id === qId);
    if (!q) return;

    document.getElementById("modal-q-title").textContent = "Edit Butir Soal";
    document.getElementById("form-q-id").value = q.id;
    document.getElementById("form-q-text").value = q.text;
    document.getElementById("form-q-opt0").value = q.options[0] || "";
    document.getElementById("form-q-opt1").value = q.options[1] || "";
    document.getElementById("form-q-opt2").value = q.options[2] || "";
    document.getElementById("form-q-opt3").value = q.options[3] || "";
    document.getElementById("form-q-key").value = String(q.answerIndex || 0);
    document.getElementById("form-q-explanation").value = q.explanation || "";

    openModal("modal-question-form");
  },

  saveQuestionForm(event) {
    event.preventDefault();
    const qId = document.getElementById("form-q-id").value;
    const text = document.getElementById("form-q-text").value.trim();
    const opt0 = document.getElementById("form-q-opt0").value.trim();
    const opt1 = document.getElementById("form-q-opt1").value.trim();
    const opt2 = document.getElementById("form-q-opt2").value.trim();
    const opt3 = document.getElementById("form-q-opt3").value.trim();
    const key = parseInt(document.getElementById("form-q-key").value, 10);
    const explanation = document.getElementById("form-q-explanation").value.trim();

    if (!text || !opt0 || !opt1 || !opt2 || !opt3) {
      App.toast("Gagal", "Pertanyaan dan seluruh 4 pilihan opsi harus diisi.", "danger");
      return;
    }

    const options = [opt0, opt1, opt2, opt3];
    const quizzes = StorageManager.getQuizzes();
    const quiz = quizzes.find(item => item.id === this.currentQuiz.id);

    if (qId) {
      const qIndex = quiz.questions.findIndex(item => item.id === qId);
      if (qIndex !== -1) {
        quiz.questions[qIndex] = {
          id: qId,
          text,
          options,
          answerIndex: key,
          explanation: explanation || "Pembahasan standar pengampu."
        };
        App.toast("Sukses", "Soal kuis berhasil diperbarui.", "success");
      }
    } else {
      const newQ = {
        id: `q-${Date.now()}`,
        text,
        options,
        answerIndex: key,
        explanation: explanation || "Pembahasan standar pengampu."
      };
      quiz.questions.push(newQ);
      App.toast("Sukses", "Soal kuis baru berhasil ditambahkan.", "success");
    }

    StorageManager.saveQuizzes(quizzes);
    this.currentQuiz = quiz;
    closeModal("modal-question-form");
    this.renderTeacherManage();
  },

  deleteQuestion(qId) {
    if (!confirm("Hapus butir soal ini dari kuis?")) return;

    const quizzes = StorageManager.getQuizzes();
    const quiz = quizzes.find(item => item.id === this.currentQuiz.id);
    quiz.questions = quiz.questions.filter(item => item.id !== qId);

    StorageManager.saveQuizzes(quizzes);
    this.currentQuiz = quiz;
    App.toast("Dihapus", "Soal berhasil dihapus.", "warning");
    this.renderTeacherManage();
  },

  openEditQuizModal() {
    document.getElementById("form-quiz-title").value = this.currentQuiz.title;
    document.getElementById("form-quiz-time").value = this.currentQuiz.timeLimitMinutes;
    document.getElementById("form-quiz-pass").value = this.currentQuiz.passingScore;
    document.getElementById("form-quiz-desc").value = this.currentQuiz.description;
    openModal("modal-quiz-edit");
  },

  saveQuizMetaForm(event) {
    event.preventDefault();
    const title = document.getElementById("form-quiz-title").value.trim();
    const time = parseInt(document.getElementById("form-quiz-time").value, 10) || 20;
    const pass = parseInt(document.getElementById("form-quiz-pass").value, 10) || 75;
    const desc = document.getElementById("form-quiz-desc").value.trim();

    if (!title) {
      App.toast("Gagal", "Judul kuis tidak boleh kosong.", "danger");
      return;
    }

    const quizzes = StorageManager.getQuizzes();
    const quiz = quizzes.find(item => item.id === this.currentQuiz.id);
    quiz.title = title;
    quiz.timeLimitMinutes = time;
    quiz.passingScore = pass;
    quiz.description = desc;

    StorageManager.saveQuizzes(quizzes);
    this.currentQuiz = quiz;
    closeModal("modal-quiz-edit");
    App.toast("Sukses", "Parameter kuis berhasil disimpan.", "success");
    this.renderTeacherManage();
  }
};
