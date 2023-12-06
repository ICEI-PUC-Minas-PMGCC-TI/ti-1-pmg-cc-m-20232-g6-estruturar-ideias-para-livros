const databaseLink = "https://jsonserver-isaque-final.isaquedias1.repl.co";
const linkInicial = "../";
var idUsuario = 0;
var idHistoria = 0;

//////
// ADMINISTRA USUARIO E HISTORIA
/////
function alterarIdHistoria(novoId) {
    if (novoId <= 0) {
        return;
    }

    if (novoId) {
        idHistoria = novoId;
    }
}

function alterarIdUsuario() {
    const novoId = parametro("usuario");
    if (novoId) {
        idUsuario = novoId; 
    } else {
        usuarioNull();
    }

    fetch(databaseLink + "/usuarios/" + idUsuario)
        .then(response => response.json())
        .then(data => {
            if (Object.keys(data).length == 0) {
                usuarioNull();
            }
        })
}

function usuarioNull() {
    alert("Nenhum usuário foi encontrado. Você será mandado para a página principal.");
}

function usuarioSemAcesso() {
    alert("Essa história não pertence a esse usuário. Cancelando carregamento.")
}

//////
//  ADMINISTRA JSON
//////
function carregarHistoria() {
    if (idHistoria == 0) {
        return;
    }

    fetch(databaseLink + "/historias/" + idHistoria)
        .then(response => response.json())
        .then(data => {
            // Cancela o carregamento se nao tiver encontrado nenhuma historia
            if (Object.keys(data).length == 0) {
                return;
            }

            if (data.id_usuario != parametro("usuario")) {
                usuarioSemAcesso();
                return;
            }

            // Carrega a página
            htmlImagem("imagemHistoria", data.imagem);

            htmlInput("inputNome", data.nome);
            htmlInput("inputGenero", data.genero);
            htmlInput("inputSinopse", data.sinopse);

            // Carrega as listas
            fetch(databaseLink + "/eventos?id_historia=" + idHistoria)
                .then(response => response.json())
                .then(data => {
                    htmlLista("listaEventos", data, "evento");
                })

            fetch(databaseLink + "/personagens?id_historia=" + idHistoria)
                .then(response => response.json())
                .then(data => {
                    htmlLista("listaPersonagens", data, "personagem");
                })

            fetch(databaseLink + "/locais?id_historia=" + idHistoria)
                .then(response => response.json())
                .then(data => {
                    htmlLista("listaLocais", data, "local");
                })
        })
}

function salvarHistoria() {
    const JSONConstruido = construirJSON();

    // Envia o arquivo para o banco de dados
    fetch(`${databaseLink}/historias/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSONConstruido)
    })
        // Testa por erros
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na solicitação POST");
            }
        })
        // Se não houver erro, executa o seguinte
        .then(data => {
            alert(`História ${JSONConstruido.nome} salva com sucesso!`);
            alterarIdHistoria(encontrarPorNome(idUsuario, JSONConstruido.nome));
        })
        // Se houver erro, executa o seguinte
        .catch(error => {
            alert(`Erro ao salvar ${JSONConstruido.nome}!`);
            console.error("Erro na solicitação POST: ", error);
        })
}

function atualizarHistoria() {
    const JSONConstruido = construirJSON();

    // Atualiza o arquivo no banco de dados
    fetch(`${databaseLink}/historias/${idHistoria}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSONConstruido)
    })
        // Testa por erros
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na solicitação POST");
            }
        })
        // Se não houver erro, executa o seguinte
        .then(data => {
            alert(`História ${JSONConstruido.nome} atualizada com sucesso!`);
            alterarIdHistoria(encontrarPorNome(idUsuario, JSONConstruido.nome));
        })
        // Se houver erro, executa o seguinte
        .catch(error => {
            alert(`Erro ao atualizar ${JSONConstruido.nome}!`);
            console.error("Erro na solicitação POST: ", error);
        })
}

function excluirHistoria() {
    fetch(databaseLink + "/historias/" + idHistoria, {
        method: 'DELETE'
    })
        .then(function () {
            location.reload();
        })
}

