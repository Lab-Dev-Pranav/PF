import React from 'react';
import MagicBento from '../../components/MagicBento';
import './WhatIDo.css';

const whatIDoCards = [
  {
    label: 'Full Stack',
    title: 'Crazy full stack developer',
    description: 'I want to explore every tech stack and turn ambitious ideas into useful digital products.',
    color: '#244a4a'
  },
  {
    label: 'Tech Stack',
    title: 'Tools that ship',
    description: 'DSA, Java, React, Node.js, JavaScript, Git, GitHub, VS Code, npm, Hoppscotch, and Thunder Client.',
    color: '#3f2d31'
  },
  {
    label: 'Interfaces',
    title: 'Interactive frontends',
    description: 'I develop highly interactive front-end and user interfaces for web and mobile applications.',
    color: '#303e4b'
  },
  {
    label: 'Applications',
    title: 'Progressive web apps',
    description: 'I build PWAs using single-page applications and traditional web application stacks.',
    color: '#244a4a'
  },
  {
    label: 'Integrations',
    title: 'Connected services',
    description: 'I integrate MongoDB Atlas, Cloudinary, Passport.js, Nodemailer, Mapbox, AWS, Render, Vanta.js, DigitalOcean, and more.',
    color: '#3f2d31'
  },
  {
    label: 'Delivery',
    title: 'From idea to release',
    description: 'I connect thoughtful UI, practical architecture, and dependable tooling to move projects forward.',
    color: '#303e4b'
  }
];

const WhatIDo = () => {
  return (
    <section className="what-i-do" aria-labelledby="what-i-do-title">
      <div className="what-i-do__intro">
        <p className="what-i-do__eyebrow">03 / What I do</p>
        <h2 id="what-i-do-title">Build curious. Ship useful.</h2>
        <p>I explore the tools behind modern products and use them to create clear, capable experiences.</p>
      </div>

      <MagicBento
        cards={whatIDoCards}
        enableStars
        enableSpotlight
        enableBorderGlow
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="240, 163, 110"
      />
    </section>
  );
};

export default WhatIDo;
