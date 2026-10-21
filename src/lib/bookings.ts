import { AGENDA } from '../config';
import type { Booking, ServiceId } from '../types';

export interface NewBooking {
  serviceId: ServiceId;
  date: string;
  time: string;
  durationMinutes: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

function isStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

export function loadBookings(): Booking[] {
  if (!isStorageAvailable()) return [];

  try {
    const raw = window.localStorage.getItem(AGENDA.storageKey);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Booking =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Booking).id === 'string' &&
        typeof (item as Booking).date === 'string' &&
        typeof (item as Booking).time === 'string',
    );
  } catch {
    return [];
  }
}

export function persistBookings(bookings: Booking[]): void {
  if (!isStorageAvailable()) return;

  try {
    window.localStorage.setItem(AGENDA.storageKey, JSON.stringify(bookings));
  } catch {
    // Armazenamento indisponível ou cheio: a agenda segue funcionando em memória.
  }
}

function randomCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
}

export function createBooking(input: NewBooking): Booking {
  const createdAt = new Date().toISOString();
  const compactDate = input.date.split('-').join('').slice(2);

  return {
    id: `${Date.now()}-${randomCode().toLowerCase()}`,
    code: `MTK-${compactDate}-${randomCode()}`,
    createdAt,
    ...input,
  };
}
