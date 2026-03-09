import React, { useState, useRef, useEffect } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaTelegram,
  FaWhatsapp,
  FaPinterest,
  FaSnapchatGhost,
  FaReddit,
  FaDiscord,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";
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
  FiChevronDown,
  FiUpload,
  FiImage,
  FiDroplet,
  FiSun,
  FiMoon,
  FiMonitor,
} from "react-icons/fi";
import "./CategoryMain.scss";

/* ── Platform kataloqu ─────────────────────────────────────────── */
const PLATFORMS = [
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "facebook", label: "Facebook", Icon: FaFacebook },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin },
  { key: "twitter", label: "X / Twitter", Icon: FaTwitter },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok },
  { key: "telegram", label: "Telegram", Icon: FaTelegram },
  { key: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp },
  { key: "pinterest", label: "Pinterest", Icon: FaPinterest },
  { key: "snapchat", label: "Snapchat", Icon: FaSnapchatGhost },
  { key: "reddit", label: "Reddit", Icon: FaReddit },
  { key: "discord", label: "Discord", Icon: FaDiscord },
  { key: "github", label: "GitHub", Icon: FaGithub },
  { key: "website", label: "Vebsayt", Icon: FaGlobe },
];

/* ── Rəng paleti — qruplar üzrə ───────────────────────────────── */
const COLOR_GROUPS = [
  {
    label: "Tünd",
    colors: [
      "#0a0a0a",
      "#111827",
      "#1f2937",
      "#374151",
      "#4b5563",
      "#6b7280",
      "#9ca3af",
    ],
  },
  {
    label: "Açıq",
    colors: [
      "#ffffff",
      "#f9fafb",
      "#f3f4f6",
      "#e5e7eb",
      "#d1d5db",
      "#c7ccd4",
      "#b0b8c4",
    ],
  },
  {
    label: "Qızılı",
    colors: [
      "#ffd700",
      "#c8a75e",
      "#b8860b",
      "#a07830",
      "#8b6914",
      "#7a5c10",
      "#5c420a",
    ],
  },
  {
    label: "Mavi",
    colors: [
      "#dbeafe",
      "#93c5fd",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#1e3a8a",
      "#172554",
    ],
  },
  {
    label: "Yaşıl",
    colors: [
      "#d1fae5",
      "#6ee7b7",
      "#34d399",
      "#10b981",
      "#059669",
      "#065f46",
      "#022c22",
    ],
  },
  {
    label: "Qırmızı",
    colors: [
      "#fee2e2",
      "#fca5a5",
      "#f87171",
      "#ef4444",
      "#dc2626",
      "#991b1b",
      "#450a0a",
    ],
  },
  {
    label: "Bənövşəyi",
    colors: [
      "#ede9fe",
      "#c4b5fd",
      "#a78bfa",
      "#8b5cf6",
      "#7c3aed",
      "#5b21b6",
      "#2e1065",
    ],
  },
];

function getPlatform(key) {
  return PLATFORMS.find((p) => p.key === key) || null;
}

