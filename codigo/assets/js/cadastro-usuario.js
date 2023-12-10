const databaseLink = "https://organizarideiasjsonserver.isaquedias1.repl.co/usuarios"

const nome_usuario = document.getElementById("nome_usuario")
const senha_usuario = document.getElementById("senha_usuario")


document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM totalmente carregado!");

    // Obter o ID do usuário da URL
    const idUsuario = obterParametroDaURL("usuario");

    // Verifica se o URL tem o ID
    if (idUsuario) {
        // Fazer uma solicitação ao servidor para obter os valores do banco de dados com base no ID do usuário
        fetch(`${databaseLink}/${idUsuario}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Resposta do servidor não OK');
                }
                return response.json();
            })
            .then(data => {
                // Preencher os campos do formulário com os dados do usuário
                nome_usuario.value = data.nome;
                senha_usuario.value = data.senha;
                console.log('Elementos do DOM encontrados:', nome_usuario, senha_usuario);
            })
            .catch(error => console.error('Erro ao obter valores do banco de dados:', error));
    } else {
        console.error('ID de usuário não encontrado na URL.');
    }

    // Função para obter parâmetros da URL
    function obterParametroDaURL(nome) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nome);
    }
});

function salvarUsuario() {
    console.log("Botão 'Salvar' clicado.");
    let jsonConstruido = construirJSON();
    console.log("Objeto JSON criado", jsonConstruido);

    const search = databaseLink + "?nome=" + jsonConstruido.nome
    fetch(search)
        .then(response => response.json())
        .then(data => {
            if (data.length != 0) {
                alert("Já existe um usuário com esse nome")
                return;
            } else {
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
                    return response.json();
                })
                .then(data => {
                    console.log("Dados recebidos após a solicitação POST:", data);
                    alert("Usuário cadastrado com sucesso!")
                })
                .catch(error => {
                    console.error("Erro na solicitação POST", error);
                });
            }
        })
}

function construirJSON() {

    let nome_usuario = document.getElementById("nome_usuario").value
    let senha_usuario = document.getElementById("senha_usuario").value

    const jsonConstruido = {
        nome: nome_usuario,
        senha: senha_usuario
    };
    

    return jsonConstruido;
}