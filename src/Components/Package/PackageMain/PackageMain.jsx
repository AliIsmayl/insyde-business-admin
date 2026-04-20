import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCheck, FiChevronRight, FiChevronLeft, FiRefreshCw,
  FiSearch, FiPlus, FiUsers, FiMoon, FiSun, FiSliders, FiArrowRight,
} from "react-icons/fi";
import "./PackageMain.scss";

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const SAHIBKAR_PKG = {
  key: "sahibkar", name: "Sahibkar", color: "#d4af37", monthlyRate: 2.0, cardPrice: "27.90€",
  features: ["Fərdi + Brend profili", "Sosial & əlaqə linkləri", "Analitika paneli", "QR / NFC dəstəyi", "Fiziki kart", "Xüsusi dizayn"],
};

const KORPORATIV_PKG = {
  key: "korporativ", name: "Korporativ", color: "#b8942a",
  features: ["Fərdi + Brend profili", "Sosial & əlaqə linkləri", "Analitika paneli", "QR / NFC dəstəyi", "Fiziki kart", "Xüsusi dizayn", "Hesablar idarəetməsi", "Linklər", "İşçi sayı analitikası"],
};

const BILLING_OPTIONS = [
  { key: "monthly",  label: "1 Aylıq",  months: 1,  discountRate: 0 },
  { key: "biannual", label: "6 Aylıq",  months: 6,  discountRate: 0.0855 },
  { key: "annual",   label: "12 Aylıq", months: 12, discountRate: 0.0855 },
];

// Korporativ pricing (insyde PackageSection-dan)
const CORP_PRICING = {
  maxUsers: 200, minUsers: 2,
  firstCardPrice: 52.9, extraCardPrice: 32.9,
  cardDiscountPerStep: 1, maxCardDiscount: 40,
  firstMonthlyPrice: 6.9, extraMonthlyPrice: 5.9,
  monthlyDiscountPerStep: 0.5, maxMonthlyDiscount: 40,
};

function clampUsers(v) {
  if (!Number.isFinite(v)) return CORP_PRICING.minUsers;
  return Math.min(CORP_PRICING.maxUsers, Math.max(CORP_PRICING.minUsers, v));
}

function calcCorp(userCount) {
  const n = clampUsers(userCount);
  const cardRaw   = n === 1 ? CORP_PRICING.firstCardPrice    : CORP_PRICING.firstCardPrice    + (n - 1) * CORP_PRICING.extraCardPrice;
  const monthRaw  = n === 1 ? CORP_PRICING.firstMonthlyPrice : CORP_PRICING.firstMonthlyPrice + (n - 1) * CORP_PRICING.extraMonthlyPrice;
  const steps     = Math.max(0, Math.floor((n - 2) / 2));
  const cardDR    = Math.min(steps * CORP_PRICING.cardDiscountPerStep,    CORP_PRICING.maxCardDiscount);
  const monthDR   = Math.min(steps * CORP_PRICING.monthlyDiscountPerStep, CORP_PRICING.maxMonthlyDiscount);
  const cardDisc  = +((n > 1 ? (n - 1) * CORP_PRICING.extraCardPrice    * cardDR  / 100 : 0)).toFixed(2);
  const monthDisc = +((n > 1 ? (n - 1) * CORP_PRICING.extraMonthlyPrice * monthDR / 100 : 0)).toFixed(2);
  return {
    n,
    cardTotal:    +(cardRaw  - cardDisc).toFixed(2),
    monthlyTotal: +(monthRaw - monthDisc).toFixed(2),
    cardDR, monthDR,
  };
}

// Sahibkar helpers
function calcTotal(monthlyRate, months, discountRate) {
  return +(monthlyRate * months * (1 - discountRate)).toFixed(2);
}
function calcRaw(monthlyRate, months) {
  return +(monthlyRate * months).toFixed(2);
}

function formatWholePrice(price) {
  const numeric = typeof price === "number"
    ? price
    : Number.parseFloat(String(price).replace(",", ".").replace(/[^\d.]/g, ""));
  if (!Number.isFinite(numeric)) return price;
  return `${Math.floor(numeric)}₼`;
}

// Code generator
function genCode() {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 7 }, () => c[Math.floor(Math.random() * c.length)]).join("");
}

const INIT_CORP_USERS = [
  { id: 1, code: "SYD4568", name: "Elçin Məmmədov",  profession: "Frontend Developer", cardTone: "dark",  ordered: true },
  { id: 2, code: "KRT2341", name: "Aynur Həsənova",  profession: "UI Designer",        cardTone: "dark",  ordered: true },
  { id: 3, code: "BXL9901", name: "Tural Əliyev",    profession: "Backend Developer",  cardTone: "dark",  ordered: true },
  { id: 4, code: "ZFQ1122", name: "Leyla Quliyeva",  profession: "Product Manager",    cardTone: "dark",  ordered: true },
  { id: 5, code: "MNP5543", name: "Rauf İsmayılov",  profession: "Mobile Developer",   cardTone: "light", ordered: true },
];

// ─────────────────────────────────────────
// QR PLACEHOLDER
// ─────────────────────────────────────────
function QrPlaceholder({ color = "currentColor" }) {
  const cell = 8, gap = 2, S = 7 * (cell + gap) - gap;
  const map = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
  const inner = [[2,2],[2,4],[3,3],[4,2],[4,4],[5,3],[3,5],[5,5],[2,6],[6,2],[6,4]];
  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
      {map.map((row, r) => row.map((on, c) => on ? <rect key={`f-${r}-${c}`} x={c*(cell+gap)} y={r*(cell+gap)} width={cell} height={cell} rx={1} fill={color} /> : null))}
      {inner.map(([r, c], i) => <rect key={`d-${i}`} x={c*(cell+gap)} y={r*(cell+gap)} width={cell} height={cell} rx={1} fill={color} opacity={0.7} />)}
    </svg>
  );
}

