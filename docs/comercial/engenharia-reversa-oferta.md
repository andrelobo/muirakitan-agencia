# Engenharia reversa assistida — oferta comercial

> **Status:** rascunho para validação do owner · atualizado em 03/11/2026
> **Base metodológica:** [`muirakitan-reverse`](https://github.com/andrelobo/muirakitan-reverse) (Fase 0)
> **Público:** empresas com sistemas críticos, legados ou integrações sem documentação
> **Regra:** nenhum trabalho começa sem autorização escrita do titular.

---

## 1. Em uma frase

**Investigamos sistemas existentes com método, evidência e IA governada — para documentar, integrar, modernizar ou reconstruir sem depender da memória de quem construiu.**

Não vendemos “hackear” nem “engenharia reversa” como curiosidade técnica. Vendemos clareza sobre sistemas que ninguém entende mais — com escopo, evidência e limites declarados.

---

## 2. Quando faz sentido contratar

| Situação do cliente | O que ele recebe |
|---|---|
| “O sistema funciona, mas ninguém sabe como foi construído.” | Inventário, mapa de dependências e documentação executável |
| “Quero sair de uma tecnologia antiga, mas tenho medo de quebrar a operação.” | Diagnóstico de acoplamentos e plano de modernização por etapas |
| “Perdi o desenvolvedor que conhecia o sistema.” | Conhecimento extraído do artefato, não da memória de uma pessoa |
| “Preciso integrar uma plataforma sem documentação.” | Contrato de API inferido e validado por comportamento |
| “Quero saber se minha aplicação está exposta.” | Avaliação de segurança autorizada, com achados reproduzíveis |

Sinal típico de compra: o cliente já sabe que precisa mexer no sistema, mas **não consegue estimar risco, prazo ou custo** porque não entende o que existe lá dentro.

---

## 3. Ofertas

### 3.1 Diagnóstico de legado

**Indicado quando:** o sistema é antigo, a documentação é incompleta e há dependência de um fornecedor ou de uma pessoa específica.

**Entregáveis:**
- inventário de superfícies, tecnologias e pontos de entrada;
- mapa de componentes, dependências e versões;
- documentação dos fluxos e APIs principais;
- lista de riscos técnicos e operacionais;
- plano de modernização por etapas, com prioridades.

**Prazo estimado:** 5 a 10 dias úteis, dependendo do tamanho do alvo.

---

### 3.2 Contrato de API

**Indicado quando:** é preciso integrar com uma plataforma sem documentação, ou validar se a documentação existente corresponde ao comportamento real.

**Entregáveis:**
- mapa de endpoints, autenticação, parâmetros e erros;
- fluxos observados, incluindo caminhos de exceção;
- contrato OpenAPI;
- testes de aceitação;
- guia de integração para o time do cliente.

**Prazo estimado:** 5 a 10 dias úteis por conjunto de fluxos.

---

### 3.3 Reconstrução assistida

**Indicado quando:** o cliente quer substituir ou evoluir o sistema sem simplesmente copiar o código original.

**Entregáveis:**
- especificação de requisitos rastreável à evidência;
- distinção explícita entre requisito **reconstruído** e requisito **novo**;
- critérios de aceitação em formato executável;
- nova arquitetura e implementação independentes;
- relatório de equivalência funcional, com divergências justificadas.

**Prazo estimado:** 4 a 8 semanas por módulo, após o diagnóstico. Não é um pacote fechado: o escopo é fatiado para reduzir risco.

---

### 3.4 Avaliação de segurança assistida

**Indicado quando:** o cliente precisa de uma leitura de risco antes de expor uma aplicação, integrar um parceiro ou assumir um sistema legado.

**Entregáveis:**
- análise estática de código e configuração;
- dependências vulneráveis e status de manutenção;
- revisão de autenticação, autorização e exposição de APIs;
- achados com evidência, severidade e recomendação;
- relatório executivo + anexo técnico.

**Prazo estimado:** 3 a 5 dias úteis, conforme escopo.

**Limite importante:** encontrarmos um problema não autoriza explorá-lo. Teste de exploração só existe se estiver explicitamente autorizado, em ambiente isolado e com janela definida.

---

## 4. Como o trabalho é conduzido

O método tem seis etapas e gates entre elas:

| Etapa | Pergunta | Artefato principal |
|---|---|---|
| **RE-01 Discovery** | O que existe e quem pode acessar? | inventário e mapa de superfícies |
| **RE-02 Inspection** | Como as peças se conectam? | mapa de componentes e dependências |
| **RE-03 Behavioral** | O que o sistema faz de verdade? | endpoints, fluxos, HAR, screenshots |
| **RE-04 Specification** | O que ele precisa ser, formalmente? | requisitos, contratos, aceitação |
| **RE-05 Reconstruction** | Como reconstruir sem copiar? | nova implementação independente |
| **RE-06 Validation** | O novo se comporta como o original? | relatório de equivalência |

**Gate G0 é bloqueante:** sem autorização assinada, escopo e janela, nada é analisado. Os demais gates garantem que nenhuma etapa avança com artefato faltando.

O padrão de afirmação é sempre:

> **Afirmação · Evidência (arquivo + SHA-256) · Confiança (Confirmado / Provável / Hipótese) · Como validar**

Hipótese não entra em contrato nem em relatório de segurança como se fosse fato. Entra como risco a investigar.

---

## 5. O que o cliente recebe

1. **Relatório executivo** — leitura para gestor: contexto, riscos, prioridades, próximos passos.
2. **Anexo técnico** — inventário, diagramas, contratos, fluxos e evidências.
3. **Manifesto de evidências** — SHA-256 dos artefatos, com origem e data.
4. **Apresentação de encerramento** — 45 a 60 minutos, com perguntas e decisões.

O material é escrito para ser lido por quem não participou da análise. Se o cliente precisa contratar outra equipe depois, a documentação deve bastar.

---

## 6. Segurança, ética e limites

- Só analisamos sistemas do próprio cliente ou projetos com autorização formal.
- O alvo roda em ambiente isolado; produção não é usada como laboratório.
- Dados pessoais seguem a LGPD; dados reais são anonimizados antes de qualquer captura.
- Segredos encontrados são registrados por local/tipo/risco — nunca copiados para o repositório.
- Não contornamos DRM, licenciamento ou proteção anticópia.
- Não emitimos laudo pericial com validade judicial.
- Achado crítico segue divulgação responsável: cliente primeiro, prazo de correção, publicação só com aval.

**Não prometemos** “descobrir tudo”, “comprometer o sistema em X minutos” ou “100% de cobertura”. Prometemos **cobertura declarada** e o que ficou fora do escopo explicitamente listado.

---

## 7. Modelo comercial

| Oferta | Formato | Referência de esforço |
|---|---|---|
| Diagnóstico de legado | Escopo fechado | 5–10 dias úteis |
| Contrato de API | Escopo fechado por fluxo | 5–10 dias úteis |
| Reconstrução assistida | Por etapa/módulo | 4–8 semanas por módulo |
| Avaliação de segurança | Escopo fechado | 3–5 dias úteis |

**Investimento:** definido após a reunião de escopo, conforme tamanho do alvo, quantidade de fluxos, ambiente disponível e profundidade desejada. Não há tabela pública de preço porque o custo depende do alvo — e prometer preço antes de entender o alvo é o mesmo erro que prometer prazo sem diagnóstico.

Formas de contratação:
- **Diagnóstico primeiro:** recomendado para todo cliente novo.
- **Diagnóstico + reconstrução:** contrato em duas fases, com go/no-go após o diagnóstico.
- **Retainer de evolução:** para quem precisa manter documentação e testes vivos.

---

## 8. Critérios de aceite

- [ ] Inventário cobre todas as superfícies conhecidas e lista os desconhecidos.
- [ ] Toda afirmação técnica tem evidência e nível de confiança.
- [ ] Requisitos reconstruídos e novos estão separados sem ambiguidade.
- [ ] Cada critério de aceite tem teste associado.
- [ ] Divergências estão registradas com decisão: aceita, corrigida ou fora de escopo.
- [ ] Relatório final lista explicitamente o que ficou fora do escopo.

---

## 9. O que não está incluso

- exploração de vulnerabilidades sem autorização específica;
- teste em produção;
- correção de falhas encontradas (pode ser contratada à parte);
- laudo pericial;
- análise de firmware/binário enquanto o laboratório não concluir a Fase 2;
- garantia de cobertura total do sistema.

---

## 10. Qualificação do cliente

Perguntas para a primeira conversa:

1. O sistema é do cliente? Quem assina a autorização?
2. Existe ambiente de teste ou cópia isolada? Produção está fora.
3. Tem código-fonte, binário ou só acesso à API?
4. Qual é a dor: documentar, integrar, modernizar, substituir ou auditar?
5. Qual o prazo e o custo de parar a operação?
6. Há dados pessoais ou segredos no escopo?
7. Quem vai receber o relatório e tomar a decisão?

Se a resposta for “quero que vocês invadam para provar”, o cliente não é para esta oferta.

---

## 11. Nota interna de maturidade

Este documento descreve a oferta **planejada**, não um histórico de entregas.

- O laboratório está em **Fase 0**: método, agentes, templates e harness prontos; **nenhum engajamento executado**.
- Playwright está conectado; Ghidra, Binwalk, Frida e Rizin **ainda não**.
- O piloto da Fase 1 ainda não foi escolhido.
- Portanto: **não vender firmware, binário ou exploração** até a Fase 2.
- O primeiro case precisa ser construído antes de usar números de prazo como promessa comercial.
