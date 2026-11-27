import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import '../Home/home.css';
import './Work.css';
import { DEMO_WORKS } from './workdata';
import { imageDims } from '../../data/imageDims';

// ตัวเลือกตัวกรองด้านซ้าย (ตาม Wireframe)
const FILTER_OPTIONS = {
  type: ['GRAPHIC', 'PHOTOGRAPHY', 'MOTION', '3D', 'PRODUCTION'],
  style: ['FUN & PLAYFUL', 'MODERN MINIMAL', 'Y2K', 'CARTOON'],
  purpose: ['PROMOTE', 'EDUCATION', 'SOCIAL', 'GAME', 'BRAND'],
};


function Work() {
  const [searchParams] = useSearchParams();
  const { category: paramCategory } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    style: [],
    purpose: [],
  });

  const [openSections, setOpenSections] = useState({
    type: true,
    style: true,
    purpose: true,
  });

  const [searchQuery, setSearchQuery] = useState('');

  // ซิงค์ Dark Mode กับหน้า Home และ Team (ไม่เปลี่ยนชุดสีเดิม)
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;

    setIsDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', isDark);
  }, []);

  // อ่านหมวดหมู่จาก URL (เช่น /work/graphic หรือ /work?category=graphic)
  useEffect(() => {
    const rawCategory = paramCategory || searchParams.get('category');
    if (!rawCategory) return;

    const mapCategory = {
      graphic: 'GRAPHIC',
      photography: 'PHOTOGRAPHY',
      photo: 'PHOTOGRAPHY',
      motion: 'MOTION',
      'motion-graphic': 'MOTION',
      '3d': '3D',
      production: 'PRODUCTION',
    };

    const mapped = mapCategory[rawCategory.toLowerCase()];
    if (mapped) {
      setSelectedFilters((prev) => ({ ...prev, type: [mapped] }));
    }
  }, [paramCategory, searchParams]);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    const theme = nextDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-mode', nextDark);
    localStorage.setItem('theme', theme);
  };

  const handleFilterChange = (group, value) => {
    setSelectedFilters((prev) => {
      const exists = prev[group].includes(value);
      return {
        ...prev,
        [group]: exists ? prev[group].filter((v) => v !== value) : [...prev[group], value],
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({ type: [], style: [], purpose: [] });
    setSearchQuery('');
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // กรองรายการแบบ Real-time สไตล์ Shopee
  const filteredWorks = useMemo(() => {
    return DEMO_WORKS.filter((work) => {
      const matchType = selectedFilters.type.length === 0 || selectedFilters.type.includes(work.type);
      const matchStyle = selectedFilters.style.length === 0 || selectedFilters.style.includes(work.style);
      const matchPurpose = selectedFilters.purpose.length === 0 || selectedFilters.purpose.includes(work.purpose);
      const matchSearch =
        searchQuery.trim() === '' ||
        work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchType && matchStyle && matchPurpose && matchSearch;
    });
  }, [selectedFilters, searchQuery]);

  // หัวข้อใหญ่บน Hero เปลี่ยนตามหมวดที่ติ๊ก (ถ้ายังไม่ติ๊กแสดง Graphic ตาม Wireframe)
  const heroTitle =
    selectedFilters.type.length === 1 ? selectedFilters.type[0] : 'Work';

  const totalActiveFilters =
    selectedFilters.type.length + selectedFilters.style.length + selectedFilters.purpose.length;

  return (
    <>
      {/* โลโก้มุมซ้ายบน */}
      <Link to="/" className="nav-brand-logo" aria-label="Say Hi Home">
        <img src="/logoSayHi-03.png" alt="Say Hi Logo" className="logo-light" />
        <img src="/logoSayHi-01.png" alt="Say Hi Logo Dark" className="logo-dark" />
      </Link>

      {/* Nav-bar เดิม */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo"></div>
          <div className="menu-links">
            <Link to="/">Home</Link>
            <Link to="/work" className="active">Work</Link>
            <Link to="/team">Team</Link>
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
      </nav>

      <main className="work-page">
        {/* Hero Banner เปล่า (กรอบกากบาทเต็มจอ + ข้อความมุมซ้ายล่าง) */}
        <section className="work-hero">
          <div className="work-hero-media">
            <div className="work-hero-fade"></div>
            <div className="work-hero-overlay">
              <h1 className="work-hero-title">{heroTitle}</h1>
            </div>
          </div>
          <div className="work-hero-desc-wrapper">
            <p className="work-hero-desc">
              A showcase of everything we love creating. From graphic design and 3D art to full
              production, here&apos;s a look at how we mix creativity and tech to turn ideas into
              reality.
            </p>
          </div>
        </section>

        {/* ส่วน Breadcrumb + ตัวกรองซ้าย + การ์ดเปล่าขวา */}
        <section className="work-catalog-container">
          <div className="work-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="crumb-link" title="Home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>
            <span className="crumb-sep">&gt;</span>
            <button type="button" className="crumb-link crumb-btn" onClick={clearAllFilters} title="All Works">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </button>
            <span className="crumb-sep">&gt;</span>
            <span className="crumb-current">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </span>
          </div>

          <div className="work-main-layout">
            {/* ซ้าย: ตัวกรอง TYPE / STYLE / PURPOSE */}
            <aside className="work-sidebar">
              {['type', 'style', 'purpose'].map((group) => (
                <div className="filter-box" key={group}>
                  <button
                    type="button"
                    className="filter-box-header"
                    onClick={() => toggleSection(group)}
                  >
                    <span>{group.toUpperCase()}</span>
                    <span className={`filter-chevron ${openSections[group] ? 'open' : ''}`}>⌄</span>
                  </button>
                  {openSections[group] && (
                    <div className="filter-box-body">
                      {FILTER_OPTIONS[group].map((item) => (
                        <label className="filter-checkbox-item" key={item}>
                          <input
                            type="checkbox"
                            checked={selectedFilters[group].includes(item)}
                            onChange={() => handleFilterChange(group, item)}
                          />
                          <span className="custom-checkbox"></span>
                          <span className="filter-label-text">{item}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </aside>

            {/* ขวา: ช่องค้นหา (แบบ Google) + กริดผลงาน Demo 3 คอลัมน์ */}
            <div className="work-feed-area">
              <div className="work-search-field">
                <svg className="work-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.5" y2="16.5" />
                </svg>
                <input
                  type="text"
                  className="work-search-input"
                  placeholder="Search"
                  aria-label="Search works"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="work-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {totalActiveFilters > 0 && (
                <div className="active-filters-bar">
                  <span className="active-filters-count">พบ {filteredWorks.length} ผลงาน:</span>
                  <div className="active-chips-list">
                    {Object.entries(selectedFilters).map(([group, values]) =>
                      values.map((val) => (
                        <button
                          key={`${group}-${val}`}
                          type="button"
                          className="filter-chip"
                          onClick={() => handleFilterChange(group, val)}
                        >
                          {val} <span>✕</span>
                        </button>
                      ))
                    )}
                    <button type="button" className="clear-filters-btn" onClick={clearAllFilters}>
                      ล้างทั้งหมด
                    </button>
                  </div>
                </div>
              )}

              {filteredWorks.length > 0 ? (
                <div className="work-items-grid">
                  {filteredWorks.map((work) => (
                    <Link
                      to={`/work/detail/${work.id}`}
                      className="work-grid-card"
                      key={work.id}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div className={`work-card-thumb ${work.image ? 'has-image' : ''}`}>
                        {work.image && (
                          <img
                            src={work.image}
                            alt={work.title}
                            {...imageDims(work.image)}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        {work.youtubeId && (
                          <span className="work-play-badge" aria-label="Motion video">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <polygon points="6,4 20,12 6,20" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <div className="work-card-meta">
                        <h3 className="work-item-title">{work.title}</h3>
                        <p className="work-item-sub">
                          {work.creator} - {work.type}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="work-empty-state">
                  <p>ไม่พบผลงานที่ตรงกับตัวกรองที่เลือก</p>
                  <button type="button" className="pill-btn btn-blue" onClick={clearAllFilters}>
                    แสดงผลงานทั้งหมด
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer เดิม */}
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
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/sayh.i2026/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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

export default Work;