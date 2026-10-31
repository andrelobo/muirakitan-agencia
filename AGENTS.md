# AGENTS.md — Muirakitan Agência

> **Contexto**: Este documento define os limites operacionais para agentes de IA que trabalharem neste repositório. Ele deve ser lido em conjunto com `CONTEXT.md`, `docs/mef/principles.md` e `docs/mef/engineering-model.md`.

---

## 1. Visão Geral

O agente de IA deve atuar como **copiloto de engenharia de software**, nunca como motor de decisões críticas. Todas as alterações devem ser:

- **Rastreáveis**: Cada mudança deve ser explicável em relação aos requisitos em `CONTEXT.md` ou ADRs em `docs/mef/templates/ADR.md`.
- **Verificáveis**: Typecheck (`npm run typecheck`), lint (`npm run lint`) e build (`npm run build`) devem passar sem erros.
- **Reversíveis**: Qualquer operação que modifique arquivos críticos deve ser passível de rollback.

---

## 2. O Que a IA PODE Fazer

### 2.1 Gerar código e refatoração
- Criar novos componentes React, hooks, libs utilitárias.
- Refatorar código existente seguindo os padrões do projeto (TypeScript, Tailwind CSS 4, Vite + React).
- Adicionar tipos TypeScript para novas props ou interfaces.
- Gerar testes unitários básicos quando solicitado.

### 2.2 Documentação e descoberta
- Criar ou atualizar `CONTEXT.md` quando nova arquitetura ou regra de negócio for introduzida.
- Gerar ou atualizar ADRs (Architecture Decision Records) para decisões técnicas relevantes.
- Pesquisar e explicar padrões já estabelecidos no códigobase.

### 2.3 Correções de bugs
- Identificar e corrigir bugs quando há evidências claras (logs, mensagens de erro, comportamento observado).
- Corrigir problemas de tipo TypeScript detectados pelo `npm run typecheck`.
- Corrigir avisos do `oxlint` (`npm run lint`).

---

## 3. O Que a IA NÃO PODE Fazer

### 3.1 Operações de escrita destrutiva
- **Nunca** executar `rm -rf`, `git clean`, `git reset --hard` ou comandos equivalente de remoção em massa.
- **Nunca** deletar arquivos ou diretórios sem aprovação humana explícita e registrada.

### 3.2 Modificação de configurações críticas
- **Nunca** modificar `package.json`, `vite.config.ts`, `tsconfig.json` ou `.oxlintrc.json` sem discussão explícita e registro de ADR.
- **Nunca** adicionar ou remover dependências sem justificativa e validação de `npm run typecheck`/`npm run build`.

### 3.3 Mudanças no design/behavior do site
- **NÃO modificar** componentes UI, layouts, cores, tipografia ou comportamento visual (regra 5 das operacionais obrigatórias).
- O site institucional deve continuar funcionando como atualmente.

### 3.4 Operações externas
- **NÃO** realizar deploy (`npm run preview` ou deploy em Vercel/Netlify).
- **NÃO** instalar novas dependências sem justificativa escrita.
- **NÃO** executar operações em produção ou ambientes externos.

### 3.5 Decisões críticas
- **NÃO** tomar decisões sobre arquitetura de sistema, stacks de tecnologia ou direção de produto sem referenciar `CONTEXT.md` e_documentar como ADR.

---

## 4. Gates Obrigatórios (Verificação Obrigatória)

Antes de finalizar qualquer tarefa, o agente deve executar (ou simular) os seguintes checks:

| Gate | Comando | Status Esperado |
|------|---------|-----------------|
| **Typecheck** | `npm run typecheck` | Sem erros |
| **Lint** | `npm run lint` | Apenas warnings (sem erros) |
| **Build** | `npm run build` | Sucesso (pasta `dist/` gerada) |
| **Testes** | (Se houver testes) `npm test` | Todos os testes passando |

Se qualquer gate falhar, o agente deve corrigir antes de continuar.

---

## 5. Contexto e Referências

- **`CONTEXT.md`**: Contexto completo do projeto, arquitetura e regras de negócio.
- **`docs/ESTADO-ATUAL.md`**: Snapshot da sessão atual (o que foi feito, pendências, como retomar). Ler primeiro ao retomar o trabalho.
- **`docs/mef/principles.md`**: Princípios gerais do Muirakitan Engineering Framework.
- **`docs/mef/engineering-model.md`**: Modelo de engenharia (SDD, níveis MEF).
- **`docs/mef/templates/ADR.md`**: Template para registros de decisões arquitetônicas.
- **`src/types.ts`**: Tipos compartilhados do projeto.
- **`src/config.ts`**: Configurações de marca, contato e agenda.

---

## 6. Fluxo de Trabalho Recomendado

1. **Ler `docs/ESTADO-ATUAL.md`**, `CONTEXT.md` e `AGENTS.md` antes de iniciar qualquer tarefa.
2. **Identificar** o que precisa ser feito (feature, bug, docs).
3. **Criar/atualizar ADR** se a mudança for arquitetural (usar template `docs/mef/templates/ADR.md`).
4. **Implementar** a mudança seguindo padrões do códigobase.
5. **Executar gates**: `npm run typecheck`, `npm run lint`, `npm run build`.
6. **Commit** com mensagem clara referenciando o ADR ou issue número.
7. **Nunca** commitar sem antes ter passado por todos os gates.

---

## 7. Restrições de Segurança

| Restrição | Detalhe |
|-----------|---------|
| **Filesystem** | Operar somente dentro de `src/`, `docs/`, `public/`. Nunca fora destes diretórios sem aprovação explícita. |
| **Credenciais** | Nunca armazenar ou transmitir credenciais (WhatsApp numbers, emails, secrets) em prompts ou arquivos de código não relacionados. |
| **Deploy** | Nunca executar comandos de deploy ou publicar em ambientes de produção. |
| **Git** | Never use `git reset --hard`, `git clean -fd` ou operações que percam histórico. |

---

*Este documento faz parte do Muirakitan Engineering Framework (MEF) — Nível MEF-1 Essencial.*
*Atualizado: Sat Oct 31 2026*