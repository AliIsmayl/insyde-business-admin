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
} from "react-icons/fi";
import "./AccountMain.scss";

const MOCK_USERS = [
  {
    id: 1,
    code: "SYD4568",
    name: "Elçin Məmmədov",
    email: "elcin@example.com",
    profession: "Frontend Developer",
    skills: ["React", "CSS", "UI/UX"],
    experience: "2 il 4 ay",
    views: 0,
    profileUrl: "https://example.com/elcin",
    about: "Minimalist və müasir interfeyslər qurmağı sevirəm.",
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
  },
];

const ITEMS_PER_PAGE = 10;

function AccountMain() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = MOCK_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.code.toLowerCase().includes(search.toLowerCase()) ||
      u.profession.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
    setOpenMenu(null);
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className="account-main" onClick={() => setOpenMenu(null)}>
      <div className="top-header">
        <div>
          <h2 className="page-title">İstifadəçilər</h2>
          <p className="page-subtitle">
            Bütün qeydiyyatlı istifadəçiləri idarə edin.
          </p>
        </div>
        <div className="header-right">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Ad, email, kod və ya peşə..."
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="user-count-badge">
            <FiUser />
            <span>{filtered.length} istifadəçi</span>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-wrapper">
          <table className="accounts-table">
            <thead>
              <tr>
                <th>
                  <FiHash className="th-icon" /> Kod
                </th>
                <th>
                  <FiUser className="th-icon" /> Ad Soyad
                </th>
                <th>
                  <FiMail className="th-icon" /> Email
                </th>
                <th>
                  <FiBriefcase className="th-icon" /> Peşə
                </th>
                <th>Bacarıqlar</th>
                <th>Staj</th>
                <th>
                  <FiEye className="th-icon" /> Baxışlar
                </th>
                <th>
                  <FiExternalLink className="th-icon" /> Link
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="empty-row">
                    <FiSearch className="empty-icon" />
                    <span>Nəticə tapılmadı</span>
                  </td>
                </tr>
              ) : (
                paginated.map((user) => (
                  <React.Fragment key={user.id}>
                    <tr
                      className={`data-row ${expandedRow === user.id ? "expanded" : ""}`}
                      onClick={() => toggleRow(user.id)}
                    >
                      <td>
                        <span className="user-code">{user.code}</span>
                      </td>
                      <td>
                        <div className="user-name-cell">
                          <div className="avatar">{user.name.charAt(0)}</div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="email-text">{user.email}</span>
                      </td>
                      <td>
                        <span className="profession-text">
                          {user.profession}
                        </span>
                      </td>
                      <td>
                        <div className="skills-cell">
                          {user.skills.slice(0, 2).map((s, i) => (
                            <span key={i} className="skill-tag">
                              {s}
                            </span>
                          ))}
                          {user.skills.length > 2 && (
                            <span className="skill-tag more">
                              +{user.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="experience-text">
                          {user.experience}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`views-badge ${user.views > 200 ? "high" : user.views > 50 ? "mid" : "low"}`}
                        >
                          {user.views}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <a
                          href={user.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="profile-link-btn"
                        >
                          <FiExternalLink />
                          <span>Profil</span>
                        </a>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="action-menu-wrap">
                          <button
                            className="more-btn"
                            onClick={(e) => toggleMenu(e, user.id)}
                          >
                            <FiMoreVertical />
                          </button>
                          {openMenu === user.id && (
                            <div className="action-dropdown">
                              <button className="dropdown-item edit">
                                <FiEdit2 /> Düzəliş et
                              </button>
                              <button className="dropdown-item delete">
                                <FiTrash2 /> Sil
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>

                    {expandedRow === user.id && (
                      <tr className="expand-row">
                        <td colSpan={9}>
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
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
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
