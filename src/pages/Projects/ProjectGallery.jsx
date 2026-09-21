import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Link, Minus, Plus } from 'lucide-react';
import projectsData from '../../data/projects';
import './ProjectGallery.css';

const ProjectGallery = () => {
  const galleryRef = useRef(null);
  const [expandedId, setExpandedId] = useState(projectsData[0]?.name_id);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return undefined;

    const cards = [...gallery.querySelectorAll('.project-gallery__card')];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('project-gallery__card--visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    cards.forEach(card => observer.observe(card));

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const distance = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        const shift = Math.max(-10, Math.min(10, distance * (index % 2 ? -7 : 7)));
        card.style.setProperty('--project-shift', `${shift.toFixed(2)}px`);
      });
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
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
    <section className="project-gallery" ref={galleryRef} aria-labelledby="project-gallery-title">
      <div className="project-gallery__intro">
        <p className="project-gallery__eyebrow">01 / Selected work</p>
        <h2 id="project-gallery-title">Built to be used.</h2>
        <p>A collection of full-stack systems, interfaces, experiments, and practical products.</p>
      </div>

      <div className="project-gallery__list">
        {projectsData.map(project => {
          const isExpanded = expandedId === project.name_id;
          return (
            <article className="project-gallery__card" id={project.name_id} key={project.name_id}>
              <div className="project-gallery__overview">
                <div className="project-gallery__identity">
                  <span className="project-gallery__sequence">{String(project.sequence).padStart(2, '0')}</span>
                  <h3>{project.name}</h3>
                </div>
                <span className="project-gallery__tag">#{project.tag.trim()}</span>
              </div>

              <div className="project-gallery__body">
                <div className="project-gallery__technologies" aria-label={`${project.name} technologies`}>
                  {project.languages.map(language => <span key={language}>{language}</span>)}
                </div>
                <div className="project-gallery__description-wrap">
                  <p className={`project-gallery__description ${isExpanded ? 'project-gallery__description--expanded' : ''}`}>
                    {project.description}
                  </p>
                  <button
                    type="button"
                    className="project-gallery__toggle"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedId(isExpanded ? null : project.name_id)}
                  >
                    {isExpanded ? 'Show less' : 'Read more'} {isExpanded ? <Minus size={15} /> : <Plus size={15} />}
                  </button>
                  <div className="project-gallery__actions">
                    {project.githubLink ? <a href={project.githubLink} target="_blank" rel="noreferrer"><Link size={16} /> Repo</a> : null}
                    {project.runLink ? <a className="project-gallery__live" href={project.runLink} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Live</a> : null}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectGallery;
