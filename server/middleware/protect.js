import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = handler => {
  return async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password -__v');
      } catch (error) {
        res.status(401).json({ msg: 'Please log in to get access.' });
      }
    }

    return handler(req, res);
  };
};

export default protect;