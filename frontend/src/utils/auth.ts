import type { AuthUser, UserRole } from '../context/AuthContext';

const TOKEN_KEY = 'auth_token';

export function decodeToken(token: string): AuthUser | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    const rol = payload.rol as UserRole;

    if (payload.exp && Date.now() >= payload.exp * 1000) return null;
    if (!payload.sub || (rol !== 'ADMIN' && rol !== 'CONSULTA')) return null;

    return {
      username: payload.sub,
      rol,
    };
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
