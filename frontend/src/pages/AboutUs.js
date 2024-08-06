// src/components/AboutUs.js
import React from 'react';
import './AboutUs.css'; // Import the CSS file
import img1 from '../assest/skrtlogo.png'

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>
      <section className="about-us-content">
      <img src={img1} 
     alt="Team" className="about-us-image"></img>
        <div className="about-us-text">
          <h2>Our Story</h2>
          <p>
            Welcome to [skart], where we believe in providing the best products and exceptional service to our customers. Our journey began in [2024] with a simple mission: to offer high-quality products that meet the needs and desires of our valued customers.
          </p>
          <p>
            At [skart], we take pride in our commitment to excellence. Our team of dedicated professionals works tirelessly to ensure that every product we offer meets our rigorous standards. We source our products from trusted suppliers and continually strive to innovate and improve. We are asosisacte partner with amazon and other company
          </p>
          <p>
            Thank you for visiting our website. We look forward to serving you and being a part of your shopping experience. If you have any questions or feedback, please don’t hesitate to contact us.
          </p>
        </div>
      </section>
      <footer className="about-us-footer">
        <p>&copy; {new Date().getFullYear()} [skart]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
