import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { authService } from '../services/auth.service';
import { AuthContext } from './contexts/auth';
import { User } from './types/auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // Verify token and get user data
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setToken(storedToken);
        }
      } catch (error) {
        // Only remove token if it's an authentication error
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem('token');
        }
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await authService.login(email, password);
    setToken(token);
    setUser(user);
  };

  const register = async (username: string, email: string, password: string) => {
    const { token, user } = await authService.register(username, email, password);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
