# Context Engineering — Gestão de Contexto

> **Contexto persistente do projeto**: Como criar e manter o "cérebro" do projeto para que agentes de IA operem com precisão, rastreabilidade e segurança.

## 1. Por que o Context Engineering?

> **Princípio MEF-1**: "LLM != motor fiscal. IA interpreta, o motor decide. Evidências primeiro, adivinhação nunca."

Agentes de IA funcionam melhor quando têm:
- **Contexto estruturado** (regras, fluxos, integrações, riscos)
- **Limites claros** (o que a IA pode/ não pode fazer)
- **Histórico de decisões** (ADRs, escolhas arquitetônicas passadas)
- **Referências técnicas** (tipos, APIs, padrões do códigobase)

Sem contexto, a IA "alucina" regras, cria implementações inconsistentes e descarta boas práticas.

---

## 2. Documentos de Contexto Obrigatórios

### 1.2 `AGENTS.md`

**Propósito**: Instruções operacionais para agentes de IA que trabalharão no projeto.

**Conteúdo mínimo obrigatório**:
- Visão geral do que a IA pode fazer (seção 2 de AGENTS.md)
- O que a IA NÃO pode fazer (seção 3 de AGENTS.md)
- Gates obrigatórios antes de finalizar tarefas (seção 4 de AGENTS.md)
- Referências cruzadas (CONTEXT.md, docs/mef/, tipos do projeto)

**Atualização**: Sempre que nova regra operacional for descoberta ou ajustada, atualizar este documento antes de iniciar nova tarefa com agente.

---

### 2.2 `CONTEXT.md`

**Propósito**: Contexto completo do projeto, arquitetura e regras de negócio. Este é o "single source of truth" técnico.

**Conteúdo mínimo obrigatório** (baseado no CONTEXT.md criado):

| Seção | Conteúdo Mínimo |
|-------|-----------------|
| **Visão Geral** | Nome, propósito, stack, deploy |
| **Arquitetura** | Estrutura de pastas, padrões de componente |
| **Dados Principais** | Serviços, processos, tipos, configurações |
| **Regras de Negócio** | Validações, limites, restrições operacionais |
| **Decisões Técnicas** | Decisões conhecidas (stack, estilo, persistência) |
| **Limites para IA** | O que agente pode/ não pode fazer |
| **Referências Cruzadas** | Links para AGENTS.md, ADRs, templates |

**Atualização**: Sempre que nova arquitetura, regra de negócio ou decisão técnica for introduzida, registrar como ADR e atualizar este documento.

---

### 3.3 `ADRs` (Architecture Decision Records)

**Propósito**: Registrar decisões técnicas relevantes com contexto e consequências.

**Local**: `docs/mef/templates/ADR.md` (template) + `docs/mef/01-foundation/engineering-model.md` (visão geral)

**Quando criar ADR**:
- Mudança de stack ou linguagem
- Adoção de nova ferramenta ou biblioteca
- Decisão sobre arquitetura de sistema
- Mudança de política de segurança ou permissoes
- Qualquer decisão que tenha consequências de longo prazo

**Template simplificado** (ver `docs/mef/templates/ADR.md`):
- Status (proposed, accepted, deprecated, superseded)
- Contexto (por que esta decisão é necessária)
- Decisão (o que foi decidido)
- Conseqüências (positivas e negativas)
- Data e autor

---

## 3. Gestão de Contexto no Fluxo de Trabalho

### 3.1 Fluxo Recomendado

```
INÍCIO DA TAREFA
  ↓
LER: AGENTS.md (regras operacionais)
  ↓
LER: CONTEXT.md (contexto do projeto)
  ↓
VER: Docs/mef/principles.md (princípios orientadores)
  ↓
VER: Docs/mef/engineering-model.md (modelo de engenharia)
  ↓
IDENTIFICAR: Que contexto é relevante para esta tarefa?
  ↓
IMPLEMENTAR: Seguindo regras e padrões existentes
  ↓
EXECUTAR GATES: typecheck → lint → build
  ↓
ATUALIZAR: CONTEXT.md se nova arquitetura/regra for introduzida
  ↓
CRIAR/ATUALIZAR: ADR se decisão arquitetônica for necessária
  ↓
COMMIT: Com mensagem referenciando contexto consultado
  ↓
FIM
```

### 3.2 Atualização de CONTEXT.md

**Nunca** modificar CONTEXT.md de forma ad hoc. Todo ajuste deve seguir:

1. **Identificar** o que mudou (nova feature, mudança de regra, etc.)
2. **Criar ADR** se for decisão arquitetônica
3. **Atualizar CONTEXT.md** com o novo dado/regra
4. **Registrar** no CHANGELOG ou commit message

**Exemplo de atualização**:

```diff
@@ -10,6 +10,7 @@
 export const BRAND = {
   name: 'Muirakitan Agência',
   legalName: 'Muirakitan Tecnologia',
   eyebrow: 'Agência de tecnologia com IA governada',
+  # NOVO: tagline atualizada para refletir MEF-1
   tagline:
     'Desenvolvimento assistido por IA com governança. Aplicativos, sites,
     automações e agentes com regras, validações e segurança para sistemas em produção.',
 }
```

---

## 4. Integração com RAG (Pilastro E)

> **Aviso Importante** (do pilar E - Knowledge & Integrations): RAG é um recurso complementar, **não um mecanismo de segurança por si mesmo**.

### 4.1 Como Usar RAG com Segurança

| O Que Recuperar | Fontes Confiáveis | Fontes Recuperadas (RAG) |
|-----------------|-------------------|--------------------------|
| Padrões de código | `src/types.ts`, `src/lib/` | ⚠ Verificar antes de usar |
| ADRs antigos | `docs/mef/templates/ADR.md` | ✅ Confiável |
| Documentação de API | `src/data/services.ts` | ✅ Confiável |
| Exemplos de implementação | Código existente | ⚠ Verificar consistência |
| Decisões antigas | Histórico de Git | ⚠ Revisar com ADR atual |

### 4.2 Ordem de Prioridade

1. **Instruções confiáveis** (AGENTS.md, CONTEXT.md) — sempre têm precedência
2. **Conhecimento recuperado** (RAG) — usado como sugestão, não como determinação
3. **Decisões do modelo LLM** — última instância, sempre verificar contra (1)

### 4.3 Exemplo de Prompt Seguro

```
# Instruções Confiáveis (sempre primeira fonte)
- Leia AGENTS.md antes de qualquer coisa
- Leia CONTEXT.md para regras de negócio
- Siga principíos em docs/mef/01-foundations/principles.md

# Sugestões (opcional, verificar depois)
- RAG recuperou: [conteúdo de documentos]
- Verificar se contradiz instruções acima

# Tarefa
- Implementar_feature_X seguindo padrões do projeto
- Executar gates: typecheck → lint → build
```

---

*Context Engineering revisado: Sat Oct 31 2026*