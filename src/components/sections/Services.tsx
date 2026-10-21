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
    <section id="servicos" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-green-300">
            Serviços
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Sete frentes para o mesmo objetivo: a sua operação funcionando
            melhor.
          </h2>
          <p className="mt-5 text-stone-300">
            Cada frente pode começar sozinha. Na maioria dos casos, o melhor
            resultado vem da combinação entre site, sistema e automação.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/5 p-7 transition-colors hover:border-green-300/60 hover:bg-white/10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-300/15 text-green-300">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm font-medium text-green-300">
                {service.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone-300">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-sm text-stone-200"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-mtk-500"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                  Entregáveis
                </p>
                <p className="mt-2 text-sm text-stone-300">
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

          <article className="flex h-full flex-col justify-between rounded-2xl border border-green-300/40 bg-green-300/10 p-7">
            <div>
              <h3 className="text-xl font-semibold">Não sabe o que precisa?</h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-200">
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
