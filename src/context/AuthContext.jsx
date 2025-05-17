import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (token && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole.toLowerCase());
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, setIsLoggedIn, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

