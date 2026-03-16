export type UserRole = 'admin' | 'instructor' | 'student';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  avatar?: string;
}

export interface UserManagementState {
  users: User[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
  roleFilter: UserRole | null;
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  showRoleModal: boolean;
}

export interface UserManagementContextProps extends UserManagementState {
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchQuery: (query: string) => void;
  setRoleFilter: (role: UserRole | null) => void;
  fetchUsers: () => Promise<void>;
  openRoleModal: (user: User) => void;
  closeRoleModal: () => void;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<void>;
}
