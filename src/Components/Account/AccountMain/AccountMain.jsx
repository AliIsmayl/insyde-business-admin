import React, { useState } from "react";
import {
  FiSearch,
  FiUser,
  FiMail,
  FiBriefcase,
  FiEye,
  FiHash,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiSlash,
  FiCheckCircle,
  FiInstagram,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiGlobe,
  FiAlertTriangle,
  FiX,
  FiShield,
  FiUserPlus,
  FiSend,
  FiClock,
} from "react-icons/fi";
import "./AccountMain.scss";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const MOCK_USERS = [
  {
    id: 1,
    code: "SYD4568",
    name: "Elçin Məmmədov",
    email: "elcin@example.com",
    profession: "Frontend Developer",
    inviteStatus: "active",
    invitedAt: null,
    skills: ["React", "CSS", "UI/UX"],
    experience: "2 il 4 ay",
    views: 0,
    profileUrl: "https://example.com/elcin",
    about: "Minimalist və müasir interfeyslər qurmağı sevirəm.",
    blocked: false,
    socials: {
      instagram: "elcin.dev",
      linkedin: "elcinmammadov",
      github: "elcinm",
      twitter: "",
      website: "https://elcin.dev",
    },
  },
  {
    id: 2,
    code: "KRT2341",
    name: "Aynur Həsənova",
    email: "aynur@example.com",
    profession: "UI Designer",
    skills: ["Figma", "Adobe XD"],
    experience: "3 il 1 ay",
    views: 142,
    profileUrl: "https://example.com/aynur",
    about: "İstifadəçi mərkəzli dizayn.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "aynur.design", linkedin: "aynurhasanova", github: "", twitter: "aynurux", website: "" },
  },
  {
    id: 3,
    code: "BXL9901",
    name: "Tural Əliyev",
    email: "tural@example.com",
    profession: "Backend Developer",
    skills: ["Node.js", "PostgreSQL"],
    experience: "5 il 0 ay",
    views: 87,
    profileUrl: "https://example.com/tural",
    about: "Güclü API həlləri yaradıram.",
    blocked: true,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "", linkedin: "turalaliyev", github: "turalaliyev", twitter: "", website: "https://tural.io" },
  },
  {
    id: 4,
    code: "ZFQ1122",
    name: "Leyla Quliyeva",
    email: "leyla@example.com",
    profession: "Product Manager",
    skills: ["Scrum", "Jira", "Analytics"],
    experience: "4 il 6 ay",
    views: 310,
    profileUrl: "https://example.com/leyla",
    about: "Məhsulun hər mərhələsini sevərək idarə edirəm.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "leyla.pm", linkedin: "leylaquliyeva", github: "", twitter: "leylapm", website: "https://leyla.pm" },
  },
  {
    id: 5,
    code: "MNP5543",
    name: "Rauf İsmayılov",
    email: "rauf@example.com",
    profession: "Mobile Developer",
    skills: ["Flutter", "Dart"],
    experience: "2 il 9 ay",
    views: 55,
    profileUrl: "https://example.com/rauf",
    about: "Cross-platform mobil tətbiqlər hazırlayıram.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "", linkedin: "raufismayilov", github: "raufdev", twitter: "", website: "" },
  },
  {
    id: 6,
    code: "VCX8870",
    name: "Nigar Babayeva",
    email: "nigar@example.com",
    profession: "Graphic Designer",
    skills: ["Illustrator", "Photoshop"],
    experience: "6 il 2 ay",
    views: 421,
    profileUrl: "https://example.com/nigar",
    about: "Vizual hekayəçilik mənim ehtirasım.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "nigar.art", linkedin: "nigarbabayeva", github: "", twitter: "nigarart", website: "https://nigar.art" },
  },
  {
    id: 7,
    code: "DRT3310",
    name: "Kamran Nəcəfov",
    email: "kamran@example.com",
    profession: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    experience: "3 il 8 ay",
    views: 193,
    profileUrl: "https://example.com/kamran",
    about: "İnfrastruktur avtomatlaşdırma üzrə ixtisaslaşmışam.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "", linkedin: "kamrannecefov", github: "kamranops", twitter: "kamrandevops", website: "" },
  },
  {
    id: 8,
    code: "PLQ6654",
    name: "Sevinc Orucova",
    email: "sevinc@example.com",
    profession: "Data Analyst",
    skills: ["Python", "SQL", "Tableau"],
    experience: "1 il 11 ay",
    views: 76,
    profileUrl: "https://example.com/sevinc",
    about: "Məlumatlardan dərin anlayışlar çıxarıram.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "sevinc.data", linkedin: "sevincorucova", github: "sevincdata", twitter: "", website: "" },
  },
  {
    id: 9,
    code: "WQA4421",
    name: "Fərid Hüseynov",
    email: "ferid@example.com",
    profession: "Full Stack Developer",
    skills: ["React", "Node.js"],
    experience: "4 il 3 ay",
    views: 268,
    profileUrl: "https://example.com/ferid",
    about: "Tam yığın həllərlə işləyirəm.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "", linkedin: "feridhüseynov", github: "feriddev", twitter: "feridstack", website: "https://ferid.dev" },
  },
  {
    id: 10,
    code: "JKL7732",
    name: "Xədicə Rəhimova",
    email: "xedice@example.com",
    profession: "Content Creator",
    skills: ["Copywriting", "SEO"],
    experience: "2 il 0 ay",
    views: 509,
    profileUrl: "https://example.com/xedice",
    about: "Marka səsini formalaşdırıram.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "xedice.content", linkedin: "xedicérahimova", github: "", twitter: "xedicecreates", website: "https://xedice.co" },
  },
  {
    id: 11,
    code: "OPW2298",
    name: "Bəhruz Əsgərov",
    email: "behruz@example.com",
    profession: "QA Engineer",
    skills: ["Selenium", "Cypress"],
    experience: "3 il 5 ay",
    views: 34,
    profileUrl: "https://example.com/behruz",
    about: "Keyfiyyətsiz kod buraxmıram.",
    blocked: true,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "", linkedin: "behruzasgarov", github: "behruzqa", twitter: "", website: "" },
  },
  {
    id: 12,
    code: "GHT5561",
    name: "Məryəm Sultanova",
    email: "meryem@example.com",
    profession: "UX Researcher",
    skills: ["Usability", "Interviews", "Wireframing"],
    experience: "5 il 7 ay",
    views: 177,
    profileUrl: "https://example.com/meryem",
    about: "İstifadəçi davranışını dərindən öyrənirəm.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "meryem.ux", linkedin: "meryemsultanova", github: "", twitter: "meryemresearch", website: "https://meryem.design" },
  },
  {
    id: 13,
    code: "NVB3387",
    name: "Elnur Qasımov",
    email: "elnur@example.com",
    profession: "Cybersecurity Analyst",
    skills: ["Pentesting", "SIEM"],
    experience: "7 il 1 ay",
    views: 88,
    profileUrl: "https://example.com/elnur",
    about: "Rəqəmsal aktivləri qoruyuram.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "", linkedin: "elnurqasimov", github: "elnursec", twitter: "elnurcyber", website: "" },
  },
  {
    id: 14,
    code: "IUY8843",
    name: "Zəhra Muradova",
    email: "zehra@example.com",
    profession: "Marketing Specialist",
    skills: ["SMM", "Google Ads", "Analytics"],
    experience: "3 il 2 ay",
    views: 612,
    profileUrl: "https://example.com/zehra",
    about: "Brendlər üçün böyümə strategiyaları hazırlayıram.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "zehra.marketing", linkedin: "zehramuradova", github: "", twitter: "zehragrowth", website: "https://zehra.marketing" },
  },
  {
    id: 15,
    code: "CXZ1190",
    name: "Vüsal Kərimov",
    email: "vusal@example.com",
    profession: "AR/VR Developer",
    skills: ["Unity", "C#", "Blender"],
    experience: "2 il 6 ay",
    views: 145,
    profileUrl: "https://example.com/vusal",
    about: "Artırılmış reallıq təcrübələri yaradıram.",
    blocked: false,
    inviteStatus: "active",
    invitedAt: null,
    socials: { instagram: "vusal.xr", linkedin: "vusalkarimov", github: "vusalxr", twitter: "", website: "https://vusal.xr" },
  },
];

