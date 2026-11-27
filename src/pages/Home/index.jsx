import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './home.css';

const teamMembers = [
  { id: 1, nickname: "POB", name: "KORPAPOP KUMWAN", role: "CEO / DEVELOPER", image: "/team/pob.JPG" },
  { id: 2, nickname: "PUMPUI", name: "KANYAPAT THONGRANG", role: "GRAPHIC DESIGN", image: "/team/pumpui.jpg" },
  { id: 3, nickname: "IM", name: "CHAIANAN TURAPONG", role: "PROGRAMMER", image: "/team/im.jpg" },
  { id: 4, nickname: "LUKTAN", name: "NAMPHET AIAMONG", role: "GRAPHIC DESIGN", image: "/team/luktan.jpg" },
  { id: 5, nickname: "KAN HI-END", name: "SAKKAN MEEJAN", role: "FRONT END DEVELOPER", image: "/team/kan.jpg" },
  { id: 6, nickname: "SOS", name: "SORRAWIT KULSAROJ", role: "DEVELOPER", image: "/team/sos.jpg" },
  { id: 7, nickname: "TOON", name: "SITTHISAK SUKSATHIT", role: "DEVELOPER", image: "/team/toon.jpg" },
  { id: 8, nickname: "SODA", name: "SIRIPONG WANCHAWEE", role: "DEVELOPER", image: "/team/soda.jpg" },
  { id: 9, nickname: "BOSS", name: "APICHART INSING", role: "UX/UI", image: "/team/boss.jpg" },
  { id: 10, nickname: "ZODA", name: "PATTANASAK KHAEKTAO", role: "DEVELOPER", image: "/team/zoda.JPG" },
  { id: 11, nickname: "FAH", name: "SROIFA PANTIP", role: "GRAPHIC DESIGN", image: "/team/fah.jpg" },
];

// รูป marquee ด้านบนสุดของหน้า Home (public/home/) — วนซ้ำตามลำดับนี้ทุกกล่อง
const HERO_MARQUEE_IMAGES = [
  { id: 1, src: '/home/digital-horizon-pumpui.jpg', alt: 'Digital Horizon — photography by PUMPUI' },
  { id: 2, src: '/home/emu-otori.png', alt: 'Emu Otori — 3D art by BOSS' },
  { id: 3, src: '/home/img-1921-kan.jpg', alt: 'Photography by KAN HI-END' },
  { id: 4, src: '/home/the-light-sorrawit.jpg', alt: 'The Light — photography by SOS' },
  { id: 5, src: '/home/the-lotus-luktan.jpg', alt: 'The Lotus — graphic design by LUKTAN' },
  { id: 6, src: '/home/yesterday-practice-boss.png', alt: 'Yesterday Practice — graphic design by BOSS' },
  { id: 7, src: '/home/crimson-deck-sos.png', alt: 'Crimson Deck — mandala design by SODA' },
  { id: 8, src: '/home/the-door-luktan.jpg', alt: 'The Door — surrealist digital collage by LUKTAN' },
  { id: 9, src: '/home/do-anything.jpg', alt: 'Do Anything — artwork by BOSS' },
  { id: 10, src: '/home/lover-cmm.png', alt: 'Lover — artwork by BOSS' },
  { id: 11, src: '/home/nike.png', alt: 'Nike — artwork by BOSS' },
];

// กล่องรูปหนึ่งชุดของ marquee (ใช้ซ้ำทุกแถว/ทุกสำเนา — ชุดเหมือนกันทำให้วนลูปไร้รอยต่อ)
function MarqueeImageSet() {
  return (
    <>
      {HERO_MARQUEE_IMAGES.map((img) => (
        <div
          key={img.id}
          className="grid-img has-image"
          style={{ backgroundImage: `url(${img.src})` }}
          role="img"
          aria-label={img.alt}
        ></div>
      ))}
    </>
  );
}

