const databaseLink = "https://jsonserver-visualizacao-grafos.isaquedias1.repl.co/elementos";
var data = null;
var foco = null;

// Carrega a história em uma var "historiaCarregada"
function carregarDB() {
    // Procura o arquivo json
    fetch(databaseLink)
        .then(response => response.json())
        .then(dbCarregada => {
            // Cancela o carregamento se nao tiver encontrado nenhuma historia
            if (Object.keys(dbCarregada).length == 0) {
                return;
            }

            // Carrega os dados
            data = dbCarregada[0];
            foco = data.locais[0];
            atualizar(foco);
        })
}

function criarInteragivel(x, y, tamanho, link, tipo) {
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
            atualizar(link); // Redirecione para o link quando o círculo for clicado
        });

        const textoElemento = document.createElement("div");
        if (link) {
            textoElemento.textContent = link.nome; // Defina o texto
        }
        textoElemento.style.position = "absolute";
        textoElemento.style.width = "100%";
        textoElemento.style.display = "flex";
        textoElemento.style.justifyContent = "center";
        textoElemento.style.alignItems = "center";
        textoElemento.style.marginTop = tamanho + "px";
        interagivel.appendChild(textoElemento);

        canvas.appendChild(interagivel); // Adicione o círculo ao canvas
    }
}

function apagarInteragiveis() {
    const canvas = document.getElementById("canvas");
    let circles = canvas.getElementsByClassName("circle");
    Array.from(circles).forEach(circle => {
        circle.remove();
    });
}

function atualizar(elementoCentral) {
    if (elementoCentral != null) {
        console.log("Atualizando com " + elementoCentral + " como foco");
        foco = elementoCentral;
    }
    apagarInteragiveis();
    criarInteragivel(50, 50, 49, foco, "central"); // Cria um círculo no centro do canvas com tamanho 49px
    criarCirculosInteragiveis(50, 50, 25, foco);
}

function testarConexoes() {
    if (foco == null) {
        console.log("Foco era NULL")
        return null;
    }
    conexoesEventos = foco.conexoes.eventos;
    conexoesLocais = foco.conexoes.locais;
    conexoesPersonagens = foco.conexoes.personagens;
    conexoes = conexoesEventos.concat(conexoesLocais, conexoesPersonagens);
    return {
        todas: conexoes,
        eventos: conexoesEventos,
        locais: conexoesLocais,
        personagens: conexoesPersonagens
    };
}

function criarCirculosInteragiveis(xCentral, yCentral, raio) {
    var contagemConexoes = 0;
    
    if (data) {
        conexoes = testarConexoes(foco);
        if (conexoes == null) {
            console.log("Conexoes era NULL")
            return;
        }
        contagemConexoes = conexoes.todas.length;
    }

    var quantidadeCirculos = contagemConexoes;
    const anguloIntervalo = Math.PI / 180 * (360 / quantidadeCirculos);

    for (let i = 0; i < quantidadeCirculos; i++) {
        let xFinal = Math.cos(anguloIntervalo * i) * raio + xCentral;
        let yFinal = Math.sin(anguloIntervalo * i) * raio + yCentral;

        // Inicia a criação dos
        if (i < conexoes.locais.length) {
            criarInteragivel(xFinal, yFinal, 35, data.locais[conexoes.locais[i] - 1], "local");
            // console.log(data.locais[conexoes.locais[i] - 1] + " | " + (conexoes.locais[i]));
        } else if (i < conexoes.locais.length + conexoes.eventos.length) {
            criarInteragivel(xFinal, yFinal, 35, data.eventos[conexoes.eventos[i - conexoes.locais.length] - 1], "evento");
            // console.log(data.eventos[conexoes.eventos[i - conexoes.locais.length] - 1] + " | " + (i - conexoes.locais.length));
        } else {
            criarInteragivel(xFinal, yFinal, 35, data.personagens[conexoes.personagens[i - conexoes.locais.length - conexoes.eventos.length] - 1], "personagem");
        }
    }
}

function atualizarEvento() {
    atualizar();
}

window.addEventListener('load', atualizarEvento);

// Adicionar um ouvinte de evento para o evento 'resize' na janela
window.addEventListener('resize', atualizarEvento);

// Quando o HTML carregar, o código abaixo será executado
document.addEventListener("DOMContentLoaded", function () {
    carregarDB();
})