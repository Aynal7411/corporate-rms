import { api } from './api.js';

export const getCompanyProfile = () => api.get('/company-profile').then((res) => res.data);

export const updateCompanyProfile = (formData) =>
  api
    .patch('/company-profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => res.data);
