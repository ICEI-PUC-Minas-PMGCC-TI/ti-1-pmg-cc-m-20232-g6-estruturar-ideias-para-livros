//Json constante com todos os textos possiveis 
const json = [
    // id's 1 á 7 são enredos - Que tal uma historia em que...
    {
      "id": 1,
      "nome": "Jornada",
      "texto": "O protagonista precisa deixar seu local de origem e entrar em um terreno ou ambiente exotico e inesplorado, onde maravilhas e/ou horrores o aguardam a cada passo.",
    },
    {
      "id": 2,
      "nome": "Perseguição",
      "texto": "Existem dois lados, um tentando fugir e outro tentando está alcançar o outro. O protagonista pode estar em qualquer um dos grupos como caçando um monstro ou fugindo de um vilão poderoso.",
    },
    {
      "id": 3,
      "nome": "Mistério",
      "texto": "Algo ruim aconteceu, como um crime ou um grande desastre. É dever do protagonista descobrir como e porque isso aconteceu e encontrar o culpado.",
    },
    {
      "id": 4,
      "nome": "Conflito",
      "texto": "Duas ou mais organizações ou facções estão em comflito e estão prestes á se enfrentar. O protagonista pode pertencer á uma dessas facções, até mesmo ser o lider dela ou simplismente um forasteiro que chegou para ajudar um dos lados.",
    },
    {
      "id": 5,
      "nome": "Resgate",
      "texto": "Algo ou alguém está quardado ouo preso em um território inimigo e/ou hostil. O protagonista foi encarragado de achar, resgatar e traser este algo de volta em segurança.",
    },
    {
      "id": 6,
      "nome": "Diplomacia",
      "texto": "Existe um grande problema que não pode ser sulocionado por força bruta. A unica forma de se chegar á uma solução é por meio da diplomacia e o protagonista foi encarregado de resolver esse grande problema.",
    },
    {
      "id": 7,
      "nome": "Trabalho",
      "texto": "O protagonista é recrutado por um antigo conhecido para resolver um problema local. Essa ameaça esta restrita á região mas ninguém da região é capaz de solociona-la por conta propria",
    },
    // id's 8 á 17 são personagens - nessa historia há um(a)...
    {
      "id": 8,
      "nome": "Capanga",
      "texto": "Um personagem subserviente porém relevante para a historia. Sua personalidade pode variar como um tolo que idolatra seu mestre, um servo leal e inteligente ou um oportunista esperando para roubar os segredos de seu mestre.",
    },
    {
      "id": 9,
      "nome": "Profeta",
      "texto": "Uma voz dos Deuses, do destino ou de qualquer poder superior. Um personagem de dificil acesso mas que pode mudar completamente o rumo da historia com suas professias e previsões.",
    },
    {
      "id": 10,
      "nome": "Autoriade",
      "texto": "Pode ser uma autoriade politica, econômica, fisica, espiritual, magica ou todos os anteriores. Não desempenha muitas ações práticas pois está ocupado mas pode interferir com decretos, recursos, permissões ou capangas que podem ajudar ou atrapalhar o protagonista",
    },
    {
      "id": 11,
      "nome": "Ídolo",
      "texto": "É um personagem famosso e adimirado que de alguma forma está acima do protagonista mas que se envolve na historia e acaba por se tornar um aliado ou rival do protagonista",
    },
    {
      "id": 12,
      "nome": "Mentor",
      "texto": "Sua função é ensinar e inspirar. Embora costume ser velho ele não precisa ser velho, pode ser uma criança com conhecimento dos seus ancestrais, um espirito ou a voz de algo poderoso. O importente é que por algum mtivo ela não é capaz de desempenhar a maior parte das ações diretamente. Ele não presisa ser bondoso mas inspira respeito",
    },
    {
      "id": 13,
      "nome": "Aliado",
      "texto": "É uma figura na qual o protagonista pode confiar e está em pé de igualdade com ele. O aliado tem sua propria vida, não é um lacai ou fã mas sempre causa um grande impacto quando aparece na historia.",
    },
    {
      "id": 14,
      "nome": "Bufão",
      "texto": "Geralmente um alivio cômico na historia ele pode ser um personagem poderoso. O Bufão aponta o ridiculo em volta e nos personagens da historia. Geralmente tem uma certa invulnerabilidade e uma sabedoria ingênua, se morto ou ferido a historia toma um rumo mais sério.",
    },
    {
      "id": 15,
      "nome": "Entidade",
      "texto": "Um ser incompreencivel e poderoso, geralmente ancião. A entidade faz com que os personagens e o protagonista se sintam apenas como peões em seu jogo quando entra em ação devido á seu poder e a natureza de sua existência. Os personagens não são capases de afeta-la seriamente mas podem interagir com ela",
    },
    {
      "id": 16,
      "nome": "Protegido",
      "texto": "É um personagem que sofrerá um destino terrivel a menos que o protagonista fassa algo. Quem quer que seja ele é imcapaz de lidar com a situação em que ele está sozinho e por isso se torna responsabilidade do protagonista saja por puro intereçe ou altruismo",
    },
    {
      "id": 17,
      "nome": "Rival",
      "texto": "É alguém que está em pé de igualdade com o protagonista e aparece esporadicamente durante a historia. O rivla pode ser alguém que compete com o protagonista ou o braço direito do vilão. O importante é que sempre que ele aparece na historia ha conflito, desde uma troca de insultos ou um combate com um resultado incerto.",
    },
    // os id's 18 a 27 são ameaças - o protagonista é ameaçado por...
    {
      "id":18,
      "nome": "Corrompidos",
      "texto": "Criaturas corrompidas por algo maléfico como uma magia, um soro mutante ou um vírus. Eles já estão além da salvação, podem já ter sido pessoas e/ou animais normais mas hoje não passam de monstros.",
    },
    {
      "id":19,
      "nome": "Soldados",
      "texto": "Um grupo armado de seres, geralmente humanoides, se colocam no caminho do protagonista com o objetivo de captura-lo, dete-lo ou até mata-lo.",
    },
    {
      "id":20,
      "nome": "Arcanista e magos",
      "texto": "Uma criatura altamente inteligente com poderes magicos ou com criações de alta tecnologia tenta parar o protagonista de forma inteligente e astuta.",
    },
    {
      "id":21,
      "nome": "Humanoides",
      "texto": "Cavaleiros, caçadores, ilusionistas ou até o povo de uma cidade se põe no caminho do protagonista por acreditar que ele está errado. Geralmente representam perigos que não podem sre resolvidos somente com força bruta.",
    },
    {
      "id":22,
      "nome": "Dragão",
      "texto": "O protagonista acidentalmente acaba chamando a atenção de uma criatura incrivelmente poderosa e seus servos ao entrar em seu territorio ou por suas ações e essa criatura agora quer acertar as contas.",
    },
    {
      "id":23,
      "nome": "Mortos-vivos",
      "texto": "O protagonista de depara com um personagem que ele esperava estar morto mas que sobrevivel de alguma forma ou foi trago de volta á vida de uma maneira desconhecida. Esse personagem acredita que o protagonista causou sua morte e busca vingança.",
    },
    {
      "id":24,
      "nome": "Espiritos da natureza",
      "texto": "Uma criatura ligada á natureza ou um desastre natural interfere nos planos do protagonista geralmente causando uma grande destruição.",
    },
    {
      "id":25,
      "nome": "Feras",
      "texto": "Feras selvagens ou domenticadas como animais e monstros interferem na historia do protagonista seja por um ataque direto, o espionando ou assolando uma região",
    },
    {
      "id":26,
      "nome": "Clerigos",
      "texto": "Um representande de um poder superior se opõe diretamente á missão do protagonista por seus ideais e ou quer provar se o protagonista é digno de receber tal missão",
    },
    {
      "id":27,
      "nome": "Bandidos",
      "texto": "Desde de bandidos à beira da estrada á conspiradores sagazes estão atraz dos pertences do protagonista. Podem estar atraz somente de um pouco de dinheiro á um pertence conhecido e importante na posse do personagem.",
    },
    // os id's 28 á 39 são locais - Durante a aventura o protagonista passa por...
    {
      "id":28,
      "nome": "Fronteiras",
      "texto": "Um local disstante e pouco civilidado, longe do luxo das cidades e com pouca tecnologia e infraestrutura.",
    },
    {
      "id":29,
      "nome": "Subterrâneo",
      "texto": "Um local aaixo da terra com uma entrada pequena mas que esconte um mundo novo no subterrâneo, saja natural como uma caverna ou artificial como um calabouço.",
    },
    {
      "id":30,
      "nome": "Rural",
      "texto": "Uma civilização com pouca tecnologia autosuficiente, geralmente vive em armonia com a naturesa e tem um ar mais calmo.",
    },
    {
      "id":31,
      "nome": "Covil de montros",
      "texto": "Seja um ninho de um animal ou uma fabrica de robôs esse local pertence aos monstro e está infestado deles.",
    },
    {
      "id":32,
      "nome": "Urbano",
      "texto": "Um local altamente urbanizado e repleto de pessoas ques desfrutam das maravilhas da civilização e da tecnologia de ponta da epoca.",
    },
    {
      "id":33,
      "nome": "Fortificação",
      "texto": "Uma estrutura militar feita com o proposito de resistir á ataques como um castelo ou um grande galeão. Está fortemente protegido e geralmente é hostil á visitantes.",
    },
    {
      "id":34,
      "nome": "Divino",
      "texto": "Um local tocado por forças além da comprenção como um monte santo ou um santuario, geralmente está repleto de pessoas que cultuam o poder que tornou o local divino como um Deus ou uma entidade.",
    },
    {
      "id":35,
      "nome": "Ermos",
      "texto": "Um local estranhamente vasio o perigoso seja pelo seu clima, como um deserto, ou devido á algo que matou e destruiu tudo que um dia esteve lá como uma maldição antiga",
    },
    {
      "id":36,
      "nome": "Lar de vilão",
      "texto": "O local onde o vilão vive e/ou traça seus planos. Independente do motivo de ter que entrar aqui a jornado do protagonista será perigosa.",
    },
    {
      "id":37,
      "nome": "Ruinas",
      "texto": "Um lugar abandonado á muito tempo. O motivo desse abandono pode ser conhecido ou não mas o lugar não passa de uma sombra do que já foi um dia e não passa de ruinas.",
    },
    {
      "id":38,
      "nome": "Arcano",
      "texto": "Um lugar tomado pela ciencia e/ou magia. Pode ser um laboratorio, uma biblioteca ou uma torre mas sempre está repleta de conhecimento que pode se provar muito util para o protagonista.",
    },
    {
      "id":39,
      "nome": "Investação",
      "texto": "Um local recentimente habitado mas que teve que ser abandonado por eventos recentes, geralmente uma infestação de criaturas ou o vazamento de algo que nunca deveria ter sido libertado como um vírus mortal",
    },
      //os id's 40 á 49 são eventos - Durante a historia ocorre um(a)...
    {
      "id":40,
      "nome": "Acidente",
      "texto": "Algo dá errado sem que ninguém realmente tenha culpa, geralmente na pior hora possivel.",
   },
   {
      "id":41,
      "nome": "Praga",
      "texto": "Uma doença, maldição ou veneno afeta o desenrolar da aventura.",
    },
    {
      "id":42,
      "nome": "Fenômeno natural",
      "texto": "Tempestades, terremotas, avalanchs, vulcões, incendios... Muitas veses a natureza se volta contra as pessoas e os personagens devem fazer de tudo para sobreviver.",
    },
    {
      "id":43,
      "nome": "Presença divina",
      "texto": "Um ser de grande poder como um Deus ou uma entidade afeta os eventos da historia.",
    },
    {
      "id":44,
      "nome": "Dadiva",
      "texto": "Por pura sorte ou acaso algo aconteçe que ajuda bastante o protagonista. Nem sempre o mundo está contra os heróis."
    },
    {
      "id":45,
      "nome": "Traição",
      "texto": "Alguém em quem o pratagonista comfiava se volta contra ele.",
    },
    {
      "id":46,
      "nome": "Negociação",
      "texto": "Ás vezes o protagonista querem algo e um personagem também e os dois lados devem entrar em consenso.",
    },
    {
      "id":47,
      "nome": "Anomalia sobrenatural",
      "texto": "Por mais que os sabios e cientistas estudem e codifiquem a magia e o mundo, eles ainda podem ser imprevisiveis as vezes. Um evento sem explicação aconteçe, geralmente causado por magia ou uma força sem explicação.",
    },
    {
      "id":48,
      "nome": "Guerra",
      "texto": "O protagonista se depara com dois ou mais grupos que estão se emfrentando ou estão prestes a se enfrentar.",
    },
    {
      "id":49,
      "nome": "Celebração",
      "texto": "O protagonista está em um local em festa.",
    },
  // os id's 50 á 55 são objetos - Durante a historia o protagonista encontra...
    {
      "id":50,
      "nome": "Riquesas",
      "texto": "Uma grande quantidade de dinheiro ou algo de grande valor que pode ser usado como moeda de troca.",
    },
    {
      "id":51,
      "nome": "Itens magicos",
      "texto": "1 ou mais itens dos mais diversos com as mais diversas capacidades dotados de capacidades sobrenaturais ou tecnologicas.",
    },
    {
      "id":52,
      "nome": "Armas e armaduras",
      "texto": "Criações criadas com apenas duas funções, matar inimigos ou impedir que inimigos matem seu portador.",
    },
    {
      "id":53,
      "nome": "Quinquiharias",
      "texto": "Objetos estranhos ou comuns que podem se provar uteis nas mais improvaveis situações.",
    },
    {
      "id":54,
      "nome": "Mercadorias",
      "texto": "Itens e objetos valiosos mas que não são facilmente vendidos ou que poucas pessoas conhecem o seu real valor.",
    },
    {
      "id":55,
      "nome": "Mercado clandestino",
      "texto": "Um lugar escondido das autoridades onde os mais variaveis itens podem ser vendidos e comprados.",
    }
  ];
  
  
  //Codigos e funções da pagiana
  function gerar(){
    
    //sorteia e altera o enredo
    const enredoSorteado = Math.floor((Math.random()*(6))+1);
    alterarInput("enredo" , json[enredoSorteado].nome);
    alterarInput("descEnredo", json[enredoSorteado].texto);
    
    //sorteia e altera o personagem
    const personagemSorteado = Math.floor((Math.random()*(9))+8);
    alterarInput("personagem", json[personagemSorteado].nome);
    alterarInput("descPersonagem", json[personagemSorteado].texto);
    
    //sorteia e altera a ameaça
    const ameaçaSorteada = Math.floor((Math.random()*(9))+18);
    alterarInput("ameaca", json[ameaçaSorteada].nome);
    alterarInput("descAmeaca", json[ameaçaSorteada].texto);
    
    //sorteia e altera o local
    const localSorteado = Math.floor((Math.random()*(11))+28);
    alterarInput("local", json[localSorteado].nome);
    alterarInput("descLocal", json[localSorteado].texto);
    
    //sorteia e altera o evento
    const eventoSorteado = Math.floor((Math.random()*(9))+40);
    alterarInput("evento", json[eventoSorteado].nome);
    alterarInput("descEvento", json[eventoSorteado].texto);
    
    //sorteia e altera 0 objeto
    const objetoSorteado = Math.floor((Math.random()*(5))+50);
    alterarInput("objeto", json[objetoSorteado].nome);
    alterarInput("descObjeto", json[objetoSorteado].texto);
  }
  
  function alterarInput(elementId, novoTexto){
    let input = document.getElementById(elementId);
    if (input == null) {
        console.log("Erro ao carregar o elemento " + elementId);
        return;
    }
    if (novoTexto == null) {
        console.log("Texto em " + elementId + " é nulo")
    }
    input.value = novoTexto;
  }
  
  onload = function () {gerar() }
  onload = function () { alert("Está carregado!") }
  
  document.getElementById("botaoGerar").addEventListener("click", function () {gerar();})