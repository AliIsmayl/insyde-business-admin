import React, { useState, useRef } from "react";
import {
  FiPlus,
  FiTrash2,
  FiTag,
  FiCheck,
  FiEdit2,
  FiX,
  FiSave,
  FiLink,
  FiExternalLink,
  FiDroplet,
  FiCheckCircle,
  FiAlertCircle,
  FiSlash,
  FiRefreshCw,
} from "react-icons/fi";
import "./CategoryMain.scss";

/* ─── POPUP ──────────────────────────────────────────────── */
const POPUP_CONFIG = {
  success: { Icon: FiCheckCircle, confirmClass: "popup__btn--success", defaultConfirm: "Əla", cancelable: false },
  update:  { Icon: FiRefreshCw,   confirmClass: "popup__btn--update",  defaultConfirm: "Yenilə", cancelable: true },
  delete:  { Icon: FiTrash2,      confirmClass: "popup__btn--delete",  defaultConfirm: "Sil", cancelable: true },
  error:   { Icon: FiAlertCircle, confirmClass: "popup__btn--error",   defaultConfirm: "Anladım", cancelable: false },
  block:   { Icon: FiSlash,       confirmClass: "popup__btn--block",   defaultConfirm: "Blokla", cancelable: true },
};

function Popup({ isOpen = false, type = "success", title = "", message = "", confirmText, cancelText = "Ləğv et", onConfirm, onCancel }) {
  const cfg = POPUP_CONFIG[type] ?? POPUP_CONFIG.success;
  const finalConfirmText = confirmText ?? cfg.defaultConfirm;

  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onCancel?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
      <div className="popup__overlay" onClick={onCancel} aria-hidden="true" />
      <div className={`popup popup--${type}`} role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <button className="popup__close" onClick={onCancel} aria-label="Bağla"><FiX /></button>
        <div className="popup__icon-wrap"><cfg.Icon className="popup__icon" /></div>
        <div className="popup__content">
          {title && <h3 id="popup-title" className="popup__title">{title}</h3>}
          {message && <p className="popup__message">{message}</p>}
        </div>
        <div className="popup__actions">
          {cfg.cancelable && (
            <button className="popup__btn popup__btn--cancel" onClick={onCancel}>{cancelText}</button>
          )}
          <button className={`popup__btn ${cfg.confirmClass}`} onClick={() => onConfirm?.()}>{finalConfirmText}</button>
        </div>
      </div>
    </>
  );
}

/* ─── Rəng paleti (20 rəng) ──────────────────────────────── */
const PALETTE_COLORS = [
  "#ffffff", "#e5e7eb", "#9ca3af", "#4b5563", "#111827",
  "#ffd700", "#d4af37", "#b8860b",
  "#60a5fa", "#2563eb", "#1e3a8a",
  "#34d399", "#10b981", "#065f46",
  "#f87171", "#dc2626",
  "#ec4899", "#a78bfa", "#7c3aed",
  "#fb923c",
];

function isValidUrl(str) {
  if (!str?.trim()) return false;
  try {
    const u = new URL(str.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch { return false; }
}

function isLightColor(hex) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16),
        g = parseInt(c.slice(2, 4), 16),
        b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

/* ─── İlkin məlumatlar ───────────────────────────────────── */
const initialLinks = [
  { id: 1, name: "Instagram", url: "https://instagram.com/myprofile" },
  { id: 2, name: "Şirkət vebsaytı", url: "https://company.az" },
  { id: 3, name: "LinkedIn", url: "https://linkedin.com/company/mycompany" },
];

const LINK_OPTIONS = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "WhatsApp",
  "Telegram",
  "YouTube",
  "TikTok",
  "Telefon",
  "E-poçt",
  "Vebsayt",
  "SMS",
  "Xüsusi Link",
];

