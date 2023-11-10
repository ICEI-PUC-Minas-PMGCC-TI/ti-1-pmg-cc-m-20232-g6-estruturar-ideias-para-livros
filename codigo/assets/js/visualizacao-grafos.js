const databaseLink = "https://jsonserver-historias.isaquedias1.repl.co/historias";
const data = null;

// Carrega a história em uma var "historiaCarregada"
function carregarHistoria(carregarId) {
    // Procura o arquivo json
    fetch(databaseLink + "/" + carregarId)
        .then(response => response.json())
        .then(historiaCarregada => {
            // Cancela o carregamento se nao tiver encontrado nenhuma historia
            if (Object.keys(historiaCarregada).length == 0) {
                return;
            }

            // Carrega os dados
            data = historiaCarregada;
        })
}

function criarInteragivel(x, y, tamanho) {
    const canvas = document.getElementById("canvas");

    if (canvas) {
        const interagivel = document.createElement("div");
        interagivel.classList.add("circle"); // Adicione uma classe para estilização

        // Calcule as coordenadas relativas ao tamanho do canvas
        const left = (x / 100) * canvas.clientWidth + canvas.getBoundingClientRect().left - tamanho / 2;
        const top = (y / 100) * canvas.clientHeight + canvas.getBoundingClientRect().top - tamanho / 2;

        // Defina a posição e o tamanho do círculo
        interagivel.style.left = left + "px";
        interagivel.style.top = top + "px";
        interagivel.style.width = tamanho + "px";
        interagivel.style.height = tamanho + "px";

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

function atualizar() {
    apagarInteragiveis();
    criarInteragivel(50, 50, 49); // Cria um círculo no centro do canvas com tamanho 49px
    criarCirculosInteragiveis(50, 50, 25);
}

function criarCirculosInteragiveis(xCentral, yCentral, raio) {
    const quantidadeCirculos = 8;
    const anguloIntervalo = Math.PI / 180 * (360 / quantidadeCirculos);
    
    for (let i = 0; i < 8; i++) {
        let xFinal = Math.cos(anguloIntervalo * i) * raio + xCentral;
        let yFinal = Math.sin(anguloIntervalo * i) * raio + yCentral;

        criarInteragivel(xFinal, yFinal, 39);
    }
}

window.addEventListener('load', atualizar);

// Adicionar um ouvinte de evento para o evento 'resize' na janela
window.addEventListener('resize', atualizar);