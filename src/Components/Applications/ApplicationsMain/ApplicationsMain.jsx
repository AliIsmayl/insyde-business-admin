import React, { useState, useEffect } from "react";
import {
  FiSend,
  FiChevronDown,
  FiBell,
  FiMessageSquare,
  FiBriefcase,
  FiCheck,
  FiX,
  FiClock,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiUsers,
  FiCheckCircle,
  FiTrash2,
  FiSlash,
} from "react-icons/fi";
import "./ApplicationsMain.scss";

/* ─── POPUP COMPONENT ───────────────────────────────────── */

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
      <div className="popup__overlay" onClick={onCancel} aria-hidden="true" />
      <div
        className={`popup popup--${type}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <button className="popup__close" onClick={onCancel} aria-label="Bağla">
          <FiX />
        </button>
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

/* ─── MOCK DATA ─────────────────────────────────────────── */

const previousApplications = [
  {
    id: 1,
    title: "assasa",
    status: "Açıq",
    date: "06-03-2026",
    content: "Salam, bu bir sınaq mesajıdır.",
    reply: "",
  },
  {
    id: 2,
    title: "Sistem xətası barədə",
    status: "Cavablandı",
    date: "05-03-2026",
    content: "Dünən giriş edərkən xəta ilə qarşılaşdım.",
    reply: "Müraciətiniz üçün təşəkkürlər. Xəta aradan qaldırıldı.",
  },
];

const initialAdminMessages = [
  {
    id: 1,
    title: "Sistem yeniləməsi haqqında",
    date: "07-03-2026",
    content:
      "Hörmətli istifadəçi, sistemimiz 10 mart 2026 tarixində texniki yeniləmə keçirəcək. Bu müddətdə qısa fasilə ola bilər.",
    isRead: false,
    userReply: "",
  },
  {
    id: 2,
    title: "Premium paketiniz yeniləndi",
    date: "04-03-2026",
    content:
      "Paketiniz uğurla yeniləndi. Yeni funksiyalardan istifadə edə bilərsiniz.",
    isRead: true,
    userReply: "Təşəkkürlər, yeni funksiyalar çox faydalıdır!",
  },
];

const initialWorkerRequests = [
  {
    id: 1,
    name: "Elçin Məmmədov",
    email: "elcin@example.com",
    phone: "+994 50 123 45 67",
    position: "Frontend Developer",
    note: "PM Systems-in inkişaf departamentində çalışıram. Hesabımı şirkətimizə bağlamaq istəyirəm.",
    date: "08-03-2026",
    status: "pending",
    adminNote: "",
  },
  {
    id: 2,
    name: "Nigar Həsənova",
    email: "nigar@pmsystems.az",
    phone: "+994 55 987 65 43",
    position: "UX Designer",
    note: "Dizayn komandasındayam, korporativ profilimi aktivləşdirmək istəyirəm.",
    date: "07-03-2026",
    status: "approved",
    adminNote: "Xoş gəldiniz! Hesabınız şirkətimizə uğurla bağlandı.",
  },
  {
    id: 3,
    name: "Tural Əliyev",
    email: "tural@gmail.com",
    phone: "+994 70 456 78 90",
    position: "Mühasib",
    note: "",
    date: "06-03-2026",
    status: "rejected",
    adminNote:
      "Sistem üzrə mühasib vəzifəsi mövcud deyil. Zəhmət olmasa HR ilə əlaqə saxlayın.",
  },
];

const STATUS = {
  pending: { label: "Gözləyir", color: "orange", Icon: FiClock },
  approved: { label: "Qəbul edildi", color: "green", Icon: FiCheck },
  rejected: { label: "Rədd edildi", color: "red", Icon: FiX },
};

/* ─── COMPONENT ─────────────────────────────────────────── */
function ApplicationsMain() {
  const [activeTab, setActiveTab] = useState("applications");
  const [accordion, setAccordion] = useState(null);

  /* ── Popup state ── */
  const [popup, setPopup] = useState({ isOpen: false, type: "success" });
  const closePopup = () => setPopup((p) => ({ ...p, isOpen: false }));

  /* Tab 1 */
  const [formData, setFormData] = useState({
    type: "Təklif",
    title: "",
    message: "",
  });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* Tab 1 — Form göndər → success popup */
  const handleSubmit = (e) => {
    e.preventDefault();
    setPopup({
      isOpen: true,
      type: "success",
      title: "Müraciət göndərildi!",
      message: "Müraciətiniz qeydə alındı. Tezliklə cavablandırılacaq.",
      confirmText: "Əla",
      onConfirm: () => {
        setFormData({ type: "Təklif", title: "", message: "" });
        closePopup();
      },
    });
  };

  /* Tab 2 */
  const [adminMsgs, setAdminMsgs] = useState(initialAdminMessages);
  const [replyText, setReplyText] = useState({});
  const [openReply, setOpenReply] = useState(null);
  const unreadCount = adminMsgs.filter((m) => !m.isRead).length;

  const openAdminMsg = (id) => {
    setAdminMsgs((p) =>
      p.map((m) => (m.id === id ? { ...m, isRead: true } : m)),
    );
    toggle("adm_" + id);
  };

  /* Tab 2 — Cavab göndər → success popup */
  const sendReply = (id) => {
    const txt = replyText[id]?.trim();
    if (!txt) return;
    setAdminMsgs((p) =>
      p.map((m) => (m.id === id ? { ...m, userReply: txt } : m)),
    );
    setReplyText((p) => ({ ...p, [id]: "" }));
    setOpenReply(null);
    setPopup({
      isOpen: true,
      type: "success",
      title: "Cavab göndərildi!",
      message: "Cavabınız adminə uğurla çatdırıldı.",
      confirmText: "Əla",
      onConfirm: closePopup,
    });
  };

  /* Tab 3 */
  const [workers, setWorkers] = useState(initialWorkerRequests);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const pendingCount = workers.filter((w) => w.status === "pending").length;

  /* Tab 3 — İşçini qəbul et → success popup */
  const approveWorker = (id) => {
    const worker = workers.find((w) => w.id === id);
    setPopup({
      isOpen: true,
      type: "success",
      title: "Sorğu qəbul edildi!",
      message: `${worker?.name} şirkət profilinizə uğurla əlavə edildi.`,
      confirmText: "Əla",
      onConfirm: () => {
        setWorkers((p) =>
          p.map((w) =>
            w.id === id
              ? {
                  ...w,
                  status: "approved",
                  adminNote:
                    "Xoş gəldiniz! Hesabınız şirkətimizə uğurla bağlandı.",
                }
              : w,
          ),
        );
        closePopup();
      },
    });
  };

  const openRejectModal = (id) => {
    setRejectModal(id);
    setRejectNote("");
  };

  /* Tab 3 — İşçini rədd et → inline modal saxlanıldı, sonra success popup */
  const confirmReject = () => {
    if (!rejectNote.trim()) return;
    const worker = workers.find((w) => w.id === rejectModal);
    const note = rejectNote.trim();
    const id = rejectModal;
    setRejectModal(null);
    setRejectNote("");
    setPopup({
      isOpen: true,
      type: "error",
      title: "Sorğu rədd edildi",
      message: `${worker?.name} adlı istifadəçinin sorğusu rədd edildi. Bildiriş göndərildi.`,
      confirmText: "Anladım",
      onConfirm: () => {
        setWorkers((p) =>
          p.map((w) =>
            w.id === id ? { ...w, status: "rejected", adminNote: note } : w,
          ),
        );
        closePopup();
      },
    });
  };

  /* accordion helper */
  const toggle = (key) => setAccordion((p) => (p === key ? null : key));
  const isOpen = (key) => accordion === key;

  /* ── RENDER ── */
  return (
    <div className="apm">
      {/* HEADER */}
      <div className="apm__header">
        <h2 className="apm__title">Müraciətlər</h2>
        <p className="apm__subtitle">
          Şikayət, təklif və işçi qoşulma sorğularını idarə edin
        </p>
      </div>

      {/* TABS */}
      <div className="apm__tabs">
        {[
          {
            key: "applications",
            icon: <FiMessageSquare />,
            label: "Müraciətlər",
          },
          {
            key: "workers",
            icon: <FiUsers />,
            label: "İşçi Sorğuları",
            badge: pendingCount,
            badgeColor: "orange",
          },
          {
            key: "admin",
            icon: <FiBell />,
            label: "Admin Mesajları",
            badge: unreadCount,
            badgeColor: "red",
          },
        ].map(({ key, icon, label, badge, badgeColor }) => (
          <button
            key={key}
            className={`apm__tab ${activeTab === key ? "apm__tab--active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {icon}
            <span>{label}</span>
            {badge > 0 && (
              <span className={`apm__badge apm__badge--${badgeColor}`}>
                {badge}
              </span>
            )}
          </button>
        ))}
        <span className={`apm__slider apm__slider--${activeTab}`} />
      </div>

      {/* ════════════════════════════════
          TAB 1 — MÜRACİƏTLƏR
      ════════════════════════════════ */}
      {activeTab === "applications" && (
        <div className="apm__grid">
          <div className="apm__card">
            <div className="apm__card-head">
              <h3>Şikayət və Təklif</h3>
              <p>Probleminiz və ya ideyanız varsa bizə yazın.</p>
            </div>
            <form className="apm__form" onSubmit={handleSubmit}>
              <div className="apm__row">
                <div className="apm__field">
                  <label>Müraciət növü</label>
                  <div className="apm__sel-wrap">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option>Təklif</option>
                      <option>Şikayət</option>
                      <option>Sual</option>
                      <option>Digər</option>
                    </select>
                    <FiChevronDown className="apm__sel-icon" />
                  </div>
                </div>
                <div className="apm__field apm__field--grow">
                  <label>Başlıq (istəyə görə)</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Məs: Ödəniş problemi..."
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="apm__field">
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Mesajınızı bura daxil edin..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="apm__actions">
                <button type="submit" className="apm__btn-primary">
                  <FiSend /> Göndər
                </button>
              </div>
            </form>
          </div>

          <div className="apm__card">
            <div className="apm__card-head">
              <h3>Əvvəlki Müraciətlər</h3>
              <p>Göndərdiyiniz müraciətlər və cavablar.</p>
            </div>
            <div className="apm__acc-list">
              {previousApplications.map((app, i) => {
                const k = "app_" + i;
                return (
                  <div
                    key={app.id}
                    className={`apm__acc ${isOpen(k) ? "apm__acc--open" : ""}`}
                  >
                    <div className="apm__acc-head" onClick={() => toggle(k)}>
                      <div className="apm__acc-left">
                        <span
                          className={`apm__dot apm__dot--${app.status === "Cavablandı" ? "green" : "orange"}`}
                        />
                        <span className="apm__acc-title">{app.title}</span>
                      </div>
                      <FiChevronDown className="apm__chevron" />
                    </div>
                    <div className="apm__acc-body">
                      <div className="apm__msg-block">
                        <span className="apm__label">Sizin mesajınız</span>
                        <p>{app.content}</p>
                        <span className="apm__date">{app.date}</span>
                      </div>
                      {app.reply && (
                        <div className="apm__msg-block apm__msg-block--green">
                          <span className="apm__label">Cavab</span>
                          <p>{app.reply}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════
          TAB 2 — İŞÇİ QOŞULMA SORĞULARI
      ════════════════════════════════ */}
      {activeTab === "workers" && (
        <div className="apm__single">
          <div className="apm__card">
            <div className="apm__card-head">
              <div className="apm__card-icon">
                <FiUsers />
              </div>
              <div>
                <h3>İşçi Qoşulma Sorğuları</h3>
                <p>
                  Aşağıdakı istifadəçilər sizin şirkətinizdə çalışdıqlarını
                  bildirərək hesablarını biznes profilinizə bağlamağı tələb
                  edirlər. Hər sorğunu nəzərdən keçirib qəbul və ya rədd edə
                  bilərsiniz.
                </p>
              </div>
            </div>

            <div className="apm__summary">
              {[
                {
                  label: "Gözləyir",
                  val: workers.filter((w) => w.status === "pending").length,
                  color: "orange",
                },
                {
                  label: "Qəbul edildi",
                  val: workers.filter((w) => w.status === "approved").length,
                  color: "green",
                },
                {
                  label: "Rədd edildi",
                  val: workers.filter((w) => w.status === "rejected").length,
                  color: "red",
                },
                { label: "Cəmi", val: workers.length, color: "muted" },
              ].map(({ label, val, color }) => (
                <div
                  key={label}
                  className={`apm__sum-item apm__sum-item--${color}`}
                >
                  <span className="apm__sum-val">{val}</span>
                  <span className="apm__sum-label">{label}</span>
                </div>
              ))}
            </div>

            <div className="apm__acc-list">
              {workers.map((w) => {
                const k = "wrk_" + w.id;
                const st = STATUS[w.status];
                return (
                  <div
                    key={w.id}
                    className={`apm__acc apm__acc--worker apm__acc--${w.status} ${isOpen(k) ? "apm__acc--open" : ""}`}
                  >
                    <div className="apm__acc-head" onClick={() => toggle(k)}>
                      <div className="apm__acc-left">
                        <span className={`apm__chip apm__chip--${st.color}`}>
                          <st.Icon /> {st.label}
                        </span>
                        <div className="apm__worker-info">
                          <span className="apm__acc-title">{w.name}</span>
                          <span className="apm__acc-sub">{w.position}</span>
                        </div>
                      </div>
                      <div className="apm__acc-right">
                        <span className="apm__date">{w.date}</span>
                        <FiChevronDown className="apm__chevron" />
                      </div>
                    </div>

                    <div className="apm__acc-body">
                      <div className="apm__worker-details">
                        <div className="apm__detail-row">
                          <FiUser />
                          <div>
                            <span className="apm__label">Ad Soyad</span>
                            <span className="apm__detail-val">{w.name}</span>
                          </div>
                        </div>
                        <div className="apm__detail-row">
                          <FiMail />
                          <div>
                            <span className="apm__label">E-mail</span>
                            <span className="apm__detail-val">{w.email}</span>
                          </div>
                        </div>
                        <div className="apm__detail-row">
                          <FiPhone />
                          <div>
                            <span className="apm__label">Telefon</span>
                            <span className="apm__detail-val">{w.phone}</span>
                          </div>
                        </div>
                        <div className="apm__detail-row">
                          <FiBriefcase />
                          <div>
                            <span className="apm__label">Vəzifə</span>
                            <span className="apm__detail-val">
                              {w.position}
                            </span>
                          </div>
                        </div>
                      </div>

                      {w.status !== "pending" && w.adminNote && (
                        <div
                          className={`apm__admin-response apm__admin-response--${w.status}`}
                        >
                          <span className="apm__label">
                            {w.status === "approved"
                              ? "Qəbul qeydi"
                              : "Rədd səbəbi"}
                          </span>
                          <p>{w.adminNote}</p>
                        </div>
                      )}

                      {w.status === "pending" && (
                        <div className="apm__worker-actions">
                          <button
                            className="apm__btn-approve"
                            onClick={() => approveWorker(w.id)}
                          >
                            <FiCheck /> Qəbul et
                          </button>
                          <button
                            className="apm__btn-reject"
                            onClick={() => openRejectModal(w.id)}
                          >
                            <FiX /> Rədd et
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════
          TAB 3 — ADMİN MESAJLARI
      ════════════════════════════════ */}
      {activeTab === "admin" && (
        <div className="apm__single">
          <div className="apm__card">
            <div className="apm__card-head">
              <h3>Admin Mesajları</h3>
              <p>Superadmin tərəfindən göndərilən bildiriş və mesajlar.</p>
            </div>
            <div className="apm__acc-list">
              {adminMsgs.map((msg) => {
                const k = "adm_" + msg.id;
                return (
                  <div
                    key={msg.id}
                    className={`apm__acc ${isOpen(k) ? "apm__acc--open" : ""} ${!msg.isRead ? "apm__acc--unread" : ""}`}
                  >
                    <div
                      className="apm__acc-head"
                      onClick={() => openAdminMsg(msg.id)}
                    >
                      <div className="apm__acc-left">
                        {!msg.isRead && (
                          <span className="apm__dot apm__dot--red apm__dot--pulse" />
                        )}
                        <span className="apm__acc-title">{msg.title}</span>
                      </div>
                      <div className="apm__acc-right">
                        <span className="apm__date">{msg.date}</span>
                        <FiChevronDown className="apm__chevron" />
                      </div>
                    </div>
                    <div className="apm__acc-body">
                      <div className="apm__bubble apm__bubble--admin">
                        <span className="apm__bubble-label">Admin</span>
                        <p>{msg.content}</p>
                        <span className="apm__date">{msg.date}</span>
                      </div>
                      {msg.userReply && (
                        <div className="apm__bubble apm__bubble--user">
                          <span className="apm__bubble-label">Siz</span>
                          <p>{msg.userReply}</p>
                        </div>
                      )}
                      {openReply === msg.id ? (
                        <div className="apm__reply-area">
                          <textarea
                            rows="3"
                            placeholder="Cavabınızı yazın..."
                            value={replyText[msg.id] || ""}
                            onChange={(e) =>
                              setReplyText((p) => ({
                                ...p,
                                [msg.id]: e.target.value,
                              }))
                            }
                          />
                          <div className="apm__reply-btns">
                            <button
                              className="apm__btn-ghost"
                              onClick={() => setOpenReply(null)}
                            >
                              Ləğv et
                            </button>
                            <button
                              className="apm__btn-primary apm__btn-primary--sm"
                              onClick={() => sendReply(msg.id)}
                            >
                              <FiSend /> Göndər
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="apm__reply-trigger"
                          onClick={() => setOpenReply(msg.id)}
                        >
                          <FiMessageSquare />
                          {msg.userReply ? "Yenidən cavabla" : "Cavabla"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════
          RƏDD MODAL (inline — səbəb daxil etmək üçün)
      ════════════════════════════════ */}
      {rejectModal !== null && (
        <>
          <div className="apm__overlay" onClick={() => setRejectModal(null)} />
          <div className="apm__modal">
            <div className="apm__modal-icon-wrap">
              <FiAlertCircle />
            </div>
            <h3 className="apm__modal-title">Sorğunu Rədd et</h3>
            <p className="apm__modal-desc">
              Rədd etmə səbəbini daxil edin. Bu məlumat işçiyə göndəriləcək.
            </p>
            <div className="apm__field">
              <label>Rədd edilmə səbəbi</label>
              <textarea
                rows="4"
                placeholder="Məs: Bu vəzifə üzrə artıq işçimiz var."
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
              />
            </div>
            <div className="apm__modal-actions">
              <button
                className="apm__btn-ghost"
                onClick={() => setRejectModal(null)}
              >
                Ləğv et
              </button>
              <button
                className="apm__btn-reject"
                onClick={confirmReject}
                disabled={!rejectNote.trim()}
              >
                <FiX /> Rədd et
              </button>
            </div>
          </div>
        </>
      )}

      {/* ════════════════════════════════
          GLOBAL POPUP
      ════════════════════════════════ */}
      <Popup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        confirmText={popup.confirmText}
        cancelText="Ləğv et"
        onConfirm={() => {
          popup.onConfirm?.();
        }}
        onCancel={closePopup}
      />
    </div>
  );
}

export default ApplicationsMain;
