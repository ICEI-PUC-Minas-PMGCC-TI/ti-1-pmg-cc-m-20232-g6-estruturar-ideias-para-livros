const databaseLink =  "https://jsonserver.carlosxavier1.repl.co/Personagens"

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
})
