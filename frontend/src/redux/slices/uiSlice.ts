/**
 * Redux UI slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Toast {
  id: string;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  modalData: any;
  toasts: Toast[];
  globalLoading: boolean;
}

const initialState: UIState = {
  sidebarOpen: true,
  activeModal: null,
  modalData: null,
  toasts: [],
  globalLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<{ name: string; data?: any }>) => {
      state.activeModal = action.payload.name;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
    },
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const id = `${Date.now()}-${Math.random()}`;
      state.toasts.push({
        id,
        ...action.payload,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  addToast,
  removeToast,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
