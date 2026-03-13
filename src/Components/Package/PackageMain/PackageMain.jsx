import React, { useState, useEffect } from "react";
import {
  FiCheck,
  FiX,
  FiCheckCircle,
  FiInfo,
  FiCalendar,
  FiUsers,
  FiZap,
  FiTrash2,
  FiAlertCircle,
  FiSlash,
} from "react-icons/fi";
import "./PackageMain.scss";

// ─────────────────────────────────────────
// POPUP
// ─────────────────────────────────────────
const POPUP_CONFIG = {
  success: {
    Icon: FiCheckCircle,
    confirmClass: "popup__btn--success",
    defaultConfirm: "Əla",
    cancelable: false,
  },
  delete: {
    Icon: FiTrash2,
    confirmClass: "popup__btn--delete",
    defaultConfirm: "Sil",
    cancelable: true,
  },
  error: {
    Icon: FiAlertCircle,
    confirmClass: "popup__btn--error",
    defaultConfirm: "Anladım",
    cancelable: false,
  },
  block: {
    Icon: FiSlash,
    confirmClass: "popup__btn--block",
    defaultConfirm: "Blokla",
    cancelable: true,
  },
};

function Popup({
  isOpen = false,
  type = "success",
  title = "",
  message = "",
  confirmText,
  cancelText = "Ləğv et",
  onConfirm,
  onCancel,
}) {
  const cfg = POPUP_CONFIG[type] ?? POPUP_CONFIG.success;
  const finalConfirmText = confirmText ?? cfg.defaultConfirm;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="popup__overlay"
        onClick={cfg.cancelable ? onCancel : undefined}
        aria-hidden="true"
      />
      <div
        className={`popup popup--${type}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        {cfg.cancelable && (
          <button
            className="popup__close"
            onClick={onCancel}
            aria-label="Bağla"
          >
            <FiX />
          </button>
        )}
        <div className="popup__icon-wrap">
          <cfg.Icon className="popup__icon" />
        </div>
        <div className="popup__content">
          {title && (
            <h3 id="popup-title" className="popup__title">
              {title}
            </h3>
          )}
          {message && <p className="popup__message">{message}</p>}
        </div>
        <div className="popup__actions">
          {cfg.cancelable && (
            <button
              className="popup__btn popup__btn--cancel"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          )}
          <button
            className={`popup__btn ${cfg.confirmClass}`}
            onClick={() => onConfirm?.()}
          >
            {finalConfirmText}
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────
// MOBILE FEATURE ROW
// ─────────────────────────────────────────
const MobileFeatureRow = ({ title, info, isAvailable, isMonthly, price }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isMonthly) {
    return (
      <div className="mobile-feat-group">
        <div
          className="feat-item monthly-fee"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="icon">
            <FiCheck className="icon-check" />
          </div>
          <div className="feat-text-wrapper">
            <span>
              Aylıq aktivlik: <strong>{price}</strong>
            </span>
            <FiInfo className={`mobile-info-icon ${isOpen ? "active" : ""}`} />
          </div>
        </div>
        <div className={`mobile-faq-box ${isOpen ? "open" : ""}`}>
          <div className="faq-inner">{info}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-feat-group">
      <div className="feat-item" onClick={() => setIsOpen(!isOpen)}>
        <div className="icon">
          {isAvailable ? (
            <FiCheck className="icon-check" />
          ) : (
            <FiX className="icon-cross" />
          )}
        </div>
        <div className="feat-text-wrapper">
          <span className={!isAvailable ? "disabled-text" : ""}>{title}</span>
          <FiInfo className={`mobile-info-icon ${isOpen ? "active" : ""}`} />
        </div>
      </div>
      <div className={`mobile-faq-box ${isOpen ? "open" : ""}`}>
        <div className="faq-inner">{info}</div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const packageMonthlyPrice = { premium: 4.0, business: 4.0 };
const packageCardPrice = {
  premium: "36.90₼ / hesab",
  business: "52.90₼ / hesab",
};
const packageNames = { premium: "Premium", business: "Biznes" };

const billingOptions = [
  { key: "monthly", label: "1 Aylıq", months: 1 },
  { key: "biannual", label: "6 Aylıq", months: 6 },
  { key: "annual", label: "12 Aylıq", months: 12 },
];

const MIN_PROFILES = 5;

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
function PackageMain() {
  const [currentPackage] = useState("business");
  const [selectedBilling, setSelectedBilling] = useState("monthly");
  const [profileCount, setProfileCount] = useState(MIN_PROFILES);
  const [isPayLoading, setIsPayLoading] = useState(false);

  // Popup state
  const [popup, setPopup] = useState({ isOpen: false, type: "success" });
  const closePopup = () => setPopup((p) => ({ ...p, isOpen: false }));

  const features = [
    {
      name: "Sosial şəbəkə",
      info: "Bütün sosial şəbəkə hesablarınızı tək bir səhifədə birləşdirin.",
      premium: true,
      business: true,
    },
    {
      name: "Əlaqə məlumatları",
      info: "Telefon, e-poçt və ünvan kimi əlaqə vasitələrini paylaşın.",
      premium: true,
      business: true,
    },
    {
      name: "Portfel, kataloq, menu",
      info: "İşlərinizi, məhsullarınızı və ya restoran menyusunu nümayiş etdirin.",
      premium: true,
      business: true,
    },
    {
      name: "NFC + QR sistem",
      info: "Məlumatlarınızı NFC toxunuşu və QR kod ilə anında paylaşın.",
      premium: true,
      business: true,
    },
    {
      name: "Fiziki kart",
      info: "İçində çip olan xüsusi fiziki vizit kartı ünvana çatdırılır.",
      premium: true,
      business: true,
    },
    {
      name: "Sistem analitikası",
      info: "Profilinizə baxış sayını və link klikləmələrini detallı izləyin.",
      premium: true,
      business: true,
    },
    {
      name: "Xüsusi dizayn",
      info: "Kartınızda şirkətinizin loqosu və fərdi dizaynı tətbiq olunur.",
      premium: true,
      business: true,
    },
    {
      name: "Qablaşma",
      info: "Fiziki kartınız xüsusi premium qutu və qablaşdırmada təqdim olunur.",
      premium: true,
      business: true,
    },
    {
      name: "Digital kart",
      info: "Apple Wallet və Google Wallet üçün rəqəmsal kart dəstəyi.",
      premium: true,
      business: true,
    },
    {
      name: "Biznesə uyğun qablaşdırma",
      info: "Şirkətinizin brendi ilə tam uyğunlaşdırılmış xüsusi qutu, kağız örtük və korporativ qablaşdırma dizaynı.",
      premium: false,
      business: true,
    },
    {
      name: "Korporativ idarəetmə paneli",
      info: "Bütün komanda üzvlərinin profilini tək bir paneldən idarə edin.",
      premium: false,
      business: true,
    },
  ];

  const monthlyRate = packageMonthlyPrice[currentPackage];
  const activeBilling = billingOptions.find((b) => b.key === selectedBilling);
  const totalPrice = +(
    monthlyRate *
    activeBilling.months *
    profileCount
  ).toFixed(2);

  // ── Ödəniş handler ──
  const handlePayment = () => {
    // Minimum profil yoxlaması (əlavə qoruma)
    if (profileCount < MIN_PROFILES) {
      setPopup({
        isOpen: true,
        type: "error",
        title: "Xəta!",
        message: `Minimum ${MIN_PROFILES} profil seçilməlidir.`,
        confirmText: "Anladım",
        onConfirm: null,
      });
      return;
    }

    // Ödəniş təsdiq popupu
    setPopup({
      isOpen: true,
      type: "block",
      title: "Ödənişi təsdiqləyin",
      message: `${profileCount} hesab · ${activeBilling.label} · Ümumi: ${totalPrice}₼. Davam etmək istəyirsiniz?`,
      confirmText: "Ödə",
      cancelText: "Ləğv et",
      onConfirm: () => {
        closePopup();
        processPayment();
      },
    });
  };

  // ── Ödəniş emalı (simulyasiya) ──
  const processPayment = () => {
    setIsPayLoading(true);

    // API çağırışını simulyasiya edirik
    setTimeout(() => {
      setIsPayLoading(false);

      const isSuccess = Math.random() > 0.25; // 75% uğur şansı (demo üçün)

      if (isSuccess) {
        setPopup({
          isOpen: true,
          type: "success",
          title: "Ödəniş uğurla tamamlandı!",
          message: `${profileCount} hesab üçün ${totalPrice}₼ məbləğ uğurla ödənildi. Abunəliyiniz aktivdir.`,
          confirmText: "Əla",
          onConfirm: closePopup,
        });
      } else {
        setPopup({
          isOpen: true,
          type: "error",
          title: "Ödəniş uğursuz oldu",
          message:
            "Bank tərəfindən əməliyyat rədd edildi. Kart məlumatlarınızı yoxlayın və yenidən cəhd edin.",
          confirmText: "Anladım",
          onConfirm: closePopup,
        });
      }
    }, 1800);
  };

  return (
    <div className="package-main-modern">
      {/* ── Popup ── */}
      <Popup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        confirmText={popup.confirmText}
        cancelText={popup.cancelText || "Ləğv et"}
        onConfirm={() => {
          popup.onConfirm?.();
          if (!popup.onConfirm) closePopup();
        }}
        onCancel={closePopup}
      />

      <div className="top-header">
        <div>
          <h2 className="page-title">Ödəniş Planı</h2>
          <p className="page-subtitle">
            Ehtiyaclarınıza uyğun ən ideal paketi seçin və idarə edin.
          </p>
        </div>
      </div>

      <div className="package-content">
        {/* ===== MASAÜSTÜ CƏDVƏL ===== */}
        <div className="desktop-only pricing-card">
          <div className="pricing-table">
            <div className="table-header-row">
              <div className="feature-cell empty-cell">Özəlliklər</div>

              {/* PREMIUM — yalnız müqayisə */}
              <div className="package-cell premium comparison-only">
                <div className="comparison-tag">Müqayisə</div>
                <h3>{packageNames.premium}</h3>
                <div className="price">{packageCardPrice.premium}</div>
                <p className="price-note">minimum 5 profil · cəmi 20₼/ay</p>
                <div className="locked-badge">
                  <FiX /> Seçilmir
                </div>
              </div>

              {/* BİZNES — aktiv paket */}
              <div className="package-cell business is-current">
                <div className="popular-tag">
                  <FiZap /> Biznes
                </div>
                <h3>{packageNames.business}</h3>
                <div className="price">{packageCardPrice.business}</div>
                <p className="price-note">minimum 5 profil · fərdi müqavilə</p>
                <div className="current-badge">
                  <FiCheckCircle /> Hazırkı Paket
                </div>
              </div>
            </div>

            <div className="table-body">
              {features.map((feat, index) => (
                <div className="table-row" key={index}>
                  <div className="feature-name has-tooltip">
                    <span>{feat.name}</span>
                    <div className="info-icon" tabIndex="0">
                      <FiInfo />
                      <div className="tooltip-box">{feat.info}</div>
                    </div>
                  </div>
                  <div className="feature-status premium">
                    {feat.premium ? (
                      <FiCheck className="icon-check" />
                    ) : (
                      <FiX className="icon-cross" />
                    )}
                  </div>
                  <div className="feature-status business active-col">
                    {feat.business ? (
                      <FiCheck className="icon-check" />
                    ) : (
                      <FiX className="icon-cross" />
                    )}
                  </div>
                </div>
              ))}

              <div className="table-row highlight-row">
                <div className="feature-name has-tooltip">
                  <span>Aylıq aktivlik ödənişi</span>
                  <div className="info-icon" tabIndex="0">
                    <FiInfo />
                    <div className="tooltip-box">
                      Sistemdə qeydiyyatda qalmaq üçün aylıq ödəniş.
                    </div>
                  </div>
                </div>
                <div className="feature-status premium">
                  <strong>2₼ / hesab</strong>
                </div>
                <div className="feature-status business active-col">
                  <strong>4₼ / hesab</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MOBİL KARTLAR ===== */}
        <div className="mobile-only mobile-cards-container">
          {/* PREMIUM — yalnız müqayisə */}
          <div className="mobile-package-card premium comparison-only">
            <div className="mobile-comparison-tag">Yalnız müqayisə üçün</div>
            <div className="card-top">
              <h3>{packageNames.premium}</h3>
              <div className="price">{packageCardPrice.premium}</div>
            </div>
            <p className="mobile-price-note">
              Minimum 5 profil — cəmi <strong>20₼/ay</strong>
            </p>
            <div className="card-features">
              {features.map((feat, i) => (
                <MobileFeatureRow
                  key={i}
                  title={feat.name}
                  info={feat.info}
                  isAvailable={feat.premium}
                />
              ))}
              <MobileFeatureRow
                isMonthly={true}
                price="4₼/hesab"
                info="Xidmətdən fasiləsiz istifadə üçün aylıq abunəlik."
              />
            </div>
            <div className="card-bottom">
              <div className="locked-badge">
                <FiX /> Bu paket seçilmir
              </div>
            </div>
          </div>

          {/* BİZNES — aktiv paket */}
          <div className="mobile-package-card business is-current">
            <div className="mobile-popular-tag">
              <FiZap /> Biznes
            </div>
            <div className="card-top">
              <h3>{packageNames.business}</h3>
              <div className="price">{packageCardPrice.business}</div>
            </div>
            <p className="mobile-price-note">
              Minimum 5 profil — <strong>fərdi müqavilə</strong>
            </p>
            <div className="card-features">
              {features.map((feat, i) => (
                <MobileFeatureRow
                  key={i}
                  title={feat.name}
                  info={feat.info}
                  isAvailable={feat.business}
                />
              ))}
              <MobileFeatureRow
                isMonthly={true}
                price="4₼/hesab"
                info="Xidmətdən fasiləsiz istifadə üçün aylıq abunəlik."
              />
            </div>
            <div className="card-bottom">
              <div className="current-badge">
                <FiCheckCircle /> Hazırkı Paket
              </div>
            </div>
          </div>
        </div>

        {/* ===== AYLIQ AKTİVLİK BÖLMƏSİ ===== */}
        <div className="billing-section">
          <div className="billing-header">
            <div>
              <h3 className="billing-title">Aylıq Aktivlik Ödənişi</h3>
              <p className="billing-subtitle">
                <strong>Biznes</strong> paketi —{" "}
                <strong className="rate-highlight">4₼ / hesab / ay</strong>
              </p>
            </div>
            <div className="billing-rate-badge">
              <FiCalendar />
              <span>4₼ / hesab / ay</span>
            </div>
          </div>

          {/* Profil sayı stepper */}
          <div className="profile-count-section">
            <div className="profile-count-header">
              <FiUsers />
              <span>
                Profil sayı{" "}
                <span className="min-note">(minimum {MIN_PROFILES})</span>
              </span>
            </div>
            <div className="profile-stepper">
              <button
                className="stepper-btn"
                onClick={() =>
                  setProfileCount(Math.max(MIN_PROFILES, profileCount - 1))
                }
                disabled={profileCount <= MIN_PROFILES}
              >
                −
              </button>
              <span className="stepper-value">{profileCount}</span>
              <button
                className="stepper-btn"
                onClick={() => setProfileCount(profileCount + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Müddət tabları */}
          <div className="billing-tabs">
            {billingOptions.map((opt) => {
              const price = +(monthlyRate * opt.months * profileCount).toFixed(
                2,
              );
              return (
                <button
                  key={opt.key}
                  className={`billing-tab ${selectedBilling === opt.key ? "active" : ""}`}
                  onClick={() => setSelectedBilling(opt.key)}
                >
                  <span className="tab-label">{opt.label}</span>
                  <span className="tab-price">{price}₼</span>
                </button>
              );
            })}
          </div>

          {/* Yekun məbləğ */}
          <div className="billing-summary">
            <div className="summary-item">
              <span className="summary-label">Paket</span>
              <span className="summary-value">Biznes</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span className="summary-label">Profil sayı</span>
              <span className="summary-value">{profileCount} hesab</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span className="summary-label">Müddət</span>
              <span className="summary-value">{activeBilling.label}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span className="summary-label">Hər hesab / ay</span>
              <span className="summary-value">4₼</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item total-item">
              <span className="summary-label">Ümumi məbləğ</span>
              <span className="summary-total">{totalPrice}₼</span>
            </div>

            <button
              className={`pay-btn ${isPayLoading ? "loading" : ""}`}
              onClick={handlePayment}
              disabled={isPayLoading}
            >
              {isPayLoading ? (
                <>
                  <span className="pay-spinner" /> Emal olunur...
                </>
              ) : (
                <>
                  <FiCheckCircle /> Ödənişi Tamamla
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageMain;
