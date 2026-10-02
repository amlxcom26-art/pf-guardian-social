
# Guardian Social Constitution

## Core Principles

### I. Usabilidade e Simplicidade para o Ensino Médio
A interface do usuário MUST ser simples, limpa, intuitiva e especialmente desenhada para o público do Ensino Médio.
- A experiência de navegação MUST evitar sobrecarga cognitiva, terminologias desnecessariamente complexas sem contexto e fluxos confusos.
- Instruções de uso e comandos na tela MUST ser diretos e autoexplicativos, permitindo que qualquer estudante inicie as atividades imediatamente.
- *Rationale*: O objetivo principal é o engajamento e o aprendizado sobre segurança digital; qualquer barreira de fricção na usabilidade compromete a eficácia pedagógica.

### II. Simulação Fidedigna, Responsiva e Acessível
A interface MUST simular ambientes digitais reais com fidelidade, garantindo simultaneamente usabilidade e acessibilidade plena em qualquer dispositivo.
- Os cenários interativos MUST replicar visualmente e funcionalmente interfaces cotidianas dos estudantes, tais como caixas de entrada de e-mail, telas de SMS/mensagens instantâneas e páginas de autenticação/login.
- A aplicação MUST ser totalmente responsiva (mobile-friendly), assegurando legibilidade e operação perfeita em smartphones, tablets e desktops de diferentes resoluções.
- As telas MUST seguir diretrizes fundamentais de acessibilidade (WCAG 2.1 AA básica), garantindo contraste de cores legível, marcação semântica para leitores de tela e suporte integral a navegação por teclado.
- *Rationale*: A identificação de ameaças de engenharia social depende do reconhecimento de padrões gráficos e contextuais idênticos aos observados na vida real, que ocorrem predominantemente em dispositivos móveis e navegadores diversos.

### III. Arquitetura Estática Vanilla (Zero Dependências)
A base de código MUST ser estruturada com tecnologias web puras e fundamentais, sendo estática, organizada, legível e de fácil manutenção.
- O código MUST ser implementado exclusivamente com HTML5 semântico, CSS3 moderno e JavaScript puro (ES6+ Vanilla).
- É estritamente PROIBIDO (MUST NOT) o uso de frameworks frontend (como React, Vue ou Angular), pipelines de build obrigatórios que gerem bundles ofuscados, ou dependências de servidores/backends (Node.js, bancos de dados relacionais ativos, contêineres).
- A base de código MUST ter separação clara de responsabilidades em pastas padronizadas (ex.: `/css`, `/js`, `/data`, `/assets`), com nomenclatura semântica de arquivos e comentários explicativos para facilitar futuras extensões por educadores e desenvolvedores.
- *Rationale*: Garante longevidade máxima do software, facilidade de auditoria educacional, ausência de vulnerabilidades em dependências de terceiros e facilidade de execução local sem dependências de compilação.

### IV. Feedback Imediato e Interativo
A aplicação MUST responder de forma interativa e dinâmica a cada decisão ou interação tomada pelo estudante durante a navegação.
- Cada clique em elemento interativo (como botões de verificação, denúncia, links, campos de digitação simulados) MUST desencadear uma resposta visual e de estado sem latência perceptível.
- A aplicação MUST registrar o status da simulação e exibir indicadores claros de progresso na sessão.
- *Rationale*: O aprendizado prático e investigativo em modelo sandbox requer que o aluno perceba a causa e efeito imediata de cada ação tomada na interface.

### V. Segurança Intrínseca e Isolamento Sandbox
A aplicação MUST ser um ambiente estritamente seguro, isolado e controlado, eliminando quaisquer riscos cibernéticos ou violações de privacidade.
- É estritamente PROIBIDO (MUST NOT) coletar, armazenar ou solicitar credenciais reais, senhas de contas verdadeiras ou dados pessoais identificáveis (PII) dos alunos.
- Todos os links, botões, anexos e códigos maliciosos simulados MUST ser inertes, inofensivos e confinados à sandbox, sendo terminantemente proibido redirecionar para domínios externos nocivos reais.
- Nenhuma conexão a banco de dados externo ou serviço remoto de telemetria não auditado será permitida; todos os cenários e lógicas residem no cliente.
- *Rationale*: A integridade e privacidade dos alunos (em consonância com a LGPD) e a segurança dos ambientes escolares são prioritárias; simular ameaças nunca pode criar vulnerabilidades reais.

