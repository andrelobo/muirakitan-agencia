import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CalendarPlus,
  Check,
  Clock,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { AGENDA, CONTACT } from '../../config';
import { SERVICES, getService } from '../../data/services';
import {
  formatDateTimeLabel,
  formatDayNumber,
  formatMonth,
  formatRelativeDay,
  formatWeekday,
} from '../../lib/dates';
import { isValidEmail, maskPhone } from '../../lib/format';
import {
  googleCalendarUrl,
  icsHref,
  mailtoUrl,
  whatsappUrl,
  bookingSummary,
} from '../../lib/contact';
import { countAvailableSlots, getBusinessDates, getSlots } from '../../lib/slots';
import { cn } from '../../lib/cn';
import type { NewBooking } from '../../lib/bookings';
import type { Booking, ServiceId } from '../../types';
import { Button } from '../ui/Button';
import { ServiceIcon } from '../ui/ServiceIcon';

interface AgendaProps {
  bookings: Booking[];
  onCreate: (input: NewBooking) => Booking;
  serviceId: ServiceId | null;
  onServiceChange: (serviceId: ServiceId | null) => void;
  onOpenBookings: () => void;
}

type Step = 1 | 2 | 3;

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  notes: '',
};

const STEPS: { id: Step; label: string }[] = [
  { id: 1, label: 'Serviço' },
  { id: 2, label: 'Data e hora' },
  { id: 3, label: 'Seus dados' },
];

