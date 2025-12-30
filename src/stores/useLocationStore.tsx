import { create } from 'zustand';

const useLocationStore = create(set => ({
  city: null,
  coordinates: null,
  error: null,

  updateLocation: data =>
    set(state => ({
      ...state,
      ...data,
    })),
}));

export default useLocationStore;
