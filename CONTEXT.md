# CONTEXT.md — Muirakitan Agência

> **Contexto persistente do projeto**: Este documento captura a arquitetura atual, regras de negócio e decisões técnicas do projeto Muirakitan Agência. Deve ser lido em conjunto com `AGENTS.md`, `docs/mef/principles.md` e `docs/mef/engineering-model.md`.

---

## 1. Visão Geral do Projeto

**Nome**: Muirakitan Agência  
**Propósito**: Site institucional para captação de reuniões de diagnóstico de tecnologia com IA governada.  
**Stack**: React 19 + TypeScript + Vite 8 + Tailwind CSS 4  
**Deploy**: Estático (dist/) em Vercel/Netlify/Cloudflare Pages  
**Hospedagem**: Estática, CDN-based

---

## 2. Arquitetura Atual

### 2.1 Estrutura de Pastas

```
src/
├── components/           # Componentes React (seções, UI, headers, footers)
│   ├── sections/         # Páginas de seção (Hero, Services, Agenda, etc.)
│   ├── ui/               # Componentes de UI genéricos (Button, ServiceIcon)
│   ├── Header.tsx        # Barra de navegação principal
│   ├── Footer.tsx        # Rodapé
│   ├── Brand.tsx         # Logo da marca
│   └── FloatingContact.tsx # Flutuante de WhatsApp
├── data/                 # Dados estáticos (services, process, faq)
│   ├── services.ts       # 7 serviços oferecidos
│   ├── process.ts        # 4 etapas do diagnóstico
│   └── faq.ts            # 10 perguntas frequentes
├── hooks/                # Hooks React
│   └── useBookings.ts    # Gerenciamento de agenda no localStorage
├── lib/                  # Funções utilitárias (bookings, slots, contacts, dates, format, cn)
├── types.ts              # Tipos compartilhados (Service, Booking, ServiceId)
├── config.ts             # Configurações BRAND, CONTACT, AGENDA, NAV_LINKS
├── main.tsx              # Entry point React
└── App.tsx               # Componente raiz com roteamento/estado
```

### 2.2 Páginas/Seções do Site

| Seção | ID HTML | Descrição |
|-------|---------|-----------|
| Hero | `#topo` | Section principal com proposta de valor |
| Serviços | `#servicos` | Grid de 8 frentes de serviço |
| Metodologia | `#metodologia` | Como IA com governança é aplicada |
| Processo | `#processo` | Do diagnóstico à entrega |
| Agenda | `#agenda` | Agenda web para agendamento |
| FAQ | `#faq` | Perguntas frequentes |
| Contato | `#contato` | Informações de contato |

### 2.3 Dados Principais

#### Serviços (7)
- IA governada, sites, apps, automações, IA, APIs, contabil/ERP, RPA
- Cada serviço tem: id, title, shortTitle, tagline, description, highlights, deliverables, durationMinutes, icon

#### Processo (4 etapas)
1. Diagnóstico (Dias 1 a 3)
2. Escopo e proposta (Dias 4 a 7)
3. Execução (Semanas 1 a N)
4. Entrega e evolução (Contínuo)

#### Agenda (configurações)
- **Storage key**: `muirakitan-agencia.bookings.v1` (localStorage)
- **Min lead time**: 2 horas
- **Horizon**: 21 dias
- **Business hours**: Seg-sex 9h-18h, Sáb 9h-13h
- **Step minutes**: 30min

#### Tipos Principais
- `ServiceId`: 'ia-governada' | 'sites' | 'apps' | 'automacoes' | 'ia' | 'apis' | 'contabil' | 'rpa'
- `Booking`: id, code, serviceId, date, time, durationMinutes, name, company, email, phone, notes, createdAt
- `Slot`: { time, available }

---

## 3. Regras de Negócio

### 3.1 Agendamento
- Agendamento somente pelo cliente (formulário de 3 passos)
- Dados salvos no `localStorage` do navegador (chave `muirakitan-agencia.bookings.v1`)
- Slot reservado apenas no dispositivo de quem agendou
- Confirmação por WhatsApp ou e-mail
- Cancelamento pelo usuário na página "Meus agendamentos"

### 3.2 Validações de Formulário
- Nome: mínimo 3 caracteres
- E-mail: formato válido (`/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i`)
- WhatsApp: mínimo 10 dígitos (após remoção de não-dígitos)
- Consentimento: necessário para submissão

### 3.3 Regras de Negócio da Agenda
- Antecedência mínima: 2 horas
- Janela de agendamento: até 21 dias ahead
- Horário de funcionamento: Seg-sex 9h-18h, Sáb 9h-13h
- Horários disponíveis: em intervalos de 30 minutos

