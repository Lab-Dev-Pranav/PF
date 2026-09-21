import React from 'react';
import ScrollStack, { ScrollStackItem } from '../../components/ScrollStack';
import './Services.css';

const services = [
  ['MERN Stack Development', 'Handles both frontend and backend development using the MERN stack.'],
  ['Java Full Stack Development', 'Builds full stack applications using Java and modern web technologies.'],
  ['Data Structures & Algorithms', 'Improves problem-solving skills through efficient data structures and algorithms.'],
  ['Frontend Development', 'Creates responsive and interactive user interfaces for modern web applications.'],
  ['Backend Development', 'Builds secure server-side logic, APIs, and application functionality.'],
  ['REST API Development', 'Designs scalable REST APIs for smooth frontend and backend communication.'],
  ['Deployment & DevOps', 'Deploys applications and manages reliable development and production workflows.'],
  ['SEO & Web Optimization', 'Improves website visibility, performance, and overall search engine optimization.'],
];

const Services = () => {
  return (
    <section className="services" aria-labelledby="services-title">
      <div className="services__intro">
        <p className="services__eyebrow">02 / Capabilities</p>
        <h2 id="services-title">My Domains</h2>
        <p>Practical engineering support for products that need to look sharp, work reliably, and grow well.</p>
      </div>

      <ScrollStack
        className="services__stack"
        useWindowScroll
        itemDistance={72}
        itemStackDistance={34}
        stackPosition="18%"
        scaleEndPosition="8%"
        baseScale={0.86}
        itemScale={0.025}
        rotationAmount={0}
        blurAmount={0}
      >
        {services.map(([title, description], index) => (
          <ScrollStackItem key={title} itemClassName="services__card">
            <span className="services__number">{String(index + 1).padStart(2, '0')}</span>
            <div className="services__card-copy">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <span className="services__mark" aria-hidden="true">↗</span>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default Services;
