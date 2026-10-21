import { useEffect, useRef } from 'react';
import { CalendarX2, Mail, MessageCircle, X } from 'lucide-react';
import { getService } from '../../data/services';
import { bookingSummary, mailtoUrl, whatsappUrl } from '../../lib/contact';
import { formatDateTimeLabel } from '../../lib/dates';
import type { Booking } from '../../types';
import { Button } from '../ui/Button';

interface BookingsDialogProps {
  open: boolean;
  bookings: Booking[];
  onClose: () => void;
  onCancel: (id: string) => void;
}

export function BookingsDialog({
  open,
  bookings,
  onClose,
  onCancel,
}: BookingsDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sorted = [...bookings].sort((a, b) =>
    `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-green-950/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookings-title"
        className="w-full max-w-3xl rounded-2xl border border-white/15 bg-mtk-900 p-6 shadow-2xl outline-none sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-green-300">
              Agenda web
            </p>
            <h2
              id="bookings-title"
              className="mt-2 text-2xl font-semibold"
            >
              Meus agendamentos
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-lg border border-white/15 p-2 text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {sorted.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-white/20 p-8 text-center text-sm text-stone-300">
            Você ainda não tem agendamentos. Escolha um serviço e reserve um
            horário na agenda.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {sorted.map((booking) => {
              const service = getService(booking.serviceId);
              return (
                <li
                  key={booking.id}
                  className="rounded-xl border border-white/15 bg-white/5 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-green-300">
                        {booking.code}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-sm text-stone-300">
                        {formatDateTimeLabel(booking.date, booking.time)} ·{' '}
                        {booking.durationMinutes} min
                      </p>
                      <p className="mt-1 text-xs text-stone-400">
                        {booking.name}
                        {booking.company ? ` · ${booking.company}` : ''}
                      </p>
                    </div>
                    <span className="rounded-full border border-green-300/40 bg-green-300/10 px-3 py-1 text-xs text-green-300">
                      Aguardando confirmação
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={whatsappUrl(
                          `Olá! Preciso confirmar o agendamento ${booking.code}.\n\n${bookingSummary(booking)}`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={mailtoUrl(
                          `Agendamento ${booking.code} — ${service.title}`,
                          bookingSummary(booking),
                        )}
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        E-mail
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCancel(booking.id)}
                    >
                      <CalendarX2 className="h-4 w-4" aria-hidden="true" />
                      Cancelar
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
