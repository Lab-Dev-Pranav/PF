import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import cert1 from '../../assets/CIRT/cert1.png';
import cert2 from '../../assets/CIRT/cert2.png';
import cert3 from '../../assets/CIRT/cert3.png';
import cert4 from '../../assets/CIRT/cert4.png';
import cert5 from '../../assets/CIRT/cert5.png';
import './Certification.css';

const certificates = [
  {
    id: 1,
    title: 'National Service Scheme (NSS)',
    issuedBy: 'Issued by SCOS-SPPU - June 2025',
    image: cert1,
    date: 'June 2025'
  },
  {
    id: 2,
    title: 'Web Developer Internship',
    issuedBy: 'Issued by Hex-Software - 20 Feb 2026',
    image: cert5,
    date: '20 Feb 2026'
  },
  {
    id: 3,
    title: 'Advanced DSA With Java',
    issuedBy: 'Issued by Apna College - May 2024',
    image: cert2,
    date: 'May 2024'
  },
  {
    id: 4,
    title: 'Delta (Full Stack Web Development)',
    issuedBy: 'Issued by Apna College - July 2025',
    image: cert3,
    date: 'July 2025'
  },
  {
    id: 5,
    title: 'Node.js Bootcamp',
    issuedBy: 'Issued by LetsUpgrade.in - 25 Oct 2025',
    image: cert4,
    date: '25 Oct 2025'
  }
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Certification = () => {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const overlayRefs = useRef([]);
  const positionRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef(null);
  const autoTimerRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const [active, setActive] = useState(0);

  const items = useMemo(() => certificates, []);

  const layout = useCallback(position => {
    const root = rootRef.current;
    if (!root) return;

    const width = root.clientWidth;
    const scale = clamp(width / 780, 0.62, 1);
    const direction = 1;

    items.forEach((_, index) => {
      const card = cardRefs.current[index];
      if (!card) return;

      let distance = index - position;
      if (items.length > 1) {
        distance = ((distance % items.length) + items.length) % items.length;
        if (distance > items.length / 2) distance -= items.length;
      }

      const behind = Math.max(0, distance);
      const shown = Math.abs(distance) <= 4.5;
      const opacity = distance < 0 ? Math.max(0, 1 + distance) : shown ? 1 : 0;
      const tintOpacity = clamp(behind * 0.12, 0, 0.6);
      const blur = Math.min(3, behind * 0.7);

      card.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${(direction * 78 * distance).toFixed(2)}px) translateZ(${(-190 * distance).toFixed(2)}px) rotateY(${(direction * 16 * clamp(distance, 0, 1)).toFixed(2)}deg)`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `brightness(${Math.max(0.28, 1 - behind * 0.12).toFixed(3)}) blur(${blur.toFixed(2)}px)`;
      card.style.zIndex = String(2000 - Math.round(distance * 20));
      card.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

      const overlay = overlayRefs.current[index];
      if (overlay) overlay.style.opacity = tintOpacity.toFixed(3);
    });
  }, [items]);

  const goTo = useCallback((rawIndex, animate = true) => {
    const count = items.length;
    const nextIndex = ((rawIndex % count) + count) % count;
    let delta = nextIndex - positionRef.current;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;

    tweenRef.current?.kill();
    const proxy = { position: positionRef.current };
    tweenRef.current = gsap.to(proxy, {
      position: positionRef.current + delta,
      duration: animate && !reducedMotionRef.current ? 0.7 : 0,
      ease: 'power3.out',
      onUpdate: () => {
        positionRef.current = proxy.position;
        layout(proxy.position);
      },
      onComplete: () => {
        positionRef.current = nextIndex;
        layout(nextIndex);
      }
    });

    if (focusRef.current !== nextIndex) {
      focusRef.current = nextIndex;
      setActive(nextIndex);
    }
  }, [items, layout]);

  const moveBy = useCallback(step => goTo(focusRef.current + step), [goTo]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resizeObserver = new ResizeObserver(() => layout(positionRef.current));
    if (rootRef.current) resizeObserver.observe(rootRef.current);
    layout(0);
    return () => {
      resizeObserver.disconnect();
      tweenRef.current?.kill();
    };
  }, [layout]);

  useEffect(() => {
    if (reducedMotionRef.current) return undefined;
    autoTimerRef.current = window.setInterval(() => moveBy(1), 4200);
    return () => window.clearInterval(autoTimerRef.current);
  }, [moveBy]);

  const handleKeyDown = event => {
    if (event.key === 'ArrowLeft') moveBy(-1);
    if (event.key === 'ArrowRight') moveBy(1);
  };

  return (
    <section className="certification" aria-labelledby="certification-title">
      <div className="certification__intro">
        <p className="certification__eyebrow">05 / Certifications</p>
        <h2 id="certification-title">Proof of practice.</h2>
        <p>A selection of certifications and learning milestones collected while building across the stack.</p>
      </div>

      <div
        className="certification__carousel"
        ref={rootRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Certificates"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="certification__stage">
          {items.map((certificate, index) => (
            <button
              className="certification__card"
              key={certificate.id}
              ref={element => { cardRefs.current[index] = element; }}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`View ${certificate.title}`}
              aria-current={active === index ? 'true' : undefined}
            >
              <img src={certificate.image} alt={`${certificate.title} certificate`} draggable={false} />
              <span className="certification__tint" ref={element => { overlayRefs.current[index] = element; }} />
            </button>
          ))}
        </div>

        <button className="certification__arrow certification__arrow--prev" type="button" onClick={() => moveBy(-1)} aria-label="Previous certificate">
          &#8592;
        </button>
        <button className="certification__arrow certification__arrow--next" type="button" onClick={() => moveBy(1)} aria-label="Next certificate">
          &#8594;
        </button>

        <div className="certification__details" aria-live="polite">
          <p>{items[active].date}</p>
          <h3>{items[active].title}</h3>
          <span>{items[active].issuedBy}</span>
        </div>

        <div className="certification__dots" role="tablist" aria-label="Certificate slides">
          {items.map((certificate, index) => (
            <button
              className={active === index ? 'is-active' : ''}
              key={certificate.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Show certificate ${index + 1}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certification;
