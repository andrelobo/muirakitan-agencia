import { ArrowRight, Sparkles } from 'lucide-react';
import { BRAND } from '../../config';
import { Button } from '../ui/Button';

interface HeroProps {
  onOpenAgenda: () => void;
}

const STATS = [
  { value: '7', label: 'linhas de serviço' },
  { value: '48h', label: 'para o primeiro retorno' },
  { value: '90d', label: 'de garantia na entrega' },
  { value: '100%', label: 'código no seu repositório' },
];

export function Hero({ onOpenAgenda }: HeroProps) {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 mtk-grid-backdrop opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 mtk-glow"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {BRAND.eyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Usamos IA com governança para construir o software que a sua
            operação{' '}
            <span className="text-accent">precisa para crescer com segurança</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-ink-muted">{BRAND.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={onOpenAgenda}>
              Agendar reunião gratuita
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#servicos">Ver serviços</a>
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-semibold text-accent">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-ink-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-line bg-surface p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Agenda web
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              Fale com quem vai construir
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Escolha o serviço, o dia e o horário. A conversa de diagnóstico
              acontece em até 60 minutos e termina com um próximo passo claro.
            </p>

            <ul className="mt-7 space-y-4 text-sm text-ink">
              {[
                'Sem custo e sem compromisso',
                'Diagnóstico do processo atual',
                'Escopo, prazo e investimento por escrito',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Button
              className="mt-9 w-full"
              onClick={onOpenAgenda}
              variant="accent"
            >
              Ver horários disponíveis
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div
            className="mt-6 grid grid-cols-2 gap-4 text-center text-xs uppercase tracking-[0.2em] text-ink-subtle"
            aria-hidden="true"
          >
            <span className="rounded-xl border border-line bg-surface-muted py-4">
              Apps
            </span>
            <span className="rounded-xl border border-line bg-surface-muted py-4">
              Sites
            </span>
            <span className="rounded-xl border border-line bg-surface-muted py-4">
              Automação
            </span>
            <span className="rounded-xl border border-line bg-surface-muted py-4">
              RPA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
