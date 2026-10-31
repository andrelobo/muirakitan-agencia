# Specification-Driven Development (SDD) — Processo de Especificação

> **Princípio MEF**: "LLM != motor fiscal. IA interpreta, o motor decide. Evidências primeiro, adivinhação nunca."

O **Specification-Driven Development (SDD)** garante que cada funcionalidade tenha uma especificação definida e verificável **antes** da implementação. O código é a materialização da especificação, não o documento de requisitos.

## 1. Quando Aplicar SDD

| Cenário | Aplicar SDD? | Nível MEF |
|---------|--------------|-----------|
| Corrigir bug simples | Opcional — checklist de gates | MEF-1 |
| Nova funcionalidade menor | Recomendado | MEF-1 |
| Nova funcionalidade significativa | **Obrigatório** | MEF-1 (mínimo) / MEF-2 |
| Mudança arquitetônica | **Obrigatório** + ADR | MEF-2/MEF-3 |
| Feature para cliente/produto | **Obrigatório** com revisão humana | MEF-2 |
| Dados sensíveis ou crítico | **Obrigatório** + aprovação formal | MEF-3 |

**Regra prática**: Se a mudança pode quebrar algo, tem impacto em mais de um arquivo ou afeta fluxo do usuário, aplicar SDD.

---

## 2. Template de Específicação (SPEC)

Cada nova funcionalidade ou mudança significativa deve ter uma especificação com os seguintes campos:

```
SPEC-001: Título da Funcionalidade

1. IDENTIFICAÇÃO
   - ID: SPEC-001
   - Título: [Título da funcionalidade]
   - Status: proposal | accepted | implemented | deprecated
   - Autor: [nome ou equipe]
   - Data: YYYY-MM-DD

2. CONTEXTO
   - Por que esta funcionalidade é necessária?
   - Qual problema resolve?
   - Como se relaciona com fluxos existentes?
   - Referências: ADRs, CONTEXT.md sections, requisitos de cliente

3. OBJETIVO
   - O que esta funcionalidade deve entregar?
   - Critério de sucesso (o que "feito" significa)?

4. ESCOPO
   - O que ESTÁ incluído:
     * [lista de itens incluidos]
   - O que NÃO está incluído:
     * [lista de itens excluídos — importante para evitar escopo creep]

5. CRITÉRIOS DE ACEITAÇÃO (Acceptance Criteria)
   Cada critério deve ser VERIFICÁVEL:

   ✅ CRITÉRIO 1: [mensurável, testável]
     - Como validar: [comando/teste/especificação]
     - Passou em: [data] por [quem]

   ✅ CRITÉRIO 2: [mensurável, testável]
     - Como validar: [comando/teste/especificação]
     - Passou em: [data] por [quem]

   ❌ CRITÉRIO EXCLUÍDO (fora de escopo):
     - Motivo: [por que foi excluído]

6. IMPACTO TÉCNICO
   - Arquivos afetados:
     * src/Arquivo1.tsx — [descrição]
     * src/types.ts — [nova interface/tipo]
     * src/lib/Arquivo.js — [função modificada]
   - Novos tipos necessários:
     * Tipo1 — [descrição]
   - Dependências adicionais:
     * Nenhuma (ou: nome da dependência — motivo)

7. GUARDRAILS E RESTRIÇÕES
   - O que a IA pode fazer neste contexto:
     * [ex.: "Pode gerar componente React, não pode modificar persistência"]
   - O que a IA NÃO pode fazer:
     * [ex.: "Não pode alterar configuração de build", "Não pode mexer em package.json"]
   - Validações obrigatórias antes de merge:
     * `npm run typecheck` — passar
     * `npm run lint` — passar (ou apenas warnings)
     * `npm run build` — sucesso

8. TESTES NECSSÁRIOS
   - Tipo de teste: [unitário | de integração | E2E | nenhum]
   - Cobertura mínima: [X% ou "não aplicável"]
   - Comandos: `npm test` — [descrição]

9. DEPLOY E PUBLICAÇÃO
   - Ambiente: [desenvolvimento | homologação | produção]
   - Comando: `npm run build` → gera dist/
   - Hospedagem: Vercel | Netlify | Cloudflare Pages

10. DOCUMENTAÇÃO COMPLEMENTAR
    - ADR relacionado (se houver): [ID do ADR]
    - CONTEXT.md atualizações necessárias: [quais seções]
    - FAQ atualizações: [perguntas que esta feature gera]
```

---

## 3. Nível de Detalhe do SPEC por Nível MEF

