# Critérios de Aceitação (Acceptance Criteria)

> **Princípio MEF**: "LLM != motor fiscal. IA interpreta, o motor decide. Evidências primeiro, adivinhação nunca."

Os **Critérios de Aceitação** são a base da verificação no MEF. Eles devem ser **objetivos, mensuráveis e verificáveis** — nunca subjetivos ("parece bom", "acho que funciona").

## 1. Características dos Critérios de Boa Qualidade

| Característica | Descrição | Exemplo |
|----------------|-----------|---------|
| **Verificável** | Pode ser confirmado como verdadeiro ou falso | "O componente renderiza sem erros" ✅ |
| **Mensurável** | Pode ser quantificado | "O build leva ≤ 30 segundos" ✅ |
| **Atômico** | Um único conceito, não múltiplos | "O botão tem cor de fundo correta" ✅<br>"O botão é funcional e tem texto correto" ❌ (dois conceitos) |
| **Não ambíguo** | Sem interpretação subjetiva | "A cor é #0B7D61" ✅<br>"A cor é bonita" ❌ |
| **Independente** | Pode ser testado isoladamente | Testar login sozinho ✅<br>Testar login + checkout juntos ❌ (acoplado) |

---

## 2. Níveis de Qualidade pelos Níveis MEF

### 2.1 MEF-1 — Essencial

| Nível | Tipo de Critério | Exemplos |
|-------|-----------------|----------|
| **Básico** | Verificação manual | "Ao abrir a página, o título aparece" |
| **Intermediário** | Comandos automatizados | `npm run build` termina sem erros<br>`npm run lint` — apenas warnings |
| **Avançado** | Testes unitários básicos | Componente renderiza sem crash<br>Formulário envia com dados válidos |

**Critérios obrigatórios MEF-1**:
- ✅ `npm run typecheck` — sem erros de tipo
- ✅ `npm run lint` — sem erros (warnings ok)
- ✅ `npm run build` — sucesso (dist/ gerada)
- ✅ Funcionalidade crítica testada manualmente

---

### 2.2 MEF-2 — Empresarial

| Nível | Tipo de Critério | Exemplos |
|-------|-----------------|----------|
| **Básico** | Múltiplos gates automatizados | CI/CD: typecheck → lint → build → test |
| **Intermediário** | Testes unitários + integração | `npm test` — X testes passando |
| **Avançado** | Cobertura de código + E2E | Coverage ≥ 80%<br>Cypress/E2E testes críticos |

**Critérios obrigatórios MEF-2**:
- ✅ `npm run typecheck` — passar
- ✅ `npm run lint` — passar
- ✅ `npm run build` — passar
- ✅ `npm test` — todos os testes passando (mínimo)
- ✅ Critérios de aceitação documentados para cada feature (SPEC)

---

### 2.3 MEF-3 — Crítico

| Nível | Tipo de Critério | Exemplos |
|-------|-----------------|----------|
| **Básico** | Suite completa de testes + monitoramento | Testes unitários + integração + E2E |
| **Intermediário** | Cobertura alta + validação de segurança | Coverage ≥ 90%<br>Testes de vulnerabilidade |
| **Avançado** | Testes formais verificados + auditoria | Proofs matemáticos de correção<brTrilha de auditoria completa |

**Critérios obrigatórios MEF-3**:
- ✅ Todos os critérios MEF-2
- ✅ Suite de testes automatizados com cobertura reportada
- ✅ Testes de regressão automática em cada commit
- ✅ Validação de segurança (vulnerabilities scan)
- ✅ Trilha de auditoria: quem aprovou o que e quando

---

## 3. Como Escrever Critérios de Aceitação Verificáveis

### 3.1 Fórmula Boa

```
[Condição] + [Ação/Resultado] + [Expected Output] + [Como Validar]
```

### 3.2 Exemplos Transformados

| Ruim (Subjetivo) | Bom (Verificável) |
|------------------|-------------------|
| "O formulário funciona" | "Ao preencher todos os campos válidos e submeter, o agendamento é criado e mensagem de sucesso aparece" |
| "O site carrega rápido" | "O Time to Interactive é ≤ 3 segundos em conexão 3G, medido pelo Lighthouse" |
| "O design está correto" | "O componente usa token `text-accent` para cor do texto e `bg-accent` para fundo (verificado via inspeção de elemento)" |
| "Os testes passam" | "`npm test` — 12 de 12 testes passando" |
| "O código está limpo" | "`npm run lint` — 0 erros (apenas warnings)" |

---

## 4. Tipos de Critérios por Área

### 4.1 Critérios de Tipo (TypeScript)

| Critério | Como Validar |
|----------|---------------|
| Tipo está correto | `npm run typecheck` — não deve haver erros |
| Interface tem todos campos obrigatórios | Verificar que tipo de objeto satisfaz a interface |
| Type narrowing funciona | Testar diferentes variações de dado |

### 4.2 Critérios de Componente (React)

