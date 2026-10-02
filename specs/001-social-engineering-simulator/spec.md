# Feature Specification: Simulador de Engenharia Social (Guardian Social)

**Feature Branch**: `001-social-engineering-simulator`

**Created**: 2026-10-02

**Status**: Draft

**Input**: User description: "Desenvolver a aplicação educacional Guardian Social para prática de detecção de Engenharia Social. O estudante visualiza cenários sequenciais que representam interações virtuais do cotidiano. Para cada cenário, a tela apresentará: • Uma interface interativa (ex.: um e-mail com opção de expandir detalhes do remetente e inspecionar links ao passar o mouse). • Duas ações possíveis: 'Marcar como Legítimo' ou 'Reportar Ameaça'. • Um botão de confirmação de decisão. Após confirmar, o sistema exibirá uma tela/painel de feedback pedagógico justificando o resultado com base em indicadores de comprometimento (IoCs), gatilhos emocionais ou conformidade técnica. Ao concluir 8 a 10 cenários, a aplicação apresentará uma tela de resultados com percentual de acertos, pontos fortes e recomendações de estudo. Deve ser possível reiniciar a simulação. Neste momento não será necessário cadastro ou autenticação"

## Clarifications

### Session 2026-10-02
- Q: Como deve funcionar a navegação entre os cenários ao longo da simulação? (FR-006) → A: Navegação estritamente linear: avanço unidirecional exclusivamente após confirmação de decisão e leitura do feedback pedagógico, sem retorno a cenários anteriores na rodada.
- Q: Quando e de que forma os botões de resposta e decisão de um cenário devem ser bloqueados contra re-resposta? (FR-004) → A: Bloqueio definitivo imediato: ao acionar a confirmação, as opções de resposta ("Marcar como Legítimo" e "Reportar Ameaça") e o próprio botão de confirmação são desabilitados permanentemente para aquele cenário, impedindo qualquer re-resposta ou alteração posterior.
- Q: Qual modelo de pontuação e cálculo de métricas deve ser adotado para avaliar o desempenho do estudante na rodada? (FR-008, SC-005) → A: Pontuação binária simples: exatamente 1 ponto por acerto e 0 pontos por erro, calculando o aproveitamento final como a taxa percentual direta `(acertos / total) * 100%`, sem penalidades negativas ou ponderações complexas.
- Q: Como deve ser realizada a transição para a tela de resultados no encerramento da simulação após o último cenário? (FR-008) → A: Botão explícito "Ver Resultados Finais": no painel de feedback do último cenário, o botão de avanço exibe o texto "Ver Resultados Finais", realizando a transição para o relatório consolidado sob clique intencional do estudante.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Exploração Interativa e Decisão de Cenário (Priority: P1)

Como um estudante do Ensino Médio, desejo visualizar e inspecionar uma simulação realista de interação digital cotidiana (como e-mails ou mensagens), avaliando detalhes suspeitos como remetente e links para tomar uma decisão fundamentada de segurança ("Marcar como Legítimo" ou "Reportar Ameaça") e confirmá-la.

**Why this priority**: É a mecânica central da sandbox educacional. Sem a visualização do cenário, a inspeção de pistas e o registro da decisão, a experiência de aprendizado não acontece.

**Independent Test**: Pode ser testado de ponta a ponta apresentando um cenário simulado único no qual o usuário expande os dados do remetente, inspeciona um link com hover/toque, seleciona uma opção e aciona a confirmação.

**Acceptance Scenarios**:

1. **Given** que o estudante está visualizando um cenário de e-mail na simulação, **When** ele clica no controle de expandir detalhes do remetente, **Then** o sistema exibe o endereço completo e domínio de origem para verificação.
2. **Given** que o estudante visualiza um link ou botão suspeito na mensagem, **When** ele posiciona o cursor sobre o elemento (hover) ou aciona a inspeção por toque, **Then** o sistema exibe uma prévia da URL simulada sem disparar navegação externa.
3. **Given** que o estudante selecionou uma opção ("Marcar como Legítimo" ou "Reportar Ameaça"), **When** ele clica no botão de confirmação de decisão, **Then** o sistema registra a escolha e desabilita alterações adicionais naquele cenário.
4. **Given** que nenhuma opção foi selecionada previamente, **When** o estudante tenta confirmar, **Then** o sistema impede a confirmação e solicita a seleção de uma das opções.

