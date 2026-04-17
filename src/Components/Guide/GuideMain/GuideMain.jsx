import React, { useState } from "react";
import { FiChevronRight, FiChevronLeft, FiSettings } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi2";
import { PiPackage } from "react-icons/pi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { BsListCheck } from "react-icons/bs";
import { HiOutlineBookOpen } from "react-icons/hi";
import "./GuideMain.scss";

const planType = () =>
  (localStorage.getItem("planType") || "sahibkar").toLowerCase();

const STEPS = [
  {
    num: 1,
    icon: <HiOutlineHome />,
    title: "Profil bölməsini doldurun",
    desc: "1-ci hissədə fərdi məlumatlarınızı, 2-ci hissədə brend məlumatlarınızı daxil edin. Sosial şəbəkə və əlaqə linklərini əlavə edib yadda saxlayın — məlumatlar kartınızda dərhal görünəcək.",
    imageAlt: "Profil — 1-ci və 2-ci hissə",
  },
  {
    num: 2,
    icon: <TbBrandGoogleAnalytics />,
    title: "Analitikanı izləyin",
    desc: "Profil səhifənizin ziyarət statistikasını, giriş növlərini (QR, NFC, link) və cihaz məlumatlarını analitika bölməsindən izləyin. Fərdi və Brend hissələrini ayrıca müqayisə edin.",
    imageAlt: "Analitika paneli",
  },
  {
    num: 3,
    icon: <PiPackage />,
    title: "Uyğun paketi seçin",
    desc: "Paketlər bölməsindən biznesinizə uyğun planı seçin. Kart dizaynını fərdiləşdirin və ödənişi tamamlayın.",
    imageAlt: "Paket seçimi",
  },
  {
    num: 4,
    icon: <FiSettings />,
    title: "Ayarları konfiqurasiya edin",
    desc: "Sistem temasını dəyişin (tünd / açıq), şifrənizi yeniləyin və profil rəngini fərdiləşdirin.",
    imageAlt: "Ayarlar paneli",
  },
];

