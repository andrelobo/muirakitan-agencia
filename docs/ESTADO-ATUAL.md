# ESTADO-ATUAL.md — Muirakitan Agência

> **Snapshot de sessão.** Documento curto e volátil: descreve *onde o projeto está agora* para retomar o contexto rapidamente. Para arquitetura e regras permanentes, ver `CONTEXT.md`; para limites operacionais, `AGENTS.md`.

**Última atualização:** terça-feira, 03/11/2026 19:10
**Branch:** `main`
**HEAD:** `main` sincronizada com `origin/main` (ver `git log -1`)
**Working tree:** limpo

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

## 2. Sessão de 03/11/2026 — seção Portfólio

### 2.1 O que foi feito

| Arquivo | Mudança |
|---|---|
| `src/components/sections/Portfolio.tsx` | Nova seção `#projetos`: grid responsivo (1/2/3 colunas), cards com captura, categoria, descrição e link externo; card final de CTA para `#agenda` |
| `src/data/projects.ts` | Dados dos 7 projetos: nome, categoria, descrição, URL, imagem e texto alternativo |
| `public/portfolio/*.png` | Capturas dos 7 sites em 800x500, PNG com 256 cores (~780 kB no total) |
| `src/App.tsx` | Seção inserida entre `Services` e `Methodology` |
| `CONTEXT.md` | Portfólio documentado na estrutura, tabela de seções e dados |

A seção não foi adicionada ao menu do header: a navegação desktop já está cheia e ganhar um sétimo item exigiria rever o layout. O acesso é por scroll, logo após Serviços.

### 2.2 Projetos exibidos

1. Alcenir Silva — site profissional
2. Manausmacaco — portfólio de arte
3. Heberton Pinheiro — site institucional (Libras/acessibilidade)
4. UrbanRank — web app para skatistas
5. Apa Locadora — landing page de locação de motos
6. Moari Agro — proposta digital (não é site de cliente publicado)
7. Fortunato Tapeçaria — e-commerce

### 2.3 Como as capturas foram geradas

Chrome headless, viewport 1280x800, `--virtual-time-budget=12000`, e redução para 800x500 com ImageMagick (`-colors 256`). Se os sites mudarem, refazer as capturas e manter a proporção 16:10.

### 2.4 Seção de engenharia reversa

| Arquivo | Mudança |
|---|---|
| `src/components/sections/ReverseEngineering.tsx` | Nova seção `#engenharia-reversa`, após o Portfólio: três ofertas, card de compromisso e CTA para WhatsApp |
| `src/data/reverse.ts` | Dados das ofertas: diagnóstico de legado, contrato de API e reconstrução assistida |
| `src/App.tsx` | Seção inserida entre `Portfolio` e `Methodology` |
| `docs/comercial/engenharia-reversa-oferta.md` | Oferta comercial, escopo, limites, critérios de aceite e qualificação |
| `docs/operacao/piloto-engenharia-reversa.md` | Roteiro do primeiro piloto, cronograma, métricas e go/no-go |

A seção não altera o fluxo de agendamento: o CTA abre o WhatsApp com mensagem pronta, porque o diagnóstico de legado não é uma das oito frentes do formulário. A oferta está em rascunho; o laboratório segue em Fase 0 e o piloto ainda não foi executado.

### 2.5 Revisão de documentação

| Arquivo | Mudança |
|---|---|
| `README.md` | Seção de identidade visual corrigida para o tema escuro real; janela da agenda descrita como 21 dias úteis |
| `CONTEXT.md` | Referências MEF apontando para `01-foundations/`; horizonte da agenda como 21 dias úteis |
| `AGENTS.md` | Referências para os arquivos reais do MEF |
| `docs/mef/templates/ADR.md` | Template de ADR criado (referência quebrada resolvida) |
| `docs/mef/README.md` | Nota de estado real: seções 01–04 e template ADR existem; 05–09 e demais templates são planejados |

---

## 3. Estado verificado

| Gate | Resultado |
|---|---|
| `npm run typecheck` | ✅ sem erros |
| `npm run lint` | ✅ 0 warnings, 0 errors (33 arquivos) |
| `npm run build` | ✅ `dist/` gerado: JS 329,15 kB (101,03 kB gzip), CSS 29,71 kB (6,42 kB gzip) |
| Verificação visual | ✅ seção de engenharia reversa em desktop 1440px e mobile 390px via Chrome headless |
| `npm audit --omit=dev` | ✅ 0 vulnerabilidades |

---

## 4. Pendências e próximos passos

1. **Revisar o conteúdo do portfólio**: confirmar textos, URLs e principalmente a classificação de Moari Agro como *proposta*, não entrega. Revisar também as capturas (mostram dados de contato públicos dos sites).
2. **Decidir o menu**: incluir “Projetos” no header ou manter apenas a seção? Se incluir, testar 1024px e 1280px — o header já quebra “Como funciona” em duas linhas.
3. **Bug de data nos calendários**: `googleCalendarUrl` e `toIcsDate` usam `new Date('YYYY-MM-DD')`, que interpreta UTC e adianta um dia em Manaus. Corrigir com `fromISODate` (`src/lib/contact.ts:34` e `:53`).
4. **Persistência frágil**: `loadBookings` valida apenas `id`/`date`/`time`; serviço desconhecido ou data inválida pode derrubar “Meus agendamentos”. Validar o schema antes de renderizar.
5. **Itens de UI já conhecidos**: classe `.section` indefinida; larguras `max-w-6xl` × `max-w-7xl`.
6. **Sem testes e sem CI** — o fluxo de agenda e os helpers de data são os candidatos naturais.
7. **Piloto de engenharia reversa** — concluir Fase 1 (disco/isolamento), escolher alvo open source, registrar autorização e rodar RE-01…RE-06. Sem case, não usar os prazos da oferta como promessa comercial.
8. **Ferramentas de binário** — Ghidra, Binwalk, Frida e Rizin ainda não instalados; não vender firmware/análise de binário antes da Fase 2.

---

## 5. Armadilhas conhecidas

- **Tailwind é v4.** Entry: `@import "tailwindcss"` + `@theme { --color-* }`. `@tailwind base/components/utilities` não funciona.
- **Classe sem token = CSS vazio.** Declare o token no `@theme` e confira no CSS compilado.
- **Tailwind v4 remove tokens não usados** do CSS final.
- **`border` sozinho usa `currentColor`** (texto quase branco no tema escuro). Use `border-divide` ou `border-line`.
- **`AGENTS.md` proíbe** `rm -rf`, `git clean`, `git reset --hard` e alteração de `package.json` / `vite.config.ts` / `tsconfig.json` / `.oxlintrc.json` sem ADR.

---

## 6. Histórico resumido

- **31/10/2026** — tema escuro verde baseado no `muirakitan-model`, correções de logo/botões/Hero/Agenda, renomeação ZERA → Jupati, governança MEF-1 (`AGENTS.md`, `CONTEXT.md`, `docs/mef/**`).
- **03/11/2026** — análise do repositório (bug de data, persistência, acessibilidade, drift de docs), seção Portfólio com 7 projetos, seção de engenharia reversa com oferta comercial e roteiro de piloto, e revisão de documentação (tema escuro, referências MEF, template ADR).
