import { useEffect, useRef } from 'react';
import SpotlightCard from '../../components/SpotlightCard';
import './Responsibilities.css';

const responsibilityGroups = [
  {
    number: '01',
    eyebrow: 'Organizer & Speaker',
    title: 'SCOS',
    color: 'rgba(240, 163, 110, 0.2)',
    items: [
      'Conducted web development workshops for 180+ students.',
      'Spoke on service-based versus product-based technology firms.',
      'Coordinated guests and managed a complete technical event.'
    ]
  },
  {
    number: '02',
    eyebrow: 'Milestones',
    title: 'Achievements',
    color: 'rgba(130, 202, 195, 0.2)',
    items: [
      'Contributed to open-source repositories.',
      'Organized technical workshops and seminars.',
      'Led successful project and event teams.',
      'NSS volunteer in social service initiatives.'
    ]
  },
  {
    number: '03',
    eyebrow: 'Outside the editor',
    title: 'Hobbies & Interests',
    color: 'rgba(194, 151, 226, 0.2)',
    items: [
      'Exploring new technologies and frameworks.',
      'Enjoy solving logical and real-world problems.'
    ]
  },
  {
    number: '04',
    eyebrow: 'Operations',
    title: 'Event Management & Planning',
    color: 'rgba(236, 190, 102, 0.2)',
    items: [
      'Successfully managed weddings and college festivals.',
      'Handled show flow, on-ground coordination, logistics, and budgeting.',
      'Led vendor communication and execution teams.',
      'Delivered smooth event experiences.'
    ]
  }
];

const Responsibilities = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const items = [...section.querySelectorAll('.responsibilities__item')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const updateCards = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;

      items.forEach((item, index) => {
        if (reducedMotion) {
          item.style.removeProperty('transform');
          item.style.removeProperty('opacity');
          return;
        }

        const rect = item.getBoundingClientRect();
        const distance = (rect.top + rect.height / 2 - viewportCenter) / window.innerHeight;
        const distanceFromCenter = Math.min(Math.abs(distance), 1);
        const direction = index % 2 === 0 ? -1 : 1;
        const x = direction * distance * 38;
        const y = Math.min(Math.abs(distance) * 16, 16);
        const rotation = direction * distance * 1.8;
        const opacity = Math.max(0.58, 1 - distanceFromCenter * 0.34);

        item.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotation.toFixed(2)}deg)`;
        item.style.opacity = opacity.toFixed(3);
        item.classList.toggle('responsibilities__item--active', distanceFromCenter < 0.22);
      });
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateCards);
    };

    updateCards();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
  <section ref={sectionRef} className="responsibilities" aria-labelledby="responsibilities-title">
    <div className="responsibilities__intro">
      <div>
        <p className="responsibilities__eyebrow">07 / Beyond the code</p>
        <h2 id="responsibilities-title">Responsibilities &amp; Achievements</h2>
      </div>
      <p>Building products is only part of the work. I also enjoy organizing people, ideas, and the moments that bring them together.</p>
    </div>

    <div className="responsibilities__grid">
      {responsibilityGroups.map(group => (
        <div className="responsibilities__item" key={group.number}>
          <SpotlightCard className="responsibilities__card" spotlightColor={group.color}>
            <div className="responsibilities__card-top">
              <span className="responsibilities__number">{group.number}</span>
              <span className="responsibilities__eyebrow-small">{group.eyebrow}</span>
            </div>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </SpotlightCard>
        </div>
      ))}
    </div>
  </section>
  );
};

export default Responsibilities;
