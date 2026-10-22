import { PROCESS_STEPS } from '../../data/process';

export function Process() {
  return (
    <section id="processo" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Como funciona
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Do diagnóstico à entrega, sem surpresa no fim do projeto.
          </h2>
        </header>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.id}
              className="relative rounded-2xl border border-line bg-surface p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-accent">
                  {`0${index + 1}`}
                </span>
                <span className="rounded-full border border-line bg-surface-muted px-3 py-1 text-xs text-ink-muted">
                  {step.duration}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-6 rounded-2xl border border-line bg-surface-muted p-8 lg:grid-cols-3">
          {[
            {
              title: 'Transparência',
              text: 'Sem caixa preta: você acompanha tasks, revisões e decisões no mesmo ambiente do seu time.',
            },
            {
              title: 'Qualidade',
              text: 'Revisão de código, testes automatizados e ambiente de homologação antes de qualquer publicação.',
            },
            {
              title: 'Conformidade',
              text: 'LGPD desde o desenho: dados minimizados, acesso por perfil, logs e trilha de auditoria.',
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-base font-semibold text-accent">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
