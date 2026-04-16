import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaCheckCircle,
  FaSave,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
  FaUser,
  FaShareAlt,
  FaExternalLinkAlt,
  FaEye,
  FaInfoCircle,
  FaBan,
  FaPlus,
  FaTrashAlt,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaCommentDots,
  FaTelegram,
  FaYoutube,
  FaTiktok,
  FaLink,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import "./HomeMain.scss";
import Popup from "../../Popup/Popup";

const TRIAL_MODAL_SESSION_KEY = "insyde_biz_trial_modal_seen";
const DEFAULT_COLOR = "#d4af37";

// ─── Link sabitləri ───────────────────────────────────────────
const CATEGORIES = [
  { key: "social",     label: "Sosial Şəbəkələr" },
  { key: "contact",    label: "Əlaqə Məlumatları" },
  { key: "additional", label: "Əlavə Linklər" },
];

const PLATFORM_OPTIONS = {
  social: [
    { id: "instagram", name: "Instagram", icon_code: "FaInstagram" },
    { id: "facebook",  name: "Facebook",  icon_code: "FaFacebook" },
    { id: "linkedin",  name: "LinkedIn",  icon_code: "FaLinkedin" },
    { id: "whatsapp",  name: "WhatsApp",  icon_code: "FaWhatsapp" },
    { id: "telegram",  name: "Telegram",  icon_code: "FaTelegram" },
    { id: "youtube",   name: "YouTube",   icon_code: "FaYoutube" },
    { id: "tiktok",    name: "TikTok",    icon_code: "FaTiktok" },
  ],
  contact: [
    { id: "phone",   name: "Telefon", icon_code: "FaPhone" },
    { id: "email",   name: "E-poçt",  icon_code: "FaEnvelope" },
    { id: "website", name: "Vebsayt", icon_code: "FaGlobe" },
    { id: "sms",     name: "SMS",     icon_code: "FaCommentDots" },
  ],
  additional: [
    { id: "custom", name: "Xüsusi Link", icon_code: "FaLink" },
  ],
};

const ICON_MAP = {
  FaInstagram:   <FaInstagram />,
  FaFacebook:    <FaFacebook />,
  FaLinkedin:    <FaLinkedin />,
  FaWhatsapp:    <FaWhatsapp />,
  FaTelegram:    <FaTelegram />,
  FaYoutube:     <FaYoutube />,
  FaTiktok:      <FaTiktok />,
  FaPhone:       <FaPhone />,
  FaEnvelope:    <FaEnvelope />,
  FaGlobe:       <FaGlobe />,
  FaCommentDots: <FaCommentDots />,
  FaLink:        <FaLink />,
};

const getIconByCode = (code) => ICON_MAP[code] || <FaLink />;

