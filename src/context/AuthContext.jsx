import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    const userWithDefaults = {
      ...userData,
      avatar: userData.avatar || '/Assets/img/avatar.png',
      isPremium: userData.isPremium || false,
    };
    setUser(userWithDefaults);
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      avatar: '/Assets/img/avatar.png',
      isPremium: false,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};