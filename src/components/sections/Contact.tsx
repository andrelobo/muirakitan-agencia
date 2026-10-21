import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { BRAND, CONTACT } from '../../config';
import { whatsappUrl } from '../../lib/contact';
import { Button } from '../ui/Button';

export function Contact() {
  return (
    <section id="contato" className="border-t border-white/10 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-green-300">
            Contato
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Prefere falar direto? Fale.
          </h2>
          <p className="mt-5 max-w-lg text-stone-300">
            {BRAND.description}
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-300/15 text-green-300">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="font-medium text-stone-50">WhatsApp</dt>
                <dd className="mt-1 text-stone-300">
                  <a
                    className="underline decoration-white/30 underline-offset-4 hover:text-green-300"
                    href={whatsappUrl(
                      'Olá! Gostaria de falar com a Muirakitan Agência sobre um projeto.',
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enviar mensagem
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-300/15 text-green-300">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="font-medium text-stone-50">E-mail</dt>
                <dd className="mt-1 text-stone-300">
                  <a
                    className="underline decoration-white/30 underline-offset-4 hover:text-green-300"
                    href={`mailto:${CONTACT.email}`}
                  >
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-300/15 text-green-300">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="font-medium text-stone-50">Atendimento</dt>
                <dd className="mt-1 text-stone-300">{CONTACT.hours}</dd>
                <dd className="mt-1 text-stone-400">{CONTACT.responseTime}</dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-300/15 text-green-300">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="font-medium text-stone-50">Atendimento</dt>
                <dd className="mt-1 text-stone-300">
                  {CONTACT.city} · {BRAND.legalName}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-8">
          <h3 className="text-xl font-semibold">Resumo para mandar agora</h3>
          <p className="mt-3 text-sm text-stone-300">
            Escreva em poucas linhas o que você precisa. Respondo com uma
            leitura do problema e o próximo passo.
          </p>

          <ul className="mt-7 space-y-3 text-sm text-stone-200">
            {[
              'Qual processo quer melhorar',
              'Quais sistemas já usam',
              'Qual prazo e orçamento aceitável',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-300"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <a
                href={whatsappUrl(
                  'Olá! Gostaria de falar com a Muirakitan Agência.\n\nProcesso:\nSistemas:\nPrazo:',
                )}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Falar no WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a
                href={`mailto:${CONTACT.email}?subject=Projeto%20Muirakitan%20Agência`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Enviar e-mail
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
