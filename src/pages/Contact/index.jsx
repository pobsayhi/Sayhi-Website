import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Home/home.css';
import './Contact.css';
import useLocalTime from './useLocalTime';
import faqs from '../../data/faq';

const EMAIL = 'sayhimultimedia@gmail.com';

// ใส่ path รูปรวมสมาชิกทั้ง 4 รูปตรงนี้ในอนาคต เช่น "/team/group-01.webp"
// (ถ้าอยากได้ 3 รูป แค่ลบออก 1 บรรทัด เลย์เอาต์จะจัดให้โดยอัตโนมัติ)
const GROUP_PHOTOS = [
  { id: 1, alt: 'Say Hi Crew 01', src: '/Contact/All-2X8A9243.jpg' },
  { id: 2, alt: 'Say Hi Crew 02', src: '/Contact/All-2X8A9213.jpg' },
  { id: 3, alt: 'Say Hi Crew 03', src: '/Contact/All-2X8A9249.jpg' },
];

const SOCIAL_LINKS = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/' },
  { label: 'FACEBOOK', href: 'https://www.facebook.com/' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/sayh.i2026/' },
  { label: 'GITHUB', href: '#' },
];

const CURRENT_YEAR = new Date().getFullYear();

function ContactHeader() {
  return (
    <div className="contact-header">
      <p className="contact-tagline fade-up" style={{ animationDelay: '0s' }}>
        Have a project in mind?
      </p>
      <div className="contact-title-row fade-up" style={{ animationDelay: '0.15s' }}>
        <span className="title-line" aria-hidden="true"></span>
        <h1 className="contact-title text-gradient">SAY HI INCORPORATED</h1>
        <span className="title-line" aria-hidden="true"></span>
      </div>
    </div>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = EMAIL;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="email-card fade-up" style={{ animationDelay: '0.3s' }}>
      <a href={`mailto:${EMAIL}`} className="contact-email">{EMAIL}</a>
      <button
        type="button"
        className={`copy-btn${copied ? ' copied' : ''}`}
        onClick={copyEmail}
        aria-live="polite"
        aria-label={copied ? 'คัดลอกอีเมลแล้ว' : 'คัดลอกอีเมล'}
      >
        {copied ? 'COPIED ✓' : 'COPY'}
      </button>
    </div>
  );
}

function SocialGrid() {
  return (
    <nav className="social-grid fade-up" style={{ animationDelay: '0.45s' }} aria-label="Social media links">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label={`${social.label} (เปิดในแท็บใหม่)`}
        >
          {social.label} <span className="arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </nav>
  );
}

/* =========================================
   Subcomponent: LandscapePhotoCard
   รูปแนวนอนขนาดใหญ่แบบปกติ (ไม่กดเปิด Lightbox)
   + 3D Tilt & Cursor Spotlight Animation
========================================= */
function LandscapePhotoCard({ item, index, isVisible }) {
  const cardRef = useRef(null);
  const [imgFailed, setImgFailed] = useState(false);

  const showImage = Boolean(item.src) && !imgFailed;

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3.5;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 3.5;

    el.style.setProperty('--spot-x', `${percentX}%`);
    el.style.setProperty('--spot-y', `${percentY}%`);
    el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.012, 1.012, 1.012)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <div
      className={`wide-photo-cell ${isVisible ? 'is-revealed' : ''}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <div
        ref={cardRef}
        className={`wide-photo-card ${showImage ? 'has-image' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {showImage && (
          <img
            src={item.src}
            alt={item.alt}
            className="wide-photo-img"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        )}
        <span className="wide-photo-spotlight" aria-hidden="true"></span>
      </div>
    </div>
  );
}

