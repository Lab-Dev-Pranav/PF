import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const MOBILE_BREAKPOINT = 768;
const DEFAULT_GLOW_COLOR = '240, 163, 110';

const createParticle = (x, y, color) => {
  const particle = document.createElement('span');
  particle.className = 'magic-bento__particle';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.background = `rgba(${color}, 1)`;
  particle.style.boxShadow = `0 0 8px rgba(${color}, 0.8)`;
  return particle;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return isMobile;
};

const MagicBentoCard = ({
  card,
  index,
  disableAnimations,
  enableTilt,
  enableMagnetism,
  clickEffect,
  enableStars,
  particleCount,
  glowColor
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const particleTimeoutsRef = useRef([]);
  const particleTemplatesRef = useRef([]);
  const hoveredRef = useRef(false);

  const clearParticles = useCallback(() => {
    particleTimeoutsRef.current.forEach(clearTimeout);
    particleTimeoutsRef.current = [];
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        onComplete: () => particle.remove()
      });
    });
    particlesRef.current = [];
  }, []);

  const showParticles = useCallback(() => {
    const element = cardRef.current;
    if (!element || !enableStars || !hoveredRef.current) return;

    if (!particleTemplatesRef.current.length) {
      const { width, height } = element.getBoundingClientRect();
      particleTemplatesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(Math.random() * width, Math.random() * height, glowColor)
      );
    }

    particleTemplatesRef.current.forEach((template, particleIndex) => {
      const timeout = setTimeout(() => {
        if (!hoveredRef.current || !cardRef.current) return;
        const particle = template.cloneNode(true);
        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);
        gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25 });
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 90,
          y: (Math.random() - 0.5) * 90,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'none'
        });
      }, particleIndex * 80);
      particleTimeoutsRef.current.push(timeout);
    });
  }, [enableStars, glowColor, particleCount]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return undefined;
    const element = cardRef.current;

    const onEnter = () => {
      hoveredRef.current = true;
      showParticles();
    };
    const onLeave = () => {
      hoveredRef.current = false;
      clearParticles();
      gsap.to(element, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.3 });
    };
    const onMove = event => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      element.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      element.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);

      if (enableTilt) {
        gsap.to(element, {
          rotateX: ((y - rect.height / 2) / (rect.height / 2)) * -5,
          rotateY: ((x - rect.width / 2) / (rect.width / 2)) * 5,
          duration: 0.15,
          transformPerspective: 900
        });
      }
      if (enableMagnetism) {
        gsap.to(element, {
          x: (x - rect.width / 2) * 0.025,
          y: (y - rect.height / 2) * 0.025,
          duration: 0.25
        });
      }
    };
    const onClick = event => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'magic-bento__ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 0.8 }, { scale: 1, opacity: 0, duration: 0.7, onComplete: () => ripple.remove() });
    };

    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    element.addEventListener('mousemove', onMove);
    element.addEventListener('click', onClick);
    return () => {
      hoveredRef.current = false;
      element.removeEventListener('mouseenter', onEnter);
      element.removeEventListener('mouseleave', onLeave);
      element.removeEventListener('mousemove', onMove);
      element.removeEventListener('click', onClick);
      clearParticles();
    };
  }, [clearParticles, clickEffect, disableAnimations, enableMagnetism, enableTilt, showParticles]);

  return (
    <article
      ref={cardRef}
      className={`magic-bento__card magic-bento__card--${index + 1}`}
      style={{ '--card-color': card.color, '--glow-color': glowColor }}
    >
      <div className="magic-bento__card-top">
        <span>{card.label}</span>
        <span className="magic-bento__index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    </article>
  );
};

const MagicBento = ({
  cards,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  particleCount = 10,
  spotlightRadius = 360,
  glowColor = DEFAULT_GLOW_COLOR,
  disableAnimations = false
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const animationsDisabled = disableAnimations || isMobile;

  useEffect(() => {
    if (animationsDisabled || !enableSpotlight || !gridRef.current) return undefined;
    const grid = gridRef.current;
    const onMove = event => {
      const rect = grid.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) {
        grid.style.setProperty('--spotlight-opacity', '0');
        return;
      }
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      grid.style.setProperty('--spotlight-x', `${x}px`);
      grid.style.setProperty('--spotlight-y', `${y}px`);
      grid.style.setProperty('--spotlight-size', `${spotlightRadius}px`);
      grid.style.setProperty('--spotlight-opacity', '1');
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [animationsDisabled, enableSpotlight, spotlightRadius]);

  return (
    <div
      ref={gridRef}
      className={`magic-bento ${enableBorderGlow ? 'magic-bento--border-glow' : ''}`}
      style={{ '--glow-color': glowColor }}
    >
      {cards.map((card, index) => (
        <MagicBentoCard
          key={card.title}
          card={card}
          index={index}
          disableAnimations={animationsDisabled}
          enableTilt={enableTilt}
          enableMagnetism={enableMagnetism}
          clickEffect={clickEffect}
          enableStars={enableStars}
          particleCount={particleCount}
          glowColor={glowColor}
        />
      ))}
    </div>
  );
};

export default MagicBento;
