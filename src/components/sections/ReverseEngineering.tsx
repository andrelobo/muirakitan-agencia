import {
  ArrowRight,
  Check,
  FileSearch,
  Layers,
  Plug,
  type LucideIcon,
} from 'lucide-react';
import { REVERSE_OFFERS, type ReverseOfferIcon } from '../../data/reverse';
import { whatsappUrl } from '../../lib/contact';
import { Button } from '../ui/Button';

const ICONS: Record<ReverseOfferIcon, LucideIcon> = {
  search: FileSearch,
  plug: Plug,
  layers: Layers,
};

const TRUST = [
  'Autorização escrita',
  'Ambiente isolado',
  'Evidência SHA-256',
  'Confiança declarada',
  'Revisão humana',
];

export function ReverseEngineering() {
  return (
    <section id="engenharia-reversa" className="border-t border-divide py-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Engenharia reversa assistida
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Seu sistema funciona. Mas você sabe como?
          </h2>
          <p className="mt-5 text-ink-muted">
            Investigamos sistemas existentes com método, evidência e IA governada
            — para documentar, integrar, modernizar ou reconstruir sem depender
            da memória de quem construiu.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVERSE_OFFERS.map((offer) => {
            const Icon = ICONS[offer.icon];
            return (
              <article
                key={offer.id}
                className="flex h-full flex-col rounded-2xl border border-divide bg-bg p-7 transition-colors hover:border-accent/30 hover:bg-bg-subtle"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{offer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {offer.description}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-ink">
                  {offer.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-strong">
                Compromisso
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Nenhuma análise começa sem autorização escrita, escopo definido e
                ambiente isolado. Atendemos sistemas do próprio cliente ou
                projetos com autorização formal.
              </p>
            </div>
            <Button asChild variant="accent" className="shrink-0">
              <a
                href={whatsappUrl(
                  'Olá! Gostaria de conversar sobre um diagnóstico de sistema legado.',
                )}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar diagnóstico
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-accent/15 pt-5 text-xs text-ink-subtle">
            {TRUST.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
