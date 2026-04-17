import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./OrdersMain.scss";

// ─── Helpers ─────────────────────────────────────────────
const MONTHS_AZ = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr",
];
function fmtDate(d) {
  if (!d) return "—";
  const dt = d instanceof Date ? d : new Date(d);
  return `${dt.getDate()} ${MONTHS_AZ[dt.getMonth()]}`;
}
function fmtDateTime(d) {
  if (!d) return "—";
  const dt = d instanceof Date ? d : new Date(d);
  const h = String(dt.getHours()).padStart(2, "0");
  const m = String(dt.getMinutes()).padStart(2, "0");
  return `${dt.getDate()} ${MONTHS_AZ[dt.getMonth()]}, ${h}:${m}`;
}
function getNextWeekend() {
  const d = new Date();
  const day = d.getDay();
  const daysToSat = day === 6 ? 7 : day === 0 ? 6 : 6 - day;
  const sat = new Date(d); sat.setDate(d.getDate() + daysToSat);
  const sun = new Date(sat); sun.setDate(sat.getDate() + 1);
  return { sat, sun };
}

// ─── Static data ─────────────────────────────────────────
const METRO_STATIONS = [
  { id: "28may",   label: "28 May"  },
  { id: "genclik", label: "Gənclik" },
];
const TIME_SLOTS = [
  { label: "10:00 – 12:00", value: "10:00-12:00" },
  { label: "13:00 – 16:00", value: "13:00-16:00" },
  { label: "17:00 – 20:00", value: "17:00-20:00" },
];
const PAST_ORDERS = [
  {
    id: 1,
    order_number: "INS-2031584",
    package_name: "Korporativ",
    package_color: "#8b5cf6",
    user_count: 12,
    card_total: 415.8,
    monthly_total: 72.6,
    billing_label: "6 Aylıq",
    current_status: "delivered",
    current_status_display: "Çatdırıldı",
    created_at: new Date(2024, 2, 1, 10, 0),
    timeline: [
      { status: "ordered",   label: "Sifariş verildi",  is_done: true,  is_current: false, changed_at: new Date(2024,2,1,10,0)  },
      { status: "accepted",  label: "Qəbul edildi",     is_done: true,  is_current: false, changed_at: new Date(2024,2,2,9,30)  },
      { status: "printing",  label: "Çap edildi",       is_done: true,  is_current: false, changed_at: new Date(2024,2,4,14,0)  },
      { status: "packaging", label: "Qablaşdırıldı",    is_done: true,  is_current: false, changed_at: new Date(2024,2,5,11,0)  },
      { status: "courier",   label: "Kuryerə verildi",  is_done: true,  is_current: false, changed_at: new Date(2024,2,8,9,0)   },
      { status: "delivered", label: "Çatdırıldı",       is_done: true,  is_current: true,  changed_at: new Date(2024,2,9,14,45) },
    ],
  },
];

// ─── Stage icons ──────────────────────────────────────────
function StageIcon({ stageKey }) {
  const icons = {
    ordered:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    accepted:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><polyline points="20 6 9 17 4 12"/></svg>,
    printing:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><rect x="6" y="2" width="12" height="8"/><rect x="6" y="14" width="12" height="8"/><path d="M4 8h16v8H4z"/><circle cx="18" cy="12" r="1" fill="currentColor"/></svg>,
    packaging: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><path d="M21 10V20a1 1 0 01-1 1H4a1 1 0 01-1-1V10"/><rect x="1" y="6" width="22" height="4" rx="1"/><path d="M12 6V22"/></svg>,
    courier:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    delivered: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  };
  return icons[stageKey] || null;
}

