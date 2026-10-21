import { BrandLogo } from './Brand';
import { NAV_LINKS } from '../config';
import { CONTACT } from '../config';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-mtk-950">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <BrandLogo />
            <p className="mt-5 text-sm leading-relaxed text-stone-400">
              Sites, aplicativos, automações, APIs, sistemas contábeis e RPA com
              engenharia de software e uso responsável de inteligência
              artificial.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-xs uppercase tracking-[0.3em] text-green-300">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-300">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="transition-colors hover:text-green-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-green-300">
              Contato
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-300">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-green-300"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.city}</li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
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
