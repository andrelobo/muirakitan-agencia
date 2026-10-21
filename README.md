# Muirakitan Agência

Site da **Muirakitan Agência** com agenda web para agendamento de reuniões de
diagnóstico. Construído com Vite, React 19, TypeScript e Tailwind CSS 4.

## Identidade visual

Todo o design vem do repositório `muirakitan-model`. Tokens, logo e ícones foram
copiados ecentralizados em `src/styles.css` e `public/brand/`.

| Token         | Valor     | Origem                          |
| ------------- | --------- | ------------------------------- |
| `green-950`   | `#082B37` | fundo da aplicação              |
| `green-300`   | `#40D8C4` | acento, foco e botões           |
| `green-200`   | `#9CECE1` | apoio em textos secundários     |
| `mtk-500`     | `#18A678` | verde da marca no logo oficial  |
| `mtk-ink`     | `#F8FCFB` | texto principal                 |
| fonte         | Arial, Helvetica, sans-serif | tipografia do `muirakitan-model` |

Recursos de marca em `public/brand/assets/`:

- `svg/logo-horizontal-white.svg` — assinatura horizontal oficial
- `svg/logo-mark.svg` — símbolo de seis módulos
- `svg/favicon.svg`, `icons/favicon.ico`, `icons/apple-touch-icon.png`

O foco visível segue o padrão do `muirakitan-model`: `2px solid #40D8C4` com
offset de `4px`.

## Antes de publicar

Substitua os dados de contato em `src/config.ts`:

```ts
export const CONTACT = {
  whatsappNumber: '5511900000000',        // somente dígitos, com DDI e DDD
  email: 'contato@muirakitan.com.br',
  city: 'São Paulo, SP',
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

1. **Serviço** — sete frentes: sites, aplicativos, automações, uso correto de
   I.A., APIs, sistemas contábeis/ERP e RPA (`src/data/services.ts`).
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

## Estrutura

```
src/
├── components/
│   ├── Header.tsx, Footer.tsx, Brand.tsx, FloatingContact.tsx
│   ├── sections/  Hero, Services, Process, Agenda, BookingsDialog, Faq, Contact
│   └── ui/        Button, ServiceIcon
├── data/          services.ts, process.ts, faq.ts
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
