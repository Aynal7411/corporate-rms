import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Candidate from '../models/Candidate.js';
import { env } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signAccessToken, signRefreshToken } from '../utils/token.js';

const authPayload = async (user) => {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  user.refreshTokens.push({ token: refreshToken });
  await user.save();

  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken
  };
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });

  if (exists) {
    res.status(409);
    throw new Error('Email is already registered');
  }

  const user = await User.create({ name, email, password, role: 'candidate' });
  await Candidate.create({ user: user._id });

  res.status(201).json(await authPayload(user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json(await authPayload(user));
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401);
    throw new Error('Refresh token is required');
  }

  const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret);
  const user = await User.findOne({ _id: decoded.id, 'refreshTokens.token': refreshToken });

  if (!user) {
    res.status(401);
    throw new Error('Invalid refresh token');
  }

  res.json({ accessToken: signAccessToken(user) });
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    await User.updateOne({ _id: req.user._id }, { $pull: { refreshTokens: { token: refreshToken } } });
  }

  res.json({ message: 'Logged out successfully' });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
