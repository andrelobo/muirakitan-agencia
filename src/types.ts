export type ServiceId =
  | 'ia-governada'
  | 'sites'
  | 'apps'
  | 'automacoes'
  | 'ia'
  | 'apis'
  | 'contabil'
  | 'rpa';

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