/* ─── Əsas komponent ─────────────────────────────────────── */
export default function CategoryMain() {
  const [popup, setPopup] = useState({ isOpen: false, type: "success" });
  const closePopup = () => setPopup((p) => ({ ...p, isOpen: false }));

  /* links */
  const [links, setLinks] = useState(initialLinks);
  const [addName, setAddName] = useState("");
  const [addUrl,  setAddUrl]  = useState("");
  const [editId,  setEditId]  = useState(null);
  const [editName, setEditName] = useState("");
  const [editUrl,  setEditUrl]  = useState("");

  /* color */
  const [appliedColor,  setAppliedColor]  = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [customColor,   setCustomColor]   = useState("#d4af37");
  const colorInputRef = useRef(null);

  /* derived */
  const addUrlOk  = isValidUrl(addUrl);
  const canAdd    = addName.trim() && addUrl.trim() && addUrlOk;
  const editUrlOk = isValidUrl(editUrl);
  const canSave   = editName.trim() && editUrl.trim() && editUrlOk;
  const colorChanged = selectedColor && selectedColor !== appliedColor;

  /* ── Link əlavə et ── */
  const handleAdd = () => {
    if (!canAdd) return;
    setLinks((p) => [...p, { id: Date.now(), name: addName.trim(), url: addUrl.trim() }]);
    setAddName("");
    setAddUrl("");
    setPopup({
      isOpen: true, type: "success",
      title: "Link əlavə edildi!",
      message: `"${addName.trim()}" uğurla siyahıya əlavə edildi.`,
      confirmText: "Əla",
      onConfirm: closePopup,
    });
  };

  const startEdit = (link) => {
    setEditId(link.id);
    setEditName(link.name);
    setEditUrl(link.url);
  };
  const cancelEdit = () => { setEditId(null); setEditName(""); setEditUrl(""); };

  /* ── Link redaktəsi ── */
  const saveEdit = () => {
    if (!canSave) return;
    setPopup({
      isOpen: true, type: "update",
      title: "Dəyişiklikləri tətbiq et?",
      message: `"${editName.trim()}" linkinin məlumatları yenilənəcək.`,
      confirmText: "Yenilə",
      onConfirm: () => {
        setLinks((p) =>
          p.map((l) => l.id === editId ? { ...l, name: editName.trim(), url: editUrl.trim() } : l)
        );
        cancelEdit();
        closePopup();
      },
    });
  };

  /* ── Link sil ── */
  const openDeletePopup = (id) => {
    const target = links.find((l) => l.id === id);
    setPopup({
      isOpen: true, type: "delete",
      title: "Silmək istədiyinizdən əminsiniz?",
      message: `"${target?.name}" linki silinəcək. Bu əməliyyat geri alına bilməz.`,
      confirmText: "Sil",
      onConfirm: () => { setLinks((p) => p.filter((l) => l.id !== id)); closePopup(); },
    });
  };

  /* ── Rəng ── */
  const handleColorSelect = (c) => { setSelectedColor(c); setCustomColor(c); };
  const handleCustomColorChange = (e) => { setCustomColor(e.target.value); setSelectedColor(e.target.value); };
  const applyColor = () => {
    if (!colorChanged) return;
    setPopup({
      isOpen: true, type: "success",
      title: "Rəng tətbiq edildi!",
      message: `${selectedColor.toUpperCase()} rəngi profil səhifənizə tətbiq edildi.`,
      confirmText: "Əla",
      onConfirm: () => { setAppliedColor(selectedColor); closePopup(); },
    });
  };

  /* ── RENDER ── */
  return (
    <div className="cat">

      {/* ══ HEADER ══ */}
      <div className="cat__header">
        <div>
          <h2 className="cat__title">Linklər</h2>
          <p className="cat__sub">Profil linklərinizi əlavə edin və idarə edin.</p>
        </div>
        <div className="cat__stat">
          <FiTag />
          <span>{links.length} link</span>
        </div>
      </div>

      {/* ══ LAYOUT: FORM + LIST ══ */}
      <div className="cat__layout">

        {/* ─ Form ─ */}
        <div className="cat__form-card">
          <div className="cat__form-title"><FiPlus /> Yeni Link</div>

          <div className="cat__field">
            <label>Link</label>
            <select
              className="cat__input"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
            >
              <option value="">Link seçin</option>
              {LINK_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="cat__field">
            <label>URL</label>
            <div className="cat__input-wrap">
              <FiLink className="cat__input-icon" />
              <input
                type="text"
                className={`cat__input cat__input--icon ${addUrl && !addUrlOk ? "cat__input--error" : ""}`}
                placeholder="https://..."
                value={addUrl}
                onChange={(e) => setAddUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
              {addUrl && !addUrlOk && <span className="cat__input-err"><FiX size={12} /></span>}
              {addUrl && addUrlOk  && <span className="cat__input-ok"><FiCheck size={12} /></span>}
            </div>
            {addUrl && !addUrlOk && <span className="cat__field-err">Düzgün URL daxil edin (https://...)</span>}
          </div>

          {addName && addUrl && addUrlOk && (
            <div className="cat__preview">
              <div className="cat__preview-icon"><FiLink /></div>
              <div className="cat__preview-info">
                <span className="cat__preview-name">{addName}</span>
                <span className="cat__preview-link"><FiLink size={10} />{addUrl}</span>
              </div>
            </div>
          )}

          <button className="cat__add-btn" onClick={handleAdd} disabled={!canAdd}>
            <FiPlus /> Əlavə Et
          </button>
        </div>

        {/* ─ List ─ */}
        <div className="cat__list-card">
          <div className="cat__list-header">
            Əlavə Edilmiş Linklər
            <span className="cat__list-count">{links.length}</span>
          </div>

          {links.length === 0 && (
            <div className="cat__empty">
              <FiTag />
              <p>Hələ link əlavə edilməyib.</p>
            </div>
          )}

          <div className="cat__list">
            {links.map((link) => {
              const isEditing = editId === link.id;
              return (
                <div key={link.id} className={`cat__item ${isEditing ? "cat__item--editing" : ""}`}>
                  {isEditing ? (
                    <div className="cat__edit-body">
                      <div className="cat__edit-fields">
                        <div className="cat__field">
                          <label>Link</label>
                          <select
                            className="cat__input cat__input--sm"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          >
                            <option value="">Link seçin</option>
                            {LINK_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="cat__field">
                          <label>URL</label>
                          <div className="cat__input-wrap">
                            <FiLink className="cat__input-icon" />
                            <input
                              type="text"
                              className={`cat__input cat__input--sm cat__input--icon ${editUrl && !editUrlOk ? "cat__input--error" : ""}`}
                              placeholder="https://..."
                              value={editUrl}
                              onChange={(e) => setEditUrl(e.target.value)}
                            />
                            {editUrl && !editUrlOk && <span className="cat__input-err"><FiX size={12} /></span>}
                            {editUrl &&  editUrlOk  && <span className="cat__input-ok"><FiCheck size={12} /></span>}
                          </div>
                        </div>
                      </div>
                      <div className="cat__edit-actions">
                        <button className="cat__icon-btn cat__icon-btn--save" onClick={saveEdit} disabled={!canSave} title="Yenilə">
                          <FiSave />
                        </button>
                        <button className="cat__icon-btn cat__icon-btn--cancel" onClick={cancelEdit} title="Ləğv">
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="cat__item-left">
                        <div className="cat__icon-box"><FiLink /></div>
                        <div className="cat__item-info">
                          <span className="cat__item-name">{link.name}</span>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cat__item-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiLink size={10} />
                            <span>{link.url}</span>
                            <FiExternalLink size={9} />
                          </a>
                        </div>
                      </div>
                      <div className="cat__item-actions">
                        <button className="cat__icon-btn cat__icon-btn--edit" onClick={() => startEdit(link)} title="Düzəliş et">
                          <FiEdit2 />
                        </button>
                        <button className="cat__icon-btn cat__icon-btn--del" onClick={() => openDeletePopup(link.id)} title="Sil">
                          <FiTrash2 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ RƏNG PALETİ ══ */}
      <div className="cat__color-section">
        <div className="cat__color-section-head">
          <FiDroplet />
          <div>
            <h3 className="cat__color-section-title">Rəng Paleti</h3>
            <p className="cat__color-section-sub">Profil səhifəniz üçün əsas rəng seçin.</p>
          </div>
        </div>

        <div className="cat__palette-flat">
          {PALETTE_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`cat__color-swatch ${selectedColor === c ? "cat__color-swatch--active" : ""} ${appliedColor === c && selectedColor !== c ? "cat__color-swatch--applied" : ""}`}
              style={{ background: c }}
              onClick={() => handleColorSelect(c)}
              title={c}
            >
              {selectedColor === c && (
                <FiCheck className="cat__swatch-check" style={{ color: isLightColor(c) ? "#000" : "#fff" }} />
              )}
            </button>
          ))}
        </div>

        <div className="cat__custom-color">
          <div className="cat__custom-color-label">
            <span>Öz rəng kodunuzu daxil edin</span>
            {selectedColor && (
              <span className="cat__custom-color-hex">{selectedColor.toUpperCase()}</span>
            )}
          </div>
          <div className="cat__custom-color-row">
            <div
              className="cat__color-picker-trigger"
              style={{ background: customColor }}
              onClick={() => colorInputRef.current?.click()}
            >
              <input
                ref={colorInputRef}
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="cat__color-input"
              />
            </div>
            <input
              type="text"
              className="cat__input cat__input--sm cat__input--hex"
              placeholder="#000000"
              value={customColor}
              maxLength={7}
              onChange={(e) => {
                const v = e.target.value;
                setCustomColor(v);
                if (/^#[0-9a-fA-F]{6}$/.test(v)) setSelectedColor(v);
              }}
            />
            {selectedColor && (
              <div
                className="cat__selected-dot"
                style={{ background: selectedColor }}
                title={`Seçilən: ${selectedColor}`}
              />
            )}
          </div>
        </div>

        <button
          className={`cat__apply-color-btn ${colorChanged ? "cat__apply-color-btn--active" : ""}`}
          onClick={applyColor}
          disabled={!colorChanged}
        >
          <span
            className="cat__apply-color-dot"
            style={{ background: colorChanged ? selectedColor : appliedColor || "transparent" }}
          />
          {!colorChanged && appliedColor ? "Rəng tətbiq edilib" : "Rəngi Tətbiq Et"}
        </button>
      </div>

      {/* ══ POPUP ══ */}
      <Popup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        confirmText={popup.confirmText}
        cancelText="Ləğv et"
        onConfirm={() => { popup.onConfirm?.(); }}
        onCancel={closePopup}
      />
    </div>
  );
}
