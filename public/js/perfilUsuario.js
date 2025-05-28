async function setUserInfos() {
    const userInfos = await searchProfile;

    user_name.value = userInfos.userName;
    user_email.value = userInfos.userEmail;
    user_cpf.value = userInfos.userCPF;
    user_birthday.value = userInfos.userBirthday;
}

async function searchProfile() {
    var userID = localStorage.USER_ID;

    fetch(`/user/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                return json[0];
            });
        } else {
            console.log(resposta);
            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    });
}

async function updateUserProfile() {
    var userName = user_name.value;
    var userEmail = user_email.value;
    var userCPF = user_cpf.value;
    var userBirthday = user_bithday.value;
    var userNewPassword = user_new_password.value;
    var confirmNewPassword = confirm_new_password.value;

    if (userName == ''
        || userEmail == ''
        || userCPF == ''
        || userBirthday == ''
        || userNewPassword == ''
        || confirmNewPassword == ''
    ) {
        return alert("Dados incompletos!");
    } else if (userNewPassword != confirmNewPassword) {
        return alert("As senha que você digitou não são iguais!")
    }

    const userInfos = await searchProfile();

    var passwordModal = password_modal.value

    if (passwordModal != userInfos.userPassword) {
        return alert("Senha incorreta!");
    } else {
        
    }
}