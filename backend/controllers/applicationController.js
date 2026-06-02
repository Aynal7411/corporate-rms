import Application from '../models/Application.js';
import Candidate from '../models/Candidate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createAdmitCard } from '../services/admitCardService.js';

export const listApplications = asyncHandler(async (req, res) => {
  const candidate = req.user.role === 'candidate' ? await Candidate.findOne({ user: req.user._id }) : null;
  const query = candidate ? { candidate: candidate._id } : {};
  const applications = await Application.find(query).populate('candidate job').sort({ createdAt: -1 });
  res.json(applications);
});

export const applyForJob = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findOne({ user: req.user._id });
  const application = await Application.create({
    candidate: candidate._id,
    job: req.body.job
  });
  res.status(201).json(application);
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, examDate: req.body.examDate, examCenter: req.body.examCenter },
    { new: true, runValidators: true }
  ).populate('candidate job');

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  if (application.status === 'Approved' && application.paymentStatus === 'Paid') {
    await createAdmitCard(application);
  }

  res.json(application);
});
