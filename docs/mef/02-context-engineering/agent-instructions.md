# Instruções para Agentes — Operação Prática

> **Objetivo**: Este documento serve como guia de bolso para agentes de IA trabalhando no repositório muirakitan-agência. Deve ser consultado em conjunto com `AGENTS.md`, `CONTEXT.md` e `docs/mef/01-foundations/principles.md`.

## 1. Antes de Começar Any Task

### 1.1 Leitura Obrigatória

| Documento | O Que Encontrar | Tempo Estimado |
|-----------|-----------------|----------------|
| `AGENTS.md` | Regras operacionais, what/what-not-to-do, gates | 2-3 minutos |
| `CONTEXT.md` | Arquitetura, tipos, configurações, regras de negócio | 3-5 minutos |
| `docs/mef/01-foundations/principles.md` | Princípios orientadores do MEF | 2 minutos |

**Ordem**: Sempre AGENTS.md primeiro (regras de segurança), depois CONTEXT.md (contexto do projeto).

### 1.2 Verificar Gates Atuais

Antes de iniciar implementação, confirmar:

| Gate | Comando | Passou? |
|------|---------|---------|
| Typecheck | `npm run typecheck` | ☐ |
| Lint | `npm run lint` | ☐ |
| Build | `npm run build` | ☐ |

**Se algum falhar**: Corrigir antes de continuar. Não pular esta etapa.

---

## 2. O Que o Agente PODE Fazer (Checklist Rápido)

### 2.1 Desenvolvimento React + TypeScript

- [ ] Criar novo componente React seguindo padrão do código existente
- [ ] Adicionar tipos TypeScript para novas props/interfaces
- [ ] Refatorar código existente (renomear variáveis, extrair funções, reorganizar imports)
- [ ] Gerar código boilerplate quando padrão estiver claro
- [ ] Corrigir erros de tipo detectados pelo `tsc`

### 2.2 Documentação

- [ ] Criar ou atualizar `CONTEXT.md` quando nova arquitetura/regra for introduzida
- [ ] Gerar ou atualizar ADR para decisões técnicas relevantes (usar template `docs/mef/templates/ADR.md`)
- [ ] Atualizar `AGENTS.md` se nova regra operacional for descoberta
- [ ] Responder perguntas frequentes (baseado em `src/data/faq.ts` e conhecimento do projeto)

### 2.3 Correções e Bugs

- [ ] Identificar bug a partir de evidências (logs, comportamento observado, erro de typecheck)
- [ ] Corrigir problema de TypeScript (`npm run typecheck`)
- [ ] Corrigir aviso do oxlint (`npm run lint`)
- [ ] Verificar se o build ainda passa após a correção (`npm run build`)

### 2.4 Pesquisa e Descoberta

- [ ] Pesquisar como determinada funcionalidade já está implementada no código
- [ ] Explicar propósito de componente, hook ou lib específica
- [ ] Mapear quais arquivos são afetados por uma mudança em X área
- [ ] Encontrar tipos ou interfaces relacionados a um domínio

---

## 3. O Que o Agente NÃO PODE Fazer (Proibições Rígidas)

### 3.1 Operações Proibidas (Nunca)

| Proibição | Detalhe |
|-----------|---------|
| `rm -rf` / `git clean` / `git reset --hard` | Nunca, em nenhuma circunstância |
| Modificar `package.json` | Sem discussão explícita e ADR |
| Adicionar dependências novas | Sem justificativa escrita + validação de `typecheck`/`build` |
| Modificar `vite.config.ts` / `tsconfig.json` / `.oxlintrc.json` | Sem ADR |
| Modificar design/visual do site | Regra 5 das operacionais obrigatórias — tema, cores, layout devem permanecer |
| Deploy em produção | `npm run preview` ok para teste local; deploy só com aprovação formal |
| Operações em `localStorage` beyond agenda | Apenas o que `useBookings.ts` já faz (salvar/ler agenda) |
| Modificar `src/config.ts` | Somente para dados de contato/marca com aprovação; não mexer em AGENDA configs sem ADR |

### 3.2 Padrões de Comportamento

- **Nunca** assumir que "funcionou no prompt" = "funciona no código"
- **Nunca** commitar sem antes executar `npm run typecheck && npm run lint && npm run build`
- **Nunca** modificar comportamento visual sem aprovação humana explícita
- **Nunca** usar IA para tomar decisões sobre arquitetura de sistema sem referenciar CONTEXT.md e documentar como ADR

### 3.3 Fluxo de Erro

Se algo der errado durante a implementação:

1. **Pare imediatamente** — não tente "contornar" o problema
2. **Identifique o erro** — logs, mensagens de tipo, comportamento inesperado
3. **Revertir se necessário** — use `git revert` ou volte ao estado anterior
4. **Consulte AGENTS.md e CONTEXT.md** — às vezes a resposta já está nos documentos
5. **Registre ADR se** for decisão arquitetônica para evitar que o mesmo erro se repita
6. **Reexecute gates** (`typecheck` → `lint` → `build`) após qualquer correção

---

## 4. Fluxo de Trabalho Passo-a-Passo

### Exemplo: Implementar Nova Seção no Site

```
PASSO 1: LER DOCUMENTOS OBRIGATÓRIOS (5 min)
  ✓ Abrir AGENTS.md → verificar regras
  ✓ Abrir CONTEXT.md → entender arquitetura
  ✓ Revisar docs/mef/01-foundations/principles.md → princípios

PASSO 2: ANALisar O QUE JÁ EXISTE (3 min)
  ✓ Rodar `npm run typecheck` → confirmar estado atual
  ✓ Explorar src/components/sections/ → ver pattern
  ✓ Verificar src/data/services.ts → se é novo serviço

PASSO 3: PLANEJAR A IMPLEMENTAÇÃO (2 min)
  ✓ Decidir: é nova seção? novo serviço? correção de bug?
  ✓ Se novo: criar SPEC mental (ou ADR se arquitetônico)
  ✓ Identificar arquivos a modificar/criar

PASSO 4: IMPLEMENTAR (20-40 min)
  ✓ Criar/atualizar componentes seguindo padrão
  ✓ Adicionar tipos TypeScript consistentes
  ✓ Manter design consistente (tema, cores, layout)

PASSO 5: EXECUTAR GATES (2 min)
  ✓ `npm run typecheck` → sem erros?
  ✓ `npm run lint` → apenas warnings?
  ✓ `npm run build` → sucesso?

PASSO 6: ATUALIZAR DOCUMENTAÇÃO (3 min)
  ✓ Se nova arquitetura/regra: atualizar CONTEXT.md
  ✓ Se decisão arquitetônica: criar ADR em docs/mef/templates/ADR.md
  ✓ Se novo FAQ: considerar adicionar a src/data/faq.ts

PASSO 7: COMMIT (1 min)
  ✓ Mensagem clara: "feat: add X section" ou "fix: resolve Y bug"
  ✓ Referenciar ADR se aplicável
  ✓ Commitar somente após todos os gates passarem
```

---

## 5. Atalhos e Padrões do Códigobase

### 5.1 Padrões de Componente React

```tsx
// Padrão de componente funcional
export function NomeComponente({ prop1, prop2 }: {
  prop1: Tipo1;
  prop2?: Tipo2;
}) {
  // Hooks locais primeiro
  const [state, setState] = useState<TypeInicial>(inicial);
  
  // Efeitos se necessário
  useEffect(() => {
    // cleanup
    return () => {};
  }, [dependencies]);

  // Return JSX com classes Tailwind consistentes
  return (
    <div className="section p-6 bg-white text-ink">
      {/* Conteúdo */}
    </div>
  );
}
```

### 5.2 Padrão de Types

```typescript
// Padrão de interface/type exportado
export interface NomeInterfase {
  id: string;
  title: string;
  description: string;
  // ... outros campos
}
```

### 5.3 Padrão de Estilo (Tailwind CSS 4)

- Usar tokens semânticos definidos em `src/styles.css`
- Tema claro: fundo branco (`canvas`), texto em verde-petróleo (`ink`), acentos em verde (`accent`)
- Evitar valores "mágicos" — preferir tokens (`bg-bg`, `text-ink`, `text-accent`, etc.)

### 5.4 Padrão de Lint (oxlint)

- `react/rules-of-hooks: error` — hooks devem seguir regras do React
- `react/only-export-components: ["warn", { "allowConstantExport": true }]` — pode exportar constants, mas componentes devem ser exportados

---

## 6. Referências Rápidas

| Documento | Caminho | Para O Que Serve |
|-----------|---------|------------------|
| AGENTS.md | raiz/AGENTS.md | Regras operacionais para IA |
| CONTEXT.md | raiz/CONTEXT.md | Contexto do projeto, arquitectura |
| Principles | docs/mef/01-foundations/principles.md | Princípios MEF |
| Engineering Model | docs/mef/01-foundations/engineering-model.md | Modelos MEF-1/MEF-2/MEF-3 |
| Templates | docs/mef/templates/ | ADR, SPEC, CONTEXT, INCIDENT |
| Types | src/types.ts | Tipos compartilhados do projeto |
| Services | src/data/services.ts | Dados de 7 serviços oferecidos |
| FAQ | src/data/faq.ts | Perguntas frequentes e respostas |
| Config | src/config.ts | BRAND, CONTACT, AGENDA, NAV_LINKS |

---

*Instruções para agentes revisadas: Sat Oct 31 2026*