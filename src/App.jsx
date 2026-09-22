import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './includes/Navbar';
import Footer from './includes/Footer';
import DigitalIntro from './degitalintro';

// Pages
import Home from './pages/Home/Home';
import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';



function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

function AppShell() {
  const location = useLocation();
  const isIntroRoute = location.pathname === '/';

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className={`app-container ${isIntroRoute ? 'app-container--intro' : ''}`}>
      {!isIntroRoute && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<DigitalIntro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      {!isIntroRoute && <Footer />}
    </div>
  );
}

export default App;
