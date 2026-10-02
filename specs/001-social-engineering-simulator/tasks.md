# Tasks: Simulador de Engenharia Social (Guardian Social)

**Feature**: `001-social-engineering-simulator`  
**Date**: 2026-10-02  
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)  

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialização da estrutura de diretórios e ativos compartilhados do projeto estático.

- [X] T001 Create directory structure (`css/`, `data/`, `js/`, `assets/icons/`, `assets/images/`) per implementation plan
- [X] T002 [P] Create lightweight SVG icons in `assets/icons/` (`shield.svg`, `alert.svg`, `check.svg`, `mail.svg`, `sms.svg`, `lock.svg`, `info.svg`)
- [X] T003 [P] Create CSS design tokens and variables in `css/variables.css` (color palette for threat/legitimate/neutral, typography, spacing, border radii, shadows)
- [X] T004 [P] Create global base styles and layout reset in `css/base.css` (box-sizing, container, accessible typography, high contrast defaults)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura de dados, carregamento e estado básico que bloqueia a implementação das histórias de usuário.

**CRITICAL**: Nenhuma implementação de história de usuário pode começar antes da conclusão desta fase.

- [X] T005 Create scenarios dataset in `data/scenarios.json` with 8 to 10 curated scenarios (minimum 8 items, each having `id` pattern `^scenario-[0-9]{2,}$`, `order` integer, `type` enum `["email", "sms", "login"]`, `title`, `sender`, `body`, `inspectableElements`, `isThreat` boolean, `threatCategory`, `iocs`, `emotionalTriggers`, and `educationalFeedback`)
- [X] T006 [P] Create fallback dataset in `data/scenarios-fallback.js` attaching identical scenarios data to `window.GUARDIAN_SCENARIOS` for offline `file://` execution
- [X] T007 [P] Implement scenarios loader module in `js/scenarios-loader.js` (attempts `fetch('data/scenarios.json')` with fallback to `window.GUARDIAN_SCENARIOS` on network or CORS failure)
- [X] T008 Implement base state manager in `js/state.js` (`scenarios: []`, `currentIndex: 0`, `score: 0`, `decisions: []`, `init(scenarios)`, `getCurrentScenario()`, `isLastScenario()`)
- [X] T009 Create semantic HTML5 skeleton in `index.html` with ARIA landmarks (`#app`, header with title, progress bar, `#scenario-container`, `#feedback-container`, `#results-container`, and script tags)

**Checkpoint**: Fundação pronta - a implementação das histórias de usuário pode ser iniciada.

---

## Phase 3: User Story 1 - Exploração Interativa e Decisão de Cenário (Priority: P1) [MVP]

**Goal**: O estudante visualiza o cenário simulado (e-mail, SMS, login), expande detalhes do remetente, inspeciona URLs por hover (desktop) ou toque (mobile), seleciona "Marcar como Legítimo" ou "Reportar Ameaça" e confirma com bloqueio permanente imediato.

**Independent Test**: Carregar Cenário 1, clicar em "Detalhes do Remetente" (expande cabeçalho), inspecionar o link (exibe tooltip com URL simulada sem navegar), selecionar uma opção e clicar em "Confirmar Decisão" (as opções e o botão de confirmação são travados permanentemente).

- [X] T010 [P] [US1] Implement UI card and inspection component styles in `css/components.css` (email header, SMS bubble, login mockup, badge, and hover/touch inspection tooltip)
- [X] T011 [US1] Implement scenario rendering logic in `js/ui.js` (`renderScenario(scenario, currentIndex, totalScenarios)`, rendering sender info, message body with inspectable links, decision buttons and confirm button)
- [X] T012 [US1] Implement selection and permanent lock state methods in `js/state.js` (`selectOption(action)`, `confirmCurrentDecision()`, with `isLocked` flag preventing re-response)
- [X] T013 [US1] Implement UI selection and locking functions in `js/ui.js` (`updateSelectionState(selectedAction)`, `lockScenarioInputs()`)
- [X] T014 [US1] Implement event listeners for sender expansion, link inspection tooltip (hover/touch with `event.preventDefault()`), option selection and confirmation in `js/events.js`
- [X] T015 [US1] Connect initial load, state initialization and scenario rendering in `js/app.js`