function TeamCard({ member }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showPlaceholder = !member.image || imgFailed;

  return (
    <article className="team-card-item">
      {showPlaceholder ? (
        <div className="team-photo-placeholder" role="img" aria-label={member.name}>
          <span>{member.nickname}</span>
        </div>
      ) : (
        <img
          src={member.image}
          alt={member.name}
          className="team-photo"
          width={1200}
          height={1800}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      )}
      <div className="team-card-info">
        <h3 className="member-nickname">{member.nickname}</h3>
        <p className="member-role">{member.role}</p>
      </div>
    </article>
  );
}

function Home() {
  useEffect(() => {
    // 1. Dark Mode Toggle
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (toggleSwitch) toggleSwitch.checked = (theme === 'dark');
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

    // 2. Custom Scrollbar Sync & Drag (Super Smooth 120Hz)
    const worksScroll = document.getElementById("worksScroll");
    const worksThumb = document.getElementById("worksThumb");
    const worksTrack = worksThumb ? worksThumb.parentElement : null;

    let handleScroll, handleTrackClick;
    let handlePointerDown, handlePointerMove, handlePointerUp;

    if (worksScroll && worksThumb && worksTrack) {
      handleScroll = () => {
        requestAnimationFrame(() => {
          const maxScroll = worksScroll.scrollWidth - worksScroll.clientWidth;
          const maxThumbMove = worksTrack.clientWidth - worksThumb.clientWidth;
          if (maxScroll > 0) {
            const progress = worksScroll.scrollLeft / maxScroll;
            worksThumb.style.transform = `translate3d(${progress * maxThumbMove}px, 0, 0)`;
          }
        });
      };

      handleTrackClick = (e) => {
        if (e.target === worksThumb) return;
        const rect = worksTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const thumbWidth = worksThumb.clientWidth;
        const maxThumbMove = rect.width - thumbWidth;
        const maxScroll = worksScroll.scrollWidth - worksScroll.clientWidth;

        let targetX = clickX - (thumbWidth / 2);
        targetX = Math.max(0, Math.min(maxThumbMove, targetX));

        worksScroll.style.scrollBehavior = 'smooth';
        worksScroll.scrollLeft = (targetX / maxThumbMove) * maxScroll;
      };

      let isDragging = false;
      let startMouseX = 0;
      let startScrollLeft = 0;

      handlePointerDown = (e) => {
        isDragging = true;
        startMouseX = e.clientX;
        startScrollLeft = worksScroll.scrollLeft;

        document.body.style.userSelect = 'none';
        worksScroll.style.scrollBehavior = 'auto';
        worksScroll.style.scrollSnapType = 'none';
      };

      handlePointerMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const maxThumbMove = worksTrack.clientWidth - worksThumb.clientWidth;
        const maxScroll = worksScroll.scrollWidth - worksScroll.clientWidth;
        if (maxThumbMove <= 0) return;

        const mouseDelta = e.clientX - startMouseX;
        const scrollDelta = (mouseDelta / maxThumbMove) * maxScroll;

        worksScroll.scrollLeft = startScrollLeft + scrollDelta;
      };

      handlePointerUp = () => {
        if (isDragging) {
          isDragging = false;
          document.body.style.userSelect = '';
          worksScroll.style.scrollBehavior = '';
          worksScroll.style.scrollSnapType = 'x mandatory';
        }
      };

      worksScroll.addEventListener("scroll", handleScroll, { passive: true });
      worksTrack.addEventListener("click", handleTrackClick);
      worksThumb.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);

      handleScroll();
    }

    // 3. Hamburger Menu
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const menuLinks = document.querySelector('.menu-links');

    if (hamburgerBtn && menuLinks) {
      hamburgerBtn.addEventListener('click', () => {
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
      });
    }

    // 4. Scroll Animations (IntersectionObserver)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.section-title, .works-title, .faq-title, .team-title, .work-card, .faq-center .pill-btn, .team-overlay'
    );
    animatedElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      scrollObserver.observe(el);
    });

    // 5. Parallax Scroll (FAQ)
    const faqBoxes = document.querySelectorAll('.faq-side .wire-box');
    const handleParallaxScroll = () => {
      const scrollPosition = window.scrollY;
      faqBoxes.forEach((box, index) => {
        const speed = index % 2 === 0 ? 0.08 : -0.05;
        const moveY = scrollPosition * speed;
        if (moveY > -100 && moveY < 100) box.style.setProperty('--parallax-y', `${moveY}px`);
      });
    };
    window.addEventListener('scroll', handleParallaxScroll);

    // 6. Smooth Hover Tilt (Selected Works Card 1)
    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) {
      featuredCard.addEventListener('mousemove', (e) => {
        const rect = featuredCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tiltX = -(y / rect.height) * 10;
        const tiltY = (x / rect.width) * 10;
        featuredCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        featuredCard.style.transition = 'transform 0.1s ease-out';
        featuredCard.style.zIndex = '10';
      });
      featuredCard.addEventListener('mouseleave', () => {
        featuredCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        featuredCard.style.transition = 'transform 0.5s ease-out';
        featuredCard.style.zIndex = '1';
      });
    }

    // 7. OUR TEAM Marquee Touch Pause
    const marquee = document.querySelector('.team-marquee');
    let handleTouchStart, handleTouchEnd, handleTouchCancel;

    if (marquee) {
      handleTouchStart = () => marquee.classList.add('marquee-paused');
      handleTouchEnd = () => marquee.classList.remove('marquee-paused');
      handleTouchCancel = () => marquee.classList.remove('marquee-paused');

      marquee.addEventListener('touchstart', handleTouchStart, { passive: true });
      marquee.addEventListener('touchend', handleTouchEnd);
      marquee.addEventListener('touchcancel', handleTouchCancel);
    }

    // 8. Cleanup Event Listeners
    return () => {
      window.removeEventListener('scroll', handleParallaxScroll);
      if (toggleSwitch) toggleSwitch.removeEventListener('change', switchTheme);

      if (marquee) {
        marquee.removeEventListener('touchstart', handleTouchStart);
        marquee.removeEventListener('touchend', handleTouchEnd);
        marquee.removeEventListener('touchcancel', handleTouchCancel);
      }

      if (worksScroll && handleScroll) worksScroll.removeEventListener("scroll", handleScroll);
      if (worksTrack && handleTrackClick) worksTrack.removeEventListener("click", handleTrackClick);
      if (worksThumb && handlePointerDown) worksThumb.removeEventListener("pointerdown", handlePointerDown);
      if (handlePointerMove) window.removeEventListener("pointermove", handlePointerMove);
      if (handlePointerUp) {
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
      }
    };
  }, []);

  return (
    <>
      {/* LCP hint — รูป marquee บนสุดของ hero ใช้ CSS background-image (โหลดพร้อมกันอยู่แล้ว)
          preload + fetchpriority=high ช่วยจัดลำดับให้โหลดก่อน resource อื่น — React 19 hoist <link> ขึ้น <head> เอง */}
      <link rel="preload" as="image" href="/home/digital-horizon-pumpui.jpg" fetchPriority="high" />
      <link rel="preload" as="image" href="/home/emu-otori.png" fetchPriority="high" />
      <link rel="preload" as="image" href="/home/img-1921-kan.jpg" fetchPriority="high" />

      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo"></div>
          <div className="menu-links">
            <Link to="/" className="active">Home</Link>
            <Link to="/work">Work</Link>
            <Link to="/team">Team</Link>
            <Link to="/contact">Contact</Link>
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

      <header className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content"></div>

        {/* Marquee */}
        <div className="marquee-container">
          <div className="marquee-row marquee-top">
            <div className="marquee-content">
              <MarqueeImageSet />
            </div>
            <div className="marquee-content" aria-hidden="true">
              <MarqueeImageSet />
            </div>
          </div>
          <div className="marquee-row marquee-bottom">
            <div className="marquee-content reverse">
              <MarqueeImageSet />
            </div>
            <div className="marquee-content reverse" aria-hidden="true">
              <MarqueeImageSet />
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-header">
          <span className="label">SAY HI INCORPORATED</span>
          <h2 className="section-title1">GALLERY</h2>
        </div>
      </section>

      <div className="divider"></div>

      {/* Selected Works Section */}
      <section className="selected-works">
        <div className="works-wrapper">
          <div className="works-header">
            <h2 className="works-title">SELECTED WORKS</h2>
            <Link to="/work" className="view-all-btn">View all project ↗</Link>
          </div>
          
          <div className="cards-scroll" id="worksScroll">
            <div className="work-card featured-card">
              <div className="inner-card">
                <span className="card-label">works</span>
                <h3 className="card-title">GRAPHIC</h3>
                <div className="drawing-visuals">
                  <div className="dark-circle"></div>
                  <div className="img-tilt img-tilt-1"></div>
                  <div className="img-tilt img-tilt-2"></div>
                </div>
                <Link to="/work/graphic" className="more-btn">more ↗</Link>
              </div>
            </div>
            <div className="work-card">
              <div className="inner-card">
                <span className="card-label">works</span>
                <h3 className="card-title">PHOTOGRAPHY</h3>
                <div className="standard-img"></div>
                <Link to="/work/photo" className="more-btn">more ↗</Link>
              </div>
            </div>
            <div className="work-card">
              <div className="inner-card">
                <span className="card-label">works</span>
                <h3 className="card-title">MOTION</h3>
                <div className="standard-img"></div>
                <Link to="/work/motion" className="more-btn">more ↗</Link>
              </div>
            </div>
            <div className="work-card">
              <div className="inner-card">
                <span className="card-label">works</span>
                <h3 className="card-title">3D</h3>
                <div className="standard-img"></div>
                <Link to="/work/3d" className="more-btn">more ↗</Link>
              </div>
            </div>
            <div className="work-card">
              <div className="inner-card">
                <span className="card-label">works</span>
                <h3 className="card-title">PRODUCTION</h3>
                <div className="standard-img"></div>
                <Link to="/work/production" className="more-btn">more ↗</Link>
              </div>
            </div>
          </div>

          <div className="custom-scrollbar">
            <div className="track">
              <div className="thumb" id="worksThumb"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-bg">
          <div className="faq-side left-side">
            <div className="faq-row row-top">
              <div className="wire-box"></div>
              <div className="wire-box"></div>
            </div>
            <div className="faq-row row-bottom staggered-left">
              <div className="wire-box"></div>
              <div className="wire-box"></div>
            </div>
          </div>
          <div className="faq-side right-side">
            <div className="faq-row row-top">
              <div className="wire-box"></div>
              <div className="wire-box"></div>
            </div>
            <div className="faq-row row-bottom staggered-right">
              <div className="wire-box"></div>
              <div className="wire-box"></div>
            </div>
          </div>
        </div>

        <div className="faq-center">
          <span className="faq-label">SAY HI INCORPORATED</span>
          <h2 className="faq-title text-gradient">FAQ</h2>
          <Link to="/contact" className="pill-btn btn-blue">CONTACT</Link>
        </div>
      </section>

      <div className="divider"></div>

      {/* Our Team Section */}
      <section className="our-team-section">
        <div className="team-section-header">
          <h2 className="special-title text-gradient">OUR TEAM</h2>
          <Link to="/team" className="pill-btn btn-gray">DISCOVER TEAM</Link>
        </div>

        <div className="team-marquee">
          <div className="team-track">
            {[0, 1].map((copy) => (
              <div
                className="team-track-group"
                key={copy}
                aria-hidden={copy === 1 || undefined}
              >
                {teamMembers.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

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

export default Home;