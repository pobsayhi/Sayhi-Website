import React, { useState, useEffect, useRef } from 'react';
import '../Home/home.css';
import './Team.css';
import { Link } from 'react-router-dom';
import teamMembers from '../../data/teamMembers';
import { DEMO_WORKS } from '../Work/workdata';
import { imageDims } from '../../data/imageDims';

function Team() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const teamGridRef = useRef(null); // ใช้สำหรับอ้างอิงตำแหน่งตารางรูปทีม

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


  useEffect(() => {
    const cards = document.querySelectorAll('.team-card');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-show');
            observer.unobserve(entry.target); // เล่น Animation แค่ครั้งแรกที่เลื่อนมาเจอ
          }
        });
      },
      {
        threshold: 0.15, 
        rootMargin: '0px 0px -30px 0px'
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

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

  // ฟังก์ชันกดปุ่ม SEE ALL MEMBER แล้วเลื่อนลงมาแบบสมูท
  const scrollToTeamGrid = () => {
    teamGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
                    <img src="/logoSayHi-03.png" alt="Say Hi Logo" className="logo-light" />
                    <img src="/logoSayHi-01.png" alt="Say Hi Logo Dark" className="logo-dark" />
        </Link>

      </nav>

      <main className="team-page-container">
        {/* หัวหน้า — ตัวใหญ่ gradient + บรรทัดอธิบาย + เส้นคั่น (แทนการ์ด hero เดิม) */}
        <header className="team-page-header">
          <h1 className="team-page-title">OUR TEAM</h1>
          <p className="team-page-subtitle">SAY HI INCORPORATED — {teamMembers.length} people behind everything we make</p>
          <div className="team-page-rule" aria-hidden="true"></div>
        </header>

        {/* See All Member Indicator - กดแล้วเลื่อนลงมาแบบนุ่มนวล */}
        <div 
          className="see-all-indicator" 
          onClick={scrollToTeamGrid} 
          style={{ cursor: 'pointer' }}
        >
          <span className="see-all-text">SEE ALL MEMBER</span>
          <div className="down-arrow-icon">▼</div>
        </div>

        {/* เส้นคั่นแทนปุ่มสลับมุมมอง */}
        <div className="section-divider"></div>

        {/* Team Members Grid */}
        <section className="team-grid" ref={teamGridRef}>
          {teamMembers.map((member, index) => {
            // ผลงานจริงของคนนี้จาก workdata.js — ใช้ใน hover preview
            const memberRealWorks = DEMO_WORKS.filter((w) => w.creator === member.nickname);
            return (
            <Link
              to={`/team/${member.id}`}
              className="team-card"
              key={member.id}
              aria-label={`${member.nickname} — ${member.role} — view profile`}
              style={{ transitionDelay: `${(index % 3) * 0.15}s` }} // ให้การ์ดในแถวเดียวกัน (3 ใบ) ขึ้นมาไล่เลี่ยกัน
            >
              <div className={`card-img-placeholder ${member.image ? 'has-image' : ''}`}>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.nickname}
                    className="member-photo"
                    width={1200}
                    height={1800}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.remove('has-image');
                    }}
                  />
                ) : (
                  <span className="x-mark">✕</span>
                )}
                {/* Hover / focus-visible preview — ภาพย่อของหน้า detail (อ่านข้อมูลจาก teamMembers.js ชุดเดียวกัน)
                    แสดงรูปสมาชิก + กริดผลงานย่อ 3x2 + ชื่อเล่น + VIEW PROFILE — ซ่อนบนทัชสกรีนด้วย @media (hover: none) */}
                <div className="card-preview" aria-hidden="true">
                  <div className="preview-head">
                    <span className="preview-avatar">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt=""
                          width={1200}
                          height={1800}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('is-initial');
                          }}
                        />
                      ) : null}
                      <span className="preview-avatar-initial">{member.nickname.charAt(0)}</span>
                    </span>
                    <h4 className="preview-nickname">{member.nickname}</h4>
                  </div>
                  <div className="preview-grid">
                    {Array.from({ length: 6 }, (_, cellIndex) => {
                      const work = memberRealWorks[cellIndex];
                      if (!work) {
                        return <span className="preview-cell is-empty" key={`empty-${cellIndex}`}></span>;
                      }
                      return (
                        <span className={`preview-cell${work.image ? '' : ' is-placeholder'}`} key={work.id}>
                          {work.image ? (
                            <img
                              src={work.image}
                              alt=""
                              {...imageDims(work.image)}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.classList.add('is-placeholder');
                              }}
                            />
                          ) : (
                            <span className="preview-cell-x">✕</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <span className="preview-cta">View profile →</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="member-nickname">{member.nickname}</h3>
                <p className="member-fullname">{member.fullName}</p>
                <p className="member-role">{member.role}</p>
              </div>
            </Link>
            );
          })}
        </section>
      </main>

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

export default Team;