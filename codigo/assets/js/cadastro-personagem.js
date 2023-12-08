const databaseLink = "https://jsonserver-isaque-final.isaquedias1.repl.co";
const linkInicial = "../";
var idHistoria = 0;
var idUsuario = 0;
var idPersonagem = 0;

var conEventos = [];
var conLocais = [];
var conPersonagens = [];

//////
// ADMINISTRA USUARIO E HISTORIA
//////
function alterarIdPersonagem(novoId) {
    if (novoId <= 0) {
        return;
    }

    novoId = parseInt(novoId)

    if (novoId && typeof novoId === 'number') {
        idPersonagem = novoId;
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
    alert("Esse personagem não pertence a esse usuário. Cancelando carregamento.")
}

//////
//  ADMINISTRA JSON
//////
function carregarPersonagem() {
    if (idPersonagem == 0) {
        return;
    }

    fetch(databaseLink + "/personagens/" + idPersonagem)
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
            htmlImagem("imagemPersonagem", data.imagem);

            htmlInput("inputNome", data.nome);
            htmlInput("inputRaca", data.raca);
            htmlInput("inputPapel", data.papel);
            htmlInput("inputDescricao", data.descricao);

            conPersonagens = data.con_personagens;
            conEventos = data.con_eventos;
            conLocais = data.con_locais;

            atualizarListas();
        })
}

function atualizarListas() {
    receberConexoes("eventos", conEventos)
        .then(data => {
            htmlLista("listaEventos", data, "evento");
        });

    receberConexoes("locais", conLocais)
        .then(data => {
            htmlLista("listaLocais", data, "local");
        });

    receberConexoes("personagens", conPersonagens)
        .then(data => {
            htmlLista("listaPersonagens", data, "personagem");
        });
}

function salvarPersonagem(semAlerta) {
    const JSONConstruido = construirJSON();

    // Envia o arquivo para o banco de dados
    fetch(`${databaseLink}/personagens/`, {
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
            if (semAlerta != true) {
                alert(`Personagem ${JSONConstruido.nome} salvo com sucesso!`);
            }
            alterarIdPersonagem(encontrarPorNome(JSONConstruido.nome));
        })
        // Se houver erro, executa o seguinte
        .catch(error => {
            alert(`Erro ao salvar ${JSONConstruido.nome}!`);
            console.error("Erro na solicitação POST: ", error);
        })
}

function atualizarPersonagem(semAlerta) {
    const JSONConstruido = construirJSON();

    // Atualiza o arquivo no banco de dados
    fetch(databaseLink + "/personagens/" + idUsuario, {
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
            if (semAlerta != true) {
                alert(`Personagem ${JSONConstruido.nome} atualizado com sucesso!`);
            }
            alterarIdPersonagem(encontrarPorNome(JSONConstruido.nome));
        })
        // Se houver erro, executa o seguinte
        .catch(error => {
            alert(`Erro ao atualizar ${JSONConstruido.nome}!`);
            console.error("Erro na solicitação PUT: ", error);
        })
}

function excluirPersonagem() {
    fetch(databaseLink + "/personagens/" + idPersonagem, {
        method: 'DELETE'
    })
        .then(function () {
            location.reload();
        })
}

//////
//  ELEMENTOS DA PÁGINA
//////
function atualizarModal(tipo) {
    let listaTitulo = document.getElementById("listaDinamicaTitulo");

    switch (tipo) {
        case "eventos":
            listaTitulo.textContent = "Eventos";
            break;
        case "personagens":
            listaTitulo.textContent = "Personagens";
            break;
        case "locais":
            listaTitulo.textContent = "Locais";
            break;
    }

    fetch(databaseLink + "/" + tipo + "?id_historia=" + idHistoria)
        .then(response => response.json())
        .then(data => {
            modalLista("listaDinamica", data, tipo);
        })
}

