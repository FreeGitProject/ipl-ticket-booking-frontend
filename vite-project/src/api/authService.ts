import apiClient from './axiosClient';
import { LoginData, RegisterData } from '../types/auth';

export const AuthService = {
  login: async (data: LoginData) => {
    return apiClient.post('/auth/login', data);
  },
  register: async (data: RegisterData) => {
    return apiClient.post('/auth/register', data);
  },
  getProfile: async () => {
    return apiClient.get('/auth/me');
  }
};