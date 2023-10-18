// Carrega a história em uma var "historiaCarregada"
function carregarHistoria(carregar_id) {
    // Procura o arquivo json
    fetch("../../assets/db/historias.json")
    .then(response => response.json())
    .then(data => {
        // Carrega uma historia se o ID dela for o correto
        let historiaCarregada = null;
        for (const historia of data.historias) {
            if (historia.id == carregar_id) {
                historiaCarregada = historia;
                break;
            }
        }

        // Cancela o carregamento se nao tiver encontrado nenhuma historia
        if (historiaCarregada == null) {
            return;
        }

        // Carrega a página
        alterarImagem("imagemHistoria", historiaCarregada.imagem);

        alterarInput("inputNome", historiaCarregada.nome);
        alterarInput("inputGenero", historiaCarregada.genero);
        alterarInput("inputSinopse", historiaCarregada.sinopse);

        inserirLista("listaEventos", historiaCarregada.eventos);
        inserirLista("listaLocais", historiaCarregada.locais);
        inserirLista("listaPersonagens", historiaCarregada.personagens);
    })
}

function alterarImagem(elementId, URL) {
    let imagem = document.getElementById(elementId);

    // Confere se o elemento existe
    if (imagem == null) {
        console.log("Erro ao carregar elemento de ID " + elementId);
        return;
    }

    // Altera a imagem
    imagem.src = URL;
}

// Troca o elemento "elementId" para conter "novoTexto"
function alterarInput(elementId, novoTexto) {
    let caixaInput = document.getElementById(elementId);
    
    // Confere se há algum elemento vazio
    if (caixaInput == null) {
        console.log("Erro ao carregar elemento de ID " + elementId);
        return;
    } 
    if (novoTexto == null) {
        console.log("Texto em " + elementId + " é nulo")
    }

    // Altera o texto
    caixaInput.value = novoTexto;
}

// Insere elementos <a> de uma dada "lista" dentro de um dado "elementId"
function inserirLista(elementId, lista) {
    let listaHTML = document.getElementById(elementId);
    // Limpa o elemento no HTML (caso contenha algo)
    listaHTML.innerHTML = '';

    // Passa por cada elemento da lista
    lista.forEach(item => {
        // Cria um elemento "link" e altera
        let link = document.createElement("a");
        link.href = "#";
        link.className = "list-group-item list-group-item-action";
        link.textContent = item.nome;

        // Adiciona "link" para o HTML
        listaHTML.appendChild(link);
    })
}

// Função para ler algum parametro e retornar seu valor
function carregarParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Quando o HTML carregar, o código abaixo será executado
document.addEventListener("DOMContentLoaded", function() {
    const idHistoria = carregarParametroURL("historia");
    
    // Se a página tiver algum parametro de historia, carregar a história
    if (idHistoria) {
        carregarHistoria(parseInt(idHistoria));
    }
})