**Checkpoint**: User Story 1 totalmente funcional e testável de forma independente (MVP inicial alcançado).

---

## Phase 4: User Story 2 - Feedback Pedagógico Imediato e Decomposição de Ameaças (Priority: P1)

**Goal**: Exibir instantaneamente (< 300ms) após a confirmação o painel de feedback detalhando acerto/erro, IoCs, gatilhos emocionais explorados e boa prática, com botão de avanço linear estrito ("Próximo Cenário").

**Independent Test**: Confirmar a decisão no Cenário 1, verificar a exibição imediata do painel de feedback com justificativa pedagógica, IoCs e regra de ouro, e clicar em "Próximo Cenário" para avançar estritamente de forma unidirecional para o Cenário 2.

- [X] T016 [P] [US2] Implement feedback panel styles in `css/components.css` (thematic success/alert color cues, IoC pill tags, emotional triggers callout, smooth slide-down animation)
- [X] T017 [US2] Implement feedback presentation method in `js/ui.js` (`showFeedback(feedbackData, isLastScenario)`) displaying pedagogical breakdown and configuring progression button
- [X] T018 [US2] Implement scoring computation (binary 1 point per hit) and advance logic in `js/state.js` (`nextScenario()`, updating `currentIndex` and recording `StudentDecision`)
- [X] T019 [US2] Implement event listener for "Próximo Cenário" in `js/events.js` advancing the simulation to the next scenario without backward navigation

**Checkpoint**: Histórias de Usuário 1 e 2 operacionais de forma integrada com feedback e progressão linear completa.

---

## Phase 5: User Story 3 - Painel Final de Desempenho e Recomendações Educacionais (Priority: P2)

**Goal**: No último cenário, transformar o botão de avanço em "Ver Resultados Finais" e exibir a tela de encerramento com percentual de acertos, pontos fortes demonstrados, recomendações pedagógicas de estudo e proficiência.

**Independent Test**: Responder todos os cenários da rodada, clicar em "Ver Resultados Finais" no feedback do último cenário e validar a exibição da tela de resultados com percentual exato `(acertos / total) * 100%`, pontos fortes e áreas para estudo.

- [X] T020 [P] [US3] Implement results screen layout and styles in `css/components.css` (score percentage dial/card, strengths badge list, study recommendation cards)
- [X] T021 [US3] Implement report generation algorithm in `js/state.js` (`generateReport()`, computing `correctCount`, `percentage = Math.round((correctCount / totalAnswered) * 100)`, compiling `strengths` and `areasForStudy`)
- [X] T022 [US3] Implement results screen rendering method in `js/ui.js` (`renderResults(performanceReport)`)
- [X] T023 [US3] Implement event handling in `js/events.js` for "Ver Resultados Finais" transitioning from the final scenario feedback to the results view

**Checkpoint**: Ciclo educativo completo, desde o primeiro cenário até o relatório consolidado de encerramento.

---

## Phase 6: User Story 4 - Reinício e Repetição da Prática (Priority: P3)

**Goal**: Permitir ao estudante reiniciar a simulação a partir da tela de resultados (ou controle de reinício), restaurando o estado inicial com pontuação e histórico zerados.

**Independent Test**: Na tela final de resultados, clicar em "Reiniciar Simulação" e validar que o sistema retorna ao Cenário 1 com indicador "Cenário 1 de 10", placar zerado e botões desmarcados.

