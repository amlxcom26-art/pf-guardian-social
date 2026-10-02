/**
 * Guardian Social - Events Controller (Delegação e Controle de Interações)
 * Conecta interações do usuário à lógica de State e métodos de renderização da UI.
 */

import { State } from './state.js';
import { UI } from './ui.js';

export const Events = {
  // Prevenção contra múltiplos cliques rápidos (T029)
  _isBusy: false,

  /**
   * Inicializa ouvintes de eventos da aplicação
   */
  init() {
    this._bindGlobalClicks();
    this._bindInspectionHovers();
  },

  /**
   * Delegação global de eventos de clique
   */
  _bindGlobalClicks() {
    document.addEventListener('click', (event) => {
      // 1. Alternar Detalhes do Remetente
      const inspectSenderBtn = event.target.closest('[data-action="inspect-sender"]');
      if (inspectSenderBtn) {
        event.preventDefault();
        this._handleInspectSender(inspectSenderBtn);
        return;
      }

      // 2. Interceptação Segura de Links (Inércia da Sandbox - FR-011)
      const inspectLink = event.target.closest('[data-action="inspect-link"]');
      if (inspectLink) {
        event.preventDefault();
        // Em dispositivos de toque, um clique abre/alterna o tooltip explicativo
        const dest = inspectLink.getAttribute('data-destination') || '';
        const expl = inspectLink.getAttribute('data-explanation') || '';
        const rect = inspectLink.getBoundingClientRect();
        UI.showTooltip(rect.left + window.scrollX, rect.bottom + window.scrollY, dest, expl);
        return;
      }

      // Se clicar fora do link inspecionável, oculta o tooltip
      if (!event.target.closest('#inspection-tooltip') && !event.target.closest('[data-action="inspect-link"]')) {
        UI.hideTooltip();
      }

      // 3. Seleção de Opção ("Marcar como Legítimo" ou "Reportar Ameaça")
      const choiceBtn = event.target.closest('[data-choice]');
      if (choiceBtn && !State.isLocked) {
        event.preventDefault();
        const choice = choiceBtn.getAttribute('data-choice');
        if (State.selectOption(choice)) {
          UI.updateSelectionState(choice);
        }
        return;
      }

      // 4. Confirmação de Decisão (FR-004)
      const confirmBtn = event.target.closest('[data-action="confirm-decision"]');
      if (confirmBtn && !confirmBtn.disabled && !State.isLocked) {
        event.preventDefault();
        this._handleConfirmDecision();
        return;
      }

      // 5. Avanço ("Próximo Cenário" ou "Ver Resultados Finais" - FR-008)
      const nextBtn = event.target.closest('[data-action="next-step"]');
      if (nextBtn) {
        event.preventDefault();
        this._handleNextStep();
        return;
      }

      // 6. Reinício de Simulação (FR-009)
      const restartBtn = event.target.closest('[data-action="restart-session"]');
      if (restartBtn) {
        event.preventDefault();
        this._handleRestart();
        return;
      }
    });
  },

  /**
   * Vincula eventos de mouseover e focus para inspeção no Desktop
   */
  _bindInspectionHovers() {
    document.addEventListener('mouseover', (event) => {
      const inspectLink = event.target.closest('[data-action="inspect-link"]');
      if (inspectLink) {
        const dest = inspectLink.getAttribute('data-destination') || '';
        const expl = inspectLink.getAttribute('data-explanation') || '';
        const rect = inspectLink.getBoundingClientRect();
        UI.showTooltip(rect.left + window.scrollX, rect.bottom + window.scrollY, dest, expl);
      }
    });

    document.addEventListener('mouseout', (event) => {
      const inspectLink = event.target.closest('[data-action="inspect-link"]');
      if (inspectLink) {
        UI.hideTooltip();
      }
    });

    // Acessibilidade via Teclado: Focus e Blur
    document.addEventListener('focusin', (event) => {
      const inspectLink = event.target.closest('[data-action="inspect-link"]');
      if (inspectLink) {
        const dest = inspectLink.getAttribute('data-destination') || '';
        const expl = inspectLink.getAttribute('data-explanation') || '';
        const rect = inspectLink.getBoundingClientRect();
        UI.showTooltip(rect.left + window.scrollX, rect.bottom + window.scrollY, dest, expl);
      }
    });

    document.addEventListener('focusout', (event) => {
      const inspectLink = event.target.closest('[data-action="inspect-link"]');
      if (inspectLink) {
        UI.hideTooltip();
      }
    });
  },

  /**
   * Alterna a gaveta de detalhes técnicos do remetente
   */
  _handleInspectSender(btn) {
    const drawer = document.getElementById('sender-details-drawer');
    if (!drawer) return;

    const isHidden = drawer.hidden;
    drawer.hidden = !isHidden;
    btn.setAttribute('aria-expanded', String(isHidden));
    btn.textContent = isHidden ? '🔼 Ocultar Detalhes' : '🔍 Detalhes do Remetente';
  },

  /**
   * Processa a confirmação de decisão do estudante com debounce
   */
  _handleConfirmDecision() {
    if (this._isBusy) return;
    this._isBusy = true;

    try {
      // 1. Trava os botões visualmente e permanentemente no cenário
      UI.lockScenarioInputs();

      // 2. Confirma a decisão no State
      const feedbackPayload = State.confirmCurrentDecision();
      if (!feedbackPayload) {
        this._isBusy = false;
        return;
      }

      // 3. Atualiza o placar e exibe o feedback pedagógico
      const isLast = State.isLastScenario();
      UI.showFeedback(feedbackPayload, isLast);

      // Atualiza placar ao vivo
      if (UI.elements.liveScore) {
        UI.elements.liveScore.textContent = `Pontos: ${State.score}`;
      }
    } finally {
      setTimeout(() => {
        this._isBusy = false;
      }, 250);
    }
  },

  /**
   * Gerencia o avanço para próximo cenário ou transição para resultados finais
   */
  _handleNextStep() {
    if (this._isBusy) return;
    this._isBusy = true;

    try {
      UI.hideTooltip();

      if (State.isLastScenario()) {
        // Encerramento: Gera e renderiza o relatório final (FR-008)
        const report = State.generateReport();
        UI.renderResults(report);
      } else {
        // Avanço estritamente linear para o próximo cenário (FR-006)
        if (State.nextScenario()) {
          const nextScenario = State.getCurrentScenario();
          UI.renderScenario(nextScenario, State.currentIndex, State.getTotalScenarios(), State.score);
        }
      }
    } finally {
      setTimeout(() => {
        this._isBusy = false;
      }, 250);
    }
  },

  /**
   * Reinicia a simulação e retorna ao primeiro cenário (FR-009)
   */
  _handleRestart() {
    if (this._isBusy) return;
    this._isBusy = true;

    try {
      UI.hideTooltip();
      State.resetSession();
      const firstScenario = State.getCurrentScenario();
      UI.renderScenario(firstScenario, State.currentIndex, State.getTotalScenarios(), State.score);
    } finally {
      setTimeout(() => {
        this._isBusy = false;
      }, 250);
    }
  }
};
