import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiUsers, FiBriefcase, FiChevronRight } from "react-icons/fi";
import "./PlanSelectMain.scss";

const PLANS = [
  {
    key: "sahibkar",
    label: "Sahibkar",
    icon: <FiBriefcase />,
    color: "#d4af37",
    desc: "Fərdi sahibkarlar və kiçik müəssisələr üçün. 1-ci və 2-ci hissəni idarə edin, linklər əlavə edin, analitikanı izləyin.",
    features: [
      "Fərdi + Brend profili",
      "Sosial & əlaqə linkləri",
      "Analitika paneli",
      "QR / NFC dəstəyi",
      "Paket seçimi",
    ],
  },
  {
    key: "korporativ",
    label: "Korporativ",
    icon: <FiUsers />,
    color: "#8b5cf6",
    badge: "Tam",
    desc: "Komandalar və korporativ müəssisələr üçün. Hesablar, kategoriyalar, işçi sayı və genişlənmiş analitika.",
    features: [
      "Fərdi + Brend profili",
      "Sosial & əlaqə linkləri",
      "Analitika paneli",
      "QR / NFC dəstəyi",
      "Paket seçimi",
      "Hesablar idarəetməsi",
      "Kategoriyalar",
      "İşçi sayı analitikası",
    ],
  },
];

export default function PlanSelectMain() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleConfirm = () => {
    if (!selected) return;
    localStorage.setItem("planType", selected);
    navigate("/home", { replace: true });
  };

  return (
    <div className="plan-select-wrap">
      <div className="plan-select-card">
        <div className="plan-select-header">
          <div className="plan-logo">Insyde</div>
          <h2>Panel növünü seçin</h2>
          <p>Biznesinizə uyğun idarəetmə panelini seçin. İstənilən vaxt dəyişdirə bilərsiniz.</p>
        </div>

        <div className="plan-options">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`plan-option ${selected === plan.key ? "selected" : ""}`}
              style={{ "--plan-color": plan.color }}
              onClick={() => setSelected(plan.key)}
            >
              {plan.badge && (
                <span className="plan-badge" style={{ background: plan.color }}>
                  {plan.badge}
                </span>
              )}

              <div className="plan-option-top">
                <div className="plan-icon" style={{ background: `${plan.color}18`, color: plan.color }}>
                  {plan.icon}
                </div>
                <div>
                  <h3 style={{ color: plan.color }}>{plan.label}</h3>
                  <p className="plan-desc">{plan.desc}</p>
                </div>
              </div>

              <ul className="plan-features">
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <FiCheck className="feat-check" style={{ color: plan.color }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className={`plan-select-dot ${selected === plan.key ? "on" : ""}`}
                style={selected === plan.key ? { background: plan.color, borderColor: plan.color } : {}}>
                {selected === plan.key && <FiCheck />}
              </div>
            </div>
          ))}
        </div>

        <button
          className="plan-confirm-btn"
          disabled={!selected}
          onClick={handleConfirm}
        >
          Davam et <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
