# Tool Management — Gerenciamento de Ferramentas

> **Princípio MEF**: "Princípio do menor privilégio. Agentes de IA devem ter o menor nível de acesso necessário para completar a tarefa."

Este documento define quais ferramentas o agente pode usar, como usá-las e quais são as restrições para cada nível MEF.

## 1. Classificação de Ferramentas por Nível de Acesso

| Categoria | Ferramenta | Nível MEF-Mínimo | Instruções de Uso | Restrições |
|-----------|------------|------------------|-------------------|------------|
| **Build** | `npm run build` | MEF-1 | Executar para gerar dist/; validar código | Nunca modificar `vite.config.ts`, `tsconfig.json` após configurado |
| **Lint** | `npm run lint` | MEF-1 | Verificar qualidade de código; bloquear commit com errors | Apenas warnings aceitos; errors devem ser corrigidos |
| **Typecheck** | `npm run typecheck` | MEF-1 | Validar tipos TypeScript | Bloquear commit com erros de tipo |
| **Testes** | `npm test` | MEF-2 (opcional MEF-1) | Executar suite de testes | Não aplicar se não houver testes configurados |
| **Git** | `git add`, `git commit`, `git push`, `git pull --rebase` | MEF-1 | Versionamento de código | **PROIBIDO**: `git reset --hard`, `git clean -fd`, operações que percam histórico |
| **Deploy** | `npm run preview` | MEF-1 (local apenas) | Servir build local para teste | **PROIBIDO**: Deploy em produção (Vercel/Netlify/etc.) sem aprovação formal |
| **Arquivos** | Leitura/escrita em disco | MEF-1 | Operar dentro de `src/`, `docs/`, `public/` | **PROIBIDO**: Modificar arquivos fora destes diretórios sem ADR |
| **Config** | `src/config.ts` | MEF-2 (restrito MEF-1) | Apenas ler configurações de marca/contato/agenda | **PROIBIDO** em MEF-1: modificar `package.json`, `vite.config.ts`, `tsconfig.json`, `.oxlintrc.json` |
| **Dependencies** | `npm install` | MEF-2 (com restrições) | Adicionar novas dependências quando necessárias | **PROIBIDO** sem justificativa escrita + validação `typecheck`+`build` |
| **Shell/Comandos** | Qualquer comando shell | MEF-3 (restrito) | Apenas em ambiente controlado e auditado | **PROIBIDO** em MEF-1/MEF-2: `rm -rf`, `git clean`, `rm -rf /*`, operações destrutivas |
| **API Externa** | Fetch/axios para serviços externos | MEF-2 (com restrições) | Apenas endpoints documentados e seguros | **PROIBIDO** em MEF-1; em MEF-2: somente com guardrails e escopos definidos |
| **Credenciais** | Passwords, tokens, keys | NEVER (todos os níveis) | Nunca armazenar em código, prompts ou commits | **PROIBIDO** em todos os níveis; usar vars de ambiente do deployment |

---

## 2. Restrições por Nível MEF

### 2.1 MEF-1 Essencial (Site Institucional)

| Ação | Permitido? | Como |
|------|------------|------|
| Rodar `npm run build` | ✅ Sim | Gerar pasta dist/ para preview |
| Rodar `npm run typecheck` | ✅ Sim | Confirmar sem erros |
| Rodar `npm run lint` | ✅ Sim | Apenas warnings; errors corrigir |
| Criar arquivos em `src/` | ✅ Sim | Componenetes, hooks, libs utilitárias |
| Criar arquivos em `docs/mef/` | ✅ Sim | Documentação da metodologia |
| Modificar `src/config.ts` | ⚠ Com restrição | Apenas dados de marca/contato/agenda; mudanças arquitetônicas requerem ADR |
| Adicionar nova dependência | ❌ Não em MEF-1 | Subir para MEF-2 ou justificar excepcionalmente |
| Operar filesystem fora de `src/`/`docs/`/ `public/` | ❌ Não | Nunca fora destes sem ADR explícito |
| Usar `git reset --hard` | ❌ Não | Nunca, em nenhuma circunstância |
| Usar `git clean` | ❌ Não | Nunca remover arquivos não rastreados de forma destrutiva |
| Deploy em produção | ❌ Não | Apenas `npm run preview` local |
| Modificar `package.json` | ❌ Não | Somente com ADR e discussão |
| Modificar `vite.config.ts` | ❌ Não | Somente com ADR |
| Alterar design/visual do site | ❌ Não | Regra 5 das operacionais obrigatórias |

---

### 2.2 MEF-2 Empresarial (APIs, SaaS, Sistemas de Negócio)