const ITEMS_PER_PAGE = 10;

// Social icon helper
function SocialIcon({ type }) {
  const icons = {
    instagram: <FiInstagram />,
    linkedin: <FiLinkedin />,
    github: <FiGithub />,
    twitter: <FiTwitter />,
    website: <FiGlobe />,
  };
  return icons[type] || null;
}

function getSocialUrl(type, value) {
  if (!value) return null;
  const bases = {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/in/",
    github: "https://github.com/",
    twitter: "https://twitter.com/",
    website: "",
  };
  return type === "website" ? value : bases[type] + value;
}

// Confirm Modal
function ConfirmModal({ user, action, onConfirm, onCancel }) {
  const isBlock = action === "block";
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancel}>
          <FiX />
        </button>
        <div className={`modal-icon-wrap ${isBlock ? "warn" : "success"}`}>
          {isBlock ? <FiAlertTriangle /> : <FiCheckCircle />}
        </div>
        <h3 className="modal-title">
          {isBlock ? "İstifadəçini blokla" : "Bloku aç"}
        </h3>
        <p className="modal-desc">
          <strong>{user.name}</strong> adlı istifadəçini{" "}
          {isBlock
            ? "bloklamaq istədiyinizə əminsiniz? Bu istifadəçi sistemə daxil ola bilməyəcək."
            : "blokdan çıxarmaq istədiyinizə əminsiniz?"}
        </p>
        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onCancel}>
            Ləğv et
          </button>
          <button
            className={`modal-confirm-btn ${isBlock ? "block" : "unblock"}`}
            onClick={onConfirm}
          >
            {isBlock ? (
              <>
                <FiSlash /> Blokla
              </>
            ) : (
              <>
                <FiCheckCircle /> Bloku aç
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Delete Confirm Modal
function DeleteModal({ user, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancel}>
          <FiX />
        </button>
        <div className="modal-icon-wrap danger">
          <FiTrash2 />
        </div>
        <h3 className="modal-title">İstifadəçini sil</h3>
        <p className="modal-desc">
          <strong>{user.name}</strong> adlı istifadəçini silmək istədiyinizə
          əminsiniz? Bu əməliyyat geri alına bilməz.
        </p>
        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onCancel}>
            Ləğv et
          </button>
          <button className="modal-confirm-btn block" onClick={onConfirm}>
            <FiTrash2 /> Sil
          </button>
        </div>
      </div>
    </div>
  );
}

