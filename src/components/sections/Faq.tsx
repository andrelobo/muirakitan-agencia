import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/faq';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-divide py-24 section">
      <div className="mx-auto max-w-4xl px-6">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Dúvidas
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Perguntas que aparecem antes de começar.
          </h2>
        </header>

        <ul className="mt-12 divide-y divide-divide overflow-hidden rounded-2xl border bg-bg">
          {FAQ_ITEMS.map((item, index) => {
            const open = openIndex === index;
            const startsSystemGroup =
              item.group === 'sistema' && FAQ_ITEMS[index - 1]?.group !== 'sistema';
            return (
              <li key={item.question}>
                {startsSystemGroup && (
                  <p className="bg-bg-subtle px-6 py-3 text-xs uppercase tracking-[0.2em] text-ink-subtle">
                    Perguntas técnicas
                  </p>
                )}
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium transition-colors hover:bg-bg-subtle"
                  >
                    {item.question}
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-accent transition-transform"
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
