/**
 * Guardian Social - Dataset Fallback em Memória
 * Permite execução imediata offline quando o arquivo index.html é aberto
 * diretamente via duplo clique (protocolo file://) em navegadores com restrição de CORS para fetch local.
 */

window.GUARDIAN_SCENARIOS = [
  {
    "id": "scenario-01",
    "order": 1,
    "type": "email",
    "title": "URGENTE: Atualização Cadastral Obrigatória do Aluno",
    "sender": {
      "displayName": "Secretaria Escolar Unificada",
      "address": "secretaria@portal-aluno.escola-gov-atualizacao.com",
      "securityStatus": "unverified"
    },
    "body": "Prezado(a) estudante, identificamos inconsistências na sua matrícula para o semestre letivo. Caso seus dados não sejam confirmados até hoje às 23:59, seu acesso ao portal e às notas será temporariamente suspenso. Clique no link abaixo para validar sua senha e documentos.",
    "inspectableElements": [
      {
        "id": "link-01",
        "displayText": "Validar Matrícula e Dados Cadastrais",
        "simulatedDestination": "http://portal-aluno.atualizacao-urgente-login.com/auth/aluno",
        "isDeceptive": true,
        "explanation": "O domínio 'atualizacao-urgente-login.com' é fraudulento e tenta simular a página oficial da escola para roubar credenciais."
      }
    ],
    "isThreat": true,
    "threatCategory": "Phishing por E-mail",
    "iocs": [
      "Domínio de e-mail forjado (@portal-aluno.escola-gov-atualizacao.com em vez do domínio oficial)",
      "Senso de urgência artificial com ameaça de bloqueio no mesmo dia",
      "Link de destino com URL enganosa diferente do site oficial da instituição"
    ],
    "emotionalTriggers": [
      "Urgência Artificial",
      "Medo de Punição / Suspensão"
    ],
    "educationalFeedback": {
      "correctExplanation": "Excelente percepção! Você identificou os clássicos sinais de phishing: remetente com domínio estranho, ameaça de bloqueio imediato e link que leva a um endereço não oficial.",
      "incorrectExplanation": "Cuidado! Este e-mail é uma armadilha de Phishing. Órgãos escolares e educacionais não exigem validação emergencial de senhas sob ameaça de bloqueio no mesmo dia.",
      "keyRule": "Sempre inspecione o endereço do remetente e o domínio real da URL antes de clicar em links que solicitem senhas ou dados cadastrais.",
      "categoryTakeaway": "Golpistas frequentemente criam senso de urgência para que a vítima aja sem pensar criticamente."
    }
  },
  {
    "id": "scenario-02",
    "order": 2,
    "type": "sms",
    "title": "SMS de Notificação de Premiação",
    "sender": {
      "displayName": "Grêmio Estudantil",
      "address": "+55 (11) 98765-4321",
      "securityStatus": "unknown"
    },
    "body": "PARABENS! O seu numero foi contemplado no sorteio de boas-vindas do Gremio Estudantil com 1 iPhone 15 lacrado! Para confirmar o envio e pagar a taxa de entrega de R$ 18,90 acesse agora o link:",
    "inspectableElements": [
      {
        "id": "link-02",
        "displayText": "http://gremio-premiacao-sorteio.xyz/resgatar-premio",
        "simulatedDestination": "http://gremio-premiacao-sorteio.xyz/resgatar-premio",
        "isDeceptive": true,
        "explanation": "Domínio genérico com extensão '.xyz' e cobrança de taxa de frete para entrega de prêmio não solicitado."
      }
    ],
    "isThreat": true,
    "threatCategory": "Smishing (Golpe via SMS)",
    "iocs": [
      "Remetente desconhecido com DDD fora da região da escola",
      "Premiação de alto valor sem participação prévia em concurso",
      "Cobrança de taxa antecipada de frete para liberação do suposto prêmio",
      "URL suspeita registrada sob domínio genérico gratuito/barato (.xyz)"
    ],
    "emotionalTriggers": [
      "Oferta Irrecusável",
      "Euforia / Ganância"
    ],
    "educationalFeedback": {
      "correctExplanation": "Muito bem! Você não caiu no conto do prêmio falso. O golpe de 'sorteio premiado' é um clássico para subtrair pagamentos via PIX ou clonar cartões.",
      "incorrectExplanation": "Atenção: Trata-se de um golpe de Smishing! Nenhuma instituição legítima cobra taxa de envio para entregar prêmios de sorteios legítimos.",
      "keyRule": "Desconfie imediatamente de prêmios inesperados que exijam pagamento prévio de 'taxa de frete' ou 'custos operacionais'.",
      "categoryTakeaway": "Se a oferta parece boa demais para ser verdade, quase certamente é uma fraude."
    }
  },
  {
    "id": "scenario-03",
    "order": 3,
    "type": "email",
    "title": "Calendário de Provas e Feira de Ciências 2026",
    "sender": {
      "displayName": "Secretaria Acadêmica",
      "address": "secretaria@colegio.edu.br",
      "securityStatus": "verified"
    },
    "body": "Prezados alunos e responsáveis, informamos que o cronograma das avaliações do 3º bimestre e o regulamento da Feira de Ciências já estão disponíveis para consulta no portal oficial do colégio. Desejamos a todos uma excelente preparação!",
    "inspectableElements": [
      {
        "id": "link-03",
        "displayText": "Acessar Calendário e Regulamento",
        "simulatedDestination": "https://colegio.edu.br/academico/calendario-avaliacoes",
        "isDeceptive": false,
        "explanation": "Link legítimo pertencente à estrutura oficial do domínio institucional da escola (colegio.edu.br) protegido por HTTPS."
      }
    ],
    "isThreat": false,
    "threatCategory": "Comunicação Legítima",
    "iocs": [],
    "emotionalTriggers": [
      "Nenhum (Informativo Institucional)"
    ],
    "educationalFeedback": {
      "correctExplanation": "Perfeito! Esta é uma mensagem autêntica. O remetente utiliza o domínio institucional (@colegio.edu.br), não há pedidos de senha nem senso de urgência manipulador.",
      "incorrectExplanation": "Você marcou esta mensagem como ameaça, mas ela é legítima! Nem toda comunicação com links é golpe. O endereço de e-mail e o destino do link apontam para o domínio institucional oficial.",
      "keyRule": "Aprender a reconhecer comunicações legítimas é tão importante quanto identificar golpes: analise a coerência do remetente e a ausência de pedidos invasivos.",
      "categoryTakeaway": "Mensagens oficiais têm tom informativo, canais claros e não exigem ações desesperadas do usuário."
    }
  },
  {
    "id": "scenario-04",
    "order": 4,
    "type": "login",
    "title": "Acesso ao Google Sala de Aula - Confirmação de Sessão",
    "sender": {
      "displayName": "Google Classroom Sandbox",
      "address": "accounts.google.com.acesso-seguro.online",
      "securityStatus": "unverified"
    },
    "body": "Sua sessão no Google Classroom expirou por inatividade. Para continuar entregando as tarefas escolares da semana, informe novamente seu e-mail institucional e senha de acesso abaixo.",
    "inspectableElements": [
      {
        "id": "link-04",
        "displayText": "Barra de Endereço Simulada",
        "simulatedDestination": "http://accounts.google.com.acesso-seguro.online/signin",
        "isDeceptive": true,
        "explanation": "Técnica de subdomínio enganoso: o domínio real é 'acesso-seguro.online', e não 'google.com'."
      }
    ],
    "isThreat": true,
    "threatCategory": "Página de Login Clonada (Credential Harvesting)",
    "iocs": [
      "Endereço na barra de navegação com subdomínio forjado (o domínio real é o que fica antes da última barra: 'acesso-seguro.online')",
      "Página de autenticação sem conexão segura válida (HTTP em vez de HTTPS)",
      "Captura forçada de credenciais escolares para invasão de contas"
    ],
    "emotionalTriggers": [
      "Preocupação com Prazos Escolares",
      "Hábito / Piloto Automático"
    ],
    "educationalFeedback": {
      "correctExplanation": "Excelente olho clínico! Você reparou que o domínio real é 'acesso-seguro.online' mascarado com palavras-chave confiáveis no início. Essa é a técnica mais comum de roubo de senhas.",
      "incorrectExplanation": "Atenção crítica! Trata-se de uma página falsa de login. O invasor colocou 'accounts.google.com' no início para induzir ao erro, mas o domínio verdadeiro é 'acesso-seguro.online'.",
      "keyRule": "Sempre leia a URL da direita para a esquerda: o domínio verdadeiro é aquele imediatamente anterior à primeira barra ('/') após o protocolo.",
      "categoryTakeaway": "Páginas clonadas copiam o visual exato de plataformas conhecidas para capturar senhas no piloto automático do usuário."
    }
  },
  {
    "id": "scenario-05",
    "order": 5,
    "type": "sms",
    "title": "Alerta de Segurança Bancária",
    "sender": {
      "displayName": "Central de Segurança",
      "address": "+55 (085) 99123-9988",
      "securityStatus": "unknown"
    },
    "body": "ALERTA BANCO: Transferencia PIX de R$ 850,00 agendada para conta desconhecida. Caso nao reconheca, cancele imediatamente ligando no 0800 informado ou acesse:",
    "inspectableElements": [
      {
        "id": "link-05",
        "displayText": "http://pix-bloqueio-imediato.top/cancelar",
        "simulatedDestination": "http://pix-bloqueio-imediato.top/cancelar",
        "isDeceptive": true,
        "explanation": "Domínio fraudulento '.top' com intenção de roubar credenciais bancárias e dados de cartão."
      }
    ],
    "isThreat": true,
    "threatCategory": "Smishing Bancário / Falso PIX",
    "iocs": [
      "Número de celular comum se passando por central de banco",
      "Simulação de perda financeira para gerar pânico e reação precipitada",
      "Link com domínio suspeito (.top) solicitando cancelamento de operação"
    ],
    "emotionalTriggers": [
      "Pânico Financeiro",
      "Urgência Extrema"
    ],
    "educationalFeedback": {
      "correctExplanation": "Ótima decisão! Você não se deixou levar pelo susto. Bancos nunca enviam links para cancelamento de transações via SMS de celulares comuns.",
      "incorrectExplanation": "Muito cuidado! Esta mensagem é um golpe clássico de 'Falso PIX'. Os criminosos simulam uma perda de dinheiro para fazer a vítima clicar no link em pânico.",
      "keyRule": "Se receber aviso de transação não autorizada, nunca clique no link da mensagem: abra diretamente o aplicativo oficial do seu banco ou use os números impressos no seu cartão.",
      "categoryTakeaway": "A engenharia social financeira explora o medo imediato de perder dinheiro para derrubar a postura crítica da vítima."
    }
  },
  {
    "id": "scenario-06",
    "order": 6,
    "type": "email",
    "title": "Aviso de Devolução de Livro da Biblioteca",
    "sender": {
      "displayName": "Biblioteca Escolar Prof. Darcy Ribeiro",
      "address": "biblioteca@colegio.edu.br",
      "securityStatus": "verified"
    },
    "body": "Olá! Lembramos que o exemplar 'Dom Casmurro' retirado em seu nome tem data de devolução prevista para a próxima sexta-feira. Caso queira renovar o empréstimo, você pode comparecer ao balcão ou acessar o catálogo de livros.",
    "inspectableElements": [
      {
        "id": "link-06",
        "displayText": "Consultar Catálogo e Horários da Biblioteca",
        "simulatedDestination": "https://colegio.edu.br/biblioteca/consulta-acervo",
        "isDeceptive": false,
        "explanation": "Link oficial institucional da biblioteca escolar sob conexão segura HTTPS."
      }
    ],
    "isThreat": false,
    "threatCategory": "Comunicação Legítima",
    "iocs": [],
    "emotionalTriggers": [
      "Lembrete de Rotina"
    ],
    "educationalFeedback": {
      "correctExplanation": "Correto! É uma notificação legítima e tranquila. O remetente é o e-mail real da biblioteca, não há ameaças, links suspeitos ou exigência de senhas.",
      "incorrectExplanation": "Essa mensagem é legítima! Notificações rotineiras de bibliotecas e serviços escolares que apenas orientam o aluno sem pedir credenciais nem criar pânico são autênticas.",
      "keyRule": "Mensagens que dão opções presenciais (como 'comparecer ao balcão') e usam links oficiais sem exigir dados pessoais costumam ser seguras.",
      "categoryTakeaway": "O equilíbrio da cibersegurança envolve reconhecer com tranquilidade os canais institucionais seguros do dia a dia."
    }
  },
  {
    "id": "scenario-07",
    "order": 7,
    "type": "email",
    "title": "VAGA APROVADA: Jovem Aprendiz / Auxiliar Administrativo Home Office",
    "sender": {
      "displayName": "RH Seleção Brasil",
      "address": "selecao.aprendiz@vagas-homeoffice-brasil.net",
      "securityStatus": "unverified"
    },
    "body": "Parabéns! Seu currículo foi pré-selecionado para vaga de Jovem Aprendiz Remoto. Salário inicial de R$ 2.450,00 + Vale Alimentação para 4 horas diárias. Não exigimos experiência. Baixe o contrato e a lista de documentos em anexo para confirmar seu interesse.",
    "inspectableElements": [
      {
        "id": "link-07",
        "displayText": "Baixar Contrato_Trabalho_Assinatura.zip (2.4 MB)",
        "simulatedDestination": "http://vagas-homeoffice-brasil.net/arquivos/Contrato_Trabalho_Assinatura.zip",
        "isDeceptive": true,
        "explanation": "Arquivo compactado (.zip) que costuma ocultar arquivos executáveis maliciosos (trojans/malware)."
      }
    ],
    "isThreat": true,
    "threatCategory": "Phishing de Falso Emprego / Anexo Malicioso",
    "iocs": [
      "Salário desproporcionalmente alto para jornada reduzida de jovem aprendiz sem experiência",
      "Envio de arquivo compactado (.zip) com potencial conteúdo malicioso (malware)",
      "Remetente genérico não vinculado a nenhuma empresa conhecida"
    ],
    "emotionalTriggers": [
      "Esperança / Desejo de Emprego",
      "Necessidade Financeira"
    ],
    "educationalFeedback": {
      "correctExplanation": "Perfeito! Você identificou uma das armadilhas mais comuns voltadas para jovens: vagas de emprego milagrosas que pedem para baixar arquivos compactados (.zip/.exe) para infectar o computador.",
      "incorrectExplanation": "Atenção: Trata-se de golpe! Criminosos se aproveitam do sonho do primeiro emprego para enviar arquivos maliciosos que roubam dados do dispositivo.",
      "keyRule": "Nunca baixe arquivos compactados (.zip, .rar) ou executáveis (.exe, .bat) recebidos por e-mails de processos seletivos não solicitados.",
      "categoryTakeaway": "Ofertas de emprego fáceis com salários irreais e sem processo seletivo estruturado são iscas para disseminação de malwares."
    }
  },
  {
    "id": "scenario-08",
    "order": 8,
    "type": "sms",
    "title": "Código de Segurança em Duas Etapas",
    "sender": {
      "displayName": "Verificação 2FA",
      "address": "28595",
      "securityStatus": "verified"
    },
    "body": "Seu código de segurança da conta é: 749-102. Não compartilhe este código com ninguém, inclusive atendentes. Se você não solicitou, altere sua senha no aplicativo oficial.",
    "inspectableElements": [],
    "isThreat": false,
    "threatCategory": "Comunicação Legítima",
    "iocs": [],
    "emotionalTriggers": [
      "Segurança Preventiva"
    ],
    "educationalFeedback": {
      "correctExplanation": "Muito bem! Trata-se de um SMS autêntico de autenticação em dois fatores (2FA). O número emissor é um short-code oficial (5 dígitos), não há links clicáveis e há um aviso explícito de não compartilhar o código.",
      "incorrectExplanation": "Esta mensagem é legítima. Códigos de dois fatores legítimos apenas exibem os dígitos para autenticação voluntária do próprio usuário e alertam expressamente para não repassar a informação a terceiros.",
      "keyRule": "Códigos de 2FA legítimos não contêm links de redirecionamento e alertam claramente para mantê-los em sigilo.",
      "categoryTakeaway": "A autenticação de dois fatores é uma das melhores barreiras de defesa; o risco só existe se você ditar ou fornecer esse código a outra pessoa."
    }
  },
  {
    "id": "scenario-09",
    "order": 9,
    "type": "email",
    "title": "Aviso de Infração de Direitos Autorais e Suspensão de Perfil",
    "sender": {
      "displayName": "Suporte e Segurança Social",
      "address": "direitos.autorais@suporte-instagram-verificacao.co",
      "securityStatus": "unverified"
    },
    "body": "Recebemos denúncias de que publicações recentes no seu perfil violam direitos de propriedade intelectual. Caso não conteste a notificação nas próximas 24 horas, sua conta será excluída permanentemente. Clique abaixo para preencher o formulário de defesa.",
    "inspectableElements": [
      {
        "id": "link-09",
        "displayText": "Preencher Formulário de Defesa e Verificação",
        "simulatedDestination": "http://suporte-instagram-verificacao.co/reclamacao/formulario-contestacao",
        "isDeceptive": true,
        "explanation": "Domínio forjado que não pertence à Meta/Instagram, utilizando prazo curto para coagir a vítima."
      }
    ],
    "isThreat": true,
    "threatCategory": "Spear Phishing em Redes Sociais",
    "iocs": [
      "Domínio falso terminado em '.co' imitando suporte de rede social",
      "Ameaça de exclusão imediata da conta em 24 horas",
      "Formulário externo pedindo credenciais da rede social para cancelamento da denúncia"
    ],
    "emotionalTriggers": [
      "Medo de Perda de Identidade Digital",
      "Urgência Artificial"
    ],
    "educationalFeedback": {
      "correctExplanation": "Excelente defesa! Golpes que ameaçam banir perfis de redes sociais são campeões em vitimar estudantes. Redes sociais oficiais resolvem contestações dentro das opções do próprio aplicativo.",
      "incorrectExplanation": "Atenção: É uma tentativa de sequestro de conta social! Plataformas como Instagram e TikTok não enviam e-mails com links externos para resolver direitos autorais.",
      "keyRule": "Qualquer notificação sobre segurança da sua rede social deve ser checada diretamente nas 'Configurações > Segurança' do próprio aplicativo, nunca em links de e-mails.",
      "categoryTakeaway": "O medo de perder o perfil ou seguidores é intensamente explorado em ataques direcionados a jovens e criadores de conteúdo."
    }
  },
  {
    "id": "scenario-10",
    "order": 10,
    "type": "login",
    "title": "Evento Especial: Resgate 5.000 Diamantes / Moedas de Jogo Grátis",
    "sender": {
      "displayName": "Central de Recompensas Gamer",
      "address": "resgate-diamantes-evento.shop",
      "securityStatus": "unverified"
    },
    "body": "Parabéns jogador! Você participou do evento da temporada e ganhou 5.000 Diamantes + Passe de Elite Gratuito! Conecte-se com sua conta de jogo abaixo para creditar os itens imediatamente.",
    "inspectableElements": [
      {
        "id": "link-10",
        "displayText": "Barra de Endereço Simulada",
        "simulatedDestination": "http://resgate-diamantes-evento.shop/login-auth",
        "isDeceptive": true,
        "explanation": "Site falso com extensão '.shop' criado para subtrair credenciais de jogos online de jovens e estudantes."
      }
    ],
    "isThreat": true,
    "threatCategory": "Phishing em Jogos Online (Game Credential Harvesting)",
    "iocs": [
      "Promessa de itens caros de jogos de forma totalmente gratuita",
      "Endereço web não oficial sob domínio '.shop' em vez do site da distribuidora do jogo",
      "Pedido explícito de usuário e senha em troca de vantagens in-game"
    ],
    "emotionalTriggers": [
      "Desejo de Status / Vantagem em Jogos",
      "Oferta Irrecusável"
    ],
    "educationalFeedback": {
      "correctExplanation": "Perfeito para fechar a rodada! O roubo de contas de jogos é uma das ameaças mais frequentes no Ensino Médio. Nenhum jogo oficial dá moedas virtuais em sites externos não autorizados.",
      "incorrectExplanation": "Cuidado! Esse é um golpe clássico de roubo de contas gamers. Ao digitar suas credenciais, os golpistas mudam o e-mail cadastrado e vendem os itens e skins da sua conta.",
      "keyRule": "Itens, skins e moedas de jogos devem ser adquiridos exclusivamente dentro da loja oficial do próprio jogo. Nunca insira sua senha em sites de 'gemas grátis'.",
      "categoryTakeaway": "A indústria de games é alvo constante de cibercriminosos que exploram a busca de jovens por vantagens cosméticas e competitivas."
    }
  }
];
