# Agent Harness Engineering — Controle do Ciclo de Execução

> **Objetivo**: Definir como o agente de IA deve ser operado, gerenciado e controlado durante a execução de tarefas no repositório muirakitan-agência. Este é o "painel de controle" da operação assistida por IA.

## 1. Arquitetura do Harness

### 1.1 Visão Geral

O **Agent Harness** é o conjunto de mecanismos, arquivos e gates que controlam como a IA opera neste projeto. Ele não é um software separado, mas uma camada de governança que existe em:

| Arquivo/Documento | Função no Harness |
|-------------------|-------------------|
| `AGENTS.md` | Regras operacionais — what/what-not-to-do |
| `CONTEXT.md` | Contexto do projeto — arquitetura, tipos, regras |
| `docs/mef/01-foundations/principles.md` | Princípios orientadores do MEF |
| `docs/mef/01-foundations/engineering-model.md` | Níveis de aplicação (MEF-1/2/3) |
| `docs/mef/templates/ADR.md` | Documentação de decisões |
| Gates de verificação (`typecheck`, `lint`, `build`) | Validação automatizada |

### 1.2 Componentes do Harness

```
┌─────────────────────────────────────────────────────────────┐
│              AGENT HARNESS — Muirakitan                     │
├─────────────────────┬─────────────────────┬────────────┤
│  Contexto           │  Regras Operacionais│  Validação   │
│  (CONTEXT.md)       │  (AGENTS.md)        │  (Gates)     │
├─────────────────────┼─────────────────────┼────────────┤
│  ✅ Ler antes de    │  ✅ Never do:       │  ✅ Gates:   │
│    qualquer tarefa  │    - rm -rf         │    typecheck │
│  ✅ Consultar para   │    - git clean      │    lint      │
│    decisão         │    - reset --hard   │    build     │
│  ✅ Referenciar     │  ✅ Always:         │  ✅ Evidence │
│    mudanças        │    - typecheck first│    artifacts   │
│  ✅ Atualizar se    │    - lint pass       │    (screenshots│
│    nova arquitetura │    - build pass      │    , logs)     │
│  ✅ ADR para mudança│    - human review   │    for critical)│
│    arquitetônica    │    for critical ops │              │
└─────────────────────┴─────────────────────┴────────────┘
```

---

## 2. Gerenciamento de Ferramentas

### 2.1 Ferramentas Disponíveis para o Agente

| Categoria | Ferramenta | Comando/Usage | Restrição |
|-----------|------------|---------------|-----------|
| **Build** | Vite + TypeScript | `npm run build` | Somente leitura/geração; não modificar config |
| **Lint** | oxlint | `npm run lint` | Bloquear commit se erros (não apenas warnings) |
| **Typecheck** | TSC | `npm run typecheck` | Bloquear commit se erros |
| **Testes** | (Conforme implementado) | `npm test` | Se houver testes, todos devem passar |
| **Git** | Git operations | `git add`, `git commit`, `git push` | Nunca `git reset --hard`, `git clean -fd` |
| **Arquivos** | Leitura/escrita | Operar dentro de `src/`, `docs/`, `public/` | Nunca fora destes sem ADR |
| **Deploy** | Preview/local | `npm run preview` | Somente local; nenhum deploy em produção |
| **Documentação** | Markdown files | Criar/atualizar docs/mef/, AGENTS.md, CONTEXT.md | Seguir templates e padrões |

### 2.2 Restrições de Ferramenta por Nível MEF

| Nível | Ferramentas Permitidas | Ferramentas Proibidas ou Restritas |
|-------|------------------------|-------------------------------------|
| **MEF-1** | `typecheck`, `lint`, `build`, `git add/commit/push`, criar arquivos em `src/`/`docs/` | `git reset --hard`, `git clean`, modificar `package.json`, `vite.config.ts`, `tsconfig.json` |
| **MEF-2** | Todos do MEF-1 + CI/CD config, gestão de env vars | `git reset --hard`, `git clean`, deploy em produção sem aprovação formal, adicionar dependências sem documento |
| **MEF-3** | Todos do MEF-2 + isolamento de ambiente, monitoramento completo | `rm -rf` absoluto, operações de escrita sem trilha de auditoria, credenciais em prompts |

---

## 3. Ciclo de Execução do Agente

### 3.1 Fluxo Padrão (MEF-1)