---

### User Story 2 - Feedback Pedagógico Imediato e Decomposição de Ameaças (Priority: P1)

Como um estudante, desejo receber um feedback pedagógico detalhado imediatamente após confirmar minha decisão sobre o cenário, entendendo se acertei ou errei e quais indicadores técnicos ou emocionais justificam o diagnóstico.

**Why this priority**: A aplicação é uma ferramenta educativa formativa. O aprendizado ocorre diretamente na leitura da justificativa pedagógica e no reconhecimento dos vetores de risco.

**Independent Test**: Pode ser testado confirmando a decisão em um cenário e verificando a abertura imediata do painel de feedback contendo a indicação de acerto/erro, os IoCs, os gatilhos emocionais explorados e a recomendação de boas práticas.

**Acceptance Scenarios**:

1. **Given** que o estudante confirmou sua decisão sobre o cenário, **When** o painel de feedback é apresentado, **Then** o sistema indica claramente se a decisão foi correta ou incorreta.
2. **Given** que o cenário analisado era uma ameaça de phishing/engenharia social, **When** o feedback é exibido, **Then** o sistema lista os Indicadores de Comprometimento (IoCs) presentes e os gatilhos emocionais explorados (ex.: urgência, autoridade, medo ou curiosidade).
3. **Given** que o estudante leu o feedback pedagógico, **When** ele aciona o botão de prosseguir, **Then** o sistema transiciona de forma fluida para o próximo cenário da trilha.

---

### User Story 3 - Painel Final de Desempenho e Recomendações Educacionais (Priority: P2)

Como um estudante, desejo visualizar um painel final de resultados ao concluir a rodada de cenários (8 a 10 cenários), com percentual de acertos, pontos fortes demonstrados e recomendações específicas de estudo para aprimorar minha segurança digital.

**Why this priority**: Oferece o fechamento pedagógico do ciclo de simulação, consolidando a autoavaliação do estudante e direcionando seu estudo futuro.

**Independent Test**: Pode ser testado completando a sequência de 8 a 10 cenários e confirmando que a tela final apresenta a pontuação percentual consolidada, os tópicos dominados e as áreas a melhorar.

**Acceptance Scenarios**:

1. **Given** que o estudante confirmou a decisão do último cenário da rodada (entre 8 e 10 cenários), **When** ele clica no botão "Ver Resultados Finais" exibido no painel de feedback, **Then** o sistema transiciona para a tela de resultados consolidada.
2. **Given** a tela de resultados final exibida, **When** o estudante analisa as métricas, **Then** ele visualiza a pontuação total em percentual de acertos, um resumo dos pontos fortes e recomendações práticas de conscientização digital.

---

### User Story 4 - Reinício e Repetição da Prática (Priority: P3)

Como um estudante, desejo ter a possibilidade de reiniciar a simulação completa para praticar novamente e testar meus conhecimentos revisados.

**Why this priority**: Permite a fixação do conteúdo através da repetição ativa e possibilita que outro estudante utilize a mesma estação de estudo sem reter dados prévios.

**Independent Test**: Pode ser testado acionando o botão de reiniciar na tela de resultados ou no cabeçalho e validando se o simulador retorna ao primeiro cenário com placar zerado.

**Acceptance Scenarios**:

1. **Given** que o estudante está na tela de resultados finais, **When** ele clica em "Reiniciar Simulação", **Then** a aplicação retorna imediatamente ao primeiro cenário com todas as pontuações e estados zerados.
2. **Given** que a simulação foi reiniciada, **When** o primeiro cenário é recarregado, **Then** nenhuma seleção ou feedback anterior permanece visível.

---

### Edge Cases

