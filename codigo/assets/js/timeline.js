const databaseLink = "https://organizarideiasjsonserver.isaquedias1.repl.co";
const linkInicial = "../";
var dataEventos;
var idHistoria;

function parametro(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

function voltarParaInicio() {
    let search = linkInicial + "cadastro-historia/cadastro-historia.html?";
    search += "historia=" + parametro("historia");
    search += "&usuario=" + parametro("usuario");
    window.location.href = search;
}


function atualizarPagina(idFoco) {
    var search = databaseLink + "/eventos/" + idFoco;
    fetch(search)
        .then(response => response.json())
        .then(data => {
            dataEventos = data;
            atualizar();
            carregarPaginaEvento(idFoco);
        })
}

function gerarTimeline() {
    console.log("Tentando gerar timeline...")
    console.log(dataEventos)

    let maiorAno = -Infinity;
    let menorAno = Infinity;

    // Procura a menor data e maior data
    for (let i = 0; i < dataEventos.length; i++) {

        console.log("Identificando valores de inicio/fim em: ")
        console.log(dataEventos[i]);

        let anoInicio;
        console.log("Ano inicio: " + dataEventos[i].data_inicio);
        if (dataEventos[i].data_inicio != undefined) {
            anoInicio = parseInt(dataEventos[i].data_inicio);
            console.log("Ano inicio encontrado.")
            console.log("Testando maior/menor em ano inicio");
            if (anoInicio > maiorAno) {
                maiorAno = anoInicio
            }
            if (anoInicio < menorAno) {
                menorAno = anoInicio;
            }
        }

        let anoFim;
        console.log("Ano fim: " + dataEventos[i].data_fim);
        if (dataEventos[i].data_fim) {
            anoFim = parseInt(dataEventos[i].data_fim);
            console.log("Ano fim encontrado.")
            console.log("Testando maior/menor em ano fim");
            if (anoFim > maiorAno) {
                maiorAno = anoFim
            }
            if (anoFim < menorAno) {
                menorAno = anoFim;
            }
        }

        console.log("Maior: " + maiorAno + " | Menor: " + menorAno);
    }
    console.log("MAIOR-MENOR FINAL --> Maior: " + maiorAno + " | Menor: " + menorAno);

    document.getElementById("fim").textContent = maiorAno;
    document.getElementById("inicio").textContent = menorAno;

    // Gera a timeline
    for (let i = 0; i < dataEventos.length; i++) {
        let x, y = 40, tamanho = 25, data, nome, tipo;

        if (dataEventos[i].data_inicio) {
            x = coordenadaDoAno(menorAno, maiorAno, parseInt(dataEventos[i].data_inicio));
            data = dataEventos[i];
            nome = dataEventos[i].nome;
            tipo = "inicio";
            criarInteragivel(x, y, tamanho, data, nome, tipo)
        }

        if (dataEventos[i].data_fim) {
            x = coordenadaDoAno(menorAno, maiorAno, parseInt(dataEventos[i].data_fim));
            data = dataEventos[i];
            nome = dataEventos[i].nome;
            tipo = "fim";
            criarInteragivel(x, y, tamanho, data, nome, tipo)
        }
    }
}

function coordenadaDoAno(anoInicial, anoFinal, ano) {
    // Verifica se o ano está dentro do intervalo [anoInicial, anoFinal]
    if (ano < anoInicial || ano > anoFinal) {
        console.error("O ano fornecido está fora do intervalo definido pelos anos inicial e final.");
        return null;
    }

    // Calcula a porcentagem do ano em relação ao intervalo [anoInicial, anoFinal]
    var porcentagem = ((ano - anoInicial) / (anoFinal - anoInicial)) * 100;
    // Limita
    porcentagem = porcentagem * 0.7 + 15;
    return porcentagem;
}

function apagarInteragiveis() {
    const canvas = document.getElementById("sliderTooltip");
    let circles = canvas.getElementsByClassName("circle");
    Array.from(circles).forEach(circle => {
        circle.remove();
    });
}

function criarInteragivel(x, y, tamanho, data, nome, tipo) {
    const canvas = document.getElementById("sliderTooltip");
    console.log("Criando interagível em " + canvas + " com seguintes dados:")
    console.log(`${x}, ${y}, ${tamanho}, ${data}, ${nome}, ${tipo}`)

    if (canvas) {
        const interagivel = document.createElement("div");
        interagivel.classList.add("circle"); // Adicione uma classe para estilização
        interagivel.classList.add(tipo);

        // Calcule as coordenadas relativas ao tamanho do canvas
        const left = (x / 100) * canvas.clientWidth + canvas.getBoundingClientRect().left - tamanho / 2;
        const top = (y / 100) * canvas.clientHeight + canvas.getBoundingClientRect().top + window.scrollY - tamanho / 2;

        // Defina a posição e o tamanho do círculo
        interagivel.style.left = left + "px";
        interagivel.style.top = top + "px";
        interagivel.style.width = tamanho + "px";
        interagivel.style.height = tamanho + "px";

        const textoElemento = document.createElement("div");
        if (nome) {
            textoElemento.textContent = nome; // Defina o texto
        }
        textoElemento.style.left = -tamanho * 2 + "px";
        textoElemento.style.position = "absolute";
        textoElemento.style.width = "500%";
        textoElemento.style.display = "flex";
        textoElemento.style.justifyContent = "center";
        textoElemento.style.alignItems = "center";
        textoElemento.style.marginTop = tamanho + "px";
        interagivel.appendChild(textoElemento);

        interagivel.addEventListener("click", function () {
            // On Click
            console.log("Alterando iFrame para " + tipo + " de id " + data.id);
            carregarPaginaEvento(data.id);
        });
        interagivel.addEventListener("mouseenter", function () {
            textoElemento.style.opacity = 1; // 100% de opacidade
            interagivel.style.opacity = 1;
        });
        
        // Adiciona um evento para o mouse sair do elemento
        interagivel.addEventListener("mouseleave", function () {
            textoElemento.style.opacity = 0.5; // 20% de opacidade
            interagivel.style.opacity = 0.5;
        });

        textoElemento.style.opacity = 0.5; // 20% de opacidade
        interagivel.style.opacity = 0.5;

        canvas.appendChild(interagivel); // Adicione o círculo ao canvas
    }
}

function carregarPaginaEvento(id) {
    const iframe = document.getElementById("visualizacaoPagina");
    var search = linkInicial;
    search = search + "cadastro-evento/" + "cadastro-evento.html"
    search = search + "?evento=" + id;
    search = search + "&historia=" + parametro("historia")
    search = search + "&usuario=" + parametro("usuario")
    search = search + "&noheader&nobuttons=1"
    console.log(search);
    iframe.src = search;
}

function atualizar() {
    if (dataEventos != undefined) {
        apagarInteragiveis();
        gerarTimeline();
    } else {
        var search = databaseLink + "/eventos?id_historia=" + parametro("historia");
        fetch(search)
            .then(response => response.json())
            .then(data => {
                dataEventos = data;
                console.log("Nova informação de eventos:");
                console.log(dataEventos);

                // Mova a lógica de atualização para dentro desta parte da cadeia de promessas
                apagarInteragiveis();
                gerarTimeline();
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }
}

window.addEventListener('resize', atualizar);
window.addEventListener('load', atualizar);
document.addEventListener("DOMContentLoaded", function () {
    atualizar();
    document.getElementById("botaoVoltar").addEventListener("click", voltarParaInicio)
});
