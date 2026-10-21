import { useCallback, useEffect, useState } from 'react';
import { AGENDA } from '../config';
import { createBooking, loadBookings, persistBookings } from '../lib/bookings';
import type { NewBooking } from '../lib/bookings';
import type { Booking } from '../types';

export interface BookingsState {
  bookings: Booking[];
  addBooking: (input: NewBooking) => Booking;
  cancelBooking: (id: string) => void;
}

export function useBookings(): BookingsState {
  const [bookings, setBookings] = useState<Booking[]>(() => loadBookings());

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === AGENDA.storageKey) {
        setBookings(loadBookings());
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addBooking = useCallback((input: NewBooking): Booking => {
    const booking = createBooking(input);
    setBookings((current) => {
      const next = [...current, booking];
      persistBookings(next);
      return next;
    });
    return booking;
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings((current) => {
      const next = current.filter((booking) => booking.id !== id);
      persistBookings(next);
      return next;
    });
  }, []);

  return { bookings, addBooking, cancelBooking };
}
