# Princípios do MEF — Fundamentos

> **Princípios orientadores do Muirakitan Engineering Framework.** Estes principios definem o "porquê" da metodologia e devem ser referência para todas as decisões de engenharia.

## 1. IA como Copiloto, Nunca como Motor Fiscal

- **Princípio**: Modelos de linguagem grandes (LLMs) são ferramentas de aceleração, não autoridades de decisão.
- **Aplicação**: Regras críticas, decisões financeiras, operações de segurança e dados sensíveis devem ser tratados por lógica determinística.
- **Evidência**: Todo uso de IA deve ter "human-in-the-loop" para validação antes de efeitos críticos.

## 2. Contexto antes de Implementação

- **Princípio**: O código certo começa com a especificação certa.
- **Aplicação**: Nunca pular a fase de contexto e especificação (AGENTS.md, CONTEXT.md, ADRs).
- **Rastreabilidade**: Cada linha de código deve ser rastreável até um requisito, critério de aceitação ou ADR.

## 3. Governança por Documentação, Não por Restrição Arbitrária

- **Princípio**: Regras devem estar documentadas em lugar de fácil acesso (AGENTS.md, CONTEXT.md) e versionadas.
- **Aplicação**: Prompts ou instruções em Markdown sozinhos não são suficientes — os controles devem ser efetivos nos scripts, permissões e ambientes.
- **Verificação**: Gates automatizados (typecheck, lint, build) substituem supervisão manual para casos repetíveis.

## 4. Segurança pelo Princípio do Menor Privilégio

- **Princípio**: Agentes de IA devem ter o menor nível de acesso necessário para completar a tarefa.
- **Aplicação**: 
  - Arquivos de escrita fora de `src/`/`docs/` devem ser proibidos, a menos que justificados por ADR.
  - Operações de sistema (rm, git clean, reinicialização) devem ser bloqueadas no nível do ambiente.
  - Credenciais e secrets devem nunca ser transmitidos em prompts.

## 5. Verificação Contínua, Não Aprovação Final

- **Princípio**: Qualidade deve ser verificada em cada mudança, não apenas no final do projeto.
- **Aplicação**: Typecheck, lint e build devem passar em cada commit. testes automatizados garantem regressão.
- **Evidência**: Cada entrega deve ter comprovantes de validação (relatórios de build, coverage de testes, logs de lint).

## 6. Independência de Modelo

- **Princípio**: A metodologia não deve depender de um provedor específico de LLM.
- **Aplicação**: Instruções, guardrails e especificação devem ser válidas independentemente de qual modelo de IA estiver sendo utilizado.
- **Flexibilidade**: Migração entre modelos deve exigir apenas ajustes de prompt, não reestruturação da metodologia.

## 7. Separação entre Recuperado e Confiável

- **Princípio** (do pilar E - Knowledge & Integrations): RAG (Retrieval-Augmented Generation) e MCP (Model Control Protocol) são recursos complementares, **não mecanismos de segurança por si mesmos**.
- **Aplicação**: Conhecimento recuperado de bases de dados deve ser separado de instruções confiáveis. O AGENTS.md e CONTEXT.md sempre devem ter precedência sobre conhecimento recuperado.

## 8. Validade Proporcional

- **Princípio**: O nível de governança deve ser proporcional à complexidade e ao risco do projeto.
- **Aplicação**: 
  - Site institucional → MEF-1 Essencial (agenda, tipo, lint, build)
  - SaaS com múltiplos clientes → MEF-2 Empresarial (SDD, testes, CI/CD, guardrails)
  - Sistema com dados sensíveis/crítico → MEF-3 Crítico (isolamento, auditoria, aprovação humana formal)

---

*Princípios revisados: Sat Oct 31 2026*