import Application from '../models/Application.js';
import Candidate from '../models/Candidate.js';
import Job from '../models/Job.js';
import Payment from '../models/Payment.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const analytics = asyncHandler(async (req, res) => {
  const [totalCandidates, totalApplications, totalJobs, activeJobs, paidPayments, todaysApplications] =
    await Promise.all([
      Candidate.countDocuments(),
      Application.countDocuments(),
      Job.countDocuments(),
      Job.countDocuments({ status: 'published', deadline: { $gte: new Date() } }),
      Payment.find({ status: 'Paid' }),
      Application.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } })
    ]);

  const revenue = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);

  res.json({ totalCandidates, totalApplications, totalJobs, activeJobs, revenue, todaysApplications });
});
