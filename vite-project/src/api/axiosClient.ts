import axios from 'axios';
import { getToken } from '../utils/auth/token';

const apiClient = axios.create({
  baseURL:  'https://localhost:7291/api',
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;