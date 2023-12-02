const databaseLink = "jsonserver-isaque-final.isaquedias1.repl.co";

function carregarEvento(carregarID) {
    fetch(databaseLink + "/eventos/" + carregarID)
        .then(response => response.json())
        .then(eventoCarregado => {
            if (Object.keys(eventoCarregado).length == 0) {
                return;
            }

            alterarImagem("imagemEvento", eventoCarregado.imagem);
            alterarInput("inputEvento", eventoCarregado.nome);
            alterarInput("inputInicio", eventoCarregado.data_inicio);
            alterarInput("inputFim", eventoCarregado.data_fim);
            alterarInput("inputDescricao", eventoCarregado.descricao);

            // Defina o valor do campo de ID oculto
            document.getElementById("inputIdEvento").value = eventoCarregado.id;
        })

    fetch(databaseLink + "/eventos?con_eventos=" + carregarId)
        .then(response => response.json())
        .then(data => {
            inserirLista("listaEventos", data);
        })

    fetch(databaseLink + "/personagens?con_eventos=" + carregarId)
        .then(response => response.json())
        .then(data => {
            inserirLista("listaPersonagens", data);
        })

    fetch(databaseLink + "/locais?con_eventos=" + carregarId)
        .then(response => response.json())
        .then(data => {
            inserirLista("listaLocais", data);
        })

}



function excluirEvento(excluirID) {

    fetch(databaseLink + "/" + excluirID, {
        method: 'DELETE'
    })
        .then(function () {
            location.reload();
        })
}
document.getElementById("excluirEvento").addEventListener("click", function () {
    const idEvento = document.getElementById("inputIdEvento").value; // Obtenha o ID do evento a ser excluído

    if (idEvento) {
        excluirEvento(idEvento);
    } else {
        console.error("ID do evento não encontrado para exclusão.");
    }
});

//VERIFICA SE DEVE SALVAR OU ATUALIZAR UM EVENTO

function salvarOuAtualizar() {
    const idEvento = document.getElementById("inputIdEvento").value;

    if (!idEvento) {
        salvarEvento();
        console.log("Novo evento salvo!");
    } else {
        fetch(databaseLink + "/" + idEvento)
            .then(response => response.json())
            .then(eventoCarregado => {
                if (Object.keys(eventoCarregado).length == 0) {
                    salvarEvento();
                    console.log("Novo evento salvo!");
                } else {
                    // Defina o ID no objeto jsonConstruído
                    const jsonConstruido = construirJSON();
                    jsonConstruido.id = idEvento;
                    atualizarEvento(jsonConstruido);
                    console.log("Evento atualizado!");
                }
            });
    }
}


//ATUALIZA UM EVENTO EXISTENTE

function atualizarEvento(jsonConstruido) {
    const idEvento = jsonConstruido.id;

    fetch(databaseLink + "/" + idEvento, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonConstruido)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na solicitação PUT");
            }
        })
        .then(data => {
            console.log("Evento atualizado com sucesso!");
        })
        .catch(error => {
            console.error("Erro na solicitação PUT: ", error);
        });
}



//SALVA UM NOVO EVENTO

function salvarEvento() {

    let jsonConstruido = construirJSON();
    console.log("ObjetoJSON criado", jsonConstruido);

    fetch(databaseLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonConstruido)
    })

        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na solicitação POST");
            }
        })

        .then(data => {

            let botao = document.getElementById("salvarEvento");

            botao.textContent = "Sucesso!";

            setTimeout(function () {
                botao.textContent = "Salvar";
            }, 5000);
        })

        .catch(error => {
            console.error("Erro na solicitação POST", error);
        })

        .then(() => {
            carregarPaginaPorEvento(jsonConstruido.evento);
        });
}

function construirJSON() {

    let inputEvento = document.getElementById("inputEvento").value;
    let inputInicio = document.getElementById("inputInicio").value;
    let inputFim = document.getElementById("inputFim").value;
    let inputDescricao = document.getElementById("inputDescricao").value;

    const jsonConstruido = {
        nome: inputEvento,
        data_inicio: inputInicio,
        data_fim: inputFim,
        descricao: inputDescricao,
        imagem: "https://source.unsplash.com/random/200x200?sig=1",
        eventos: [],
        locais: [],
        personagens: []
    };


    return jsonConstruido;
}

function alterarImagem(elementId, URL) {

    let imagem = document.getElementById(elementId);

    if (imagem == null) {
        console.log("Erro ao carregar elemento de ID ", elementId);
        return;
    }

    imagem.src = URL;
}

function alterarInput(elementId, novoTexto) {

    let caixaInput = document.getElementById(elementId);

    if (caixaInput == null) {
        console.log("Erro ao carregar elemento de ID " + elementId);
        return;
    }

    if (novoTexto == null) {
        console.log("Texto em" + elementId + "está vazio");
    }

    caixaInput.value = novoTexto;
}

function inserirLista(elementId, lista) {

    let listaHTML = document.getElementById(elementId);

    listaHTML.innerHTML = '';

    lista.forEach(item => {
        let link = document.createElement("a");

        link.href = "#";
        link.className = "list-group-item list-group-item-action";
        link.textContent = item.none;

        listaHTML.appendChild(link);
    });
}

function carregarParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

document.addEventListener("DOMContentLoaded", function () {
    const idEvento = carregarParametroURL("evento");

    if (idEvento) {
        carregarEvento(parseInt(idEvento));
    }
});

function encontrarIDPorEvento(evento) {

    const link = `${databaseLink}?evento=${encodeURIComponent(evento)}`
    return fetch(link)
        .then(response => response.json())
        .then(eventosCarregados => {
            if (Array.isArray(eventosCarregados) && eventosCarregados.length > 0) {
                return eventosCarregados[0].id;
            }
            else {
                return null;
            }
        })

        .catch(error => {
            console.error("erro na pesquisa:", error);
            throw error;
        })
}

function carregarPaginaPorEvento() {
    const eventoID = carregarParametroURL("eventos"); // Obtém o ID do evento a partir da URL
    console.log("Evento ID da URL:", eventoID); // Adicione esta linha para depuração

    encontrarIDPorEvento(eventoID)
        .then(id => {
            console.log("ID encontrado:", id); // Adicione esta linha para depuração
            if (id == null) {
                console.log("ID não encontrado ou é nulo.");
                window.location.href = URLSemParametros();
            } else {
                console.log("Carregando página por ID");
                const novaURL = `${URLSemParametros()}?historia=${id}`;
                window.location.href = novaURL;
            }
        });
}

function URLSemParametros() {
    return window.location.href.split('?')[0];
}

document.getElementById("salvarEvento").addEventListener("click", function () {
    salvarOuAtualizar();
})