| Ação | Permitido? | Como |
|------|------------|------|
| Todas do MEF-1 | ✅ | |
| Adicionar nova dependência | ✅ Com restrição | Documentar no SPEC; validar `typecheck`+`build`; adicionar ao `package.json` com rationale |
| Modificar `package.json` | ✅ Com ADR | Registrar decisão de por que nova dependência é necessária |
| Configurar CI/CD (GitHub Actions) | ✅ | Adicionar workflows com gates: typecheck → lint → build → test |
| Gerenciar segredos (env vars) | ✅ | Usar variáveis de ambiente do provedor (Vercel, Netlify); nunca em código |
| Operar em `src/config.ts` | ✅ | Alterações de negócio; registrar em ADR se arquitetônico |
| Modificar configurações de build | ✅ Com ADR | Mudanças justificadas e documentadas |
| Deploy automatizado | ✅ Com aprovação | Pipeline CI/CD com rollback capability; aprovação humana para production |
| Operações de shell limitadas | ⚠ Com restrição | Apenas comandos de manutenção; nenhum `rm -rf` ou destrutivo |
| Usar APIs externas | ✅ Com guardrails | Apenas endpoints documentados; auth via env vars; logs de acesso |
| Adicionar novas features | ✅ Com SPEC | Todo feature deve ter SPEC preenchida (pelo menos simplificada) |

---

### 2.3 MEF-3 Crítico (Sistemas Críticos, Dados Sensíveis)

| Ação | Permitido? | Como |
|------|------------|------|
| Todas do MEF-2 | ✅ | |
| Isolamento de ambiente | ✅ | Rodar em containers Docker/VMs dedicados; não em máquina compartilhada |
| Aprovação humana formal | ✅ | Gate obrigatório antes de qualquer operação de escrita em produção |
| Monitoramento completo | ✅ | Logs de todas as operações; métricas de build/teste/deploy |
| Operações de shell restritas | ✅ | Apenas através de interfaces controladas; nenhum acesso direto root |
| APIs externas com MFA | ✅ | Autenticação multifator para acessos críticos; logs imutáveis |
| Credenciais em ambiente | ✅ | AWS Secrets Manager, HashiCorp Vault; nunca em código ou prompts |
| Operações destrutivas | ⚠ Extremamente restritas | Apenas em ambiente de homologação, com aprovação dupla e trilha completa |
| Rollback automático | ✅ | Pipeline configurado para reverter último deploy se gates falharem |
| Auditoria imutável | ✅ | Todas as mudanças registradas em logs append-only; assinadas digitalmente |

---

## 3. Proteção contra Operações Destrutivas

### 3.1 Operações Proibidas em Todos os Níveis

| Operação | Risco | Nível onde Proibido |
|----------|-------|---------------------|
| `rm -rf *` | Exclusão massiva de arquivos | Todos (MEF-1, MEF-2, MEF-3) |
| `git clean -fd` | Remover arquivos não rastreados | Todos |
| `git reset --hard` | Perder histórico de commits | Todos |
| `rm -rf /` | Excluir raiz do sistema | Todos |
| `curl | sh` | Executar código remoto desconhecido | Todos |
| `chmod -R 777` | Exposição total de permissões | Todos |
| Sobrescrever `.env` production | Vazamento de secrets | Todos |
| Modificar arquivos de configuração de produção sem revision | Quebra de sistema | Todos |

### 3.2 Operações Proibidas em MEF-1/MEF-2 (Permitidas em MEF-3 com Restrição)

| Operação | Risco | Nível |
|----------|-------|-------|
| Excluir arquivos de fonte (`src/`/ `docs/`) | Perda de código/ docs | MEF-1, MEF-2 ❌; MEF-3 ⚠ com aprovação |
| Mover/renomear arquivos críticos | Quebra de imports/links | MEF-1, MEF-2 ⚠; MEF-3 com aprovação |
| Modificar persistência (localStorage strategy, banco de dados) | Perda de dados, corrupção | MEF-1, MEF-2 ❌; MEF-3 ⚠ com aprovação e backup |
| Mudar strategy de deploy | Quebra de disponibilidade | MEF-1, MEF-2 ⚠; MEF-3 com aprovação formal |

---

## 4. Gestão de Dependências

### 4.1 Processo de Adição de Nova Dependência

```
ETAPA 1: Identificar Necessidade
  - Por que esta dependência é necessária?
  - Qual problema ela resolve?
  - Existe alternativa existente no projeto?

ETAPA 2: Verificar Conflitos
  - Esta dependência conflictua com versões atuais?
  - Ela introduz vulnerabilidades conhecidas?
  - Ela é mantida/ativamente suportada?

ETAPA 3: Documentar no SPEC
  - Campo "dependências" do SPEC preenchido
  - Versão específica recomendada
  - Rationale da escolha

ETAPA 4: Instalar e Validar
  - `npm install <nome>` (versão específica se necessário)
  - `npm run typecheck` — passar
  - `npm run build` — sucesso
  - `npm run lint` — passar (ou warnings esperados)

ETAPA 5: Commit com Rationale
  - Mensagem referenciando SPEC
  - Explicar motivo da adição
  - Listar mudanças esperadas
```

### 4.2 Exemplos de Boas Práticas

✅ **Boa prática**: `npm install clsx` — já está no projeto como devDependency; usado para `cn()` function.

✅ **Boa prática**: Se precisar de `date-fns`, adicionar com versão específica, atualizar SPEC, validar gates.

