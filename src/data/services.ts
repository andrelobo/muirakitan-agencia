import type { Service, ServiceId } from '../types';

export const SERVICES: Service[] = [
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
  },
  {
    id: 'sites',
    title: 'Sites e landing pages',
    shortTitle: 'Sites',
    tagline: 'Presença digital rápida, responsiva e pronta para vender.',
    description:
      'Institucionais, vitrine e landing pages construídos com Vite, React e TypeScript, performance alta, SEO técnico e publicação em CDN. Focamos em conversão: cada seção tem um objetivo, cada chamada tem uma ação.',
    highlights: ['Carregamento em menos de 1s', 'SEO técnico e dados estruturados', 'Editável sem depender de código'],
    deliverables: ['Design responsivo', 'Blog ou área de conteúdo', 'Painel de analytics', 'Formulários e e-mail transacional'],
    durationMinutes: 45,
    icon: 'globe',
  },
  {
    id: 'apps',
    title: 'Aplicativos web',
    shortTitle: 'Aplicativos',
    tagline: 'Sistemas internos, painéis e produtos digitais sob medida.',
    description:
      'Do monolito ao SaaS: modelamos o domínio, definimos as regras de negócio e entregamos aplicações web com autenticação, permissões, auditoria e deploy automatizado. Arquitetura modular para o produto crescer sem reescrita.',
    highlights: ['Arquitetura modular testável', 'Papéis e permissões', 'Deploy automatizado em CI/CD'],
    deliverables: ['SPA ou PWA', 'Painel administrativo', 'Integrações com seu sistema', 'Documentação técnica'],
    durationMinutes: 60,
    icon: 'monitor',
  },
  {
    id: 'automacoes',
    title: 'Automações de processos',
    shortTitle: 'Automações',
    tagline: 'Rotinas manuais, planilhas e e-mails viram fluxo automático.',
    description:
      'Mapeamos o processo como ele é hoje, identificamos gargalos e automatizamos o que tem regra definida: conciliação, cadastro em lote, cobranças, relatórios e rotinas de backoffice. Cada automação nasce com log, reprocessamento e alerta de falha.',
    highlights: ['Processo mapeado antes do robô', 'Idempotência e rastreio', 'Alerta quando algo falha'],
    deliverables: ['Fluxo automatizado', 'Painel de monitoramento', 'Tratamento de exceções', 'Manual de operação'],
    durationMinutes: 60,
    icon: 'workflow',
  },
  {
    id: 'ia',
    title: 'Uso correto de I.A.',
    shortTitle: 'I.A. aplicada',
    tagline: 'IA com método: escopo, dados, avaliação e governança.',
    description:
      'Aplicamos IA onde ela entrega valor mensurável: extração de documentos, classificação, revisão, respostas com base em fonte e copilotos internos. Privacidade, trilha de auditoria, revisão humana e guardrails fazem parte do escopo.',
    highlights: ['Avaliação com casos reais', 'Revisão humana obrigatória', 'LGPD e rastreabilidade'],
    deliverables: ['Diagnóstico de viabilidade', 'Protótipo funcional', 'Guardrails e prompts versionados', 'Métricas de qualidade'],
    durationMinutes: 45,
    icon: 'brain',
  },
  {
    id: 'apis',
    title: 'APIs e integrações',
    shortTitle: 'APIs',
    tagline: 'Conecte ERP, CRM, meios de pagamento e sistemas internos.',
    description:
      'Desenvolvemos e mantemos APIs REST documentadas, com autenticação, idempotência, versionamento, limites de uso e observabilidade. Integrações com plataformas contábeis, bancos, gateways de pagamento, fiscal e ERPs legados.',
    highlights: ['OpenAPI documentado', 'Autenticação e escopos', 'Webhooks com retentativa'],
    deliverables: ['Endpoints documentados', 'Client SDK ou exemplos', 'Painel de logs e métricas', 'Plano de manutenção'],
    durationMinutes: 60,
    icon: 'plug',
  },
  {
    id: 'contabil',
    title: 'Sistemas contábeis e ERP',
    shortTitle: 'Contábil e ERP',
    tagline: 'Desenvolvimento sob medida para contabilidade, fiscal e financeiro.',
    description:
      'Apoio a software houses e ERPs: módulos contábeis, fiscal, conciliação bancária, construtor de relatórios e fechamento. Atuamos na camada de dados e regras de negócio, com conformidade fiscal, integrações e automação, sem depender de tela. Cada regra é versionada e auditável.',
    highlights: ['Regras de negócio auditáveis', 'Importação e conciliação', 'Relatórios gerenciais'],
    deliverables: ['Módulo sob medida', 'Migração de dados', 'Relatórios e fechamento', 'Apoio a homologação'],
    durationMinutes: 60,
    icon: 'calculator',
  },
  {
    id: 'rpa',
    title: 'RPA',
    shortTitle: 'RPA',
    tagline: 'Automatize rotinas em sistemas legados sem trocar tudo de uma vez.',
    description:
      'Robôs que operam os sistemas que já existem: portais bancários, ERPs sem API, sistemas públicos de emissão e planilhas críticas. Cada robô tem supervisionamento, logs, reprocessamento e desligamento guiado quando o sistema legado for substituído.',
    highlights: ['Orquestração e supervisionamento', 'Logs e reprocessamento', 'Desligamento guiado'],
    deliverables: ['Robô em produção', 'Painel de filas', 'Alertas e SLA', 'Documentação de operação'],
    durationMinutes: 45,
    icon: 'bot',
  },
];

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
