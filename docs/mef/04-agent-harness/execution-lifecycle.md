# Execution Lifecycle — Ciclo de Execução do Agente

> **Princípio MEF**: "LLM != motor fiscal. IA interpreta, o motor decide. Evidências primeiro, adivinhação nunca."

Este documento define o ciclo de vida completo de uma tarefa assistida por IA, desde o início até a conclusão e arquivo. Cada fase tem gates obrigatórios e entregáveis esperados.

## 1. Fases do Ciclo de Execução

### 1.1 Fase 1: Aquisição de Contexto (0-5 minutos)

**Objetivo**: Garantir que o agente tenha todas as informações necessárias antes de iniciar qualquer implementação.

| Atividade | Tempo | Entregável |
|-----------|-------|------------|
| Ler `AGENTS.md` | 2-3 min | Conhecer regras "what/what-not-to-do" |
| Ler `CONTEXT.md` | 3-5 min | Conhecer arquitetura, tipos, regras de negócio |
| Revisar `docs/mef/principles.md` | 2 min | Compreender princípios orientadores |
| Definir escopo da tarefa | 2 min | O que será feito? Para que? Qual impacto? |

**Checkpoint 1** (após fase 1): O agente pode responder:
- ✅ "Quais as regras principais deste projeto?"
- ✅ "Quais arquivos posso modificar com segurança?"
- ✅ "Quais gates devo executar antes de finalizar?"
- ✅ "Quais são os riscos desta tarefa?"

---

### 1.2 Fase 2: Planejamento e Predictabilidade (5-10 minutos)

**Objetivo**: Planejar a implementação de forma previsível e rastreável.

| Atividade | Tempo | Entregável |
|-----------|-------|------------|
| Identificar arquivos afetados | 3-5 min | Lista de arquivos a modificar/criar |
| Verificar gates base-line | 2-3 min | Rodar `npm run typecheck` no estado atual |
| Definir critérios de aceitação | 3-5 min | Escrever SPEC-resumo ou checklist |
| Identificar guardrails aplicáveis | 2-3 min | Quais restrições operacionais se aplicam? |

**Checkpoint 2** (após fase 2): O agente tem plano escrito:
- ✅ "Vou modificar esses 3 arquivos"
- ✅ "Vou rodar esses 3 gates"
- ✅ "Se algo falhar, farei o seguinte..."
- ✅ "Estes guardrails se aplicam: [lista]"

---

### 1.3 Fase 3: Implementação (10-60 minutos)

**Objetivo**: Executar a mudança de código seguindo padrões e guardrails.

| Atividade | Tempo | Entregável |
|-----------|-------|------------|
| Implementar a mudança | Variável | Código novo/atualizado |
| Aplicar padrões do códigobase | Durante toda a implementação | Código consistente com o existente |
| Respeitar guardrails | Durante toda a implementação | Nenhuma proibição violada |

**Princípios-chave durante implementação**:
- ✅ **Pequenas etapas**: Fazer mudanças menores, testar gates após cada uma
- ✅ **Verificação frequente**: Rodar `typecheck` a cada 30 min ou após mudanças significativas
- ✅ **Se travar**: Pausar, consultar dokumentação, não "forçar" solução
- ✅ **Se descobrir algo novo**: Atualizar plano; não continuar cegamente

**Exemplo de progresso seguro**:
```
Step 1: Criar componente → npm run typecheck → ✓
Step 2: Adicionar tipos → npm run typecheck → ✓
Step 3: Estilizar → npm run lint → ✓ (apenas warnings)
Step 4: Build → npm run build → ✓
Step 5: Commit → mensage completo
```

---

### 1.4 Fase 4: Validação e Gates (5-10 minutos)

**Objetivo**: Executar gates obrigatórios e garantir qualidade antes de finalizar.

| Gate | Comando | Status Esperado | Ação se Falhar |
|------|---------|-----------------|----------------|
| **Typecheck** | `npm run typecheck` | Sem erros de tipo | Corrigir erros de tipo; não commitar com type errors |
| **Lint** | `npm run lint` | Sem erros (warnings ok) | Corrigir avisos; se error, obrigatório corrigir |
| **Build** | `npm run build` | Sucesso (dist/ gerada) | Corrigir erro de build; não commitar build quebrado |

**Checkpoint 3** (após fase 4): Todos os gates passaram:
- ✅ `npm run typecheck` — passou
- ✅ `npm run lint` — passou (ou apenas warnings esperados)
- ✅ `npm run build` — sucesso

**Se qualquer gate falhar**:
1. **Pare a implementação** — não continue codando
2. **Analisar erro** — ler mensagem de erro com atenção
3. **Corrigir** — fazer o mínimo necessário para passar
4. **Reexecutar gate** — confirmar que passou
5. **Se for repetindo erro**: Pausar e consultar supervisão/human

---

### 1.5 Fase 5: Documentação e Registro (5 minutos)

**Objetivo**: Registrar o que foi feito para rastreabilidade futura.

