import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.get('/user/me')
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem('cpf', data.cpf);
        setIsAuth(true);
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('cpf'); 
      })
      .finally(() => setLoading(false));
  }, []);


  const login = async (token) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const { data } = await api.get('/user/me');
      setUser(data);
      localStorage.setItem('cpf', data.cpf); 
      setIsAuth(true);
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('cpf'); 
      setUser(null);
      setIsAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cpf'); 

    setUser(null);
    setIsAuth(false);
    
    // Redireciona para garantir um estado limpo.
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};