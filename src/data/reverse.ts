export type ReverseOfferIcon = 'search' | 'plug' | 'layers';

export interface ReverseOffer {
  id: string;
  icon: ReverseOfferIcon;
  title: string;
  description: string;
  deliverables: string[];
}

export const REVERSE_OFFERS: ReverseOffer[] = [
  {
    id: 'diagnostico-legado',
    icon: 'search',
    title: 'Diagnóstico de legado',
    description:
      'Inventário de superfícies, componentes e dependências, com riscos e um plano de modernização por etapas.',
    deliverables: [
      'Mapa de componentes e dependências',
      'Documentação de APIs e fluxos',
      'Plano de modernização e riscos',
    ],
  },
  {
    id: 'contrato-api',
    icon: 'plug',
    title: 'Contrato de API',
    description:
      'Descobrimos o comportamento real de APIs sem documentação e entregamos um contrato verificável.',
    deliverables: [
      'OpenAPI e fluxos observados',
      'Testes de aceitação',
      'Guia de integração',
    ],
  },
  {
    id: 'reconstrucao',
    icon: 'layers',
    title: 'Reconstrução assistida',
    description:
      'Especificação rastreável e nova implementação independente, com testes de equivalência.',
    deliverables: [
      'Requisitos e critérios de aceite',
      'Nova arquitetura e implementação',
      'Relatório de equivalência',
    ],
  },
];
