import { create } from 'zustand';

const useAuthStore = create(set => {
  isAuthenticated: false;
  setAuthStatus: () => set(state => ({ isAuthenticated: state }));
});

export default useAuthStore;
