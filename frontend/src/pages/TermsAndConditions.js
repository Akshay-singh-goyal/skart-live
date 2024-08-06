// src/components/TermsAndConditions.js
import React from 'react';
import './TermsAndConditions.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <header className="terms-header">
        <h1>Terms and Conditions</h1>
      </header>
      <section className="terms-content">
        <h2>Introduction</h2>
        <p>
          Welcome to [Your Company Name]. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          All content, trademarks, and other intellectual property on our website are the property of [Your Company Name] or its licensors.
        </p>
        <h2>User Responsibilities</h2>
        <p>
          You agree to use our website only for lawful purposes and not to engage in any conduct that could damage or disrupt our services.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          [Your Company Name] will not be liable for any indirect, incidental, or consequential damages arising from your use of our website.
        </p>
        <h2>Changes to Terms</h2>
        <p>
          We may update these Terms and Conditions from time to time. Your continued use of our website after any changes constitutes acceptance of the new terms.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please contact us at <Link to="/contact-us" className="text-blue-400 hover:underline">Contact Us</Link>.
        </p>
      </section>
      <footer className="terms-footer">
        <p>&copy; {new Date().getFullYear()} [skart]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
