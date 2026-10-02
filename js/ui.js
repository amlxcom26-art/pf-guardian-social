/**
 * Guardian Social - UI Layer (Apresentação e Manipulação do DOM)
 * Isento de regras de negócio; renderiza dados e consome eventos do State.
 */

export const UI = {
  // Elementos do DOM cacheados
  elements: {
    progressText: null,
    liveScore: null,
    progressBarFill: null,
    scenarioContainer: null,
    feedbackContainer: null,
    resultsContainer: null,
    tooltip: null,
    tooltipContent: null
  },

  /**
   * Inicializa referências aos elementos do DOM
   */
  init() {
    this.elements.progressText = document.getElementById('progress-text');
    this.elements.liveScore = document.getElementById('live-score');
    this.elements.progressBarFill = document.getElementById('progress-bar-fill');
    this.elements.scenarioContainer = document.getElementById('scenario-container');
    this.elements.feedbackContainer = document.getElementById('feedback-container');
    this.elements.resultsContainer = document.getElementById('results-container');
    this.elements.tooltip = document.getElementById('inspection-tooltip');
    this.elements.tooltipContent = document.getElementById('inspection-tooltip-content');
  },

  /**
   * Renderiza a interface do cenário ativo
   * @param {Object} scenario - Objeto Scenario
   * @param {number} currentIndex - Índice 0-based
   * @param {number} totalScenarios - Total de cenários
   * @param {number} score - Pontuação atual
   */
  renderScenario(scenario, currentIndex, totalScenarios, score = 0) {
    if (!scenario) return;

    // Atualiza progresso e placar
    const currentNumber = currentIndex + 1;
    this.elements.progressText.textContent = `Cenário ${currentNumber} de ${totalScenarios}`;
    this.elements.liveScore.textContent = `Pontos: ${score}`;
    
    const progressPercent = Math.round((currentNumber / totalScenarios) * 100);
    this.elements.progressBarFill.style.width = `${progressPercent}%`;

    // Garante que o container de cenários está visível e feedback/resultados ocultos
    this.elements.scenarioContainer.hidden = false;
    this.elements.feedbackContainer.hidden = true;
    this.elements.resultsContainer.hidden = true;

    // Monta o template de simulação de acordo com o tipo
    let mockContentHtml = '';
    let typeLabel = 'E-mail';

    if (scenario.type === 'email') {
      typeLabel = 'E-mail Simulado';
      mockContentHtml = this._buildEmailHtml(scenario);
    } else if (scenario.type === 'sms') {
      typeLabel = 'SMS / Mensagem Instantânea';
      mockContentHtml = this._buildSmsHtml(scenario);
    } else if (scenario.type === 'login') {
      typeLabel = 'Página de Autenticação / Login';
      mockContentHtml = this._buildLoginHtml(scenario);
    }

    // Painel de Decisão do Estudante
    const decisionHtml = `
      <section class="decision-panel" aria-labelledby="decision-heading">
        <h3 id="decision-heading" class="decision-title">Qual é o seu veredito sobre esta comunicação?</h3>
        
        <div class="choices-group" role="group" aria-label="Opções de decisão">
          <button type="button" class="btn-choice" data-choice="legitimate" id="btn-choice-safe">
            <span class="choice-label">🟢 Marcar como Legítimo</span>
            <span class="choice-desc">Comunicação autêntica, segura e oficial</span>
          </button>
          
          <button type="button" class="btn-choice" data-choice="threat" id="btn-choice-threat">
            <span class="choice-label">🚨 Reportar Ameaça</span>
            <span class="choice-desc">Engenharia social, phishing ou golpe</span>
          </button>
        </div>

        <div class="confirm-wrapper">
          <button type="button" class="btn-confirm" id="btn-confirm-decision" data-action="confirm-decision" disabled>
            Confirmar Decisão
          </button>
        </div>
      </section>
    `;

    this.elements.scenarioContainer.innerHTML = `
      <div class="scenario-card">
        <div class="scenario-top-bar">
          <span class="scenario-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            ${typeLabel}
          </span>
          <span class="scenario-id-tag">ID: ${scenario.id}</span>
        </div>
        <div class="scenario-body-wrapper">
          ${mockContentHtml}
        </div>
      </div>
      ${decisionHtml}
    `;

    // Rola para o topo do cenário suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Constrói a visualização simulada de E-mail
   */
  _buildEmailHtml(scenario) {
    const inspectableLinksHtml = this._buildInspectableElementsHtml(scenario.inspectableElements);

    return `
      <div class="email-view">
        <div class="email-meta">
          <h2 class="email-subject">${this._escapeHtml(scenario.title)}</h2>
          <div class="email-sender-line">
            <div class="sender-info">
              <div class="sender-avatar" aria-hidden="true">
                ${scenario.sender.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div class="sender-name">${this._escapeHtml(scenario.sender.displayName)}</div>
                <div class="sender-tag">&lt;${this._escapeHtml(scenario.sender.address)}&gt;</div>
              </div>
            </div>
            <button type="button" class="btn-inspect-sender" data-action="inspect-sender" aria-expanded="false" aria-controls="sender-details-drawer">
              🔍 Detalhes do Remetente
            </button>
          </div>
          <div id="sender-details-drawer" class="sender-details-drawer" hidden>
            <dl>
              <dt>Endereço Completo:</dt>
              <dd>${this._escapeHtml(scenario.sender.address)}</dd>
              <dt>Status de Segurança do Servidor:</dt>
              <dd>${scenario.sender.securityStatus === 'verified' ? '✅ SPF / DKIM Verificado pelo Provedor' : '⚠️ Não foi possível verificar a autenticidade do remetente'}</dd>
            </dl>
          </div>
        </div>
        <div class="message-content">
          <p>${this._escapeHtml(scenario.body)}</p>
          ${inspectableLinksHtml}
        </div>
      </div>
    `;
  },

  /**
   * Constrói a visualização simulada de SMS
   */
  _buildSmsHtml(scenario) {
    const inspectableLinksHtml = this._buildInspectableElementsHtml(scenario.inspectableElements);

    return `
      <div class="sms-container">
        <div class="sms-header">
          <div class="sender-number">${this._escapeHtml(scenario.sender.displayName)} (${this._escapeHtml(scenario.sender.address)})</div>
        </div>
        <div class="sms-body">
          <div class="sms-bubble">
            <p>${this._escapeHtml(scenario.body)}</p>
            ${inspectableLinksHtml}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Constrói a visualização simulada de Login
   */
  _buildLoginHtml(scenario) {
    const inspectable = scenario.inspectableElements && scenario.inspectableElements[0];
    const destinationUrl = inspectable ? inspectable.simulatedDestination : scenario.sender.address;

    return `
      <div class="browser-mockup">
        <div class="browser-bar">
          <div class="browser-dots" aria-hidden="true">
            <span class="browser-dot"></span>
            <span class="browser-dot"></span>
            <span class="browser-dot"></span>
          </div>
          <div class="browser-address-field" 
               tabindex="0" 
               role="button"
               data-action="inspect-link" 
               data-destination="${this._escapeHtml(destinationUrl)}" 
               data-explanation="${inspectable ? this._escapeHtml(inspectable.explanation) : ''}"
               title="Clique ou foque para inspecionar o domínio">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>${this._escapeHtml(destinationUrl)}</span>
          </div>
        </div>
        <div class="login-card-inner">
          <h4>${this._escapeHtml(scenario.title)}</h4>
          <p class="sender-tag" style="margin-bottom: 1rem;">${this._escapeHtml(scenario.body)}</p>
          <div class="login-form-mockup" aria-hidden="true">
            <input type="text" class="login-input-mock" placeholder="E-mail ou Usuário do Aluno" disabled>
            <input type="password" class="login-input-mock" placeholder="Senha Institucional" disabled>
            <button type="button" class="btn-confirm" style="width: 100%; margin-top: 0.5rem;" disabled>Entrar</button>
          </div>
          <small style="display: block; margin-top: 0.75rem; color: var(--color-text-muted);">
            💡 Inspecione o endereço na barra do navegador acima para conferir o domínio real.
          </small>
        </div>
      </div>
    `;
  },

  /**
   * Monta botões inspecionáveis para links
   */
  _buildInspectableElementsHtml(elements) {
    if (!elements || elements.length === 0) return '';

    return `
      <div class="inspectable-elements-box" style="margin-top: 1rem;">
        ${elements
          .map(
            (el) => `
            <a href="#" 
               class="inspectable-link" 
               role="button"
               data-action="inspect-link" 
               data-destination="${this._escapeHtml(el.simulatedDestination)}" 
               data-explanation="${this._escapeHtml(el.explanation)}"
               title="Passe o mouse ou toque para inspecionar o destino real">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <span>${this._escapeHtml(el.displayText)}</span>
            </a>
          `
          )
          .join('')}
      </div>
    `;
  },

  /**
   * Atualiza a seleção visual das opções de resposta
   * @param {string} selectedChoice - "legitimate" ou "threat"
   */
  updateSelectionState(selectedChoice) {
    const btnSafe = document.getElementById('btn-choice-safe');
    const btnThreat = document.getElementById('btn-choice-threat');
    const btnConfirm = document.getElementById('btn-confirm-decision');

    if (!btnSafe || !btnThreat || !btnConfirm) return;

    btnSafe.classList.remove('selected-safe');
    btnThreat.classList.remove('selected-threat');

    if (selectedChoice === 'legitimate') {
      btnSafe.classList.add('selected-safe');
    } else if (selectedChoice === 'threat') {
      btnThreat.classList.add('selected-threat');
    }

    // Habilita o botão de confirmação
    btnConfirm.disabled = false;
    btnConfirm.setAttribute('aria-disabled', 'false');
  },

  /**
   * Trava permanentemente as opções do cenário atual (FR-004)
   */
  lockScenarioInputs() {
    const btnSafe = document.getElementById('btn-choice-safe');
    const btnThreat = document.getElementById('btn-choice-threat');
    const btnConfirm = document.getElementById('btn-confirm-decision');

    if (btnSafe) btnSafe.disabled = true;
    if (btnThreat) btnThreat.disabled = true;
    if (btnConfirm) btnConfirm.disabled = true;
  },

  /**
   * Exibe o painel de feedback pedagógico detalhado
   * @param {Object} feedbackData 
   * @param {boolean} isLastScenario 
   */
  showFeedback(feedbackData, isLastScenario) {
    if (!this.elements.feedbackContainer) return;

    const isCorrect = feedbackData.isCorrect;
    const cardClass = isCorrect ? 'correct' : 'incorrect';
    const verdictTitle = isCorrect ? 'Decisão Correta! 🎯' : 'Atenção: Decisão Incorreta ⚠️';
    const buttonLabel = isLastScenario ? 'Ver Resultados Finais 🏆' : 'Próximo Cenário ➔';

    let iocsListHtml = '';
    if (feedbackData.iocs && feedbackData.iocs.length > 0) {
      iocsListHtml = `
        <div class="iocs-wrapper">
          <div class="iocs-title">🔍 Indicadores de Comprometimento (IoCs) Identificados:</div>
          <ul class="iocs-list">
            ${feedbackData.iocs.map((ioc) => `<li class="ioc-item"><span class="ioc-bullet">■</span> <span>${this._escapeHtml(ioc)}</span></li>`).join('')}
          </ul>
        </div>
      `;
    }

    let emotionalTriggersHtml = '';
    if (feedbackData.emotionalTriggers && feedbackData.emotionalTriggers.length > 0) {
      emotionalTriggersHtml = `
        <p style="font-size: 0.875rem; margin-bottom: 0.75rem;">
          <strong>🧠 Gatilhos Emocionais Explorados:</strong> 
          <em>${feedbackData.emotionalTriggers.map((t) => this._escapeHtml(t)).join(', ')}</em>
        </p>
      `;
    }

    this.elements.feedbackContainer.innerHTML = `
      <div class="feedback-card ${cardClass}" role="region" aria-label="Feedback Pedagógico">
        <div class="feedback-header-row">
          <div class="feedback-icon" aria-hidden="true">
            ${isCorrect 
              ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'
              : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
            }
          </div>
          <h3 class="feedback-verdict">${verdictTitle}</h3>
        </div>

        <p class="feedback-explanation">${this._escapeHtml(feedbackData.explanation)}</p>
        
        ${emotionalTriggersHtml}
        ${iocsListHtml}

        <div class="key-rule-box">
          <strong>💡 Regra de Ouro Preventiva:</strong> ${this._escapeHtml(feedbackData.keyRule)}
        </div>

        <button type="button" class="btn-next-step" data-action="next-step" id="btn-next-step">
          <span>${buttonLabel}</span>
        </button>
      </div>
    `;

    this.elements.feedbackContainer.hidden = false;

    // Rola suavemente para o feedback pedagógico
    this.elements.feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  /**
   * Renderiza a tela de resultados consolidados
   * @param {Object} report - PerformanceReport do State
   */
  renderResults(report) {
    this.elements.scenarioContainer.hidden = true;
    this.elements.feedbackContainer.hidden = true;
    this.elements.resultsContainer.hidden = false;

    const strengthsHtml = report.strengths && report.strengths.length > 0
      ? report.strengths.map((s) => `<li><span>🛡️</span> <span>${this._escapeHtml(s)}</span></li>`).join('')
      : '<li><span>🛡️</span> <span>Atenção básica na inspeção de dados.</span></li>';

    const studyHtml = report.areasForStudy && report.areasForStudy.length > 0
      ? report.areasForStudy.map((r) => `<li><span>📚</span> <span>${this._escapeHtml(r)}</span></li>`).join('')
      : '<li><span>📚</span> <span>Continue praticando e multiplicando a cultura de segurança!</span></li>';

    this.elements.resultsContainer.innerHTML = `
      <div class="results-card">
        <div class="results-header">
          <h2>Simulação Concluída!</h2>
          <p>Confira a análise detalhada do seu desempenho em engenharia social</p>
        </div>

        <div class="score-display-box" aria-label="Pontuação de ${report.percentage}%">
          <span class="score-number">${report.percentage}%</span>
          <span class="score-sublabel">${report.correctCount} de ${report.totalAnswered} acertos</span>
        </div>

        <div>
          <span class="badge-pill">${this._escapeHtml(report.levelBadge)}</span>
        </div>

        <div class="report-grid">
          <div class="report-box strengths">
            <h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Pontos Fortes Demonstrados
            </h4>
            <ul class="report-list">
              ${strengthsHtml}
            </ul>
          </div>

          <div class="report-box recommendations">
            <h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Recomendações de Estudo
            </h4>
            <ul class="report-list">
              ${studyHtml}
            </ul>
          </div>
        </div>

        <div style="text-align: center;">
          <button type="button" class="btn-restart" data-action="restart-session">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
            <span>Reiniciar Simulação</span>
          </button>
        </div>
      </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Exibe o balão/tooltip de inspeção segura
   * @param {number} x - Posição X na tela
   * @param {number} y - Posição Y na tela
   * @param {string} destination - URL simulada
   * @param {string} explanation - Explicação
   */
  showTooltip(x, y, destination, explanation = '') {
    if (!this.elements.tooltip || !this.elements.tooltipContent) return;

    this.elements.tooltipContent.innerHTML = `
      <div class="tooltip-url">${this._escapeHtml(destination)}</div>
      ${explanation ? `<div style="margin-top: 4px;">${this._escapeHtml(explanation)}</div>` : ''}
    `;

    // Posiciona o tooltip
    this.elements.tooltip.hidden = false;
    
    // Ajusta coordenadas para não vazar a tela
    const tooltipWidth = 320;
    let left = x - 20;
    if (left + tooltipWidth > window.innerWidth) {
      left = window.innerWidth - tooltipWidth - 20;
    }
    if (left < 10) left = 10;

    let top = y + 20;
    this.elements.tooltip.style.left = `${left}px`;
    this.elements.tooltip.style.top = `${top}px`;
  },

  /**
   * Oculta o balão de inspeção
   */
  hideTooltip() {
    if (this.elements.tooltip) {
      this.elements.tooltip.hidden = true;
    }
  },

  /**
   * Sanitização básica para injeção segura no DOM
   */
  _escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};