function modalLista(idElemento, lista, tipo) {
    let tipoSingular;
    switch (tipo) {
        case "locais":
            tipoSingular = "local";
            break;
        case "personagens":
            tipoSingular = "personagem";
            break;
        case "eventos":
            tipoSingular = "evento";
            break;
    }

    let listaHTML = document.getElementById(idElemento);
    // Limpa o elemento no HTML (caso contenha algo)
    listaHTML.innerHTML = '';

    // Passa por cada elemento da lista
    lista.forEach(item => {
        // Cria um elemento "elementoLista" e altera
        /*let elementoLista = document.createElement("a");
        elementoLista.href = `${linkInicial}cadastro-${tipo}/cadastro-${tipo}.html?id=${item.id}&usuario=${idUsuario}&historia=${idHistoria}`;
        elementoLista.className = "list-group-item list-group-item-action";
        elementoLista.textContent = item.nome;*/

        // Criar o elemento li
        var listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center");
        listItem.textContent = item.nome;

        listItem.addEventListener("click", function () {
            console.log("Adicionando conexao entre elemento de id " + idPersonagem + " e elemento de id " + item.id + " com tipo " + tipoSingular + ", identificado como " + item.nome);

            switch (tipo) {
                // TODO - Adicionar conexao na outra página (e salvar elemento automatico)
                case "eventos":
                    if (!conEventos.includes(item.id)) {
                        conEventos.push(item.id);
                        adicionarConExterna(item.id, "eventos");
                        atualizarPersonagem(true);
                    }
                    break;
                case "personagens":
                    if (!conPersonagens.includes(item.id)) {
                        conPersonagens.push(item.id);
                        adicionarConExterna(item.id, "personagens");
                        atualizarPersonagem(true);
                    }
                    break;
                case "locais":
                    if (!conLocais.includes(item.id)) {
                        conLocais.push(item.id);
                        adicionarConExterna(item.id, "locais");
                        atualizarPersonagem(true);
                    }
                    break;
            }

            atualizarListas();
        })

        // Adiciona "elementoLista" para o HTML
        listaHTML.appendChild(listItem);
    })
}

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
        // Criar o elemento li
        var listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center");
        listItem.textContent = item.nome;

        // Criar o contêiner flexível para os botões
        var buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("d-flex");

        // Criar o elemento button "Ver"
        var buttonView = document.createElement("button");
        buttonView.type = "button";
        buttonView.classList.add("btn", "btn-warning", "bg-gradient", "btn-sm", "mx-1");
        buttonView.textContent = "Ver";

        buttonView.addEventListener("click", function () {
            console.log("Botão de ver clicado!");
            window.location.href = `${linkInicial}cadastro-${tipo}/cadastro-${tipo}.html?${tipo}=${item.id}&usuario=${idUsuario}&historia=${idHistoria}`;
        });

        // Criar o elemento button "-"
        var buttonRemove = document.createElement("button");
        buttonRemove.type = "button";
        buttonRemove.classList.add("btn", "btn-danger", "bg-gradient", "btn-sm", "ml-2"); // Adicionei uma margem à esquerda para separar os botões
        buttonRemove.textContent = "-";

        buttonRemove.addEventListener("click", function () {
            // TODO - Adicionar remoçao de lista
            let index = -1;
            switch (tipo) {
                // TODO - Adicionar conexao na outra página (e salvar elemento automatico)
                case "evento":
                    index = conEventos.indexOf(item.id);
                    if (index !== -1) {
                        conEventos.splice(index);
                        atualizarListas();
                        removerConExterna(item.id, "eventos");
                        atualizarPersonagem(true);
                    }
                    break;
                case "personagem":
                    index = conPersonagens.indexOf(item.id);
                    if (index !== -1) {
                        conPersonagens.splice(index);
                        atualizarListas();
                        removerConExterna(item.id, "personagens");
                        atualizarPersonagem(true);
                    }
                    break;
                case "local":
                    index = conLocais.indexOf(item.id);
                    if (index !== -1) {
                        conLocais.splice(index);
                        atualizarListas();
                        removerConExterna(item.id, "locais");
                        atualizarPersonagem(true);
                    }
                    break;
            }
            console.log("Botão de remover clicado!");
        });

        // Adicionar os botões como filhos do contêiner
        buttonsContainer.appendChild(buttonView);
        buttonsContainer.appendChild(buttonRemove);

        // Adicionar o contêiner como filho do elemento li
        listItem.appendChild(buttonsContainer);

        // Adiciona "elementoLista" para o HTML
        listaHTML.appendChild(listItem);
    })
}