- [X] T024 [US4] Implement full state reset method in `js/state.js` (`resetSession()`, resetting `currentIndex: 0`, `score: 0`, `decisions: []`, `selectedChoice: null`, `isLocked: false`)
- [X] T025 [US4] Implement UI reset and view switching in `js/ui.js` (hiding `#results-container`, resetting form state and calling `renderScenario` for scenario 0)
- [X] T026 [US4] Implement event listener for restart button in `js/events.js` (`[data-action="restart-session"]`) triggering state reset and UI re-render

**Checkpoint**: Todas as 4 histórias de usuário totalmente integradas e permitindo ciclos contínuos de estudo.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Ajustes de responsividade mobile (320px+), acessibilidade (WCAG 2.1 AA), prevenção de cliques repetidos e verificação de conformidade GitHub Pages.

- [X] T027 [P] Implement mobile responsive styles in `css/responsive.css` (touch targets ≥ 44x44px, layout adaptations for viewports ≤ 768px and ≤ 480px, eliminating horizontal overflow)
- [X] T028 [P] Implement accessibility enhancements in `index.html` and `js/ui.js` (ARIA live announcements for feedback, visible `:focus-visible` rings, semantic landmarks)
- [X] T029 Implement debounce / rapid double-click guard in `js/events.js` on confirm and navigation buttons
- [X] T030 Execute full end-to-end validation according to `specs/001-social-engineering-simulator/quickstart.md` (Scenarios 1 to 6)
- [X] T031 Validate repository static readiness for GitHub Pages deployment (verifying all relative paths in `index.html`, `css/`, `js/`, `data/`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Sem dependências - inicia imediatamente.
- **Phase 2 (Foundational)**: Depende da Fase 1 - **BLOQUEIA** todas as histórias de usuário.
- **Phase 3 (User Story 1 - P1)**: Depende da Fase 2. Forma o MVP fundamental da aplicação.
- **Phase 4 (User Story 2 - P1)**: Depende da Fase 3 (adiciona feedback pedagógico e progressão linear sobre a decisão tomada).
- **Phase 5 (User Story 3 - P2)**: Depende da Fase 4 (consome as decisões acumuladas para gerar o relatório final).
- **Phase 6 (User Story 4 - P3)**: Depende da Fase 5 (adiciona o gatilho de reinício sobre a tela de resultados).
- **Phase 7 (Polish)**: Depende da conclusão de todas as histórias de usuário.

### Parallel Opportunities

- **Fase 1**: T002, T003 e T004 podem ser desenvolvidos em paralelo após T001.
- **Fase 2**: T006 e T007 podem ser desenvolvidos em paralelo após T005.
- **Fase 3**: T010 pode ser desenvolvido em paralelo com T011/T012.
- **Fase 4**: T016 pode ser desenvolvido em paralelo com T018.
- **Fase 5**: T020 pode ser desenvolvido em paralelo com T021.
- **Fase 7**: T027 e T028 podem ser desenvolvidos em paralelo.

---

## Parallel Example: User Story 1

```bash
# Desenvolver estilos de componentes e métodos de estado em paralelo:
Task: "T010 [P] [US1] Implement UI card and inspection component styles in css/components.css"
Task: "T012 [US1] Implement selection and permanent lock state methods in js/state.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)
1. Concluir Fase 1 (Setup) e Fase 2 (Foundational).
2. Concluir Fase 3 (User Story 1): Permite visualizar cenário, inspecionar links e confirmar decisão com trava imediata.
3. Concluir Fase 4 (User Story 2): Acrescenta o feedback pedagógico explicativo e avanço linear entre cenários.
4. **Validar MVP**: Testar o ciclo básico de aprendizado no navegador.

### Entrega Incremental
1. Adicionar Fase 5 (User Story 3): Tela final de resultados, percentual e recomendações de estudo.
2. Adicionar Fase 6 (User Story 4): Reinício de sessão.
3. Executar Fase 7 (Polish): Refinamentos de responsividade mobile (320px+), acessibilidade WCAG 2.1 AA e validação no GitHub Pages.
