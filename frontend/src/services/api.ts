/**
 * Mock API client for frontend-only development.
 * No real HTTP requests are made.
 */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type MockHandler = (endpoint: string, data?: any) => Promise<any>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handlers: Partial<Record<HttpMethod, MockHandler>> = {
  POST: async (endpoint, data) => {
    await delay(300);
    // Default auth-style mock; individual services can interpret shape as needed.
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 'mock-user-id',
        name: 'Mock User',
        email: (data && data.email) || 'mock@example.com',
      },
    };
  },
  GET: async (endpoint) => {
    await delay(300);
    // Basic mock "me" response plus generic list placeholder.
    if (endpoint.includes('/auth/me')) {
      return {
        id: 'mock-user-id',
        name: 'Mock User',
        email: 'mock@example.com',
        role: 'admin',
      };
    }
    return [];
  },
};

class MockApiClient {
  private async handle<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
  ): Promise<T> {
    const handler = handlers[method];
    if (!handler) {
      await delay(100);
      return {} as T;
    }
    return (await handler(endpoint, data)) as T;
  }

  get<T>(endpoint: string): Promise<T> {
    return this.handle<T>('GET', endpoint);
  }

  post<T>(endpoint: string, data?: any): Promise<T> {
    return this.handle<T>('POST', endpoint, data);
  }

  put<T>(endpoint: string, data?: any): Promise<T> {
    return this.handle<T>('PUT', endpoint, data);
  }

  patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.handle<T>('PATCH', endpoint, data);
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.handle<T>('DELETE', endpoint);
  }
}

export const apiClient = new MockApiClient();