### VI. Feedback Pedagógico Detalhado por Cenário
Cada cenário concluído MUST obrigatoriamente fornecer uma análise educativa aprofundada sobre a decisão tomada pelo aluno.
- O feedback MUST desconstruir os elementos do cenário, indicando com precisão os vetores de risco (como remetentes forjados, links mascarados, senso de urgência, solicitações incomuns de dados).
- O feedback MUST explicar didaticamente o porquê da resposta estar correta ou incorreta, além de destacar a "Regra de Ouro" ou boa prática recomendada para aquela situação no mundo real.
- *Rationale*: A ferramenta é primariamente formativa. Apenas pontuar certo ou errado sem explicar os indícios e a mecânica do ataque impede o desenvolvimento do senso crítico do estudante.

### VII. Compatibilidade e Publicação no GitHub Pages
A aplicação MUST ser concebida e mantida para execução imediata no navegador e publicação direta no GitHub Pages.
- O projeto MUST funcionar em sua totalidade servido como site estático, suportando tanto acesso via servidor HTTP estático quanto deploy no GitHub Pages sem etapas intermediárias proprietárias de servidor.
- Todas as rotas de arquivos, imagens, estilos e scripts MUST utilizar caminhos relativos compatíveis com estruturas de hospedagem sob subdiretórios de repositório.
- *Rationale*: Viabiliza a democratização do projeto sem custos de infraestrutura, permitindo que escolas públicas e educadores utilizem o simulador diretamente da nuvem de forma gratuita e escalável.

## Requisitos Técnicos e Diretrizes de Segurança

- Estrutura de Dados dos Cenários: Os cenários educativos de simulação MUST ser modelados em formatos estruturados e transparentes (JSON ou módulos JS puros), contendo metadados completos (identificador, título, categoria de ameaça, remetente simulado, corpo da mensagem, opções de escolha, indicadores de fraude e justificativa pedagógica).
- Persistência Local Opcional: Quando necessário reter pontuação ou histórico de cenários navegados dentro da sessão escolar, a persistência MUST ocorrer exclusivamente através de APIs nativas do navegador (`localStorage` ou `sessionStorage`), sem transmissão para a nuvem.
- Validação e Higienização de Interface: Todo conteúdo de simulação injetado dinamicamente no DOM deve seguir práticas seguras de renderização para evitar Cross-Site Scripting (XSS) acidental dentro da sandbox.

## Fluxo de Desenvolvimento e Garantia de Qualidade

- Validação Pedagógica e de Conteúdo: A adição ou modificação de cenários de ataque deve passar por verificação de relevância para a faixa etária do Ensino Médio e clareza pedagógica dos feedbacks.
- Verificação de Integridade de Links e Recursos: Nenhum link de phishing simulado pode apontar para páginas externas ativas ou desconhecidas; todos devem ser tratados por rotinas internas de captura de evento (`event.preventDefault()`) ou links estáticos fictícios.
- Testabilidade Multiplataforma: Alterações visuais e comportamentais devem ser testadas em navegadores modernos padrão (Chrome, Firefox, Safari, Edge) e em dimensões de tela móvel e desktop antes de qualquer release.

## Governance

- Esta Constituição representa o documento regulatório supremo do projeto Guardian Social, prevalecendo sobre quaisquer escolhas arbitrárias de arquitetura ou preferências temporárias de implementação.
- Procedimento de Emendas: Alterações nos princípios ou nas diretrizes desta constituição devem ser documentadas, justificadas com base pedagógica ou técnica e versionadas formalmente.
- Versionamento Semântico da Constituição:
  - MAJOR (X.0.0): Inclusão, remoção ou redefinição estrutural de princípios essenciais (ex.: introdução de backend ou quebra do modelo estático).
  - MINOR (x.Y.0): Adição de novas diretrizes, novos requisitos de qualidade ou expansão substantiva de seções normativas.
  - PATCH (x.y.Z): Correções ortográficas, esclarecimentos terminológicos e ajustes de formatação não semânticos.
- Conformidade em Revisões: Qualquer contribuição, especificação de funcionalidade (`/speckit-specify`) ou plano de implementação (`/speckit-plan`) MUST validar sua conformidade com estes 7 princípios essenciais antes da escrita de código.

**Version**: 1.0.0 | **Ratified**: 2026-10-02 | **Last Amended**: 2026-10-02
