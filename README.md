# Guardian Social 🛡️

> **Simulador Interativo Educacional de Engenharia Social para o Ensino Médio**  
> Uma aplicação web estática, leve e pedagógica para capacitar estudantes a reconhecerem e prevenirem ameaças digitais como *phishing*, *smishing* e páginas falsas de login.

---

## 🎯 Sobre o Projeto

O **Guardian Social** é um simulador interativo em formato de *sandbox* desenvolvido especialmente para a realidade e linguagem de estudantes do Ensino Médio brasileiro. A ferramenta proporciona um ambiente seguro e controlado onde o aluno vivencia situações reais de engenharia social, podendo inspecionar elementos suspeitos, tomar decisões e receber feedback pedagógico imediato.

### Destaques Educacionais
- **Ambiente Sandbox Seguro**: Todos os links simulados são completamente inertes. Nenhuma navegação externa é executada, e nenhum dado pessoal ou credencial é transmitido ou coletado.
- **Feedback Formativo Imediato**: A cada decisão confirmada, o estudante recebe instantaneamente uma explicação didática contendo os **Indicadores de Comprometimento (IoCs)**, os **gatilhos psicológicos** explorados pelo invasor (como urgência, medo, gratificação ou autoridade) e uma **Regra de Ouro** preventiva.
- **Relatório de Proficiência Personalizado**: Ao final da rodada de 10 cenários, o aluno recebe seu percentual de aproveitamento, um distintivo de proficiência defensiva, seus pontos fortes identificados e recomendações específicas de estudo.
- **Foco em Dispositivos Móveis e Acessibilidade**: Interface 100% responsiva (projetada para funcionar fluidamente de telas pequenas a partir de 320px até desktops) com conformidade às diretrizes WCAG 2.1 AA.

---

## 🚀 Funcionalidades Principais

1. **10 Cenários Curados**:
   - **E-mails de Phishing e Legítimos**: Falsos alertas de notas escolares, redefinições de contas de jogos, comunicados de vestibulares/ENEM e alertas falsos de segurança.
   - **SMS / Mensagens Instantâneas (Smishing)**: Falsas entregas de encomendas, cupons promocionais fraudulentos e falsas notificações de transferências via PIX.
   - **Páginas de Login Falsas (Credential Harvesting)**: Telas de autenticação institucional com URLs camufladas e domínios manipulados (*typosquatting*).
2. **Inspeção Interativa e Segura**:
   - **Detalhes do Remetente**: Permite expandir cabeçalhos técnicos de e-mail e conferir o status de validação de segurança (SPF/DKIM).
   - **Inspeção de URLs**: No desktop via *hover* e no smartphone via *toque*, exibe um balão explicativo mostrando a URL real de destino e orientações de checagem.
3. **Mecanismo de Decisão e Trava Permanente**:
   - O estudante escolhe entre **"Marcar como Legítimo"** ou **"Reportar Ameaça"**.
   - Ao confirmar a decisão, as opções são travadas permanentemente para aquele cenário, assegurando que o feedback pedagógico não seja usado para alterar a resposta retroativamente.
4. **Progressão Linear e Sem Retorno**:
   - Navegação estritamente para frente (`Cenário X de 10`), garantindo integridade na avaliação e foco em cada desafio.
5. **Reinício Rápido**:
   - Possibilidade de reiniciar a qualquer momento pelo cabeçalho ou ao final pelo botão na tela de resultados, zerando pontuação e permitindo nova tentativa.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído propositalmente sem frameworks frontend, bibliotecas pesadas ou etapas de compilação, priorizando portabilidade, rapidez de carregamento e facilidade de hospedagem:

- **HTML5 Semântico**: Estrutura acessível com marcos semânticos (`header`, `main`, `section`, `footer`), roles ARIA e regiões dinâmicas (`aria-live`).
- **CSS3 Moderno**:
  - Tokens de design estruturados via CSS Custom Properties (`variables.css`).
  - Layouts responsivos com Flexbox e CSS Grid (`components.css`).
  - Adaptações para telas móveis e alvos de toque com no mínimo 44×44px (`responsive.css`).
  - Anéis de foco acessíveis (`:focus-visible`) e conformidade de contraste WCAG 2.1 AA.
- **JavaScript Puro (ES6+ Vanilla)**:
  - Arquitetura modular separada em camadas:
    - **Lógica de Estado (`state.js`)**: Máquina de estados, regras de pontuação binária e algoritmo de geração de relatório pedagógico.
    - **Apresentação (`ui.js`)**: Renderização dinâmica de cenários, feedback e resultados com sanitização de dados.
    - **Controle e Eventos (`events.js`)**: Delegação de eventos, interceptação segura de links e proteção contra múltiplos cliques rápidos (*debounce*).
    - **Carregador de Dados (`scenarios-loader.js`)**: Carregamento assíncrono com tolerância a falhas.
    - **Ponto de Entrada (`app.js`)**: Orquestração e inicialização da aplicação.
