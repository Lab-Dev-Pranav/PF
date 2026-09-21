import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import NameIntro from './nameintro';
import './degitalintro.css';

const INTRO_DURATION_MS = 6600;
const FADE_OUT_DURATION_MS = 600;

const DigitalIntro = () => {
  const navigate = useNavigate();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = window.setTimeout(() => setIsFadingOut(true), INTRO_DURATION_MS - FADE_OUT_DURATION_MS);
    const navigateTimer = window.setTimeout(() => {
      navigate('/home', { replace: true });
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <section className={`intro-screen ${isFadingOut ? 'fade-out' : ''}`} aria-label="Portfolio intro animation">
      <Helmet>
        <title>Pranav | Portfolio</title>
        <meta name="description" content="Pranav | Intro" />
        <meta name="keywords" content="Pranav | Intro" />
        <meta name="author" content="Pranav" />
      </Helmet>
      <div className="intro-orbit intro-orbit-one" />
      <div className="intro-orbit intro-orbit-two" />
      <div className="intro-content">
        <p className="intro-kicker">My Portfolio</p>
        <h1 className="intro-title"><NameIntro /></h1>
        <p className="intro-copy">Entering In a World Of TECH</p>
        <div className="intro-loader" aria-hidden="true">
          <span className="intro-loader-bar" style={{ animationDuration: `${INTRO_DURATION_MS}ms` }} />
        </div>
      </div>
    </section>
  );
};

export default DigitalIntro;
