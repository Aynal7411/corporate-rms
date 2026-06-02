import axios from 'axios';
import { useAuthStore } from '../store/authStore.js';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refreshToken = useAuthStore.getState().refreshToken;

    if (error.response?.status === 401 && refreshToken && !original._retry) {
      original._retry = true;
      const { data } = await api.post('/auth/refresh', { refreshToken });
      useAuthStore.getState().setAccessToken(data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    }

    return Promise.reject(error);
  }
);
