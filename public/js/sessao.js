// sessão
function validarSessao() {
    var email = localStorage.getItem('EMAIL_USUARIO');
    var nome = localStorage.getItem('NOME_USUARIO');

    var user = document.getElementById("user");

    if (!window.location.pathname.endsWith("/usuario.html") != ) {
        localStorage.removeItem('ID_FUNCIONARIO');
    }

    if (!user) {
        console.error("Elemento com id 'user' não encontrado.");
        return;
    }

    if (email != null && nome != null) {
        user.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