function AccountMain() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [confirmModal, setConfirmModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  // Invite form
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  const canInvite = inviteName.trim().length > 1 && isValidEmail(inviteEmail);

  const handleInvite = () => {
    if (!canInvite) return;
    const newUser = {
      id: Date.now(),
      code: "—",
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      profession: "—",
      skills: [],
      experience: "—",
      views: 0,
      profileUrl: "#",
      about: "",
      blocked: false,
      inviteStatus: "pending",
      invitedAt: new Date().toLocaleDateString("az-AZ"),
      socials: { instagram: "", linkedin: "", github: "", twitter: "", website: "" },
    };
    setUsers((p) => [newUser, ...p]);
    setInviteSuccess(inviteEmail.trim());
    setInviteName("");
    setInviteEmail("");
    setTimeout(() => setInviteSuccess(""), 4000);
    setPage(1);
  };

  const handleConfirmMember = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, inviteStatus: "active", code: `INV${Math.floor(1000 + Math.random() * 9000)}` }
          : u
      )
    );
    setOpenMenu(null);
  };

  const handleCancelInvite = (e, id) => {
    e.stopPropagation();
    setOpenMenu(null);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.code.toLowerCase().includes(q) ||
      (u.profession && u.profession.toLowerCase().includes(q));
    const matchFilter =
      filterStatus === "all"        ? true
      : filterStatus === "pending"  ? u.inviteStatus === "pending"
      : filterStatus === "active"   ? u.inviteStatus === "active" && !u.blocked
      : filterStatus === "blocked"  ? u.blocked
      : true;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };

  const toggleRow = (id, isPending) => {
    if (isPending) return;
    setExpandedRow(expandedRow === id ? null : id);
    setOpenMenu(null);
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenu(openMenu === id ? null : id);
  };

  const openBlockConfirm = (e, user) => {
    e.stopPropagation();
    setOpenMenu(null);
    setConfirmModal({ user, action: user.blocked ? "unblock" : "block" });
  };

  const handleBlockConfirm = () => {
    setUsers((prev) =>
      prev.map((u) => u.id === confirmModal.user.id ? { ...u, blocked: !u.blocked } : u)
    );
    setConfirmModal(null);
  };

  const openDeleteConfirm = (e, user) => {
    e.stopPropagation();
    setOpenMenu(null);
    setDeleteModal(user);
  };

  const handleDeleteConfirm = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteModal.id));
    setDeleteModal(null);
    setExpandedRow(null);
  };

  const pendingCount = users.filter((u) => u.inviteStatus === "pending").length;
  const activeCount  = users.filter((u) => u.inviteStatus === "active" && !u.blocked).length;
  const blockedCount = users.filter((u) => u.blocked).length;

  return (
    <div className="account-main" onClick={() => setOpenMenu(null)}>
      {/* MODALS */}
      {confirmModal && (
        <ConfirmModal
          user={confirmModal.user}
          action={confirmModal.action}
          onConfirm={handleBlockConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}
      {deleteModal && (
        <DeleteModal
          user={deleteModal}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModal(null)}
        />
      )}

      {/* HEADER */}
      <div className="top-header">
        <div>
          <h2 className="page-title">İstifadəçilər</h2>
          <p className="page-subtitle">Korporativ üzvləri idarə edin və yeni dəvətlər göndərin.</p>
        </div>
      </div>

      {/* INVITE PANEL */}
      <div className="invite-panel">
        <div className="invite-panel-head">
          <FiUserPlus className="invite-panel-icon" />
          <div>
            <h3 className="invite-panel-title">Yeni İstifadəçi Dəvət Et</h3>
            <p className="invite-panel-sub">
              Ad və e-poçt daxil edin — dəvət linki həmin e-poçta göndəriləcək.
            </p>
          </div>
        </div>
        {inviteSuccess && (
          <div className="invite-success">
            <FiCheckCircle />
            <span>
              <strong>{inviteSuccess}</strong> ünvanına dəvət e-poçtu göndərildi.
            </span>
          </div>
        )}
        <div className="invite-form">
          <div className="invite-field">
            <FiUser className="invite-field-icon" />
            <input
              type="text"
              placeholder="Ad Soyad"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInvite()}
            />
          </div>
          <div className="invite-field">
            <FiMail className="invite-field-icon" />
            <input
              type="email"
              placeholder="E-poçt ünvanı"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInvite()}
            />
          </div>
          <button
            className="invite-send-btn"
            onClick={handleInvite}
            disabled={!canInvite}
          >
            <FiSend /> Dəvət Et
          </button>
        </div>
      </div>

      {/* FILTER ROW */}
      <div className="filter-row">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Ad, email, kod..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="stats-badges">
          <button
            className={`stat-badge ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => { setFilterStatus("all"); setPage(1); }}
          >
            <FiUser />
            <span>{users.length} Hamısı</span>
          </button>
          <button
            className={`stat-badge success ${filterStatus === "active" ? "active" : ""}`}
            onClick={() => { setFilterStatus("active"); setPage(1); }}
          >
            <FiCheckCircle />
            <span>{activeCount} Üzv</span>
          </button>
          <button
            className={`stat-badge pending ${filterStatus === "pending" ? "active" : ""}`}
            onClick={() => { setFilterStatus("pending"); setPage(1); }}
          >
            <FiClock />
            <span>{pendingCount} Gözləyir</span>
          </button>
          <button
            className={`stat-badge danger ${filterStatus === "blocked" ? "active" : ""}`}
            onClick={() => { setFilterStatus("blocked"); setPage(1); }}
          >
            <FiShield />
            <span>{blockedCount} Blok</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="accounts-table">
            <thead>
              <tr>
                <th><FiHash className="th-icon" /> Kod</th>
                <th><FiUser className="th-icon" /> Ad Soyad</th>
                <th><FiMail className="th-icon" /> Email</th>
                <th><FiBriefcase className="th-icon" /> Peşə</th>
                <th>Bacarıqlar</th>
                <th><FiEye className="th-icon" /> Baxışlar</th>
                <th>Sosial</th>
                <th><FiClock className="th-icon" /> Dəvət</th>
                <th>Status</th>
                <th><FiExternalLink className="th-icon" /> Link</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={11} className="empty-row">
                    <FiSearch className="empty-icon" />
                    <span>Nəticə tapılmadı</span>
                  </td>
                </tr>
              ) : (
                paginated.map((user) => {
                  const isPending = user.inviteStatus === "pending";
                  return (
                  <React.Fragment key={user.id}>
                    <tr
                      className={`data-row ${expandedRow === user.id ? "expanded" : ""} ${user.blocked ? "is-blocked" : ""} ${isPending ? "is-pending" : ""}`}
                      onClick={() => toggleRow(user.id, isPending)}
                      style={{ cursor: isPending ? "default" : "pointer" }}
                    >
                      <td>
                        <span className={`user-code ${isPending ? "user-code--pending" : ""}`}>{user.code}</span>
                      </td>
                      <td>
                        <div className="user-name-cell">
                          <div className={`avatar ${user.blocked ? "blocked-avatar" : ""} ${isPending ? "pending-avatar" : ""}`}>
                            {user.name.charAt(0)}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="email-text">{user.email}</span>
                      </td>
                      <td>
                        <span className="profession-text">{isPending ? <span className="pending-dash">Dəvət gözlənilir</span> : user.profession}</span>
                      </td>
                      <td>
                        {isPending ? <span className="pending-dash">—</span> : (
                          <div className="skills-cell">
                            {user.skills.slice(0, 2).map((s, i) => (
                              <span key={i} className="skill-tag">{s}</span>
                            ))}
                            {user.skills.length > 2 && (
                              <span className="skill-tag more">+{user.skills.length - 2}</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        {isPending ? <span className="pending-dash">—</span> : (
                          <span className={`views-badge ${user.views > 200 ? "high" : user.views > 50 ? "mid" : "low"}`}>
                            {user.views}
                          </span>
                        )}
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        {isPending ? <span className="pending-dash">—</span> : (
                          <div className="socials-cell">
                            {Object.entries(user.socials).map(([type, val]) => {
                              if (!val) return null;
                              const url = getSocialUrl(type, val);
                              return (
                                <a key={type} href={url} target="_blank" rel="noopener noreferrer"
                                  className={`social-icon-btn ${type}`} title={`@${val}`}>
                                  <SocialIcon type={type} />
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`invite-date ${isPending ? "invite-date--pending" : ""}`}>
                          {user.invitedAt || "—"}
                        </span>
                      </td>
                      {/* STATUS BADGE */}
                      <td>
                        {isPending ? (
                          <span className="status-badge pending">
                            <FiClock /> Gözləyir
                          </span>
                        ) : user.blocked ? (
                          <span className="status-badge blocked">
                            <FiSlash /> Blok
                          </span>
                        ) : (
                          <span className="status-badge active">
                            <FiCheckCircle /> Üzv
                          </span>
                        )}
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        {!isPending ? (
                          <a href={user.profileUrl} target="_blank" rel="noopener noreferrer" className="profile-link-btn">
                            <FiExternalLink /><span>Profil</span>
                          </a>
                        ) : <span className="pending-dash">—</span>}
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="action-menu-wrap">
                          <button className="more-btn" onClick={(e) => toggleMenu(e, user.id)}>
                            <FiMoreVertical />
                          </button>
                          {openMenu === user.id && (
                            <div className="action-dropdown">
                              {isPending ? (
                                <>
                                  <button
                                    className="dropdown-item edit"
                                    onClick={() => { handleConfirmMember(user.id); }}
                                  >
                                    <FiCheckCircle /> Üzv kimi təsdiqlə
                                  </button>
                                  <div className="dropdown-divider" />
                                  <button
                                    className="dropdown-item delete"
                                    onClick={(e) => handleCancelInvite(e, user.id)}
                                  >
                                    <FiTrash2 /> Dəvəti ləğv et
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className="dropdown-item edit">
                                    <FiEdit2 /> Düzəliş et
                                  </button>
                                  <button
                                    className={`dropdown-item ${user.blocked ? "unblock" : "block-item"}`}
                                    onClick={(e) => openBlockConfirm(e, user)}
                                  >
                                    {user.blocked ? (
                                      <><FiCheckCircle /> Bloku aç</>
                                    ) : (
                                      <><FiSlash /> Blokla</>
                                    )}
                                  </button>
                                  <div className="dropdown-divider" />
                                  <button
                                    className="dropdown-item delete"
                                    onClick={(e) => openDeleteConfirm(e, user)}
                                  >
                                    <FiTrash2 /> Sil
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>

                    {expandedRow === user.id && (
                      <tr className="expand-row">
                        <td colSpan={11}>
                          <div className="expand-content">
                            <div className="expand-block">
                              <span className="expand-label">Haqqında</span>
                              <p className="expand-value">{user.about}</p>
                            </div>
                            <div className="expand-block">
                              <span className="expand-label">
                                Bütün bacarıqlar
                              </span>
                              <div className="skills-cell">
                                {user.skills.map((s, i) => (
                                  <span key={i} className="skill-tag">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {/* EXPANDED SOCIALS */}
                            <div className="expand-block">
                              <span className="expand-label">
                                Sosial şəbəkələr
                              </span>
                              <div className="expand-socials">
                                {Object.entries(user.socials).map(
                                  ([type, val]) => {
                                    if (!val) return null;
                                    const url = getSocialUrl(type, val);
                                    const labels = {
                                      instagram: "Instagram",
                                      linkedin: "LinkedIn",
                                      github: "GitHub",
                                      twitter: "Twitter/X",
                                      website: "Vebsayt",
                                    };
                                    return (
                                      <a
                                        key={type}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`expand-social-link ${type}`}
                                      >
                                        <SocialIcon type={type} />
                                        <span>
                                          {labels[type]}:{" "}
                                          {type === "website" ? val : `@${val}`}
                                        </span>
                                      </a>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                            <div className="expand-block">
                              <span className="expand-label">Profil linki</span>
                              <a
                                href={user.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="expand-profile-link"
                              >
                                <FiExternalLink />
                                <span>{user.profileUrl}</span>
                              </a>
                            </div>
                            {/* BLOCK QUICK ACTION */}
                            <div className="expand-block expand-actions">
                              <span className="expand-label">
                                Tez əməliyyat
                              </span>
                              <button
                                className={`expand-block-btn ${user.blocked ? "unblock" : "block"}`}
                                onClick={(e) => openBlockConfirm(e, user)}
                              >
                                {user.blocked ? (
                                  <>
                                    <FiCheckCircle /> Bloku aç
                                  </>
                                ) : (
                                  <>
                                    <FiSlash /> Blokla
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <span className="pagination-info">
              {(page - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(page * ITEMS_PER_PAGE, filtered.length)} /{" "}
              {filtered.length}
            </span>
            <div className="pagination-controls">
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <FiChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
                )
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, i) =>
                  item === "..." ? (
                    <span key={`dots-${i}`} className="page-dots">
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      className={`page-btn ${page === item ? "active" : ""}`}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </button>
                  ),
                )}
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountMain;
