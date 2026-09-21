import React from 'react';
import ScrollExpand from '../../components/ScrollExpand';
import aboutvdo from '../../assets/About.mp4';
import './About.css';

const About = () => (
  <section className="about" aria-label="About Pranav S. Patil">
    <ScrollExpand
      src={aboutvdo}
      mediaType="video"
      alt="Video representation of Pranav's developer journey"
      title="About Me"
      scrollHint="Scroll to meet the developer"
      useWindowScroll
      startWidth={42}
      startHeight={58}
      startRadius={24}
      endRadius={0}
      mediaZoom={1.35}
      scrollDistance={1.2}
      holdDistance={0.35}
      smoothing={0.1}
      overlayScrim={0.58}
    >
      <div className="about__content">
        <p className="about__eyebrow">01 / Profile</p>
        <h2>Pranav S. Patil</h2>
        <p className="about__lead">
          A self-taught <strong>Full-Stack / MERN Developer</strong> building practical,
          scalable web applications from idea to deployment.
        </p>
        <p className="about__copy">
          I work with React.js, Node.js, Express.js, MongoDB, JavaScript, REST APIs,
          authentication, and modern web development practices. I care about clean code,
          responsive interfaces, secure backend systems, and reliable API integration.
        </p>
        <div className="about__notes" aria-label="Personal developer notes">
          <span>🤝 Collaborate, share knowledge, help peers</span>
          <span>🌙 Late-night coding &amp; debugging</span>
        </div>
        <blockquote>“The harder you work, the luckier you get.”</blockquote>
      </div>
    </ScrollExpand>
  </section>
);

export default About;

