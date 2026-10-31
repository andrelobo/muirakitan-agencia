# ESTADO-ATUAL.md — Muirakitan Agência

> **Snapshot de sessão.** Documento curto e volátil: descreve *onde o projeto está agora* para retomar o contexto rapidamente. Deve ser reescrito a cada sessão de trabalho. Para arquitetura e regras permanentes, ver `CONTEXT.md`; para limites operacionais, `AGENTS.md`.

**Última atualização:** sábado, 31/10/2026 19:36
**Branch:** `main` (sincronizada com `origin/main`)
**HEAD:** `abfbc11`

---

## 1. Como retomar

```bash
cd "Área de trabalho/KODE/muirakitan-agencia"
npm install          # se node_modules estiver ausente
npm run dev          # http://localhost:5173
```

Verificação obrigatória antes de qualquer commit:

```bash
npm run typecheck && npm run lint && npm run build
```

---

## 2. O que foi feito na sessão de 31/10/2026

### 2.1 Tema escuro verde (concluído)

O site estava renderizando **sem estilo** porque o `@theme` de `src/styles.css` não declarava os tokens usados pelos componentes (`bg-bg`, `bg-bg-subtle`, `bg-bg-muted`, `bg-bg-sunken`, `border-divide`, `border-divider`, `text-ink-hover`). No Tailwind v4, classe com token inexistente gera **zero CSS** — só as utilities genéricas funcionavam.

A paleta foi extraída do CSS real de `https://muirakitan-model.vercel.app/login`:

| Token | Valor | Papel |
|---|---|---|
| `--color-bg` | `#082b37` | fundo da página |
| `--color-bg-subtle` | `#0d3441` | header, cards |
| `--color-bg-muted` | `#12404e` | tags, hover |
| `--color-bg-sunken` | `#062028` | poços, indicadores inativos |
| `--color-ink` | `#f8fcfb` | texto principal |
| `--color-ink-hover` | `#ffffff` | texto em hover |
| `--color-ink-muted` | `#c9dbd7` | texto secundário |
| `--color-ink-subtle` | `#9fb8b4` | texto terciário |
| `--color-accent` | `#40d8c4` | mint (green-300 da referência) |
| `--color-accent-strong` | `#9cece1` | mint claro (green-200) |
| `--color-accent-soft` | `#0f3b46` | chips e estados selecionados |
| `--color-divide` / `--color-divider` | `#1c4a57` | bordas |

Também foram mantidos os aliases antigos (`--color-surface`, `--color-surface-muted`, `--color-line`, `--color-line-strong`), porque `Hero.tsx` e `Agenda.tsx` restaurados do git ainda usam esses nomes.

Utilitários de marca em `src/styles.css`: `mtk-grid-backdrop`, `mtk-glow`, `mtk-scrollbar`, `gradient-accent`, `nav-link`, `nav-link-hover`.

Ajustes de contraste (em `@layer utilities`):
- `.bg-accent.text-white` e `.bg-accent-strong.text-white` → texto escuro `#082b37` (botão mint igual à referência).
- `.bg-ink\/60.bg-ink\/60` → scrim escuro `rgb(6 32 40 / 0.72)` no overlay do modal.

### 2.2 Correções de UI

| Arquivo | Problema | Correção |
|---|---|---|
| `src/components/Brand.tsx` | wordmark "muirakitan" invisível (logo escura sobre fundo escuro) | passou a usar `logo-horizontal-white.svg` |
| `src/components/ui/Button.tsx` | variante `default` usava `bg-bg`, deixando o CTA primário escuro sobre escuro | revertido para `bg-accent text-white` (estado do commit `8d3724c`) |
| `src/components/sections/Hero.tsx` | card da direita era um placeholder com texto sobreposto ("ILUSTRAÇÃO CONCEITUAL") | restaurado do commit `8d3724c` |
| `src/components/sections/Agenda.tsx` | `<aside>` do resumo havia sido removido → coluna direita vazia | restaurado do commit `8d3724c` |

