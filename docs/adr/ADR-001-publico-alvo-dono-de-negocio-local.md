# ADR-001 — Público-alvo principal: dono de negócio local

- **Status:** Aceito
- **Data:** 2026-11-04
- **Decisores:** André Lobo (fundador)
- **Contexto:** O site institucional atende hoje dois compradores com necessidades opostas e usa a mesma página para os dois.

---

## Contexto

O conteúdo atual fala a língua de um comprador técnico: *IA com governança*, *Context Engineering*, *AGENTS.md*, *guardrails*, *fail-closed*, *contrato de API*, *RPA*, *ERP contábil*, *engenharia reversa*.

O portfólio, porém, mostra outra coisa: **5 dos 7 cases são negócio local de pequeno porte** — site institucional, site profissional, landing page, e-commerce pequeno e portfólio de arte (`src/data/projects.ts`).

Ou seja: o site se apresenta para um público e prova resultado para outro. Um dono de tapeçaria lê "IA com governança" e conclui que o serviço não é para ele; um gerente de TI lê a mesma frase e se identifica.

Não existe medição que resolva a dúvida hoje: o `index.html` não tem nenhum analytics (sem `gtag`, `plausible`, `umami`, `clarity`), e o Search Console ainda não foi validado. A decisão abaixo é, portanto, uma **hipótese explícita**, não um dado.

## Decisão

O público principal do site é o **dono de negócio local** (pequeno e médio comércio e serviço, com foco em Manaus). Todo o conteúdo da página inicial é escrito para ele.

A profundidade técnica deixa de ser argumento de abertura e passa a ser **prova de competência**, disponível para quem procurar (Metodologia, FAQ, Engenharia Reversa).

## Alternativas consideradas

| Alternativa | Prós | Contras | Veredito |
|---|---|---|---|
| **Dono de negócio local** | Alinhado aos 5 de 7 cases; ciclo de venda curto; decisão em uma pessoa; permite prova social | Ticket menor; concorrência por preço com agências de site barato | **Aceita** |
| Empresa com sistema legado / comprador técnico | Ticket alto; pouca concorrência local; usa o diferencial de governança | Ciclo longo; exige prospecção ativa; o portfólio atual não comprova nada para esse comprador | Secundária — vira porta separada |
| Manter os dois sem hierarquia (status quo) | Não exige reescrita | É a causa do problema: o visitante não se reconhece e sai | Rejeitada |
| Nicho vertical (ex.: contabilidade/fiscal) | Mensagem afiada; indicação boca a boca funciona melhor | Aposta mais estreita; depende de acesso a esse nicho | Reservada para revisão futura |

## Consequências

### Positivas
- A página inicial passa a falar a língua de quem já comprou (e de quem o portfólio comprova).
- Menos frentes de serviço na vitrine → menos paralisia de escolha.
- Prova social (cases, antes/depois, depoimento) sobe para o lugar do método.
- Toda decisão de copy fica testável: "isso ajuda o dono de negócio local a agendar?"

### Negativas / custos
- Exige reescrever hero, vitrine de serviços, triagem da agenda e FAQ.
- O comprador técnico deixa de ser o centro; precisa de uma porta própria para não ser perdido.
- Preço e prazo passam a ser pressão explícita — o dono de negócio local pergunta "quanto custa" na primeira conversa.
- A linguagem simples reduz a percepção de sofisticação técnica, que hoje é diferencial contra agências baratas.

### Riscos residuais
- **Decisão sem dados.** Não há analytics nem classificação dos leads já recebidos. Se em 2–4 semanas o Search Console ou o analytics mostrarem procura majoritária por legado/integração, esta ADR deve ser revista.
- **Perda de ticket alto.** Mitigado mantendo Engenharia Reversa e "tenho um sistema" como caminho secundário, claramente separado.
- **Portfólio desalinhado.** Moari Agro é proposta, não entrega; usar como case de resultado sem essa ressalva é risco comercial.

## Rastreabilidade

- **Requisito / issue:** conversa de 04/11/2026 — "dono de negócio local" como resposta à definição de público.
- **Evidência:** `src/data/projects.ts` (5 de 7 cases locais); ausência de analytics em `index.html`; `docs/ESTADO-ATUAL.md` §4 item 8.
- **Impacto:** copy e hierarquia da home, triagem da agenda, ordem das seções, e a decisão de abrir ou não uma página separada para o comprador técnico.

## Referências

- `CONTEXT.md`
- `docs/ESTADO-ATUAL.md`
- `docs/mef/01-foundations/principles.md`
- `docs/mef/templates/ADR.md`