```
┌─────────────────────────┐
│  INÍCIO DA TAREFA       │
├─────────────────────────┤
│  1. LER: AGENTS.md      │ ← 2-3 minutos             │
│  2. LER: CONTEXT.md     │ ← 3-5 minutos             │
│  3. CONSULTAR: docs/mef/│ ← 2 minutos (princípios) │
├─────────────────────────┤
│  4. PLANEJAR: O que vai │ Identificar arquivos     │
│    ser feito             │ a modificar/criar        │
├─────────────────────────┤
│  5. IMPLEMENTAR:         │ Desenvolver código       │
│    seguindo padrões     │ do códigobase            │
├─────────────────────────┤
│  6. EXECUTAR GATES:      │ typecheck → lint → build │
│    (obrigatório)         │                           │
├─────────────────────────┤
│  7. VERIFICAR:           │ Todos gates passaram?    │
│    - Se SIM:commit       │                           │
│    - Se NAO:corrigir   │                           │
├─────────────────────────┤
│  8. DOCUMENTAR:          │ Atualizar CONTEXT.md     │
│    se nova regra/arquqetura│ criar ADR se necessário │
├─────────────────────────┤
│  9. COMMIT:              │ Mensagem clara + refer-  │
│    referenciando SPEC/ADR│ encia consultada          │
└─────────────────────────┘
```

### 3.2 Fluxo para Operações Críticas (MEF-2/MEF-3)

```
┌─────────────────────────────────────────┐
│  OPERAÇÃO CRÍTICA — FLUXO COMPLETO      │
├─────────────────────────────────────────┤
│  1. LER: AGENTS.md + CONTEXT.md         │ ← Obrigatório (10 min)              │
│  2. DEFINIR: Escopo e limites           │ Documentar o que faz/desfaz         │
│  3. IDENTIFICAR: Riscos                 │ Quais podem acontecer?              │
│  4. PLANO DE REVERSÃO                   │ Como desfazer se der errado?        │
│  5. EXECUTAR: Com limites definidos     │ Dentro do escopo definido            │
│  6. GATES AUTOMÁTICOS: typecheck/lint   │ Passar em cada etapa                │
│  7. REVISÃO HUMANA:                     │ Aprovação explícita antes de       │
│    (obrigatória para MEF-3)             │ operações de escrita críticas       │
│  8. REGISTRO:                           │ ADR se aplicável; logs salvos       │
│  9. VALIDAÇÃO POSTERIOR:                │ typecheck → lint → build após       │
│  10. COMPARTILHAR:                      │ Documentar o que foi feito         │
└─────────────────────────────────────────┘
```

### 3.3 Checkpoint e Recuperação

| Checkpoint | Quando Guardar | O Que Salvar |
|------------|----------------|--------------|
| **Antes de código novo** | Início da implementação | Estado atual do Git (`git status`) |
| **Antes de mudança arquitetônica** | Antes de modificar estrutura | `git branch` nova feature, `git stash` se necessário |
| **Antes de operação de escrita** | Antes de modificar arquivos críticos | Backup do arquivo original (copiar conteúdo) |
| **Após gates passarem** | Após `typecheck`/`lint`/`build` | Confirmar que build está saudável antes de continuar |
| **Após conclusão da tarefa** | Fim do trabalho | Commit com mensagem completa; referência a SPEC/ADR |

**Recuperação após falha**:
1. Verificar últimos commits (`git log -5`)
2. Usar `git revert` (nunca `git reset --hard`)
3. Se código quebrou o build, reverter para último estado known-good
4. Registrar ADR sobre o que causou a falha e como evitar no futuro

---

## 4. Gerenciamento de Estado e Tarefas

### 4.1 Estado Atual do Agente

O agente deve ser capaz de responder estas perguntas a qualquer momento:

1. **Qual o estado atual do Git?** (branch, últimas modificações)
2. **Quais files foram modificados desde o início da tarefa?**
3. **Os gates atuais passaram ou falharam?**
4. **Qual o SPEC ou ADR referente a esta tarefa?**
5. **Quais guardrails se aplicam agora?**

### 4.2 Names of Task Tracking (MEF-2+)

Para projetos MEF-2 ou superior, recomenda-se:

- **Issue number** no commit message (ex: `feat: X (Issue #123)`)
- **SPEC reference** (ex: `SPEC-001` no cabeçalho do commit)
- **ADR reference** (ex: `ADR-001: Mudança de auth` no markdown)
- **Checklist de conclusão** no PR description

### 4.3 Mudança de Contexto

Quando precisar mudar de tarefa ou contexto:

1. **Finalizar tarefa atual** (ou salvar checkpoint)
2. **Ler novos documentos** (AGENTS.md + CONTEXT.md para novo contexto)
3. **Atualizar estado mental** (reinicializar contexto da tarefa)
4. **Nunca misturar** directives de tarefas diferentes no mesmo prompt

---

## 5. Aprovação Humana para Operações Sensíveis

### 5.1 Quando é Obrigatória

| Nível | Operações que Requerem Aprovação Humana |
|-------|----------------------------------------|
| **MEF-1** | Mudanças visuais/design; adição de novas dependências; modificação de config build |
| **MEF-2** | Todas as escritas em `src/config.ts`; adição de novas dependências; mudanças em arquitetura |
| **MEF-3** | TODAS as operações de escrita em produção; alterações de segurança; mudanças de persistência de dados; deploy |