- **Tentativa de confirmação sem seleção prévia**: O botão de confirmação permanece desabilitado ou aciona aviso visual discreto orientando a escolha entre "Marcar como Legítimo" e "Reportar Ameaça".
- **Dispositivos móveis sem suporte a cursor (hover)**: A inspeção de links e detalhes de remetente deve disponibilizar mecanismo de toque/clique que abra um balão explicativo da URL simulada sem jamais abrir uma aba externa ou redirecionar a navegação.
- **Cliques múltiplos rápidos na confirmação ou avanço**: O sistema deve ignorar cliques repetidos após a confirmação para evitar duplo cômputo de pontuação ou pulo acidental de cenários.
- **Recarregamento acidental da página pelo navegador**: A aplicação deve recarregar no primeiro cenário de maneira limpa ou restaurar o estado da rodada sem quebras de layout ou erros de script.
- **Tentativa de navegação externa ao clicar em links do cenário**: Todos os links simulados devem ser inertes, cancelando o comportamento padrão do navegador (`event.preventDefault()`) e exibindo a ferramenta de inspeção.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE apresentar uma sequência curricular de 8 a 10 cenários representativos de situações virtuais cotidianas (ex.: e-mails suspeitos, SMS bancários/promocionais e telas de autenticação).
- **FR-002**: O sistema DEVE fornecer recursos interativos de inspeção em cada cenário, permitindo expandir detalhes do remetente e inspecionar endereços de links sem risco de navegação real.
- **FR-003**: O sistema DEVE disponibilizar exatamente duas opções de julgamento para cada cenário: "Marcar como Legítimo" e "Reportar Ameaça".
- **FR-004**: O sistema DEVE exigir um clique explícito em botão de confirmação para validar a decisão selecionada e DEVE travar/desabilitar permanentemente as opções ("Marcar como Legítimo" e "Reportar Ameaça") e o próprio botão de confirmação imediatamente após o clique, impedindo qualquer alteração ou re-resposta para aquele cenário.
- **FR-005**: O sistema DEVE exibir, imediatamente após a confirmação da decisão, um painel de feedback pedagógico detalhado que informe:
  - Se a escolha do estudante foi correta ou incorreta;
  - Os Indicadores de Comprometimento (IoCs) presentes no cenário;
  - Os gatilhos psicológicos ou emocionais explorados (ex.: urgência, autoridade, oferta irrecusável);
  - A recomendação prática de segurança no mundo real.
- **FR-006**: O sistema DEVE aplicar navegação estritamente linear e unidirecional, permitindo ao estudante avançar para o próximo cenário exclusivamente após a confirmação da decisão e leitura do feedback pedagógico, sem disponibilizar navegação regressiva a cenários anteriores na mesma rodada.
- **FR-007**: O sistema DEVE exibir um indicador visível do progresso do estudante na sessão (ex.: "Cenário 3 de 10").
- **FR-008**: No último cenário da sequência (8 a 10 cenários), após a confirmação da decisão e exibição do feedback pedagógico, o botão de avanço DEVE exibir explicitamente o rótulo "Ver Resultados Finais". O sistema DEVE transicionar para a tela de resultados finais sob clique do estudante, computando o resultado por pontuação binária simples (1 ponto por acerto, 0 por erro, sem descontos negativos) e apresentando:
  - Pontuação absoluta e percentual total de acertos `(acertos / total) * 100%`;
  - Diagnóstico dos pontos fortes demonstrados;
  - Recomendações pedagógicas de estudo e atenção baseadas nos erros cometidos.
- **FR-009**: O sistema DEVE fornecer a opção de reiniciar a simulação a partir da tela de resultados (ou via controle de reinício), restabelecendo o estado para o cenário inicial e zerando o histórico da sessão.
- **FR-010**: O sistema NÃO DEVE exigir cadastro, e-mail, senha ou qualquer forma de autenticação para uso do simulador.
- **FR-011**: O sistema DEVE garantir que todas as URLs, botões e anexos simulados sejam 100% fictícios, inertes e incapazes de abrir páginas externas maliciosas.

### Key Entities *(include if feature involves data)*

