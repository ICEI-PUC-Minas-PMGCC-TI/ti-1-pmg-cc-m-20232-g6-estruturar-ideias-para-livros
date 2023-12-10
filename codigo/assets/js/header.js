// Função para verificar se o parâmetro 'usuario' existe na URL
function usuarioExiste() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('usuario');
}

function excluirCabecalho() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('noheader')) {
        return true;
    } else {
        return false;
    }
}

function parametro(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// Chama a função ao carregar a página para controlar a exibição dos botões
document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.getElementById("home");
    const sobreBtn = document.getElementById("sobreNos");
    if (usuarioExiste()) {
        homeBtn.href = "../home/home.html?usuario=" + parametro("usuario")
        sobreBtn.href = "../sobre/sobre.html?usuario=" + parametro("usuario")
    } else {
        homeBtn.href = "../home/home.html"
        sobreBtn.href = "../sobre/sobre.html"
    }

    if (excluirCabecalho()) {
        var cabecalho = document.getElementById("cabecalho");
        cabecalho.remove();
    } else {
        controlarBotoesLoginLogout();
    }
});
// Função para controlar a exibição dos botões com base na existência do parâmetro 'usuario'
function controlarBotoesLoginLogout() {
    const usuarioExistente = usuarioExiste();
    const loginBtn = document.getElementById('login');
    const logoutBtn = document.getElementById('logout');

    if (!usuarioExistente) {
        logoutBtn.remove();
        loginBtn.href = "../login/login.html"
    } else {
        logoutBtn.href = "../home/home.html"
        loginBtn.remove();
    }
}
