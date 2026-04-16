import React, { useState, useRef } from "react";
import { FiCheck, FiChevronRight, FiChevronLeft, FiRefreshCw } from "react-icons/fi";
import "./PackageMain.scss";

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const SAHIBKAR_PKG = {
  key: "sahibkar",
  name: "Sahibkar",
  color: "#d4af37",
  monthlyRate: 2.0,
  cardPrice: "27.90₼",
  features: [
    "Fərdi + Brend profili",
    "Sosial & əlaqə linkləri",
    "Analitika paneli",
    "QR / NFC dəstəyi",
    "Fiziki kart",
    "Xüsusi dizayn",
  ],
};

const KORPORATIV_PKG = {
  key: "korporativ",
  name: "Korporativ",
  color: "#8b5cf6",
  monthlyRate: 4.0,
  cardPrice: "52.90₼",
  features: [
    "Fərdi + Brend profili",
    "Sosial & əlaqə linkləri",
    "Analitika paneli",
    "QR / NFC dəstəyi",
    "Fiziki kart",
    "Xüsusi dizayn",
    "Hesablar idarəetməsi",
    "Kategoriyalar",
    "İşçi sayı analitikası",
  ],
};

const BILLING_OPTIONS = [
  { key: "monthly", label: "1 Aylıq", months: 1, discountRate: 0 },
  { key: "biannual", label: "6 Aylıq", months: 6, discountRate: 0.0855 },
  { key: "annual", label: "12 Aylıq", months: 12, discountRate: 0.0855 },
];

const MIN_PROFILES = 5;

function calcTotal(monthlyRate, months, discountRate, count = 1) {
  const raw = monthlyRate * months * count;
  return +(raw * (1 - discountRate)).toFixed(2);
}
function calcRaw(monthlyRate, months, count = 1) {
  return +(monthlyRate * months * count).toFixed(2);
}

