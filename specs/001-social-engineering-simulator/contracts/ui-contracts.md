# UI & Module Interaction Contracts: Guardian Social

**Feature**: `001-social-engineering-simulator`  
**Date**: 2026-10-02  
**Status**: Completed  

---

## 1. Camada de Apresentação (`js/ui.js`)

A camada de apresentação não contém regras de negócio ou cálculo de pontuação; ela consome o estado atual da aplicação e renderiza os elementos semânticos do DOM.

### Métodos Obrigatórios do Objeto `UI`

#### `renderScenario(scenario, currentIndex, totalScenarios)`
- **Parâmetros**:
  - `scenario`: Objeto `Scenario` completo conforme o schema.
  - `currentIndex`: Inteiro (0-based) do cenário ativo.
  - `totalScenarios`: Inteiro representando o total de cenários na rodada.
- **Comportamento**:
  - Atualiza o indicador de progresso (ex.: `"Cenário 3 de 10"` e barra visual de progresso).
  - Limpa e reconstrói o container da interface simulada (`#scenario-container`) com base no tipo (`email`, `sms`, `login`).
  - Reseta os botões de ação ("Marcar como Legítimo" e "Reportar Ameaça") para o estado desmarcado.
  - Desabilita o botão "Confirmar Decisão" (`disabled = true`, `aria-disabled = true`).
  - Oculta o painel de feedback pedagógico (`hidden = true`).

#### `updateSelectionState(selectedAction)`
- **Parâmetros**:
  - `selectedAction`: `"legitimate"` | `"threat"`.
- **Comportamento**:
  - Adiciona classe visual ativa ao botão escolhido e remove do botão oposto.
  - Habilita o botão "Confirmar Decisão" (`disabled = false`, `aria-disabled = false`).

#### `lockScenarioInputs()`
- **Parâmetros**: Nenhum.
- **Comportamento**:
  - Desabilita permanentemente os botões "Marcar como Legítimo", "Reportar Ameaça" e o botão "Confirmar Decisão" no cenário atual.

#### `showFeedback(feedbackData, isLastScenario)`
- **Parâmetros**:
  - `feedbackData`: Objeto contendo `{ isCorrect, explanation, keyRule, iocs, emotionalTriggers, threatCategory }`.
  - `isLastScenario`: Booleano indicando se o cenário em exibição é o último da rodada.
- **Comportamento**:
  - Torna visível o painel de feedback (`hidden = false`) com animação suave de entrada.
  - Aplica estilo/tema de sucesso (verde) se `isCorrect: true` ou alerta/atenção (vermelho/âmbar) se `isCorrect: false`.
  - Renderiza a lista de IoCs e gatilhos emocionais identificados.
  - Configura o botão de avanço:
    - Se `isLastScenario === false`: Rótulo `"Próximo Cenário"` com ícone de seta.
    - Se `isLastScenario === true`: Rótulo `"Ver Resultados Finais"` com ícone de conclusão.

#### `renderResults(performanceReport)`
- **Parâmetros**:
  - `performanceReport`: Objeto `PerformanceReport` contendo `{ totalAnswered, correctCount, percentage, strengths, areasForStudy, levelBadge }`.
- **Comportamento**:
  - Oculta o container de cenários e exibe o container de resultados finais (`#results-container`).
  - Exibe o percentual com gráfico ou badge visual de destaque.
  - Renderiza as listas de "Pontos Fortes" e "Áreas de Estudo Recomendadas".
  - Configura o listener do botão `"Reiniciar Simulação"`.

---

## 2. Camada de Gerenciamento de Estado (`js/state.js`)

Mantém o estado unificado e imutável de decisões da sessão.

### Interface do Objeto `State`

```javascript
export const State = {
  // Dados brutos
  scenarios: [],
  currentIndex: 0,
  selectedChoice: null, // "legitimate" | "threat" | null
  isConfirmed: false,
  score: 0,
  decisions: [],

  // Métodos de controle
  init(scenariosList),
  selectOption(action),
  confirmCurrentDecision(),
  getCurrentScenario(),
  isLastScenario(),
  nextScenario(),
  resetSession(),
  generateReport()
};
```

---

## 3. Camada de Eventos e Delegação (`js/events.js`)

Para manter alta performance e código limpo, os eventos são capturados preferencialmente via delegação de eventos no elemento raiz `#app`:

| Evento | Alvo / Seletor | Ação Desencadeada |
| :--- | :--- | :--- |
| `click` | `[data-action="inspect-sender"]` | Alterna a visibilidade dos detalhes avançados do remetente (cabeçalho/domínio). |
| `click` | `[data-action="inspect-link"]` | Cancela navegação (`preventDefault`) e abre modal/tooltip com dados da URL simulada. |
| `mouseover` / `focus` | `[data-inspectable="true"]` | Exibe balão flutuante de inspeção contextual (desktop). |
| `mouseout` / `blur` | `[data-inspectable="true"]` | Oculta balão flutuante de inspeção contextual. |
| `click` | `[data-choice="legitimate"]` | Dispara `State.selectOption('legitimate')` e `UI.updateSelectionState`. |
| `click` | `[data-choice="threat"]` | Dispara `State.selectOption('threat')` e `UI.updateSelectionState`. |
| `click` | `[data-action="confirm-decision"]` | Valida seleção, trava inputs (`UI.lockScenarioInputs`), processa ponto e exibe feedback. |
| `click` | `[data-action="next-step"]` | Avança para próximo cenário (`nextScenario`) ou transiciona para resultados finais. |
| `click` | `[data-action="restart-session"]`| Reseta estado (`State.resetSession`) e renderiza cenário 1. |
