import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
//import analyticsImg from '../assets/analytics.jpg';
//import processImg from '../assets/process.jpg';
import feedbackImg from '../assets/feedback.jpg';
import heroillustrationImg from '../assets/hero-illustration.jpg';

const Home = () => {
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <h1>We create smart CRM solutions<br />for your business</h1>
          <p>Empower your team to manage clients, sales, and insights more effectively than ever.</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn primary">Get Started</Link>
            <Link to="/register" className="btn secondary">Register</Link>
          </div>
        </div>
        <div className="hero-right">
          <img src={heroillustrationImg} alt="CRM analytics" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2>We Provide the Best CRM Features</h2>
        <div className="service-cards">
          <div className="card">📊 Visual Analytics Dashboard</div>
          <div className="card">🔗 Drag-and-drop Sales Pipeline</div>
          <div className="card">👥 Easy Client & Deal Management</div>
          <div className="card">🔐 Role-based Secure Login</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>Simple Steps to Get Started</h2>
        <div className="how-steps">
          <div className="step">1️⃣ Register your account</div>
          <div className="step">2️⃣ Add your clients and deals</div>
          <div className="step">3️⃣ Track & manage progress visually</div>
          <div className="step">4️⃣ Analyze performance with reports</div>
        </div>
        
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <div>
          <h2>Why SmartCRM?</h2>
          <p>We help you organize client data, streamline communication, and maximize sales performance.</p>
          <Link to="/about" className="btn learn-more">Learn More</Link>
        </div>
        <img src={feedbackImg} alt="Team working" />
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-boxes">
          <div className="testimonial">
            <p>"SmartCRM made it 10x easier to track my sales pipeline!"</p>
            <span>– Riya M., Sales Manager</span>
          </div>
          <div className="testimonial">
            <p>"UI is smooth and intuitive. I love the drag-and-drop feature!"</p>
            <span>– Arjun P., Startup Founder</span>
          </div>
        </div>
      </section>
    

        {/* ABOUT & CONTACT SECTION */}
<section className="info-links">
  <h2>Learn More</h2>
  <div className="info-buttons">
    <Link to="/about" className="btn outlined">📖 About Us</Link>
    <Link to="/contact" className="btn outlined">📬 Contact Us</Link>
  </div>
</section>


      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} SmartCRM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
