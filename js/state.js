/**
 * Guardian Social - State Management (Lógica de Estado da Sessão)
 * Gerencia o estado imutável de decisões, cômputo binário de pontos e máquina de estados.
 */

export const State = {
  scenarios: [],
  currentIndex: 0,
  selectedChoice: null, // "legitimate" | "threat" | null
  isLocked: false,
  score: 0,
  decisions: [],

  /**
   * Inicializa a sessão com a lista de cenários
   * @param {Array} scenariosList 
   */
  init(scenariosList) {
    this.scenarios = Array.isArray(scenariosList) ? scenariosList : [];
    this.resetSession();
  },

  /**
   * Retorna o cenário ativo atual
   * @returns {Object|null}
   */
  getCurrentScenario() {
    if (this.scenarios.length === 0 || this.currentIndex >= this.scenarios.length) {
      return null;
    }
    return this.scenarios[this.currentIndex];
  },

  /**
   * Retorna o total de cenários na rodada
   * @returns {number}
   */
  getTotalScenarios() {
    return this.scenarios.length;
  },

  /**
   * Verifica se o cenário atual é o último da rodada
   * @returns {boolean}
   */
  isLastScenario() {
    return this.currentIndex === this.scenarios.length - 1;
  },

  /**
   * Seleciona uma opção de resposta caso o cenário não esteja travado
   * @param {string} choice - "legitimate" ou "threat"
   * @returns {boolean} True se a seleção foi aceita
   */
  selectOption(choice) {
    if (this.isLocked) {
      return false;
    }
    if (choice === 'legitimate' || choice === 'threat') {
      this.selectedChoice = choice;
      return true;
    }
    return false;
  },

  /**
   * Confirma a decisão do cenário atual.
   * Trava permanentemente os botões para este cenário e computa a pontuação binária.
   * @returns {Object|null} Payload com o resultado pedagógico
   */
  confirmCurrentDecision() {
    if (this.isLocked || !this.selectedChoice) {
      return null;
    }

    const currentScenario = this.getCurrentScenario();
    if (!currentScenario) {
      return null;
    }

    // Trava imediatamente contra re-respostas (FR-004)
    this.isLocked = true;

    // Regra de acerto binário:
    // 'threat' ↔ isThreat: true
    // 'legitimate' ↔ isThreat: false
    const isCorrect = (this.selectedChoice === 'threat' && currentScenario.isThreat === true) ||
                      (this.selectedChoice === 'legitimate' && currentScenario.isThreat === false);

    if (isCorrect) {
      this.score += 1;
    }

    // Registra a decisão do estudante
    const decisionRecord = {
      scenarioId: currentScenario.id,
      chosenAction: this.selectedChoice,
      isCorrect: isCorrect,
      timestamp: Date.now()
    };
    this.decisions.push(decisionRecord);

    const feedbackPayload = {
      isCorrect: isCorrect,
      explanation: isCorrect ? currentScenario.educationalFeedback.correctExplanation : currentScenario.educationalFeedback.incorrectExplanation,
      keyRule: currentScenario.educationalFeedback.keyRule,
      categoryTakeaway: currentScenario.educationalFeedback.categoryTakeaway,
      iocs: currentScenario.iocs || [],
      emotionalTriggers: currentScenario.emotionalTriggers || [],
      threatCategory: currentScenario.threatCategory,
      isThreat: currentScenario.isThreat
    };

    return feedbackPayload;
  },

  /**
   * Avança para o próximo cenário em fluxo unidirecional linear (FR-006)
   * @returns {boolean} True se avançou, false se já estava no último
   */
  nextScenario() {
    if (this.currentIndex < this.scenarios.length - 1) {
      this.currentIndex += 1;
      this.selectedChoice = null;
      this.isLocked = false;
      return true;
    }
    return false;
  },

  /**
   * Gera o relatório consolidado de encerramento
   * @returns {Object} PerformanceReport
   */
  generateReport() {
    const totalAnswered = this.decisions.length;
    const correctCount = this.score;
    const percentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    // Mapeamento de categorias e análise pedagógica
    const categoriesSuccess = {};
    const categoriesFail = {};

    this.decisions.forEach((dec) => {
      const scenario = this.scenarios.find((s) => s.id === dec.scenarioId);
      if (!scenario) return;

      const cat = scenario.threatCategory;
      if (dec.isCorrect) {
        categoriesSuccess[cat] = (categoriesSuccess[cat] || 0) + 1;
      } else {
        categoriesFail[cat] = (categoriesFail[cat] || 0) + 1;
      }
    });

    const strengths = [];
    const areasForStudy = [];

    // Categorias com acertos
    Object.keys(categoriesSuccess).forEach((cat) => {
      if (!categoriesFail[cat]) {
        strengths.push(`Domínio exemplar em: ${cat}`);
      } else {
        strengths.push(`Acertos importantes em: ${cat}`);
      }
    });

    // Se acertou tudo
    if (strengths.length === 0 && correctCount > 0) {
      strengths.push("Atenção básica demonstrada a cabeçalhos e mensagens suspeitas.");
    } else if (correctCount === 0) {
      strengths.push("Dedicação em completar a simulação e buscar aprendizado preventivo.");
    }

    // Recomendações pedagógicas para erros
    Object.keys(categoriesFail).forEach((cat) => {
      if (cat.includes('Phishing')) {
        areasForStudy.push('Atenção a e-mails: desconfie de solicitações de urgência e confirme sempre o domínio do remetente.');
      } else if (cat.includes('Smishing') || cat.includes('SMS')) {
        areasForStudy.push('Proteção em mensagens SMS: desconfie de falsas notificações de PIX e prêmios que peçam taxas de entrega.');
      } else if (cat.includes('Login') || cat.includes('Credential')) {
        areasForStudy.push('Páginas de Login: verifique a URL da direita para a esquerda antes da primeira barra para conferir o domínio real.');
      } else if (cat.includes('Legítima')) {
        areasForStudy.push('Reconhecimento de mensagens oficiais: aprenda a identificar canais institucionais seguros sem alarme excessivo.');
      } else {
        areasForStudy.push(`Revisar conceitos e boas práticas de proteção contra ${cat}.`);
      }
    });

    if (areasForStudy.length === 0) {
      areasForStudy.push('Parabéns! Você demonstrou excelência defensiva. Continue praticando e ajude seus colegas a reconhecerem golpes virtuais.');
    }

    // Badge de Proficiência Educacional
    let levelBadge = 'Guardião Iniciante';
    if (percentage >= 90) {
      levelBadge = 'Mestre da Ciberdefesa 🛡️';
    } else if (percentage >= 60) {
      levelBadge = 'Guardião Alerta 👁️';
    }

    return {
      totalAnswered: totalAnswered,
      correctCount: correctCount,
      percentage: percentage,
      strengths: Array.from(new Set(strengths)),
      areasForStudy: Array.from(new Set(areasForStudy)),
      levelBadge: levelBadge
    };
  },

  /**
   * Reseta a sessão ao estado inicial
   */
  resetSession() {
    this.currentIndex = 0;
    this.selectedChoice = null;
    this.isLocked = false;
    this.score = 0;
    this.decisions = [];
  }
};
