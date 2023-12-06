const databaseLink = "https://jsonserver-isaque-final.isaquedias1.repl.co";
const linkInicial = "../";
var idHistoria = 0;
var idUsuario = 0;
var idPersonagem = 0;

//////
// ADMINISTRA USUARIO E HISTORIA
//////
function alterarIdPersonagem(novoId) {
    if (novoId <= 0) {
        return;
    }

    if (novoId) {
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

function salvarPersonagem() {
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
            alert(`Personagem ${JSONConstruido.nome} salvo com sucesso!`);
            alterarIdPersonagem(encontrarPorNome(JSONConstruido.nome));
        })
        // Se houver erro, executa o seguinte
        .catch(error => {
            alert(`Erro ao salvar ${JSONConstruido.nome}!`);
            console.error("Erro na solicitação POST: ", error);
        })
}

function atualizarPersonagem() {
    const JSONConstruido = construirJSON();

    // Atualiza o arquivo no banco de dados
    fetch(databaseLink + "/usuarios/" + idUsuario, {
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
            alert(`Personagem ${JSONConstruido.nome} atualizado com sucesso!`);
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

/*const databaseLink =  "https://jsonserver.carlosxavier1.repl.co/Personagens"

function carregarPersonagem(carregarId) {
  fetch(databaseLink + "/" + carregarId)
  .then(response => response.json())
  .then(personagemCarregado => {
  // Cancela o carregamento se nao tiver encontrado nenhuma historia
  if (Object.keys(personagemCarregado).length == 0) {
      return;
  }
    //carrega a pagina
    alterarImagem("imagemPersonagem", personagemCarregado.imagem);

    alterarInput("inputNome",personagemCarregado.nome);
    alterarInput("inputRaca",personagemCarregado.raca);
    alterarInput("inputPapel",personagemCarregado.papel);
    alterarInput("inputDescricao",personagemCarregado.descricao);

    inserirLista("listaEventos", personagemCarregado.eventos);
    inserirLista("listaLocais", personagemCarregado.locais);
    inserirLista("listaPersonagens", personagemCarregado.personagens);
  })
}

//executado ao confirmar a exclusão
function excluirPersonagem(excluirId){
  fetch(databaseLink + "/" + excluirId, {
    method: 'DELETE'
  })
    .then(function () {
      location.reload();
    })
}

function salvarPersonagem(){
  const idPersonagem = carregarParametroURL("personagem");
  //parte importante
  let jsonConstruido = construirJson();
  console.log("Objeto JSON criado:", jsonConstruido);
  
  fetch(databaseLink, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonConstruido)
  })
  //teste de erro
  .then(response => {
      if (!response.ok) {
          throw new Error("Erro na solicitação POST");
      }
  })
  //se não ouver erro
  .then(data => {
      let botao = document.getElementById("botaoInserir");
      botao.textContent = "Sucesso!";
      setTimeout(function () {
          botao.textContent = "Salvar";
      }, 5000);
  })
  // Se houver erro
  .catch(error => {
      console.error("Erro na solicitação POST: ", error);
  })
  .then(() => {
      carregarPaginaPorNome(jsonConstruido.nome);
  });
  
  console.log("Novo personagem salvo")
}

function alterarPersonagem(){
  const idPersonagem = carregarParametroURL("personagem");
  fetch(databaseLink + "/" + idPersonagem)
  .then(response => response.json())
  .then(personagemCarregado => {
      if (Object.keys(personagemCarregado).length == 0) {
          salvarPersonagem();
          console.log("salvo como novo personagem(id invalido)");
      } else {
        //parte importante
        let jsonConstruido = construirJson();
        console.log("Objeto JSON criado:", jsonConstruido);

        fetch(databaseLink + "/" + idPersonagem, {
          method: 'PUT',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(jsonConstruido)
        })
        //teste de erro
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro na solicitação POST");
           }
        })
        //se não ouver erro
        .then(data => {
            let botao = document.getElementById("botaoAlterar");
            botao.textContent = "Sucesso!";
            setTimeout(function () {
                botao.textContent = "Alterar";
            }, 5000);
        })
        //se ouver erro
        .catch(error => {
            console.error("Erro na solicitação POST: ", error);
        })
        .then(() => {
            carregarPaginaPorNome(jsonConstruido.nome);
        });

        console.log("Personagem atualizado");
      }
  })
}

function construirJson(){
  //pega valores
  let inputNome= document.getElementById("inputNome").value;
  let inputRaca= document.getElementById("inputRaca").value;
  let inputPapel= document.getElementById("inputPapel").value;
  let inputDescricao= document.getElementById("inputDescricao").value;

  //constroi o Json
  const jsonConstruido = {
    nome: inputNome,
    raca: inputRaca,
    papel: inputPapel,
    descricao: inputDescricao,
    imagem: "https://thispersondoesnotexist.com/",
    eventos: [],
    locais: [],
    personagens: []
  };

 return jsonConstruido;
}

function alterarImagem(elementId, URL) {
  let imagem = document.getElementById(elementId);
  if (imagem == null) {
      console.log("Erro ao carregar elemento de ID " + elementId);
      return;
  }
  imagem.src = URL;
}

function alterarInput(elementId, novoTexto){
  let input = document.getElementById(elementId);
  if (input == null) {
      console.log("Erro ao carregar o elemento " + elementId);
      return;
  }
  if (novoTexto == null) {
      console.log("Texto em " + elementId + " é nulo")
  }
  input.value = novoTexto;
}

function inserirLista(elementId, lista){
  let listaHTML = document.getElementById(elementId);
  listaHTML.innerHTML = '';
  //percorre todos os elementos criando um elemento li e o adicionando
  lista.forEach(item => {
    let li = document.createElement("li");
    li.href = "#";
    li.className = "list-group-item list-group-item-action";
    li.textContent = item.nome;
    listaHTML.appendChild(li);
  
  });
}

function carregarParametroURL(parametro){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parametro);
}

function encontrarIdPorNome(nome){
  const link = `${databaseLink}?nome=${encodeURIComponent(nome)}`
  return fetch(link)
  .then(response => response.json())
  .then(personagensCarregados => {
      if (Array.isArray(personagensCarregados) && personagensCarregados.length > 0) {
          // O recurso foi encontrado
          return personagensCarregados[0].id;
      } else {
          // O recurso não foi encontrado
          return null;
      }
  })
  .catch(error => {
      console.error("Erro na pesquisa:", error);
      throw error;
  });
}

function carregarPaginaPorNome(nome){
  encontrarIdPorNome(nome)
  .then(id => {
    if(id==null){
      console.log("Carregando página sem parametros");
      window.location.href = URLSemParametros();
    }else{
      console.log("Carregando página com ID");
      const novaURL = `${URLSemParametros()}?personagem=${id}`;
      window.location.href = novaURL;
    };
  })
}

function URLSemParametros(){
  return window.location.href.split('?')[0];
}

//Codigo executado assim que o site carregar
document.addEventListener("DOMContentLoaded", function () {
  const idPersonagem = carregarParametroURL("personagem");
  if(idPersonagem){
    carregarPersonagem(parseInt(idPersonagem));
  }
})

document.getElementById("botaoIncerir").addEventListener("click", function () {salvarPersonagem();})
document.getElementById("botaoAlterar").addEventListener("click", function () {alterarPersonagem();})
document.getElementById("botaoExcluir").addEventListener("click", function () {
    const idPersonagem = carregarParametroURL("personagem");

    // Se a página tiver algum parametro, excluir
    if (idPersonagem) {
        excluirPersonagem(parseInt(idPersonagem));
    }
})*/