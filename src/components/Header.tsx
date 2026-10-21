import { useEffect, useState } from 'react';
import { CalendarCheck, CalendarClock, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../config';
import { cn } from '../lib/cn';
import { BrandLogo } from './Brand';
import { Button } from './ui/Button';

interface HeaderProps {
  bookingCount: number;
  onOpenBookings: () => void;
  onOpenAgenda: () => void;
}

export function Header({
  bookingCount,
  onOpenBookings,
  onOpenAgenda,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-green-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#topo" className="shrink-0" aria-label="Muirakitan Agência, início">
          <BrandLogo />
        </a>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-stone-300">
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

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" onClick={onOpenBookings}>
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Meus agendamentos
            {bookingCount > 0 && (
              <span className="ml-1 rounded-full bg-green-300 px-1.5 text-xs font-semibold text-green-950">
                {bookingCount}
              </span>
            )}
          </Button>
          <Button onClick={onOpenAgenda}>
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
            Agendar reunião
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/20 p-2 text-stone-100 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="menu-mobile"
        className={cn(
          'border-t border-white/10 bg-green-950 px-6 pb-6 md:hidden',
          menuOpen ? 'block' : 'hidden',
        )}
      >
        <nav aria-label="Navegação móvel">
          <ul className="flex flex-col gap-1 py-4 text-sm text-stone-200">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-2 py-2 hover:bg-white/10 hover:text-green-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setMenuOpen(false);
              onOpenBookings();
            }}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Meus agendamentos ({bookingCount})
          </Button>
          <Button
            onClick={() => {
              setMenuOpen(false);
              onOpenAgenda();
            }}
          >
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
            Agendar reunião
          </Button>
        </div>
      </div>
    </header>
  );
}
