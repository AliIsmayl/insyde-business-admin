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
  FiBriefcase,
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

/* ── Rəng paleti ───────────────────────────────────────────────── */
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
  if (!str?.trim()) return false;
  try {
    const u = new URL(str.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function isLightColor(hex) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16),
    g = parseInt(c.slice(2, 4), 16),
    b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

/* ── Platform Select ───────────────────────────────────────────── */
function PlatformSelect({ value, onChange, size = "md" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = getPlatform(value);

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
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

/* ── Inline editable text field ────────────────────────────────── */
function InlineField({
  value,
  draft,
  editing,
  icon: Icon,
  placeholder,
  emptyText,
  inputRef,
  onStartEdit,
  onSaveDraft,
  onCancelEdit,
  onDraftChange,
}) {
  return editing ? (
    <div className="cat__inline-edit">
      <input
        ref={inputRef}
        type="text"
        className="cat__input cat__input--sm"
        placeholder={placeholder}
        value={draft}
        onChange={(e) => onDraftChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSaveDraft();
          if (e.key === "Escape") onCancelEdit();
        }}
      />
      <button
        className="cat__icon-btn cat__icon-btn--save cat__icon-btn--xs"
        onClick={onSaveDraft}
        title="Saxla"
      >
        <FiCheck size={13} />
      </button>
      <button
        className="cat__icon-btn cat__icon-btn--cancel cat__icon-btn--xs"
        onClick={onCancelEdit}
        title="Ləğv"
      >
        <FiX size={13} />
      </button>
    </div>
  ) : (
    <div
      className={`cat__name-display ${!value ? "cat__name-display--muted" : ""}`}
      onClick={onStartEdit}
      style={{ cursor: "pointer" }}
    >
      <div className="cat__name-icon-wrap">{Icon && <Icon size={15} />}</div>
      <span
        className={`cat__name-text ${!value ? "cat__name-text--empty" : ""}`}
      >
        {value || emptyText}
      </span>
      <button
        className="cat__name-edit-btn"
        onClick={(e) => {
          e.stopPropagation();
          onStartEdit();
        }}
        title="Düzəliş et"
      >
        <FiEdit2 size={12} />
      </button>
    </div>
  );
}

/* ── Inline editable URL field ─────────────────────────────────── */
function InlineLinkField({
  value,
  draft,
  editing,
  placeholder,
  emptyText,
  inputRef,
  onStartEdit,
  onSaveDraft,
  onCancelEdit,
  onDraftChange,
}) {
  const urlOk = isValidUrl(draft);
  return editing ? (
    <div className="cat__inline-edit">
      <div className="cat__input-wrap" style={{ flex: 1 }}>
        <FiLink className="cat__input-icon" style={{ fontSize: 13 }} />
        <input
          ref={inputRef}
          type="text"
          className={`cat__input cat__input--sm cat__input--icon ${draft && !urlOk ? "cat__input--error" : ""}`}
          placeholder={placeholder}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSaveDraft();
            if (e.key === "Escape") onCancelEdit();
          }}
        />
        {draft && !urlOk && (
          <span className="cat__input-err">
            <FiX size={12} />
          </span>
        )}
        {draft && urlOk && (
          <span className="cat__input-ok">
            <FiCheck size={12} />
          </span>
        )}
      </div>
      <button
        className="cat__icon-btn cat__icon-btn--save cat__icon-btn--xs"
        onClick={onSaveDraft}
        title="Saxla"
      >
        <FiCheck size={13} />
      </button>
      <button
        className="cat__icon-btn cat__icon-btn--cancel cat__icon-btn--xs"
        onClick={onCancelEdit}
        title="Ləğv"
      >
        <FiX size={13} />
      </button>
    </div>
  ) : (
    <div
      className={`cat__name-display ${!value ? "cat__name-display--muted" : ""}`}
      onClick={onStartEdit}
      style={{ cursor: "pointer" }}
    >
      <div className="cat__name-icon-wrap cat__name-icon-wrap--link">
        <FiLink size={14} />
      </div>
      {value ? (
        <>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="cat__company-link-text"
            onClick={(e) => e.stopPropagation()}
          >
            {value}
          </a>
          <FiExternalLink size={11} className="cat__company-link-ext" />
          <button
            className="cat__name-edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onStartEdit();
            }}
            title="Düzəliş et"
          >
            <FiEdit2 size={12} />
          </button>
        </>
      ) : (
        <>
          <span className="cat__name-text cat__name-text--empty">
            {emptyText}
          </span>
          <button
            className="cat__name-edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onStartEdit();
            }}
            title="Əlavə et"
          >
            <FiEdit2 size={12} />
          </button>
        </>
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
  /* social */
  const [categories, setCategories] = useState(initialCategories);
  const [addPlatform, setAddPlatform] = useState("");
  const [addLink, setAddLink] = useState("");
  const [editId, setEditId] = useState(null);
  const [editPlatform, setEditPlatform] = useState("");
  const [editLink, setEditLink] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  /* bg image */
  const [bgImage, setBgImage] = useState(null);
  const [bgFileName, setBgFileName] = useState("");
  const [bgDragging, setBgDragging] = useState(false);
  const bgInputRef = useRef(null);

  /* company name */
  const [companyName, setCompanyName] = useState("");
  const [companyDraft, setCompanyDraft] = useState("");
  const [editingCompany, setEditingCompany] = useState(false);
  const companyRef = useRef(null);

  /* company link */
  const [companyLink, setCompanyLink] = useState("");
  const [companyLinkDraft, setCompanyLinkDraft] = useState("");
  const [editingCompanyLink, setEditingCompanyLink] = useState(false);
  const companyLinkRef = useRef(null);

  /* image name */
  const [imgNameDraft, setImgNameDraft] = useState("");
  const [editingImgName, setEditingImgName] = useState(false);
  const imgNameRef = useRef(null);

  /* color */
  const [selectedColor, setSelectedColor] = useState("");
  const [customColor, setCustomColor] = useState("#c8a75e");
  const colorInputRef = useRef(null);

  /* theme */
  const [themeMode, setThemeMode] = useState("light");

  /* derived */
  const addLinkOk = isValidUrl(addLink);
  const canAdd = addPlatform && addLink.trim() && addLinkOk;
  const editLinkOk = isValidUrl(editLink);
  const canSave = editPlatform && editLink.trim() && editLinkOk;

  /* social handlers */
  const handleAdd = () => {
    if (!canAdd) return;
    setCategories((p) => [
      ...p,
      { id: Date.now(), platformKey: addPlatform, link: addLink.trim() },
    ]);
    setAddPlatform("");
    setAddLink("");
  };
  const startEdit = (c) => {
    setEditId(c.id);
    setEditPlatform(c.platformKey);
    setEditLink(c.link);
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditPlatform("");
    setEditLink("");
  };
  const saveEdit = () => {
    if (!canSave) return;
    setCategories((p) =>
      p.map((c) =>
        c.id === editId
          ? { ...c, platformKey: editPlatform, link: editLink.trim() }
          : c,
      ),
    );
    cancelEdit();
  };
  const doDelete = () => {
    setCategories((p) => p.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };
  const deleteTarget = categories.find((c) => c.id === deleteId);

  /* bg handlers */
  const processFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setBgFileName(file.name);
    setImgNameDraft(file.name);
    const r = new FileReader();
    r.onload = (e) => setBgImage(e.target.result);
    r.readAsDataURL(file);
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
    setImgNameDraft("");
    setEditingImgName(false);
    if (bgInputRef.current) bgInputRef.current.value = "";
  };

  /* company name edit */
  const startCompanyEdit = () => {
    setCompanyDraft(companyName);
    setEditingCompany(true);
    setTimeout(() => companyRef.current?.focus(), 40);
  };
  const saveCompanyName = () => {
    setCompanyName(companyDraft.trim());
    setEditingCompany(false);
  };
  const cancelCompanyEdit = () => {
    setCompanyDraft(companyName);
    setEditingCompany(false);
  };

  /* company link edit */
  const startCompanyLinkEdit = () => {
    setCompanyLinkDraft(companyLink);
    setEditingCompanyLink(true);
    setTimeout(() => companyLinkRef.current?.focus(), 40);
  };
  const saveCompanyLink = () => {
    const t = companyLinkDraft.trim();
    if (!t || isValidUrl(t)) {
      setCompanyLink(t);
      setEditingCompanyLink(false);
    }
  };
  const cancelCompanyLinkEdit = () => {
    setCompanyLinkDraft(companyLink);
    setEditingCompanyLink(false);
  };

  /* image name edit */
  const startImgNameEdit = () => {
    setImgNameDraft(bgFileName);
    setEditingImgName(true);
    setTimeout(() => imgNameRef.current?.focus(), 40);
  };
  const saveImgName = () => {
    const t = imgNameDraft.trim();
    if (t) setBgFileName(t);
    setEditingImgName(false);
  };
  const cancelImgNameEdit = () => {
    setImgNameDraft(bgFileName);
    setEditingImgName(false);
  };

  /* color */
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

      {/* ══ SOCIAL LAYOUT ═════════════════════════════════════════ */}
      <div className="cat__layout">
        {/* Form */}
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

        {/* List */}
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

      {/* ══ BOTTOM GRID ═══════════════════════════════════════════ */}
      <div className="cat__bottom-grid">
        {/* ── SOL PANEL ─────────────────────────────────────────── */}
        <div className="cat__panel cat__panel--left">
          <div className="cat__panel-title">
            <FiImage /> Profil Tənzimləmələri
          </div>

          {/* 1. Arxa fon şəkli */}
          <div className="cat__section">
            <p className="cat__section-heading">Arxa Fon Şəkli</p>
            <p className="cat__section-sub">
              Profil səhifənizin arxa fonunu yükləyin.
            </p>
            {bgImage ? (
              <div className="cat__bg-preview">
                <img src={bgImage} alt="arxa fon" className="cat__bg-img" />
                <div className="cat__bg-overlay">
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
                  Şəkli buraya sürükləyin
                  <br />
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

          <div className="cat__divider" />

          {/* 2. Şirkətin adı + linki */}
          <div className="cat__section">
            <p className="cat__section-heading">Şirkətin Adı</p>
            <p className="cat__section-sub">
              Profil səhifənizdə görünəcək şirkət adı və sayt linki.
            </p>

            {/* Ad */}
            <InlineField
              value={companyName}
              draft={companyDraft}
              editing={editingCompany}
              icon={FiBriefcase}
              placeholder="Şirkətin adını daxil edin…"
              emptyText="Şirkət adı daxil edilməyib…"
              inputRef={companyRef}
              onStartEdit={startCompanyEdit}
              onSaveDraft={saveCompanyName}
              onCancelEdit={cancelCompanyEdit}
              onDraftChange={setCompanyDraft}
            />

            {/* Link */}
            <InlineLinkField
              value={companyLink}
              draft={companyLinkDraft}
              editing={editingCompanyLink}
              placeholder="https://sirket.az"
              emptyText="Şirkət linki əlavə edilməyib…"
              inputRef={companyLinkRef}
              onStartEdit={startCompanyLinkEdit}
              onSaveDraft={saveCompanyLink}
              onCancelEdit={cancelCompanyLinkEdit}
              onDraftChange={setCompanyLinkDraft}
            />
          </div>

          <div className="cat__divider" />

          {/* 3. Ekran rejimi */}
          <div className="cat__section">
            <p className="cat__section-heading">
              {themeMode === "light" ? (
                <FiSun size={13} />
              ) : (
                <FiMoon size={13} />
              )}{" "}
              Ekran Rejimi
            </p>
            <p className="cat__section-sub">
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

        {/* ── SAĞ PANEL: Rəng Paleti ─────────────────────────────── */}
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
