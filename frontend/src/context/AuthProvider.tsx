import { useContext, useEffect, useReducer, useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer, initialAuthState } from '../reducers/authReducer';
import { decodeToken, getToken, removeToken, setToken } from '../utils/auth';

const API_URL = 'http://127.0.0.1:8000';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const user = decodeToken(token);
      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
      } else {
        removeToken();
      }
    }
    setIsRestoring(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) return false;

      const data: { access_token: string } = await response.json();
      const user = decodeToken(data.access_token);
      if (!user) return false;

      setToken(data.access_token);
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, isRestoring, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
