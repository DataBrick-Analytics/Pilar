function entrar() {
    const emailVar = email_input.value;
    const senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha todos os campos!'
        });
        return false;
    }

    fetch("/user/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailVar,
            senha: senhaVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log("Dados recebidos:", json);

                if (json.usuario && json.usuario.id) {
                    localStorage.setItem('USER_ID', json.usuario.id);
                    localStorage.setItem('EMPRESA_ID', json.usuario.fk_empresa);
                    localStorage.setItem('EMAIL_USUARIO', json.usuario.email);
                    localStorage.setItem('NOME_USUARIO', json.usuario.nome);
                    localStorage.setItem('JA_FEZ', json.usuario.jaFezAcao);

                    registrarAtividade(6);
                    Swal.fire({
                        icon: 'success',
                        title: 'Bem vindo!',
                        text: json.message,
                        color: "#FFFFFF",
                        background: "#2C3E50",
                        confirmButtonColor: "#C45824"
                    }).then(() => {
                        console.log("Recebido ja fez acao", json.jaFezAcao);
                        if (json.usuario.jaFezAcao === 1) {
                            window.location.href = "./home.html";
                        } else {
                            window.location.href = "./formulario.html";
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: json.message || 'Email e/ou senha inválidos!',
                        color: "#FFFFFF",
                        background: "#2C3E50",
                        confirmButtonColor: "#C45824"
                    });
                }
            });
        } else {
            console.error('Erro na resposta:', resposta);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível autenticar. Tente novamente mais tarde.',
                color: "#FFFFFF",
                background: "#2C3E50",
                confirmButtonColor: "#C45824"
            });
        }
    }).catch(function (erro) {
        console.error('Erro na requisição:', erro);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao enviar a requisição. Tente novamente mais tarde.'
        });
    });

    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    var iconeSenha = document.getElementById("senhaIcon")

    iconeSenha.addEventListener('click', function () {
        senha_input.type = senha_input.type === 'password' ? 'text' : 'password'
    })
})