### 3.4 Dados Públicos Visíveis
- `BRAND.name`: 'Muirakitan Agência'
- `BRAND.eyebrow`: 'Agência de tecnologia com IA governada'
- `BRAND.tagline`: 'Desenvolvimento assistido por IA com governança...'
- `CONTACT.whatsappNumber`: '5592985930954' (apenas dígitos)
- `CONTACT.email`: 'loboandre@hotmail.com'
- `CONTACT.city`: 'Manaus, AM, Brasil'
- `CONTACT.hours`: 'Segunda a sexta, 9h às 18h · Sábado, 9h às 13h'
- `CONTACT.responseTime`: 'Resposta em até 1 dia útil'

---

## 4. Decisões Técnicas Conhecidas

### 4.1 Stack
- **React 19** com StrictMode
- **TypeScript** com `tsc -b` (build incremental)
- **Vite 8** com plugins React + Tailwind CSS 4
- **Tailwind CSS 4** com configuração minimalista em `src/styles.css`
- **Radix UI** para componentes de acesso (Slot do `@radix-ui/react-slot`)
- **Lucide React** para ícones
- **oxlint** para lint (configurado em `.oxlintrc.json`)

### 4.2 Estilo e Design
- Tema escuro verde (baseado no `muirakitan-model`): fundo `#082b37`, texto `#f8fcfb`, acentos mint `#40d8c4` / `#9cece1`
- `color-scheme: dark`; botões de acento usam texto escuro sobre o mint
- Tokens semânticos definidos em `src/styles.css` (bg, bg-subtle, bg-muted, bg-sunken, ink, accent, divide, divider, etc.)
- Escala de marca: green-950, green-300, green-200, mtk-500, mtk-ink
- Fonte: Arial, Helvetica, sans-serif (do `muirakitan-model`)
- Estado corrente da sessão: ver `docs/ESTADO-ATUAL.md`

### 4.3 Persistência
- Agenda usa `localStorage` do navegador
- Dados são específicos por dispositivo (não há back-end)
- Para produção com agenda compartilhada: trocar `useBookings.ts` por chamada de API

### 4.4 Build & Deploy
- `npm run build` → `tsc -b && vite build` → gera pasta `dist/`
- Qualquer hospedagem estática (Vercel, Netlify, Cloudflare Pages, Nginx)
- Rota de fallback: `index.html` para futuras rotas

### 4.5 Scripts Disponíveis
- `npm run dev` → servidor desenvolvimento
- `npm run build` → build produção
- `npm run typecheck` → `tsc -b`
- `npm run lint` → `oxlint`
- `npm run preview` → servir build produção

---

## 5. Limites para Agentes de IA (Resumo Executivo)

Baseado em `AGENTS.md`, o agente deve obedecer:

| Área | Limite |
|------|--------|
| **Código React** | Pode gerar/ refatorar componentes que seguem padrões existentes |
| **TipoScript** | Pode adicionar tipos, mas não remover validações existentes |
| **Design/Visual** | NÃO modificar — tema, cores, layout devem permanecer |
| **Configurações** | NÃO modificar `package.json`, `vite.config.ts`, `tsconfig.json`, `.oxlintrc.json` |
| **Dependências** | NÃO adicionar novas sem justificativa e validação de build |
| **Deploy** | NÃO executar deploy em produção |
| **Persistência** | Apenas `localStorage` — não modificar strategy sem ADR |
| **Git** | NÃO usar `git reset --hard`, `git clean` que perteca histórico |

---

## 6. Referências Cruzadas

- **`AGENTS.md`**: Instruções operacionais para agentes de IA
- **`docs/mef/principles.md`**: Princípios do MEF
- **`docs/mef/engineering-model.md`**: Modelo de engenharia (níveis MEF-1, MEF-2, MEF-3)
- **`docs/mef/templates/ADR.md`**: Template para registros de decisões
- **`src/types.ts`**: Tipos do projeto
- **`src/config.ts`**: Configurações de negócio
- **`src/data/services.ts`**: Dados de serviços
- **`src/data/process.ts`**: Etapas do processo
- **`src/data/faq.ts`**: Perguntas frequentes

---

*Contexto persistente: Este documento deve ser atualizado sempre que nova arquitetura, regra de negócio ou decisão técnica for introduzida no projeto. Atualizações devem ser registradas como ADRs quando relevante.*

*Última atualização: Sat Oct 31 2026*