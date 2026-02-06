import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Booking {
  title: string;
  day: string;
  time: string;
  frequency: 'daily' | 'weekly' | 'monthly';
}

interface SchedulesState {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  removeBooking: (id: string) => void;
  updateBooking: (id: string, updatedData: Partial<Booking>) => void;
  clearBookings: () => void;
}

const useSchedulesStore = create<SchedulesState>()(
  persist(
    set => ({
      bookings: [],
      addBooking: booking =>
        set(state => ({
          bookings: [
            ...state.bookings,
            {
              id: Date.now().toString(),
              ...booking,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      removeBooking: id =>
        set(state => ({
          bookings: state.bookings.filter(booking => booking.id !== id),
        })),
      updateBooking: (id, updatedData) =>
        set(state => ({
          bookings: state.bookings.map(booking =>
            booking.id === id ? { ...booking, ...updatedData } : booking,
          ),
        })),
      clearBookings: () => set({ bookings: [] }),
    }),
    {
      name: 'schedules-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useSchedulesStore;
