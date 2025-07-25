const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      throw new Error('User not found');
    }

    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

module.exports = protect;