//////
//  BOTÕES
//////
function botaoSalvar() {
    if (idPersonagem == 0) {
        console.log("Tentando salvar personagem...")
        salvarPersonagem();
    } else {
        console.log(`Tentando atualizar personagem de id ${idPersonagem}...`);
        atualizarPersonagem();
    }
}

function botaoExcluir() {
    console.log("Tentando excluir personagem...")
    if (idPersonagem == 0) {
        alert("Nenhum personagem para excluir.");
    } else {
        excluirPersonagem();
    }
}

//////
//  UTILIDADES
//////
function receberConexoes(tipo, listaIds) {
    return fetch(databaseLink + "/" + tipo + "?id_historia=" + idHistoria)
        .then(response => response.json())
        .then(data => {
            const dataFiltrada = data.filter(elemento => {
                return listaIds.includes(elemento.id);
            })

            return dataFiltrada;
        })
}

function alterarBotaoSalvar(id) {
    if (idPersonagem != 0) {
        document.getElementById(id).textContent = "Atualizar"
    }
}

function parametro(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

function encontrarPorNome(nome) {
    var search = `${databaseLink}/personagens?id_historia=${idHistoria}&nome=${nome}`
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
function enviarConExterna(search, json) {
    fetch(search, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
        // Testa por erros
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na solicitação PUT externa");
            }
        })
        // Se não houver erro, executa o seguinte
        .then(data => {
            console.log(`${json.nome} (externo) atualizado com sucesso!`);
        })
        // Se houver erro, executa o seguinte
        .catch(error => {
            console.log(`Erro ao atualizar conexao externa em ${json.nome}!`);
            console.error("Erro na solicitação PUT externa: ", error);
        })
}

function adicionarConExterna(idExterno, tipoExterno) {
    var search = `${databaseLink}/${tipoExterno}/${idExterno}`
    fetch(search)
        .then(response => response.json())
        .then(data => {
            novoValor = data.con_personagens;
            novoValor.push(parseInt(idPersonagem));
            novoJSON = editarJSON(data, "con_personagens", novoValor);

            // SOLICITAÇAO PUT EXTERNA
            enviarConExterna(search, novoJSON);
        })
}

function removerConExterna(idExterno, tipoExterno) {
    var search = `${databaseLink}/${tipoExterno}/${idExterno}`
    fetch(search)
        .then(response => response.json())
        .then(data => {
            novoValor = data.con_personagens;
            index = novoValor.indexOf(idPersonagem);
            if (index != -1) {
                novoValor.splice(index);
            }
            novoJSON = editarJSON(data, "con_personagens", novoValor);

            // SOLICITAÇAO PUT EXTERNA
            enviarConExterna(search, novoJSON);
        })
}

function editarJSON(json, chave, valor) {

    if (json.hasOwnProperty(chave)) {
        json[chave] = valor;
    } else {
        throw new Error(`A chave '${chave}' não existe no JSON.`);
    }

    return json;
}

function construirJSON() {
    let inputNome = document.getElementById("inputNome").value;
    let inputRaca = document.getElementById("inputRaca").value;
    let inputPapel = document.getElementById("inputPapel").value;
    let inputDescricao = document.getElementById("inputDescricao").value;

    const jsonConstruido = {
        id_historia: idHistoria,
        nome: inputNome,
        raca: inputRaca,
        papel: inputPapel,
        descricao: inputDescricao,
        con_eventos: conEventos,
        con_locais: conLocais,
        con_personagens: conPersonagens,
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
    alterarIdPersonagem(parametro("personagem"));
    alterarBotaoSalvar("botaoSalvar");
    carregarPersonagem(parseInt(idPersonagem));
})

// Adiciona a função de salvar no botão
document.getElementById("botaoSalvar").addEventListener("click", function () {
    botaoSalvar();
})

// Adiciona a função de excluir no botão
document.getElementById("excluirPersonagem").addEventListener("click", function () {
    botaoExcluir();
})

document.getElementById("novoPersonagem").addEventListener("click", function () {
    atualizarModal("personagens");
})

document.getElementById("novoLocal").addEventListener("click", function () {
    atualizarModal("locais");
})

document.getElementById("novoEvento").addEventListener("click", function () {
    atualizarModal("eventos");
})