| Atividade | Tempo | Entregável |
|-----------|-------|------------|
| Atualizar `CONTEXT.md` se necessário | 2-3 min | Nova regra, tipo, arquitetura documentada |
| Criar/atualizar ADR se mudança arquitetônica | 2-3 min | Registrar decisão com contexto e consequências |
| Verificar `AGENTS.md` está atualizado | 1 min | Se novas regras surgiram, atualizar |
| Preparar commit message | 1-2 min | Mensagem clara referenciando SPEC/ADR |

**Exemplo de atualização de CONTEXT.md** (bloco diff):
```
@@ -10,6 +10,7 @@
 export const BRAND = {
   name: 'Muirakitan Agência',
   legalName: 'Muirakitan Tecnologia',
   eyebrow: 'Agência de tecnologia com IA governada',
+  # NOVO: tagline reforçando MEF-1
   tagline:
     'Desenvolvimento assistido por IA com governança...',
 }
```

**Exemplo de commit message**:
```
feat: add responsive services grid (SPEC-001)
- Grid de 1 a 3 colunas baseado em viewport
- Dados puxados de src/data/services.ts
- Gates: typecheck ✓ lint ✓ build ✓
- Ref: SPEC-001, CONTEXT.md atualizada
```

---

### 1.6 Fase 6: Fechamento e Arquivamento (3 minutos)

**Objetivo**: Finalizar a tarefa e garantir que nada fique "solto".

| Atividade | Tempo | Entregável |
|-----------|-------|------------|
| Verificar se há arquivos temporários | 1 min | Remover ou documentar arquivos criado temporariamente |
| Confirmar que todos gates ainda passam | 1 min | `npm run typecheck && npm run lint && npm run build` |
| Fazer commit final | 1 min | Commint with referência a SPEC/ADR/checklist |

**Checkpoint final**: Tarefa considerada concluída quando:
- ✅ Código implementado
- ✅ Todos gates passaram
- ✅ Documentação atualizada (CONTEXT.md, AGENTS.md se necessário)
- ✅ Commit feito com mensagem clara
- ✅ Nenhum arquivo temporário deixando "porcaria" no repositório

---

## 2. Checkpoints Obrigatórios

Checkpoints são pontos de "salva-game" onde o agente pode garantir que o estado é consistente antes de continuar ou retomar após interrupção.

### 2.1 Checkpoint 1: Contexto Lido (Após Fase 1)

```
✅ AGENTS.md lido
✅ CONTEXT.md lido  
✅ Principles lidos
✅ Escopo da tarefa definido
✅ Gates identificados
```

### 2.2 Checkpoint 2: Plano Definido (Após Fase 2)

```
✅ Arquivos afetados identificados
✅ Gates base-line rodados
✅ Critérios de aceitação definidos
✅ Guardrails mapeados
✅ Plano de implementação escrito
```

### 2.3 Checkpoint 3: Implementação Concluída (Após Fase 3)

```
✅ Código escrito seguindo padrões
✅ Nenhum guardrail violado
✅ Mudança funcional (testada manualmente se apropriado)
```

### 2.4 Checkpoint 4: Gates Passados (Após Fase 4)

```
✅ typecheck passou
✅ lint passou
✅ build passou
```

### 2.5 Checkpoint 5: Fechamento (Após Fase 6)

```
✅ Documentação atualizada
✅ Commit final feito
✅ Nenhum arquivo órfão
✅ Tarefa encerrada
```

---

## 3. Recuperação após Interrupção

### 3.1 Cenário: Agente Foi Interrompido Metade da Tarefa

1. **Verificar estado atual**: `git status`, `git log -3`
2. **Restaurar checkpoint anterior** se houver:
   - `git stash list` para ver stashes salvos
   - Ou recomeçar da Fase 1 se não houver checkpoint
3. **Reexecutar Fase 1** (leitura de contexto) — essencial, pois o contexto pode ter cambiado se outros commits aconteceram
4. **Continuar da Fase apropriada** baseado no que foi concluído

### 3.2 Cenário: Build Quebrou durante a Tarefa

1. **Não commitar** o código quebrado
2. **Usar `git stash`** para salvar trabalho atual
3. **Reverter última mudança** se necessário: `git revert <commit-hash>` ou `git reset --soft HEAD~1` (sem `--hard`!)
4. **Identificar o que quebrou** — ler erros do typecheck/lint/build
5. **Corrigir** e reexecutar gates
6. **Continuar** da fase onde falhou (geralmente Fase 4 ou reiniciar da Fase 3)

**Regra crítica**: NUNCA usar `git reset --hard`. Usar apenas `git revert`, `git stash`, ou trabalho manual para recuperar estado.

### 3.3 Cenário: Guardrail Foi Violado Acidentalmente

1. **Pare imediatamente** o que está fazendo
2. **Avaliar dano** — quais regras foram quebradas?
3. **Plano de reversão**:
   - Se foi arquivo modificado: `git revert` ou reescrever o arquivo
   - Se foi operação de sistema: verificar se há backup/log
