# Implementation Plan: Simulador de Engenharia Social (Guardian Social)

**Branch**: `001-social-engineering-simulator` | **Date**: 2026-10-02 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-social-engineering-simulator/spec.md`

## Summary

O Guardian Social é um simulador interativo (sandbox) educacional voltado a estudantes do Ensino Médio para prática ativa e segura de detecção de ameaças de engenharia social (phishing, smishing e páginas clonadas). A aplicação será implementada como uma aplicação web estática client-side desenvolvida estritamente em **HTML5 semântico, CSS3 moderno e JavaScript puro (ES6+ Vanilla)**, com separação explícita entre apresentação, dados e lógica de estado, sem qualquer framework frontend ou dependência de backend, e totalmente compatível com hospedagem no **GitHub Pages**.

## Technical Context

**Language/Version**: HTML5 (semântico), CSS3 (moderno, CSS Custom Properties, Flexbox, Grid), JavaScript (ES6+ Vanilla).

**Primary Dependencies**: Nenhuma (Zero runtime frameworks, zero bibliotecas de terceiros, zero bundlers obrigatórios).

**Storage**: `sessionStorage` nativo do navegador para retenção temporária do estado da rodada; dados dos cenários carregados a partir de `data/scenarios.json` com fallback em memória (`data/scenarios-fallback.js`).

**Testing**: Validação end-to-end orientada a cenários de aceitação conforme o [quickstart.md](quickstart.md) e validação de schema JSON dos cenários.

**Target Platform**: Navegadores modernos (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) em Desktop e Dispositivos Móveis (Smartphones/Tablets a partir de 320px de largura).

**Project Type**: Single-Page Application (SPA) estática educacional.

**Performance Goals**: Carregamento inicial em < 1s, transição entre cenários e exibição de feedback em < 300ms, cômputo de resultados em < 100ms.

**Constraints**:
- Execução direta no navegador e compatibilidade integral com GitHub Pages;
- Links simulados 100% inertes na sandbox sem abertura de páginas externas reais;
- Sem autenticação, sem cadastro e sem coleta de credenciais ou dados pessoais de estudantes;
- Código particionado e legível para fins educativos.

**Scale/Scope**: Rodada linear curricular de 8 a 10 cenários pré-configurados, cobrindo e-mails, SMS e telas de login fictícias.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio da Constituição | Status | Justificativa / Mecanismo de Conformidade |
| :--- | :---: | :--- |
| **I. Usabilidade e Simplicidade para Ensino Médio** | **PASS** | Interface limpa e autoexplicativa com duas opções diretas ("Marcar como Legítimo" e "Reportar Ameaça"). |
| **II. Simulação Fidedigna, Responsiva e Acessível** | **PASS** | Simula e-mails e mensagens reais com inspeção hover/touch e layout fluido para telas de 320px a desktop. |
| **III. Arquitetura Estática Vanilla (Zero Dependências)** | **PASS** | 100% HTML5, CSS3 e JS puro; separação clara em pastas `/css`, `/js`, `/data` e `/assets` sem frameworks. |
| **IV. Feedback Imediato e Interativo** | **PASS** | Feedback pedagógico instantâneo (< 300ms) após clique em confirmar a decisão. |
| **V. Segurança Intrínseca e Isolamento Sandbox** | **PASS** | Links inertes com `preventDefault`, credenciais simuladas e zero chamadas a bancos ou APIs remotas. |
| **VI. Feedback Pedagógico Detalhado por Cenário** | **PASS** | Decomposição formal dos Indicadores de Comprometimento (IoCs), gatilhos emocionais e regras de ouro. |
| **VII. Compatibilidade e Publicação no GitHub Pages** | **PASS** | Caminhos relativos universais, sem build server-side, executável diretamente via GitHub Pages ou localmente. |

*Resultado do Gate*: **APROVADO (7/7 princípios cumpridos)**.

## Project Structure

### Documentation (this feature)

```text
specs/001-social-engineering-simulator/
├── spec.md              # Especificação de requisitos funcionais e regras de negócio
├── plan.md              # Este plano de implementação
├── research.md          # Decisões arquiteturais e mitigações técnicas
├── data-model.md        # Especificação detalhada de entidades e máquina de estados
├── quickstart.md        # Roteiro de validação end-to-end e instruções de execução
├── contracts/
│   ├── scenarios-schema.json # Schema formal JSON para validação dos cenários
│   └── ui-contracts.md       # Contratos de interface entre camadas (DOM, Lógica, Dados)
└── checklists/
    └── requirements.md  # Checklist de conformidade e qualidade da especificação
```

### Source Code (repository root)

A estrutura de código fonte separa estritamente **Apresentação**, **Dados** e **Lógica**:

```text
pf-guardian-social/
├── index.html                   # Casca da SPA (HTML5 semântico, landmarks ARIA e containers)
├── css/
│   ├── variables.css            # Design tokens: paleta, tipografia, espaçamentos e raios de borda
│   ├── base.css                 # Reset, regras de tipografia global e estrutura de layout
│   ├── components.css           # Estilos de cards de cenários, botões, badges e balão de inspeção
│   └── responsive.css           # Ajustes para telas móveis (media queries @media <= 768px e <= 480px)
├── data/
│   ├── scenarios.json           # Base de dados JSON com 8 a 10 cenários pedagógicos curados
│   └── scenarios-fallback.js    # Fallback em memória (window.GUARDIAN_SCENARIOS) para execução offline
├── js/
│   ├── state.js                 # Lógica de Estado: controle de pontuação, trava permanente e sessão
│   ├── scenarios-loader.js      # Lógica de Dados: carregamento assíncrono via fetch() com fallback
│   ├── ui.js                    # Camada de Apresentação: renderização DOM dos cenários, feedback e tela final
│   ├── events.js                # Lógica de Interação: delegação de eventos, inspeção hover/touch e botões
│   └── app.js                   # Bootstrap da aplicação: inicialização e orquestração dos módulos
└── assets/
    ├── icons/                   # Ícones SVG leves (alerta, escudo, e-mail, sms, check, info)
    └── images/                  # Imagens e avatares fictícios simulados
```

**Structure Decision**: 
A estrutura adotada particiona com clareza as três responsabilidades requeridas:
1. **Apresentação**: `index.html`, `css/*` e `js/ui.js` focados exclusivamente na interface, estilos e renderização no DOM.
2. **Dados**: `data/scenarios.json` e `data/scenarios-fallback.js` contendo o conteúdo didático estruturado.
3. **Lógica**: `js/state.js`, `js/events.js`, `js/scenarios-loader.js` e `js/app.js` encapsulando as regras de pontuação binária, travamento permanente de resposta, controle de fluxo e inicialização.

## Complexity Tracking

> **Nenhuma complexidade adicional ou violação aos princípios da Constituição.**  
> O projeto adota uma arquitetura estática Vanilla minimalista, eliminando bundlers, bibliotecas pesadas e backends desnecessários, mantendo 100% de aderência às metas de simplicidade pedagógica e facilidade de manutenção.
