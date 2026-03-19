/**
 * Real HTTP API client — replaces the previous MockApiClient.
 *
 * Features:
 *  - Base URL from NEXT_PUBLIC_API_URL (falls back to http://localhost:3001/api/v1)
 *  - Automatic Bearer token injection from localStorage
 *  - Transparent 401 → refresh-token → retry cycle
 *  - Uniform error throwing (ApiError)
 */

const BASE_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) ||
  'http://localhost:3001/api/v1';

// ── Token helpers ─────────────────────────────────────────────────────────────

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

export function saveTokens(accessToken: string, refreshToken: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('currentUser');
}

// ── Custom error ──────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly data?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ── Refresh lock — prevents multiple simultaneous refresh calls ──────────────

let refreshPromise: Promise<{ accessToken: string; refreshToken: string }> | null = null;

async function doRefresh(): Promise<{ accessToken: string; refreshToken: string }> {
  const rt = getRefreshToken();
  if (!rt) throw new ApiError(401, 'No refresh token');

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: rt }),
  });

  if (!res.ok) {
    clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
    throw new ApiError(401, 'Session expired. Please log in again.');
  }

  const body = await res.json();
  const tokens = body.data ?? body;
  saveTokens(tokens.accessToken, tokens.refreshToken);
  return tokens;
}

// ── Core fetch wrapper ────────────────────────────────────────────────────────

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(
  method: HttpMethod,
  path: string,
  data?: any,
  retry = true,
): Promise<T> {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options: RequestInit = { method, headers };
  if (data !== undefined && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const res = await fetch(url, options);

  // ── 401 → refresh & retry ──────────────────────────────────────────────
  if (res.status === 401 && retry) {
    try {
      if (!refreshPromise) {
        refreshPromise = doRefresh().finally(() => { refreshPromise = null; });
      }
      await refreshPromise;
      return request<T>(method, path, data, false);
    } catch {
      throw new ApiError(401, 'Session expired');
    }
  }

  // ── Parse response ─────────────────────────────────────────────────────
  let body: any;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    body = await res.json();
  } else {
    body = await res.text();
  }

  if (!res.ok) {
    const msg = (typeof body === 'object' && (body?.message || body?.error)) ||
      `Request failed: ${res.status}`;
    throw new ApiError(res.status, Array.isArray(msg) ? msg.join(', ') : msg, body);
  }

  // Unwrap NestJS { success, data, meta } envelope
  if (typeof body === 'object' && body !== null && 'success' in body) {
    return body as T;
  }
  return body as T;
}

// ── Public API client ─────────────────────────────────────────────────────────

export const apiClient = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, data?: any) => request<T>('POST', path, data),
  put: <T>(path: string, data?: any) => request<T>('PUT', path, data),
  patch: <T>(path: string, data?: any) => request<T>('PATCH', path, data),
  delete: <T>(path: string) => request<T>('DELETE', path),
};

export const tokenManager = {
  save: saveTokens,
  clear: clearTokens,
  getAccess: getAccessToken,
  getRefresh: getRefreshToken,
};
