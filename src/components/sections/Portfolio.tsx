import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { Button } from '../ui/Button';

export function Portfolio() {
  return (
    <section id="projetos" className="border-t border-divide py-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Portfólio
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Sites e produtos digitais que já estão no ar.
          </h2>
          <p className="mt-5 text-ink-muted">
            Uma amostra de sites institucionais, landing pages, portfólios,
            e-commerce e aplicações web. Também entregamos web services e
            integrações sob medida.
          </p>
        </header>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-divide bg-bg transition-colors hover:border-accent/40 hover:bg-bg-subtle"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-divide bg-bg-sunken">
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

              <div className="flex flex-1 flex-col p-6">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                  {project.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {project.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent-strong">
                  Visitar site
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> (abre em nova aba)</span>
                </span>
              </div>
            </a>
          ))}

          <article className="flex h-full flex-col justify-between rounded-2xl border border-accent/20 bg-accent-soft p-7">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent-strong">
                Próximo projeto
              </p>
              <h3 className="mt-4 text-xl font-semibold">
                O próximo case pode ser o seu.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Começamos com um diagnóstico de 30 a 45 minutos para entender o
                processo, o objetivo e o que faz sentido construir primeiro.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-ink-muted">
                {[
                  'Diagnóstico do processo atual',
                  'Prioridades e próximos passos',
                  'Escopo, prazo e investimento',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              asChild
              variant="accent"
              className="mt-7 w-full justify-between"
            >
              <a href="#agenda">
                Agendar diagnóstico
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}
