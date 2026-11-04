# ESTADO-ATUAL.md — Muirakitan Agência

> **Snapshot de sessão.** Documento curto e volátil: descreve *onde o projeto está agora* para retomar o contexto rapidamente. Para arquitetura e regras permanentes, ver `CONTEXT.md`; para limites operacionais, `AGENTS.md`.

**Última atualização:** quarta-feira, 04/11/2026
**Branch:** `main`
**HEAD:** `3d4f8d5` — `feat(copy): direciona a abertura do site ao dono de negocio local`
**Working tree:** limpo; `main` sincronizada com `origin/main`

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

## 2. Sessões recentes

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

1. Heberton Pinheiro — site institucional (Libras/acessibilidade)
2. Moari Agro — proposta digital (não é site de cliente publicado)
3. Alcenir Silva — site profissional
4. UrbanRank — web app para skatistas
5. Apa Locadora — landing page de locação de motos
6. Fortunato Tapeçaria — e-commerce
7. Manausmacaco — portfólio de arte

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

### 2.6 SEO, imagens e cases

| Arquivo | Mudança |
|---|---|
| `index.html` | canonical, Open Graph, Twitter Card, `theme-color` escuro e JSON-LD `ProfessionalService` |
| `public/og-image.png` | card social 1200x630 gerado e otimizado |
| `public/robots.txt`, `public/sitemap.xml` | indexação e lista da home + 7 cases |
| `src/components/sections/Hero.tsx` | faixa “Projetos entregues” com 3 cases em destaque |
| `src/data/projects.ts` | flag `featured` e `FEATURED_PROJECTS` |
| `src/components/sections/Portfolio.tsx` | cards abrem o case interno; link externo separado |
| `public/projetos/<slug>/index.html` | sete páginas de case estáticas com conteúdo próprio, canonical, OG e JSON-LD |
| `public/projetos/case.css` | estilos compartilhados dos cases |

As páginas de case usam URLs `.html` para funcionar tanto no dev server quanto em hospedagem estática sem rewrite. Os cards do Hero e do Portfólio apontam para essas páginas.

### 2.7 Sessão de 04/11/2026 — correções de data e persistência

| Arquivo | Mudança |
|---|---|
| `src/lib/contact.ts` | `googleCalendarUrl` e `toIcsDate` passaram a usar `fromISODate` em vez de `new Date('YYYY-MM-DD')` |
| `src/lib/bookings.ts` | `loadBookings` valida o schema completo antes de renderizar |

**Bug do fuso.** `new Date('2026-11-10')` interpreta a string como UTC meia-noite; em Manaus (UTC-4) isso é 09/11 às 20h. Como o código em seguida fazia `setHours(9, 30)`, o evento era exportado **um dia antes** — tanto no Google Calendar quanto no `.ics`.

| Verificação (TZ=America/Manaus, 10/11/2026 09:30, 45 min) | Antes | Depois |
|---|---|---|
| Google Calendar `dates` | `20261109T133000Z` | `20261110T133000Z` |
| ICS `DTSTART` | `20261109T093000` | `20261110T093000` |
| ICS `DTEND` | `20261109T101500` | `20261110T101500` |

**Persistência.** Antes, `loadBookings` só checava `id`, `date` e `time`. Um `serviceId` desconhecido fazia `getService()` devolver `undefined` e a tela "Meus agendamentos" quebrava com `Cannot read properties of undefined`. Agora o parse valida:

- `serviceId` existe em `SERVICE_MAP`
- `date` no formato `YYYY-MM-DD` **e** existente no calendário (rejeita `2026-02-30`)
- `time` no formato `HH:MM` (rejeita `25:00`)
- `durationMinutes` positivo; se ausente/inválido, cai para a duração padrão do serviço
- `id` string não vazia; demais campos de texto normalizados para `''`

Entradas inválidas são descartadas individualmente — as válidas continuam aparecendo.

Verificado com `jiti` (executa TS direto, sem instalar nada): 10 casos, incluindo JSON corrompido, não-array, serviceId desconhecido, data impossível, hora inválida, ausência de `durationMinutes` e array misto.

### 2.8 Sessão de 04/11/2026 — reposicionamento para o dono de negócio local

Decisão de público registrada em `docs/adr/ADR-001-publico-alvo-dono-de-negocio-local.md` e declarada no `CONTEXT.md`. A partir dela, a home deixou de abrir pelo método e passou a abrir pelo resultado; a profundidade técnica virou prova, não argumento de entrada.