/* =========================================
   Subcomponent: GroupGallerySection
   แกลเลอรีแนวนอนเกือบเต็มจอ + Scroll Reveal
========================================= */
function GroupGallerySection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const layoutClass = GROUP_PHOTOS.length === 3 ? 'layout-3' : 'layout-4';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="contact-wide-gallery"
      aria-label="Say Hi Team Gallery"
    >
      <div className={`wide-gallery-grid ${layoutClass}`}>
        {GROUP_PHOTOS.map((item, index) => (
          <LandscapePhotoCard
            key={item.id}
            item={item}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}

function LocalTime() {
  const time = useLocalTime();

  return (
    <span className="local-time" aria-label="เวลาท้องถิ่นกรุงเทพฯ">
      BANGKOK, TH — {time} ICT
    </span>
  );
}

/* =========================================
   Subcomponent: ScrollHint
   ตัวบอกว่าหน้าเลื่อนลงได้ — เด้งเบาๆ, คลิกแล้ว scroll ไป FAQ,
   เลื่อนลงเองแล้ว fade out
========================================= */
function ScrollHint({ targetId }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    onScroll(); // โหลดมาตรวจตำแหน่งปัจจุบันด้วย (กันกรณี reload กลางหน้า)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTarget = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(targetId)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <button
      type="button"
      className={`scroll-hint${hidden ? ' is-hidden' : ''}`}
      onClick={scrollToTarget}
      aria-label="เลื่อนลงไปดูคำถามที่พบบ่อย (FAQ)"
    >
      <span className="scroll-hint-text">SCROLL DOWN · FAQ</span>
      {/* เมาส์นิ่งๆ — จุด wheel เลื่อนลงจางหายเป็นจังหวะ (CSS) */}
      <span className="scroll-hint-icon" aria-hidden="true">
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="1.5" y="1.5" width="15" height="25" rx="7.5" />
          <line className="scroll-wheel" x1="9" y1="6" x2="9" y2="10" />
        </svg>
      </span>
    </button>
  );
}

/* =========================================
   Subcomponent: FaqSection
   Accordion เปิดทีละข้อ (ข้อแรกเปิดคาไว้) — ข้อมูลจาก src/data/faq.js
========================================= */
function FaqSection() {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  return (
    <section id="faq-section" className="contact-faq" aria-labelledby="faq-heading">
      <header className="faq-section-header">
        <h2 id="faq-heading" className="faq-heading">FAQ</h2>
        <div className="faq-rule" aria-hidden="true"></div>
      </header>

      <ul className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openId === faq.id;
          return (
            <li className={`faq-item${isOpen ? ' is-open' : ''}`} key={faq.id}>
              <h3 className="faq-q-heading">
                <button
                  type="button"
                  className="faq-question"
                  id={`faq-question-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span className="faq-num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="faq-q-text">{faq.question}</span>
                  {/* ไอคอน + ที่หมุนเป็น – เมื่อเปิด (วาดด้วย CSS) */}
                  <span className="faq-icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div
                id={`faq-panel-${faq.id}`}
                role="region"
                aria-labelledby={`faq-question-${faq.id}`}
                className="faq-answer-wrap"
              >
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="faq-more">
        Still have questions?{' '}
        <a href={`mailto:${EMAIL}`} className="faq-more-link">
          Say hi →
        </a>
      </p>
    </section>
  );
}

function Contact() {
  useEffect(() => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.classList.toggle('dark-mode', theme === 'dark');
      if (toggleSwitch) toggleSwitch.checked = theme === 'dark';
    }

    function initTheme() {
      const saved = localStorage.getItem('theme');
      if (saved) {
        applyTheme(saved);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
      }
    }

    function switchTheme(e) {
      const newTheme = e.target.checked ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }

    initTheme();
    if (toggleSwitch) toggleSwitch.addEventListener('change', switchTheme);

    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const menuLinks = document.querySelector('.menu-links');

    const handleHamburger = () => {
      if (!menuLinks) return;
      const isOpen = menuLinks.style.display === 'flex';
      menuLinks.style.display = isOpen ? 'none' : 'flex';
      menuLinks.style.flexDirection = 'column';
      menuLinks.style.position = 'absolute';
      menuLinks.style.top = '70px';
      menuLinks.style.left = '0';
      menuLinks.style.width = '100%';
      menuLinks.style.background = 'rgba(255, 255, 255, 0.95)';
      menuLinks.style.padding = '1rem';
      menuLinks.style.borderRadius = '20px';
    };

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', handleHamburger);

    return () => {
      if (toggleSwitch) toggleSwitch.removeEventListener('change', switchTheme);
      if (hamburgerBtn) hamburgerBtn.removeEventListener('click', handleHamburger);
    };
  }, []);

  const backToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo"></div>
          <div className="menu-links">
            <Link to="/">Home</Link>
            <Link to="/work">Work</Link>
            <Link to="/team">Team</Link>
            <Link to="/contact" className="active">Contact</Link>
          </div>
          <div className="nav-actions">
            <label className="theme-switch" htmlFor="checkbox" aria-label="Toggle Dark Mode">
              <input type="checkbox" id="checkbox" />
              <div className="slider round"></div>
            </label>
          </div>
          <button className="hamburger-btn" aria-label="Menu">☰</button>

          <Link to="/" className="nav-brand-logo" aria-label="Say Hi Home">
            <img src="/logoSayHi-03.png" alt="Say Hi Logo" className="logo-light" />
            <img src="/logoSayHi-01.png" alt="Say Hi Logo Dark" className="logo-dark" />
          </Link>
        </div>
      </nav>

      <main className="contact-page contact-page--stacked">
        {/* เนื้อหา Contact เดิม — ครอบด้วย .contact-original (สั้นกว่าเต็มจอเล็กน้อยให้ FAQ โผล่ที่ขอบล่าง) */}
        <div className="contact-original">
          <section className="contact-hero">
            <ContactHeader />
            <EmailCard />
            <SocialGrid />
          </section>

          <ScrollHint targetId="faq-section" />

          <GroupGallerySection />
        </div>

        <FaqSection />

        {/* Footer ทั้งแถว — ย้ายมาไว้ใต้ FAQ (ท้ายสุดของหน้า) */}
        <footer className="contact-footer contact-footer--time-bottom">
          <span className="copyright">© {CURRENT_YEAR} SAY HI INCORPORATED</span>
          <button type="button" className="back-to-top" onClick={backToTop}>
            BACK TO TOP <span aria-hidden="true">↑</span>
          </button>
          <LocalTime />
        </footer>
      </main>
    </>
  );
}

export default Contact;