- **Estratégia de Dados Híbrida**:
  - `data/scenarios.json`: Base de dados estruturada em JSON para execução via HTTP/HTTPS.
  - `data/scenarios-fallback.js`: Fallback em memória ativado automaticamente caso o navegador bloqueie requisições fetch por CORS ao rodar via duplo clique local (`file://`).

---

## 📁 Estrutura de Diretórios

```text
pf-guardian-social/
├── index.html                   # Estrutura HTML5 semântica e entrypoint da SPA
├── README.md                    # Documentação do projeto
├── .gitignore                   # Arquivos ignorados pelo Git
│
├── assets/
│   └── icons/                   # Ícones vetoriais SVG leves
│       ├── alert.svg
│       ├── check.svg
│       ├── info.svg
│       ├── lock.svg
│       ├── mail.svg
│       ├── shield.svg
│       └── sms.svg
│
├── css/                         # Camada de Apresentação e Estilos
│   ├── base.css                 # Reset, tipografia base e layout global
│   ├── components.css           # Estilos de cards, mockups, botões e feedback
│   ├── responsive.css           # Regras de responsividade (breakpoints ≤768px, ≤480px, 320px)
│   └── variables.css            # Variáveis de cores, espaçamentos e tokens de design
│
├── data/                        # Camada de Dados
│   ├── scenarios.json           # Conjunto curado de 10 cenários educativos
│   └── scenarios-fallback.js    # Fallback em memória para execução direta offline (file://)
│
├── js/                          # Camada de Lógica e Comportamento (Vanilla ES6+)
│   ├── app.js                   # Bootstrap e coordenação dos módulos
│   ├── events.js                # Ouvintes, delegação de eventos e proteção debounce
│   ├── scenarios-loader.js      # Carregamento resiliente (fetch + fallback)
│   ├── state.js                 # Gerenciamento de estado, pontuação e relatório
│   └── ui.js                    # Manipulação e renderização no DOM
│
└── specs/                       # Especificações e Engenharia Orientada a Especificações (Spec-Kit)
    └── 001-social-engineering-simulator/
        ├── spec.md              # Especificação formal de requisitos
        ├── plan.md              # Plano técnico e arquitetural
        ├── tasks.md             # Relação detalhada de tarefas executadas
        ├── data-model.md        # Modelo de dados e transições de estado
        ├── research.md          # Decisões técnicas e trade-offs
        ├── quickstart.md        # Roteiro de testes ponta a ponta
        ├── checklists/          # Checklists de qualidade e acessibilidade
        └── contracts/           # Esquemas JSON e contratos de interface
```

---

## 💻 Como Executar

### Opção 1: Execução Offline Direta (Sem Instalação)
Basta abrir o arquivo `index.html` com um **duplo clique** no seu navegador padrão (Google Chrome, Firefox, Microsoft Edge, Safari, etc.). O sistema detectará o protocolo `file://` e ativará automaticamente o fallback seguro em memória.

### Opção 2: Servidor Estático Local
Para testar a requisição assíncrona ao `scenarios.json` através de um servidor HTTP local:

- **Utilizando Python**:
  ```bash
  python -m http.server 8000
  ```
  Acesse no navegador: `http://localhost:8000`

- **Utilizando Node.js (via npx)**:
  ```bash
  npx serve .
  ```

- **Utilizando a extensão Live Server (VS Code)**:
  Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

---

## 🌐 Publicação no GitHub Pages

O projeto foi preparado e estruturado para publicação imediata no **GitHub Pages** (com arquivo `.nojekyll`, caminhos 100% relativos e workflow automatizado do GitHub Actions):

### Opção A: Deploy Automático via GitHub Actions (Recomendado)
O repositório já inclui o arquivo [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).
1. Envie suas alterações para o GitHub:
   ```bash
   git push origin main
   ```
2. No GitHub, vá em **Settings** > **Pages**.
3. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
4. O workflow será acionado automaticamente a cada `git push` na branch `main`.

### Opção B: Deploy Clássico via Branch
1. Envie suas alterações para o GitHub:
   ```bash
   git push origin main
   ```
2. No GitHub, vá em **Settings** > **Pages**.
3. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `main` e a pasta `/ (root)`.
5. Clique em **Save**.

Após a publicação, o simulador estará disponível em:  
🔗 **https://amlxcom26-art.github.io/pf-guardian-social/**

---

## 🛡️ Princípios Pedagógicos e Éticos

O **Guardian Social** é guiado pelos princípios da constituição do projeto:
- **Linguagem Formativa e Positiva**: O foco é o empoderamento do estudante, ensinando a identificar pistas e técnicas de manipulação sem culpabilizar a vítima.
- **Autonomia Crítica**: Estimula o hábito de pausar e checar canais oficiais antes de interagir por impulso com mensagens alarmantes ou promessas vantajosas.
- **Privacidade por Padrão**: Nenhum rastreador, cookies de terceiros ou coleta de telemetria são utilizados.

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de pesquisa no contexto do Ensino Médio e formação técnica em cibersegurança. Livre para uso pedagógico e adaptação comunitária.
