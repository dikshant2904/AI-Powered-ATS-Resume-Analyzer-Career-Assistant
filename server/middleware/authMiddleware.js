const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (!process.env.JWT_SECRET) {
    // Fail fast with a clear server error instead of crashing/throwing from jwt.verify
    return res
      .status(500)
      .json({ success: false, message: 'Server misconfigured: JWT_SECRET is missing' });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token payload might contain { id } (expected). Keep backward compatible with { _id }.
      const userId = decoded?.id || decoded?._id;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: 'Not authorized, invalid token payload' });
      }

      req.user = await User.findById(userId).select('-password');

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
      });
    }
  }

  return res.status(401).json({ success: false, message: 'Not authorized, no token' });
};


module.exports = { protect };
