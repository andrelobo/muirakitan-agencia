# Muirakitan Agência

Site da **Muirakitan Agência** com agenda web para agendamento de reuniões de
diagnóstico. Construído com Vite, React 19, TypeScript e Tailwind CSS 4.

**Proposta comercial:** Desenvolvimento assistido por IA com governança. Usamos
Context Engineering, agentes com guardrails e validação obrigatória para
aplicar IA com segurança em sistemas em produção, legados e integrações
críticas. Inspirado na prática real com o [Jupati](https://github.com/andrelobo/zera-backend)
(sistema fiscal em produção com emissões reais).

## Identidade visual

Todo o design vem do repositório `muirakitan-model`. Tokens, logo e ícones foram
copiados e centralizados em `src/styles.css` e `public/brand/`.

O site usa **tema claro**: fundo branco, texto em verde-petróleo e acentos na
escala de verde da marca.

### Tokens semânticos do tema claro (`src/styles.css`)

| Token               | Valor     | Uso                                        |
| ------------------- | --------- | ------------------------------------------ |
| `canvas`            | `#FFFFFF` | fundo da página                            |
| `surface`           | `#FFFFFF` | cartões e painéis                          |
| `surface-muted`     | `#F3F8F7` | blocos de apoio e rodapé                   |
| `surface-sunken`    | `#E8F1EF` | detalhes internos (ex.: contador de etapa) |
| `ink`               | `#082B37` | texto principal                           |
| `ink-muted`         | `#4A626B` | texto secundário                          |
| `ink-subtle`        | `#6F878F` | texto terciário e legendas                |
| `accent`            | `#0B7D61` | acentos, botões e estados selecionados     |
| `accent-strong`     | `#085844` | hover do acento e textos sobre `accent-soft` |
| `accent-soft`       | `#E6F7F2` | fundo de chips e destaques                |
| `line`              | `#DFE8E6` | bordas e divisores                         |
| `line-strong`       | `#C2D5D1` | bordas de controles                        |

### Escala de marca (mantida em `@theme`)

| Token         | Valor     | Origem                          |
| ------------- | --------- | ------------------------------- |
| `green-950`   | `#082B37` | base escura da marca            |
| `green-300`   | `#40D8C4` | acento, seleção de texto       |
| `green-200`   | `#9CECE1` | apoio em textos secundários     |
| `mtk-500`     | `#18A678` | verde da marca no logo oficial  |
| `mtk-ink`     | `#F8FCFB` | texto da versão escura da marca |
| fonte         | Arial, Helvetica, sans-serif | tipografia do `muirakitan-model` |

Recursos de marca em `public/brand/assets/`:

- `svg/logo-horizontal-dark.svg` — assinatura horizontal em versão escura (tema claro)
- `svg/logo-horizontal-white.svg` — assinatura horizontal em versão branca (tema escuro)
- `svg/logo-mark.svg` — símbolo de seis módulos
- `svg/favicon.svg`, `icons/favicon.ico`, `icons/apple-touch-icon.png`

O foco visível usa `2px solid #0B7D61` com offset de `4px`, mantendo contraste
suficiente sobre o fundo branco.

## Antes de publicar

Substitua os dados de contato em `src/config.ts`:

```ts
export const CONTACT = {
  whatsappNumber: '5592985930954',        // somente dígitos, com DDI e DDD
  email: 'loboandre@hotmail.com',
  city: 'Manaus, AM, Brasil',
  hours: 'Segunda a sexta, 9h às 18h · Sábado, 9h às 13h',
  responseTime: 'Resposta em até 1 dia útil',
};
```

O número de WhatsApp e o e-mail atuais são placeholders.

## Comandos

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run typecheck  # tsc -b
npm run lint       # oxlint
npm run build      # tsc -b && vite build (gera dist/)
npm run preview    # serve o build de produção
```

## Agenda web

Fluxo em três passos, em `src/components/sections/Agenda.tsx`:

1. **Serviço** — oito frentes: IA governada, sites, aplicativos, automações, uso
   correto de I.A., APIs, sistemas contábeis/ERP e RPA (`src/data/services.ts`).
2. **Data e hora** — agenda de segunda a sexta (9h–18h) e sábado (9h–13h),
   com antecedência mínima de 2h e janela de 21 dias.
3. **Seus dados** — nome, empresa, e-mail, WhatsApp, observações e autorização
   de contato.

Regras e janela de atendimento ficam em `src/config.ts` (`AGENDA`) e
`src/lib/slots.ts`.

Depois de confirmar, o cliente pode enviar o resumo pelo **WhatsApp** ou por
**e-mail**, salvar no **Google Agenda** ou baixar um arquivo `.ics`
(`src/lib/contact.ts`).

### Persistência

Os agendamentos ficam no `localStorage` do navegador, na chave
`muirakitan-agencia.bookings.v1` (`src/lib/bookings.ts`). Não há back-end: o
slot reservado é bloqueado apenas no dispositivo de quem agendou. Para uso em
produção com agenda compartilhada, troque `src/hooks/useBookings.ts` por uma
chamada de API — o resto da interface não muda.

O painel **Meus agendamentos** (cabeçalho e botão flutuante) lista, permite
reenviar o pedido e cancelar.

## Portfólio

A seção `#projetos` (`src/components/sections/Portfolio.tsx`) exibe sete projetos
em `src/data/projects.ts`, com capturas 16:10 em `public/portfolio/` e links
externos. Para adicionar um projeto, inclua o registro em `projects.ts` e a
imagem correspondente (800x500).

## Engenharia reversa assistida

A seção `#engenharia-reversa` (`src/components/sections/ReverseEngineering.tsx`)
apresenta três ofertas para sistemas existentes: diagnóstico de legado, contrato
de API e reconstrução assistida. Os dados ficam em `src/data/reverse.ts`.

A oferta comercial está em `docs/comercial/engenharia-reversa-oferta.md` e o
roteiro do primeiro piloto em `docs/operacao/piloto-engenharia-reversa.md`.
Nenhuma análise começa sem autorização escrita do titular.

## Estrutura

```
src/
├── components/
│   ├── Header.tsx, Footer.tsx, Brand.tsx, FloatingContact.tsx
│   ├── sections/  Hero, Services, Portfolio, ReverseEngineering, Process, Agenda, BookingsDialog, Faq, Contact
│   └── ui/        Button, ServiceIcon
├── data/          services.ts, process.ts, faq.ts, projects.ts, reverse.ts
├── hooks/         useBookings.ts
├── lib/           bookings, slots, dates, contact, format, cn
├── config.ts      marca, contato e regras da agenda
├── styles.css     tokens da marca e estilos base
└── types.ts
```

## Publicação

`npm run build` gera a pasta `dist/`, servível em qualquer hospedagem estática
(Vercel, Netlify, Cloudflare Pages, Nginx). Defina a rota de fallback para
`index.html` caso use rotas no futuro.
