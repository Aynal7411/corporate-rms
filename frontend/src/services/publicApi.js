import { api } from './api.js';

export const getActiveJobs = () => api.get('/jobs/active').then((res) => res.data);
export const getOfficers = () => api.get('/officers').then((res) => res.data);
export const getNews = () => api.get('/news').then((res) => res.data);
export const getNotices = () => api.get('/notices').then((res) => res.data);
