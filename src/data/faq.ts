export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'O que significa "IA com governança"?',
    answer:
      'Significa usar IA como copiloto, com regras claras. Criamos AGENTS.md e AI_CONTEXT.md com limites, guardrails, separação entre IA e regras determinísticas, e gates obrigatórios (testes, build e lint) antes de ir para produção.',
  },
  {
    question: 'Como vocês aplicam isso em sistemas já em produção?',
    answer:
      'Inspirados no Jupati (sistema fiscal em produção com emissões reais), usamos barreiras duplas, fail-closed, observabilidade (timeline/webhooks/polling) e nunca usamos IA para decisões fiscais/críticas. Tudo baseado em evidências.',
  },
  {
    question: 'O que é Context Engineering?',
    answer:
      'É criar o "cérebro" do projeto para os agentes: regras, fluxos, integrações, riscos e histórico. Com isso a IA erra menos, segue padrões e entrega código mais previsível.',
  },
  {
    question: 'Vocês entregam agentes/skills prontos para o meu time?',
    answer:
      'Sim. Transformamos conhecimento da sua equipe em skills/agentes reutilizáveis, com documentação, validação e handover para que vocês consigam manter e evoluir sozinhos.',
  },
  {
    question: 'Quanto tempo leva para começar?',
    answer:
      'Após o diagnóstico (30 a 45 minutos), enviamos o escopo fechado em até 3 dias úteis. Se aprovado, iniciamos na semana seguinte.',
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
