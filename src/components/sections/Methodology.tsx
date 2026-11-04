import { CheckCircle2, Eye, Search, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    id: 'entender',
    title: 'Entender antes de construir',
    description:
      'A gente mapeia como o seu trabalho acontece hoje, o que já existe e onde trava. A proposta nasce disso — não de um pacote pronto.',
    icon: Search,
  },
  {
    id: 'travado',
    title: 'O que não pode errar fica travado',
    description:
      'Preço, imposto, estoque e dinheiro seguem regra fixa e testada. A IA ajuda a construir; ela não decide o que é crítico.',
    icon: ShieldCheck,
  },
  {
    id: 'acompanhar',
    title: 'Você acompanha de perto',
    description:
      'Ambiente de teste, revisão a cada etapa e acesso ao andamento. Você vê funcionando antes de aprovar a entrega.',
    icon: Eye,
  },
  {
    id: 'prova',
    title: 'Entrega com prova',
    description:
      'Cada entrega passa por testes antes de entrar no ar. Você recebe documentação, treinamento e 90 dias de garantia.',
    icon: CheckCircle2,
  },
];

export function Methodology() {
  return (
    <section id="metodologia" className="border-t border-divide py-24 section">
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Metodologia
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            O que garante que o seu projeto sai como combinado.
          </h2>
          <p className="mt-5 text-ink-muted">
            Método não é enfeite: é o que evita atraso, orçamento estourado e
            sistema que quebra depois de entregue.
          </p>
        </header>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.id}
                className="relative rounded-2xl border border-divide bg-bg p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-strong">
            Princípio
          </p>
          <p className="mt-4 text-lg font-medium">
            Regra fixa no que é crítico, IA no que acelera.
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            É o que permite usar IA em sistema de verdade, inclusive fiscal, com
            emissão real em produção — o caso do Jupati.
          </p>
        </div>
      </div>
    </section>
  );
}
