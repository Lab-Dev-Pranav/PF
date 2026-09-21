import { useEffect, useRef, useState } from 'react';
import './Academics.css';

const educationData = [
  {
    year: '2026',
    title: 'JAVA Fullstack Developer',
    institute: 'Fourtune Cloud Technologies, Pune'
  },
  {
    year: '2022 - 2025',
    title: 'Bachelor of Computer Applications (BCA)',
    institute: 'Sinhgad College of Science, Pune',
    subCourses: [
      {
        duration: 'Jan 2024 - Jun 2024',
        name: 'MERN Stack Development',
        institute: 'Apna College'
      },
      {
        duration: 'Aug 2024 - Feb 2025',
        name: 'DSA with Java',
        institute: 'Apna College'
      }
    ]
  },
  {
    year: '2022',
    title: 'Higher Secondary Certificate (HSC)',
    institute: 'D.S High School, Bhusawal'
  },
  {
    year: '2021',
    title: 'Industrial Training Institute - Machinist',
    institute: 'Govt. Industrial Training Institute Bhusawal'
  }
];

const Academics = () => {
  const timelineRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(() => new Set());

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        setVisibleItems(current => {
          const next = new Set(current);
          entries.forEach(entry => {
            if (entry.isIntersecting) next.add(entry.target.dataset.index);
          });
          return next;
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    timeline.querySelectorAll('[data-timeline-item]').forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="academics" aria-labelledby="academics-title">
      <div className="academics__intro">
        <p className="academics__eyebrow">04 / Education</p>
        <h2 id="academics-title">Learning in motion.</h2>
        <p>A timeline of the formal education, focused training, and practical direction behind my work.</p>
      </div>

      <div className="academics__timeline" ref={timelineRef}>
        {educationData.map((entry, index) => (
          <article
            className={`academics__entry ${visibleItems.has(String(index)) ? 'academics__entry--visible' : ''}`}
            data-index={index}
            data-timeline-item
            key={`${entry.year}-${entry.title}`}
          >
            <div className="academics__marker" aria-hidden="true">
              <span />
            </div>
            <div className="academics__card">
              <p className="academics__year">{entry.year}</p>
              <h3>{entry.title}</h3>
              <p className="academics__institute">{entry.institute}</p>

              {entry.subCourses ? (
                <div className="academics__courses" aria-label="Related courses">
                  {entry.subCourses.map(course => (
                    <div className="academics__course" key={course.name}>
                      <p>{course.duration}</p>
                      <h4>{course.name}</h4>
                      <span>{course.institute}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Academics;
