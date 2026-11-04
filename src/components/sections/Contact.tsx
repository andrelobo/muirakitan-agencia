import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { BRAND, CONTACT } from '../../config';
import { whatsappUrl } from '../../lib/contact';
import { Button } from '../ui/Button';

export function Contact() {
  return (
    <section id="contato" className="border-t border-divide py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Contato
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Prefere conversar antes de agendar?
          </h2>
          <p className="mt-5 max-w-lg text-ink-muted">
            {BRAND.description}
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="font-medium text-ink">WhatsApp</dt>
                <dd className="mt-1 text-ink-muted">
                  <a
                    className="nav-link-hover underline decoration-line-strong underline-offset-4 hover:text-accent"
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
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="font-medium text-ink">E-mail</dt>
                <dd className="mt-1 text-ink-muted">
                  <a
                    className="nav-link-hover underline decoration-line-strong underline-offset-4 hover:text-accent"
                    href={`mailto:${CONTACT.email}`}
                  >
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="font-medium text-ink">Atendimento</dt>
                <dd className="mt-1 text-ink-muted">{CONTACT.hours}</dd>
                <dd className="mt-1 text-ink-subtle">{CONTACT.responseTime}</dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="font-medium text-ink">Localização</dt>
                <dd className="mt-1 text-ink-muted">
                  {CONTACT.city}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border bg-bg p-8">
          <h3 className="text-xl font-semibold">Resumo para mandar agora</h3>
          <p className="mt-3 text-sm text-ink-muted">
            Escreva em poucas linhas o que você precisa. Respondo com uma
            leitura do problema e o próximo passo.
          </p>

          <ul className="mt-7 space-y-3 text-sm text-ink">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              O que o seu negócio faz
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              Onde trava hoje: site, planilha, atendimento, cobrança
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              Para quando você precisa
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <a
                href={whatsappUrl(
                  'Olá! Vim pelo site da Muirakitan.\n\nMeu negócio:\nO que eu preciso:\nPara quando:',
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