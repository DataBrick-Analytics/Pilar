async function setUserInfos() {
    const userInfos = await searchProfile();
    console.log(userInfos)

    user_name.value = userInfos.nome;
    user_email.value = userInfos.email;
    user_cpf.value = userInfos.cpf;
    user_birthday.value = userInfos.data_nasc;
}

async function searchProfile() {
    const userID = localStorage.USER_ID;

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

    return null; // garante retorno mesmo se der erro
}

async function updateUserProfile() {
    var userName = user_name.value;
    var userEmail = user_email.value;
    var userCPF = user_cpf.value;
    var userBirthday = user_bithday.value;
    var userNewPassword = user_new_password.value;
    var confirmNewPassword = confirm_new_password.value;

    if (userNewPassword != confirmNewPassword) {
        return alert("As senha que você digitou não são iguais!")
    }

    const userInfos = await searchProfile();

    var passwordModal = password_modal.value

    if (passwordModal != userInfos.userPassword) {
        return alert("Senha incorreta!");
    } else {
        var userID = localStorage.USER_ID;

        fetch(`/user/${userID}`, {
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
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    return alert("Alterações feitas com sucesso");
                });
            } else {
                console.log(resposta);
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        });
    }
}