### 2.3 Conteúdo

- `ZERA` → `Jupati` em `Methodology.tsx`, `data/faq.ts` e `README.md`.
- A URL do README continua `github.com/andrelobo/zera-backend` porque `jupati-backend` retorna **404**. Atualizar quando o repositório for renomeado.

### 2.4 Governança

- Adicionados `AGENTS.md`, `CONTEXT.md` e `docs/mef/**` (MEF-1 Essencial).

---

## 3. Commits da sessão

```
abfbc11  refactor(content): renomeia ZERA para Jupati
8fa5e1b  feat(theme): aplica tema escuro verde e corrige tokens do Tailwind
c461671  docs(mef): adiciona governanca MEF-1 (AGENTS.md, CONTEXT.md, docs/mef)
```

Todos enviados para `origin/main`.

---

## 4. Estado verificado

| Gate | Resultado |
|---|---|
| `npm run typecheck` | ✅ sem erros |
| `npm run lint` | ✅ sem warnings |
| `npm run build` | ✅ `dist/` gerado |
| CSS gerado | ~27,6 kB (antes do fix: 0,43 kB) |
| Dev server | ✅ `http://localhost:5173` HTTP 200 |
| Inspeção visual | ✅ desktop 1440px e mobile 390px (Chrome headless) |

Classes confirmadas no CSS compilado: `bg-bg`, `bg-bg-subtle`, `bg-bg-muted`, `bg-bg-sunken`, `bg-surface`, `bg-surface-muted`, `border-divide`, `border-divider`, `border-line`, `border-line-strong`, `text-ink-hover`, `bg-ink/60`.

---

## 5. Pendências e próximos passos

1. **`.section` está indefinida.** A classe é usada em várias seções mas não existe no CSS (é inerte de propósito — defini-la com `max-width`/`padding` quebraria o layout atual). Ou remover do markup, ou implementar junto com um ajuste de layout.
2. **Inconsistência de largura.** Header e Hero usam `max-w-6xl`; as demais seções usam `max-w-7xl`. Alinhar é decisão de design.
3. **URL do repositório no README** (`zera-backend`) ainda não corresponde ao nome Jupati.
4. **`logo-horizontal-dark.svg`** ficou sem uso (mantido em `public/brand/assets/svg/`).
5. **Nada foi testado em navegador real** — a verificação visual foi feita via Chrome headless (screenshots). Fluxo de agendamento (passos 1→2→3, dialog de "Meus agendamentos", persistência em `localStorage`) não foi exercitado por interação.
6. **Sem testes automatizados** no projeto.

---

## 6. Armadilhas conhecidas

- **Tailwind é v4.** O entry correto é `@import "tailwindcss";` + `@theme { --color-* }`. `@tailwind base/components/utilities` é sintaxe v3 e **não funciona** aqui (foi a causa de uma tentativa de correção que piorou o problema).
- **Classe sem token = CSS vazio.** Ao usar uma cor nova, declare o token no `@theme` *e* confirme que ela aparece no CSS compilado.
- **Tailwind v4 remove tokens não usados** do CSS final (tree-shaking). Token que aparece no `@theme` mas não no `dist/` significa que nenhum componente o usa.
- **`AGENTS.md` proíbe** `rm -rf`, `git clean`, `git reset --hard` e alteração de `package.json` / `vite.config.ts` / `tsconfig.json` / `.oxlintrc.json` sem ADR.

---

## 7. Backups da sessão

Cópias dos arquivos substituídos ficaram em `/tmp/opencode/` (temporário — **não sobrevive a reinício**):

- `/tmp/opencode/Hero.backup.tsx` — versão com o card placeholder
- `/tmp/opencode/Agenda.backup.tsx` — versão sem o `<aside>` do resumo

O conteúdo definitivo de ambos está no git (`8d3724c`).
