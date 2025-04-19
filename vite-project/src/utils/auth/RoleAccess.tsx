import React from 'react';
import { hasRole } from './helpers';

interface RoleAccessProps {
  roles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleAccess: React.FC<RoleAccessProps> = ({
  roles,
  children,
  fallback = null,
}) => {
  return hasRole(roles) ? <>{children}</> : <>{fallback}</>;
};

// Specific role components for convenience
export const AdminAccess: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <RoleAccess roles={['admin']}>{children}</RoleAccess>;

export const OrganizerAccess: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <RoleAccess roles={['organizer', 'admin']}>{children}</RoleAccess>;