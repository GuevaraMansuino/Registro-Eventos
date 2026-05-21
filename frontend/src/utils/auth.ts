import type { AuthUser } from '../context/AuthContext';

/**
 * Decode a JWT payload without signature verification.
 * Used only to read user data from a locally stored token.
 * Signature validation happens on the backend.
 */
export function decodeToken(token: string): AuthUser | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp;
    if (exp && Date.now() >= exp * 1000) return null; // Token expired

    return {
      username: payload.sub,
      rol: payload.rol,
    };
  } catch {
    return null;
  }
}

/**
 * Get the stored token from localStorage.
 */
export function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

/**
 * Store the token in localStorage.
 */
export function setToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

/**
 * Remove the token from localStorage.
 */
export function removeToken(): void {
  localStorage.removeItem('auth_token');
}
