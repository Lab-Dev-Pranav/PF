import React from 'react';
import './Projects.css';
import BaseComponent from '../../components/BaseComponent';
import ProjectGallery from './ProjectGallery';

const Projects = () => {
  return (
    // <BaseComponent className="projects-page">
    <>
       {/* <header className="page-hero">
        <div className="page-hero-content">
          <h1>Projects</h1>
          <p>Selected work and case studies</p>
        </div>
      </header> */}
      <ProjectGallery />
    </>
     
    // </BaseComponent>
  );
};

export default Projects;
