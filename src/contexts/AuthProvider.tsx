import { STORAGE_USER, STORAGE_USER_DETAILS } from 'constants/index';
import { useGetCurrentUser } from 'hooks';
import { Path } from 'navigations/routes';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'types/client';
import { isUndefined } from 'utils/type';

interface AuthContextI {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  token: string;
  user: Api.AdminI | undefined;
}

const AuthContext = createContext<AuthContextI | undefined>(undefined);

const AuthProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    false || !!sessionStorage.getItem(STORAGE_USER)
  );
  const [token, setToken] = useState('');
  const [user, setUser] = useState<Api.AdminI>();
  const navigate = useNavigate();

  useGetCurrentUser(
    {
      token
    },
    {
      enabled: !!token,
      staleTime: 60000,
      onSuccess: (data) => {
        const user: Api.AdminI = {
          ...data.data
        };

        setUser(user);
        sessionStorage.setItem(STORAGE_USER_DETAILS, JSON.stringify(user));
      }
    }
  );

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    sessionStorage.removeItem(STORAGE_USER);
    sessionStorage.removeItem(STORAGE_USER_DETAILS);
    setIsAuthenticated(false);
    setUser(undefined);
    setToken('');
    navigate(Path.Login);
  };

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_USER)) {
      const user = sessionStorage.getItem(STORAGE_USER);

      if (user) {
        setIsAuthenticated(true);
        setToken(user);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [sessionStorage.getItem(STORAGE_USER)]);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_USER_DETAILS)) {
      const user = sessionStorage.getItem(STORAGE_USER_DETAILS);

      if (user) {
        setUser(JSON.parse(user));
      }
    } else {
      setUser(undefined);
    }
  }, [sessionStorage.getItem(STORAGE_USER_DETAILS)]);

  const value: AuthContextI = {
    isAuthenticated,
    login,
    logout,
    token,
    user
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (isUndefined(context)) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }

  return { ...context };
};

export default AuthProvider;
