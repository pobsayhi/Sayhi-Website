import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import TeamMemberDetail from './pages/Team/TeamMemberDetail';
import Contact from './pages/Contact';
import Work from './pages/Work';
import WorkDetail from './pages/Work/WorkDetail';

// กดเปลี่ยนหน้าแล้วเลื่อนขึ้นบนสุดเสมอ (ยกเว้น URL มี hash — ปล่อยให้ anchor ทำงานเอง)
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // ปิด browser scroll restoration กันการแย่ง scroll หลังกด Back
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/detail/:id" element={<WorkDetail />} />
        <Route path="/work/:category" element={<Work />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:id" element={<TeamMemberDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
