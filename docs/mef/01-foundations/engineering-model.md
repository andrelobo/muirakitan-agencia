# Modelo de Engenharia — SDD e Níveis MEF

> **Como aplicar o Muirakitan Engineering Framework (MEF) em projetos reais.** Este documento define o modelo de engenharia, dos níveis de adoção ao processo Specification-Driven Development (SDD).

## 1. Specification-Driven Development (SDD)

> **Desenvolvimento Orientado a Especificação**: Requisitos devem ser definidos e verificáveis **antes** da implementação. O código é a implementação da especificação, não o contrário.

### 1.1 Processo de Especificação

```
ETAPA 1: Diagnóstico & Descoberta
  ↓
ETAPA 2: Especificação Técnica (SPEC)
  ↓
ETAPA 3: Revisão e Aprovação (humana)
  ↓
ETAPA 4: Implementação (com agente IA)
  ↓
ETAPA 5: Validação (gates automatizados)
  ↓
ETAPA 6: Documentação (ADR + atualização de CONTEXT.md)
```

### 1.2 Especificação Técnica (SPEC)

Cada nova funcionalidade deve ter uma especificação que inclua:

| Campo | Obrigatório? | Descrição |
|-------|--------------|-----------|
| `id` | Sim | Identificador único (ex.: SPEC-001) |
| `titulo` | Sim | Título da funcionalidade |
| `descricao` | Sim | Descrição em linguagem natural |
| `objetivo` | Sim | O que este recurso resolve/entrega |
| `entregáveis` | Não | Lista de arquivos/ componentes a serem gerados |
| `critérios-aceitacao` | Sim | Critérios mensuráveis de conclusão |
| `tipos-afetados` | Não | Arquivos ou interfaces TypeScript impactados |
| `guardrails-necessarios` | Não | Restrições operacionais para o agente |
| `especificacoes-dependentes` | Não | Outras SPECs que esta depende ou que dependem dela |

### 1.3 Critérios de Aceitação (Acceptance Criteria)

Critérios devem ser **verificáveis** e preferivelmente mensuráveis:

- ✅ "O componente renderiza sem erros de TypeScript"
- ✅ "O build (`npm run build`) termina sem erros"
- ✅ "O lint (`npm run lint`) não tem erros (apenas warnings)"
- ✅ "O tipocheck (`npm run typecheck`) passa integralmente"
- ✅ "O componente tem cobertura de teste mínima de X%"
- ✅ "A interface de agenda aparece corretamente no tema escuro"

Critérios **não** aceitáveis (subjetivos):
- ❌ "O código parece limpo"
- ❌ "O agente disse que funcionou"
- ❌ "Acho que o design está bom"

---

## 2. Níveis de Aplicação do MEF

### 2.1 MEF-1 — Essencial

| Característica | Descrição |
|----------------|-----------|
| **Escopo** | Sites e aplicações simples |
| **Git** | Versionamento básico com commits significativos |
| **Contexto** | `AGENTS.md` e `CONTEXT.md` presentes |
| **Especificação** | SPECs para novas funcionalidades (opcional para correções simples) |
| **Lint** | `oxlint` configurado e passando |
| **Build** | `vite + tsc` succeeds |
| **Testes** | Testes manuais ou básicos; testes automatizados iniciais |
| **Guardrails** | Documentados em AGENTS.md; controce de filesystem básicos |
| **Auditoria** | Revisão manual de alterações (pull request) |
| **Deploy** | Manual em hospedagem estática |

**Critério objetivo**: Projeto onde uma mudança quebrada afeta apenas a experiência desse projeto específico, sem dados de clientes ou impacto financeiro direto.

---

### 2.2 MEF-2 — Empresarial

| Característica | Descrição |
|----------------|-----------|
| **Escopo** | APIs, SaaS e sistemas de negócio |
| **SDD** | Todas as funcionalidades têm SPEC documentada |
| **Testes** | Testes unitários, de integração e E2E automatizados |
| **CI/CD** | GitHub Actions (ou equivalente) com gates: typecheck → lint → build → test |
| **Guardrails** | Política desegurança formal; proteções de filesystem; gestão de segredos |
| **Auditoria** | Trilha completa: quem fez o que, quando, por quê (ADRs) |
| **Segredos** | Gerenciador dedicado (AWS Secrets Manager, Vault, ou env vars de deployment) |
| **Monitoramento** | Logs de operação, métricas de build/teste, alertas |
| **Deploy** | Automatizado com rollback capability |

**Critério objetivo**: Projeto com múltiplos usuários, dados de clientes, ou onde falha pode impactar receita, reputação ou compliance.

---

### 2.3 MEF-3 — Crítico

| Característica | Descrição |
|----------------|-----------|
| **Escopo** | Sistemas com dados sensíveis, integrações críticas, operações de alto impacto |
| **Isolamento** | Ambiente de execução separado (Docker containers, VMs, air-gapped) |
| **Aprovação Humana** | Gates formais humanos antes de qualquer operação de escrita em produção |
| **Trilha de Auditoria** | Registro imutável (append-only) de todas as operações; logs assinados/hasheados |
| **Monitoramento** | Observabilidade completa: traces, métricas, logs em tempo real |
| **Recuperação** | Estratégia formal de backup, restauração e resposta a incidentes |
| **Segurança** | Controles de acesso granular, MFA, segregação de deveres |
| **Compliance** | LGPD, GDPR, auditatórios exigidos por regulamentação |

**Critério objetivo**: Projeto onde falha pode resultar em perda de dados, violação de compliance, dano financeiro significativo ou risco à vida/segurança.

---

## 3. Como Determinar o Nível Certo

**Critério de definição de nível** (aplicar na ordem):

1. **Complexidade do sistema**: Quantas integrações? Quantos módulos? Quanta lógica de negócio?
2. **Risco de impacto se falhar**: Dados perdidos? Dinheiro? Reputação? Conformidade legal?
3. **Tipos de dados**: São sensíveis (PII, financeiros, de saúde)? São críticos para operação do cliente?
4. **Quantidade de usuários**: Internos apenas? Externos pagantes? Grande escala?

**Matriz simplificada**:

| Complexidade ↓ / Risco → | Baixo | Médio | Alto |
|---------------------------|-------|-------|------|
| **Baixo** | MEF-1 | MEF-1 | MEF-2 |
| **Médio** | MEF-1 | MEF-2 | MEF-2 |
| **Alto** | MEF-2 | MEF-2 | MEF-3 |

**Regra**: Quando em dúvida, subestimar é melhor que superestimar. Comece MEF-1 e evolua conforme o projeto cresce ou riscos se tornam claros.

---

## 4. Relação entre SDD e Níveis

| Nível | SDD Obrigatório? | Formato |
|-------|------------------|---------|
| MEF-1 | Recomendado para features novas | SPEC simplificado, checklist de gates |
| MEF-2 | **Sim** — para todas as novas features | SPEC completa com critérios de aceitação |
| MEF-3 | **Sim** — com revisão formal humana | SPEC + aprovação formal + ADR |

**Transição**: De MEF-1 para MEF-2, a exigência de SPEC passa de "recomendada" para "obrigatória". De MEF-2 para MEF-3, adiciona-se a revisão humana formal e trilha de auditoria imutável.

---

*Modelo de engenharia revisado: Sat Oct 31 2026*