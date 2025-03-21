
'use client';

import { createContext, useState, useEffect } from 'react';
import { getCurrentUser, refreshToken } from '@/services/authService';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to get the current user
        const userData = await getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        // If token is expired, try to refresh
        try {
          await refreshToken();
          const userData = await getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (refreshError) {
          // If refresh fails, user is not authenticated
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  const login = async (email, password) => {
    // This will be implemented in the authService
    const userData = await authService.login(email, password);
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };
  
  const logout = () => {
    // This will be implemented in the authService
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };
  
  const register = async (userData) => {
    // This will be implemented in the authService
    const newUser = await authService.register(userData);
    return newUser;
  };
  
  const updateUser = (userData) => {
    setUser(userData);
  };
  
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    updateUser
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
