import Job from '../models/Job.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createOne, deleteOne, getOne, list, updateOne } from './crudFactory.js';

export const listJobs = asyncHandler(list(Job));
export const getJob = asyncHandler(getOne(Job));
export const createJob = asyncHandler(createOne(Job));
export const updateJob = asyncHandler(updateOne(Job));
export const deleteJob = asyncHandler(deleteOne(Job));

export const activeJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ status: 'published', deadline: { $gte: new Date() } }).sort({ deadline: 1 });
  res.json(jobs);
});
