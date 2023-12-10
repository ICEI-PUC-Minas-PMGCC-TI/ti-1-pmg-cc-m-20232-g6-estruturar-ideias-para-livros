const databaseLink = "https://organizarideiasjsonserver.isaquedias1.repl.co/usuarios";
const linkInicial = "../";

function entrarUsuario() {
    console.log("Botão 'Salvar' clicado.");
    let jsonConstruido = construirJSON();
    console.log("Objeto JSON criado", jsonConstruido);

    const search = databaseLink + "?nome=" + jsonConstruido.nome
    fetch(search)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                if (jsonConstruido.senha != data[0].senha) {
                    alert("Senha Incorreta");
                } else {
                    alert("Entrando na conta");
                    window.location.href = linkInicial + "home/home.html?usuario=" + data[0].id
                }
                return;
            } else {
                alert("Usuário não encontrado");
            }
        })
};

function construirJSON() {

    let nome_usuario = document.getElementById("nome_usuario").value
    let senha_usuario = document.getElementById("senha_usuario").value

    const jsonConstruido = {
        nome: nome_usuario,
        senha: senha_usuario
    };
    

    return jsonConstruido;
}