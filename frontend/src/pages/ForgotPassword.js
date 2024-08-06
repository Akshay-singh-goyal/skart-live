import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'; // Import CSS for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [method, setMethod] = useState('email'); // default method

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (method === 'email') {
        await axios.post('http://localhost:8080/api/user/forgot-password/email', { email });
      } else {
        await axios.post('http://localhost:8080/api/user/forgot-password/phone', { phone });
      }
      setMessage('Password reset instructions have been sent.');
    } catch (error) {
      console.error('Error sending password reset instructions:', error);
      setMessage('Error sending password reset instructions.');
    }
  };
  

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="email"
            checked={method === 'email'}
            onChange={() => setMethod('email')}
          />
          Email
        </label>
        <label>
          <input
            type="radio"
            value="phone"
            checked={method === 'phone'}
            onChange={() => setMethod('phone')}
          />
          Phone
        </label>
        {method === 'email' && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        )}
        {method === 'phone' && (
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
            pattern="\d{10}" // Example pattern for a 10-digit phone number
          />
        )}
        <button type="submit">Send Reset Instructions</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
