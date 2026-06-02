import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : req.cookies.accessToken;

  if (!token) {
    res.status(401);
    throw new Error('Authentication required');
  }

  const decoded = jwt.verify(token, env.jwtAccessSecret);
  const user = await User.findById(decoded.id).select('-password -refreshTokens');

  if (!user || !user.isActive) {
    res.status(401);
    throw new Error('Invalid authentication');
  }

  req.user = user;
  next();
});

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(403);
    throw new Error('You do not have permission for this action');
  }

  next();
};
