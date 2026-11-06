export type ServiceId =
  | 'ia-governada'
  | 'sites'
  | 'apps'
  | 'automacoes'
  | 'ia'
  | 'apis'
  | 'contabil'
  | 'rpa';

export type ServiceGroup = 'negocio' | 'sistema';

export interface Service {
  id: ServiceId;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  highlights: string[];
  deliverables: string[];
  durationMinutes: number;
  icon: string;
  group: ServiceGroup;
  /** Texto do botão de agendamento quando o serviço aparece em destaque. */
  ctaLabel?: string;
  /** Imagem de apoio exibida no card em destaque (caminho em `public/`). */
  image?: string;
  /** Descrição da imagem para leitores de tela. */
  imageAlt?: string;
}

export interface Booking {
  id: string;
  code: string;
  serviceId: ServiceId;
  date: string;
  time: string;
  durationMinutes: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
}

export interface Slot {
  time: string;
  available: boolean;
}