// ─── Welcome Modal (ilk dəfə görünür) ────────────────────────
function WelcomeModal({ onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleGuide = () => {
    onClose();
    navigate("/guide");
  };

  return (
    <div className="tm-overlay" onClick={onClose}>
      <div className="tm-panel" onClick={(e) => e.stopPropagation()}>
        <button className="tm-close" onClick={onClose} aria-label="Bağla">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="tm-showcase">
          <div className="tm-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            INSYDE Business
          </div>
          <div className="tm-demo-copy">
            <h2 className="tm-title">Xoş gəldiniz!</h2>
            <p className="tm-sub">
              Profilinizi doldurun, görünüşü fərdiləşdirin və linklərini əlavə
              edin. Hər şey hazır olduqda istədiyiniz paketi seçin.
            </p>
          </div>
        </div>

        <div className="tm-body">
          <div className="tm-steps">
            <div className="tm-step">
              <div className="tm-step__num">1</div>
              <div className="tm-step__text">
                <strong>Profilinizi tamamlayın</strong>
                <span>Fərdi və ya biznes məlumatlarınızı daxil edin.</span>
              </div>
            </div>
            <div className="tm-step">
              <div className="tm-step__num">2</div>
              <div className="tm-step__text">
                <strong>Profil görünüşünü yoxlayın</strong>
                <span>Müştərinin görəcəyi səhifəyə baxın.</span>
              </div>
            </div>
            <div className="tm-step">
              <div className="tm-step__num">3</div>
              <div className="tm-step__text">
                <strong>Uyğun paketi seçin</strong>
                <span>Hazır olanda davam edib sifarişi tamamlayın.</span>
              </div>
            </div>
          </div>

          <div className="tm-actions">
            <button className="tm-btn tm-btn--secondary" onClick={onClose}>
              Bağla
            </button>
            <button className="tm-btn tm-btn--primary" onClick={handleGuide}>
              Bələdçiyə keç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}`
    : "212, 175, 55";
};

const emptyForm = () => ({
  name: "",
  profession: "",
  workplace: "",
  about: "",
  skill1: "",
  skill2: "",
  skill3: "",
});

const COLORS = [
  "#d3d3d3", "#5c6bc0", "#e74c3c", "#2980b9", "#87ceeb",
  "#27ae60", "#2ecc71", "#8e44ad", "#e91e8c", "#f1c40f",
  "#e67e22", "#d4af37",
];

// ─── Yenidən istifadə edilən form sahələri ───────────────────
function ProfileFields({ mode, data, onChange, imgSrc, onImgUpload, formId }) {
  return (
    <div className="account-fields">
      <div className="row-1">
        <div className="upload-box">
          <input
            type="file"
            id={`img-${formId}`}
            accept="image/*"
            onChange={onImgUpload}
          />
          <label htmlFor={`img-${formId}`}>
            {imgSrc ? (
              <img src={imgSrc} alt="Profile" className="preview-img-small" />
            ) : (
              <>
                <FaCloudUploadAlt className="upload-icon" />
                <span>Yüklə</span>
              </>
            )}
          </label>
        </div>

        <div className={`inputs-grid ${mode === "biznes" ? "inputs-grid--single" : ""}`}>
          <div className="input-group">
            <label>{mode === "biznes" ? "Brend Adı" : "Ad Soyad"}</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChange}
              placeholder={mode === "biznes" ? "Brend və ya şirkət adı" : "Ad Soyad"}
            />
          </div>
          {mode === "ferdi" && (
            <div className="input-group">
              <label>Peşə</label>
              <input
                type="text"
                name="profession"
                value={data.profession}
                onChange={onChange}
                placeholder="Peşə"
              />
            </div>
          )}
        </div>
      </div>

      <div className="input-group full-width">
        <label>Haqqında məlumat</label>
        <textarea
          name="about"
          rows="3"
          value={data.about}
          onChange={onChange}
        />
      </div>

      <div className="skills-group full-width">
        <label>
          {mode === "biznes"
            ? "Üstünlüklər (istəyə bağlı, max 3)"
            : "Bacarıqlar (istəyə bağlı, max 3)"}
        </label>
        <div className="skills-inputs">
          <input
            type="text"
            name="skill1"
            value={data.skill1}
            onChange={onChange}
            placeholder={mode === "biznes" ? "Üstünlük 1" : "Bacarıq 1"}
          />
          <input
            type="text"
            name="skill2"
            value={data.skill2}
            onChange={onChange}
            placeholder={mode === "biznes" ? "Üstünlük 2" : "Bacarıq 2"}
          />
          <input
            type="text"
            name="skill3"
            value={data.skill3}
            onChange={onChange}
            placeholder={mode === "biznes" ? "Üstünlük 3" : "Bacarıq 3"}
          />
        </div>
      </div>

      {mode === "ferdi" && (
        <div className="input-group full-width">
          <label>İş yeri (istəyə bağlı)</label>
          <input
            type="text"
            name="workplace"
            value={data.workplace}
            onChange={onChange}
            placeholder="Şirkət və ya təşkilat adı"
          />
        </div>
      )}
    </div>
  );
}

// ─── Links bölməsi ───────────────────────────────────────────
function LinksSection({ links, setLinks, onDirty, sectionId }) {
  const [activeTab, setActiveTab] = useState("social");

  const linksFor = (cat) =>
    links
      .map((l, i) => ({ ...l, globalIdx: i }))
      .filter((l) => l.category === cat && !l.isDeleted);

  const addNewLink = (cat) => {
    const platforms = PLATFORM_OPTIONS[cat] || [];
    if (!platforms.length) return;
    const first = platforms[0];
    setLinks((p) => [
      ...p,
      {
        id: `${sectionId}-${Date.now()}`,
        platform_id: first.id,
        category: cat,
        url: "",
        name: first.name,
        icon_code: first.icon_code,
        isNew: true,
        isDirty: false,
        isDeleted: false,
      },
    ]);
    onDirty();
  };

  const handleLinkChange = (globalIdx, field, value) => {
    setLinks((p) => {
      const u = [...p];
      const link = { ...u[globalIdx], isDirty: true };
      if (field === "platform") {
        const sel = (PLATFORM_OPTIONS[link.category] || []).find(
          (o) => o.name === value
        );
        if (!sel) return p;
        link.name = sel.name;
        link.icon_code = sel.icon_code;
        link.platform_id = sel.id;
      } else {
        link.url = value;
      }
      u[globalIdx] = link;
      return u;
    });
    onDirty();
  };

  const handleRemoveLink = (globalIdx) => {
    setLinks((p) => {
      const link = p[globalIdx];
      if (link.isNew) return p.filter((_, i) => i !== globalIdx);
      return p.map((l, i) =>
        i === globalIdx ? { ...l, isDeleted: true } : l
      );
    });
    onDirty();
  };

  return (
    <div className="links-section">
      <div className="link-tabs">
        {CATEGORIES.map((cat) => {
          const count = links.filter(
            (l) => l.category === cat.key && l.url && !l.isDeleted
          ).length;
          return (
            <button
              key={cat.key}
              className={`link-tab ${activeTab === cat.key ? "active" : ""}`}
              onClick={() => setActiveTab(cat.key)}
            >
              {cat.label}
              {count > 0 && <span className="tab-count">{count}</span>}
            </button>
          );
        })}
      </div>

      {CATEGORIES.filter((c) => c.key === activeTab).map((cat) => {
        const catLinks = linksFor(cat.key);
        const catPlatforms = PLATFORM_OPTIONS[cat.key] || [];
        return (
          <div className="link-category-block" key={cat.key}>
            <div className="links-list">
              {catLinks.length === 0 && (
                <div className="links-empty">Hələ link əlavə edilməyib.</div>
              )}
              {catLinks.map((link, localIdx) => (
                <div
                  key={link.globalIdx}
                  className={[
                    "social-add-row",
                    link.isNew ? "row-new" : "",
                    link.isDirty && !link.isNew ? "row-dirty" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="row-top-mobile">
                    <div className="order-num">{localIdx + 1}</div>
                    <button
                      className="remove-link-btn"
                      onClick={() => handleRemoveLink(link.globalIdx)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                  <div className="social-select">
                    <span className="select-icon">
                      {getIconByCode(link.icon_code)}
                    </span>
                    <select
                      value={link.name}
                      onChange={(e) =>
                        handleLinkChange(
                          link.globalIdx,
                          "platform",
                          e.target.value
                        )
                      }
                    >
                      {catPlatforms.map((opt) => (
                        <option key={opt.id} value={opt.name}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Linkinizi bura yapışdırın"
                    value={link.url}
                    onChange={(e) =>
                      handleLinkChange(link.globalIdx, "url", e.target.value)
                    }
                  />

                  {link.isNew && <span className="new-badge">Yeni</span>}
                  {link.isDirty && !link.isNew && (
                    <span className="dirty-badge">●</span>
                  )}
                </div>
              ))}
            </div>

            <button
              className="add-new-btn"
              onClick={() => addNewLink(cat.key)}
            >
              <FaPlus /> {cat.label} Əlavə Et
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ─── Əsas komponent ──────────────────────────────────────────
export default function HomeMain() {
  const [popup, setPopup] = useState({ isOpen: false });
  const closePopup = () => setPopup((p) => ({ ...p, isOpen: false }));

  // Trial modal
  const [showTrialModal, setShowTrialModal] = useState(false);

  // Plan & status
  const [planName] = useState(""); // boş = free/sınaq
  const [isBlocked] = useState(false);
  const [hasUnsaved, setHasUnsaved] = useState(false);

  // Hissə 1 — Fərdi/Biznes switch + fieldlər
  const [form1, setForm1] = useState(emptyForm());
  const [image1, setImage1] = useState(null);
  const [section1Mode, setSection1Mode] = useState("ferdi");
  const [section1Open, setSection1Open] = useState(true);

  // Hissə 2 — Yalnız brend fieldləri
  const [form2, setForm2] = useState(emptyForm());
  const [image2, setImage2] = useState(null);
  const [section2Open, setSection2Open] = useState(false);

  // Linklər
  const [links1, setLinks1] = useState([]);
  const [links2, setLinks2] = useState([]);

  // İzlənmə & profil linki
  const [totalViews] = useState(0);
  const profileUrl = "#";

  // Modal: yalnız ilk dəfə göstər (localStorage ilə)
  useEffect(() => {
    if (!localStorage.getItem(TRIAL_MODAL_SESSION_KEY)) {
      localStorage.setItem(TRIAL_MODAL_SESSION_KEY, "true");
      setShowTrialModal(true);
    }
  }, []);

  // Telefon önizləmə
  const [themeColor, setThemeColor] = useState(DEFAULT_COLOR);
  const themeRgb = hexToRgb(themeColor);
  const [phoneTheme, setPhoneTheme] = useState("dark");
  const togglePhoneTheme = () =>
    setPhoneTheme((p) => (p === "dark" ? "light" : "dark"));

  const handleChange1 = (e) => {
    setForm1((p) => ({ ...p, [e.target.name]: e.target.value }));
    setHasUnsaved(true);
  };
  const handleChange2 = (e) => {
    setForm2((p) => ({ ...p, [e.target.name]: e.target.value }));
    setHasUnsaved(true);
  };

  const handleImageUpload1 = (e) => {
    const f = e.target.files[0];
    if (f) { setImage1(URL.createObjectURL(f)); setHasUnsaved(true); }
  };
  const handleImageUpload2 = (e) => {
    const f = e.target.files[0];
    if (f) { setImage2(URL.createObjectURL(f)); setHasUnsaved(true); }
  };

  // Önizləmə üçün məlumat (açıq olan hissədən götürülür)
  const activeForm = section1Open ? form1 : form2;
  const activeImage = section1Open ? image1 : image2;
  const previewName = activeForm.name || (section1Open && section1Mode === "ferdi" ? "Ad Soyad" : "Brend Adı");
  const previewProfession = section1Open && section1Mode === "ferdi" ? activeForm.profession || "Peşə" : "";

  return (
    <div className="home-main-modern-split">
      {showTrialModal && (
        <WelcomeModal onClose={() => setShowTrialModal(false)} />
      )}
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

      {/* ══════════════════════════════
          SOL — FORM
      ══════════════════════════════ */}
      <div className="form-section">
        <div className="top-header">
          <div>
            <h2 className="page-title">Profil</h2>
            <span className="badge premium">Sahibkar Paket</span>
          </div>
          <div className="header-stats">
            <div className="stat-views">
              <FaEye />
              <span>{totalViews} izlənmə</span>
            </div>
          </div>
        </div>

        <div className="dual-accounts">
          {/* ── Başlıq sıraları yan yana ── */}
          <div className="dual-accounts-headers">
            <button
              className={`account-section-header${section1Open ? " active" : ""}`}
              onClick={() => {
                const next = !section1Open;
                setSection1Open(next);
                if (next) setSection2Open(false);
              }}
            >
              <div className="account-section-title">
                <span className="account-num">1</span>
                <div className="account-title-text">
                  <span className="account-title-main">
                    {section1Mode === "ferdi" ? "Fərdi Hissə" : "Biznes Hissə"}
                  </span>
                  <span className="account-title-sub">İstənilən 1 hissəni seçin</span>
                </div>
                {form1.name && (
                  <span className="account-name-preview">{form1.name}</span>
                )}
              </div>
              {section1Open ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            <button
              className={`account-section-header${section2Open ? " active" : ""}`}
              onClick={() => {
                const next = !section2Open;
                setSection2Open(next);
                if (next) setSection1Open(false);
              }}
            >
              <div className="account-section-title">
                <span className="account-num">2</span>
                <div className="account-title-text">
                  <span className="account-title-main">Brend Hissə</span>
                  <span className="account-title-sub">Brendinizi daxil edin</span>
                </div>
                {form2.name && (
                  <span className="account-name-preview">{form2.name}</span>
                )}
              </div>
              {section2Open ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {/* ── Açılan bölmə — tam en ── */}
          {section1Open && (
            <div className="account-section-body modern-card">
              <div className="section-info-box">
                <FaInfoCircle />
                <p>
                  Aşağıdan <strong>Fərdi</strong> və ya <strong>Biznes</strong> seçib
                  profilinizi doldurun. Seçiminə uyğun sahələr avtomatik dəyişir.
                </p>
              </div>

              <div className="profile-mode-switch">
                <button
                  className={`mode-switch-btn ${section1Mode === "ferdi" ? "active" : ""}`}
                  onClick={() => setSection1Mode("ferdi")}
                >
                  <FaUser /> Fərdi
                </button>
                <button
                  className={`mode-switch-btn ${section1Mode === "biznes" ? "active" : ""}`}
                  onClick={() => setSection1Mode("biznes")}
                >
                  <FaBriefcase /> Biznes
                </button>
              </div>

              <ProfileFields
                mode={section1Mode}
                data={form1}
                onChange={handleChange1}
                imgSrc={image1}
                onImgUpload={handleImageUpload1}
                formId="s1"
              />

              <LinksSection
                links={links1}
                setLinks={setLinks1}
                onDirty={() => setHasUnsaved(true)}
                sectionId="s1"
              />
            </div>
          )}

          {section2Open && (
            <div className="account-section-body modern-card">
              <div className="section-info-box">
                <FaInfoCircle />
                <p>
                  Bu hissədə <strong>brend</strong> məlumatlarınızı daxil edin.
                </p>
              </div>

              <ProfileFields
                mode="biznes"
                data={form2}
                onChange={handleChange2}
                imgSrc={image2}
                onImgUpload={handleImageUpload2}
                formId="s2"
              />

              <LinksSection
                links={links2}
                setLinks={setLinks2}
                onDirty={() => setHasUnsaved(true)}
                sectionId="s2"
              />
            </div>
          )}
        </div>

        {/* ── Alt düymələr ── */}
        <div className="bottom-actions">
          <div
            className={`status-badge ${
              isBlocked
                ? "status-badge--blocked"
                : hasUnsaved
                ? "status-badge--unsaved"
                : ""
            }`}
          >
            {isBlocked ? (
              <>
                <FaBan className="status-badge-icon" />
                <div className="status-badge-content">
                  <span className="status-badge-title">
                    Sizin hesab bloklanmışdır
                  </span>
                </div>
              </>
            ) : hasUnsaved ? (
              <>
                <FaCheckCircle className="status-badge-icon" />
                <div className="status-badge-content">
                  <span className="status-badge-title">
                    Saxlanılmamış dəyişikliklər var
                  </span>
                </div>
              </>
            ) : !planName || planName.toLowerCase() === "free" ? (
              <>
                <FaCheckCircle className="status-badge-icon" />
                <div className="status-badge-content">
                  <span className="status-badge-title">
                    1 günlük yoxlama aktivdir
                  </span>
                </div>
              </>
            ) : (
              <>
                <FaCheckCircle className="status-badge-icon" />
                <div className="status-badge-content">
                  <span className="status-badge-title">
                    Məlumatlar işlək vəziyyətdədir
                  </span>
                </div>
              </>
            )}
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="view-profile-btn"
          >
            <FaExternalLinkAlt /> Profilə keç
          </a>

          <button
            className={`save-btn ${hasUnsaved ? "save-btn--unsaved" : ""}`}
            disabled={isBlocked}
            onClick={() =>
              setPopup({
                isOpen: true,
                type: "update",
                title: "Məlumat yadda saxlanılsın?",
                message: "Bütün dəyişikliklər tətbiq ediləcək.",
                confirmText: "Saxla",
                onConfirm: () => setHasUnsaved(false),
              })
            }
          >
            <FaSave /> Yadda Saxla
          </button>
        </div>
      </div>

      {/* ══════════════════════════════
          SAĞ — TELEFON PREVİEW
      ══════════════════════════════ */}
      <div className="preview-section">
        <button className="phone-theme-toggle" onClick={togglePhoneTheme}>
          <div className="toggle-track">
            <span className={`toggle-label left ${phoneTheme === "light" ? "active" : ""}`}>
              <FaSun /> <span>Light</span>
            </span>
            <span className={`toggle-label right ${phoneTheme === "dark" ? "active" : ""}`}>
              <FaMoon /> <span>Dark</span>
            </span>
            <div className={`toggle-thumb ${phoneTheme === "dark" ? "thumb-right" : "thumb-left"}`} />
          </div>
        </button>

        <div className={`phone-mockup phone-${phoneTheme}`}>
          <div className="phone-notch" />
          <div className="phone-scroll-area">
            <div
              className="ph-header-gradient"
              style={{
                background: phoneTheme === "light"
                  ? `linear-gradient(160deg, #fef9e7 0%, #fff8dc 40%, #fffaf0 100%)`
                  : `linear-gradient(160deg, #2a1f00 0%, #3d2c00 40%, #1a1400 100%)`,
              }}
            >
              <div className="ph-top-bar">
                <span className="ph-company-badge">
                  {activeForm.name || "INSYDE"}
                </span>
                <div className="ph-views-badge">
                  <span className="ph-views-dot" />
                  0 baxış
                </div>
              </div>

              <div className="ph-avatar-center">
                <div
                  className="ph-avatar-ring"
                  style={{ borderColor: themeColor }}
                >
                  {activeImage ? (
                    <img
                      src={activeImage}
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
                  {previewName}
                  <span className="ph-star" style={{ color: themeColor }}>
                    ✦
                  </span>
                </span>
                {previewProfession && (
                  <span className="ph-profession">
                    {previewProfession.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="ph-action-row">
                <button
                  className="ph-act-btn ph-act-gold"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  INSYDE
                </button>
                <button className="ph-act-btn ph-act-outline">Daha çox</button>
                <button className="ph-act-btn ph-act-share">
                  <FaShareAlt /> Paylaş
                </button>
              </div>

              <div className="ph-tabs">
                <button className="ph-tab active">Şəxsi</button>
                <button className="ph-tab">Biznes</button>
              </div>
            </div>

            <div className="ph-footer">
              © 2026 <span style={{ color: themeColor }}>INSYDE.</span> ALL
              RIGHTS RESERVED.
            </div>
          </div>
        </div>

        {/* Rəng palitri */}
        <div className="theme-color-section">
          <label>Profil Rəngi / Tema Rəngi</label>
          <div className="color-palette">
            {COLORS.map((color, i) => (
              <div
                key={i}
                className={`color-box ${themeColor === color ? "active" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setThemeColor(color)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
