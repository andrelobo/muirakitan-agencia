import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { BRAND } from '../../config';
import { FEATURED_PROJECTS } from '../../data/projects';
import { Button } from '../ui/Button';

interface HeroProps {
  onOpenAgenda: () => void;
}

const STATS = [
  { value: 'Manaus', label: 'atendimento local' },
  { value: '48h', label: 'para o primeiro retorno' },
  { value: '90d', label: 'de garantia na entrega' },
  { value: '7', label: 'projetos no portfólio' },
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
            Seu negócio na internet,{' '}
            <span className="text-accent">pronto para vender</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-ink-muted">{BRAND.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={onOpenAgenda}>
              Agendar conversa gratuita
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#projetos">Ver projetos</a>
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
              Escolha o dia e o horário. A conversa dura até 60 minutos e
              termina com um próximo passo claro — sem enrolação.
            </p>

            <ul className="mt-7 space-y-4 text-sm text-ink">
              {[
                'Sem custo e sem compromisso',
                'Entendo o seu negócio antes de propor',
                'Prazo e valor por escrito',
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
              Sites
            </span>
            <span className="rounded-xl border border-line bg-surface-muted py-4">
              Lojas online
            </span>
            <span className="rounded-xl border border-line bg-surface-muted py-4">
              Automação
            </span>
            <span className="rounded-xl border border-line bg-surface-muted py-4">
              Sistemas
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-line pt-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Projetos entregues
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Sites e produtos digitais que já estão no ar.
            </p>
          </div>
          <a
            href="#projetos"
            className="nav-link-hover text-sm font-medium text-accent-strong hover:text-ink-hover"
          >
            Ver portfólio completo
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
            <a
              key={project.id}
              href={`/projetos/${project.id}/index.html`}
              className="group overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/40"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-line bg-bg-sunken">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
                    {project.category}
                  </p>
                  <p className="mt-0.5 text-sm font-medium">{project.name}</p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-ink-subtle transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
