import { useState, useCallback, useEffect } from 'react';
import { User, UserManagementState, UserRole } from './UserManagement.interface';
import { DEFAULT_PAGE_SIZE } from './UserManagement.data';

const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z',
    lastLogin: '2026-03-16T08:00:00Z',
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Instructor',
    email: 'john.instructor@example.com',
    role: 'instructor',
    status: 'active',
    createdAt: '2025-06-15T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z',
    lastLogin: '2026-03-15T14:30:00Z',
  },
  {
    id: '3',
    firstName: 'Jane',
    lastName: 'Student',
    email: 'jane.student@example.com',
    role: 'student',
    status: 'active',
    createdAt: '2025-09-01T10:00:00Z',
    updatedAt: '2026-03-12T10:00:00Z',
    lastLogin: '2026-03-16T09:00:00Z',
  },
  {
    id: '4',
    firstName: 'Bob',
    lastName: 'Instructor',
    email: 'bob.instructor@example.com',
    role: 'instructor',
    status: 'inactive',
    createdAt: '2025-07-20T10:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z',
  },
  {
    id: '5',
    firstName: 'Alice',
    lastName: 'Student',
    email: 'alice.student@example.com',
    role: 'student',
    status: 'suspended',
    createdAt: '2025-10-05T10:00:00Z',
    updatedAt: '2026-03-05T10:00:00Z',
  },
  {
    id: '6',
    firstName: 'Charlie',
    lastName: 'Student',
    email: 'charlie.student@example.com',
    role: 'student',
    status: 'active',
    createdAt: '2025-11-10T10:00:00Z',
    updatedAt: '2026-03-14T10:00:00Z',
    lastLogin: '2026-03-14T11:00:00Z',
  },
];

export const useUserManagement = () => {
  const [state, setState] = useState<UserManagementState>({
    users: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    searchQuery: '',
    roleFilter: null,
    loading: false,
    error: null,
    selectedUser: null,
    showRoleModal: false,
  });

  const fetchUsers = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      let filtered = [...mockUsers];

      // Apply search filter
      if (state.searchQuery) {
        filtered = filtered.filter(
          (user) =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      // Apply role filter
      if (state.roleFilter) {
        filtered = filtered.filter((user) => user.role === state.roleFilter);
      }

      const totalCount = filtered.length;
      const startIndex = (state.currentPage - 1) * state.pageSize;
      const paginatedUsers = filtered.slice(startIndex, startIndex + state.pageSize);

      setState((prev) => ({
        ...prev,
        users: paginatedUsers,
        totalCount,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users',
      }));
    }
  }, [state.currentPage, state.pageSize, state.searchQuery, state.roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const setCurrentPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setState((prev) => ({ ...prev, pageSize: size, currentPage: 1 }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query, currentPage: 1 }));
  }, []);

  const setRoleFilter = useCallback((role: UserRole | null) => {
    setState((prev) => ({ ...prev, roleFilter: role, currentPage: 1 }));
  }, []);

  const openRoleModal = useCallback((user: User) => {
    setState((prev) => ({ ...prev, selectedUser: user, showRoleModal: true }));
  }, []);

  const closeRoleModal = useCallback(() => {
    setState((prev) => ({ ...prev, showRoleModal: false, selectedUser: null }));
  }, []);

  const updateUserRole = useCallback(async (userId: string, newRole: UserRole) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API call

      // Update mock data
      const updatedUsers = mockUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole, updatedAt: new Date().toISOString() } : user
      );

      // Update state with refreshed data
      await fetchUsers();
      closeRoleModal();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update user role',
      }));
    }
  }, [fetchUsers, closeRoleModal]);

  return {
    ...state,
    setCurrentPage,
    setPageSize,
    setSearchQuery,
    setRoleFilter,
    fetchUsers,
    openRoleModal,
    closeRoleModal,
    updateUserRole,
  };
};
