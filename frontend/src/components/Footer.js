import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from './Logo'; // Ensure this path is correct
import './Footer.css'; // Ensure this path is correct
import img1 from '../assest/fb.jpeg'; // Corrected path
import img2 from '../assest/tw.jpeg'; // Corrected path
import img3 from '../assest/insta.jpeg'; // Corrected path
import img4 from '../assest/linkdin.jpeg'; // Corrected path



const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/subscribe', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <footer className="footer bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-wrap justify-between items-start">
        {/* Customer Support Section */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Customer Support</h3>
          <ul className="space-y-2">
            <li><a href="mailto:skart01@gmail.com" className="text-blue-400 hover:underline">skart01@gmail.com</a></li>
            <li><a href="tel:+916263625262" className="text-blue-400 hover:underline">+91 6263615262</a></li>
            <li><Link to="/contact-us" className="text-blue-400 hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Logo and Social Media Section */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0 flex flex-col items-center md:items-start">
          <div className="mb-4">
            <Link to="/">
              <Logo w={200} h={150} />
            </Link>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={img1} alt="Facebook" className="social-img" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={img2} alt="Twitter" className="social-img" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={img3} alt="Instagram" className="social-img" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={img4} alt="LinkedIn" className="social-img" />
            </a>
          </div>
        </div>

        {/* Company Info Section */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Company Info</h3>
          <ul className="space-y-2">
            <li><Link to={"/about-us"} className="text-blue-400 hover:underline">About Us</Link></li>
            <li><Link to="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="text-blue-400 hover:underline">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup Section */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Newsletter Signup</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 w-full bg-black" 
              
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Subscribe</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>

      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} skart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