| Critério | Como Validar |
|----------|---------------|
| Componente renderiza | `react-test-renderer` ou inspeção visual<br>`npm run build` — não quebra |
| Props são tipadas corretamente | `npm run typecheck` passando com os props esperados |
| Eventos são manipulados | Simular evento, verificar callback foi chamado |
| Accessibility básico | Verificar que não há warnings de accessibility no lint |

### 4.3 Critérios de Build/Deploy

| Critério | Como Validar |
|----------|---------------|
| Build succeeds | `npm run build` — pasta dist/ gerada sem erros |
| Asset sizes são esperados | `npx vite build --mode analyze` ou verificar tamanho da pasta dist/ |
| Output está no formato esperado | Verificar arquivos em dist/ (index.html, assets/js, assets/css) |

### 4.4 Critérios de Funcionalidade (Negócio)

| Critério | Como Validar |
|----------|---------------|
| Agendamento cria registro | Preencher formulário, verificar localStorage tem novo item |
| E-mail inválido é rejeitado | Preencher com e-mail inválido, verificar mensagem de erro |
| Responsividade funciona | Abrir DevTools, mudar viewport, verificar layout |
| Link externos funcionam | Clicar, verificar redirect para URL esperada |

### 4.5 Critérios de Segurança

| Critério | Como Validar |
|----------|---------------|
| Senhas não são salvas em texto | Revisar código, verificar hash/encryption |
| Credenciais não estão em código | Verificar que `config.ts` não tem secrets hardcoded |
| XSS é mitigado | Revisar onde dados do usuário são inseridos no DOM |

---

## 5. Checklist de Critérios de Aceitação

Antes de considerar uma feature "terminada", verificar:

### 5.1 Checklist Padrão (MEF-1)

- [ ] Critério de aceitação escrito (em SPEC ou comentário de tarefa)
- [ ] `npm run typecheck` passa
- [ ] `npm run lint` passa (sem erros)
- [ ] `npm run build` passa
- [ ] Funcionalidade testada manualmente
- [ ] Comportamento consistente com o restante do site
- [ ] Design visual consistente (mesmo tema, cores, fontes)

### 5.2 Checklist Estendido (MEF-2)

- [ ] Todo o checklist MEF-1
- [ ] `npm test` — todos testes passando
- [ ] Critérios de aceitação documentados em SPEC
- [ ] Cobertura de teste mínima identificada
- [ ] Comportamento em diferentes browsers testado (se aplicável)
- [ ] Performance baseline identificada (Lighthouse, se relevante)

### 5.3 Checklist Completo (MEF-3)

- [ ] Todo o checklist MEF-2
- [ ] Cobertura de teste reportada (≥ 90% ou meta definida)
- [ ] Testes de regressão automática configurados
- [ ] Validação de segurança passada
- [ ] Trilha de auditoria registrada (quem aprovou, quando)
- [ ] Documentação de rollback procedure disponível

---

## 6. Registrando Critérios no Fluxo de Trabalho

### 6.1 No Template SPEC

Os critérios de aceitação vão no campo 5 do template SPEC (ver `docs/mef/03-sdd/specification-process.md`). Cada critério deve ter:

```
✅ CRITÉRIO X: [descrição verificável]
  - Como validar: [comando/teste/inspeção]
  - Passou em: [data] por [quem/responsável]
```

### 6.2 No Commit Message

O commit deve referenciar os critérios aprovados:

```
feat: implementar X feature (SPEC-001)
- Critério 1 atendido: [descrição resumida]
- Critério 2 atendido: [descrição resumida]
- Gates: typecheck ✓ lint ✓ build ✓
```

### 6.2 No Pull Request

PR description deve incluir:

- Link/referência ao SPEC (se houver)
- Checklist de critérios de aceitação marcado
- Comando de como validar manualmente (se aplicável)
- Quem fez a revisão doscritérios

---

## 7. Erros Comuns ao Definir Critérios

| Erro | Como Evitar |
|------|-------------|
| Crítérios muito abstratos | Tornar verificável com comando/teste específico |
| Múltiplos conceitos em um único critério | Dividir em critérios separados |
| Critérios dependentes de "boa-fé" | Substituir por evidências objetivas |
| Esquecer de validar em ambiente real | Testar com `npm run build` + inspeção manual |
| Critérios óbvios demais (sempre verdadeiros) | Garantir que haja condição de "falha" possível |
| Critérios não testados | Sempre executar o comando de validação após implementação |

---

## 8. Relação com Gates Obrigatórios

| Gate MEF-1 | Critério de Aceitação Correspondente |
|------------|--------------------------------------|
| `npm run typecheck` | Todos os tipos estão corretos; não há erros de tipo novos |
| `npm run lint` | Nenhum erro de lint novo (apenas warnings conservadores) |
| `npm run build` | Build succeeds; pasta dist/ gerada corretamente |
| Validação manual | Critérios de funcionalidade verificados |

**Regra**: Nenhum commit é aceito sem que todos os gates correspondentes da seu nível MEF passem.

---

*Acceptance Criteria revisado: Sat Oct 31 2026*