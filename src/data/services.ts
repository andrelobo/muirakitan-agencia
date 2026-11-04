import type { Service, ServiceId } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'sites',
    title: 'Sites e lojas online',
    shortTitle: 'Sites',
    tagline: 'Seu negócio encontrado no Google e pronto para vender.',
    description:
      'Site institucional, landing page ou loja online. Bonito no celular, rápido de abrir e feito para o cliente encontrar você quando procura no Google — com WhatsApp e formulário para ele falar com você na hora.',
    highlights: [
      'Funciona bem no celular',
      'Preparado para aparecer no Google',
      'Você atualiza o conteúdo sem programador',
    ],
    deliverables: [
      'Design responsivo',
      'Domínio e publicação',
      'Formulário e botão de WhatsApp',
      'Analytics para acompanhar visitas',
    ],
    durationMinutes: 45,
    icon: 'globe',
    group: 'negocio',
    ctaLabel: 'Quero um site',
  },
  {
    id: 'apps',
    title: 'Sistemas sob medida',
    shortTitle: 'Sistemas',
    tagline: 'Um sistema que faz exatamente o que o seu negócio precisa.',
    description:
      'Para quando a planilha não dá mais conta: controle de estoque, ordens de serviço, cadastro de clientes, financeiro. Feito no seu processo, com acesso por perfil e histórico de quem alterou o quê.',
    highlights: [
      'Feito para o seu processo, não o contrário',
      'Acesso por perfil de usuário',
      'Histórico de alterações',
    ],
    deliverables: [
      'Sistema web',
      'Painel administrativo',
      'Integração com o que você já usa',
      'Documentação e treinamento',
    ],
    durationMinutes: 60,
    icon: 'monitor',
    group: 'negocio',
    ctaLabel: 'Quero um sistema',
  },
  {
    id: 'automacoes',
    title: 'Automação de tarefas',
    shortTitle: 'Automação',
    tagline: 'Planilha, WhatsApp e e-mail param de tomar o seu dia.',
    description:
      'A gente mapeia a tarefa que consome tempo — cadastro, cobrança, relatório, resposta repetitiva — e faz o computador executar sozinho. Você acompanha o que rodou e recebe aviso quando algo falha.',
    highlights: [
      'Entendemos a tarefa antes de automatizar',
      'Você recebe aviso quando algo falha',
      'Relatório do que foi executado',
    ],
    deliverables: [
      'Fluxo automatizado',
      'Painel simples de acompanhar',
      'Tratamento de erros',
      'Manual de uso',
    ],
    durationMinutes: 60,
    icon: 'workflow',
    group: 'negocio',
    ctaLabel: 'Quero automatizar',
  },
  {
    id: 'ia-governada',
    title: 'IA com governança',
    shortTitle: 'IA Governada',
    tagline: 'Desenvolvimento assistido por IA com regras, limites e validação para ir à produção com segurança.',
    description:
      'Aplicamos Context Engineering ao seu projeto: criamos AGENTS.md, AI_CONTEXT.md, skills/agentes com guardrails, separando o que a IA pode fazer do que deve ficar 100% determinístico. Inspirado na experiência real com sistemas fiscais em produção.',
    highlights: [
      'Context Engineering (AGENTS.md + AI_CONTEXT.md)',
      'Agentes com guardrails e limites claros',
      'Testes, build e lint obrigatórios antes de merge',
      'IA como copiloto, nunca como motor de regras críticas',
      'Trilha de evidências e observabilidade',
    ],
    deliverables: [
      'Contexto curado para agentes',
      'Skills/agentes sob medida',
      'Política de validação (test/build/lint)',
      'Guia de uso e handover',
    ],
    durationMinutes: 60,
    icon: 'brain',
    group: 'sistema',
  },
  {
    id: 'ia',
    title: 'Uso correto de I.A.',
    shortTitle: 'I.A. aplicada',
    tagline: 'IA com método: escopo, dados, avaliação e governança.',
    description:
      'Aplicamos IA onde ela entrega valor mensurável: extração de documentos, classificação, revisão, respostas com base em fonte e copilotos internos. Privacidade, trilha de auditoria, revisão humana e guardrails fazem parte do escopo.',
    highlights: [
      'Avaliação com casos reais',
      'Revisão humana obrigatória',
      'LGPD e rastreabilidade',
    ],
    deliverables: [
      'Diagnóstico de viabilidade',
      'Protótipo funcional',
      'Guardrails e prompts versionados',
      'Métricas de qualidade',
    ],
    durationMinutes: 45,
    icon: 'brain',
    group: 'sistema',
  },
  {
    id: 'apis',
    title: 'APIs e integrações',
    shortTitle: 'APIs',
    tagline: 'Conecte ERP, CRM, meios de pagamento e sistemas internos.',
    description:
      'Desenvolvemos e mantemos APIs REST documentadas, com autenticação, idempotência, versionamento, limites de uso e observabilidade. Integrações com plataformas contábeis, bancos, gateways de pagamento, fiscal e ERPs legados.',
    highlights: [
      'OpenAPI documentado',
      'Autenticação e escopos',
      'Webhooks com retentativa',
    ],
    deliverables: [
      'Endpoints documentados',
      'Client SDK ou exemplos',
      'Painel de logs e métricas',
      'Plano de manutenção',
    ],
    durationMinutes: 60,
    icon: 'plug',
    group: 'sistema',
  },
  {
    id: 'contabil',
    title: 'Sistemas contábeis e ERP',
    shortTitle: 'Contábil e ERP',
    tagline: 'Desenvolvimento sob medida para contabilidade, fiscal e financeiro.',
    description:
      'Apoio a software houses e ERPs: módulos contábeis, fiscal, conciliação bancária, construtor de relatórios e fechamento. Atuamos na camada de dados e regras de negócio, com conformidade fiscal, integrações e automação, sem depender de tela. Cada regra é versionada e auditável.',
    highlights: [
      'Regras de negócio auditáveis',
      'Importação e conciliação',
      'Relatórios gerenciais',
    ],
    deliverables: [
      'Módulo sob medida',
      'Migração de dados',
      'Relatórios e fechamento',
      'Apoio a homologação',
    ],
    durationMinutes: 60,
    icon: 'calculator',
    group: 'sistema',
  },
  {
    id: 'rpa',
    title: 'RPA',
    shortTitle: 'RPA',
    tagline: 'Automatize rotinas em sistemas legados sem trocar tudo de uma vez.',
    description:
      'Robôs que operam os sistemas que já existem: portais bancários, ERPs sem API, sistemas públicos de emissão e planilhas críticas. Cada robô tem supervisionamento, logs, reprocessamento e desligamento guiado quando o sistema legado for substituído.',
    highlights: [
      'Orquestração e supervisionamento',
      'Logs e reprocessamento',
      'Desligamento guiado',
    ],
    deliverables: [
      'Robô em produção',
      'Painel de filas',
      'Alertas e SLA',
      'Documentação de operação',
    ],
    durationMinutes: 45,
    icon: 'bot',
    group: 'sistema',
  },
];

export const PRIMARY_SERVICES = SERVICES.filter(
  (service) => service.group === 'negocio',
);

export const SECONDARY_SERVICES = SERVICES.filter(
  (service) => service.group === 'sistema',
);

export const SERVICE_MAP: Record<ServiceId, Service> = SERVICES.reduce(
  (acc, service) => {
    acc[service.id] = service;
    return acc;
  },
  {} as Record<ServiceId, Service>,
);

export function getService(id: ServiceId): Service {
  return SERVICE_MAP[id];
}
