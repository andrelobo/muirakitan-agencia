import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../lib/contact';

export function FloatingContact() {
  return (
    <a
      href={whatsappUrl(
        'Olá! Vim pelo site da Muirakitan Agência e gostaria de falar sobre um projeto.',
      )}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-3 rounded-full bg-accent px-4 py-3 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-transform hover:bg-accent-strong sm:bottom-7 sm:right-7"
      aria-label="Falar com a Muirakitan Agência pelo WhatsApp"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">Falar no WhatsApp</span>
    </a>
  );
}
