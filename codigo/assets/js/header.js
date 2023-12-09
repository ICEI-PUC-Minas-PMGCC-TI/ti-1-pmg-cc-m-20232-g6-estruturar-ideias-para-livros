// Função para verificar se o parâmetro 'usuario' existe na URL
function usuarioExiste() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('usuario');
}

// Função para controlar a exibição dos botões com base na existência do parâmetro 'usuario'
function controlarBotoesLoginLogout() {
    const usuarioExistente = usuarioExiste();
    const loginBtn = document.getElementById('login');
    const logoutBtn = document.getElementById('logout');

    if (!usuarioExistente) {
        logoutBtn.classList.add("disabled");
    } else {
        loginBtn.classList.add("disabled");
    }
}

// Chama a função ao carregar a página para controlar a exibição dos botões
window.onload = function() {
    controlarBotoesLoginLogout();
};
// Função para verificar se o parâmetro 'usuario' existe na URL
function usuarioExiste() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('usuario');
}

// Função para controlar a exibição dos botões com base na existência do parâmetro 'usuario'
function controlarBotoesLoginLogout() {
    const usuarioExistente = usuarioExiste();
    const loginBtn = document.getElementById('login');
    const logoutBtn = document.getElementById('logout');

    if (!usuarioExistente) {
        logoutBtn.classList.add("disabled");
    } else {
        loginBtn.classList.add("disabled");
    }
}

// Chama a função ao carregar a página para controlar a exibição dos botões
window.onload = function() {
    controlarBotoesLoginLogout();
};