// ─── Order Timeline ───────────────────────────────────────
function OrderTimeline({ timeline }) {
  return (
    <div className="order-timeline">
      {timeline.map((stage, idx) => {
        const isDone   = stage.is_done && !stage.is_current;
        const isActive = stage.is_current;
        return (
          <React.Fragment key={stage.status}>
            <div className={`stage-row ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
              <div className={`stage-circle ${isDone ? "done" : isActive ? "active" : "pending"}`}>
                {isDone
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>
                  : <StageIcon stageKey={stage.status} />}
              </div>
              <div className="stage-info">
                <span className="stage-label">{stage.label}</span>
                {stage.changed_at && (
                  <span className={`stage-time ${stage.is_done ? "actual" : "estimated"}`}>
                    {fmtDateTime(stage.changed_at)}
                  </span>
                )}
              </div>
            </div>
            {idx < timeline.length - 1 && (
              <div className={`stage-connector ${isDone ? "done" : ""}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────
export default function OrdersMain() {
  const location = useLocation();
  const newOrder = location.state?.isNew ? location.state : null;

  // Delivery form state
  const [deliveryTab,       setDeliveryTab]       = useState("metro");
  const [selectedStation,   setSelectedStation]   = useState(null);
  const [selectedSlot,      setSelectedSlot]      = useState("");
  const [phone,             setPhone]             = useState("");
  const [address,           setAddress]           = useState("");
  const [note,              setNote]              = useState("");
  const [submitLoading,     setSubmitLoading]     = useState(false);
  const [submitError,       setSubmitError]       = useState("");
  const [confirmed,         setConfirmed]         = useState(false);

  // Past orders list state
  const [selectedId, setSelectedId] = useState(PAST_ORDERS[0]?.id ?? null);
  const selectedPast = PAST_ORDERS.find((o) => o.id === selectedId);

  const { sat, sun } = getNextWeekend();
  const canConfirmMetro   = selectedStation && selectedSlot;
  const canConfirmAddress = address.trim() && selectedSlot;

  const handleConfirm = () => {
    setSubmitLoading(true); setSubmitError("");
    setTimeout(() => { setSubmitLoading(false); setConfirmed(true); }, 1200);
  };

  // ── NEW ORDER MODE ────────────────────────────────────────
  if (newOrder) {
    if (confirmed) {
      return (
        <div className="orders-wrap">
          <div className="order-confirmed-screen">
            <div className="order-confirmed-icon">✓</div>
            <h2>Sifariş qəbul edildi!</h2>
            <p className="order-confirmed-num">Sifariş nömrəsi: <strong>{newOrder.order_number}</strong></p>
            <p>Çatdırılma məlumatlarınız sisteme daxil edildi. Ən yaxın həftə sonu çatdırılma həyata keçiriləcək.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="orders-wrap">
        <div className="new-order-page">
          {/* ── Sol: order summary + delivery form ── */}
          <div className="new-order-left">
            {/* Order summary */}
            <div className="new-order-summary">
              <div className="new-order-summary-row main-row">
                <span className="nos-count">{newOrder.user_count} ədəd kart</span>
                <span className="nos-sep">·</span>
                <span className="nos-period">{newOrder.billing_months} aylıq aktivlik</span>
              </div>
              <div className="new-order-summary-row sub-row">
                <span>Sifariş nömrəsi: <strong>{newOrder.order_number}</strong></span>
                <span className="nos-pkg" style={{ color: newOrder.package_color }}>{newOrder.package_name}</span>
              </div>
              <div className="new-order-price-split">
                <div className="nos-price-item">
                  <span>Kart qiyməti</span>
                  <strong>
                    {newOrder.card_total.toFixed(2)}₼
                    {newOrder.card_dr > 0 && <em className="nos-dr">-{newOrder.card_dr}%</em>}
                  </strong>
                </div>
                <div className="nos-price-sep" />
                <div className="nos-price-item">
                  <span>Aylıq aktivlik ({newOrder.billing_label})</span>
                  <strong>{newOrder.monthly_total.toFixed(2)}₼</strong>
                </div>
              </div>
            </div>

            {/* Delivery point selection */}
            <div className="delivery-form-wrap">
              <h3 className="delivery-form-title">Sifariş məntəqəsini seç</h3>

              <div className="delivery-tabs">
                <button className={`tab-btn ${deliveryTab === "metro" ? "active" : ""}`} onClick={() => setDeliveryTab("metro")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9"/></svg>
                  Metro
                </button>
                <button className={`tab-btn ${deliveryTab === "address" ? "active" : ""}`} onClick={() => setDeliveryTab("address")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Ünvana
                </button>
              </div>

              {submitError && <div className="order-error-msg">{submitError}</div>}

              {/* Metro tab */}
              {deliveryTab === "metro" && (
                <div className="delivery-tab-content">
                  <p className="field-label">Metro stansiyası</p>
                  <div className="station-cards">
                    {METRO_STATIONS.map((st) => (
                      <button
                        key={st.id}
                        className={`station-card ${selectedStation?.id === st.id ? "selected" : ""}`}
                        onClick={() => { setSelectedStation(st); setSelectedSlot(""); }}
                      >
                        <span className="station-icon">M</span>
                        <span className="station-name">{st.label}</span>
                      </button>
                    ))}
                  </div>

                  {selectedStation && (
                    <>
                      <p className="field-label">Vaxt intervalı</p>
                      <div className="slot-list">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot.value}
                            className={`slot-card ${selectedSlot === slot.value ? "selected" : ""}`}
                            onClick={() => setSelectedSlot(slot.value)}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <p className="field-label">Əlaqə nömrəsi</p>
                  <div className="phone-input-wrap">
                    <span className="phone-prefix">+994</span>
                    <input type="tel" className="phone-input" placeholder="50 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                    />
                  </div>

                  <p className="field-label">Qeyd (istəyə bağlı)</p>
                  <textarea className="note-textarea" placeholder="Kuryer üçün əlavə məlumat..." value={note} onChange={(e) => setNote(e.target.value)} rows={3} />

                  {canConfirmMetro && (
                    <button className="confirm-btn" onClick={handleConfirm} disabled={submitLoading}>
                      {submitLoading ? "Göndərilir..." : "Sifarişi təsdiqlə"}
                    </button>
                  )}
                </div>
              )}

              {/* Address tab */}
              {deliveryTab === "address" && (
                <div className="delivery-tab-content">
                  <p className="field-label">Ünvan</p>
                  <input type="text" className="address-input" placeholder="Küçə, bina, mənzil nömrəsi..." value={address} onChange={(e) => setAddress(e.target.value)} />

                  <p className="field-label">Vaxt intervalı</p>
                  <div className="slot-list">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.value}
                        className={`slot-card ${selectedSlot === slot.value ? "selected" : ""}`}
                        onClick={() => setSelectedSlot(slot.value)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {slot.label}
                      </button>
                    ))}
                  </div>

                  <p className="field-label">Əlaqə nömrəsi</p>
                  <div className="phone-input-wrap">
                    <span className="phone-prefix">+994</span>
                    <input type="tel" className="phone-input" placeholder="50 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                    />
                  </div>

                  <p className="field-label">Qeyd (istəyə bağlı)</p>
                  <textarea className="note-textarea" placeholder="Kuryer üçün əlavə məlumat..." value={note} onChange={(e) => setNote(e.target.value)} rows={3} />

                  <div className="courier-note">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    <p>Çatdırılma kuryer vasitəsilə həyata keçirilir. Sifarişiniz yola çıxanda kuryerimiz sizinlə əlaqə saxlayıb çatdırılma haqqı barədə məlumat verəcək.</p>
                  </div>

                  {canConfirmAddress && (
                    <button className="confirm-btn" onClick={handleConfirm} disabled={submitLoading}>
                      {submitLoading ? "Göndərilir..." : "Sifarişi təsdiqlə"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Sağ: çatdırılma tarixi ── */}
          <div className="new-order-right">
            <div className="delivery-date-card">
              <div className="ddc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </div>
              <h4 className="ddc-title">Çatdırılma tarixi</h4>
              <p className="ddc-dates">
                <strong>{fmtDate(sat)}, Şənbə</strong><br />
                <span>və ya</span><br />
                <strong>{fmtDate(sun)}, Bazar</strong>
              </p>
              <p className="ddc-note">Kartlarınız ən yaxın həftə sonu çatdırılacaq.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── PAST ORDERS MODE ──────────────────────────────────────
  return (
    <div className="orders-wrap">
      <div className="orders-page">
        <div className="orders-left">
          <div className="orders-header">
            <h2 className="orders-title">Sifarişlərim</h2>
            <p className="orders-subtitle">{PAST_ORDERS.length} sifariş</p>
          </div>

          <div className="orders-list">
            {PAST_ORDERS.map((order) => (
              <div
                key={order.id}
                className={`order-card ${selectedId === order.id ? "active" : ""}`}
                onClick={() => setSelectedId(order.id)}
              >
                <div className="order-card-top">
                  <span className="order-card-num">№ {order.order_number}</span>
                  <span className={`order-badge status-${order.current_status}`}>{order.current_status_display}</span>
                </div>
                <div className="order-card-pkg" style={{ color: order.package_color }}>{order.package_name} paketi</div>
                <div className="order-card-meta">
                  <span>{order.user_count} kart</span>
                  <span>{order.card_total.toFixed(2)}₼ kart + {order.monthly_total.toFixed(2)}₼ abunə</span>
                  <span>{fmtDate(order.created_at)}</span>
                </div>
              </div>
            ))}
            {PAST_ORDERS.length === 0 && (
              <div className="orders-empty">
                <div className="orders-empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                </div>
                <p>Hələ sifariş yoxdur</p>
              </div>
            )}
          </div>
        </div>

        <div className="orders-right">
          {selectedPast ? (
            <>
              <div className="order-detail-header">
                <div>
                  <h3 className="order-detail-title">Sifariş detalları</h3>
                  <p className="order-detail-sub">№: <strong>{selectedPast.order_number}</strong> · {fmtDateTime(selectedPast.created_at)}</p>
                </div>
                <span className={`order-badge status-${selectedPast.current_status}`}>{selectedPast.current_status_display}</span>
              </div>

              <div className="order-detail-body">
                <div className="order-timeline-card">
                  <p className="detail-section-label">Sifariş statusu</p>
                  <OrderTimeline timeline={selectedPast.timeline} />
                </div>

                <div className="order-info-card">
                  <p className="detail-section-label">Sifariş məlumatları</p>
                  <div className="detail-row">
                    <span>Paket</span>
                    <strong style={{ color: selectedPast.package_color }}>{selectedPast.package_name}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Kart sayı</span>
                    <strong>{selectedPast.user_count} ədəd</strong>
                  </div>
                  <div className="detail-row">
                    <span>Kart qiyməti</span>
                    <strong>{selectedPast.card_total.toFixed(2)}₼</strong>
                  </div>
                  <div className="detail-row">
                    <span>Aylıq aktivlik</span>
                    <strong>{selectedPast.monthly_total.toFixed(2)}₼ / {selectedPast.billing_label}</strong>
                  </div>
                  <div className="detail-divider" />
                  <div className="detail-row total">
                    <span>Ümumi</span>
                    <strong>{(selectedPast.card_total + selectedPast.monthly_total).toFixed(2)}₼</strong>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="orders-no-select">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <p>Sifariş seçin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
