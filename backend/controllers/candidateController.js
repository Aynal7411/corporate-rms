import Candidate from '../models/Candidate.js';
import Application from '../models/Application.js';
import Payment from '../models/Payment.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCandidate = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findById(req.params.id).populate('user', 'name email role');
  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }
  res.json(candidate);
});

export const listCandidateApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ candidate: req.params.id }).populate('job').sort({ createdAt: -1 });
  res.json(applications);
});

export const listCandidatePayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ candidate: req.params.id }).populate('application').sort({ createdAt: -1 });
  res.json(payments);
});
