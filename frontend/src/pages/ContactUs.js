// src/components/ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css'; // Import the CSS file

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      setError('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
      </header>
      <section className="contact-info">
        <h2>Get in Touch</h2>
        <p>If you have any questions or need assistance, please contact us using the form below or through the details provided.</p>
        <div className="contact-details">
          <div className="contact-item">
            <h3>Email</h3>
            <p>supportskart@gmail.com</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>(+91) 6263615262</p>
          </div>
          <div className="contact-item">
            <h3>Address</h3>
            <p>Takshila gate no. 1, Indore<br />Indore,Madhya pradesh,452001
            </p>
          </div>
        </div>
      </section>
      <section className="contact-form">
        <h2>Contact Form</h2>
        {submitted && <p className="form-submitted">Thank you for contacting us! We will get back to you shortly.</p>}
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </label>
          <button type="submit">Send Message</button>
        </form>
      </section>
      <footer className="contact-footer">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
