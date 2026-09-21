import React from 'react';
import './Home.css';
import BaseComponent from '../../components/BaseComponent';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Experience from './Experience';
import WhatIDo from './WhatIDo';
import Academics from './Academics';
import Certification from './Certification';
import Blog from './Blog';
import Responsibilities from './Responsibilities';

const Home = () => {
  return (
    // <BaseComponent className="home-page">
    <>
       <Hero />
      <About />
      <Services />
      <Experience />
      <WhatIDo />
      <Academics />
      <Certification />
      <Blog />
      <Responsibilities />
    </>
     
    // </BaseComponent>
  );
};

export default Home;
