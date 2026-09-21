import React from 'react';
import './BaseComponent.css';

const BaseComponent = ({ children, className = '' }) => {
  return (
    <section className={`base-container ${className}`}>
      {children}
    </section>
  );
};

export default BaseComponent;
