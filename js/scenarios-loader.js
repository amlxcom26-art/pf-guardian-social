/**
 * Guardian Social - Scenarios Loader
 * Carrega a base de dados de cenários educativos com suporte a execução HTTP e fallback offline (file://)
 */

export const ScenariosLoader = {
  /**
   * Carrega a lista de cenários pedagógicos.
   * Tenta primeiro a requisição fetch em 'data/scenarios.json'.
   * Caso falhe (ex.: CORS em protocolo file://), utiliza window.GUARDIAN_SCENARIOS.
   * @returns {Promise<Array>} Lista de cenários validados
   */
  async loadScenarios() {
    try {
      const response = await fetch('data/scenarios.json', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data.scenarios) && data.scenarios.length >= 8) {
        return data.scenarios;
      }
      throw new Error('Dataset JSON não contém quantidade mínima de cenários.');
    } catch (fetchError) {
      console.warn('Carregamento via fetch("data/scenarios.json") não disponível. Verificando fallback em memória...', fetchError);

      if (typeof window !== 'undefined' && Array.isArray(window.GUARDIAN_SCENARIOS) && window.GUARDIAN_SCENARIOS.length >= 8) {
        console.info('Fallback offline ativado com sucesso.');
        return window.GUARDIAN_SCENARIOS;
      }

      throw new Error(
        'Não foi possível carregar os cenários educacionais. Certifique-se de que os arquivos data/scenarios.json ou data/scenarios-fallback.js estão disponíveis.'
      );
    }
  }
};