function isValidUrl(str) {
  if (!str || !str.trim()) return false;
  try {
    const u = new URL(str.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/* ── Platform Select ───────────────────────────────────────────── */
function PlatformSelect({ value, onChange, size = "md" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = getPlatform(value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`psel psel--${size} ${open ? "psel--open" : ""}`} ref={ref}>
      <button
        type="button"
        className="psel__trigger"
        onClick={() => setOpen((o) => !o)}
      >
        {selected ? (
          <>
            <span className="psel__icon">
              <selected.Icon />
            </span>
            <span className="psel__label">{selected.label}</span>
          </>
        ) : (
          <span className="psel__placeholder">Şəbəkə seçin…</span>
        )}
        <FiChevronDown
          className={`psel__chevron ${open ? "psel__chevron--up" : ""}`}
        />
      </button>
      {open && (
        <div className="psel__dropdown">
          {PLATFORMS.map((p) => (
            <button
              key={p.key}
              type="button"
              className={`psel__option ${value === p.key ? "psel__option--active" : ""}`}
              onClick={() => {
                onChange(p.key);
                setOpen(false);
              }}
            >
              <span className="psel__icon">
                <p.Icon />
              </span>
              <span className="psel__opt-label">{p.label}</span>
              {value === p.key && <FiCheck className="psel__opt-check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────────── */
const initialCategories = [
  { id: 1, platformKey: "instagram", link: "https://instagram.com/myprofile" },
  { id: 2, platformKey: "facebook", link: "https://facebook.com/mypage" },
  { id: 3, platformKey: "linkedin", link: "https://linkedin.com/in/myname" },
];

export default function CategoryMain() {
  /* ── Social links state ─── */
  const [categories, setCategories] = useState(initialCategories);
  const [addPlatform, setAddPlatform] = useState("");
  const [addLink, setAddLink] = useState("");
  const [editId, setEditId] = useState(null);
  const [editPlatform, setEditPlatform] = useState("");
  const [editLink, setEditLink] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  /* ── Background image state ─── */
  const [bgImage, setBgImage] = useState(null); // base64 preview
  const [bgFileName, setBgFileName] = useState("");
  const [bgDragging, setBgDragging] = useState(false);
  const bgInputRef = useRef(null);

  /* ── Color palette state ─── */
  const [selectedColor, setSelectedColor] = useState("");
  const [customColor, setCustomColor] = useState("#c8a75e");
  const colorInputRef = useRef(null);

  /* ── Theme mode state ─── */
  // "light" | "dark" | "system"
  const [themeMode, setThemeMode] = useState("system");

  /* ── Derived ─── */
  const addLinkOk = isValidUrl(addLink);
  const canAdd = addPlatform && addLink.trim() && addLinkOk;
  const editLinkOk = isValidUrl(editLink);
  const canSave = editPlatform && editLink.trim() && editLinkOk;

  /* ── Handlers: social ─── */
  const handleAdd = () => {
    if (!canAdd) return;
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), platformKey: addPlatform, link: addLink.trim() },
    ]);
    setAddPlatform("");
    setAddLink("");
  };
  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditPlatform(cat.platformKey);
    setEditLink(cat.link);
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditPlatform("");
    setEditLink("");
  };
  const saveEdit = () => {
    if (!canSave) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === editId
          ? { ...c, platformKey: editPlatform, link: editLink.trim() }
          : c,
      ),
    );
    cancelEdit();
  };
  const doDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };
  const deleteTarget = categories.find((c) => c.id === deleteId);

  /* ── Handlers: background image ─── */
  const processFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setBgFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setBgImage(e.target.result);
    reader.readAsDataURL(file);
  };
  const handleBgChange = (e) => processFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setBgDragging(false);
    processFile(e.dataTransfer.files[0]);
  };
  const removeBg = () => {
    setBgImage(null);
    setBgFileName("");
    if (bgInputRef.current) bgInputRef.current.value = "";
  };

  /* ── Handlers: color ─── */
  const handleColorSelect = (c) => {
    setSelectedColor(c);
    setCustomColor(c);
  };
  const handleCustomColorChange = (e) => {
    setCustomColor(e.target.value);
    setSelectedColor(e.target.value);
  };

  return (
    <div className="cat">
      {/* ══ HEADER ════════════════════════════════════════════════ */}
      <div className="cat__header">
        <div>
          <h2 className="cat__title">Sosial Şəbəkələr</h2>
          <p className="cat__sub">
            Şəbəkəni siyahıdan seçin və profil linkini əlavə edin.
          </p>
        </div>
        <div className="cat__stat">
          <FiTag />
          <span>{categories.length} şəbəkə</span>
        </div>
      </div>

      {/* ══ SOCIAL LINKS LAYOUT ═══════════════════════════════════ */}
      <div className="cat__layout">
        {/* FORM */}
        <div className="cat__form-card">
          <div className="cat__form-title">
            <FiPlus /> Yeni Şəbəkə
          </div>

          <div className="cat__field">
            <label>Şəbəkə</label>
            <PlatformSelect value={addPlatform} onChange={setAddPlatform} />
          </div>

          <div className="cat__field">
            <label>Profil Linki</label>
            <div className="cat__input-wrap">
              <FiLink className="cat__input-icon" />
              <input
                type="text"
                className={`cat__input cat__input--icon ${addLink && !addLinkOk ? "cat__input--error" : ""}`}
                placeholder="https://..."
                value={addLink}
                onChange={(e) => setAddLink(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
              {addLink && !addLinkOk && (
                <span className="cat__input-err">
                  <FiX size={12} />
                </span>
              )}
              {addLink && addLinkOk && (
                <span className="cat__input-ok">
                  <FiCheck size={12} />
                </span>
              )}
            </div>
            {addLink && !addLinkOk && (
              <span className="cat__field-err">
                Düzgün URL daxil edin (https://...)
              </span>
            )}
          </div>

          {addPlatform &&
            (() => {
              const p = getPlatform(addPlatform);
              return (
                <div className="cat__preview">
                  <div className="cat__preview-icon">
                    <p.Icon />
                  </div>
                  <div className="cat__preview-info">
                    <span className="cat__preview-name">{p.label}</span>
                    {addLink && addLinkOk ? (
                      <span className="cat__preview-link">
                        <FiLink size={10} />
                        {addLink}
                      </span>
                    ) : (
                      <span className="cat__preview-hint">
                        Link gözlənilir…
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}

          <button
            className="cat__add-btn"
            onClick={handleAdd}
            disabled={!canAdd}
          >
            <FiPlus /> Əlavə Et
          </button>
        </div>

        {/* LIST */}
        <div className="cat__list-card">
          <div className="cat__list-header">
            Əlavə Edilmiş Şəbəkələr
            <span className="cat__list-count">{categories.length}</span>
          </div>
          {categories.length === 0 && (
            <div className="cat__empty">
              <FiTag />
              <p>Hələ şəbəkə əlavə edilməyib.</p>
            </div>
          )}
          <div className="cat__list">
            {categories.map((cat) => {
              const p = getPlatform(cat.platformKey);
              const isEditing = editId === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`cat__item ${isEditing ? "cat__item--editing" : ""}`}
                >
                  {isEditing ? (
                    <div className="cat__edit-body">
                      <div className="cat__edit-fields">
                        <div className="cat__field">
                          <label>Şəbəkə</label>
                          <PlatformSelect
                            value={editPlatform}
                            onChange={setEditPlatform}
                            size="sm"
                          />
                        </div>
                        <div className="cat__field">
                          <label>Link</label>
                          <div className="cat__input-wrap">
                            <FiLink className="cat__input-icon" />
                            <input
                              type="text"
                              className={`cat__input cat__input--sm cat__input--icon ${editLink && !editLinkOk ? "cat__input--error" : ""}`}
                              placeholder="https://..."
                              value={editLink}
                              onChange={(e) => setEditLink(e.target.value)}
                            />
                            {editLink && !editLinkOk && (
                              <span className="cat__input-err">
                                <FiX size={12} />
                              </span>
                            )}
                            {editLink && editLinkOk && (
                              <span className="cat__input-ok">
                                <FiCheck size={12} />
                              </span>
                            )}
                          </div>
                          {editLink && !editLinkOk && (
                            <span className="cat__field-err">
                              Düzgün URL daxil edin
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="cat__edit-actions">
                        <button
                          className="cat__icon-btn cat__icon-btn--save"
                          onClick={saveEdit}
                          disabled={!canSave}
                          title="Saxla"
                        >
                          <FiSave />
                        </button>
                        <button
                          className="cat__icon-btn cat__icon-btn--cancel"
                          onClick={cancelEdit}
                          title="Ləğv"
                        >
                          <FiX />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="cat__item-left">
                        <div className="cat__icon-box">
                          {p ? <p.Icon /> : <FiTag />}
                        </div>
                        <div className="cat__item-info">
                          <span className="cat__item-name">
                            {p?.label || cat.platformKey}
                          </span>
                          <a
                            href={cat.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cat__item-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiLink size={10} />
                            <span>{cat.link}</span>
                            <FiExternalLink size={9} />
                          </a>
                        </div>
                      </div>
                      <div className="cat__item-actions">
                        <button
                          className="cat__icon-btn cat__icon-btn--edit"
                          onClick={() => startEdit(cat)}
                          title="Düzəliş et"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="cat__icon-btn cat__icon-btn--del"
                          onClick={() => setDeleteId(cat.id)}
                          title="Sil"
                        >
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

      {/* ══ BOTTOM: sol sütun (şəkil + mode) | sağ sütun (rəng) ════ */}
      <div className="cat__bottom-grid">
        {/* ── SOL SÜTUN ─────────────────────────────────────────── */}
        <div className="cat__left-col">
          {/* Arxa fon şəkli */}
          <div className="cat__panel">
            <div className="cat__panel-title">
              <FiImage /> Arxa Fon Şəkli
            </div>
            <p className="cat__panel-sub">
              Profil səhifənizin arxa fonunu yükləyin.
            </p>

            {bgImage ? (
              <div className="cat__bg-preview">
                <img src={bgImage} alt="arxa fon" className="cat__bg-img" />
                <div className="cat__bg-overlay">
                  <span className="cat__bg-filename">{bgFileName}</span>
                  <div className="cat__bg-actions">
                    <button
                      className="cat__bg-replace"
                      onClick={() => bgInputRef.current?.click()}
                    >
                      <FiUpload size={13} /> Dəyişdir
                    </button>
                    <button className="cat__bg-remove" onClick={removeBg}>
                      <FiX size={13} /> Sil
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`cat__dropzone ${bgDragging ? "cat__dropzone--drag" : ""}`}
                onClick={() => bgInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setBgDragging(true);
                }}
                onDragLeave={() => setBgDragging(false)}
                onDrop={handleDrop}
              >
                <div className="cat__dropzone-icon">
                  <FiUpload />
                </div>
                <p className="cat__dropzone-text">
                  Şəkli buraya sürükləyin <br />
                  <span>və ya klikləyin</span>
                </p>
                <span className="cat__dropzone-hint">
                  PNG, JPG, WEBP · Maks. 5MB
                </span>
              </div>
            )}

            <input
              ref={bgInputRef}
              type="file"
              accept="image/*"
              className="cat__file-input"
              onChange={handleBgChange}
            />
          </div>

          {/* Ekran rejimi */}
          <div className="cat__panel">
            <div className="cat__panel-title">
              {themeMode === "light" && <FiSun />}
              {themeMode === "dark" && <FiMoon />}
              {themeMode === "system" && <FiMonitor />}
              Ekran Rejimi
            </div>
            <p className="cat__panel-sub">
              Profil səhifənizin görünüş temasını seçin.
            </p>
            <div className="cat__theme-options">
              {[
                { key: "light", Icon: FiSun, label: "İşıqlı" },
                { key: "dark", Icon: FiMoon, label: "Tünd" },
              ].map(({ key, Icon, label }) => (
                <button
                  key={key}
                  type="button"
                  className={`cat__theme-btn ${themeMode === key ? "cat__theme-btn--active" : ""}`}
                  onClick={() => setThemeMode(key)}
                >
                  <Icon />
                  <span>{label}</span>
                
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── SAĞ SÜTUN: Rəng Paleti ────────────────────────────── */}
        <div className="cat__panel cat__panel--stretch">
          <div className="cat__panel-title">
            <FiDroplet /> Rəng Paleti
          </div>
          <p className="cat__panel-sub">
            Profil səhifəniz üçün əsas rəng seçin.
          </p>

          <div className="cat__palette-groups">
            {COLOR_GROUPS.map((group) => (
              <div key={group.label} className="cat__palette-group">
                <span className="cat__palette-group-label">{group.label}</span>
                <div className="cat__palette-row">
                  {group.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`cat__color-swatch ${selectedColor === c ? "cat__color-swatch--active" : ""}`}
                      style={{ background: c }}
                      onClick={() => handleColorSelect(c)}
                      title={c}
                    >
                      {selectedColor === c && (
                        <FiCheck
                          className="cat__swatch-check"
                          style={{ color: isLightColor(c) ? "#000" : "#fff" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="cat__custom-color">
            <div className="cat__custom-color-label">
              <span>Xüsusi rəng</span>
              {selectedColor && (
                <span className="cat__custom-color-hex">
                  {selectedColor.toUpperCase()}
                </span>
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
                  const val = e.target.value;
                  setCustomColor(val);
                  if (/^#[0-9a-fA-F]{6}$/.test(val)) setSelectedColor(val);
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
        </div>
      </div>

      {/* ══ DELETE MODAL ══════════════════════════════════════════ */}
      {deleteId && (
        <div className="cat__modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="cat__modal" onClick={(e) => e.stopPropagation()}>
            <div className="cat__modal-icon">
              <FiTrash2 />
            </div>
            <h4>Silmək istədiyinizdən əminsiniz?</h4>
            <p>
              <strong>{getPlatform(deleteTarget?.platformKey)?.label}</strong>{" "}
              şəbəkəsi silinəcək. Bu əməliyyat geri alına bilməz.
            </p>
            <div className="cat__modal-actions">
              <button
                className="cat__btn cat__btn--ghost"
                onClick={() => setDeleteId(null)}
              >
                Ləğv et
              </button>
              <button className="cat__btn cat__btn--danger" onClick={doDelete}>
                <FiTrash2 /> Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Helper: açıq rəng mü? ─────────────────────────────────────── */
function isLightColor(hex) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
