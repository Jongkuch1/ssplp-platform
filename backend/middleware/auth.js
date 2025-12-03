const jwt = require('jsonwebtoken');

// Named export `authenticateToken` so routes can import as:
// const { authenticateToken } = require('../middleware/auth');
const authenticateToken = function(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Provide both default (function) and named export for backward compatibility
module.exports = authenticateToken;
module.exports.authenticateToken = authenticateToken;