4. **Registrar ADR** sobre o que aconteceu e como evitar no futuro
5. **Reexecutar gates** após reversão
6. **Continuar** após tudo restaurado edocumentado

---

## 4. Evidências de Validação

Cada tarefa deve gerar evidências documentais. O mínimo exigido por nível:

| Nível | Evidências Obrigatórias |
|-------|------------------------|
| **MEF-1** | ✅ Commit message claro<br>✅ Gates passam (typecheck/lint/build)<br>✅ CONTEXT.md atualizada se houver nova regra |
| **MEF-2** | ✅ Todo MEF-1 + ✅ SPEC documentada<br>✅ Critérios de aceitação registrados<br>✅ Testes executados e resultados<br>✅ Link issue/SPEC no commit |
| **MEF-3** | ✅ Todo MEF-2 + ✅ ADR registrado (decão arquitetônica)<br>✅ Trilha de auditoria completa<br>✅ Revisão humana registrada<br>✅ Métricas de cobertura e validação<br>✅ Logs de operação salvos |

**Evidências de validação por gate**:

| Gate | Evidência Gerada |
|------|-----------------|
| `npm run typecheck` | Relatório de erros (ou "0 errors") — pode ser screenshot ou texto no commit |
| `npm run lint` | Relatório de avisos/erros — texto no commit ou link para output do terminal |
| `npm run build` | Confirmação de pasta dist/ gerada — pode listar arquivos gerados |
| `npm test` (se houver) | Contagem de testes passando/total — incluir no commit/message |

---

## 5. Integração com o Fluxo Git

### 5.1 Branch Strategy (MEF-1 Simplificada)

```
main (produção estável)
    ↓
feature/DESCRICAO-CURTIA (branche para nova tarefa)
    ↓
Após conclusão: merge via pull request
    ↓
main atualizada
```

**Rules for branches**:
- ✅ Sempre criar branch a partir de `main` atualizada
- ✅ Nunca commitar diretamente em `main`
- ✅ Nome da branch ser descritivo: `feature/agenda-mobile` ou `fix/validacao-email`
- ✅ Manter branch atualizada com `main` (`git pull --rebase`)
- ✅ Fazer merge apenas após todos gates passarem

### 5.2 Commit Message Convention

```
<Tipo>: <descrição curta> (<referência>)

[corpo opcional - detalhes da mudança]

- <checklist item> ✓
- <checklist item> ✓
```

| Tipo | Significado | Exemplo |
|------|-------------|---------|
| `feat` | Nova funcionalidade | `feat: add services grid (SPEC-001)` |
| `fix` | Correção de bug | `fix: validate email format (SPEC-005)` |
| `doc` | Atualização de documentação | `doc: update CONTEXT.md with new brand` |
| `style` | Formatação, missing semi, etc. | `style: format code with prettier` |
| `refactor` | Refatoração sem mudança de comportamento | `refactor: extract component ServiceIcon` |
| `test` | Adição de testes | `test: add unit test for slots utility` |
| `chore` | Atualização de tarefas/ferramentas | `chore: update dependencies` |

**Exemplo completo**:
```
feat: add responsive services grid (SPEC-001)

- Grid responsivo: 1 coluna < 640px, 3 colunas >= 640px
- Dados de services.ts mapeados corretamente
- Componentes seguem padrão visual existente

Gates: typecheck ✓ lint ✓ build ✓
Ref: SPEC-001, CONTEXT.md atualizada com nova regra de grid
```

---

## 6. Pós-Entrega: Manutenção e Evolução

### 6.1 Quando uma Feature Precisa de Manutenção

| Cenário | Ação |
|---------|------|
| Bug descoberto pós-deploy | Criar novo SPEC/issue; seguir ciclo de execução |
| Nova regra de negócio | Atualizar CONTEXT.md; criar ADR se arquitetônica; atualizar AGENTS.md se guardrail |
| Mudança de design | Verificar regra 5 (não modificar design sem aprovação); se for mudança visual controlada, seguir MEF-1 checklist |
| Performance issue | Criar SPEC de performance; adicionar testes; verificar build/lint/typecheck |

### 6.2 Evolução de Nível MEF

| Sinal de que é hora de evoluir | Próximo Nível | O Que Mudar |
|--------------------------------|---------------|-------------|
| MEF-1 se tornando limitado (projeto crescendo) | MEF-2 | Implementar CI/CD, testes automatizados, SPEC completos, gestão de segredos |
| MEF-2 atingindo limites (dados sensíveis entrando) | MEF-3 | Isolamento reforçado, auditoria formal, monitoramento, aprovação humana para ops críticas |
| Novos requisitos de compliance | Qualquer nível | Adicionar requisitos específicos; atualizar documentos; possivelmente subir de nível |

**Critério de evolução**: Quando o projeto passar consistentemente pelos limites do nível atual E houver novos riscos/requisitos que o nível atual não cobre, evoluir para o próximo nível.

---

*Execution Lifecycle revisado: Sat Oct 31 2026*