| Arquivo | Mudança |
|---|---|
| `docs/adr/ADR-001-*.md` | Novo: decisão, 4 alternativas, consequências e riscos |
| `src/config.ts` | `eyebrow`, `tagline` e `description` em linguagem de resultado |
| `src/components/sections/Hero.tsx` | H1, CTAs e estatísticas reescritos |
| `src/types.ts` | `ServiceGroup` + `group` e `ctaLabel` em `Service` |
| `src/data/services.ts` | Copy dos 3 serviços principais em linguagem simples; `PRIMARY_SERVICES` / `SECONDARY_SERVICES` |
| `src/components/sections/Services.tsx` | 3 cards principais + faixa "Não sabe por onde começar?" + bloco secundário |
| `src/components/sections/Agenda.tsx` | Triagem "O que você precisa?", principais primeiro, secundários sob divisor |
| `src/components/sections/Contact.tsx` | Texto sem jargão; checklist e mensagem do WhatsApp reescritos |
| `index.html` | `<title>`, meta description, OG/Twitter e JSON-LD alinhados ao público |
| `src/components/sections/Methodology.tsx` | Deixa de repetir o passo a passo (que é do `Process`) e passa a explicar o que garante a entrega |
| `src/components/Header.tsx` | CTA "Agendar reunião" → "Agendar conversa", alinhado ao hero |
| `src/App.tsx` | `ReverseEngineering` movida para depois da `Agenda` |

**Divisão dos 8 serviços.** 3 principais (`sites`, `apps`, `automacoes`) para quem quer vender ou organizar a operação; 5 secundários (`ia-governada`, `ia`, `apis`, `contabil`, `rpa`) para quem já tem sistema ou equipe técnica. O campo `group` é a fonte da verdade — as listas `PRIMARY_SERVICES` e `SECONDARY_SERVICES` são derivadas dele, sem duplicar dados.

**Correções de conteúdo encontradas no caminho.** A estatística "7 linhas de serviço" estava errada (são 8). "100% código no seu repositório" não comunica nada para o público novo. Os CTAs "Agendar sites" / "Agendar sistemas" viraram "Quero um site" / "Quero um sistema" / "Quero automatizar" (`ctaLabel`). A faixa "Não sabe por onde começar?" agora abre a agenda sem serviço pré-selecionado, em vez de forçar `sites`.

**Metodologia × Como funciona.** As duas seções descreviam o mesmo passo a passo em linguagens diferentes — redundância que só piorava para quem não é técnico. `Process` fica com o passo a passo (diagnóstico → escopo → execução → entrega). `Methodology` passa a responder outra pergunta: *o que garante que isso vai dar certo* — entender antes de construir, travar o que é crítico, acompanhamento visível e entrega com prova. O jargão (AGENTS.md, gates, determinístico) saiu do título e do corpo; sobrou no rodapé como prova, no caso Jupati.

**Ordem das seções.** `ReverseEngineering` ficava logo depois do portfólio — o visitante via 7 cases que reconhece e caía num bloco sobre SHA-256 e ambiente isolado. Agora a página segue o caminho de conversão (`Hero → Serviços → Portfólio → Metodologia → Como funciona → Agenda`) e o bloco técnico fica depois da agenda, como porta para quem já é técnico.

**Preço:** adiado por decisão do fundador. A vitrine não menciona valores.

---

## 3. Estado verificado

| Gate | Resultado |
|---|---|
| `npm run typecheck` | ✅ sem erros |
| `npm run lint` | ✅ 0 warnings, 0 errors (33 arquivos) |
| `npm run build` | ✅ `dist/` gerado: JS 333,95 kB (102,16 kB gzip), CSS 30,04 kB (6,46 kB gzip) |
| `npm audit --omit=dev` | ✅ 0 vulnerabilidades |
| Verificação visual | ✅ hero, serviços, metodologia, agenda e mobile 390px via Chrome headless |
| Correção de fuso | ✅ Google Calendar e ICS conferidos com `TZ=America/Manaus` |
| Validação de bookings | ✅ 10 casos de schema via `jiti` |

> `npm run dev` está no ar em `http://localhost:5173` (Vite, HMR).

---

## 4. Pendências e próximos passos

