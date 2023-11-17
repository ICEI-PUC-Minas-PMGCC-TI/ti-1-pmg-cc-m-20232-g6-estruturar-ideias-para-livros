const databaseLink="https://jsonserver-timeline--arthurkkmal.repl.co/historias"

document.addEventListener("DOMContentLoaded", function () {

const timeline = document.getElementById("timeline");
const inicio = document.getElementById("inicio");
const fim = document.getElementById("fim");
const nomeHistoria = document.getElementById("nomeHistoria");

    // Obter o ID da história da URL
    const idHistoria = obterParametroDaURL("historia");

    //Verifica se o url tem o id
if (idHistoria) {
    // Fazer uma solicitação ao servidor para obter os valores do banco de dados com base no ID da história
    fetch(`${databaseLink}/${idHistoria}`)
        .then(response => {
            if(!response.ok){
                throw new Error('Resposta do servidor não OK');
            }
            return response.json()
        })
        .then(data => {
            // Atualizar o slider e outros elementos com os valores obtidos do banco de dados
            timeline.min = data.datainicio;
            timeline.max = data.datafim;
            nomeHistoria.textContent = data.nome;
            inicio.textContent = data.datainicio;
            fim.textContent = data.datafim;
        })
        .catch(error => console.error('Erro ao obter valores do banco de dados:', error));
} else {
    console.error('ID de história não encontrado na URL.');
}

 // Função para obter parâmetros da URL
 function obterParametroDaURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

});