❌ **Má prática**: `npm install alguma-coisa-nova` sem documentar por que; commitar sem validar gates; adicionar 5 dependências de uma vez.

### 4.3 Dependências Já Presentes no Projeto

| Pacote | Finalidade | Nível de Risco |
|--------|------------|----------------|
| `react` | Biblioteca UI | Baixo (estável, amplamente usado) |
| `react-dom` | Render React no DOM | Baixo |
| `lucide-react` | Ícones | Baixo |
| `class-variance-authority` (cva) | Variantes de componente | Baixo |
| `clsx` | ClassName conditional | Baixo (já usado no `cn()`) |
| `tailwind-merge` | Merge de classes Tailwind | Baixo (já usado no `cn()`) |
| `tailwindcss` | Framework CSS | Baixo (já configurado) |
| `@tailwindcss/vite` | Plugin Vite para Tailwind | Baixo |
| `oxlint` | Linter | Baixo (já configurado) |
| `typescript` | Tipos | Baixo (já configurado) |
| `vite` | Build tool | Baixo (já configurado) |
| `@types/node`, `@types/react`, `@types/react-dom` | Tipos TypeScript | Baixo |

---

## 5. Credenciais e Segretos

### 5.1 Nunca Fazer (em Qualquer Nível)

| Ação | Risco |
|------|-------|
| Escrever senha/token em código-fonte | Vazamento se repo ficar público |
| Inserir credenciais em prompts de IA | Vazamento pode incluir histórico |
| Salvar `.env` production no repositório | Acesso completo a serviços |
| Comitar credenciais de banco de dados | Fraude/acesso não autorizado |
| Compartilhar credenciais via Slack/email | Exposição desnecessária |

### 5.2 O Que Fazer Em vez disso

| Em vez de... | Faça Isso Em vez |
|--------------|------------------|
| `apiKey: 'sk-...'` no código | Usar variável de ambiente: `process.env.API_KEY` |
| Senha no prompt do agente | Nunca pedir/guardar senhas em conversa |
| `.env` no repo Git | Adicionar `.env` ao `.gitignore`; usar secrets do provedor de deploy |
| Credenciais hardcoded | Configurar no painel do Vercel/Netlify/Cloudflare Settings |

### 5.3 Variáveis de Ambiente no Projeto Atual

No `muirakitan-agencia` (MEF-1 Essencial):

| Variável | Fonte | Visibilidade |
|----------|-------|--------------|
| `CONTACT.whatsappNumber` | `src/config.ts` | Em código (visível, mas é público/ marketing) |
| `CONTACT.email` | `src/config.ts` | Em código (visível) |
| `AGENDA.storageKey` | `src/config.ts` | Em código (localStorage key) |

**Recomendação**: Este projeto MEF-1 não tem secrets críticos. Quando expandir para MEF-2/MEF-3, configurar:

- Vercel/Netlify env vars para secrets (API keys, database URLs)
- Nunca commitar `.env` files
- Usar `dotenv` apenas para configs não-secretas

---

## 6. Integração com MCP (Model Control Protocol)

> **Aviso** (do pilar E): MCP é recurso complementar, **não mecanismo de segurança por si mesmo**.

| O Que MCP Pode Fazer | O Que Não Substitui |
|----------------------|---------------------|
| Listar ferramentas disponíveis para agente | ✅ Substituir AGENTS.md |
| Controlar escopos mínimos de acesso | ✅ Substituir gates de typecheck/lint/build |
| Logar quais ferramentas foram usadas | ✅ Substituir revisão humana quando necessária |
| Garantir acessos mínimos e documentados | ❌ Substituir política de segurança formal |

**Uso recomendado do MCP no fluxo**:
1. Agente consulta MCP para saber quais ferramentas/escopos estão disponíveis
2. Operar dentro dos escopos definidos
3. Registrar em logs quais ferramentas foram usadas (para auditoria)
4. **Sempre** verificar se as operações também passaram pelos gates habituais (typecheck/lint/build)

---

## 7. Checklist de Ferramentas (Antes de Começar)

| Item | Verificar | Status |
|------|-----------|--------|
| 1. LER `AGENTS.md` — regras de tool usage | ☐ | |
| 2. LER `CONTEXT.md` — contexto da tarefa | ☐ | |
| 3. Verificar gates: `typecheck`, `lint`, `build` | ☐ | |
| 4. Identificar arquivos que podem ser modificados | ☐ | |
| 5. Confirmar que NÃO há operação destrutiva planejada | ☐ | |
| 6. Confirmar que credenciais não serão transmitidas | ☐ | |
| 7. Identificar nível MEF da tarefa | ☐ | (MEF-1/MEF-2/MEF-3) |
| 8. Confirmar restrições para o nível identificado | ☐ | |
| 9. Definir planO de reversão se der errado | ☐ | |
| 10. Estar pronto para executar gates após implementação | ☐ | |

**Se algum item estiver em ❌**: Não iniciar a tarefa. Resolver a pendência antes de prosseguir.

---

*Tool Management revisado: Sat Oct 31 2026*