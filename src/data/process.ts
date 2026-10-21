export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico',
    description:
      'Conversa de 30 a 45 minutos sobre o processo atual, volume, sistemas envolvidos e o resultado esperado. Sai daqui um mapa de oportunidades, não uma proposta genérica.',
    duration: 'Dias 1 a 3',
  },
  {
    id: 'escopo',
    title: 'Escopo e proposta',
    description:
      'Escopo fechado por etapas, com entregáveis, prazo, stack e investimento. Você sabe exatamente o que será feito, em qual ordem e por quanto.',
    duration: 'Dias 4 a 7',
  },
  {
    id: 'execucao',
    title: 'Execução',
    description:
      'Desenvolvimento com revisão quinzenal, ambiente de homologação e ambiente de teste para o seu time. Você acompanha o andamento em todos os momentos.',
    duration: 'Semanas 1 a N',
  },
  {
    id: 'entrega',
    title: 'Entrega e evolução',
    description:
      'Publicação, documentação, treinamento e suporte. Depois é evolução contínua, com roadmap revisado a cada trimestre.',
    duration: 'Contínuo',
  },
];