export function Agenda({
  bookings,
  onCreate,
  serviceId,
  onServiceChange,
  onOpenBookings,
}: AgendaProps) {
  const [step, setStep] = useState<Step>(serviceId ? 2 : 1);
  const [rawDate, setRawDate] = useState<string | null>(null);
  const [rawTime, setRawTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const service = serviceId ? getService(serviceId) : null;
  const duration = service?.durationMinutes ?? 60;

  const availableDates = useMemo(() => {
    return getBusinessDates(AGENDA.horizonDays).filter(
      (iso) => countAvailableSlots(iso, duration, bookings) > 0,
    );
  }, [duration, bookings]);

  const date = rawDate && availableDates.includes(rawDate) ? rawDate : null;

  const slots = useMemo(() => {
    if (!date) return [];
    return getSlots(date, duration, bookings);
  }, [date, duration, bookings]);

  const time =
    rawTime && slots.some((slot) => slot.time === rawTime && slot.available)
      ? rawTime
      : null;

  function chooseService(nextId: ServiceId) {
    onServiceChange(nextId);
    setRawTime(null);
    setError(null);
    setStep(2);
  }

  function chooseDate(nextDate: string) {
    setRawDate(nextDate);
    setRawTime(null);
    setError(null);
  }

  function goToStep(next: Step) {
    setError(null);
    setStep(next);
  }

  function handleContinue() {
    if (step === 1 && !serviceId) {
      setError('Escolha um serviço para continuar.');
      return;
    }
    if (step === 2) {
      if (!date) {
        setError('Escolha uma data disponível.');
        return;
      }
      if (!time) {
        setError('Escolha um horário para continuar.');
        return;
      }
    }
    setError(null);
    setStep((current) => Math.min(3, current + 1) as Step);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!serviceId || !date || !time) {
      setError('Serviço, data e horário são obrigatórios.');
      return;
    }
    if (form.name.trim().length < 3) {
      setError('Informe seu nome completo.');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Informe um e-mail válido.');
      return;
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Informe um telefone com DDD.');
      return;
    }
    if (!consent) {
      setError('É necessário autorizar o contato da Muirakitan Agência.');
      return;
    }

    const booking = onCreate({
      serviceId,
      date,
      time,
      durationMinutes: duration,
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim(),
    });

    setConfirmed(booking);
    setError(null);
  }

  function resetAgenda() {
    setConfirmed(null);
    setStep(1);
    onServiceChange(null);
    setRawDate(null);
    setRawTime(null);
    setForm(EMPTY_FORM);
    setConsent(false);
    setError(null);
  }

  return (
    <section id="agenda" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Agenda web
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Agende a conversa sem sair do site.
          </h2>
          <p className="mt-5 text-ink-muted">
            Três passos, menos de um minuto. Você escolhe o serviço, o dia e o
            horário, e nós confirmamos pelo WhatsApp ou por e-mail.
          </p>
        </header>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <ol className="flex flex-wrap items-center gap-2 sm:gap-3">
              {STEPS.map((item, index) => {
                const active = step === item.id;
                const done = step > item.id;

                return (
                  <li key={item.id} className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (item.id === 1 || done) goToStep(item.id);
                      }}
                      disabled={item.id > 1 && !done}
                      aria-current={active ? 'step' : undefined}
                      className={cn(
                        'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors sm:px-4 sm:text-sm',
                        active && 'border-accent bg-accent text-white',
                        !active && done && 'border-line-strong text-ink-muted hover:bg-surface-muted',
                        !active && !done && 'border-line text-ink-subtle',
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold',
                          active && 'bg-accent-strong text-white',
                          !active && done && 'bg-surface-sunken text-ink-muted',
                          !active && !done && 'bg-surface-muted text-ink-subtle',
                        )}
                      >
                        {done ? (
                          <Check className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          index + 1
                        )}
                      </span>
                      {item.label}
                    </button>
                    {index < STEPS.length - 1 && (
                      <span
                        className="hidden h-px w-6 bg-line-strong sm:block"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            {confirmed ? (
              <Confirmation
                booking={confirmed}
                onReset={resetAgenda}
                onOpenBookings={onOpenBookings}
              />
            ) : (
              <div className="mt-8">
                {step === 1 && (
                  <fieldset>
                    <legend className="text-sm font-medium text-ink">
                      Qual frente de serviço você quer discutir?
                    </legend>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {SERVICES.map((item) => {
                        const selected = item.id === serviceId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => chooseService(item.id)}
                            aria-pressed={selected}
                            className={cn(
                              'rounded-xl border p-5 text-left transition-colors',
                              selected
                                ? 'border-accent bg-accent-soft'
                                : 'border-line bg-surface hover:border-accent/40 hover:bg-surface-muted',
                            )}
                          >
                            <span className="flex items-center justify-between">
                              <ServiceIcon
                                name={item.icon}
                                className={cn(
                                  'h-5 w-5',
                                  selected ? 'text-accent' : 'text-ink-muted',
                                )}
                              />
                              <span className="text-xs text-ink-subtle">
                                {item.durationMinutes} min
                              </span>
                            </span>
                            <span className="mt-3 block text-sm font-semibold">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-ink-subtle">
                              {item.tagline}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-ink">
                        Escolha o dia
                      </p>
                      <div
                        role="radiogroup"
                        aria-label="Datas disponíveis"
                        className="mtk-scrollbar mt-4 flex gap-3 overflow-x-auto pb-3 lg:flex-wrap lg:overflow-visible"
                      >
                        {availableDates.map((iso) => {
                          const selected = iso === date;
                          return (
                            <button
                              key={iso}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() => chooseDate(iso)}
                              className={cn(
                                'flex min-w-[74px] shrink-0 flex-col items-center rounded-xl border px-4 py-3 transition-colors',
                                selected
                                  ? 'border-accent bg-accent text-white'
                                  : 'border-line bg-surface text-ink hover:border-accent/40',
                              )}
                            >
                              <span className="text-xs uppercase tracking-wider">
                                {formatWeekday(iso)}
                              </span>
                              <span className="mt-1 text-xl font-semibold">
                                {formatDayNumber(iso)}
                              </span>
                              <span className="text-xs uppercase">
                                {formatMonth(iso)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-4 text-xs text-ink-subtle">
                        Atendimento {CONTACT.hours}. Horários com antecedência
                        mínima de {AGENDA.minLeadHours}h.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-ink">
                        Escolha o horário
                      </p>
                      {date ? (
                        <div
                          role="radiogroup"
                          aria-label="Horários disponíveis"
                          className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4"
                        >
                          {slots.map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
                              role="radio"
                              aria-checked={slot.time === time}
                              disabled={!slot.available}
                              onClick={() => {
                                setRawTime(slot.time);
                                setError(null);
                              }}
                              className={cn(
                                'rounded-lg border py-2 text-sm transition-colors',
                                slot.time === time &&
                                  'border-accent bg-accent text-white',
                                slot.available &&
                                  slot.time !== time &&
                                  'border-line bg-surface text-ink hover:border-accent/40',
                                !slot.available &&
                                  'cursor-not-allowed border-line bg-surface-muted text-ink-subtle line-through',
                              )}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4 rounded-xl border border-dashed border-line-strong p-6 text-sm text-ink-subtle">
                          Selecione um dia para ver os horários livres.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Nome completo" htmlFor="agenda-nome" required>
                        <input
                          id="agenda-nome"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(event) =>
                            setForm({ ...form, name: event.target.value })
                          }
                          className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle"
                          placeholder="Como devemos chamar você"
                        />
                      </Field>

                      <Field label="Empresa" htmlFor="agenda-empresa">
                        <input
                          id="agenda-empresa"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          value={form.company}
                          onChange={(event) =>
                            setForm({ ...form, company: event.target.value })
                          }
                          className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle"
                          placeholder="Nome da empresa"
                        />
                      </Field>

                      <Field label="E-mail" htmlFor="agenda-email" required>
                        <input
                          id="agenda-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(event) =>
                            setForm({ ...form, email: event.target.value })
                          }
                          className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle"
                          placeholder="voce@empresa.com.br"
                        />
                      </Field>

                      <Field label="WhatsApp" htmlFor="agenda-telefone" required>
                        <input
                          id="agenda-telefone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(event) =>
                            setForm({
                              ...form,
                              phone: maskPhone(event.target.value),
                            })
                          }
                          className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle"
                          placeholder="(92) 98593-0954"
                        />
                      </Field>

                      <div className="sm:col-span-2">
                        <Field
                          label="O que você precisa resolver?"
                          htmlFor="agenda-observacoes"
                        >
                          <textarea
                            id="agenda-observacoes"
                            name="notes"
                            rows={4}
                            value={form.notes}
                            onChange={(event) =>
                              setForm({ ...form, notes: event.target.value })
                            }
                            className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle"
                            placeholder="Processo atual, sistemas usados, prazo desejado..."
                          />
                        </Field>
                      </div>
                    </div>

                    <label className="mt-6 flex items-start gap-3 text-sm text-ink-muted">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(event) => setConsent(event.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong bg-surface accent-accent"
                      />
                      <span>
                        Autorizo a Muirakitan Tecnologia a entrar em contato
                        pelos dados informados para confirmar este agendamento.
                        Os dados ficam salvos apenas neste navegador.
                      </span>
                    </label>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => goToStep(step === 3 ? 2 : 1)}
                      >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Voltar
                      </Button>
                      <Button type="submit">
                        Confirmar agendamento
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </form>
                )}

                {error && (
                  <p
                    role="alert"
                    className="mt-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}

                {step < 3 && (
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => goToStep(step === 2 ? 1 : 1)}
                      disabled={step === 1}
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Voltar
                    </Button>
                    <Button type="button" onClick={handleContinue}>
                      Continuar
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Resumo
            </p>

            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-ink-subtle">Serviço</dt>
                <dd className="mt-1 font-medium text-ink">
                  {service ? service.title : 'Escolha um serviço'}
                </dd>
              </div>
              <div>
                <dt className="text-ink-subtle">Data</dt>
                <dd className="mt-1 font-medium text-ink">
                  {date ? formatRelativeDay(date) : 'A definir'}
                </dd>
              </div>
              <div>
                <dt className="text-ink-subtle">Horário</dt>
                <dd className="mt-1 font-medium text-ink">
                  {time
                    ? `${time} · ${duration} min`
                    : 'A definir'}
                </dd>
              </div>
              <div>
                <dt className="text-ink-subtle">Formato</dt>
                <dd className="mt-1 font-medium text-ink">
                  Videochamada online · {CONTACT.responseTime.toLowerCase()}
                </dd>
              </div>
            </dl>

            <div className="mt-7 border-t border-line pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-subtle">
                Como funciona a confirmação
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink-muted">
                <li className="flex items-start gap-3">
                  <MessageCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  Envie pelo WhatsApp com todos os dados do pedido.
                </li>
                <li className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  Ou receba por e-mail em {CONTACT.email}.
                </li>
                <li className="flex items-start gap-3">
                  <CalendarPlus
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  Salve o horário no Google Agenda ou no seu calendário.
                </li>
              </ul>
            </div>

            <p className="mt-7 flex items-start gap-2 text-xs text-ink-subtle">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Os agendamentos ficam salvos neste navegador. Use o botão “Meus
              agendamentos” para revisar ou cancelar.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm text-ink">
      {label}
      {required && (
        <span className="ml-1 text-accent" aria-hidden="true">
          *
        </span>
      )}
      {children}
    </label>
  );
}

function Confirmation({
  booking,
  onReset,
  onOpenBookings,
}: {
  booking: Booking;
  onReset: () => void;
  onOpenBookings: () => void;
}) {
  const service = getService(booking.serviceId);
  const summary = bookingSummary(booking);

  return (
    <div className="mt-8">
      <div className="rounded-xl border border-accent/40 bg-accent-soft p-6">
        <p className="flex items-center gap-2 text-sm font-medium text-accent-strong">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Agendamento {booking.code} registrado
        </p>
        <h3 className="mt-4 text-2xl font-semibold">{service.title}</h3>
        <p className="mt-2 text-ink">
          {formatDateTimeLabel(booking.date, booking.time)} ·{' '}
          {booking.durationMinutes} minutos
        </p>
        <p className="mt-1 text-sm text-ink-subtle">
          Enviamos os detalhes para {booking.email}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button asChild variant="accent">
          <a
            href={whatsappUrl(
              `Olá! Acabei de agendar uma reunião na Muirakitan Agência.\n\n${summary}`,
            )}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Enviar pelo WhatsApp
          </a>
        </Button>

        <Button asChild variant="outline">
          <a
            href={mailtoUrl(
              `Agendamento ${booking.code} — ${service.title}`,
              summary,
            )}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Enviar por e-mail
          </a>
        </Button>

        <Button asChild variant="outline">
          <a
            href={googleCalendarUrl(booking)}
            target="_blank"
            rel="noreferrer"
          >
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            Google Agenda
          </a>
        </Button>

        <Button asChild variant="outline">
          <a href={icsHref(booking)} download={`${booking.code}.ics`}>
            <Clock className="h-4 w-4" aria-hidden="true" />
            Baixar calendário (.ics)
          </a>
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="ghost" onClick={onReset}>
          Fazer outro agendamento
        </Button>
        <Button variant="ghost" onClick={onOpenBookings}>
          Ver meus agendamentos
        </Button>
      </div>
    </div>
  );
}
