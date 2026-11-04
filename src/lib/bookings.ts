import { AGENDA } from '../config';
import { SERVICE_MAP } from '../data/services';
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

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const CLOCK_TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

function isStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

/** Verifica se a string é uma data `YYYY-MM-DD` que existe no calendário. */
function isValidISODate(value: string): boolean {
  const match = ISO_DATE.exec(value);
  if (!match) return false;

  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function isServiceId(value: string): value is ServiceId {
  return Object.prototype.hasOwnProperty.call(SERVICE_MAP, value);
}

/**
 * Valida um item vindo do `localStorage` e devolve um `Booking` íntegro.
 * Entradas de versões antigas ou corrompidas são descartadas em vez de
 * derrubar a tela de "Meus agendamentos".
 */
function parseBooking(item: unknown): Booking | null {
  if (typeof item !== 'object' || item === null) return null;

  const candidate = item as Record<string, unknown>;
  const { id, serviceId, date, time } = candidate;

  if (typeof id !== 'string' || id.trim() === '') return null;
  if (typeof serviceId !== 'string' || !isServiceId(serviceId)) return null;
  if (typeof date !== 'string' || !isValidISODate(date)) return null;
  if (typeof time !== 'string' || !CLOCK_TIME.test(time)) return null;

  const service = SERVICE_MAP[serviceId];
  const rawDuration = Number(candidate.durationMinutes);
  const durationMinutes =
    Number.isFinite(rawDuration) && rawDuration > 0
      ? rawDuration
      : service.durationMinutes;

  const compactDate = date.split('-').join('').slice(2);

  return {
    id,
    code: asString(candidate.code) || `MTK-${compactDate}`,
    serviceId,
    date,
    time,
    durationMinutes,
    name: asString(candidate.name),
    company: asString(candidate.company),
    email: asString(candidate.email),
    phone: asString(candidate.phone),
    notes: asString(candidate.notes),
    createdAt: asString(candidate.createdAt),
  };
}

export function loadBookings(): Booking[] {
  if (!isStorageAvailable()) return [];

  try {
    const raw = window.localStorage.getItem(AGENDA.storageKey);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(parseBooking)
      .filter((booking): booking is Booking => booking !== null);
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
