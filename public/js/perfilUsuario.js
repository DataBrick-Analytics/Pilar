async function setUserInfos() {
    const userInfos = await searchProfile();
    console.log(userInfos)

    user_name.value = userInfos.nome;
    user_email.value = userInfos.email;
    user_cpf.value = userInfos.cpf;
    user_birthday.value = userInfos.data_nasc;
}

async function searchProfile() {
    const userID = localStorage.getItem('USER_ID');

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
    var userNewPassword = user_new_password.value;
    var confirmNewPassword = confirm_new_password.value;

    if (userNewPassword != confirmNewPassword) {
        return alert("As senha que você digitou não são iguais!")
    }

    const userInfos = await searchProfile();

    var passwordModal = password_modal.value

    if (passwordModal != userInfos.senha) {
        return alert("Senha incorreta!");
    } else if (passwordModal == userNewPassword) {
        return alert("A nova senha é identica a antiga!")
    } else {
        var userID = localStorage.USER_ID;

        if (userNewPassword == null || userNewPassword == "") {
            userNewPassword = userInfos.senha;
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
                    data_nasc: userBirthday
                }),
            });

            if (resposta.ok) {
                const json = await resposta.json();
                changeModal();
                password_modal.value = "";
                alert("Alterações feitas com sucesso");
            } else {
                const texto = await resposta.text();
                console.error(texto);
            }
        } catch (erro) {
            console.error(erro);
        }
    }
}

function changeModal() {
    const modal = document.querySelector(".lock");
    modal.classList.toggle('hide');
    password_modal.value = "";
}