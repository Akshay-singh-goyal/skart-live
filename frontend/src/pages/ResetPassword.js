import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ResetPassword.css'; // Import CSS for styling

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

 

  const handleResetPassword = async (token, password) => {
    try {
      await axios.post(`http://localhost:8080/api/users/reset/${token}`, { password });
      console.log('Password has been reset');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };
  

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