| Nível | Detalhe do SPEC | Exigência |
|-------|-----------------|-----------|
| **MEF-1** | SPEC simplificado | Checklist de perguntas essenciais (campos 1, 2, 5, 6, 7). Pode ser criado mentalmente ou em comentário de commit parafeatures simples. |
| **MEF-2** | SPEC completo | Todos os 10 campos preenchidos. Documentação formal, revisão por pares. |
| **MEF-3** | SPEC com aprovação formal | Todos os campos + aprovação humana assinada + revisão de segurança + trilha de auditoria imutável. |

---

## 4. Processo de Revisão do SPEC

### 4.1 Fluxo

```
RASCUNHO (autor) 
  ↓
REVISÃO (par ou líder técnico) 
  ↓
Aprovação (humano responsável pelo projeto) 
  ↓
IMPLEMENTAÇÃO (agente IA ou desenvolvedor) 
  ↓
VALidação (gates automatizados) 
  ↓
FECHAMENTO (atualização de status, CONTEXT.md, ADR se necessário)
```

### 4.2 Checklist de Revisão

| Item | Quem revisa | O que verificar |
|------|-------------|-----------------|
| Contexto adequado | Par/ líder | O problema está claro? A solução é necessária? |
| Critérios de aceitação | Par/ líder | São verificáveis? São suficientes? |
| Impacto técnico | Líder técnico | Arquivos afetados estão corretos? Tipos são consistentes? |
| Guardrails | Líder técnico | Restrições estão claras? Perigos identificados? |
| Testes | QA/ líder | Cobertura adequada? Comandos corretos? |
| Escopo | Product owner/ cliente | O que está incluído/excluído está claro? |

---

## 5. Exemplos de SPEC

### Exemplo 1: Nova Seção no Site (MEF-1)

```
SPEC-001: Seção "Nossos Serviços" — Grid Responsivo

1. IDENTIFICAÇÃO
   - ID: SPEC-001
   - Título: Seção "Nossos Serviços" — Grid Responsivo
   - Status: accepted
   - Autor: Equipe Muirakitan
   - Data: 2026-10-31

2. CONTEXTO
   - O site atualmente tem grid de serviços em `src/components/sections/Services.tsx`
   - Novos serviços foram adicionados em `src/data/services.ts` (7 serviços totais)
   - Necessidade de exibir todos os serviços em grid responsivo que se adapte a mobile/desktop

3. OBJETIVO
   - Exibir grid responsivo com 1 coluna (mobile) a 3 colunas (desktop)
   - Cada card do serviço deve ter ícone, título, tagline, highlights e entregáveis

4. ESCOPO
   - INCLUIDO:
     * Grid responsivo em src/components/sections/Services.tsx
     * Card para cada serviço com todos os dados de services.ts
     * Comportamento consistente com seções existentes (Hero, Methodology, Process)
   - EXCLUIDO:
     * Mudança de design visual (cores, fontes — permanecer tema existente)
     * Criação de novas páginas ou rotas

5. CRITÉRIOS DE ACEITAÇÃO
   ✅ CRITÉRIO 1: Grid renderiza 1 coluna em < 640px e 3 colunas em >= 640px
     - Como validar: Abrir site em mobile (DevTools) e desktop; contar colunas
     - Passou em: 2026-10-31 por agente IA
   
   ✅ CRITÉRIO 2: Cada card exibe título, tagline e ícone corretamente
     - Como validar: Visualmente inspecionar cada card do serviço
     - Passou em: 2026-10-31 por agente IA

   ❌ CRITÉRIO EXCLUÍDO:
     - Mudança de tema de cores: fora de escopo (regra MEF-1)

6. IMPACTO TÉCNICO
   - Arquivos afetados:
     * src/components/sections/Services.tsx — restructuração grid
   - Novos tipos: Nenhum (dados vêm de services.ts existente)
   - Dependências: Nenhuma

7. GUARDRAILS E RESTRIÇÕES
   - O que a IA pode fazer:
     * Gerar/estruturar o componente Services.tsx com grid responsivo
     * Mapear dados de services.ts para o JSX
     * Aplicar classes Tailwind consistentes com tema existente
   - O que a IA NÃO pode fazer:
     * Mudar cores ou fontes do site
     * Adicionar novas dependências
     * Modificar configuração de build

8. TESTES NECSSÁRIOS
   - Tipo: visual/manual
   - Cobertura: N/A (validação por inspeção)
   - Comandos: `npm run build` — garantir que não quebra nada

9. DEPLOY E PUBLICAÇÃO
   - Comando: `npm run build` → deploy em Vercel/Netlify
   - Observação: theme deve permanecer idêntico

10. DOCUMENTAÇÃO COMPLEMENTAR
    - ADR relacionado: Nenhum (mudança dentro de MEF-1, sem alteração arquitetônica)
    - CONTEXT.md: Atualizar se houver nova regra de negócio
    - FAQ: Considerar adicionar pergunta sobre "como agendar" se relevante
```

