import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
// import { ArrowRight } from 'lucide-react'; // Can be used if extending buttons
import './Hero.css';

/* -------------------------------------------------------------------------- */
/*                              Words Pull Up                                 */
/* -------------------------------------------------------------------------- */
export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={{ y: 35, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'relative',
              display: 'inline-block',
              marginRight: isLastWord ? 0 : "0.25em",
            }}
          >
            {word}
            {showAsterisk && isLastWord && (
              <span style={{ position: 'absolute', right: '-0.3em', top: '0.65em', fontSize: '0.31em' }}>
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  Hero                                      */
/* -------------------------------------------------------------------------- */
const Hero = () => {
  return (
    <section className="prisma-hero">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted // Muting is recommended for auto-play across all browsers
        playsInline
        preload="auto"
        className="hero-vdo"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        // src="src\assets\herobg.mp4"
      />

      {/* Dark cinematic overlays */}
      <div className="hero-overlay top-down" />
      <div className="hero-overlay side-to-side" />

      {/* Noise overlay */}
      <div className="prisma-noise" />

      {/* Hero content */}
      <div className="hero-content-wrapper">
        <div className="hero-main-container">
          
          {/* Large heading with PullUp Animation */}
          <div className="hero-main-container-l">
            <h1 style={{ margin: 0 }}>

              <WordsPullUp text="_dev.pranav____" className="hero-title" />
              <br /> 
              <p className='p1'>Idea ⇲</p>
              <p className='p2'>Design ⇛ Build ⇛ Deploy ⇛ Upgrade ⇛ Push</p>
            </h1>
          </div>

          <div className="hero-main-container-r">
            <p className="hero-description">
              Pranav is a passionate MERN Stack Developer, problem solver and creative technologist driven by curiosity, innovation and the desire to build meaningful digital experiences. Not defined by labels or limitations, but by a constant hunger to learn, create and turn ideas into scalable solutions through code.
            </p>
          </div>
          
        </div>
      </div>

      {/* Bottom finishing line */}
      <div className="hero-bottom-line" />
    </section>
  );
};

export default Hero;
