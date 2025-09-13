"use client"
import axios, { API_URL } from "@/lib/api";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User type definition
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName?: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  userType?: string;
  accountStatus?: string;
  authProvider?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  twoFactorEnabled?: boolean;
  lastLoginAt?: string;
  passwordChangedAt?: string;
  accountLockedUntil?: string | null;
  failedLoginAttempts?: number;
  termsAcceptedAt?: string | null;
  privacyPolicyAcceptedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedAt?: string | null;
  deletedBy?: string | null;
  roles?: string[] | null;
  attributes?: Record<string, string>;
  isDeleted?: boolean;
  isAccountLocked?: boolean;
  isAccountActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  permissions?: string[];
  roles?: string[];
  login: (userData: User, token?: string, refreshToken?: string, permissions?: string[], roles?: string[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[] | undefined>(undefined);
  const [roles, setRoles] = useState<string[] | undefined>(undefined);

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('authUser');
      const storedToken = localStorage.getItem('token');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedPermissions = localStorage.getItem('permissions');
      const storedRoles = localStorage.getItem('roles');
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken && storedToken !== "undefined") {
        setToken(storedToken);
      }
      if (storedRefreshToken && storedRefreshToken !== "undefined") {
        setRefreshToken(storedRefreshToken);
      }
      if (storedPermissions && storedPermissions !== "undefined") {
        setPermissions(JSON.parse(storedPermissions));
      }
      if (storedRoles && storedRoles !== "undefined") {
        setRoles(JSON.parse(storedRoles));
      }
    }
  }, []);

  // Login function
  const login = (
    userData: User,
    tokenValue?: string,
    refreshTokenValue?: string,
    permissionsValue?: string[],
    rolesValue?: string[]
  ) => {
    setUser(userData);
    if (tokenValue) setToken(tokenValue);
    if (refreshTokenValue) setRefreshToken(refreshTokenValue);
    if (permissionsValue) setPermissions(permissionsValue);
    if (rolesValue) setRoles(rolesValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem('authUser', JSON.stringify(userData));
      if (tokenValue) localStorage.setItem('token', tokenValue);
      if (refreshTokenValue) localStorage.setItem('refreshToken', refreshTokenValue);
      if (permissionsValue) localStorage.setItem('permissions', JSON.stringify(permissionsValue));
      if (rolesValue) localStorage.setItem('roles', JSON.stringify(rolesValue));
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    setPermissions(undefined);
    setRoles(undefined);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authUser');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('permissions');
      localStorage.removeItem('roles');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, permissions, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
