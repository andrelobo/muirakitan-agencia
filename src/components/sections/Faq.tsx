import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/faq';
import { cn } from '../../lib/cn';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line py-24">
      <div className="mx-auto max-w-4xl px-6">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Dúvidas
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Perguntas que aparecem antes de começar.
          </h2>
        </header>

        <ul className="mt-12 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {FAQ_ITEMS.map((item, index) => {
            const open = openIndex === index;
            return (
              <li key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium transition-colors hover:bg-surface-muted"
                  >
                    {item.question}
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-accent transition-transform',
                        open && 'rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {open && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6 text-sm leading-relaxed text-ink-muted"
                  >
                    {item.answer}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