const BASE_PAGES = [
  {
    id: "home",
    icon: <HiOutlineHome />,
    label: "Profil",
    subs: [
      {
        id: "home-s1",
        title: "1-ci Hissə — Fərdi",
        desc: "1-ci hissədə fərdi məlumatlarınızı daxil edin: ad, peşə, bacarıqlar və istəyə bağlı iş yeri. Dəyişiklikləri yadda saxlamağı unutmayın.",
        imageAlt: "1-ci hissə — fərdi məlumatlar",
      },
      {
        id: "home-s2",
        title: "2-ci Hissə — Brend",
        desc: "2-ci hissədə müstəqil brend məlumatlarınızı daxil edin. Bu hissə həmişə brend formatındadır — şirkət adı, üstünlüklər və brend şəkli.",
        imageAlt: "2-ci hissə — brend məlumatları",
      },
      {
        id: "home-links",
        title: "Linklər",
        desc: "Hər hissəyə ayrıca linklər əlavə edin: sosial şəbəkə (Instagram, LinkedIn, Telegram...), əlaqə (telefon, e-poçt, vebsayt) və əlavə linklər. Platformu seçib URL yapışdırın.",
        imageAlt: "Link bölməsi — platform seçimi",
      },
    ],
  },
  {
    id: "analys",
    icon: <TbBrandGoogleAnalytics />,
    label: "Analitika",
    subs: [
      {
        id: "analys-entry",
        title: "Giriş növləri",
        desc: "QR skan, NFC toxunma və birbaşa link vasitəsilə neçə daxilolma olduğunu görün. Hər giriş növü ayrıca statistika ilə göstərilir.",
        imageAlt: "Giriş növü kartları",
      },
      {
        id: "analys-source",
        title: "Hansı vasitələrlə baxılıb?",
        desc: "Fərdi və Brend hissəsini ayrıca seçib hər biri üçün mənbə statistikasını (Instagram, WhatsApp, Telegram...) müqayisə edin.",
        imageAlt: "Mənbə analizi — Fərdi / Brend seçimi",
      },
      {
        id: "analys-devices",
        title: "Cihazlar",
        desc: "Profilinizə iOS, Android və ya masaüstü cihazlardan neçə daxilolma olduğunu görün. Faiz paylanması ilə vizuallaşdırılmış göstəricidir.",
        imageAlt: "Cihaz analitikası",
      },
    ],
  },
  {
    id: "packages",
    icon: <PiPackage />,
    label: "Paketlər",
    subs: [
      {
        id: "pkg-select",
        title: "Paketi seçin",
        desc: "Biznesinizin ehtiyacına uyğun planı seçin. Hər paketin xüsusiyyətləri, qiyməti və müddəti ətraflı göstərilir.",
        imageAlt: "Paket seçim ekranı",
      },
      {
        id: "pkg-billing",
        title: "Ödəniş müddəti",
        desc: "Aylıq, 6 aylıq və ya illik ödəniş seçimləri arasından birini seçin. Uzun müddətli seçimlər endirimli qiymətlə gəlir.",
        imageAlt: "Ödəniş müddəti seçimi",
      },
      {
        id: "pkg-design",
        title: "Kart dizaynı",
        desc: "Paketinizə uyğun kart dizaynını fərdiləşdirin: tema, logo, ad, vəzifə. Ön və arxa üzü önizləmədə canlı görün.",
        imageAlt: "Kart dizayn paneli",
      },
      {
        id: "pkg-payment",
        title: "Ödənişi tamamlayın",
        desc: "Seçdiyiniz paketi, müddəti və kart dizaynını yoxlayıb ödənişi tamamlayın. Uğurlu ödənişdən sonra sifarişiniz işlənməyə başlayır.",
        imageAlt: "Ödəniş təsdiq ekranı",
      },
    ],
  },
  {
    id: "settings",
    icon: <FiSettings />,
    label: "Ayarlar",
    subs: [
      {
        id: "settings-theme",
        title: "Sistem temasını dəyişin",
        desc: "Tünd (dark) və ya açıq (light) rejim arasında keçid edin. Seçim dərhal tətbiq olunur və saxlanılır.",
        imageAlt: "Tema seçimi",
      },
      {
        id: "settings-password",
        title: "Parolu yeniləyin",
        desc: "Hesab təhlükəsizliyinizi artırmaq üçün cari parolunuzu daxil edib yenisini təyin edin.",
        imageAlt: "Parol yeniləmə forması",
      },
    ],
  },
];

const KORPORATIV_PAGES = [
  {
    id: "accounts",
    icon: <MdOutlineSwitchAccount />,
    label: "Hesablar",
    subs: [
      {
        id: "accounts-manage",
        title: "Hesabları idarə edin",
        desc: "Korporativ paneldə komanda üzvlərinin hesablarını əlavə edin, redaktə edin və ya silin. Hər hesabın statusunu idarə edin.",
        imageAlt: "Hesab idarəetmə paneli",
      },
    ],
  },
  {
    id: "categorys",
    icon: <TbCategory />,
    label: "Kategoriyalar",
    subs: [
      {
        id: "cat-manage",
        title: "Kategoriyaları idarə edin",
        desc: "Şirkət daxili kateqoriyaları yaradın və idarə edin. Hesabları kateqoriyalara təyin edib rahat filtrləyin.",
        imageAlt: "Kategoriya idarəetməsi",
      },
    ],
  },
];

function ImgPlaceholder({ alt }) {
  return (
    <div className="guide-img-ph" aria-label={alt}>
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span>{alt}</span>
    </div>
  );
}

