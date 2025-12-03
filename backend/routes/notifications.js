const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// FR09: Send notification (Email/SMS/In-App)
router.post('/send', auth, async (req, res) => {
  try {
    const { userId, type, message, channel, subject } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let result = { success: true, channel };

    // Email notification (SendGrid/AWS SES integration point)
    if (channel === 'email') {
      // TODO: Integrate SendGrid or AWS SES
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      // await sgMail.send({ to: user.email, from: 'noreply@ssplp.org', subject, text: message });
      console.log(`📧 Email to ${user.email}: ${subject} - ${message}`);
      result.email = user.email;
    }

    // SMS notification (Twilio integration point)
    if (channel === 'sms' && user.phone) {
      // TODO: Integrate Twilio
      // const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
      // await twilio.messages.create({ body: message, to: user.phone, from: process.env.TWILIO_PHONE });
      console.log(`📱 SMS to ${user.phone}: ${message}`);
      result.phone = user.phone;
    }

    // In-app notification (stored in database)
    if (channel === 'in-app') {
      // Store notification in user's notification array or separate collection
      result.stored = true;
    }
    
    res.json({ success: true, message: 'Notification sent', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send notification', error: error.message });
  }
});

// Get user notifications
router.get('/:userId', auth, async (req, res) => {
  try {
    // TODO: Fetch from notifications collection
    res.json({ notifications: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
