import { CONTACT } from '../config';
import { getService } from '../data/services';
import { formatDateTimeLabel, fromISODate } from './dates';
import type { Booking } from '../types';

export function bookingSummary(booking: Booking): string {
  const service = getService(booking.serviceId);
  const lines = [
    `Agendamento ${booking.code}`,
    `Serviço: ${service.title}`,
    `Data: ${formatDateTimeLabel(booking.date, booking.time)}`,
    `Duração: ${booking.durationMinutes} minutos`,
    `Nome: ${booking.name}`,
  ];

  if (booking.company) lines.push(`Empresa: ${booking.company}`);
  if (booking.phone) lines.push(`Telefone: ${booking.phone}`);
  if (booking.notes) lines.push(`Observações: ${booking.notes}`);

  return lines.join('\n');
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function googleCalendarUrl(booking: Booking): string {
  const service = getService(booking.serviceId);
  const [hours, minutes] = booking.time.split(':').map(Number);
  const start = fromISODate(booking.date);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + booking.durationMinutes * 60 * 1000);

  const stamp = (date: Date) =>
    date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${service.title} — reunião Muirakitan Agência (${booking.code})`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: bookingSummary(booking),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function toIcsDate(booking: Booking, end: boolean): string {
  const [hours, minutes] = booking.time.split(':').map(Number);
  const date = fromISODate(booking.date);
  date.setHours(hours, minutes, 0, 0);
  if (end) date.setMinutes(date.getMinutes() + booking.durationMinutes);

  const pad = (value: number) => `${value}`.padStart(2, '0');
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}00`
  );
}

export function icsContent(booking: Booking): string {
  const service = getService(booking.serviceId);
  const end = toIcsDate(booking, true);
  const start = toIcsDate(booking, false);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Muirakitan Agencia//Agenda//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.id}@muirakitan.com.br`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${service.title} - Muirakitan Agencia`,
    `DESCRIPTION:${bookingSummary(booking).replace(/\n/g, '\\n')}`,
    `LOCATION:Online - ${CONTACT.email}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function icsHref(booking: Booking): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent(booking))}`;
}
