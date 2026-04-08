import { createContext, useContext, useState, useEffect } from 'react';
import { api } from "../api/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await api.getMe();
          setUser(res.data);
        }
      } catch (err) {
        console.error("Auth init failed", err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const refreshUser = async () => {
    try {
      const res = await api.getMe();
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (email, password) => {
    const res = await api.login(email, password);
    setUser(res.data.user);
    return res;
  };

  const register = async (data) => {
    return await api.register(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, refreshUser, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
