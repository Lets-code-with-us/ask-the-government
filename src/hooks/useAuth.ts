import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { websocketService } from '../utils/websocketService';

// Mock authentication hook
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Simulate checking for existing auth
    const storedUser = localStorage.getItem('askGov_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      // Connect to WebSocket when user is authenticated
      connectWebSocket();
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }

    // Cleanup WebSocket connection on unmount
    return () => {
      websocketService.disconnect();
    };
  }, []);

  const connectWebSocket = async () => {
    try {
      await websocketService.connect();
      console.log('WebSocket connected successfully');
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
    }
  };

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      joinedAt: new Date(),
    };
    
    localStorage.setItem('askGov_user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });

    // Connect to WebSocket after successful login
    connectWebSocket();
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      joinedAt: new Date(),
    };
    
    localStorage.setItem('askGov_user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });

    // Connect to WebSocket after successful signup
    connectWebSocket();
  };

  const logout = () => {
    localStorage.removeItem('askGov_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    // Disconnect WebSocket on logout
    websocketService.disconnect();
  };

  return {
    ...authState,
    login,
    signup,
    logout,
    websocketService,
  };
};