---

### Exemplo 2: Correção de Bug (MEF-1 Simplificado)

```
SPEC-005: Corrigir validação de e-mail no formulário de agenda

1. IDENTIFICAÇÃO
   - ID: SPEC-005
   - Título: Corrigir validação de e-mail
   - Status: implemented
   - Data: 2026-10-31

2. CONTEXTO
   - O formulário de agenda em src/components/sections/Agenda.tsx valida e-mail
   - Validação atual em src/lib/format.ts usa regex: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
   - Usuários relatam e-mails válidos sendo rejeitados

3. OBJETIVO
   - Corrigir regex para aceitar e-mails válidos mais amplos
   - Manter proteção contra e-mails inválidos

4. ESCOPO
   - INCLUIDO: Ajuste da regex em src/lib/format.ts
   - EXCLUIDO: Mudança de layout do formulário, mudança de campo e-mail para outro nome

5. CRITÉRIOS DE ACEITAÇÃO
   ✅ CRITÉRIO 1: E-mail "user@domain.com" é aceito
     - Como validar: `npm run typecheck` + teste manual no formulário
   
   ✅ CRITÉRIO 2: E-mail "inválido" é rejeitado
     - Como validar: Preencher formulário com e-mail inválido, submeter, verificar mensagem de erro

6. IMPACTO TÉCNICO
   - Arquivos afetados: src/lib/format.ts — ajustar regex
   - Novos tipos: Nenhum

7. GUARDRAILS
   - O que a IA pode fazer: ajustar regex de validação de formato
   - O que a IA NÃO pode fazer: alterar estrutura do formulário, mover campo e-mail

8. TESTES
   - Tipo: unitário
   - Comandos: `npm run typecheck` + inspeção manual no formulário

9. DEPLOY
   - Padrão: `npm run build` após correção

5. DOCUMENTAÇÃO
   - CONTEXT.md: Atualizar se regex mudar comportamento esperado
```

---

## 6. Integração com o Fluxo de Trabalho

### 6.1 Quando Criar SPEC

| Situação | Criar SPEC Completo? | Criar SPEC Simplificado? | Não Criar? |
|----------|----------------------|--------------------------|------------|
| Bug corretivo simples | Não (usar checklist) | ✓ Sim | — |
| Nova feature pequena | ✓ Sim (15 min para preencher) | — | — |
| Nova feature média/grande | ✓ Sim (obrigatório) | — | — |
| Mudança arquitetônica | ✓ Sim + ADR | — | — |
| Correção de typo/docs | Não | — | ✓ |
| Refatoração sem mudança de comportamento | Opcional (se > 2 arquivos) | ✓ Sim (checklist) | — |

### 6.2 Atualização de CONTEXT.md após SPEC

Após implementação aprovada:

1. **Se nova regra de negócio**: adicionar seção em `CONTEXT.md` ou atualizar existente
2. **Se novo tipo/interface**: adicionar ou atualizar em `src/types.ts`
3. **Se nova funcionalidade pública**: considerar adicionar a `src/data/` se for dado estático
4. **Se dúvida frequente de cliente**: considerar adicionar a `src/data/faq.ts`

### 6.3 Atualização de AGENTS.md após SPEC

Se o SPEC introduzir novas restrições ou guardrails:

1. **Novas permissões** para o agente: adicionar seção em `AGENTS.md` ("O agente PODE...")
2. **Novas proibições**: adicionar seção em `AGENTS.md` ("O agente NÃO PODE...")
3. **Novos gates**: adicionar à seção 4 de `AGENTS.md` (gates obrigatórios)

---

## 7. Rastreabilidade

**Objetivo**: Garantir que todo código possa ser rastreado de volta a um requisito ou especificação.

| Elemento | Rastreia Para |
|----------|---------------|
| `SPEC-xxx` | `CONTEXT.md` (se nova regra) + `AGENTS.md` (se novo guardrail) + `docs/mef/ADRs/` (se decisão arquitetônica) |
| Tipo TypeScript (`src/types.ts`) | SPEC que o solicitou (referência em comentário) |
| Componente React (`src/components/`) | SPEC ou issue número |
| Commit message | Deve referenciar SPEC-xxx ou issue número |
| Pull Request | Deve ter link/referência a SPEC-xxx se aplicável |

**Exemplo de commit message**:
```
feat: add responsive services grid (SPEC-001)
- Grid de 1 a 3 colunas baseado em viewport
- Dados puxados de src/data/services.ts
- Build passou: npm run build ✓
- Lint passou: npm run lint ✓
- Typecheck passou: npm run typecheck ✓
```

---

*Specification Process revisado: Sat Oct 31 2026*