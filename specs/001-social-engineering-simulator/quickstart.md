# Quickstart & Verification Guide: Guardian Social

**Feature**: `001-social-engineering-simulator`  
**Date**: 2026-10-02  
**Status**: Completed  

---

## 1. Pré-Requisitos e Execução Local

Como uma aplicação web 100% estática em HTML5, CSS3 e JavaScript puro, não é necessária a instalação de Node.js, compiladores, bancos de dados ou qualquer dependência externa.

### Modo 1: Execução Local Direta (Offline / Duplo Clique)
1. Navegue até a pasta raiz do repositório.
2. Dê duplo clique no arquivo `index.html` para abrir diretamente no navegador padrão.
3. *Nota de Compatibilidade*: O sistema utiliza automaticamente o dataset fallback em memória (`data/scenarios-fallback.js`) caso as políticas de segurança do navegador restrinjam `fetch()` em arquivos `file://`.

### Modo 2: Servidor Estático Local (Recomendado para Desenvolvimento)
Para testar o carregamento nativo via `fetch('data/scenarios.json')`:
- **Via Python 3**:
  ```bash
  python -m http.server 8080
  ```
  Acesse: `http://localhost:8080`
- **Via Node (se disponível)**:
  ```bash
  npx serve .
  ```
- **Via VS Code / IDE**:
  Utilize a extensão "Live Server" apontando para o `index.html`.

### Modo 3: Publicação no GitHub Pages
1. Faça o commit e push dos arquivos estáticos para o branch `main`.
2. No repositório GitHub, acesse **Settings > Pages**.
3. Selecione a fonte **Deploy from a branch**, escolha o branch `main` e a pasta `/ (root)`.
4. A aplicação estará ativa publicamente na URL fornecida pelo GitHub Pages.

---

## 2. Roteiro de Validação de Ponta a Ponta (E2E)

### Cenário de Teste 1: Exploração e Inspeção Segura (História 1 - P1)
- **Ação 1**: Ao abrir a aplicação, observe o Cenário 1 (ex.: E-mail suspeito de recuperação de senha).
- **Ação 2**: Clique no botão/link "Detalhes do Remetente" ou similar.
  - *Resultado Esperado*: O cabeçalho se expande exibindo o endereço de e-mail e domínio simulados.
- **Ação 3**: Passe o cursor do mouse (desktop) ou toque no link/botão suspeito presente no corpo da mensagem.
  - *Resultado Esperado*: Um balão/tooltip flutuante surge exibindo a URL simulada de destino. A página **NÃO** abre abas externas nem navega para fora da aplicação.

### Cenário de Teste 2: Seleção, Trava e Feedback Pedagógico (História 1 & 2 - P1)
- **Ação 1**: Sem selecionar nenhuma opção, observe o botão "Confirmar Decisão".
  - *Resultado Esperado*: O botão permanece desabilitado (`disabled`).
- **Ação 2**: Clique em "Reportar Ameaça" (ou "Marcar como Legítimo").
  - *Resultado Esperado*: O botão selecionado recebe destaque visual e o botão "Confirmar Decisão" é habilitado.
- **Ação 3**: Clique em "Confirmar Decisão".
  - *Resultado Esperado*:
    1. Os botões de opção e confirmação são imediatamente desabilitados de forma permanente para este cenário.
    2. O painel de feedback pedagógico surge imediatamente abaixo da mensagem (< 300ms).
    3. O feedback indica claramente acerto ou erro, lista os IoCs (Indicadores de Comprometimento), gatilhos emocionais explorados e a regra de ouro preventiva.

### Cenário de Teste 3: Navegação Linear Unidirecional (História 1 & Clarificação)
- **Ação 1**: No painel de feedback pedagógico do Cenário 1, clique em "Próximo Cenário".
  - *Resultado Esperado*: A interface transiciona para o Cenário 2. O indicador exibe `"Cenário 2 de 10"`.
  - *Verificação*: Não há botões de voltar ou alterar a resposta do Cenário 1.

### Cenário de Teste 4: Encerramento e Tela de Resultados Finais (História 3 - P2)
- **Ação 1**: Progrida respondendo aos cenários até atingir o último (ex.: Cenário 10).
- **Ação 2**: Confirme a decisão do último cenário.
  - *Resultado Esperado*: No painel de feedback pedagógico, o botão de avanço exibe explicitamente o texto **"Ver Resultados Finais"**.
- **Ação 3**: Clique em "Ver Resultados Finais".
  - *Resultado Esperado*: A tela transiciona para o relatório de resultados consolidado:
    - Percentual total de acertos `(acertos / total) * 100%`.
    - Lista de pontos fortes baseada nas ameaças identificadas com sucesso.
    - Lista de recomendações pedagógicas de estudo baseada nos erros cometidos.

### Cenário de Teste 5: Reinício da Prática (História 4 - P3)
- **Ação 1**: Na tela de resultados finais, clique no botão "Reiniciar Simulação".
  - *Resultado Esperado*: A aplicação retorna instantaneamente ao Cenário 1, com o contador em `"Cenário 1 de 10"`, histórico e pontuação zerados e todos os campos desmarcados e prontos para nova rodada.

### Cenário de Teste 6: Responsividade Mobile (A11y e Usabilidade)
- **Ação 1**: Abra as Ferramentas do Desenvolvedor (F12) e ative a emulação de dispositivos móveis com largura de 320px a 375px (ex.: iPhone SE).
- **Ação 2**: Verifique a legibilidade dos textos, botões com áreas de toque adequadas (mínimo de 44x44px), ausência de rolagem horizontal quebrada e funcionamento da inspeção de links via toque.