// ─────────────────────────────────────────
// QR PLACEHOLDER
// ─────────────────────────────────────────
function QrPlaceholder({ color = "currentColor" }) {
  const cell = 8, gap = 2;
  const S = 7 * (cell + gap) - gap;
  const map = [
    [1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],
    [1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1],
  ];
  const inner = [[2,2],[2,4],[3,3],[4,2],[4,4],[5,3],[3,5],[5,5],[2,6],[6,2],[6,4]];
  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
      {map.map((row, r) => row.map((on, c) => on ? (
        <rect key={`f-${r}-${c}`} x={c*(cell+gap)} y={r*(cell+gap)} width={cell} height={cell} rx={1} fill={color} />
      ) : null))}
      {inner.map(([r, c], i) => (
        <rect key={`d-${i}`} x={c*(cell+gap)} y={r*(cell+gap)} width={cell} height={cell} rx={1} fill={color} opacity={0.7} />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────
// CARD PREVIEW
// ─────────────────────────────────────────
function CardPreview({ theme, logo, name, title, slogan, brandMode, brandName, flipped, onFlip, showInfo = true }) {
  const isDark = theme !== "light";
  const gold = isDark ? "#c9a84c" : "#b8942a";
  const bg = isDark ? "#0b0b0b" : "#f5f2ec";
  const text2 = isDark ? "rgba(255,255,255,0.45)" : "rgba(17,17,17,0.5)";
  const wmClr = isDark ? "rgba(201,168,76,0.07)" : "rgba(184,148,42,0.09)";
  const isFerdi = brandMode === "ferdi";
  const frontSlogan = isFerdi ? (slogan?.trim() || "Öz şüarınız") : "İlk təəssürat önəmlidir";
  const displayBrand = isFerdi && brandName?.trim() ? brandName.trim() : "Insyde";

  return (
    <div className={`pkg-scene ${flipped ? "is-flipped" : ""}`} onClick={onFlip}>
      <div className="pkg-card" style={{ "--card-bg": bg, "--card-gold": gold, "--card-text2": text2, "--card-wm": wmClr }}>
        <div className="pkg-face pkg-front">
          <div className="pkg-front-topbar">
            <span className="pkg-tagline">{frontSlogan}</span>
            {!isFerdi && <span className="pkg-site">İnsyde.info</span>}
          </div>
          <div className={`pkg-brand-word${isFerdi && brandName?.trim() ? " pkg-brand-custom" : ""}`}>{displayBrand}</div>
        </div>
        <div className="pkg-face pkg-back">
          <div className="pkg-wm" aria-hidden>Insyde</div>
          <div className="pkg-back-logo">
            {logo ? <img src={logo} alt="logo" className="pkg-logo-img" /> : <span className="pkg-logo-placeholder">LOGO</span>}
          </div>
          <div className="pkg-qr-wrap"><QrPlaceholder color={gold} /></div>
          {showInfo && (
            <div className="pkg-back-info">
              <span className="pkg-back-name">{name || ""}</span>
              <span className="pkg-back-title">{title || ""}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// STEP INDICATOR
// ─────────────────────────────────────────
function StepIndicator({ current, labels }) {
  return (
    <div className="step-indicator">
      {labels.map((label, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;
        return (
          <React.Fragment key={num}>
            <div className={`step-item ${active ? "active" : ""} ${done ? "done" : ""}`}>
              <div className="step-circle">{done ? <FiCheck /> : num}</div>
              <span className="step-label">{label}</span>
            </div>
            {i < labels.length - 1 && <div className={`step-line ${done ? "done" : ""}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────
export default function PackageMain() {
  const fileRef = useRef(null);
  const planType = (localStorage.getItem("planType") || "sahibkar").toLowerCase();
  const isKorporativ = planType === "korporativ";
  const pkgData = isKorporativ ? KORPORATIV_PKG : SAHIBKAR_PKG;

  // Sahibkar: steps 1(Müddət) → 2(Kart) → 3(Ödəniş)
  // Korporativ: steps 1(Müddət) → 2(Ödəniş)
  const stepLabels = isKorporativ ? ["Müddət", "Ödəniş"] : ["Müddət", "Kart", "Ödəniş"];

  const [step, setStep] = useState(1);
  const [selectedBilling, setSelectedBilling] = useState("monthly");
  const [profileCount, setProfileCount] = useState(MIN_PROFILES);

  // Card design states (Sahibkar only)
  const [cardTheme, setCardTheme] = useState("dark");
  const [cardLogo, setCardLogo] = useState(null);
  const [cardLogoFile, setCardLogoFile] = useState(null);
  const [cardSlogan, setCardSlogan] = useState("");
  const [cardBrandMode, setCardBrandMode] = useState("qelib");
  const [cardBrandName, setCardBrandName] = useState("");
  const [cardStyle, setCardStyle] = useState("sade"); // "sade" | "detayli"
  const [cardName, setCardName] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const [flipped, setFlipped] = useState(false);

  // Payment
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const billData = BILLING_OPTIONS.find((b) => b.key === selectedBilling);
  const count = isKorporativ ? profileCount : 1;
  const rawPrice = calcRaw(pkgData.monthlyRate, billData.months, count);
  const totalPrice = calcTotal(pkgData.monthlyRate, billData.months, billData.discountRate, count);
  const savedAmount = +(rawPrice - totalPrice).toFixed(2);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCardLogoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setCardLogo(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setError("");
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setSuccess(false);
    setStep(1);
    setSelectedBilling("monthly");
    setProfileCount(MIN_PROFILES);
    setCardTheme("dark");
    setCardStyle("sade");
    setCardName("");
    setCardTitle("");
    setCardSlogan("");
    setCardBrandMode("qelib");
    setCardBrandName("");
    setCardLogo(null);
    setCardLogoFile(null);
    setFlipped(false);
    setError("");
  };

  if (success) {
    return (
      <div className="pkg-success-screen">
        <div className="pkg-success-icon">✓</div>
        <h2>Sifariş tamamlandı!</h2>
        <p><strong>{pkgData.name}</strong> paketi üzrə sifarişiniz qəbul edildi.</p>
        <button className="pkg-nav-btn primary" onClick={handleReset}>Paketlərə qayıt</button>
      </div>
    );
  }

  return (
    <div className="package-main-modern">
      <div className="pkg-top-header">
        <div>
          <h2 className="pkg-page-title">Ödəniş Planı</h2>
          <p className="pkg-page-subtitle">Ehtiyaclarınıza uyğun paketi seçin</p>
        </div>
      </div>

      <StepIndicator current={step} labels={stepLabels} />

      {/* ═══════════════════════════════════
          STEP 1 — MÜDDƏT (+ Profil sayı korporativ üçün)
      ═══════════════════════════════════ */}
      {step === 1 && (
        <div className="pkg-step-content">
          <h3 className="pkg-step-title">Ödəniş müddətini seçin</h3>
          <p className="pkg-step-sub">
            Mövcud paketiniz: <strong style={{ color: pkgData.color }}>{pkgData.name}</strong>
            {" · "}{pkgData.monthlyRate.toFixed(2)}₼/ay{isKorporativ ? " / hesab" : ""} — daha uzun müddət seçdikdə qiymət aşağı düşür
          </p>

          <div className="billing-options">
            {BILLING_OPTIONS.map((opt) => {
              const raw = calcRaw(pkgData.monthlyRate, opt.months, count);
              const discounted = calcTotal(pkgData.monthlyRate, opt.months, opt.discountRate, count);
              const saved = +(raw - discounted).toFixed(2);
              const isSelected = selectedBilling === opt.key;
              return (
                <div
                  key={opt.key}
                  className={`billing-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedBilling(opt.key)}
                >
                  <div className="billing-card-top">
                    <span className="billing-label">{opt.label}</span>
                    {opt.discountRate > 0 && (
                      <span className="billing-discount-badge">-{Math.round(opt.discountRate * 100)}%</span>
                    )}
                    {isSelected && <FiCheck className="billing-check" />}
                  </div>
                  <div className="billing-price-row">
                    <div className="billing-total">{discounted}₼</div>
                    {saved > 0 && <div className="billing-original">{raw}₼</div>}
                  </div>
                  <div className="billing-rate">
                    {pkgData.monthlyRate.toFixed(2)}₼ × {opt.months} ay{isKorporativ ? ` × ${count} hesab` : ""}
                    {saved > 0 && <span className="billing-save-note"> ({saved.toFixed(2)}₼ qənaət)</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {isKorporativ && (
            <div className="profile-count-wrap">
              <p className="profile-count-label">Profil sayı <span className="min-note">(minimum {MIN_PROFILES})</span></p>
              <div className="profile-stepper">
                <button
                  className="stepper-btn"
                  onClick={() => setProfileCount(Math.max(MIN_PROFILES, profileCount - 1))}
                  disabled={profileCount <= MIN_PROFILES}
                >−</button>
                <span className="stepper-value">{profileCount}</span>
                <button className="stepper-btn" onClick={() => setProfileCount(profileCount + 1)}>+</button>
              </div>
            </div>
          )}

          <div className="pkg-nav-row">
            <span />
            <button className="pkg-nav-btn primary" onClick={() => { setFlipped(false); setStep(2); }}>
              Təsdiq et <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════
          STEP 2 — KART (yalnız Sahibkar)
      ═══════════════════════════════════ */}
      {!isKorporativ && step === 2 && (
        <div className="pkg-step-content">
          <div className="pkg-step-heading">
            <h3 className="pkg-step-title">Kart dizaynı</h3>
          </div>
          <p className="pkg-step-sub">Kart görünüşünü qısa və rahat formada tənzimlə</p>

          <div className="card-design-workspace">
            <div className="card-preview-panel">
              <button className="card-flip-icon-btn" onClick={() => setFlipped((f) => !f)} aria-label="Kartı fırla" type="button">
                <FiRefreshCw />
              </button>
              <p className="card-preview-label">Ön / arxa</p>
              <CardPreview
                theme={cardTheme} logo={cardLogo} name={cardName} title={cardTitle} showInfo={cardStyle === "detayli"}
                slogan={cardSlogan} brandMode={cardBrandMode} brandName={cardBrandName}
                flipped={flipped} onFlip={() => setFlipped((f) => !f)}
              />
              <p className="card-preview-hint">İkona və ya karta klik edin</p>
            </div>

            <div className="card-controls-panel">
              <div className="card-controls-grid">
                {/* Sıra 1: Tema + Üslub */}
                <div className="card-ctrl-field">
                  <label>Tema</label>
                  <div className="card-theme-toggle">
                    {["dark", "light"].map((t) => (
                      <button key={t} type="button" className={cardTheme === t ? "active" : ""} onClick={() => setCardTheme(t)}>
                        <span className={`dot ${t}-dot`} />{t === "dark" ? "Tünd" : "Açıq"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card-ctrl-field">
                  <label>Üslub</label>
                  <div className="card-brand-toggle">
                    <button type="button" className={cardStyle === "sade" ? "active" : ""} onClick={() => setCardStyle("sade")}>Sadə</button>
                    <button type="button" className={cardStyle === "detayli" ? "active" : ""} onClick={() => setCardStyle("detayli")}>Detallı</button>
                  </div>
                </div>

                {/* Sıra 2: Rejim — tam en */}
                <div className="card-ctrl-field full-width">
                  <label>Rejim</label>
                  <div className="card-brand-toggle">
                    <button type="button" className={cardBrandMode === "qelib" ? "active" : ""} onClick={() => setCardBrandMode("qelib")}>Qəlib</button>
                    <button type="button" className={cardBrandMode === "ferdi" ? "active" : ""} onClick={() => setCardBrandMode("ferdi")}>Fərdi</button>
                  </div>
                </div>

                {/* Fərdi rejim inputları — yan yana */}
                {cardBrandMode === "ferdi" && (
                  <>
                    <div className="card-ctrl-field">
                      <label>Şüar</label>
                      <input className="card-ctrl-input" value={cardSlogan} onChange={(e) => setCardSlogan(e.target.value)} placeholder="Şüar" maxLength={40} />
                    </div>
                    <div className="card-ctrl-field">
                      <label>Yazı</label>
                      <input className="card-ctrl-input" value={cardBrandName} onChange={(e) => setCardBrandName(e.target.value)} placeholder="Kart yazısı" maxLength={20} />
                    </div>
                  </>
                )}

                {/* Logo — tam en */}
                <div className="card-ctrl-field full-width">
                  <label>Logo</label>
                  <div className="card-upload-area" onClick={() => fileRef.current?.click()}>
                    {cardLogo ? (
                      <img src={cardLogo} alt="logo" className="card-upload-preview" />
                    ) : (
                      <div className="card-upload-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24">
                          <path d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5" strokeLinecap="round" />
                          <path d="M12 3v13M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Logo yüklə</span>
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogoUpload} />
                  {cardLogo && (
                    <button type="button" className="card-remove-btn" onClick={() => { setCardLogo(null); setCardLogoFile(null); }}>Sil</button>
                  )}
                </div>

                {/* Detallı üslub inputları — yan yana */}
                {cardStyle === "detayli" && (
                  <>
                    <div className="card-ctrl-field">
                      <label>Ad soyad</label>
                      <input className="card-ctrl-input" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Ad soyad" />
                    </div>
                    <div className="card-ctrl-field">
                      <label>Vəzifə</label>
                      <input className="card-ctrl-input" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="Vəzifə" />
                    </div>
                  </>
                )}
              </div>

              <button type="button" className="card-flip-btn" onClick={() => setFlipped((f) => !f)}>
                {flipped ? "Ön üzü göstər" : "Arxa üzü göstər"}
              </button>
            </div>
          </div>

          <div className="pkg-nav-row">
            <button className="pkg-nav-btn ghost" onClick={() => setStep(1)}><FiChevronLeft /> Geri</button>
            <button className="pkg-nav-btn primary" onClick={() => setStep(3)}>Təsdiq et <FiChevronRight /></button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════
          STEP 3 (Sahibkar) / STEP 2 (Korporativ) — ÖDƏNİŞ
      ═══════════════════════════════════ */}
      {((isKorporativ && step === 2) || (!isKorporativ && step === 3)) && (
        <div className="pkg-step-content">
          <h3 className="pkg-step-title">Sifarişi təsdiqləyin</h3>

          <div className="checkout-layout">
            <div className="checkout-summary">
              <div className="checkout-card">
                <p className="checkout-section-label">Paket məlumatları</p>

                <div className="checkout-row">
                  <span>Paket</span>
                  <strong style={{ color: pkgData.color }}>{pkgData.name}</strong>
                </div>

                <div className="checkout-row">
                  <span>Aylıq qiymət</span>
                  <strong>{pkgData.monthlyRate.toFixed(2)}₼{isKorporativ ? " / hesab" : ""}</strong>
                </div>

                {isKorporativ && (
                  <div className="checkout-row">
                    <span>Profil sayı</span>
                    <strong>{profileCount} hesab</strong>
                  </div>
                )}

                <div className="checkout-row">
                  <span>Ödəniş müddəti</span>
                  <strong>{billData?.label}</strong>
                </div>

                {savedAmount > 0 && (
                  <div className="checkout-row">
                    <span>Endirim ({Math.round((billData?.discountRate ?? 0) * 100)}%)</span>
                    <strong className="checkout-save">-{savedAmount.toFixed(2)}₼</strong>
                  </div>
                )}

                <div className="checkout-divider" />

                <div className="checkout-row total-row">
                  <span>Ümumi məbləğ</span>
                  <div className="total-price-stack">
                    {savedAmount > 0 && <span className="total-original">{rawPrice.toFixed(2)}₼</span>}
                    <strong className="total-amount">{totalPrice.toFixed(2)}₼</strong>
                  </div>
                </div>
              </div>

              {!isKorporativ && (
                <div className="checkout-card">
                  <p className="checkout-section-label">Kart məlumatları</p>
                  <div className="checkout-row"><span>Tema</span><strong>{cardTheme === "dark" ? "Tünd" : "Açıq"}</strong></div>
                  <div className="checkout-row"><span>Üslub</span><strong>{cardStyle === "sade" ? "Sadə" : "Detallı"}</strong></div>
                  <div className="checkout-row"><span>Dizayn rejimi</span><strong>{cardBrandMode === "ferdi" ? "Fərdi" : "Qəlib"}</strong></div>
                  {cardBrandMode === "ferdi" && (
                    <>
                      <div className="checkout-row"><span>Şüar</span><strong>{cardSlogan || "—"}</strong></div>
                      <div className="checkout-row"><span>Kart yazısı</span><strong>{cardBrandName || "—"}</strong></div>
                    </>
                  )}
                  {cardStyle === "detayli" && (
                    <>
                      <div className="checkout-row"><span>Ad soyad</span><strong>{cardName || "—"}</strong></div>
                      <div className="checkout-row"><span>Vəzifə</span><strong>{cardTitle || "—"}</strong></div>
                    </>
                  )}
                  <div className="checkout-row">
                    <span>Logo</span>
                    {cardLogo ? (
                      <div className="checkout-logo-wrap">
                        <img src={cardLogo} alt="logo" className="checkout-logo-thumb" />
                        <strong>Yüklənib</strong>
                      </div>
                    ) : <strong>Yoxdur</strong>}
                  </div>
                </div>
              )}

              {error && <div className="checkout-error">{error}</div>}

              <button className="pkg-nav-btn primary full-width" onClick={handleSubmit} disabled={submitting}>
                {submitting ? <span className="pkg-spinner-sm" /> : null}
                {submitting ? "Emal olunur..." : `${totalPrice.toFixed(2)}₼ Ödənişə keç`}
              </button>
            </div>

            {!isKorporativ && (
              <div className="checkout-preview">
                <p className="checkout-section-label">Kartınızın görünüşü</p>
                <button className="checkout-flip-btn" onClick={() => setFlipped((f) => !f)} type="button" aria-label="Kartı fırla">
                  <FiRefreshCw />
                </button>
                <CardPreview
                  theme={cardTheme} logo={cardLogo} name={cardName} title={cardTitle} showInfo={cardStyle === "detayli"}
                  slogan={cardSlogan} brandMode={cardBrandMode} brandName={cardBrandName}
                  flipped={flipped} onFlip={() => setFlipped((f) => !f)}
                />
                <p className="card-preview-hint">Kartın üzərinə klik edib çevirin</p>
              </div>
            )}
          </div>

          <div className="pkg-nav-row">
            <button className="pkg-nav-btn ghost" onClick={() => setStep(isKorporativ ? 1 : 2)}><FiChevronLeft /> Geri</button>
          </div>
        </div>
      )}
    </div>
  );
}
