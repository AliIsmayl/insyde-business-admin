import React, { useState } from "react";
import {
  FaCloudUploadAlt,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaGlobe,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaCommentDots,
  FaCamera,
  FaTrashAlt,
  FaPlus,
  FaTelegram,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaShareAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./HomeMain.scss";
import Popup from "../../Popup/Popup";

const platformIconMap = {
  Instagram: <FaInstagram />,
  Facebook: <FaFacebook />,
  LinkedIn: <FaLinkedin />,
  WhatsApp: <FaWhatsapp />,
  "Web Sayt": <FaGlobe />,
  Telefon: <FaPhone />,
  "Zəng et": <FaPhone />,
  Email: <FaEnvelope />,
  "E-mail": <FaEnvelope />,
  Telegram: <FaTelegram />,
  YouTube: <FaYoutube />,
  TikTok: <FaTiktok />,
  Twitter: <FaTwitter />,
  Mesaj: <FaCommentDots />,
};

const platformOptions = [
  { name: "Zəng et", icon: <FaPhone /> },
  { name: "Mesaj", icon: <FaCommentDots /> },
  { name: "WhatsApp", icon: <FaWhatsapp /> },
  { name: "E-mail", icon: <FaEnvelope /> },
  { name: "Instagram", icon: <FaInstagram /> },
  { name: "Facebook", icon: <FaFacebook /> },
  { name: "LinkedIn", icon: <FaLinkedin /> },
  { name: "Telegram", icon: <FaTelegram /> },
  { name: "YouTube", icon: <FaYoutube /> },
  { name: "TikTok", icon: <FaTiktok /> },
  { name: "Twitter", icon: <FaTwitter /> },
  { name: "Web Sayt", icon: <FaGlobe /> },
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
    companyName: "INSYDE",
    password: "",
    passwordConfirm: "",
  });

  const [links, setLinks] = useState([
    { platform: "Zəng et", url: "+994501234567" },
    { platform: "Mesaj", url: "+994501234567" },
    { platform: "E-mail", url: "elcin@example.com" },
    { platform: "Instagram", url: "instagram.com/elcin" },
    { platform: "LinkedIn", url: "linkedin.com/in/elcin" },
  ]);

  const [profileImage, setProfileImage] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  // ── Popup state ──
  const [popup, setPopup] = useState({ isOpen: false, type: "success" });
  const closePopup = () => setPopup((p) => ({ ...p, isOpen: false }));

  const themeRgb = hexToRgb(formData.themeColor);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  const removeProfileImage = () => setProfileImage(null);

  const addLink = () => {
    setLinks([...links, { platform: "Instagram", url: "" }]);
  };

  const handleLinkChange = (index, field, value) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="home-main-modern-split">
      {/* ── Popup — bütün type-lar üçün tək instansiya ── */}
      <Popup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        confirmText={popup.confirmText}
        cancelText="Ləğv et"
        onConfirm={() => {
          popup.onConfirm?.();
          closePopup();
        }}
        onCancel={closePopup}
      />

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

          {/* ── PAROL ── */}
          <div className="password-section">
            <label className="section-label">
              <FaLock /> Parol
            </label>
            <div className="password-row">
              <div className="input-group flex-1">
                <label>Yeni Parol</label>
                <div className="password-input-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="input-group flex-1">
                <label>Parolu Təsdiqlə</label>
                <div className="password-input-wrap">
                  <input
                    type={showPassConfirm ? "text" : "password"}
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassConfirm(!showPassConfirm)}
                  >
                    {showPassConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-actions">
          <div className="status-badge">
            <FaCheckCircle /> Məlumatlar işlək vəziyyətdədir
          </div>
          {/* SUCCESS popup ilə saxla */}
          <button
            className="save-btn"
            onClick={() =>
              setPopup({
                isOpen: true,
                type: "success",
                title: "Yadda saxlanıldı!",
                message: "Bütün məlumatlar uğurla yeniləndi.",
                confirmText: "Əla",
                onConfirm: null,
              })
            }
          >
            <FaPlus /> Yarat
          </button>
        </div>
      </div>

      {/* ========== SAĞ TƏRƏF: PREVIEW ========== */}
      <div className="preview-section">
        <div className="phone-mockup">
          <div className="phone-notch" />
          <div className="phone-scroll-area">
            {/* ── HEADER ── */}
            <div
              className="ph-header-gradient"
              style={{
                background: `linear-gradient(160deg, #2a1f00 0%, #3d2c00 40%, #1a1400 100%)`,
              }}
            >
              <div className="ph-top-bar">
                <span className="ph-company-badge">
                  {formData.companyName || "INSYDE"}
                </span>
                <div className="ph-views-badge">
                  <span className="ph-views-dot" />0 baxış
                </div>
              </div>

              <div className="ph-avatar-center">
                <div
                  className="ph-avatar-ring"
                  style={{ borderColor: formData.themeColor }}
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="avatar"
                      className="ph-avatar-img"
                    />
                  ) : (
                    <div
                      className="ph-avatar-placeholder"
                      style={{
                        background: `linear-gradient(135deg, rgba(${themeRgb},0.5), rgba(${themeRgb},0.15))`,
                      }}
                    />
                  )}
                  <span
                    className="ph-online-dot"
                    style={{ backgroundColor: "#2ecc71" }}
                  />
                </div>
              </div>

              <div className="ph-name-block">
                <span className="ph-name">
                  {formData.name || "Ad Soyad"}
                  <span
                    className="ph-star"
                    style={{ color: formData.themeColor }}
                  >
                    ✦
                  </span>
                </span>
                <span className="ph-profession">
                  {(formData.profession || "Peşə").toUpperCase()}
                </span>
              </div>

              <div className="ph-action-row">
                <button
                  className="ph-act-btn ph-act-gold"
                  style={{
                    borderColor: formData.themeColor,
                    color: formData.themeColor,
                  }}
                >
                  {formData.companyName || "Insyde"}
                </button>
                <button className="ph-act-btn ph-act-outline">Daha çox</button>
                <button className="ph-act-btn ph-act-share">
                  <FaShareAlt /> Paylaş
                </button>
              </div>

              <div className="ph-tabs">
                <button className="ph-tab active">Şəxsi</button>
                <button className="ph-tab">PM Systems</button>
              </div>
            </div>

            {/* ── LİNKLƏR ── */}
            <div className="ph-links-list">
              {links.map((link, i) =>
                link.url ? (
                  <div className="ph-link-card" key={i}>
                    <div
                      className="ph-link-icon"
                      style={{ backgroundColor: `rgba(${themeRgb}, 0.18)` }}
                    >
                      <span style={{ color: formData.themeColor }}>
                        {platformIconMap[link.platform] || <FaGlobe />}
                      </span>
                    </div>
                    <span className="ph-link-label">{link.platform}</span>
                    <span
                      className="ph-link-arrow"
                      style={{ color: formData.themeColor }}
                    >
                      ↗
                    </span>
                  </div>
                ) : null,
              )}
            </div>

            <div className="ph-footer">
              © 2026 <span style={{ color: formData.themeColor }}>INSYDE.</span>{" "}
              ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMain;
