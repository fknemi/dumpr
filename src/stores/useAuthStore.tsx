import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  isLoading: boolean;
  setAuthStatus: (status: boolean) => void;
  setUser: (user: any) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  isLoading: false,

  // Actions
  setAuthStatus: status => set({ isAuthenticated: status }),

  setUser: user => set({ user }),

  setIsLoading: loading => set({ isLoading: loading }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));

export default useAuthStore;
