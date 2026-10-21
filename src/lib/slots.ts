import { AGENDA } from '../config';
import type { Booking, Slot } from '../types';
import { fromISODate, minutesFromTime, timeFromMinutes } from './dates';

interface BusinessWindow {
  start: number;
  end: number;
}

export const BUSINESS_HOURS: Record<number, BusinessWindow | null> = {
  0: null,
  1: { start: 9 * 60, end: 18 * 60 },
  2: { start: 9 * 60, end: 18 * 60 },
  3: { start: 9 * 60, end: 18 * 60 },
  4: { start: 9 * 60, end: 18 * 60 },
  5: { start: 9 * 60, end: 18 * 60 },
  6: { start: 9 * 60, end: 13 * 60 },
};

export function isBusinessDay(date: Date): boolean {
  return BUSINESS_HOURS[date.getDay()] !== null;
}

export function getBusinessDates(limit: number, from = new Date()): string[] {
  const dates: string[] = [];
  const cursor = new Date(from);

  while (dates.length < limit) {
    if (isBusinessDay(cursor)) {
      dates.push(
        `${cursor.getFullYear()}-${`${cursor.getMonth() + 1}`.padStart(2, '0')}-${`${cursor.getDate()}`.padStart(2, '0')}`,
      );
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function overlaps(
  start: number,
  duration: number,
  booking: Booking,
): boolean {
  const bookingStart = minutesFromTime(booking.time);
  const bookingEnd = bookingStart + booking.durationMinutes;
  return start < bookingEnd && bookingStart < start + duration;
}

export function getSlots(
  dateIso: string,
  durationMinutes: number,
  bookings: Booking[],
): Slot[] {
  const date = fromISODate(dateIso);
  const window = BUSINESS_HOURS[date.getDay()];
  if (!window) return [];

  const now = new Date();
  const earliest = now.getTime() + AGENDA.minLeadHours * 60 * 60 * 1000;
  const sameDay = date.toDateString() === now.toDateString();
  const dayBookings = bookings.filter((booking) => booking.date === dateIso);

  const slots: Slot[] = [];
  for (
    let cursor = window.start;
    cursor + durationMinutes <= window.end;
    cursor += AGENDA.stepMinutes
  ) {
    const time = timeFromMinutes(cursor);
    const slotStart = new Date(date);
    slotStart.setHours(Math.floor(cursor / 60), cursor % 60, 0, 0);

    const tooSoon = sameDay && slotStart.getTime() < earliest;
    const taken = dayBookings.some((booking) =>
      overlaps(cursor, durationMinutes, booking),
    );

    slots.push({ time, available: !tooSoon && !taken });
  }

  return slots;
}

export function countAvailableSlots(
  dateIso: string,
  durationMinutes: number,
  bookings: Booking[],
): number {
  return getSlots(dateIso, durationMinutes, bookings).filter((slot) => slot.available)
    .length;
}
