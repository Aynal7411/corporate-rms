import { api } from './api.js';

export const createContactMessage = (message) => api.post('/contact', message).then((res) => res.data);
export const getContactMessages = () => api.get('/contact').then((res) => res.data);
export const getContactMessage = (id) => api.get(`/contact/${id}`).then((res) => res.data);
export const updateContactMessage = (id, update) => api.patch(`/contact/${id}`, update).then((res) => res.data);
export const deleteContactMessage = (id) => api.delete(`/contact/${id}`).then((res) => res.data);
