import { createContext, useState, useContext, ReactNode } from 'react';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // For demo purposes, we'll use a mock implementation
  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with your backend
    // For now, we'll simulate a successful login
    if (email === 'admin@microcon.com' && password === 'admin123') {
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@microcon.com',
        isAdmin: true,
      });
    } else if (email && password) {
      setUser({
        id: '2',
        name: 'Regular User',
        email,
        isAdmin: false,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would register the user with your backend
    // For now, we'll simulate a successful registration
    if (name && email && password) {
      setUser({
        id: '3',
        name,
        email,
        isAdmin: false,
      });
    } else {
      throw new Error('Please fill all required fields');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}