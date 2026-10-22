import { CheckCircle2, FileText, GitBranch, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    id: 'contexto',
    title: 'Contexto',
    description:
      'Mapeamos regras, fluxos, integrações, riscos e histórico. Criamos o contexto curado para os agentes trabalharem com precisão.',
    icon: FileText,
  },
  {
    id: 'governanca',
    title: 'Governança',
    description:
      'Definimos limites claros: o que a IA pode fazer, o que fica determinístico e quais bloqueios entram em vigor. AGENTS.md e AI_CONTEXT.md viram o contrato.',
    icon: ShieldCheck,
  },
  {
    id: 'agentes',
    title: 'Agentes',
    description:
      'Transformamos conhecimento tribal em skills/agentes sob medida. Playbooks reutilizáveis para diagnóstico, emissão, webhooks e tarefas críticas.',
    icon: GitBranch,
  },
  {
    id: 'validacao',
    title: 'Validação',
    description:
      'Gates obrigatórios: npm test, build e lint. Testes, revisão e evidências antes de ir para produção. Sem atalhos em sistemas críticos.',
    icon: CheckCircle2,
  },
];

export function Methodology() {
  return (
    <section id="metodologia" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Metodologia
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Como aplicamos IA com governança em sistemas reais
          </h2>
          <p className="mt-5 text-ink-muted">
            Inspirado na prática real com o ZERA (sistema fiscal em produção com
            emissões reais). IA como copiloto, regras críticas sempre
            determinísticas.
          </p>
        </header>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.id}
                className="relative rounded-2xl border border-line bg-surface p-7"
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

        <div className="mt-12 rounded-2xl border border-accent/40 bg-accent-soft p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-strong">
            Princípio
          </p>
          <p className="mt-4 text-lg font-medium">
            LLM != motor fiscal. IA interpreta, o motor decide. Evidências
            primeiro, adivinhação nunca.
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            Esse é o diferencial para aplicar IA com segurança em integrações
            críticas, legados e sistemas em produção.
          </p>
        </div>
      </div>
    </section>
  );
}
