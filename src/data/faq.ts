export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'A reunião é gratuita e com que compromisso assumimos?',
    answer:
      'A primeira conversa é gratuita, sem compromisso, e dura de 30 a 60 minutos. Ela serve para entender o problema e, se houver aderência, saímos com um próximo passo definido: uma proposta de escopo ou um projeto-piloto.',
  },
  {
    question: 'Quanto tempo leva um projeto típico?',
    answer:
      'Sites e landing pages ficam prontos em 2 a 4 semanas. Aplicativos e integrações ficam entre 6 e 12 semanas. Automações e RPA levam de 3 a 8 semanas, dependendo da quantidade de sistemas envolvidos. Sistemas contábeis sob medida são avaliados caso a caso.',
  },
  {
    question: 'Em que linguagens e stacks vocês trabalham?',
    answer:
      'TypeScript com Node e React para web e back-end, Python para automação, dados e IA, C#/.NET quando o ecossistema contábil ou o cliente exige, e SQL com PostgreSQL como base padrão. A stack é escolhida por projeto, não por hábito.',
  },
  {
    question: 'Como vocês usam IA nos projetos?',
    answer:
      'IA entra como ferramenta com escopo definido: extração e classificação de documentos, revisão e apoio a decisão, agentes com ferramentas e accelerators de desenvolvimento. Cada uso tem avaliação com casos reais do seu negócio, guardrails e revisão humana obrigatória antes de qualquer ação externa.',
  },
  {
    question: 'Quem fica com o código e os dados?',
    answer:
      'Você. O código, a infraestrutura, os modelos de dados e as configurações ficam documentados e acessíveis ao seu time. Trabalhamos com repositório do cliente e, quando fizer sentido, com entrega de código-fonte no escopo.',
  },
  {
    question: 'Como funciona o pagamento e a garantia?',
    answer:
      'Projetos são cobrados por etapas: 30% na assinatura, 40% na entrega intermediária e 30% na entrega final. Módulos de manutenção são mensais. Garantimos 90 dias de correção de defeitos em tudo que entregamos.',
  },
];
