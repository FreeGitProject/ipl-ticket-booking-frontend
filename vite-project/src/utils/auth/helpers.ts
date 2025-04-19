import { getToken, isTokenValid } from './token';
import { User } from '../../types/auth';

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return isTokenValid(token);
};

export const hasRole = (requiredRoles: Role[]): boolean => {
  const payload = getTokenPayload<{ roles: Role[] }>();
  if (!payload?.roles) return false;
  
  return requiredRoles.some(role => payload.roles.includes(role));
};

export const getCurrentUser = (): User | null => {
  const payload = getTokenPayload<{ user: User }>();
  return payload?.user || null;
};

export const getAuthHeader = (): { Authorization: string } | null => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : null;
};