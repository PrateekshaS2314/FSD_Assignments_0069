import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../services/api.js';

const AuthContext = createContext(null);
const TOKEN_KEY = 'pawconnect-token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  useEffect(() => {
    let active = true;
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    const handleUnauthorized = () => {
      if (active) setUser(null);
    };
    window.addEventListener('pawconnect:unauthorized', handleUnauthorized);

    if (!token) {
      setLoading(false);
    } else {
      authApi.profile()
        .then((profile) => { if (active) setUser(profile); })
        .catch(() => { if (active) logout(); })
        .finally(() => { if (active) setLoading(false); });
    }

    return () => {
      active = false;
      window.removeEventListener('pawconnect:unauthorized', handleUnauthorized);
    };
  }, [logout]);

  const login = useCallback(async (credentials) => {
    const result = await authApi.login(credentials);
    window.sessionStorage.setItem(TOKEN_KEY, result.token);
    setUser(result.user);
    return result.user;
  }, []);

  const register = useCallback((details) => authApi.register(details), []);

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
