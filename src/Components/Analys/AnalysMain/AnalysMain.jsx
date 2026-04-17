import React, { useState } from "react";
import {
  FiEye,
  FiUsers,
  FiTrendingUp,
  FiSmartphone,
  FiMonitor,
  FiLink,
  FiEdit2,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { TbNfc } from "react-icons/tb";
import {
  FaInstagram,
  FaApple,
  FaAndroid,
  FaGlobe,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
} from "react-icons/fa";

import "./AnalysMain.scss";

// ─── Yardımçı komponentlər ────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <div className="stat-card">
      <div
        className="stat-icon"
        style={{ backgroundColor: `${color}18`, color }}
      >
        {icon}
      </div>
      <div className="stat-info">
        <h4>{label}</h4>
        <div className="stat-bottom">
          <span className="value">{(value ?? 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function ProgressRow({ icon, name, count, percent, color, label = "baxış" }) {
  return (
    <div className="progress-row">
      <div className="row-info">
        <div className="info-left">
          <span className="item-icon" style={{ color }}>
            {icon}
          </span>
          <span className="item-name">{name}</span>
        </div>
        <span className="item-count">
          {count} {label}
        </span>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-fill"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function DashCard({ title, icon, children, headerExtra }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3>
          {React.cloneElement(icon, { className: "head-icon" })}
          {title}
        </h3>
        {headerExtra}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

// ─── Ana Komponent ────────────────────────────────────────
function AnalysMain() {
  const [period, setPeriod] = useState("month");

  const planType = (localStorage.getItem("planType") || "sahibkar").toLowerCase();
  const showWorkerCard =
    planType === "biznes" || planType === "korporativ";

  /* ── İşçi sayı state ── */
  const [workerCount, setWorkerCount] = useState(12);
  const [editingWorker, setEditingWorker] = useState(false);
  const [workerDraft, setWorkerDraft] = useState("");

  const startEditWorker = () => {
    setWorkerDraft(String(workerCount));
    setEditingWorker(true);
  };
  const saveWorker = () => {
    const val = parseInt(workerDraft, 10);
    if (!isNaN(val) && val >= 0) setWorkerCount(val);
    setEditingWorker(false);
  };
  const cancelWorker = () => setEditingWorker(false);

  const multipliers = { week: 0.25, month: 1, "6months": 6, year: 12 };
  const m = multipliers[period];

  /* ── Giriş növləri ── */
  const scanTypes = [
    {
      label: "QR Skan",
      icon: <BsQrCode />,
      color: "#8b5cf6",
      count: Math.round(320 * m),
    },
    {
      label: "NFC Toxunma",
      icon: <TbNfc />,
      color: "#f59e0b",
      count: Math.round(180 * m),
    },
    {
      label: "Birbaşa Link",
      icon: <FiLink />,
      color: "#3b82f6",
      count: Math.round(750 * m),
    },
  ];

  /* ── Ümumi statistika ── */
  const summaryStats = [
    {
      title: "Ümumi Baxış",
      value: Math.round(1250 * m),
      icon: <FiEye />,
      color: "#10b981",
    },
    {
      title: "Linkə Keçidlər",
      value: Math.round(430 * m),
      icon: <FiTrendingUp />,
      color: "#3b82f6",
    },
  ];

  /* ── Mənbə məlumatları ── */
  const sourceData = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      count: Math.round(450 * m),
      percent: 55,
      color: "#E1306C",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      count: Math.round(150 * m),
      percent: 20,
      color: "#25D366",
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      count: Math.round(90 * m),
      percent: 15,
      color: "#1877F2",
    },
    {
      name: "Telegram",
      icon: <FaTelegram />,
      count: Math.round(50 * m),
      percent: 10,
      color: "#2CA5E0",
    },
  ];

  /* ── İşçilərin baxış sayı ── */
  const employeeViews = [
    { name: "Ali", views: Math.round(1000 * m), percent: 100 },
    { name: "Vali", views: Math.round(200 * m), percent: 20 },
    { name: "Nigar", views: Math.round(560 * m), percent: 56 },
    { name: "Kamran", views: Math.round(340 * m), percent: 34 },
    { name: "Leyla", views: Math.round(780 * m), percent: 78 },
  ];

  /* ── Cihazlar ── */
  const deviceData = [
    {
      name: "iOS (iPhone)",
      icon: <FaApple />,
      count: Math.round(520 * m),
      percent: 55,
      color: "#a8b2c1",
    },
    {
      name: "Android",
      icon: <FaAndroid />,
      count: Math.round(380 * m),
      percent: 40,
      color: "#3DDC84",
    },
    {
      name: "Masaüstü",
      icon: <FiMonitor />,
      count: Math.round(45 * m),
      percent: 5,
      color: "#3b82f6",
    },
  ];

  return (
    <div className="analys-main-modern">
      {/* ── BAŞLIQ VƏ FİLTRLƏR ── */}
      <div className="top-header">
        <div className="title-area">
          <h2 className="page-title">Analitika</h2>
          <p className="page-subtitle">
            Səhifənizin ziyarətçi statistikasını və mənbələrini detallı izləyin.
          </p>
        </div>
        <div className="period-filters">
          {["week", "month", "6months", "year"].map((p) => (
            <button
              key={p}
              className={period === p ? "active" : ""}
              onClick={() => setPeriod(p)}
            >
              {{ week: "Həftəlik", month: "Aylıq", "6months": "6 Aylıq", year: "İllik" }[p]}
            </button>
          ))}
        </div>
      </div>

      <div className="analys-content">
        {/* ── GİRİŞ NÖVLƏRİ ── */}
        <div className="section-block">
          <p className="section-label">Giriş növləri</p>
          <div className="scan-type-row">
            {showWorkerCard && (
              <div className="stat-card stat-card--worker">
                <div
                  className="stat-icon"
                  style={{
                    backgroundColor: "rgba(212,175,55,.12)",
                    color: "#d4af37",
                  }}
                >
                  <FiUsers />
                </div>
                <div className="stat-info">
                  <h4>İşçi Sayı</h4>
                  <div className="stat-bottom">
                    {editingWorker ? (
                      <div className="worker-edit">
                        <input
                          className="worker-input"
                          type="number"
                          min="0"
                          value={workerDraft}
                          onChange={(e) => setWorkerDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveWorker();
                            if (e.key === "Escape") cancelWorker();
                          }}
                          autoFocus
                        />
                        <button
                          className="worker-action worker-action--save"
                          onClick={saveWorker}
                        >
                          <FiCheck />
                        </button>
                        <button
                          className="worker-action worker-action--cancel"
                          onClick={cancelWorker}
                        >
                          <FiX />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="value">{workerCount}</span>
                        <button
                          className="worker-edit-btn"
                          onClick={startEditWorker}
                        >
                          <FiEdit2 />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {scanTypes.map((item, i) => (
              <StatCard
                key={i}
                icon={item.icon}
                label={item.label}
                value={item.count}
                color={item.color}
              />
            ))}
          </div>
        </div>

        {/* ── ÜMUMİ STATİSTİKA ── */}
        <div className="section-block">
          <p className="section-label">Ümumi</p>
          <div className="summary-cards-row">
            {summaryStats.map((stat, i) => (
              <StatCard
                key={i}
                icon={stat.icon}
                label={stat.title}
                value={stat.value}
                color={stat.color}
              />
            ))}
          </div>
        </div>

        {/* ── MƏNBƏ + CİHAZLAR ── */}
        <div className="dashboard-grid two-col">
          <DashCard
            title="Hansı vasitələrlə baxılıb?"
            icon={<FaGlobe />}
          >
            {sourceData.map((item, i) => (
              <ProgressRow
                key={i}
                icon={item.icon}
                name={item.name}
                count={item.count}
                percent={item.percent}
                color={item.color}
              />
            ))}
          </DashCard>

          <DashCard title="Cihazlar" icon={<FiSmartphone />}>
            {deviceData.map((item, i) => (
              <ProgressRow
                key={i}
                icon={item.icon}
                name={item.name}
                count={item.count}
                percent={item.percent}
                color={item.color}
              />
            ))}
          </DashCard>
        </div>

        {/* ── İŞÇİLƏRİN BAXIŞ SAYI ── */}
        {showWorkerCard && (
          <DashCard title="İşçilərin Baxış Sayı" icon={<FiUsers />}>
            {employeeViews.map((emp, i) => (
              <ProgressRow
                key={i}
                icon={<FiUsers />}
                name={emp.name}
                count={emp.views}
                percent={emp.percent}
                color="#d4af37"
                label="baxış"
              />
            ))}
          </DashCard>
        )}

      </div>
    </div>
  );
}

export default AnalysMain;
