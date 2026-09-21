import { useRef } from 'react';
import './SpotlightCard.css';

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.18)' }) => {
  const cardRef = useRef(null);

  const handleMouseMove = event => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
    card.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <article ref={cardRef} className={`card-spotlight ${className}`.trim()} onMouseMove={handleMouseMove}>
      {children}
    </article>
  );
};

export default SpotlightCard;
