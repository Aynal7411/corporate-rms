import { api } from './api.js';

export const getOfficers = (params = {}) => api.get('/officers', { params }).then((res) => res.data);
export const getOfficer = (id) => api.get(`/officers/${id}`).then((res) => res.data);

export const saveOfficer = (values, photo, officerId) => {
  const formData = new FormData();
  ['name', 'designation', 'department', 'biography', 'email', 'mobile', 'status'].forEach((field) => {
    formData.append(field, values[field] || '');
  });

  if (photo) {
    formData.append('photo', photo);
  }

  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return officerId
    ? api.patch(`/officers/${officerId}`, formData, config).then((res) => res.data)
    : api.post('/officers', formData, config).then((res) => res.data);
};

export const deleteOfficer = (id) => api.delete(`/officers/${id}`).then((res) => res.data);
