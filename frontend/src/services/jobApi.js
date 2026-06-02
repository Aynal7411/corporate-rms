import { api } from './api.js';

const parseLines = (value) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export const getJobs = () => api.get('/jobs').then((res) => res.data);
export const saveJob = (job, jobId) => {
  const payload = {
    title: job.title,
    vacancy: Number(job.vacancy) || 1,
    salary: job.salary,
    deadline: job.deadline,
    requirements: parseLines(job.requirements),
    responsibilities: parseLines(job.responsibilities),
    location: job.location,
    employmentType: job.jobType,
    applicationFee: Number(job.examFee) || 0,
    status: job.status
  };

  return jobId
    ? api.patch(`/jobs/${jobId}`, payload).then((res) => res.data)
    : api.post('/jobs', payload).then((res) => res.data);
};

export const deleteJob = (id) => api.delete(`/jobs/${id}`).then((res) => res.data);
export const updateJobStatus = (id, status) => api.patch(`/jobs/${id}`, { status }).then((res) => res.data);
