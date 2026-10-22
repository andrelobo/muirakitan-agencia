import { BrandLogo } from './Brand';
import { NAV_LINKS } from '../config';
import { CONTACT } from '../config';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-muted">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <BrandLogo />
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Sites, aplicativos, automações, APIs, sistemas contábeis e RPA com
              engenharia de software e uso responsável de inteligência
              artificial.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Contato
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.city}</li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} Muirakitan Tecnologia.</p>
          <p>
            Agenda web com confirmação por WhatsApp e e-mail. Agendamentos
            salvos apenas no seu navegador.
          </p>
        </div>
      </div>
    </footer>
  );
}
