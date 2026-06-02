import { api } from './api.js';

export const getNotices = () => api.get('/notices').then((res) => res.data);
export const getNotice = (id) => api.get(`/notices/${id}`).then((res) => res.data);
export const createNotice = (notice) => api.post('/notices', notice).then((res) => res.data);
export const updateNotice = (id, notice) => api.patch(`/notices/${id}`, notice).then((res) => res.data);
export const deleteNotice = (id) => api.delete(`/notices/${id}`).then((res) => res.data);
