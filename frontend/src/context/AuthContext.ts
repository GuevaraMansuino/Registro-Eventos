import { createContext } from 'react';

export type UserRole = 'ADMIN' | 'CONSULTA';

export interface AuthUser {
  username: string;
  rol: UserRole;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  isRestoring: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
