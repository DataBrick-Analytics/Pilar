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

                // Alterado para verificar o objeto usuario
                if (json.usuario && json.usuario.id) {
                    localStorage.setItem('USER_ID', json.usuario.id);
                    localStorage.setItem('EMPRESA_ID', json.usuario.fk_empresa);
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Bem vindo!',
                        text: json.message
                    }).then(() => {
                        window.location.href = "./dashboard.html";
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: json.message || 'Email e/ou senha inválidos!'
                    });
                }
            });
        }
        // ...existing code...
    });

	return false;
}