1. **Revisar o conteúdo do portfólio**: confirmar textos, URLs e principalmente a classificação de Moari Agro como *proposta*, não entrega. Revisar também as capturas (mostram dados de contato públicos dos sites).
2. **Decidir o menu**: incluir “Projetos” no header ou manter apenas a seção? Se incluir, testar 1024px e 1280px — o header já quebra “Como funciona” em duas linhas.
3. **Itens de UI já conhecidos**: classe `.section` indefinida; larguras `max-w-6xl` × `max-w-7xl`.
4. **Preço** — adiado por decisão do fundador em 04/11. A vitrine de serviços não cita valores; quando houver números, criar uma faixa "a partir de" nos 3 cards principais.
5. **FAQ ainda técnica** — as perguntas abertas são "O que significa IA com governança?", "O que é Context Engineering?" e "Vocês entregam agentes/skills prontos para o meu time?". O dono de negócio local pergunta preço, prazo, garantia e "preciso entender de tecnologia?". Reescrever as 4 primeiras e mandar as técnicas para o fim.
6. **Analytics** — sem medição, a decisão da ADR-001 continua sendo hipótese. Instalar Plausible/Umami exige ADR (mexe em `index.html`).
7. **Sem testes e sem CI** — o fluxo de agenda e os helpers de data são os candidatos naturais. A correção de 04/11 foi verificada com `jiti` em script avulso; virar teste de verdade exige decidir a stack (Vitest) e alterar `package.json`, o que precisa de ADR.
8. **Piloto de engenharia reversa** — concluir Fase 1 (disco/isolamento), escolher alvo open source, registrar autorização e rodar RE-01…RE-06. Sem case, não usar os prazos da oferta como promessa comercial.
9. **Ferramentas de binário** — Ghidra, Binwalk, Frida e Rizin ainda não instalados; não vender firmware/análise de binário antes da Fase 2.
10. **Imagens dos cases** — hoje em 800x500. Recapturar em 1600x1000 para hero/retina e manter os `alt` descritivos.
11. **Search Console** — validar sitemap, canonical e indexação depois do deploy.
12. **Conteúdo dos cases** — revisar textos e claims; Moari é proposta, não entrega. Não inventar métricas.

---

## 5. Armadilhas conhecidas

- **Tailwind é v4.** Entry: `@import "tailwindcss"` + `@theme { --color-* }`. `@tailwind base/components/utilities` não funciona.
- **Classe sem token = CSS vazio.** Declare o token no `@theme` e confira no CSS compilado.
- **Tailwind v4 remove tokens não usados** do CSS final.
- **`border` sozinho usa `currentColor`** (texto quase branco no tema escuro). Use `border-divide` ou `border-line`.
- **`new Date('YYYY-MM-DD')` interpreta UTC.** Em Manaus (UTC-4) a data volta um dia. Use `fromISODate` de `src/lib/dates.ts`, que monta a data no fuso local.
- **`getService()` não tem fallback.** Devolve `undefined` para id desconhecido e quebra quem acessa `.title`. Dados vindos do `localStorage` precisam passar por `loadBookings()`, que valida o `serviceId`.
- **Serviço novo precisa de `group`.** `PRIMARY_SERVICES` e `SECONDARY_SERVICES` são derivados de `group` em `src/data/services.ts`; sem o campo, o serviço some da vitrine e da triagem da agenda.
- **`AGENTS.md` proíbe** `rm -rf`, `git clean`, `git reset --hard` e alteração de `package.json` / `vite.config.ts` / `tsconfig.json` / `.oxlintrc.json` sem ADR.

---

## 6. Histórico resumido

- **31/10/2026** — tema escuro verde baseado no `muirakitan-model`, correções de logo/botões/Hero/Agenda, renomeação ZERA → Jupati, governança MEF-1 (`AGENTS.md`, `CONTEXT.md`, `docs/mef/**`).
- **03/11/2026** — análise do repositório (bug de data, persistência, acessibilidade, drift de docs), seção Portfólio com 7 projetos, seção de engenharia reversa com oferta comercial e roteiro de piloto, revisão de documentação (tema escuro, referências MEF, template ADR) e base de SEO com OG image, sitemap, cases estáticos e faixa de projetos no hero.
- **04/11/2026** — correção do fuso nas exportações de calendário (Google Calendar e ICS adiantavam um dia em Manaus), endurecimento do schema de `loadBookings` e reposicionamento da home para o dono de negócio local (ADR-001): hero, vitrine de serviços, triagem da agenda, contato e metadados.

---

## 7. Plano para a próxima sessão

1. **Revisar os cases** — textos, links, classificação de Moari como proposta e dados públicos nas capturas. Com o público da ADR-001, os cases locais passam a ser a prova principal da home.
2. **Decidir sobre testes automatizados** — a correção de 04/11 ficou coberta só por script avulso com `jiti`. Introduzir Vitest exige alterar `package.json`, então precisa de ADR antes (`docs/mef/templates/ADR.md`).
3. **Recapturar imagens** em 1600x1000 para hero/retina e regenerar o OG image se necessário.
4. **Validar SEO em produção** — Search Console, sitemap, canonical e analytics; decidir se “Projetos” entra no menu e se o showcase vira carrossel.
5. **FAQ** — reescrever as perguntas abertas para o público da ADR-001 (preço, prazo, garantia, "preciso saber de tecnologia?") e deixar as técnicas no fim da lista.
6. **Engenharia reversa** — escolher o alvo piloto, liberar ambiente isolado e iniciar RE-01 com autorização registrada.
7. **UI pendente** — definir se `.section` vira classe real ou sai do markup, e unificar `max-w-6xl` × `max-w-7xl`.

Antes de retomar: `npm run dev` e conferir `npm run typecheck && npm run lint && npm run build`.
