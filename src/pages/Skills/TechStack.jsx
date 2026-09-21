import { useEffect, useRef } from 'react';
import skillsData from '../../data/skill';
import './TechStack.css';

const TechStack = () => {
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const cards = [...stack.querySelectorAll('.tech-stack__card')];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('tech-stack__card--visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    cards.forEach(card => observer.observe(card));

    let frame = 0;
    const updateScrollState = () => {
      frame = 0;
      const rect = stack.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight * 0.75 - rect.top) / Math.max(rect.height, 1), 0), 1);
      stack.style.setProperty('--tech-progress', progress.toFixed(3));
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="tech-stack" ref={stackRef} aria-labelledby="tech-stack-title">
      <div className="tech-stack__intro">
        <p className="tech-stack__eyebrow">01 / Skill map</p>
        <h2 id="tech-stack-title">Tools I know by building.</h2>
        <p>Explore the concepts, technologies, and workflows I have worked through across the stack.</p>
      </div>

      <div className="tech-stack__list">
        {skillsData.map(skill => (
          <article className="tech-stack__card" id={skill.name_id} key={skill.name_id}>
            <div className="tech-stack__card-header">
              <div>
                <span className="tech-stack__sequence">{String(skill.sequence).padStart(2, '0')}</span>
                <h3>{skill.name}</h3>
              </div>
              <span className="tech-stack__tag">#{skill.tag}</span>
            </div>
            <div className="tech-stack__rule" />
            <ul className="tech-stack__points">
              {skill.points.map(point => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
