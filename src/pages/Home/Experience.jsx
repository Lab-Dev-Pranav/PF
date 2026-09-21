import { useEffect, useRef } from 'react';
import './Experience.css';

const experienceData = [
  {
    company: 'HexSoftware',
    role: 'Web Developer Intern',
    period: 'Jan 2025 - Feb 2025',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
    summary: 'Worked on practical projects focused on building responsive and interactive web applications.',
    achievements: [
      'Developed a Crowdfunding Platform allowing users to create projects and manage contributions.',
      'Built a Web Music Player with playback controls and volume management.',
      'Designed clean and responsive UI layouts.'
    ]
  },
  {
    company: 'Self-Directed',
    role: 'Freelance & Open-Source Developer',
    period: '2024 - Present',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'React', 'Socket.IO', 'WebRTC', 'REST APIs', 'JWT'],
    summary: '',
    achievements: [
      'Built and deployed full-stack web applications including a real-time video conferencing platform, FlowMeet, using WebRTC and Socket.IO.',
      'Designed scalable REST APIs with Node.js and Express.js implementing JWT authentication and secure user management.',
      'Developed real-time features such as video calls, participant management, and live chat systems.',
      'Focused on scalable architecture, deployment workflows, and modern UI/UX practices.'
    ]
  }
];

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const cards = [...section.querySelectorAll('.experience__card')];
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('experience__card--visible');
      }),
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience" ref={sectionRef} aria-labelledby="experience-title">
      <div className="experience__intro">
        <p className="experience__eyebrow">03 / Experience</p>
        <h2 id="experience-title">Work that compounds.</h2>
        <p>Internships, independent builds, and open-source work shaped through practice.</p>
      </div>

      <div className="experience__list">
        {experienceData.map((experience, index) => (
          <article className="experience__card" key={experience.company}>
            <div className="experience__card-header">
              <div className="experience__title-group">
                <span className="experience__sequence">0{index + 1}</span>
                <h3><strong>{experience.company}</strong> <span>- {experience.role}</span></h3>
              </div>
              <span className="experience__period">{experience.period}</span>
            </div>

            <div className="experience__card-body">
              <div className="experience__technologies" aria-label={`${experience.company} technologies`}>
                {experience.technologies.map(technology => <span key={technology}>{technology}</span>)}
              </div>
              <div className="experience__details">
                {experience.summary ? <p className="experience__summary">{experience.summary}</p> : null}
                <ul>
                  {experience.achievements.map(achievement => <li key={achievement}>{achievement}</li>)}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
