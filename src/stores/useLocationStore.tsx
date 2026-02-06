import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LocationState {
  city: string | null;
  coordinates: { latitude: number; longitude: number } | null;
  error: Error | null;
  updateLocation: (data: Partial<LocationState>) => void;
}
const useLocationStore = create<LocationState>()(
  persist(
    set => ({
      city: null,
      coordinates: null,
      error: null,
      updateLocation: data =>
        set(state => ({
          ...state,
          ...data,
        })),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
export default useLocationStore;
