import { create } from 'zustand';

const useSchedulesStore = create(set => ({
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
}));

export default useSchedulesStore;