### 5.2 Formato de Solicitação de Aprovação

```
## Solicitação de Aprovação Humana

**Operação**: [Descrever o que será feito]
**Arquivos afetados**: [lista completa]
**Motivo**: [por que esta mudança é necessária]
**Riscos**: [quais podem acontecer]
**Plano de reversão**: [como desfazer se der errado]
**SPEC/ADR relacionado**: [IDs se houver]

**Solicitado por**: Agente IA
**Data**: YYYY-MM-DD

**Aprovação necessária de**: [nome do responsável humano]

**Resposta esperada**: 
- ✅ Aprovar (prosseguir)
- ❌ Rejeitar (voltar ao estado anterior)
- ⚠ Aprovar com condições (verificar: [lista])
```

### 5.3 Exemplo Prático (MEF-1)

```
## Solicitação de Aprovação Humana

**Operação**: Adicionar novo ícone na seção Services

**Arquivos afetados**: 
- src/components/ui/ServiceIcon.tsx (adicionar novo ícone ao dicionário ICONS)
- src/components/sections/Services.tsx (se precisar exibir novo ícone)

**Motivo**: Cliente quer adicionar serviço "RPA" com ícone correspondente

**Riscos**: Baixo — apenas adicionar entrada ao dicionário existente

**Plano de reversão**: Remover entrada do dicionário ICONS e remover referência no Services.tsx

**SPEC/ADR relacionado**: Nenhum (MEF-1, mudança simples)

**Solicitado por**: Agente IA
**Data**: 2026-10-31

**Aprovação necessária de**: Responsável pelo projeto

**Resposta esperada**: 
- ✅ Aprovar
- ❌ Rejeitar
```

---

## 6. Independência de Modelo

### 6.1 Princípio

A metodologia MEF deve funcionar independentemente de qual modelo de LLM estiver sendo usado. As instruções, guardrails e especificação devem ser válidas para qualquer provedor (OpenAI, Anthropic, Claude, Gemini, etc.).

### 6.2 O Que NÃO Depende de Modelo

| Elemento | Por Que é Independente |
|----------|------------------------|
| `AGENTS.md` | Instruções escritas em Markdown; válidas para qualquer modelo |
| `CONTEXT.md` | Contexto técnico do projeto; não depende de capacidades específicas |
| `docs/mef/01-foundations/principles.md` | Princípios universais de engenharia de software |
| `docs/mef/templates/ADR.md` | Template estruturado; mesmo para modelos mais simples |
| `npm run typecheck` | Comando de verificação; independente de IA |
| `npm run lint` | Ferramenta fixa (oxlint); mesmo sem IA envolvida |
| `npm run build` | Script de build Vite/TypeScript; funciona sozinho |

### 6.3 O Que PODE Variar por Modelo

| Elemento | Pode Variar |
|----------|-------------|
| **Prompt engineering** | Como as instruções são formuladas para o modelo |
| **Capacidades de geração** | Modelos mais avançados geram mais código de uma vez |
| **Compreensão de contexto** | Modelhas têm contextos de janela diferentes |
| **Criatividade nas soluções** | Variedade de abordagens para o mesmo problema |
| **Erros tipicamente de modelo** | Alucinações, lapsos de memória; cobertos pelos guardrails |

### 6.4 Exemplo de Prompt "Model-Independent"

```
# Sistema (sempre incluído)
Você é um agente de engenharia de software assistido por IA operando dentro do Muirakitan Engineering Framework (MEF-1).
Siga rigorosamente:
1. AGENTS.md — regras operacionais
2. CONTEXT.md — contexto do projeto
3. docs/mef/01-foundations/principles.md — princípios orientadores

# Tarefa (variável)
[Descrever o que fazer]

# Restrições (sempre incluídas)
- Nunca modificar design visual do site
- Nunca mexer em package.json, vite.config.ts, tsconfig.json
- Sempre passar por typecheck → lint → build
- Documentar mudanças em CONTEXT.md ou ADR se aplicável
```

---

## 7. Integração com MCP (Model Control Protocol)

> **Aviso** (do pilar E - Knowledge & Integrations): MCP é um recurso complementar para integração controlada com ferramentas e serviços, **não um mecanismo de segurança por si mesmo**.

O MCP pode ser usado para:

- ✅ Listar ferramentas disponíveis para o agente
- ✅ Controlar escopos de acesso a APIs externas
- ✅ Logar quais ferramentas foram usadas em cada tarefa
- ✅ Garantir que acessos sejam mínimos e documentados

**Não use** MCP como substituto de:
- ❌ AGENTS.md (regras operacionais)
- ❌ CONTEXT.md (contexto do projeto)
- ❌ Gates de typecheck/lint/build
- ❌ Decisões de segurança

---

*Agent Harness Engineering revisado: Sat Oct 31 2026*