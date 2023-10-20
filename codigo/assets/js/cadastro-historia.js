const databaseLink = "https://jsonserver-historias.isaquedias1.repl.co/historias";

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

// Executa quando o usuário clica em "Confirmar Exclusão"
function excluirHistoria(excluirId) {
    fetch(databaseLink + "/" + excluirId, {
        method: 'DELETE'
    })
        .then(function () {
            location.reload();
        })
}

// Executa quando o usuário clica em "Salvar"
function salvarOuAtualizar() {
    const idHistoria = carregarParametroURL("historia");

    // Se a página não tiver parametro historia, salva uma nova
    // Se tiver, testa se contém algo para decidir entre atualizar ou salvar uma nova
    if (!idHistoria) {
        salvarHistoria();
        console.log("Nova história salva (URL não continha ID)");
    } else {
        fetch(databaseLink + "/" + idHistoria)
            .then(response => response.json())
            .then(historiaCarregada => {
                if (Object.keys(historiaCarregada).length == 0) {
                    salvarHistoria();
                    console.log("Nova história salva (ID na URL não direciona para nenhuma história)");
                } else {
                    atualizarHistoria(idHistoria);
                    console.log("História atualizada (ID na URL direcionava para história)");
                }
            })
    }
}

function atualizarHistoria(atualizarId) {
    // Usa a função "construirJSON" para criar uma nova história
    let jsonConstruido = construirJSON();
    console.log("Objeto JSON criado:", jsonConstruido);

    // Envia o arquivo para o banco de dados
    fetch(databaseLink + "/" + atualizarId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonConstruido)
    })
        // Testa por erros
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na solicitação POST");
            }
        })
        // Se não houver erro, executa o seguinte
        .then(data => {
            let botao = document.getElementById("salvarHistoria");

            // Troca o conteúdo do botão para "Sucesso!"
            botao.textContent = "Sucesso!";

            // Aguarda 5 segundos e depois restaura o conteúdo para "Salvar"
            setTimeout(function () {
                botao.textContent = "Salvar";
            }, 5000); // 5000 milissegundos (5 segundos)
        })
        .catch(error => {
            console.error("Erro na solicitação POST: ", error);
        })
        .then(() => {
            carregarPaginaPorNome(jsonConstruido.nome);
        });
}

function salvarHistoria() {
    // Usa a função "construirJSON" para criar uma nova história
    let jsonConstruido = construirJSON();
    console.log("Objeto JSON criado:", jsonConstruido);


    // Envia o arquivo para o banco de dados
    fetch(databaseLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonConstruido)
    })
        // Testa por erros
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na solicitação POST");
            }
        })
        // Se não houver erro, executa o seguinte
        .then(data => {
            let botao = document.getElementById("salvarHistoria");

            // Troca o conteúdo do botão para "Sucesso!"
            botao.textContent = "Sucesso!";

            // Aguarda 5 segundos e depois restaura o conteúdo para "Salvar"
            setTimeout(function () {
                botao.textContent = "Salvar";
            }, 5000); // 5000 milissegundos (5 segundos)
        })
        // Se houver erro, executa o seguinte
        .catch(error => {
            console.error("Erro na solicitação POST: ", error);
        })
        .then(() => {
            carregarPaginaPorNome(jsonConstruido.nome);
        });
}

// Cria um JSON novo (usado para salvar/atualizar)
// Não salva eventos, locais e personagens, e apaga se existentes (por enquanto)
function construirJSON() {
    let inputNome = document.getElementById("inputNome").value;
    let inputGenero = document.getElementById("inputGenero").value;
    let inputSinopse = document.getElementById("inputSinopse").value;

    const jsonConstruido = {
        nome: inputNome,
        genero: inputGenero,
        sinopse: inputSinopse,
        imagem: "https://source.unsplash.com/random/200x200?sig=1",
        eventos: [],
        locais: [],
        personagens: []
    };

    return jsonConstruido;
}

// Altera a imagem no elemento "elementId" para conter a imagem na URL
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

function encontrarIDPorNome(nome) {
    const link = `${databaseLink}?nome=${encodeURIComponent(nome)}`
    return fetch(link)
        .then(response => response.json())
        .then(historiasCarregadas => {
            if (Array.isArray(historiasCarregadas) && historiasCarregadas.length > 0) {
                // O recurso foi encontrado
                return historiasCarregadas[0].id;
            } else {
                // O recurso não foi encontrado
                return null;
            }
        })
        .catch(error => {
            console.error("Erro na pesquisa:", error);
            throw error; // Lança o erro para que ele seja capturado fora da função
        });
}

function carregarPaginaPorNome(nome) {
    encontrarIDPorNome(nome)
    .then(id => {
        if (id == null) {
            // Carregar pagina sem parametros
            console.log("Carregando página sem parametros");
            window.location.href = URLSemParametros();
        } else {
            // Carregar pagina com parametro ID
            console.log("Carregando página com ID");
            const novaURL = `${URLSemParametros()}?historia=${id}`;
            window.location.href = novaURL;
        };
    })

    
}

function URLSemParametros() {
    return window.location.href.split('?')[0];
}

// Quando o HTML carregar, o código abaixo será executado
document.addEventListener("DOMContentLoaded", function () {
    const idHistoria = carregarParametroURL("historia");

    // Se a página tiver algum parametro de historia, carregar a história
    if (idHistoria) {
        carregarHistoria(parseInt(idHistoria));
    }
})

// Adiciona a função de salvar no botão
document.getElementById("salvarHistoria").addEventListener("click", function () {
    salvarOuAtualizar();
})

// Adiciona a função de excluir no botão
document.getElementById("excluirHistoria").addEventListener("click", function () {
    const idHistoria = carregarParametroURL("historia");

    // Se a página tiver algum parametro de historia, excluir a história
    if (idHistoria) {
        excluirHistoria(parseInt(idHistoria));
    }
})