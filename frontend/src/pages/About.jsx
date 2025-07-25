import React from 'react';
import './About.css';
import aboutImg from '../assets/hero-illustration.jpg';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About SmartCRM</h1>
        <p>SmartCRM is built to simplify how teams manage sales, clients, and performance analytics.</p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            We aim to empower growing teams with intelligent tools for client management and deal tracking.
            With real-time analytics and an intuitive dashboard, SmartCRM ensures that you focus on building relationships,
            not spreadsheets.
          </p>
          <h2>Our Team</h2>
          <p>
            Built by a passionate team of developers and sales experts, we’re committed to delivering performance,
            security, and simplicity to your fingertips.
          </p>
        </div>
        <img src={aboutImg} alt="SmartCRM Team" className="about-img" />
      </section>
    </div>
  );
};

export default About;
