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

// Chama a função ao carregar a página para controlar a exibição dos botões
window.onload = function() {
    if (excluirCabecalho()) {
        var cabecalho = document.getElementById("cabecalho");
        cabecalho.remove();
    } else {
        controlarBotoesLoginLogout();
    }
};
// Função para controlar a exibição dos botões com base na existência do parâmetro 'usuario'
function controlarBotoesLoginLogout() {
    const usuarioExistente = usuarioExiste();
    const loginBtn = document.getElementById('login');
    const logoutBtn = document.getElementById('logout');

    if (!usuarioExistente) {
        logoutBtn.remove();
    } else {
        loginBtn.remove();
    }
}
