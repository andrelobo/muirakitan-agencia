# Piloto de engenharia reversa — roteiro operacional

> **Status:** plano para o primeiro piloto · atualizado em 03/11/2026
> **Base:** [`muirakitan-reverse`](https://github.com/andrelobo/muirakitan-reverse) — Fase 0 concluída
> **Objetivo:** validar o pipeline completo em um alvo controlado e produzir o primeiro estudo de caso com métricas reais.

---

## 1. Por que fazer o piloto

O laboratório tem método, agentes, templates e harness prontos, mas **nenhuma análise executada**. Sem piloto:

- não há números de prazo, cobertura ou equivalência;
- não há case para o site;
- não há calibragem de esforço comercial;
- os templates não foram testados de ponta a ponta.

O piloto existe para transformar a metodologia em **entrega reproduzível** — e só depois em oferta comercial com promessa de prazo.

---

## 2. Pré-requisitos (bloqueantes)

- [ ] Pelo menos **15 GB livres** no host de trabalho.
- [ ] Ambiente isolado (container ou VM) subindo e sendo destruído com um comando.
- [ ] Playwright MCP conectado ao alvo local.
- [ ] Alvo escolhido e licença verificada.
- [ ] `templates/authorization-scope.md` preenchido e salvo em `evidence/authorization/`.
- [ ] Manifesto SHA-256 inicial gerado.

Se qualquer item acima falhar, o piloto não começa. O gate G0 não é negociável.

---

## 3. Escolha do alvo

**Critérios:**

- aplicação SaaS/Web com frontend, backend e documentação parcial;
- código aberto com licença que permita análise;
- roda localmente ou em ambiente de teste reproduzível;
- tem pelo menos um fluxo crítico com regra de negócio real;
- **não** é firmware, binário fechado ou sistema de terceiro sem autorização.

**Evitar:**

- alvo gigante (mais de 50 fluxos) — o piloto perderia foco;
- alvo sem banco ou sem autenticação — pouca superfície de análise;
- sistema de cliente real — primeiro valide o método em ambiente controlado;
- firmware — fica para a Fase 2/3.

**Sugestão de escopo:** um módulo de negócio (ex.: pedidos, assinaturas, reservas), com autenticação e pelo menos três perfis de usuário.

---

## 4. Cronograma (15 dias úteis)

| Dia | Etapa | Entrega |
|---|---|---|
| D1 | Setup e G0 | autorização registrada, ambiente isolado, baseline e hash do alvo |
| D2–D3 | RE-01 Discovery | inventário, mapa de superfícies, atores, desconhecidos |
| D4–D5 | RE-02 Inspection | mapa de componentes, grafo de dependências, ADRs iniciais |
| D6–D8 | RE-03 Behavioral | endpoints, fluxos, caminhos de erro, HAR, screenshots |
| D9–D10 | RE-04 Specification | requisitos, contratos OpenAPI, critérios de aceite |
| D11–D13 | RE-05 Reconstruction | um módulo crítico reimplementado + testes |
| D14 | RE-06 Validation | equivalência funcional, divergências, riscos residuais |
| D15 | Encerramento | relatório executivo, anexo técnico, case e retro |

> A reconstrução é **um slice pequeno**, não o sistema inteiro. O objetivo é provar o ciclo, não entregar um produto completo em 15 dias.

---

## 5. Entregáveis

### Para o cliente/patrocinador

- relatório executivo (contexto, riscos, prioridades, próximos passos);
- apresentação de encerramento (45–60 min);
- resumo de cobertura: o que foi analisado e o que ficou fora.

### Técnicos

- `docs/discovery/inventory.md` e `surface-map.md`;
- `docs/architecture/component-map.md` e `dependency-graph.md`;
- `docs/api-analysis/endpoints.md`, `flows.md` e `state-machines.md`;
- `specs/requirements/*.md`, `specs/contracts/*.yaml`, `specs/acceptance/*.feature`;
- `src/**` e `tests/**` do slice reconstruído;
- `docs/reconstruction/equivalence-report.md`;
- `docs/security/findings.md`;
- `evidence/hashes/manifest.json` atualizado.

### Para a Muirakitan

- estudo de caso com números reais;
- calibragem de esforço por etapa;
- lista de atritos de ferramenta e template;
- decisão go/no-go para vender a oferta.

---

## 6. Métricas do piloto

| Métrica | Meta inicial | Onde medir |
|---|---:|---|
| Tempo até o primeiro inventário útil | ≤ 1 dia | data em `inventory.md` |
| Funcionalidades mapeadas e documentadas | ≥ 80% | `inventory.md` vs alvo |
| Fluxos críticos com evidência | ≥ 70% | `flows.md` + `evidence/` |
| Critérios de aceite com teste | 100% do slice | `specs/acceptance` + `tests/` |
| Testes de equivalência aprovados | ≥ 90% | relatório de equivalência |
| Tempo de reconstrução vs. convencional | ≤ 60% | comparação com estimativa do operador |
| Evidências com SHA-256 | 100% | `manifest.json` |
| Achados sem evidência | 0 | revisão do operador |

Metas são hipóteses de trabalho. O piloto mede; não maquia.

---

## 7. Papéis

| Papel | Responsabilidade |
|---|---|
| Operador/owner | aprova G0, escopo, horário e encerramento; assina o relatório |
| Orchestrator | valida autorização, decompõe etapas, aciona especialistas, mantém gates |
| Discovery | inventário e superfícies |
| Analysis | arquitetura, dependências, fluxos e contratos |
| Security | riscos, configurações e achados |
| Specification | requisitos, contratos e critérios de aceite |
| Revisor humano | confere evidência, confiança e texto final |

Nenhum agente assina relatório. A assinatura é humana.

---

## 8. Gates

| Gate | Critério | Aprovador |
|---|---|---|
| G0 | Autorização escrita + escopo + janela | Operador |
| G1 | Inventário cobre superfícies conhecidas e lista desconhecidos | Operador |
| G2 | Dependências críticas com versão e status | Orchestrator |
| G3 | Fluxos críticos observados, não presumidos | Operador |
| G4 | Especificação rastreável; novo vs. reconstruído separado | Operador |
| G5 | Cada critério de aceite tem teste | Orchestrator |
| G6 | Relatório declara o que ficou fora do escopo | Operador |

---

## 9. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Disco/isolação insuficientes | resolver antes de D1; sem isso, não iniciar |
| Escopo crescer durante a análise | congelar o slice no D1; mudanças só por aditivo |
| Agente tratar hipótese como fato | revisão humana + escala de confiança obrigatória |
| Vazamento de dados/segredos | dados sintéticos, redaction, `.gitignore`, revisão do manifesto |
| Ferramentas de binário ausentes | piloto 100% web/API; não prometer binário |
| Reconstrução consumir o cronograma | limitar a um módulo e aceitar cobertura parcial declarada |
| Relatório técnico demais para o gestor | exigir resumo executivo separado e revisão de linguagem |

---

## 10. Critérios de go/no-go para comercializar

**Go se:**

- [ ] G0–G6 registrados e aprovados;
- [ ] todas as afirmações têm evidência e confiança;
- [ ] o relatório executivo foi lido por alguém não técnico e entendido;
- [ ] as métricas do §6 foram medidas e registradas;
- [ ] nenhuma ação fora do escopo ocorreu;
- [ ] o case foi aprovado para uso público (ou anonimizado).

**No-go se:**

- houve acesso sem autorização;
- o relatório não distingue fato de hipótese;
- não há teste para os critérios de aceite;
- o case depende de dados que não podem ser publicados;
- as ferramentas de binário forem necessárias para a promessa comercial.

---

## 11. Depois do piloto

1. Publicar o case (com números reais e limites).
2. Criar a página de serviço no site da Muirakitan.
3. Rodar um segundo piloto em domínio diferente (API sem documentação).
4. Só então abrir proposta de reconstrução com prazo calibrado.
5. Instalar Ghidra/Binwalk/Frida e wrappers MCP para a Fase 2.
