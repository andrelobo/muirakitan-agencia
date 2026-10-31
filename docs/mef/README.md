# Muirakitan Engineering Framework (MEF)

> **Foco atual: MEF-1 Essencial** — Aplicação a sites e aplicações simples com governança básica.

## Sobre este Framework

O **Muirakitan Engineering Framework (MEF)** é uma metodologia de engenharia de software assistida por IA com governança, segurança, rastreabilidade e validação contínua. Este repositório (`muirakitan-agencia`) é o **primeiro caso prático** da metodologia.

## Níveis de Adoção

| Nível | Descrição | Aplicabilidade Atual |
|-------|-----------|----------------------|
| **MEF-1 Essencial** | Sites e aplicações simples. Git, contexto, especificação, lint e build. Revisão de alterações e validação funcional. | **✓ Muirakitan Agência** — site institucional |
| **MEF-2 Empresarial** | APIs, SaaS e sistemas de negócio. SDD, testes automatizados, guardrails, CI/CD e auditoria. Gestão de segredos, permissões e ambientes. | ⚠ Futuro — expansão para sistemas SaaS/APIs |
| **MEF-3 Crítico** | Sistemas com dados sensíveis, integrações críticas. Isolamento reforçado, trilhas de auditoria, monitoramento, aprovação humana formal. | ❌ Não se aplica agora |

## Estrutura de Documentos

```
docs/mef/
├── README.md              # Este arquivo
├── 01-foundations/        # Fundamentos da metodologia
│   ├── principles.md      # Princípios orientadores
│   └── engineering-model.md # Modelo de engenharia
├── 02-context-engineering/ # Context Engineering
│   ├── context-management.md # Gestão de contexto
│   └── agent-instructions.md   # Instruções para agentes
├── 03-sdd/                # Specification-Driven Development
│   ├── specification-process.md # Processo de especificação
│   └── acceptance-criteria.md   # Critérios de aceitação
├── 04-agent-harness/      # Agent Harness Engineering
│   ├── architecture.md     # Arquitetura do harness
│   ├── execution-lifecycle.md # Ciclo de execução
│   └── tool-management.md  # Gerenciamento de ferramentas
├── 05-guardrails-security/ # Guardrails & Security
│   ├── security-policy.md  # Política de segurança
│   ├── permissions.md      # Permissões e privilégios
│   └── destructive-operations.md # Operações destrutivas
├── 06-knowledge-integrations/ # Knowledge & Integrations
│   ├── rag-strategy.md     # Estratégia RAG
│   └── mcp-governance.md   # Governança MCP
├── 07-verification/       # Verification & Quality Engineering
│   ├── quality-gates.md    # Gates de qualidade
│   └── testing-strategy.md # Estratégia de testes
├── 08-delivery/           # Delivery & Maintenance
│   ├── deployment.md       # Deploy e release
│   └── maintenance.md      # Manutenção pós-entrega
└── 09-incident-management/ # Incident Management
    └── incident-response.md # Resposta a incidentes

## Templates

```
docs/mef/templates/
├── ADR.md           # Architecture Decision Record
├── SPEC.md          # Specification template
├── CONTEXT.md       # Context template
└── INCIDENT.md      # Incident report template
```

## Objetivo desta Implementação

Demonstrar que a Muirakitan Tecnologia adota processos de engenharia nos quais agentes de IA operam dentro de limites técnicos, arquiteturais e de segurança bem definidos — e não simplesmente utilizam IA para gerar código sem controle.

## Status Atual

- **Nível**: MEF-1 Essencial
- **Projeto-base**: muirakitan-agencia (site institucional React + TypeScript + Vite)
- **Documentos criados**: AGENTS.md, CONTEXT.md, estrutura docs/mef/
- **Próximos passos**: Preencher templates, implementar gates de validação, documentar processos MEF-2/MEF-3