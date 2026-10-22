import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES } from '../../data/services';
import type { ServiceId } from '../../types';
import { Button } from '../ui/Button';
import { ServiceIcon } from '../ui/ServiceIcon';

interface ServicesProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="servicos" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Serviços
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Oito frentes para o mesmo objetivo: entregar com segurança,
            rastreabilidade e IA com governança.
          </h2>
          <p className="mt-5 text-ink-muted">
            Cada frente pode começar sozinha. Na maioria dos casos, o melhor
            resultado vem da combinação entre site, sistema e automação.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-accent/50 hover:bg-surface-muted"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm font-medium text-accent">
                {service.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-sm text-ink"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-subtle">
                  Entregáveis
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  {service.deliverables.join(' · ')}
                </p>
              </div>

              <Button
                variant="outline"
                className="mt-7 w-full justify-between"
                onClick={() => onSelectService(service.id)}
              >
                Agendar {service.shortTitle.toLowerCase()}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </article>
          ))}

          <article className="flex h-full flex-col justify-between rounded-2xl border border-accent/40 bg-accent-soft p-7">
            <div>
              <h3 className="text-xl font-semibold">Não sabe o que precisa?</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Descreva o processo e a dor. Na primeira conversa ordenamos as
                prioridades e indicamos a frente de serviço com melhor retorno
                para o seu caso.
              </p>
            </div>
            <Button
              className="mt-7 w-full justify-between"
              onClick={() => onSelectService('automacoes')}
            >
              Falar com um especialista
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}
