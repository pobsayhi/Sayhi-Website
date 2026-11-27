import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import '../Home/home.css';
import './Team.css';
import './TeamMemberDetail.css';
import teamMembers from '../../data/teamMembers';
import { DEMO_WORKS } from '../Work/workdata';
import { imageDims } from '../../data/imageDims';

/* =========================================
   Breadcrumb icons — เส้นบางสไตล์เดียวกับ Figma
========================================= */
function HomeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="m12 2 9 4.8-9 4.8L3 6.8 12 2Z" />
      <path d="m3 11.5 9 4.8 9-4.8" />
      <path d="m3 16.2 9 4.8 9-4.8" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M3 7a2 2 0 0 1 2-2h4l2.2 2.5H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  );
}

function FolderPlusIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M3 7a2 2 0 0 1 2-2h4l2.2 2.5H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      <path d="M12 10.5v5M9.5 13h5" />
    </svg>
  );
}

function TeamMemberDetail() {
  const { id } = useParams();
  const member = teamMembers.find((m) => m.id === id);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [prevId, setPrevId] = useState(id);
  const carouselTrackRef = useRef(null);

  // เปลี่ยนสมาชิก — reset state (adjust state ระหว่าง render ตามแนวทาง React)
  if (prevId !== id) {
    setPrevId(id);
    setImgError(false);
  }

  // init ธีม — โครงเดียวกับหน้า Team (body.dark-mode + localStorage["theme"])
  useEffect(() => {
    if (document.body.classList.contains('dark-mode') || localStorage.getItem('theme') === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
      // set attribute ชุดเดียวกับหน้า Home/Contact/Work เพื่อให้ตัวแปร --bg-primary ฯลฯ เปลี่ยนตาม
      document.documentElement.dataset.theme = 'dark';
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('team-dark-bg');
    } else {
      document.body.classList.remove('team-dark-bg');
    }

    return () => document.body.classList.remove('team-dark-bg');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.dataset.theme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
    }
  };

  // ลงขึ้นบนสุดของหน้าเมื่อเปลี่ยนสมาชิก
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // id ไม่ตรงกับสมาชิกคนไหน → ส่งกลับหน้า Team
  if (!member) {
    return <Navigate to="/team" replace />;
  }

  // ผลงานจริงของคนนี้จาก workdata.js (จับคู่ด้วย creator = nickname) — ช่องที่เหลือจนครบ 12
  // เติมด้วยกากบาทว่าง (เกิน 12 ช่อง frame จะ scroll ให้เอง)
  const memberWorks = DEMO_WORKS.filter((w) => w.creator === member.nickname);
  const slotCount = Math.max(12, memberWorks.length);

  // carousel "Other member" — เลื่อนซ้าย/ขวาทีละ ~80% ความกว้าง viewport (เคารพ reduced-motion)
  const scrollCarousel = (direction) => {
    const track = carouselTrackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const otherMembers = teamMembers.filter((m) => m.id !== member.id);

  return (
    <>
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo"></div>
          <div className="menu-links">
            <Link to="/">Home</Link>
            <Link to="/work">Work</Link>
            <Link to="/team" className="active">Team</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="nav-actions">
            <label className="theme-switch" htmlFor="checkbox" aria-label="Toggle Dark Mode">
              <input
                type="checkbox"
                id="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="slider round"></div>
            </label>
          </div>
          <button className="hamburger-btn" aria-label="Menu">☰</button>
        </div>

        <Link to="/" className="nav-brand-logo" aria-label="Say Hi Home">
          <img src="/logoSayHi-03.webp" alt="Say Hi Logo" className="logo-light" />
          <img src="/logoSayHi-01.webp" alt="Say Hi Logo Dark" className="logo-dark" />
        </Link>
      </nav>

      <main className="member-detail-container">
        {/* ---- breadcrumb: home > layers > folder > folder-plus ---- */}
        <nav className="member-breadcrumb" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/" className="breadcrumb-crumb" aria-label="Home">
                <HomeIcon />
              </Link>
            </li>
            <li className="breadcrumb-item" aria-hidden="true">
              <span className="breadcrumb-sep">&gt;</span>
            </li>
            <li className="breadcrumb-item">
              <Link to="/team" className="breadcrumb-crumb" aria-label="All members">
                <LayersIcon />
              </Link>
            </li>
            <li className="breadcrumb-item" aria-hidden="true">
              <span className="breadcrumb-sep">&gt;</span>
            </li>
            <li className="breadcrumb-item">
              <span className="breadcrumb-crumb is-current" aria-current="page">
                <FolderIcon />
              </span>
            </li>
            <li className="breadcrumb-item" aria-hidden="true">
              <span className="breadcrumb-sep">&gt;</span>
            </li>
            <li className="breadcrumb-item">
              <span className="breadcrumb-crumb is-current" aria-current="page">
                <FolderPlusIcon />
              </span>
            </li>
          </ol>
        </nav>

        {/* ---- ส่วนบน: รูปสมาชิก + กล่องคำพูด (ซ้าย) | กรอบกริดผลงาน (ขวา) ---- */}
        <section className="member-top" aria-label={`${member.nickname} profile`}>
          <div className="member-figure">
            <p className="speech-bubble">
              <span className="bubble-accent">{member.nickname}</span>
              <span className="bubble-text">{member.role}</span>
            </p>
            <div className="member-photo-frame">
              {member.image && !imgError ? (
                <img
                  src={member.image}
                  alt={`${member.nickname} — ${member.fullName}`}
                  width={1200}
                  height={1800}
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="member-detail-initial" aria-hidden="true">
                  {member.nickname.charAt(0)}
                </span>
              )}
            </div>
            <div className="photo-edge" aria-hidden="true"></div>
          </div>

          <div className="works-panel">
            <div
              className="works-frame"
              role="region"
              aria-label={`Works of ${member.nickname}`}
              tabIndex={0}
            >
              <ul className="works-grid">
                {Array.from({ length: slotCount }, (_, slotIndex) => {
                  const work = memberWorks[slotIndex];
                  if (!work) {
                    // ช่องว่าง — กากบาท wireframe เดียวกับ placeholder การ์ดหน้า Team
                    return (
                      <li className="works-cell-wrap" key={`empty-${slotIndex}`}>
                        <span className="works-cell works-cell-empty" aria-hidden="true"></span>
                      </li>
                    );
                  }
                  const cell = (
                    <>
                      <img
                        src={work.image}
                        alt={work.title}
                        {...imageDims(work.image)}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.classList.add('is-placeholder');
                        }}
                      />
                      <span className="work-x" aria-hidden="true">✕</span>
                    </>
                  );
                  // คลิกเข้าหน้ารายละเอียดงาน (motion จะเป็นวิดีโอ YouTube ที่นั่น)
                  return (
                    <li className="works-cell-wrap" key={work.id}>
                      <Link
                        to={`/work/detail/${work.id}`}
                        className="works-cell works-cell-work"
                        aria-label={`${work.title} (${work.type})`}
                      >
                        {cell}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* ชั้นไม้ใต้กรอบ — ตาม Figma */}
            <div className="works-shelf" aria-hidden="true"></div>
          </div>
        </section>
      </main>

      {/* ---- เส้นคั่น + Other member carousel ---- */}
      <section className="other-member" aria-label="Other members">
        <div className="section-rule" aria-hidden="true"></div>
        <h2 className="other-member-heading">Other member</h2>

        <div className="carousel">
          <button
            type="button"
            className="carousel-arrow carousel-arrow-left"
            onClick={() => scrollCarousel(-1)}
            aria-label="Scroll to previous members"
          >
            ❮
          </button>

          <ul className="carousel-track" ref={carouselTrackRef}>
            {otherMembers.map((m) => (
              <li className="carousel-item" key={m.id}>
                <Link
                  to={`/team/${m.id}`}
                  className="other-card"
                  aria-label={`${m.nickname} — ${m.role} — view profile`}
                >
                  {m.image ? (
                    <img
                      src={m.image}
                      alt=""
                      width={1200}
                      height={1800}
                      loading="lazy"
                      decoding="async"
                      className="other-card-photo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('is-placeholder');
                      }}
                    />
                  ) : null}
                  <span className="other-card-initial" aria-hidden="true">
                    {m.nickname.charAt(0)}
                  </span>
                  <span className="other-card-caption">{m.nickname}</span>
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="carousel-arrow carousel-arrow-right"
            onClick={() => scrollCarousel(1)}
            aria-label="Scroll to next members"
          >
            ❯
          </button>
        </div>
      </section>

      {/* ---- Footer — component เดิมของเว็บ ---- */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="wire-box logo-box"></div>
            <h2 className="footer-title-sayhi">SAY HI</h2>
            <a href="mailto:sayhimultimedia@gmail.com" className="footer-email">sayhimultimedia@gmail.com</a>
          </div>
          <div className="footer-links">
            <div className="link-col">
              <h4 className="footer-heading">PAGES</h4>
              <Link to="/">HOME</Link>
              <Link to="/work?category=graphic">GRAPHIC</Link>
              <Link to="/work?category=production">PRODUCTION</Link>
              <Link to="/work?category=website">WEBSITE</Link>
              <Link to="/work?category=drawing">DRAWING</Link>
              <Link to="/team">OUR TEAM</Link>
              <Link to="/contact">CONTACT</Link>
            </div>
            <div className="link-col contact-col">
              <h4 className="footer-heading">CONTACT</h4>
              <div className="social-icons">
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-icon-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/sayh.i2026/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default TeamMemberDetail;
