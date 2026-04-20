import React, { useState, useEffect, useRef } from "react";
import {
  FiMail,
  FiCheckCircle,
  FiSun,
  FiMoon,
  FiSend,
  FiArrowLeft,
} from "react-icons/fi";
import "./SettingsMain.scss";
import Popup from "../../Popup/Popup";

const LANGUAGES = [
  { code: "az", label: "Azərbaycanca", flag: "🇦🇿", short: "AZ" },
  { code: "en", label: "English", flag: "🇬🇧", short: "EN" },
  { code: "ru", label: "Русский", flag: "🇷🇺", short: "RU" },
];

function SettingsMain() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "az",
  );
  const [popup, setPopup] = useState({ isOpen: false, type: "success" });
  const closePopup = () => setPopup((p) => ({ ...p, isOpen: false }));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  const handleLanguageChange = (code) => {
    setLanguage(code);
    localStorage.setItem("language", code);
  };

  const handleLanguageSave = () => {
    setPopup({
      isOpen: true,
      type: "update",
      title: "Dil yeniləndi!",
      message: `İnterfeys dili "${LANGUAGES.find((l) => l.code === language)?.label}" olaraq tənzimləndi.`,
      confirmText: "Yenilə",
      onConfirm: null,
    });
  };

  // ── E-poçt dəyişmə ──
  const [emailStep, setEmailStep]     = useState(1); // 1=email, 2=kod
  const [newEmail, setNewEmail]       = useState("");
  const [code, setCode]               = useState(["", "", "", "", "", ""]);
  const [codeSending, setCodeSending] = useState(false);
  const [codeVerifying, setCodeVerifying] = useState(false);
  const [countdown, setCountdown]     = useState(0);
  const timerRef = useRef(null);
  const codeRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const startCountdown = () => {
    setCountdown(60);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((c) => { if (c <= 1) { clearInterval(timerRef.current); return 0; } return c - 1; });
    }, 1000);
  };

  const handleSendCode = () => {
    if (!isValidEmail(newEmail) || codeSending) return;
    setCodeSending(true);
    setTimeout(() => {
      setCodeSending(false);
      setEmailStep(2);
      startCountdown();
    }, 1200);
  };

  const handleCodeInput = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) codeRefs[i + 1].current?.focus();
  };

  const handleCodeKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) codeRefs[i - 1].current?.focus();
  };

  const handleCodePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(""));
      codeRefs[5].current?.focus();
    }
  };

  const fullCode = code.join("");

  const handleVerify = () => {
    if (fullCode.length < 6 || codeVerifying) return;
    setCodeVerifying(true);
    setTimeout(() => {
      setCodeVerifying(false);
      setPopup({
        isOpen: true,
        type: "success",
        title: "E-poçt dəyişdirildi!",
        message: `Yeni e-poçt ünvanınız: ${newEmail}`,
        confirmText: "Əla",
        onConfirm: null,
      });
      setEmailStep(1);
      setNewEmail("");
      setCode(["", "", "", "", "", ""]);
      setCountdown(0);
      clearInterval(timerRef.current);
    }, 1200);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCode(["", "", "", "", "", ""]);
    startCountdown();
  };

  return (
    <div className="settings-main-modern">
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

      <div className="top-header">
        <div>
          <h2 className="page-title">Ayarlar</h2>
          <p className="page-subtitle">
            Hesab təhlükəsizliyi və platforma tənzimləmələri
          </p>
        </div>
      </div>

      {/*
        LAYOUT:
        ┌─────────────┬─────────────┐
        │  Rəng       │             │
        ├─────────────┤   Parol     │
        │  Dil        │             │
        └─────────────┴─────────────┘
      */}
      <div className="settings-grid">
        {/* SOL SÜTUN */}
        <div className="settings-col left-col">
          {/* SOL YUXARI — RƏNG */}
          <div className="modern-card theme-card">
            <div className="card-header">
              <div>
                <h3>Platforma Görünüşü</h3>
                <p>İşləmək üçün sizə ən uyğun olan mövzunu seçin.</p>
              </div>
            </div>
            <div className="user-code-box">
              <span className="user-code-label">User Code</span>
              <strong className="user-code-value">
                {localStorage.getItem("userCode") || "—"}
              </strong>
            </div>
            <div className="theme-options">
              <div
                className={`theme-box ${theme === "dark" ? "active" : ""}`}
                onClick={() => handleThemeChange("dark")}
              >
                <div className="theme-preview dark-preview">
                  <div className="mock-sidebar" />
                  <div className="mock-content">
                    <div className="mock-box" />
                    <div className="mock-box" />
                  </div>
                </div>
                <div className="theme-info">
                  <FiMoon className="theme-icon" /> Tünd Mövzu
                </div>
              </div>
              <div
                className={`theme-box ${theme === "light" ? "active" : ""}`}
                onClick={() => handleThemeChange("light")}
              >
                <div className="theme-preview light-preview">
                  <div className="mock-sidebar" />
                  <div className="mock-content">
                    <div className="mock-box" />
                    <div className="mock-box" />
                  </div>
                </div>
                <div className="theme-info">
                  <FiSun className="theme-icon" /> Açıq Mövzu
                </div>
              </div>
            </div>
          </div>

          {/* SOL AŞAĞI — DİL (müvəqqəti deaktiv edilib) */}
          {/* <div className="modern-card language-card">
            <div className="card-header">
              <div className="header-icon">
                <FiGlobe />
              </div>
              <div>
                <h3>İnterfeys Dili</h3>
                <p>Platformanı istədiyiniz dildə istifadə edin.</p>
              </div>
            </div>
            <div className="language-options">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang.code}
                  className={`language-box ${language === lang.code ? "active" : ""}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <div className="lang-texts">
                    <span className="lang-label">{lang.label}</span>
                    <span className="lang-short">{lang.short}</span>
                  </div>
                  <div className="lang-radio">
                    {language === lang.code && (
                      <div className="lang-radio-dot" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* SAĞ SÜTUN — MAİL DƏYİŞ */}
        <div className="settings-col right-col">
          <div className="modern-card password-card">
            <div className="card-header">
              <div className="header-icon">
                <FiMail />
              </div>
              <div>
                <h3>Maili Dəyiş</h3>
                <p>Yeni e-poçt ünvanınızı daxil edin, doğrulama kodu göndəriləcək.</p>
              </div>
            </div>

            {emailStep === 1 ? (
              <div className="email-change-form">
                <div className="input-group">
                  <label>Yeni E-poçt</label>
                  <div className="input-wrapper">
                    <FiMail className="input-prefix-icon" />
                    <input
                      type="email"
                      placeholder="yeni@email.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    className="save-btn"
                    onClick={handleSendCode}
                    disabled={!isValidEmail(newEmail) || codeSending}
                  >
                    {codeSending ? (
                      <span className="btn-spinner" />
                    ) : (
                      <FiSend />
                    )}
                    {codeSending ? "Göndərilir..." : "Kod Göndər"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="email-change-form">
                <div className="email-code-target">
                  <FiMail />
                  <span><strong>{newEmail}</strong> ünvanına 6 rəqəmli kod göndərildi.</span>
                </div>

                <div className="input-group">
                  <label>Doğrulama Kodu</label>
                  <div className="otp-row" onPaste={handleCodePaste}>
                    {code.map((d, i) => (
                      <input
                        key={i}
                        ref={codeRefs[i]}
                        className="otp-cell"
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleCodeInput(i, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(i, e)}
                      />
                    ))}
                  </div>
                </div>

                <div className="otp-resend">
                  {countdown > 0 ? (
                    <span className="otp-countdown">Yenidən göndər — {countdown}s</span>
                  ) : (
                    <button className="otp-resend-btn" onClick={handleResend}>
                      Kodu yenidən göndər
                    </button>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    className="save-btn ghost-btn"
                    onClick={() => { setEmailStep(1); setCode(["","","","","",""]); }}
                  >
                    <FiArrowLeft /> Geri
                  </button>
                  <button
                    className="save-btn"
                    onClick={handleVerify}
                    disabled={fullCode.length < 6 || codeVerifying}
                  >
                    {codeVerifying ? <span className="btn-spinner" /> : <FiCheckCircle />}
                    {codeVerifying ? "Yoxlanılır..." : "Təsdiqlə"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsMain;
