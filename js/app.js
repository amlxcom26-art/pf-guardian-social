/**
 * Guardian Social - Application Bootstrap & Coordinator
 * Ponto de entrada (Entrypoint) da SPA educacional Vanilla
 */

import { ScenariosLoader } from './scenarios-loader.js';
import { State } from './state.js';
import { UI } from './ui.js';
import { Events } from './events.js';

async function bootstrap() {
  try {
    // 1. Inicializa camadas de Apresentação e Eventos
    UI.init();
    Events.init();

    // 2. Carrega a base curada de cenários pedagógicos
    const scenarios = await ScenariosLoader.loadScenarios();

    // 3. Inicializa o estado da sessão com os cenários
    State.init(scenarios);

    // 4. Renderiza o primeiro cenário
    const initialScenario = State.getCurrentScenario();
    UI.renderScenario(initialScenario, State.currentIndex, State.getTotalScenarios(), State.score);

    console.info('Guardian Social inicializado com sucesso.');
  } catch (error) {
    console.error('Falha ao inicializar o Guardian Social:', error);

    const scenarioContainer = document.getElementById('scenario-container');
    if (scenarioContainer) {
      scenarioContainer.innerHTML = `
        <div class="feedback-card incorrect" style="text-align: center; padding: 2rem;">
          <h3>Erro ao Iniciar a Simulação</h3>
          <p style="margin-top: 1rem;">${error.message || 'Ocorreu um erro ao carregar os cenários educativos.'}</p>
          <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-text-muted);">
            Se você estiver abrindo localmente via duplo clique, verifique se o arquivo <code>data/scenarios-fallback.js</code> está na mesma pasta.
          </p>
          <button type="button" class="btn-confirm" onclick="location.reload()" style="margin-top: 1.5rem;">
            Tentar Novamente
          </button>
        </div>
      `;
    }
  }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
