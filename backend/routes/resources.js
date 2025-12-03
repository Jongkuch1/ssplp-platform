const express = require('express');
const router = express.Router();

// Placeholder for resources routes
router.get('/', async (req, res) => {
  res.json({ message: 'Resources endpoint' });
});

module.exports = router;
