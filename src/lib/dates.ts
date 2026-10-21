const WEEKDAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const MONTH_SHORT = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function startOfDay(date: Date): Date {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
}

export function formatWeekday(iso: string): string {
  return WEEKDAY_SHORT[fromISODate(iso).getDay()];
}

export function formatDayNumber(iso: string): string {
  return `${fromISODate(iso).getDate()}`;
}

export function formatMonth(iso: string): string {
  return MONTH_SHORT[fromISODate(iso).getMonth()];
}

export function formatLongDate(iso: string): string {
  const text = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(fromISODate(iso));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatTime(time: string): string {
  return time;
}

export function formatDateTimeLabel(iso: string, time: string): string {
  return `${formatLongDate(iso)} às ${time}`;
}

export function formatRelativeDay(iso: string, today = toISODate(new Date())): string {
  if (iso === today) return 'Hoje';
  const tomorrow = toISODate(addDays(fromISODate(today), 1));
  if (iso === tomorrow) return 'Amanhã';
  return formatLongDate(iso);
}

export function minutesFromTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function timeFromMinutes(total: number): string {
  const hours = `${Math.floor(total / 60)}`.padStart(2, '0');
  const minutes = `${total % 60}`.padStart(2, '0');
  return `${hours}:${minutes}`;
}
