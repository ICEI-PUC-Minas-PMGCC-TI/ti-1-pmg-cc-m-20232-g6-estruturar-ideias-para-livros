const databaseLink = "https://organizarideiasjsonserver.isaquedias1.repl.co";

function listaCards() {
    if (parametro("usuario") != null && parametro("usuario") != undefined) {
        const lista = document.getElementById("cardsHistoria");
        lista.innerHTML = '';
        let search = databaseLink + "/historias?id_usuario=" + parametro("usuario");
        console.log("Pesquisando em " + search)
        fetch(search)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    let link = "../cadastro-historia/cadastro-historia.html?usuario=" + parametro("usuario") + "&historia=" + data[i].id
                    lista.appendChild(criarCard(data[i].imagem, data[i].nome, data[i].sinopse, link))
                }
                let link = "../cadastro-historia/cadastro-historia.html?usuario=" + parametro("usuario")
                lista.appendChild(criarCard("https://source.unsplash.com/random/200x200?sig=15", "Nova História", "Criar uma nova história", link))
            })
    }
}

function limitarString(str, limite) {
    if (str.length > limite) {
      return str.substring(0, limite) + "...";
    } else {
      return str;
    }
  }

function criarCard(urlImagem, titulo, sinopse, link) {
    // Criação dos elementos HTML
    var divCol = document.createElement('div');
    divCol.className = 'col-3';

    var divCard = document.createElement('div');
    divCard.className = 'card bg-light shadow m-1';

    var img = document.createElement('img');
    img.src = urlImagem;
    img.className = 'card-img-top';
    img.alt = 'Imagem do Card';

    var divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';

    var h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = titulo;

    var p = document.createElement('p');
    p.className = 'card-text';
    p.textContent = limitarString(sinopse, 60);

    var a = document.createElement('a');
    a.href = link;
    a.className = 'btn btn-success';
    a.textContent = 'Visualizar';

    // Montagem da estrutura
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(a);

    divCard.appendChild(img);
    divCard.appendChild(divCardBody);

    divCol.appendChild(divCard);

    return divCol;
}

function parametro(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

document.addEventListener("DOMContentLoaded", function () {
    listaCards();
})