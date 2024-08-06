const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Initialize Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Forgot Password Route (Email)
router.post('/forgot/email', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    
    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();
    
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the following link to reset your password: 
             ${process.env.CLIENT_URL}/reset/${token}`
    };
    
    await transporter.sendMail(mailOptions);
    res.status(200).send('Password reset email sent');
  } catch (err) {
    console.error('Error sending password reset email:', err);
    res.status(500).send('Error sending password reset email');
  }
});

// Forgot Password Route (SMS)
router.post('/forgot/phone', async (req, res) => {
  const { phone } = req.body;
  
  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).send('User not found');
    
    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();
    
    await twilioClient.messages.create({
      body: `You requested a password reset. Use the following token to reset your password: ${token}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    
    res.status(200).send('Password reset SMS sent');
  } catch (err) {
    console.error('Error sending password reset SMS:', err);
    res.status(500).send('Error sending password reset SMS');
  }
});

// Reset Password Route
router.post('/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });
    
    if (!user) return res.status(400).send('Token is invalid or has expired');

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    
    res.status(200).send('Password has been reset');
  } catch (err) {
    res.status(500).send('Server error');
  }
});


module.exports = router;
