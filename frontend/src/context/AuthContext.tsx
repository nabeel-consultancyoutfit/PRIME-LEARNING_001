import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { apiClient, tokenManager, ApiError } from '@/services/api';

// ── Types ─────────────────────────────────────────────────────────────────────

export type Role = 'learner' | 'trainer' | 'iqa' | 'admin';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  avatar?: string;
  // Legacy compat
  name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  register: (credentials: RegisterCredentials) => Promise<AuthUser>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalizeUser(raw: any): AuthUser {
  return {
    id: raw._id || raw.id || '',
    firstName: raw.firstName || raw.name?.split(' ')[0] || '',
    lastName: raw.lastName || raw.name?.split(' ').slice(1).join(' ') || '',
    email: raw.email || '',
    role: raw.role || 'learner',
    avatar: raw.avatar || undefined,
    name: raw.firstName ? `${raw.firstName} ${raw.lastName}` : raw.name,
  };
}

function persistUser(user: AuthUser) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}

function loadPersistedUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(loadPersistedUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── On mount: validate stored token by calling /users/me ────────────────
  useEffect(() => {
    const accessToken = tokenManager.getAccess();
    if (!accessToken || user) return;

    (async () => {
      try {
        const res = await apiClient.get<any>('/users/me');
        const me = res.data ?? res;
        const normalized = normalizeUser(me);
        setUser(normalized);
        persistUser(normalized);
      } catch {
        // Token is invalid/expired — clear everything
        tokenManager.clear();
        setUser(null);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Login ────────────────────────────────────────────────────────────────

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthUser> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.post<any>('/auth/login', credentials);
      const payload = res.data ?? res;

      tokenManager.save(payload.accessToken, payload.refreshToken);
      const normalized = normalizeUser(payload.user);
      setUser(normalized);
      persistUser(normalized);
      return normalized;
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Login failed. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Register ─────────────────────────────────────────────────────────────

  const register = useCallback(async (credentials: RegisterCredentials): Promise<AuthUser> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.post<any>('/auth/register', credentials);
      const payload = res.data ?? res;

      tokenManager.save(payload.accessToken, payload.refreshToken);
      const normalized = normalizeUser(payload.user);
      setUser(normalized);
      persistUser(normalized);
      return normalized;
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Registration failed. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Logout ───────────────────────────────────────────────────────────────

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore logout errors — still clear local state
    } finally {
      tokenManager.clear();
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
