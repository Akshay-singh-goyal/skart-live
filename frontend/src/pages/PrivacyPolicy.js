// src/components/PrivacyPolicy.js
import React from 'react';
import './PrivacyPolicy.css'; // Import the CSS file

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
      </header>
      <section className="privacy-content">
        <h2>Introduction</h2>
        <p>
          [skart] values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We collect personal information such as your name, email address, and payment details when you make a purchase or interact with our website.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          We use your information to process transactions, improve our services, and communicate with you about your orders or promotions.
        </p>
        <h2>Data Protection</h2>
        <p>
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
        </p>
        <h2>Cookies</h2>
        <p>
          Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser.
        </p>
        <h2>Changes to Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically. We will notify you of any significant changes by posting the new policy on our website.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at [Contact Information].
        </p>
      </section>
      <footer className="privacy-footer">
        <p>&copy; {new Date().getFullYear()} [skart]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
