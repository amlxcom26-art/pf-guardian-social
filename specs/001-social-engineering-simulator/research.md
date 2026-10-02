# Research & Architectural Decisions: Guardian Social

**Feature**: `001-social-engineering-simulator`  
**Date**: 2026-10-02  
**Status**: Completed  

---

## 1. Modular Architecture in Vanilla Web Standards

### Decision
Adotar uma arquitetura baseada em **JavaScript Puro modular** sem necessidade de bundlers (Webpack, Vite, Rollup) ou frameworks (React, Vue). O código será particionado estritamente em três camadas bem delimitadas:
1. **Camada de Apresentação (`js/ui.js` e `css/`)**: Responsável exclusiva pela manipulação e renderização do DOM, injeção de templates visuais limpos e gestão de classes CSS de transição e responsividade.
2. **Camada de Dados (`data/scenarios.json`, `data/scenarios-fallback.js`, `js/scenarios-loader.js`)**: Responsável pelo esquema estruturado dos cenários, validação dos atributos pedagógicos e fornecimento dos dados à aplicação.
3. **Camada de Lógica e Estado (`js/state.js`, `js/events.js`, `js/app.js`)**: Responsável pela máquina de estados da simulação (cenário atual, cômputo binário de acertos, travamento de botões, transições de tela e controle de sessão).

### Rationale
- Cumpre rigorosamente os **Princípios III (Arquitetura Estática Vanilla)** e **VII (Compatibilidade com GitHub Pages)** da Constituição do projeto.
- Garante total legibilidade e facilidade de auditoria para professores, estudantes e contribuidores sem dependências de compilação ou de pacotes `node_modules`.

### Alternatives Considered
- *Single-file Monolith (`index.html` com todo o script e estilo embutidos)*: Rejeitado por prejudicar a manutenibilidade, violando a regra explícita de separação entre apresentação, dados e lógica.
- *Frameworks leves (ex.: Alpine.js ou Preact via CDN)*: Rejeitado para eliminar qualquer dependência externa ou risco de indisponibilidade caso o estudante acesse em rede escolar restrita sem acesso a CDNs externas.

---

## 2. Estratégia de Carregamento de Dados (Fetch com Fallback Offline)

### Decision
Armazenar a base curada de 8 a 10 cenários primariamente no arquivo `data/scenarios.json`. Para garantir funcionamento universal no navegador (inclusive se o professor/aluno abrir diretamente o arquivo via protocolo local `file://`, onde políticas de CORS dos navegadores podem restringir chamadas `fetch()`), a aplicação disponibilizará um módulo auxiliar `data/scenarios-fallback.js` que define `window.GUARDIAN_SCENARIOS`. O módulo `js/scenarios-loader.js` tentará primeiro o `fetch('data/scenarios.json')` e, em caso de erro de rede ou protocolo local, utilizará graciosamente o fallback em memória.

### Rationale
- Permite carregar o simulador perfeitamente no **GitHub Pages** (via HTTP/HTTPS) e também em ambientes de laboratórios escolares isolados ou sem internet (via `file://` local).
- Mantém os cenários desacoplados da lógica de apresentação, permitindo que educadores criem ou editem novos cenários JSON no futuro.

### Alternatives Considered
- *Apenas `fetch()`*: Falharia se o usuário abrisse o arquivo `index.html` via duplo clique sem iniciar um servidor HTTP local.
- *Cenários hardcoded dentro do `app.js`*: Rejeitado porque violaria o requisito mandatório do usuário de que "As questões devem ficar inicialmente em um arquivo JSON local".

---

## 3. Mecanismo de Inspeção Segura e Usabilidade Responsiva (Desktop & Mobile)

### Decision
Implementar um componente de inspeção contextual inerte que funcione uniformemente em mouse e telas sensíveis ao toque:
- **No Desktop**: O estudante pode passar o cursor (`mouseover`/`focus`) sobre links, botões ou detalhes de remetente para exibir um balão/tooltip flutuante com a URL ou domínio simulado.
- **Em Smartphones / Tablets (Touch)**: O clique/toque no link suspeito ou no botão "Ver detalhes do remetente" aciona uma caixa de diálogo ou popover não obstrusivo que revela a prévia da URL/domínio.
- **Segurança Sandbox**: Todos os links do cenário possuem atributos `href="#"` ou `role="button"` e seus eventos de clique executam obrigatoriamente `event.preventDefault()`. Nenhuma requisição de rede ou redirecionamento externo é realizado.

### Rationale
- Cumpre os **Princípios I (Simplicidade)**, **II (Fidelidade e Acessibilidade)** e **V (Segurança Intrínseca e Sandbox)**.
- Elimina o problema de usabilidade em celulares, onde o evento `hover` não existe nativamente.

### Alternatives Considered
- *Permitir abrir links em nova aba (`target="_blank"`)*: Terminantemente rejeitado; criaria risco de o aluno acessar páginas externas perigosas ou sair do ambiente simulado.
- *Apenas exibir a URL por extenso no texto*: Perderia o realismo de simulação de phishing (onde o texto do link costuma mascarar o endereço real).

---

## 4. Máquina de Estados e Bloqueio de Decisão

### Decision
Implementar um fluxo de estados unidirecional e finito no módulo `js/state.js`:
1. `ESTADO_CENARIO_ABERTO`: O cenário é renderizado; opções "Marcar como Legítimo" e "Reportar Ameaça" ativas; botão de confirmação desabilitado até haver seleção.
2. `ESTADO_DECISAO_SELECIONADA`: Uma das opções foi marcada pelo estudante; botão "Confirmar Decisão" é habilitado com destaque visual.
3. `ESTADO_DECISAO_CONFIRMADA`: O botão "Confirmar Decisão" foi acionado; o sistema registra a resposta, calcula o acerto binário, **desabilita permanentemente** as opções e o botão de confirmação para o cenário atual, e abre o painel de feedback pedagógico.
4. `ESTADO_AVANCO`: Se houver próximos cenários, o botão exibe "Próximo Cenário"; se for o último cenário (ex.: 10 de 10), o botão exibe explicitamente "Ver Resultados Finais".
5. `ESTADO_RESULTADOS`: Exibição do relatório geral de desempenho, pontos fortes, recomendações de estudo e botão de reinício.

### Rationale
- Garante o cumprimento estrito das clarificações estabelecidas com o usuário (regras de navegação linear, bloqueio permanente imediato de re-resposta e encerramento com botão explícito).

---

## 5. Sistema de Estilos e Acessibilidade (CSS3 Puro)

### Decision
Utilizar **CSS3 Moderno puro com CSS Custom Properties (Variáveis)** para gerenciar paleta de cores (tema claro/contraste adequado), tipografia legível, espaçamentos consistentes e elevações visuais. Utilizar CSS Flexbox e CSS Grid para layouts fluidos adaptáveis desde 320px de largura de tela. Implementar estilos de foco visíveis (`:focus-visible`) e atributos semânticos ARIA para conformidade básica com WCAG 2.1 AA.

### Rationale
- Garante interface limpa, moderna e atraente para estudantes do Ensino Médio sem carregar frameworks pesados como Bootstrap ou Tailwind.
- Facilita manutenção e personalização futura de cores e tipografia.
