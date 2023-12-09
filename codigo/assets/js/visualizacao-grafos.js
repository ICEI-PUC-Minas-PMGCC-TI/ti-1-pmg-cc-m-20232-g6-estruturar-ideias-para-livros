const databaseLink = "https://organizarideiasjsonserver.isaquedias1.repl.co";
const linkInicial = "../";
var dataFoco;
var idHistoria;

function parametro(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

function getCon(tipo) {
    var conTotal;
    var conLocais;
    var conEventos;
    var conPersonagens;

    switch (tipo) {
        case "total":
            conLocais = getCon("locais");
            conEventos = getCon("eventos");
            conPersonagens = getCon("personagens");
            conTotal = conLocais.length + conEventos.length + conPersonagens.length;
            return conTotal;
            break;
        case "locais":
            conLocais = dataFoco.con_locais;
            return conLocais;
            break;
        case "personagens":
            conPersonagens = dataFoco.con_personagens;
            return conPersonagens;
            break;
        case "eventos":
            conEventos = dataFoco.con_eventos;
            return conEventos;
            break;
    }
}

function atualizarFoco(tipoFoco, idFoco) {
    var search = databaseLink + "/" + tipoFoco + "/" + idFoco;
    fetch(search)
        .then(response => response.json())
        .then(data => {
            dataFoco = data;
            tipoSingular = tipoFoco == "locais" ? "local" : (tipoFoco == "eventos" ? "evento" : "personagem"); 
            atualizar();
            carregarPagina(tipoSingular, idFoco);
        })
}

function gerarGrafo() {
    console.log("Gerando grafo com seguinte dados:")
    console.log(dataFoco)

    conTotal = getCon("total");
    conLocais = getCon("locais");
    conEventos = getCon("eventos");
    conPersonagens = getCon("personagens");

    for (let i = 0; i < conTotal; i++) {
        let search;
        let tipo;

        if (i < conLocais.length) {
            search = databaseLink + "/locais/" + conLocais[i];
            tipo = "local";
        } else if (i < conLocais.length + conEventos.length) {
            search = databaseLink + "/eventos/" + conEventos[i - conLocais.length];
            tipo = "evento";
        } else {
            search = databaseLink + "/personagens/" + conPersonagens[i - conLocais.length - conEventos.length];
            tipo = "personagem"
        }

        fetch(search)
            .then(response => response.json())
            .then(data => {
                const anguloIntervalo = Math.PI / 180 * (360 / conTotal);
                let raio = 25;

                let xCentral = 50;
                let yCentral = 50;

                let xFinal = Math.cos(anguloIntervalo * i) * raio + xCentral;
                let yFinal = Math.sin(anguloIntervalo * i) * raio + yCentral;

                console.log("Gerando interagível em x " + xFinal + " e y " + yFinal + " com os seguintes dados:")
                console.log(data);

                criarInteragivel(xFinal, yFinal, 29, data, data.nome, tipo);
            })
    }
}

function apagarInteragiveis() {
    const canvas = document.getElementById("canvas");
    let circles = canvas.getElementsByClassName("circle");
    Array.from(circles).forEach(circle => {
        circle.remove();
    });
}

function criarInteragivel(x, y, tamanho, data, nome, tipo) {
    const canvas = document.getElementById("canvas");

    if (canvas) {
        const interagivel = document.createElement("div");
        interagivel.classList.add("circle"); // Adicione uma classe para estilização
        interagivel.classList.add(tipo);

        // Calcule as coordenadas relativas ao tamanho do canvas
        const left = (x / 100) * canvas.clientWidth + canvas.getBoundingClientRect().left - tamanho / 2;
        const top = (y / 100) * canvas.clientHeight + canvas.getBoundingClientRect().top - tamanho / 2;

        // Defina a posição e o tamanho do círculo
        interagivel.style.left = left + "px";
        interagivel.style.top = top + "px";
        interagivel.style.width = tamanho + "px";
        interagivel.style.height = tamanho + "px";

        interagivel.addEventListener("click", function () {
            // On Click
            console.log("Alterando foco para " + tipo + " de id " + data.id);
            tipoPlural = tipo == "local" ? "locais" : (tipo == "evento" ? "eventos" : "personagens");
            atualizarFoco(tipoPlural, data.id);
        });

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

        canvas.appendChild(interagivel); // Adicione o círculo ao canvas
    }
}

function carregarPagina(tipo, id) {
    const iframe = document.getElementById("visualizacaoPagina");
    var search = linkInicial;
    search = search + "cadastro-" + tipo + "/" + "cadastro-" + tipo + ".html"
    search = search + "?" + tipo + "=" + id;
    search = search + "&historia=" + parametro("historia")
    search = search + "&usuario=" + parametro("usuario")
    search = search + "&noheader"
    console.log(search);
    iframe.src = search;
}

function atualizar() {
    if (dataFoco) {
        apagarInteragiveis();
        criarInteragivel(50, 50, 49, undefined, dataFoco.nome, tipoSingular);
        gerarGrafo();
    }
}


window.addEventListener('resize', atualizar);
document.addEventListener("DOMContentLoaded", function () {
    if (parametro("local") != null) {
        atualizarFoco("locais", parametro("local"))
    } else if (parametro("personagem") != null) {
        atualizarFoco("personagens", parametro("personagem"))
    } else if (parametro("evento") != null) {
        atualizarFoco("eventos", parametro("evento"))
    } else {
        alert("Nenhum personagem, evento ou local identificado")
    }
})