// ─────────────────────────────────────────
// CARD PREVIEW
// ─────────────────────────────────────────
function CardPreview({ theme = "dark", logo, name, title, slogan, brandMode, brandName, flipped, onFlip, showInfo = false }) {
  const isDark   = theme !== "light";
  const gold     = isDark ? "#c9a84c" : "#b8942a";
  const bg       = isDark ? "#0b0b0b" : "#f5f2ec";
  const text2    = isDark ? "rgba(255,255,255,0.45)" : "rgba(17,17,17,0.5)";
  const wmClr    = isDark ? "rgba(201,168,76,0.07)" : "rgba(184,148,42,0.09)";
  const isFerdi  = brandMode === "ferdi";
  const tagline  = isFerdi ? (slogan?.trim() || "Öz şüarınız") : "İlk təəssürat önəmlidir";
  const brand    = isFerdi && brandName?.trim() ? brandName.trim() : "Insyde";
  return (
    <div className={`pkg-scene ${flipped ? "is-flipped" : ""}`} onClick={onFlip}>
      <div className="pkg-card" style={{ "--card-bg": bg, "--card-gold": gold, "--card-text2": text2, "--card-wm": wmClr }}>
        <div className="pkg-face pkg-front">
          <div className="pkg-front-topbar">
            <span className="pkg-tagline">{tagline}</span>
            {!isFerdi && <span className="pkg-site">İnsyde.info</span>}
          </div>
          <div className={`pkg-brand-word${isFerdi && brandName?.trim() ? " pkg-brand-custom" : ""}`}>{brand}</div>
        </div>
        <div className="pkg-face pkg-back">
          <div className="pkg-wm" aria-hidden>Insyde</div>
          <div className="pkg-back-logo">
            {logo ? <img src={logo} alt="logo" className="pkg-logo-img" /> : <span className="pkg-logo-placeholder">LOGO</span>}
          </div>
          <div className="pkg-qr-wrap"><QrPlaceholder color={gold} /></div>
          {showInfo && (
            <div className="pkg-back-info">
              <span className="pkg-back-name">{name || "Ad Soyad"}</span>
              <span className="pkg-back-title">{title || "Vəzifə"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Tiny card thumbnail for tone preview
function MiniCard({ theme }) {
  const isDark = theme !== "light";
  return (
    <div className={`mini-card-thumb mini-card-thumb--${theme}`}>
      <div className="mini-card-line" />
      <div className="mini-card-brand">{isDark ? "■" : "□"}</div>
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
        const num = i + 1, done = num < current, active = num === current;
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
// TONE BADGE
// ─────────────────────────────────────────
function ToneBadge({ tone }) {
  return (
    <span className={`tone-badge tone-badge--${tone}`}>
      {tone === "dark" ? <FiMoon size={11} /> : <FiSun size={11} />}
      {tone === "dark" ? "Tünd" : "Açıq"}
    </span>
  );
}

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────
export default function PackageMain() {
  const fileRef     = useRef(null);
  const corpFileRef = useRef(null);
  const navigate    = useNavigate();

  const planType     = (localStorage.getItem("planType") || "sahibkar").toLowerCase();
  const isKorporativ = planType === "korporativ";
  const pkgData      = isKorporativ ? KORPORATIV_PKG : SAHIBKAR_PKG;

  const [started, setStarted] = useState(false);

  // Korporativ: 1(İstifadəçilər) → 2(Müddət) → 3(Kart) → 4(Ödəniş)
  // Sahibkar:   1(Müddət) → 2(Kart) → 3(Ödəniş)
  const stepLabels = isKorporativ
    ? ["İstifadəçilər", "Müddət", "Kart", "Ödəniş"]
    : ["Müddət", "Kart", "Ödəniş"];

  const [step, setStep] = useState(1);

  // ── Sahibkar billing ──
  const [selectedBilling, setSelectedBilling] = useState("monthly");

  // ── Sahibkar card ──
  const [cardTheme, setCardTheme]         = useState("dark");
  const [cardLogo, setCardLogo]           = useState(null);
  const [cardLogoFile, setCardLogoFile]   = useState(null);
  const [cardSlogan, setCardSlogan]       = useState("");
  const [cardBrandMode, setCardBrandMode] = useState("qelib");
  const [cardBrandName, setCardBrandName] = useState("");
  const [cardStyle, setCardStyle]         = useState("sade");
  const [cardName, setCardName]           = useState("");
  const [cardTitle, setCardTitle]         = useState("");
  const [flipped, setFlipped]             = useState(false);

  // ── Korporativ card ──
  const [corpBrandMode, setCorpBrandMode]   = useState("qelib");
  const [corpSlogan, setCorpSlogan]         = useState("");
  const [corpBrandName, setCorpBrandName]   = useState("");
  const [corpLogo, setCorpLogo]             = useState(null);
  const [corpLogoFile, setCorpLogoFile]     = useState(null);
  const [corpFlipped, setCorpFlipped]       = useState(false);
  const [corpBackStyle, setCorpBackStyle]   = useState("sade"); // "sade" | "adsoyad"

  // ── Korporativ users ──
  const [corpUsers, setCorpUsers]           = useState(INIT_CORP_USERS);
  const [corpGlobalTone, setCorpGlobalTone] = useState("ferdi");
  const [corpSearch, setCorpSearch]         = useState("");
  const [showAddUser, setShowAddUser]       = useState(false);
  const [newUserName, setNewUserName]       = useState("");
  const [newUserSurname, setNewUserSurname] = useState("");
  const [newUserProfession, setNewUserProfession] = useState("");
  const [newUserCode, setNewUserCode]       = useState(genCode());

  // ── Korporativ billing ──
  const [corpBillingKey, setCorpBillingKey] = useState("monthly");

  // ── Payment ──
  const [submitting, setSubmitting]       = useState(false);
  const [error, setError]                 = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [pendingNav, setPendingNav]        = useState(null);

  // Derived
  const billData         = BILLING_OPTIONS.find((b) => b.key === selectedBilling);
  const orderedUsers     = corpUsers.filter((u) => u.ordered);
  const filteredUsers    = corpUsers.filter((u) =>
    u.name.toLowerCase().includes(corpSearch.toLowerCase()) ||
    u.profession.toLowerCase().includes(corpSearch.toLowerCase()) ||
    u.code.toLowerCase().includes(corpSearch.toLowerCase())
  );

  // Korporativ pricing
  const corpBill   = BILLING_OPTIONS.find((b) => b.key === corpBillingKey);
  const corpCalc   = calcCorp(orderedUsers.length);
  const corpMonthlyTotal = +(corpCalc.monthlyTotal * (corpBill?.months ?? 1) * (1 - (corpBill?.discountRate ?? 0))).toFixed(2);
  const corpMonthlyRaw   = +(corpCalc.monthlyTotal * (corpBill?.months ?? 1)).toFixed(2);
  const corpMonthlySaved = +(corpMonthlyRaw - corpMonthlyTotal).toFixed(2);
  const corpGrandTotal   = +(corpCalc.cardTotal + corpMonthlyTotal).toFixed(2);

  // Sahibkar pricing
  const rawPrice   = calcRaw(SAHIBKAR_PKG.monthlyRate, billData?.months ?? 1);
  const totalPrice = calcTotal(SAHIBKAR_PKG.monthlyRate, billData?.months ?? 1, billData?.discountRate ?? 0);
  const savedAmount = +(rawPrice - totalPrice).toFixed(2);
  const sahibkarCardPrice = formatWholePrice(SAHIBKAR_PKG.cardPrice);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    setCardLogoFile(file);
    const r = new FileReader(); r.onload = (ev) => setCardLogo(ev.target.result); r.readAsDataURL(file);
  };
  const handleCorpLogoUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    setCorpLogoFile(file);
    const r = new FileReader(); r.onload = (ev) => setCorpLogo(ev.target.result); r.readAsDataURL(file);
  };

  const toggleOrder = (id) => setCorpUsers((p) => p.map((u) => u.id === id ? { ...u, ordered: !u.ordered } : u));
  const orderAll    = () => setCorpUsers((p) => p.map((u) => ({ ...u, ordered: true  })));
  const unorderAll  = () => setCorpUsers((p) => p.map((u) => ({ ...u, ordered: false })));
  const setUserTone = (id, tone) => setCorpUsers((p) => p.map((u) => u.id === id ? { ...u, cardTone: tone } : u));

  const handleAddUser = () => {
    if (!newUserName.trim()) return;
    const fullName = `${newUserName.trim()} ${newUserSurname.trim()}`.trim();
    const code = newUserCode.trim() || genCode();
    setCorpUsers((p) => [...p, {
      id: Date.now(), code: code.toUpperCase(), name: fullName,
      profession: newUserProfession.trim() || "—",
      cardTone: corpGlobalTone === "ferdi" ? "dark" : corpGlobalTone,
      ordered: true,
    }]);
    setNewUserName(""); setNewUserSurname(""); setNewUserProfession(""); setNewUserCode(genCode());
    setShowAddUser(false);
  };

  const handleSubmit = () => {
    setSubmitting(true); setError("");
    setTimeout(() => {
      setSubmitting(false);
      const orderNum = `INS-${String(Date.now()).slice(-7)}`;
      const navState = isKorporativ
        ? {
            isNew: true,
            order_number: orderNum,
            user_count: orderedUsers.length,
            card_total: corpCalc.cardTotal,
            card_dr: corpCalc.cardDR,
            monthly_total: corpMonthlyTotal,
            monthly_per_user: corpCalc.monthlyTotal,
            month_dr: corpCalc.monthDR,
            billing_label: corpBill?.label,
            billing_months: corpBill?.months,
            package_name: "Korporativ",
            package_color: KORPORATIV_PKG.color,
          }
        : {
            isNew: true,
            order_number: orderNum,
            user_count: 1,
            card_total: 27.90,
            card_dr: 0,
            monthly_total: totalPrice,
            monthly_per_user: SAHIBKAR_PKG.monthlyRate,
            month_dr: 0,
            billing_label: billData?.label,
            billing_months: billData?.months,
            package_name: "Sahibkar",
            package_color: SAHIBKAR_PKG.color,
          };
      setPendingNav(navState);
      setOrderConfirmed(true);
      setTimeout(() => navigate("/orders", { state: navState }), 3000);
    }, 1500);
  };

  const handleReset = () => {
    setStarted(false); setStep(1); setError("");
    setSelectedBilling("monthly"); setCardTheme("dark"); setCardStyle("sade");
    setCardName(""); setCardTitle(""); setCardSlogan(""); setCardBrandMode("qelib");
    setCardBrandName(""); setCardLogo(null); setCardLogoFile(null); setFlipped(false);
    setCorpBrandMode("qelib"); setCorpSlogan(""); setCorpBrandName(""); setCorpBackStyle("sade");
    setCorpLogo(null); setCorpLogoFile(null); setCorpFlipped(false);
    setCorpUsers(INIT_CORP_USERS); setCorpGlobalTone("ferdi"); setCorpSearch("");
    setCorpBillingKey("monthly");
  };

  const previewTone = corpGlobalTone === "ferdi" ? "dark" : corpGlobalTone;

  // ── INFO SCREEN (before steps) ────────────────────────────
  if (!started) {
    const toRgba = (hex, a) => {
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
      return `rgba(${r},${g},${b},${a})`;
    };
    const c = pkgData.color;
    const heroAccent = "#d4af37";
    const heroAccentDeep = "#8f6b16";
    const baseCard2  = calcCorp(2);
    const baseCard5  = calcCorp(5);
    const baseCard10 = calcCorp(10);

    return (
      <div className="package-main-modern">
        <div className="pkg-info-page">

          {/* ── Hero ── */}
          <div className="pkg-info-hero" style={{
            background: `linear-gradient(145deg, ${toRgba(heroAccent,0.22)} 0%, ${toRgba(heroAccentDeep,0.1)} 52%, transparent 100%)`,
            borderBottom: `1px solid ${toRgba(heroAccent,0.24)}`,
          }}>
            <div className="pkg-info-hero-inner">
              <div className="pkg-info-hero-text">
                <span className="pkg-info-badge" style={{ background: toRgba(heroAccent,0.14), color: heroAccent, border: `1px solid ${toRgba(heroAccent,0.3)}` }}>
                  {pkgData.name} paketi
                </span>
                <h2 className="pkg-info-title">
                  {isKorporativ ? "Komandanız üçün professional kartlar" : "Fərdi NFC & QR kart"}
                </h2>
                <p className="pkg-info-desc">
                  {isKorporativ
                    ? "İşçilərinizin rəqəmsal nüfuzunu idarə edin. İstifadəçi sayı artdıqca qiymət azalır."
                    : "Öz şəxsi brendinizi yaradın. Fiziki kart + analitika paneli ilə rəqəmsal varlığınızı gücləndirin."}
                </p>
              </div>
              <button className="pkg-start-btn" onClick={() => setStarted(true)}>
                Sifarişə başla <FiArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="pkg-info-body">

            {/* Pricing grid */}
            <div className={`pkg-pricing-grid ${isKorporativ ? "korp" : ""}`}>
              {/* Card price */}
              <div className="pkg-price-card">
                <div className="ppc-head">
                  <span className="ppc-label">Kart qiyməti</span>
                  <span className="ppc-tag">bir dəfəlik</span>
                </div>
                {isKorporativ ? (
                  <div className="ppc-rows">
                    <div className="ppc-row"><strong style={{ color: c }}>{CORP_PRICING.firstCardPrice.toFixed(2)}₼</strong><span>ilk kart</span></div>
                    <div className="ppc-row"><strong style={{ color: c }}>{CORP_PRICING.extraCardPrice.toFixed(2)}₼</strong><span>hər əlavə kart</span></div>
                  </div>
                ) : (
                  <div className="ppc-single"><strong style={{ color: c }}>{SAHIBKAR_PKG.cardPrice}</strong></div>
                )}
              </div>

              {/* Monthly price */}
              <div className="pkg-price-card">
                <div className="ppc-head">
                  <span className="ppc-label">Aylıq aktivlik</span>
                  <span className="ppc-tag">abunəlik</span>
                </div>
                {isKorporativ ? (
                  <div className="ppc-rows">
                    <div className="ppc-row"><strong style={{ color: c }}>{CORP_PRICING.firstMonthlyPrice.toFixed(2)}₼</strong><span>ilk istifadəçi / ay</span></div>
                    <div className="ppc-row"><strong style={{ color: c }}>{CORP_PRICING.extraMonthlyPrice.toFixed(2)}₼</strong><span>hər əlavə / ay</span></div>
                  </div>
                ) : (
                  <div className="ppc-single"><strong style={{ color: c }}>{SAHIBKAR_PKG.monthlyRate.toFixed(2)}₼<em>/ay</em></strong></div>
                )}
              </div>

              {/* Discount table — korporativ only */}
              {isKorporativ && (
                <div className="pkg-price-card pkg-price-card--dr">
                  <div className="ppc-head">
                    <span className="ppc-label">Endirim cədvəli</span>
                    <span className="ppc-tag">istifadəçiyə görə</span>
                  </div>
                  <div className="pkg-dr-table">
                    {[
                      { label: "2 istifadəçi",  calc: baseCard2  },
                      { label: "5 istifadəçi",  calc: baseCard5  },
                      { label: "10 istifadəçi", calc: baseCard10 },
                    ].map(({ label, calc }) => (
                      <div key={label} className="pkg-dr-row">
                        <span className="pkg-dr-users">{label}</span>
                        <div className="pkg-dr-prices">
                          <span className="pkg-dr-item">
                            <em>Kart</em>
                            <strong style={{ color: c }}>{calc.cardTotal.toFixed(2)}₼</strong>
                            {calc.cardDR > 0 && <b className="pkg-dr-badge">-{calc.cardDR}%</b>}
                          </span>
                          <span className="pkg-dr-sep">·</span>
                          <span className="pkg-dr-item">
                            <em>Aylıq</em>
                            <strong style={{ color: c }}>{calc.monthlyTotal.toFixed(2)}₼</strong>
                            {calc.monthDR > 0 && <b className="pkg-dr-badge">-{calc.monthDR}%</b>}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!isKorporativ && (
                <div className="pkg-price-card pkg-price-card--dr">
                  <div className="ppc-head">
                    <span className="ppc-label">Endirimlər</span>
                    <span className="ppc-tag">müddətə görə</span>
                  </div>
                  <div className="pkg-dr-table">
                    {BILLING_OPTIONS.map((opt) => {
                      const raw = calcRaw(SAHIBKAR_PKG.monthlyRate, opt.months);
                      const disc = calcTotal(SAHIBKAR_PKG.monthlyRate, opt.months, opt.discountRate);
                      const saved = +(raw - disc).toFixed(2);
                      return (
                        <div key={opt.key} className="pkg-dr-row">
                          <span className="pkg-dr-users">{opt.label}</span>
                          <div className="pkg-dr-prices">
                            <span className="pkg-dr-item">
                              <em>Toplam</em>
                              <strong style={{ color: c }}>{disc.toFixed(2)}₼</strong>
                            </span>
                            <span className="pkg-dr-sep">·</span>
                            <span className="pkg-dr-item">
                              <em>Qənaət</em>
                              <strong style={{ color: c }}>{saved > 0 ? `-${saved.toFixed(2)}₼` : "0.00₼"}</strong>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="pkg-info-features">
              <p className="pkg-features-title">Paket xüsusiyyətləri</p>
              <div className="pkg-features-grid">
                {pkgData.features.map((f) => (
                  <div key={f} className="pkg-feature-item">
                    <FiCheck size={13} className="pkg-feature-check" style={{ color: c, flexShrink: 0 }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="package-main-modern">
        <div className="order-confirmed-screen">
          <div className="order-confirmed-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="9 12 11.5 14.5 15.5 10" />
            </svg>
          </div>
          <h2 className="order-confirmed-title">Sifariş Təsdiqləndi!</h2>
          <p className="order-confirmed-sub">
            Sifarişiniz uğurla qəbul edildi. Sifarişlər səhifəsinə yönləndirilirsiniz...
          </p>
          <div className="order-confirmed-dots">
            <span /><span /><span />
          </div>
        </div>
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
        <button className="pkg-back-to-info" onClick={() => { setStarted(false); setStep(1); }}>
          <FiChevronLeft size={14} /> Paket məlumatı
        </button>
      </div>

      <StepIndicator current={step} labels={stepLabels} />

      {/* ══════════════════════════════════════════
          KORPORATIV STEP 1 — İSTİFADƏÇİLƏR
      ══════════════════════════════════════════ */}
      {isKorporativ && step === 1 && (
        <div className="pkg-step-content">
          <h3 className="pkg-step-title">İstifadəçilər</h3>
          <p className="pkg-step-sub">Sifariş ediləcək hesabları seçin</p>

          <div className="corp-layout">
            {/* ── Sol: cədvəl ── */}
            <div className="corp-layout-main">
              {/* Toolbar */}
              <div className="corp-users-toolbar">
                <div className="corp-search-wrap">
                  <FiSearch className="corp-search-icon" />
                  <input className="corp-search-input" placeholder="Ad, peşə, kod axtar..." value={corpSearch} onChange={(e) => setCorpSearch(e.target.value)} />
                </div>
                <div className="corp-toolbar-right">
                  <button className="corp-add-btn" onClick={() => setShowAddUser((v) => !v)}>
                    <FiPlus size={13} /> İstifadəçi
                  </button>
                </div>
              </div>

              {/* Add form */}
              {showAddUser && (
                <div className="corp-add-form">
                  <div className="corp-add-form-grid">
                    <div className="corp-add-field">
                      <label>Ad</label>
                      <input className="corp-add-input" placeholder="Ad" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                    </div>
                    <div className="corp-add-field">
                      <label>Soyad</label>
                      <input className="corp-add-input" placeholder="Soyad" value={newUserSurname} onChange={(e) => setNewUserSurname(e.target.value)} />
                    </div>
                    <div className="corp-add-field">
                      <label>Peşə</label>
                      <input className="corp-add-input" placeholder="Peşə / vəzifə" value={newUserProfession} onChange={(e) => setNewUserProfession(e.target.value)} />
                    </div>
                    <div className="corp-add-field">
                      <label>User Kodu <span className="corp-add-auto">(avtomatik)</span></label>
                      <input className="corp-add-input corp-add-input--code" readOnly value={newUserCode} />
                    </div>
                  </div>
                  <div className="corp-add-actions">
                    <button className="pkg-nav-btn ghost sm" onClick={() => setShowAddUser(false)}>Ləğv et</button>
                    <button className="pkg-nav-btn primary sm" onClick={handleAddUser} disabled={!newUserName.trim()}>
                      <FiPlus size={13} /> Əlavə et
                    </button>
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="corp-users-table-wrap">
                <table className="corp-users-table">
                  <thead>
                    <tr>
                      <th># Kod</th>
                      <th>Ad Soyad</th>
                      <th>Peşə</th>
                      {corpGlobalTone === "ferdi" && <th>Kart Tonu</th>}
                      <th>Sifariş</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, idx) => (
                      <tr key={user.id} className={!user.ordered ? "row-unselected" : ""}>
                        <td className="col-code-num">
                          <span className="user-index">{idx + 1}</span>
                          <span className="user-code-tag">{user.code}</span>
                        </td>
                        <td className="col-name">{user.name}</td>
                        <td className="col-profession">{user.profession}</td>
                        {corpGlobalTone === "ferdi" && (
                          <td className="col-tone">
                            {user.ordered ? (
                              <div className="user-tone-toggle">
                                <button type="button" className={user.cardTone === "dark"  ? "active" : ""} onClick={() => setUserTone(user.id, "dark")}  title="Tünd"><FiMoon size={12} /></button>
                                <button type="button" className={user.cardTone === "light" ? "active" : ""} onClick={() => setUserTone(user.id, "light")} title="Açıq"><FiSun  size={12} /></button>
                              </div>
                            ) : <span className="col-tone-empty">—</span>}
                          </td>
                        )}
                        <td className="col-select">
                          <button
                            type="button"
                            className={`order-toggle-btn ${user.ordered ? "ordered" : "not-ordered"}`}
                            onClick={() => toggleOrder(user.id)}
                          >
                            {user.ordered ? <><FiCheck size={12} /> Sifariş et</> : "Etmə"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr><td colSpan={corpGlobalTone === "ferdi" ? 5 : 4} className="col-empty">İstifadəçi tapılmadı</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Sağ: panel ── */}
            <div className="corp-layout-side">
              {/* Count summary */}
              <div className="corp-side-card">
                <div className="corp-side-card-title"><FiUsers size={14} /> Ümumi məlumat</div>
                <div className="corp-stat-row">
                  <span>Cəmi istifadəçi</span><strong>{corpUsers.length}</strong>
                </div>
                <div className="corp-stat-row">
                  <span>Sifariş edilir</span>
                  <strong className="corp-stat-green">{orderedUsers.length}</strong>
                </div>
                <div className="corp-stat-row">
                  <span>Sifariş edilmir</span>
                  <strong className="corp-stat-muted">{corpUsers.length - orderedUsers.length}</strong>
                </div>
                <div className="corp-bulk-actions">
                  <button className="corp-bulk-btn corp-bulk-btn--all" onClick={orderAll}>Hamısını sifariş et</button>
                  <button className="corp-bulk-btn corp-bulk-btn--none" onClick={unorderAll}>Hamısını sifariş etmə</button>
                </div>
              </div>

              {/* Global tone */}
              <div className="corp-side-card">
                <div className="corp-side-card-title"><FiSliders size={14} /> Ümumi kart tonu</div>
                <div className="corp-tone-options">
                  {[
                    { key: "dark",  label: "Tünd",  Icon: FiMoon },
                    { key: "light", label: "Açıq",  Icon: FiSun  },
                    { key: "ferdi", label: "Fərdi", Icon: FiSliders },
                  ].map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      type="button"
                      className={`corp-tone-opt ${corpGlobalTone === key ? "active" : ""}`}
                      onClick={() => setCorpGlobalTone(key)}
                    >
                      <div className="corp-tone-opt-top">
                        {key !== "ferdi" && <MiniCard theme={key} />}
                        {key === "ferdi" && <div className="mini-card-ferdi"><FiSliders size={12} /></div>}
                      </div>
                      <Icon size={12} />{label}
                    </button>
                  ))}
                </div>
                {corpGlobalTone !== "ferdi" && (
                  <p className="corp-tone-note">Seçilmiş ton bütün istifadəçilərə tətbiq olunacaq</p>
                )}
                {corpGlobalTone === "ferdi" && (
                  <p className="corp-tone-note">Hər istifadəçi üçün cədvəldə ayrıca seçin</p>
                )}
              </div>
            </div>
          </div>

          <div className="pkg-nav-row">
            <span />
            <button className="pkg-nav-btn primary" onClick={() => setStep(2)}>Növbəti <FiChevronRight /></button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          KORPORATIV STEP 3 — KART DİZAYNI
      ══════════════════════════════════════════ */}
      {isKorporativ && step === 3 && (
        <div className="pkg-step-content">
          <h3 className="pkg-step-title">Kart dizaynı</h3>
          <p className="pkg-step-sub">Şirkət kartının ümumi dizaynını tənzimlə</p>

          <div className="card-design-workspace">
            <div className="card-preview-panel">
              <button className="card-flip-icon-btn" onClick={() => setCorpFlipped((f) => !f)} aria-label="Fırla" type="button">
                <FiRefreshCw />
              </button>
              <p className="card-preview-label">Nümunə görünüş</p>
              <CardPreview
                theme="dark" logo={corpLogo} showInfo={corpBackStyle === "adsoyad"}
                slogan={corpSlogan} brandMode={corpBrandMode} brandName={corpBrandName}
                flipped={corpFlipped} onFlip={() => setCorpFlipped((f) => !f)}
              />
              <p className="card-preview-hint">Kartın üzərinə klik edib çevirin</p>

            </div>

            <div className="card-controls-panel">
              <div className="card-controls-grid">
                <div className="card-ctrl-field full-width">
                  <label>Rejim</label>
                  <div className="card-brand-toggle">
                    <button type="button" className={corpBrandMode === "qelib" ? "active" : ""} onClick={() => setCorpBrandMode("qelib")}>Qəlib</button>
                    <button type="button" className={corpBrandMode === "ferdi" ? "active" : ""} onClick={() => setCorpBrandMode("ferdi")}>Fərdi</button>
                  </div>
                </div>

                {corpBrandMode === "ferdi" && (
                  <>
                    <div className="card-ctrl-field">
                      <label>Şüar</label>
                      <input className="card-ctrl-input" value={corpSlogan} onChange={(e) => setCorpSlogan(e.target.value)} placeholder="Şüar" maxLength={40} />
                    </div>
                    <div className="card-ctrl-field">
                      <label>Kart yazısı</label>
                      <input className="card-ctrl-input" value={corpBrandName} onChange={(e) => setCorpBrandName(e.target.value)} placeholder="Yazı" maxLength={20} />
                    </div>
                  </>
                )}

                <div className="card-ctrl-field full-width">
                  <label>Kart arxa üzü</label>
                  <div className="card-brand-toggle">
                    <button type="button" className={corpBackStyle === "sade"    ? "active" : ""} onClick={() => setCorpBackStyle("sade")}>Sadə</button>
                    <button type="button" className={corpBackStyle === "adsoyad" ? "active" : ""} onClick={() => setCorpBackStyle("adsoyad")}>Ad-soyadlı</button>
                  </div>
                </div>

                <div className="card-ctrl-field full-width">
                  <label>Logo</label>
                  <div className="card-upload-area" onClick={() => corpFileRef.current?.click()}>
                    {corpLogo
                      ? <img src={corpLogo} alt="logo" className="card-upload-preview" />
                      : <div className="card-upload-placeholder">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24">
                            <path d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5" strokeLinecap="round" />
                            <path d="M12 3v13M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Logo yüklə</span>
                        </div>
                    }
                  </div>
                  <input ref={corpFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleCorpLogoUpload} />
                  {corpLogo && <button type="button" className="card-remove-btn" onClick={() => { setCorpLogo(null); setCorpLogoFile(null); }}>Sil</button>}
                  <button type="button" className="card-flip-btn" onClick={() => setCorpFlipped((f) => !f)}>
                    {corpFlipped ? "Ön üzü göstər" : "Arxa üzü göstər"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pkg-nav-row">
            <button className="pkg-nav-btn ghost" onClick={() => setStep(2)}><FiChevronLeft /> Geri</button>
            <button className="pkg-nav-btn primary" onClick={() => setStep(4)}>Növbəti <FiChevronRight /></button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          KORPORATIV STEP 2 — MÜDDƏT
      ══════════════════════════════════════════ */}
      {isKorporativ && step === 2 && (
        <div className="pkg-step-content">
          <h3 className="pkg-step-title">Ödəniş müddəti</h3>
          <p className="pkg-step-sub">
            Profil sayını və ödəniş periodunu seçin · İstifadəçi artdıqca qiymət azalır
          </p>

          {/* Profile count (auto from step 1) */}
          <div className="profile-count-wrap">
            <p className="profile-count-label">Profil sayı</p>
            <div className="profile-count-static">{orderedUsers.length}</div>
            <div className="corp-price-preview">
              <div className="corp-price-item">
                <span>Kart qiyməti</span>
                <div className="corp-price-value-row">
                  <strong>{corpCalc.cardTotal.toFixed(2)}₼</strong>
                  {corpCalc.cardDR > 0 && <span className="corp-discount-badge">-{corpCalc.cardDR}%</span>}
                </div>
              </div>
              <div className="corp-price-item">
                <span>Aylıq aktivlik</span>
                <div className="corp-price-value-row">
                  <strong>{corpCalc.monthlyTotal.toFixed(2)}₼</strong>
                  {corpCalc.monthDR > 0 && <span className="corp-discount-badge">-{corpCalc.monthDR}%</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="billing-options">
            {BILLING_OPTIONS.map((opt) => {
              const monthRaw  = +(corpCalc.monthlyTotal * opt.months).toFixed(2);
              const monthDisc = +(monthRaw * (1 - opt.discountRate)).toFixed(2);
              const saved     = +(monthRaw - monthDisc).toFixed(2);
              const isSelected = corpBillingKey === opt.key;
              return (
                <div key={opt.key} className={`billing-card ${isSelected ? "selected" : ""}`} onClick={() => setCorpBillingKey(opt.key)}>
                  <div className="billing-card-top">
                    <span className="billing-label">{opt.label}</span>
                    {opt.discountRate > 0 && <span className="billing-discount-badge">-{Math.round(opt.discountRate * 100)}%</span>}
                    {isSelected && <FiCheck className="billing-check" />}
                  </div>
                  <div className="billing-price-row">
                    <div className="billing-total">{monthDisc}₼</div>
                    {saved > 0 && <div className="billing-original">{monthRaw}₼</div>}
                  </div>
                  <div className="billing-rate">
                    {corpCalc.monthlyTotal.toFixed(2)}₼ × {opt.months} ay
                    {saved > 0 && <span className="billing-save-note"> ({saved.toFixed(2)}₼ qənaət)</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pkg-nav-row">
            <button className="pkg-nav-btn ghost" onClick={() => setStep(1)}><FiChevronLeft /> Geri</button>
            <button className="pkg-nav-btn primary" onClick={() => setStep(3)}>Növbəti <FiChevronRight /></button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          KORPORATIV STEP 4 — ÖDƏNİŞ / TƏSDİQ
      ══════════════════════════════════════════ */}
      {isKorporativ && step === 4 && (
        <div className="pkg-step-content">
          <h3 className="pkg-step-title">Sifarişi təsdiqləyin</h3>

          <div className="corp-confirm-layout">
            <div className="corp-confirm-preview">
              <p className="checkout-section-label">Nümunə kart görünüşü</p>
              <button className="checkout-flip-btn" onClick={() => setCorpFlipped((f) => !f)} type="button"><FiRefreshCw /></button>
              <CardPreview
                theme={previewTone} logo={corpLogo} showInfo={corpBackStyle === "adsoyad"}
                slogan={corpSlogan} brandMode={corpBrandMode} brandName={corpBrandName}
                flipped={corpFlipped} onFlip={() => setCorpFlipped((f) => !f)}
              />
              <p className="card-preview-hint">Karta klik edib çevirin</p>
            </div>

            <div className="corp-confirm-right">
              {/* Users box */}
              <div className="corp-confirm-users">
                <div className="corp-confirm-users-head">
                  <FiUsers size={14} />
                  <span>Sifariş edilən istifadəçilər</span>
                  <span className="corp-confirm-count">{orderedUsers.length}</span>
                </div>
                <div className="corp-confirm-names-list">
                  {orderedUsers.map((user) => (
                    <span key={user.id} className="corp-confirm-name-tag">{user.name}</span>
                  ))}
                  {orderedUsers.length === 0 && <p className="corp-confirm-empty">Heç bir istifadəçi seçilməyib</p>}
                </div>
              </div>

              {/* Price summary */}
              <div className="checkout-card">
                <p className="checkout-section-label">Sifariş məlumatları</p>
                <div className="checkout-row"><span>Paket</span><strong style={{ color: KORPORATIV_PKG.color }}>{KORPORATIV_PKG.name}</strong></div>
                <div className="checkout-row"><span>Sifariş edilən hesab</span><strong>{orderedUsers.length} istifadəçi</strong></div>
                <div className="checkout-row"><span>Kart qiyməti (bir dəfəlik)</span><strong>{corpCalc.cardTotal.toFixed(2)}₼{corpCalc.cardDR > 0 && <span className="checkout-save"> (-{corpCalc.cardDR}%)</span>}</strong></div>
                <div className="checkout-row"><span>Aylıq aktivlik</span><strong>{corpCalc.monthlyTotal.toFixed(2)}₼</strong></div>
                <div className="checkout-row"><span>Ödəniş müddəti</span><strong>{corpBill?.label}</strong></div>
                {corpMonthlySaved > 0 && (
                  <div className="checkout-row"><span>Müddət endirimi ({Math.round((corpBill?.discountRate ?? 0) * 100)}%)</span><strong className="checkout-save">-{corpMonthlySaved.toFixed(2)}₼</strong></div>
                )}
                <div className="checkout-divider" />
                <div className="checkout-row total-row">
                  <span>Ümumi məbləğ</span>
                  <div className="total-price-stack">
                    <strong className="total-amount">{corpGrandTotal.toFixed(2)}₼</strong>
                    <span className="total-note">kart + {corpMonthlyTotal.toFixed(2)}₼ abunəlik</span>
                  </div>
                </div>
              </div>

              {error && <div className="checkout-error">{error}</div>}
              <button className="pkg-nav-btn primary full-width" onClick={handleSubmit} disabled={submitting || orderedUsers.length === 0}>
                {submitting ? <span className="pkg-spinner-sm" /> : null}
                {submitting ? "Emal olunur..." : `${corpGrandTotal.toFixed(2)}₼ Ödənişə keç`}
              </button>
            </div>
          </div>

          <div className="pkg-nav-row">
            <button className="pkg-nav-btn ghost" onClick={() => setStep(3)}><FiChevronLeft /> Geri</button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SAHİBKAR STEP 1 — MÜDDƏT
      ══════════════════════════════════════════ */}
      {!isKorporativ && step === 1 && (
        <div className="pkg-step-content">
          <h3 className="pkg-step-title">Ödəniş müddətini seçin</h3>
          <p className="pkg-step-sub">
            Mövcud paketiniz: <strong style={{ color: SAHIBKAR_PKG.color }}>{SAHIBKAR_PKG.name}</strong>
            {" · "}{SAHIBKAR_PKG.monthlyRate.toFixed(2)}₼/ay — daha uzun müddət seçdikdə qiymət aşağı düşür
          </p>

          <div className="billing-options">
            {BILLING_OPTIONS.map((opt) => {
              const raw = calcRaw(SAHIBKAR_PKG.monthlyRate, opt.months);
              const disc = calcTotal(SAHIBKAR_PKG.monthlyRate, opt.months, opt.discountRate);
              const saved = +(raw - disc).toFixed(2);
              const isSelected = selectedBilling === opt.key;
              return (
                <div key={opt.key} className={`billing-card ${isSelected ? "selected" : ""}`} onClick={() => setSelectedBilling(opt.key)}>
                  <div className="billing-card-top">
                    <span className="billing-label">{opt.label}</span>
                    {opt.discountRate > 0 && <span className="billing-discount-badge">-{Math.round(opt.discountRate * 100)}%</span>}
                    {isSelected && <FiCheck className="billing-check" />}
                  </div>
                  <div className="billing-price-row">
                    <div className="billing-total">{disc}₼</div>
                    {saved > 0 && <div className="billing-original">{raw}₼</div>}
                  </div>
                  <div className="billing-rate">
                    {SAHIBKAR_PKG.monthlyRate.toFixed(2)}₼ × {opt.months} ay
                    {saved > 0 && <span className="billing-save-note"> ({saved.toFixed(2)}₼ qənaət)</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pkg-nav-row">
            <span />
            <button className="pkg-nav-btn primary" onClick={() => { setFlipped(false); setStep(2); }}>
              Təsdiq et <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SAHİBKAR STEP 2 — KART DİZAYNI
      ══════════════════════════════════════════ */}
      {!isKorporativ && step === 2 && (
        <div className="pkg-step-content">
          <h3 className="pkg-step-title">Kart dizaynı</h3>
          <p className="pkg-step-sub">Kart görünüşünü qısa və rahat formada tənzimlə</p>

          <div className="card-design-workspace">
            <div className="card-preview-panel">
              <button className="card-flip-icon-btn" onClick={() => setFlipped((f) => !f)} type="button"><FiRefreshCw /></button>
              <p className="card-preview-label">Ön / arxa</p>
              <CardPreview
                theme={cardTheme} logo={cardLogo} name={cardName} title={cardTitle}
                showInfo={cardStyle === "detayli"} slogan={cardSlogan}
                brandMode={cardBrandMode} brandName={cardBrandName}
                flipped={flipped} onFlip={() => setFlipped((f) => !f)}
              />
              <p className="card-preview-hint">Kartın üzərinə klik edib çevirin</p>
            </div>

            <div className="card-controls-panel">
              <div className="card-controls-grid">
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
                    <button type="button" className={cardStyle === "sade"    ? "active" : ""} onClick={() => setCardStyle("sade")}>Sadə</button>
                    <button type="button" className={cardStyle === "detayli" ? "active" : ""} onClick={() => setCardStyle("detayli")}>Detallı</button>
                  </div>
                </div>
                <div className="card-ctrl-field full-width">
                  <label>Rejim</label>
                  <div className="card-brand-toggle">
                    <button type="button" className={cardBrandMode === "qelib" ? "active" : ""} onClick={() => setCardBrandMode("qelib")}>Qəlib</button>
                    <button type="button" className={cardBrandMode === "ferdi" ? "active" : ""} onClick={() => setCardBrandMode("ferdi")}>Fərdi</button>
                  </div>
                </div>
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
                <div className="card-ctrl-field full-width">
                  <label>Logo</label>
                  <div className="card-upload-area" onClick={() => fileRef.current?.click()}>
                    {cardLogo
                      ? <img src={cardLogo} alt="logo" className="card-upload-preview" />
                      : <div className="card-upload-placeholder">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24">
                            <path d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5" strokeLinecap="round" />
                            <path d="M12 3v13M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Logo yüklə</span>
                        </div>
                    }
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogoUpload} />
                  {cardLogo && <button type="button" className="card-remove-btn" onClick={() => { setCardLogo(null); setCardLogoFile(null); }}>Sil</button>}
                  <button type="button" className="card-flip-btn" onClick={() => setFlipped((f) => !f)}>
                    {flipped ? "Ön üzü göstər" : "Arxa üzü göstər"}
                  </button>
                </div>
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
            </div>
          </div>

          <div className="pkg-nav-row">
            <button className="pkg-nav-btn ghost" onClick={() => setStep(1)}><FiChevronLeft /> Geri</button>
            <button className="pkg-nav-btn primary" onClick={() => setStep(3)}>Təsdiq et <FiChevronRight /></button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SAHİBKAR STEP 3 — ÖDƏNİŞ
      ══════════════════════════════════════════ */}
      {!isKorporativ && step === 3 && (
        <div className="pkg-step-content">
          <h3 className="pkg-step-title">Sifarişi təsdiqləyin</h3>

          <div className="checkout-layout">
            <div className="checkout-summary">
              <div className="checkout-card">
                <p className="checkout-section-label">Paket məlumatları</p>
                <div className="checkout-row"><span>Paket</span><strong style={{ color: SAHIBKAR_PKG.color }}>{SAHIBKAR_PKG.name}</strong></div>
                <div className="checkout-row"><span>Kartın 1 dəfəlik ödənişi</span><strong>{sahibkarCardPrice}</strong></div>
                <div className="checkout-row"><span>Aylıq qiymət</span><strong>{SAHIBKAR_PKG.monthlyRate.toFixed(2)}₼</strong></div>
                <div className="checkout-row"><span>Ödəniş müddəti</span><strong>{billData?.label}</strong></div>
                {savedAmount > 0 && (
                  <div className="checkout-row"><span>Endirim ({Math.round((billData?.discountRate ?? 0) * 100)}%)</span><strong className="checkout-save">-{savedAmount.toFixed(2)}₼</strong></div>
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

              <div className="checkout-card">
                <p className="checkout-section-label">Kart məlumatları</p>
                <div className="checkout-row"><span>Tema</span><strong>{cardTheme === "dark" ? "Tünd" : "Açıq"}</strong></div>
                <div className="checkout-row"><span>Üslub</span><strong>{cardStyle === "sade" ? "Sadə" : "Detallı"}</strong></div>
                <div className="checkout-row"><span>Dizayn rejimi</span><strong>{cardBrandMode === "ferdi" ? "Fərdi" : "Qəlib"}</strong></div>
                {cardBrandMode === "ferdi" && (<><div className="checkout-row"><span>Şüar</span><strong>{cardSlogan || "—"}</strong></div><div className="checkout-row"><span>Kart yazısı</span><strong>{cardBrandName || "—"}</strong></div></>)}
                {cardStyle === "detayli" && (<><div className="checkout-row"><span>Ad soyad</span><strong>{cardName || "—"}</strong></div><div className="checkout-row"><span>Vəzifə</span><strong>{cardTitle || "—"}</strong></div></>)}
                <div className="checkout-row">
                  <span>Logo</span>
                  {cardLogo ? <div className="checkout-logo-wrap"><img src={cardLogo} alt="logo" className="checkout-logo-thumb" /><strong>Yüklənib</strong></div> : <strong>Yoxdur</strong>}
                </div>
              </div>

              {error && <div className="checkout-error">{error}</div>}
              <button className="pkg-nav-btn primary full-width" onClick={handleSubmit} disabled={submitting}>
                {submitting ? <span className="pkg-spinner-sm" /> : null}
                {submitting ? "Emal olunur..." : `${totalPrice.toFixed(2)}₼ Ödənişə keç`}
              </button>
            </div>

            <div className="checkout-preview">
              <p className="checkout-section-label">Kartınızın görünüşü</p>
              <button className="checkout-flip-btn" onClick={() => setFlipped((f) => !f)} type="button"><FiRefreshCw /></button>
              <CardPreview
                theme={cardTheme} logo={cardLogo} name={cardName} title={cardTitle}
                showInfo={cardStyle === "detayli"} slogan={cardSlogan}
                brandMode={cardBrandMode} brandName={cardBrandName}
                flipped={flipped} onFlip={() => setFlipped((f) => !f)}
              />
              <p className="card-preview-hint">Kartın üzərinə klik edib çevirin</p>
            </div>
          </div>

          <div className="pkg-nav-row">
            <button className="pkg-nav-btn ghost" onClick={() => setStep(2)}><FiChevronLeft /> Geri</button>
          </div>
        </div>
      )}
    </div>
  );
}
