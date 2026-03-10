import React, { useState } from "react";
import {
  FaCloudUploadAlt,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaGlobe,
  FaCheckCircle,
  FaSun,
  FaMoon,
  FaExternalLinkAlt,
  FaPhone,
  FaEnvelope,
  FaCommentDots,
  FaCamera,
  FaTrashAlt,
  FaPlus,
} from "react-icons/fa";
import "./HomeMain.scss";

const platformIconMap = {
  Instagram: <FaInstagram />,
  Facebook: <FaFacebook />,
  LinkedIn: <FaLinkedin />,
  WhatsApp: <FaWhatsapp />,
  "Web Sayt": <FaGlobe />,
};

const AUTO_LINKS = [
  { platform: "Instagram", url: "instagram.com/elcin" },
  { platform: "LinkedIn", url: "linkedin.com/in/elcin" },
  { platform: "WhatsApp", url: "+994501234567" },
];

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}`
    : "184, 134, 11";
};

function HomeMain() {
  const [formData, setFormData] = useState({
    name: "Elçin",
    email: "elcin@example.com",
    profession: "Frontend Developer",
    skill1: "React",
    skill2: "CSS",
    skill3: "UI/UX",
    about: "Minimalist və müasir interfeyslər qurmağı sevirəm.",
    themeColor: "#b8860b",
    workYears: "2",
    workMonths: "4",
    phone: "+994501234567",
    whatsapp: "+994501234567",
    companyName: "INSYDE",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [phoneMode, setPhoneMode] = useState("dark");

  const userCode = "SYD4568";
  const themeRgb = hexToRgb(formData.themeColor);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  const removeProfileImage = () => setProfileImage(null);

  return (
    <div className="home-main-modern-split">
      {/* ========== SOL TƏRƏF ========== */}
      <div className="form-section">
        <div className="top-header">
          <div>
            <h2 className="page-title">İdarəetmə Sistemi</h2>
            <span className="badge premium">Biznes Paket</span>
          </div>
          <div className="header-actions">
            <span className="time-left">3 gün qalıb</span>
          </div>
        </div>

        {/* ── FOTO YÜKLƏMƏ KARTI ── */}
        <div className="modern-card photo-upload-card">
          <div className="photo-upload-inner">
            <div className="photo-preview-wrap">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="photo-preview-img"
                />
              ) : (
                <div className="photo-placeholder">
                  <FaCamera className="camera-icon" />
                </div>
              )}
            </div>
            <div className="photo-right">
              <div className="photo-section-info">
                <h4>Profil Şəkli</h4>
                <p>Avatar kimi görünür. JPG, PNG · Maks 5MB</p>
              </div>
              <div className="photo-actions">
                <label htmlFor="profile-upload" className="upload-photo-btn">
                  <FaCloudUploadAlt />
                  {profileImage ? "Dəyişdir" : "Yüklə"}
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  style={{ display: "none" }}
                />
                {profileImage && (
                  <button
                    className="remove-photo-btn"
                    onClick={removeProfileImage}
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── ŞƏXSİ MƏLUMATLAR ── */}
        <div className="modern-card form-card">
          <div className="row-1">
            <div className="inputs-grid">
              <div className="input-group">
                <label>Ad Soyad</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="stats-boxes">
              <div className="stat-box">
                <label>Ümumi Baxış</label>
                <div className="val green">0</div>
              </div>
              <div className="stat-box">
                <label>User Code</label>
                <div className="val code">SYD4568</div>
              </div>
            </div>
          </div>

          <div className="row-2">
            <div className="input-group flex-1">
              <label>Peşə</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              />
            </div>
            <div className="skills-group">
              <label>Bacarıqlar (Max 3)</label>
              <div className="skills-inputs">
                <input
                  type="text"
                  name="skill1"
                  value={formData.skill1}
                  onChange={handleChange}
                  placeholder="Bacarıq 1"
                />
                <input
                  type="text"
                  name="skill2"
                  value={formData.skill2}
                  onChange={handleChange}
                  placeholder="Bacarıq 2"
                />
                <input
                  type="text"
                  name="skill3"
                  value={formData.skill3}
                  onChange={handleChange}
                  placeholder="Bacarıq 3"
                />
              </div>
            </div>
          </div>


          <div className="row-stats-input">
            <div className="input-group staj-wrap">
              <label>İşçi Stajı</label>
              <div className="staj-inputs-row">
                <div className="staj-field">
                  <input
                    type="number"
                    name="workYears"
                    min="0"
                    max="50"
                    value={formData.workYears}
                    onChange={handleChange}
                    placeholder="0"
                  />
                  <span>il</span>
                </div>
                <div className="staj-field">
                  <input
                    type="number"
                    name="workMonths"
                    min="0"
                    max="11"
                    value={formData.workMonths}
                    onChange={handleChange}
                    placeholder="0"
                  />
                  <span>ay</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── ƏLAQƏ VƏ MESAJ ── */}
          <div className="row-contact">
            <div className="input-group flex-1">
              <label>Əlaqə (Telefon)</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+994 XX XXX XX XX"
              />
            </div>
            <div className="input-group flex-1">
              <label>Mesaj (WhatsApp / SMS)</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+994 XX XXX XX XX"
              />
            </div>
          </div>

          <div className="input-group full-width">
            <label>Haqqında məlumat</label>
            <textarea
              name="about"
              rows="3"
              value={formData.about}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="bottom-actions">
          <div className="status-badge">
            <FaCheckCircle /> Məlumatlar işlək vəziyyətdədir
          </div>
          <button className="save-btn">
            <FaPlus /> Yarat
          </button>
        </div>
      </div>

      {/* ========== SAĞ TƏRƏF: PREVIEW ========== */}
      <div className="preview-section">
        <div className={`phone-mockup mode-${phoneMode}`}>
          <div className="phone-notch" />
          <div className="phone-scroll-area">
            <div className="profile-header">
              {/* ── ŞİRKƏT ADI TOP BAR ── */}
              <div className="ph-top-bar">
                <span className="ph-company-left">
                  {formData.companyName || "INSYDE"}
                </span>
                <span className="ph-company-right">PM Systems</span>
              </div>

              <div className="ph-back-btn">‹</div>

              <div className="ph-stats-row">
                <div className="ph-stat">
                  <span className="ph-stat-num">0</span>
                  <span className="ph-stat-label">Baxış</span>
                </div>
                <div className="ph-avatar-wrap">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="avatar"
                      className="ph-avatar"
                    />
                  ) : (
                    <div
                      className="ph-avatar-placeholder"
                      style={{
                        background: `linear-gradient(135deg, rgba(${themeRgb},0.6), rgba(${themeRgb},0.2))`,
                      }}
                    />
                  )}
                  <span
                    className="ph-online-dot"
                    style={{ backgroundColor: formData.themeColor }}
                  />
                </div>
                <div className="ph-stat ph-stat-right">
                  <span className="ph-stat-num">
                    {(formData.workYears > 0
                      ? `${formData.workYears}il `
                      : "") +
                      (formData.workMonths > 0
                        ? `${formData.workMonths}ay`
                        : "") || "0"}
                  </span>
                  <span className="ph-stat-label">Staj</span>
                </div>
              </div>

              <div className="ph-name-block">
                <span className="ph-name">
                  {formData.name || "Ad Soyad"}
                  <span
                    className="ph-verified"
                    style={{ color: formData.themeColor }}
                  >
                    ✦
                  </span>
                </span>
                <span className="ph-profession">
                  {formData.profession || "Peşə"}
                </span>
              </div>

              <div className="ph-action-btns">
                <button
                  className="ph-btn ph-btn-primary"
                  style={{ borderColor: `rgba(${themeRgb},0.6)` }}
                >
                  Əlaqə
                </button>
                <button
                  className="ph-btn ph-btn-fill"
                  style={{ backgroundColor: formData.themeColor }}
                >
                  Mesaj
                </button>
              </div>
            </div>

            {/* ── LİNKLƏR ── */}
            <div className="preview-links-list">
              <div className="preview-link-card">
                <div
                  className="link-icon-wrap"
                  style={{ backgroundColor: formData.themeColor }}
                >
                  <FaPhone />
                </div>
                <div className="link-text">
                  <span className="link-label">Call</span>
                  {formData.phone && (
                    <span className="link-sub">{formData.phone}</span>
                  )}
                </div>
                <span className="link-arrow">↗</span>
              </div>

              <div className="preview-link-card">
                <div
                  className="link-icon-wrap"
                  style={{ backgroundColor: formData.themeColor }}
                >
                  <FaCommentDots />
                </div>
                <div className="link-text">
                  <span className="link-label">Message</span>
                  {formData.whatsapp && (
                    <span className="link-sub">{formData.whatsapp}</span>
                  )}
                </div>
                <span className="link-arrow">↗</span>
              </div>

              <div className="preview-link-card">
                <div
                  className="link-icon-wrap"
                  style={{ backgroundColor: formData.themeColor }}
                >
                  <FaEnvelope />
                </div>
                <div className="link-text">
                  <span className="link-label">E-mail</span>
                  {formData.email && (
                    <span className="link-sub">{formData.email}</span>
                  )}
                </div>
                <span className="link-arrow">↗</span>
              </div>

              {AUTO_LINKS.map((link, i) => (
                <div className="preview-link-card" key={i}>
                  <div
                    className="link-icon-wrap"
                    style={{ backgroundColor: formData.themeColor }}
                  >
                    {platformIconMap[link.platform] || <FaGlobe />}
                  </div>
                  <div className="link-text">
                    <span className="link-label">{link.platform}</span>
                    <span className="link-sub">{link.url}</span>
                  </div>
                  <span className="link-arrow">↗</span>
                </div>
              ))}
            </div>

            {/* ── BACARIQLAR ── */}
            {(formData.skill1 || formData.skill2 || formData.skill3) && (
              <div className="preview-skills-section">
                {[formData.skill1, formData.skill2, formData.skill3]
                  .filter(Boolean)
                  .map((s, i) => (
                    <span
                      key={i}
                      className="skill-chip"
                      style={{
                        borderColor: `rgba(${themeRgb},0.5)`,
                        color: formData.themeColor,
                      }}
                    >
                      {s}
                    </span>
                  ))}
              </div>
            )}

            <div className="phone-nav-bar">
              <span>✉</span>
              <span>⌕</span>
              <span>♡</span>
              <span>≡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMain;