//////
//  ELEMENTOS DA PÁGINA
//////
function htmlImagem(idElemento, URL) {
    let imagem = document.getElementById(idElemento);

    if (imagem == null) {
        console.log("Erro ao carregar elemento de ID " + idElemento);
        return;
    }

    imagem.src = URL;
}

function htmlInput(idElemento, texto) {
    let caixaInput = document.getElementById(idElemento);

    // Confere se há algum elemento vazio
    if (caixaInput == null) {
        console.log("Erro ao carregar elemento de ID " + idElemento);
        return;
    }
    if (texto == null) {
        console.log("Texto em " + idElemento + " é nulo")
    }

    // Altera o texto
    caixaInput.value = texto;
}

function htmlLista(idElemento, lista, tipo) {
    let listaHTML = document.getElementById(idElemento);
    // Limpa o elemento no HTML (caso contenha algo)
    listaHTML.innerHTML = '';

    // Passa por cada elemento da lista
    lista.forEach(item => {
        // Cria um elemento "elementoLista" e altera
        let elementoLista = document.createElement("a");
        elementoLista.href = `${linkInicial}cadastro-${tipo}/cadastro-${tipo}.html?${tipo}=${item.id}&usuario=${idUsuario}&historia=${idHistoria}`;
        elementoLista.className = "list-group-item list-group-item-action";
        elementoLista.textContent = item.nome;

        // Adiciona "elementoLista" para o HTML
        listaHTML.appendChild(elementoLista);
    })
}

//////
//  BOTÕES
//////
function botaoSalvar() {
    if (idHistoria == 0) {
        console.log("Tentando salvar historia...")
        salvarHistoria();
    } else {
        console.log(`Tentando atualizar historia de id ${idHistoria}...`);
        atualizarHistoria();
    }
}

function botaoExcluir() {
    console.log("Tentando excluir história...")
    if (idHistoria == 0) {
        alert("Nenhuma história para excluir.");
    } else {
        excluirHistoria();
    }
}

//////
//  UTILIDADES
//////
function alterarBotaoSalvar(id) {
    if (idHistoria != 0) {
        document.getElementById(id).textContent = "Atualizar"
    }
}

function parametro(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

function encontrarPorNome(idUsuario, nome) {
    var search = `${databaseLink}/historias?id_usuario=${idUsuario}&nome=${nome}`
    return fetch(search)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                return data[0].id;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error("Erro na pesquisa:", error);
            throw error;
        });
}

function construirJSON() {
    let inputNome = document.getElementById("inputNome").value;
    let inputGenero = document.getElementById("inputGenero").value;
    let inputSinopse = document.getElementById("inputSinopse").value;

    const jsonConstruido = {
        id_usuario: idUsuario,
        nome: inputNome,
        genero: inputGenero,
        sinopse: inputSinopse,
        imagem: "https://source.unsplash.com/random/200x200?sig=1"
    };

    return jsonConstruido;
}

//////
//  EVENTOS DA PÁGINA
//////
document.addEventListener("DOMContentLoaded", function () {
    alterarIdUsuario();
    alterarIdHistoria(parametro("historia"));
    carregarHistoria(parseInt(idHistoria));
    alterarBotaoSalvar("salvarHistoria");
})

// Adiciona a função de salvar no botão
document.getElementById("salvarHistoria").addEventListener("click", function () {
    botaoSalvar();
})

// Adiciona a função de excluir no botão
document.getElementById("excluirHistoria").addEventListener("click", function () {
    botaoExcluir();
})

// Botões de "novo"
document.getElementById("novoEvento").addEventListener("click", function () {
    window.location.href = linkInicial + "cadastro-evento/cadastro-evento.html?historia=" + idHistoria + "&usuario=" + idUsuario
})

document.getElementById("novoLocal").addEventListener("click", function () {
    window.location.href = linkInicial + "cadastro-local/cadastro-local.html?historia=" + idHistoria + "&usuario=" + idUsuario
})

document.getElementById("novoPersonagem").addEventListener("click", function () {
    window.location.href = linkInicial + "cadastro-personagem/cadastro-personagem.html?historia=" + idHistoria + "&usuario=" + idUsuario
})