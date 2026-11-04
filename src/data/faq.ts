export type FaqGroup = 'negocio' | 'sistema';

export interface FaqItem {
  question: string;
  answer: string;
  group?: FaqGroup;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Preciso entender de tecnologia para contratar?',
    answer:
      'Não. A conversa é em português claro: você conta o que trava no negócio e a gente traduz em solução, prazo e valor. A parte técnica é nossa — e você só aprova o que entendeu.',
  },
  {
    question: 'Não sei exatamente o que preciso. Tudo bem?',
    answer:
      'É o caso mais comum. Na primeira conversa, de 30 a 45 minutos e sem custo, a gente entende o processo e ordena as prioridades. Você sai sabendo o que resolver primeiro, mesmo que decida não fechar nada.',
  },
  {
    question: 'Quanto tempo leva para começar?',
    answer:
      'Depois da conversa de diagnóstico, enviamos a proposta com escopo fechado em até 3 dias úteis. Se aprovada, o trabalho começa na semana seguinte.',
  },
  {
    question: 'Quanto tempo leva um projeto típico?',
    answer:
      'Sites e lojas online ficam prontos em 2 a 4 semanas. Sistemas sob medida levam de 6 a 12 semanas. Automações, de 3 a 8 semanas, dependendo de quantos sistemas estão envolvidos. Casos mais complexos são avaliados na conversa, com prazo por escrito antes de começar.',
  },
  {
    question: 'Como funciona o pagamento e a garantia?',
    answer:
      'Projetos são cobrados por etapas: 30% na assinatura, 40% na entrega intermediária e 30% na entrega final. Módulos de manutenção são mensais. Garantimos 90 dias de correção de defeitos em tudo que entregamos.',
  },
  {
    question: 'Quem fica com o código e os dados?',
    answer:
      'Você. O código, a infraestrutura, os modelos de dados e as configurações ficam documentados e acessíveis ao seu time. Trabalhamos com repositório do cliente e, quando fizer sentido, com entrega de código-fonte no escopo.',
  },
  {
    question: 'E depois da entrega, como fica?',
    answer:
      'Toda entrega tem 90 dias de garantia para correção de defeitos. Passado esse período, a manutenção é opcional e mensal — você decide se quer acompanhamento contínuo. Como o código e a documentação ficam com você, não existe dependência obrigatória da agência.',
  },
  {
    question: 'Em que linguagens e stacks vocês trabalham?',
    answer:
      'TypeScript com Node e React para web e back-end, Python para automação, dados e IA, C#/.NET quando o ecossistema contábil ou o cliente exige, e SQL com PostgreSQL como base padrão. A stack é escolhida por projeto, não por hábito.',
    group: 'sistema',
  },
  {
    question: 'Como vocês usam IA nos projetos?',
    answer:
      'IA entra como ferramenta com escopo definido: extração e classificação de documentos, revisão e apoio a decisão, agentes com ferramentas e accelerators de desenvolvimento. Cada uso tem avaliação com casos reais do seu negócio, guardrails e revisão humana obrigatória antes de qualquer ação externa.',
    group: 'sistema',
  },
  {
    question: 'O que significa "IA com governança"?',
    answer:
      'Significa usar IA como copiloto, com regras claras. Criamos AGENTS.md e AI_CONTEXT.md com limites, guardrails, separação entre IA e regras determinísticas, e gates obrigatórios (testes, build e lint) antes de ir para produção.',
    group: 'sistema',
  },
  {
    question: 'O que é Context Engineering?',
    answer:
      'É criar o "cérebro" do projeto para os agentes: regras, fluxos, integrações, riscos e histórico. Com isso a IA erra menos, segue padrões e entrega código mais previsível.',
    group: 'sistema',
  },
  {
    question: 'Como vocês aplicam isso em sistemas já em produção?',
    answer:
      'Inspirados no Jupati (sistema fiscal em produção com emissões reais), usamos barreiras duplas, fail-closed, observabilidade (timeline/webhooks/polling) e nunca usamos IA para decisões fiscais/críticas. Tudo baseado em evidências.',
    group: 'sistema',
  },
  {
    question: 'Vocês entregam agentes/skills prontos para o meu time?',
    answer:
      'Sim. Transformamos conhecimento da sua equipe em skills/agentes reutilizáveis, com documentação, validação e handover para que vocês consigam manter e evoluir sozinhos.',
    group: 'sistema',
  },
];
