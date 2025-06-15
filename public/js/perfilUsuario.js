function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '').slice(0, 11);
    return cpf.replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

document.addEventListener('DOMContentLoaded', function () {
    const cpfInput = document.getElementById('user_cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '').slice(0, 11);
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }
});


async function setUserInfos() {
    const userInfos = await searchProfile();
    console.log(userInfos)

    user_name.value = userInfos.nome;
    user_email.value = userInfos.email;
    user_cpf.value = formatarCPF(userInfos.cpf);
    const dataNasc = new Date(userInfos.data_nasc);
    const dataFormatada = dataNasc.toISOString().split('T')[0];
    user_birthday.value = dataFormatada;

    user_funcao.value = userInfos.funcao_empresa;
}

let userID = localStorage.getItem('ID_FUNCIONARIO')  != null ? localStorage.getItem('ID_FUNCIONARIO') : localStorage.getItem('USER_ID');
async function searchProfile() {

    try {
        const resposta = await fetch(`/user/${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            const json = await resposta.json();
            return json;
        } else {
            console.log(resposta);
            const texto = await resposta.text();
            console.error(texto);
        }
    } catch (erro) {
        console.error(erro);
    }

    return null;
}

async function updateUserProfile() {
    var userName = user_name.value;
    var userEmail = user_email.value;
    var userCPF = user_cpf.value;
    var userBirthday = user_birthday.value;
    var userNewPassword = confirm_new_password.value;

    const passwordModal = password_modal.value;

    userCPF = userCPF.replace(/\D/g, '');

    // Valida senha atual via back-end
    const validacao = await fetch(`/user/checkPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: userID,
            senha: passwordModal
        })
    });

    const senhaValida = await validacao.json();

    if (senhaValida !== 1) {
        return Swal.fire("Erro", "Senha atual incorreta!", "error");
    }

    if (passwordModal === userNewPassword) {
        return Swal.fire("Erro", "A nova senha é idêntica à antiga!", "warning");
    }

    const userInfos = await searchProfile();

    // Se nova senha estiver vazia, mantém a antiga
    if (!userNewPassword) {
        userNewPassword = passwordModal;
    }

    try {
        const resposta = await fetch(`/user/${userID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: userName,
                email: userEmail,
                senha: userNewPassword,
                cpf: userCPF,
                data_nasc: userBirthday,
                funcao_empresa: userInfos.funcao_empresa,
            }),
        });

        if (resposta.status === 200) {
            await resposta.json();
            changeModal();
            password_modal.value = "";
            localStorage.setItem('NOME_USUARIO', userName);
            registrarAtividade(10);
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Alterações feitas com sucesso!',
                color: "#FFFFFF",
                background: "#2C3E50",
                confirmButtonColor: "#C45824"
            }).then(() => {
                document.getElementById('user').textContent = userName;
            });
        }else {
            const texto = await resposta.text();
            console.error(texto);
            return Swal.fire({
                icon: 'erro',
                title: 'Erro!',
                text: 'Erro ao atualizar o perfil..',
                color: "#FFFFFF",
                background: "#2C3E50",
                confirmButtonColor: "#C45824"
            });
        }
    } catch (erro) {
        console.error(erro);
        return Swal.fire({
            icon: 'erro',
            title: 'Erro',
            text: 'Erro ao atualizar o perfil..',
            color: "#FFFFFF",
            background: "#2C3E50",
            confirmButtonColor: "#C45824"
        });
    }
}

function changeModal() {
    const modal = document.querySelector(".lock");
    modal.classList.toggle('hide');
    password_modal.value = "";
}