function StepGuide() {
  const [current, setCurrent] = useState(0);
  const step = STEPS[current];

  return (
    <div className="guide-step-wrap">
      <div className="guide-progress">
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <button
              className={`guide-progress__dot ${i === current ? "active" : ""} ${i < current ? "done" : ""}`}
              onClick={() => setCurrent(i)}
            >
              <span>{s.num}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`guide-progress__line ${i < current ? "done" : ""}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="guide-block">
        <div className="guide-block__text">
          <div className="guide-block__icon">{step.icon}</div>
          <p className="guide-block__badge">Addım {step.num} / {STEPS.length}</p>
          <h2 className="guide-block__title">{step.title}</h2>
          <p className="guide-block__desc">{step.desc}</p>

          <div className="guide-block__nav">
            <button
              className="guide-block__nav-btn"
              onClick={() => setCurrent((c) => c - 1)}
              disabled={current === 0}
            >
              <FiChevronLeft /> Geri
            </button>
            <button
              className="guide-block__nav-btn guide-block__nav-btn--next"
              onClick={() => setCurrent((c) => c + 1)}
              disabled={current === STEPS.length - 1}
            >
              Növbəti <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="guide-block__img">
          <ImgPlaceholder alt={step.imageAlt} />
        </div>
      </div>
    </div>
  );
}

function PageGuide() {
  const isKorporativ = planType() === "korporativ";
  const PAGES = isKorporativ ? [...BASE_PAGES, ...KORPORATIV_PAGES] : BASE_PAGES;

  const [activePage, setActivePage] = useState(PAGES[0].id);
  const [activeSub, setActiveSub] = useState(PAGES[0].subs[0].id);

  const page = PAGES.find((p) => p.id === activePage) || PAGES[0];
  const sub = page.subs.find((s) => s.id === activeSub) || page.subs[0];
  const subIdx = page.subs.findIndex((s) => s.id === activeSub);

  const selectPage = (p) => {
    setActivePage(p.id);
    setActiveSub(p.subs[0].id);
  };

  return (
    <div className="guide-pages-wrap">
      <aside className="guide-nav">
        <nav className="guide-nav__list">
          {PAGES.map((p) => (
            <button
              key={p.id}
              className={`guide-nav__item ${activePage === p.id ? "active" : ""}`}
              onClick={() => selectPage(p)}
            >
              <span className="guide-nav__item-icon">{p.icon}</span>
              <span className="guide-nav__item-label">{p.label}</span>
              {activePage === p.id && <FiChevronRight className="guide-nav__item-arrow" />}
            </button>
          ))}
        </nav>
      </aside>

      <div className="guide-page-content">
        <div className="guide-content__top">
          <div className="guide-content__page-icon">{page.icon}</div>
          <div>
            <p className="guide-content__page-label">{page.label}</p>
            <h1 className="guide-content__title">{sub.title}</h1>
          </div>
        </div>

        {page.subs.length > 1 && (
          <div className="guide-sub-tabs">
            {page.subs.map((s, i) => (
              <button
                key={s.id}
                className={`guide-sub-tab ${activeSub === s.id ? "active" : ""}`}
                onClick={() => setActiveSub(s.id)}
              >
                <span className="guide-sub-tab__num">{i + 1}</span>
                {s.title}
              </button>
            ))}
          </div>
        )}

        <div className="guide-block">
          <div className="guide-block__text">
            <p className="guide-block__desc">{sub.desc}</p>

            {page.subs.length > 1 && (
              <div className="guide-block__nav">
                <button
                  className="guide-block__nav-btn"
                  onClick={() => setActiveSub(page.subs[subIdx - 1].id)}
                  disabled={subIdx === 0}
                >
                  <FiChevronLeft /> Geri
                </button>
                <span className="guide-block__nav-count">{subIdx + 1} / {page.subs.length}</span>
                <button
                  className="guide-block__nav-btn guide-block__nav-btn--next"
                  onClick={() => setActiveSub(page.subs[subIdx + 1].id)}
                  disabled={subIdx === page.subs.length - 1}
                >
                  Növbəti <FiChevronRight />
                </button>
              </div>
            )}
          </div>

          <div className="guide-block__img">
            <ImgPlaceholder alt={sub.imageAlt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuideMain() {
  const [mode, setMode] = useState("steps");

  return (
    <div className="guide-wrap">
      <div className="guide-mode-bar">
        <button
          className={`guide-mode-btn ${mode === "steps" ? "active" : ""}`}
          onClick={() => setMode("steps")}
        >
          <BsListCheck />
          Necə istifadə etməli?
        </button>
        <button
          className={`guide-mode-btn ${mode === "pages" ? "active" : ""}`}
          onClick={() => setMode("pages")}
        >
          <HiOutlineBookOpen />
          Səhifələrin izahı
        </button>
      </div>

      <div className="guide-panel">
        {mode === "steps" ? <StepGuide /> : <PageGuide />}
      </div>
    </div>
  );
}
