import { ArrowUpRight, Check } from 'lucide-react';
import { PRIMARY_SERVICES, SECONDARY_SERVICES } from '../../data/services';
import type { ServiceId } from '../../types';
import { Button } from '../ui/Button';
import { ServiceIcon } from '../ui/ServiceIcon';

interface ServicesProps {
  onSelectService: (serviceId: ServiceId | null) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="servicos" className="border-t border-divide py-24 section">
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Serviços
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            O que o seu negócio precisa para vender e funcionar melhor.
          </h2>
          <p className="mt-5 text-ink-muted">
            Três frentes resolvem a maioria dos casos. Se você já tem sistema
            rodando e precisa de algo mais específico, tem uma lista no fim
            desta seção.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_SERVICES.map((service) => (
            <article
              key={service.id}
              className="flex h-full flex-col rounded-2xl border border-divide bg-bg p-7 transition-colors hover:border-accent/30 hover:bg-bg-subtle"
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

              <div className="mt-6 border-t border-divide pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
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
                {service.ctaLabel ?? `Agendar ${service.shortTitle.toLowerCase()}`}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl border border-accent/20 bg-accent-soft p-7 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold">Não sabe por onde começar?</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
              Descreva o que está travando o seu negócio. Na primeira conversa
              a gente ordena as prioridades e diz o que resolve primeiro — sem
              compromisso.
            </p>
          </div>
          <Button
            className="shrink-0 justify-between"
            onClick={() => onSelectService(null)}
          >
            Falar com quem faz
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-16 border-t border-divide pt-10">
          <header className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Para quem já tem sistema ou equipe técnica
            </p>
            <h3 className="mt-4 text-2xl font-semibold">
              Sistema legado, integração ou projeto com time de TI?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Estas frentes são para empresas que já têm sistemas rodando e
              precisam de integração, modernização ou automação em escala.
            </p>
          </header>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SECONDARY_SERVICES.map((service) => (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  className="group flex w-full items-start gap-3 rounded-xl border border-divide bg-bg p-4 text-left transition-colors hover:border-accent/30 hover:bg-bg-subtle"
                >
                  <ServiceIcon
                    name={service.icon}
                    className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted transition-colors group-hover:text-accent"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-ink-muted">
                      {service.tagline}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
