import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpires
  });

export const signRefreshToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpires
  });
