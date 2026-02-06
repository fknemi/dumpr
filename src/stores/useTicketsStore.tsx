import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Ticket {
  id: string;
  timestamp: string;
  location: string;
  city: string;
  description: string;
  photos: string[];
}

interface TicketsState {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'timestamp'>) => void;
  removeTicket: (id: string) => void;
  updateTicket: (id: string, updatedData: Partial<Ticket>) => void;
  clearTickets: () => void;
}

const useTicketsStore = create<TicketsState>()(
  persist(
    set => ({
      tickets: [],
      addTicket: ticket =>
        set(state => ({
          tickets: [
            ...state.tickets,
            {
              id: Date.now().toString(), // Simple unique ID
              timestamp: new Date().toISOString(),
              ...ticket,
            },
          ],
        })),
      removeTicket: id =>
        set(state => ({
          tickets: state.tickets.filter(ticket => ticket.id !== id),
        })),
      updateTicket: (id, updatedData) =>
        set(state => ({
          tickets: state.tickets.map(ticket =>
            ticket.id === id ? { ...ticket, ...updatedData } : ticket,
          ),
        })),
      clearTickets: () => set({ tickets: [] }),
    }),
    {
      name: 'tickets-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useTicketsStore;
