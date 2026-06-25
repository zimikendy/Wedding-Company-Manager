import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: User[] = [
    { id: '1', firstName: 'Admin', lastName: 'User', email: 'admin@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=admin', role: UserRole.ADMIN },
    { id: '2', firstName: 'Manager', lastName: 'User', email: 'manager@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=manager', role: UserRole.MANAGER },
    { id: '3', firstName: 'Normal', lastName: 'User', email: 'user@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=user', role: UserRole.USER },
    { id: '4', firstName: 'Viewer', lastName: 'User', email: 'viewer@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=viewer', role: UserRole.VIEWER },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): User | null => {
    // Mock password check
    if (password === 'password') {
        const foundUser = MOCK_USERS.find(u => u.email === email);
        if (foundUser) {
            setUser(foundUser);
            return foundUser;
        }
    }
    setUser(null);
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    logout
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