- **Cenário de Simulação (Scenario)**:
  - `id`: Identificador único do cenário (ex.: `cenario-01`).
  - `type`: Tipo de interface simulada (`email`, `sms`, `login`).
  - `title`: Assunto ou título visível do cenário.
  - `sender`: Dados visíveis do remetente (nome de exibição e endereço/telefone completo oculto por expansão).
  - `content`: Conteúdo textual e estrutural simulado da mensagem ou tela.
  - `inspectableElements`: Lista de pistas com texto visível e endereço/destino simulado para pré-visualização.
  - `isThreat`: Booleano que indica se o cenário é uma ameaça real de engenharia social (`true`) ou uma comunicação legítima (`false`).
  - `threatCategory`: Categoria da ameaça (ex.: `Phishing`, `Smishing`, `Cloned Portal`, `Credential Harvesting`).
  - `iocs`: Lista descritiva de indicadores de comprometimento (ex.: domínio forjado, remetente estranho, anexo suspeito).
  - `emotionalTriggers`: Gatilhos psicológicos identificados (ex.: `Senso de Urgência`, `Medo de Bloqueio`, `Curiosidade`).
  - `educationalFeedback`: Texto detalhado de justificativa pedagógica e boa prática recomendada.

- **Decisão do Estudante (StudentDecision)**:
  - `scenarioId`: Identificador do cenário avaliado.
  - `selectedAction`: Escolha realizada (`legitimate` ou `threat`).
  - `isCorrect`: Booleano indicando correspondência com o gabarito do cenário.

- **Sessão da Simulação (SimulationSession)**:
  - `currentIndex`: Índice numérico do cenário atual em exibição.
  - `totalScenarios`: Quantidade total de cenários na rodada (entre 8 e 10).
  - `decisions`: Coleção de decisões tomadas ao longo da rodada.
  - `isCompleted`: Indicador de término da sequência de cenários.

- **Relatório de Resultados (PerformanceReport)**:
  - `scorePercentage`: Percentual de acertos alcançado na rodada (0% a 100%).
  - `correctCount`: Número absoluto de decisões corretas.
  - `strengths`: Lista de conceitos ou categorias em que o estudante obteve pleno acerto.
  - `studyRecommendations`: Recomendações pedagógicas baseadas nas falhas ou nos temas dos cenários com erro.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos cenários fornecem feedback pedagógico contextualizado com IoCs e justificativa educativa imediatamente após a confirmação da decisão.
- **SC-002**: Um estudante do Ensino Médio consegue compreender a interface, inspecionar o cenário e registrar sua decisão em menos de 2 minutos por cenário.
- **SC-003**: 100% dos links e botões de cenários simulados mantêm-se estritamente inertes, garantindo 0 incidentes de redirecionamento para URLs externas.
- **SC-004**: O tempo de transição entre a confirmação da decisão e a exibição do painel de feedback é inferior a 300 milissegundos.
- **SC-005**: Ao término dos 8 a 10 cenários, a tela de resultados finais é montada e exibida instantaneamente (< 500ms), apresentando percentual de acerto, pontos fortes e recomendações de estudo.
- **SC-006**: A funcionalidade de reinício da simulação restaura o simulador ao primeiro cenário e zera os acumuladores em menos de 300 milissegundos.
- **SC-007**: 100% das telas da simulação (cenários, inspeções, feedbacks e relatório final) são plenamente navegáveis e legíveis tanto em telas de dispositivos móveis (largura mínima de 320px) quanto em desktops.

## Assumptions

- **Público e Contexto**: O público-alvo prioritário é composto por estudantes do Ensino Médio em ambiente escolar ou de autoestudo, sem necessidade prévia de conhecimentos técnicos avançados em redes ou segurança da informação.
- **Formato da Sessão**: A simulação consiste em uma rodada linear de 8 a 10 cenários padronizados, com complexidade balanceada entre casos legítimos e ameaças comuns no cotidiano jovem.
- **Armazenamento e Privacidade**: Nenhuma informação pessoal ou credencial de estudante é solicitada ou enviada a servidores remotos; o progresso da rodada é mantido em memória durante a sessão no navegador.
- **Independência de Conectividade Externa**: Uma vez que os arquivos estáticos estejam carregados no navegador, a simulação não requer chamadas contínuas a APIs de terceiros.
