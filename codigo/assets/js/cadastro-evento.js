const databaseLink = "https://jsonserver-isaque-final.isaquedias1.repl.co";
const linkInicial = "../";
var idHistoria = 0;
var idUsuario = 0;
var idEvento = 0;

//////
// ADMINISTRA USUARIO E HISTORIA
//////
function alterarIdEvento(novoId) {
    if (novoId <= 0) {
        return;
    }

    if (novoId) {
        idEvento = novoId;
    }
}

function alterarIdHistoria() {
    const novoId = parametro("historia");
    if (novoId) {
        idHistoria = novoId;
    } else {
        historiaNull();
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

function historiaNull() {
    alert("Falha na localização do ID da história. Por segurança, você será mandado para a página principal.")
}

function usuarioSemAcesso() {
    alert("Esse evento não pertence a esse usuário. Cancelando carregamento.")
}

//////
//  ADMINISTRA JSON
//////
function carregarEvento() {
    if (idEvento == 0) {
        return;
    }

    fetch(databaseLink + "/eventos/" + idEvento)
        .then(response => response.json())
        .then(data => {
            // Cancela o carregamento se nao tiver encontrado nenhuma historia
            if (Object.keys(data).length == 0) {
                return;
            }

            /*if (data.id_usuario != parametro("usuario")) {
                usuarioSemAcesso();
                return;
            }*/

            // Carrega a página
            htmlImagem("imagemHistoria", data.imagem);

            htmlInput("inputEvento", data.nome);
            htmlInput("inputInicio", data.data_inicio);
            htmlInput("inputFim", data.data_fim);
            htmlInput("inputDescricao", data.descricao);

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

function salvarEvento() {
    const JSONConstruido = construirJSON();

    // Envia o arquivo para o banco de dados
    fetch(`${databaseLink}/eventos/`, {
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
            alert(`Evento ${JSONConstruido.nome} salvo com sucesso!`);
            alterarIdEvento(encontrarPorNome(JSONConstruido.nome));
        })
        // Se houver erro, executa o seguinte
        .catch(error => {
            alert(`Erro ao salvar ${JSONConstruido.nome}!`);
            console.error("Erro na solicitação POST: ", error);
        })
}

function atualizarEvento() {
    const JSONConstruido = construirJSON();

    // Atualiza o arquivo no banco de dados
    fetch(`${databaseLink}/eventos/${idEvento}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSONConstruido)
    })
        // Testa por erros
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na solicitação PUT");
            }
        })
        // Se não houver erro, executa o seguinte
        .then(data => {
            alert(`Evento ${JSONConstruido.nome} atualizado com sucesso!`);
            alterarIdEvento(encontrarPorNome(JSONConstruido.nome));
        })
        // Se houver erro, executa o seguinte
        .catch(error => {
            alert(`Erro ao atualizar ${JSONConstruido.nome}!`);
            console.error("Erro na solicitação PUT: ", error);
        })
}

function excluirEvento() {
    fetch(databaseLink + "/eventos/" + idEvento, {
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
        elementoLista.href = `${linkInicial}cadastro-${tipo}/cadastro-${tipo}.html?id=${item.id}&usuario=${idUsuario}&historia=${idHistoria}`;
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
    if (idEvento == 0) {
        console.log("Tentando salvar evento...")
        salvarEvento();
    } else {
        console.log(`Tentando atualizar evento de id ${idEvento}...`);
        atualizarEvento();
    }
}

function botaoExcluir() {
    console.log("Tentando excluir evento...")
    if (idEvento == 0) {
        alert("Nenhum evento para excluir.");
    } else {
        excluirEvento();
    }
}

//////
//  UTILIDADES
//////
function parametro(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

function encontrarPorNome(nome) {
    var search = `${databaseLink}/eventos?id_historia=${idHistoria}&nome=${nome}`
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
    let inputNome = document.getElementById("inputEvento").value;
    let dataFim = document.getElementById("inputFim").value;
    let dataInicio = document.getElementById("inputInicio").value;
    let descricao = document.getElementById("inputDescricao").value;

    const jsonConstruido = {
        id_historia: idHistoria,
        nome: inputNome,
        data_inicio: dataInicio,
        data_fim: dataFim,
        descricao: descricao,
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
    alterarIdEvento(parametro("evento"));
    carregarEvento(parseInt(idEvento));
})

// Adiciona a função de salvar no botão
document.getElementById("salvarEvento").addEventListener("click", function () {
    botaoSalvar();
})

// Adiciona a função de excluir no botão
document.getElementById("excluirEvento").addEventListener("click", function () {
    botaoExcluir();
})