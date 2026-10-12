/**
 * EDUSCHOOL - SCHOOL PROFILE CONTROLLER
 * Menampilkan identitas resmi sekolah, visi misi, profil kepala sekolah,
 * guru pendidik, fasilitas, program unggulan, dan prestasi dari schoolData terpusat.
 */

const SchoolProfile = {
  init() {
    // School profile bisa diakses publik atau melalui dashboard
    const school = StorageManager.getSchoolData();
    this.renderHeader(school);
    this.renderIdentity(school);
    this.renderHistoryVisionMission(school);
    this.renderHeadmaster(school);
    this.renderTeachers(school);
    this.renderFacilities(school);
    this.renderPrograms(school);
    this.renderAchievements(school);
    this.renderGallery(school);
    this.renderContact(school);
  },

  renderHeader(school) {
    document.getElementById("sp-name").textContent = school.name;
    document.getElementById("sp-tagline").textContent = school.tagline;
  },

  renderIdentity(school) {
    document.getElementById("sp-npsn").textContent = school.npsn;
    document.getElementById("sp-accreditation").textContent = school.accreditation;
    document.getElementById("sp-founded").textContent = school.foundedYear;
    document.getElementById("sp-curriculum").textContent = school.curriculum;
  },

  renderHistoryVisionMission(school) {
    document.getElementById("sp-history").textContent = school.history;
    document.getElementById("sp-vision").textContent = school.vision;

    const missionList = document.getElementById("sp-mission-list");
    if (missionList) {
      missionList.innerHTML = school.mission.map(m => `<li>${m}</li>`).join("");
    }
  },

  renderHeadmaster(school) {
    const hm = school.headmaster;
    document.getElementById("sp-hm-name").textContent = hm.name;
    document.getElementById("sp-hm-nip").textContent = `NIP: ${hm.nip}`;
    document.getElementById("sp-hm-quote").textContent = `"${hm.quote}"`;
  },

  renderTeachers(school) {
    const container = document.getElementById("sp-teachers-grid");
    if (!container) return;

    container.innerHTML = school.teachers
      .map(
        t => `
      <div class="card" style="text-align: center; padding: 24px;">
        <div style="font-size: 2.8rem; margin-bottom: 12px;">${t.avatar}</div>
        <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-dark); margin-bottom: 4px;">${t.name}</div>
        <div style="font-size: 0.82rem; color: var(--gold-dark); font-weight: 600; margin-bottom: 6px;">${t.subject}</div>
        <div style="font-size: 0.76rem; color: var(--text-light); margin-bottom: 8px;">NIP: ${t.nip}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted); background: var(--bg-subtle); padding: 6px 10px; border-radius: var(--radius-sm);">
          ${t.education}
        </div>
      </div>
    `
      )
      .join("");
  },

  renderFacilities(school) {
    const container = document.getElementById("sp-facilities-grid");
    if (!container) return;

    container.innerHTML = school.facilities
      .map(
        f => `
      <div class="card" style="display: flex; gap: 16px; align-items: flex-start;">
        <div style="font-size: 2.2rem; background: var(--gold-subtle); width: 56px; height: 56px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          ${f.icon}
        </div>
        <div>
          <h4 style="font-size: 1.1rem; margin-bottom: 6px; color: var(--text-dark);">${f.title}</h4>
          <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5;">${f.desc}</p>
        </div>
      </div>
    `
      )
      .join("");
  },

  renderPrograms(school) {
    const container = document.getElementById("sp-programs-grid");
    if (!container) return;

    container.innerHTML = school.programs
      .map(
        p => `
      <div class="card" style="border-left: 4px solid var(--gold-primary);">
        <h4 style="font-size: 1.15rem; color: var(--text-dark); margin-bottom: 8px;">${p.title}</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">${p.desc}</p>
      </div>
    `
      )
      .join("");
  },

  renderAchievements(school) {
    const container = document.getElementById("sp-achievements-list");
    if (!container) return;

    container.innerHTML = school.achievements
      .map(
        a => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span class="badge badge-gold" style="font-weight: 700; font-size: 0.82rem;">${a.year}</span>
          <div style="font-weight: 600; font-size: 0.94rem; color: var(--text-dark);">${a.title}</div>
        </div>
        <span class="badge badge-success">${a.rank}</span>
      </div>
    `
      )
      .join("");
  },

  renderGallery(school) {
    const container = document.getElementById("sp-gallery-grid");
    if (!container) return;

    container.innerHTML = school.gallery
      .map(
        g => `
      <div class="card" style="padding: 16px; overflow: hidden;">
        <div style="height: 140px; background: linear-gradient(135deg, #FAF8F5, #EAE6DC); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
          🏫
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="badge badge-neutral" style="font-size: 0.7rem;">${g.category}</span>
          <span style="font-size: 0.72rem; color: var(--text-light); font-weight: 600;">${g.tag}</span>
        </div>
        <div style="font-weight: 600; font-size: 0.88rem; color: var(--text-dark);">${g.title}</div>
      </div>
    `
      )
      .join("");
  },

  renderContact(school) {
    const c = school.contact;
    document.getElementById("sp-contact-address").textContent = c.address;
    document.getElementById("sp-contact-phone").textContent = c.phone;
    document.getElementById("sp-contact-wa").textContent = c.whatsapp;
    document.getElementById("sp-contact-email").textContent = c.email;
    document.getElementById("sp-contact-web").textContent = c.website;
  }
};
