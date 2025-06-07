var managerPassword;

async function isManagerUser() {
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
            if (json.funcao_empresa != 'Gerente') {
                window.location.href = "./dashboard.html"
            }
            managerPassword = json.senha;
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

async function setEnterpriseInfos() {
    const enterpriseInfos = await searchEnterprise();
    const enterpriseAddress = await searchEnterpriseAddress();

    console.log(enterpriseInfos);
    console.log(enterpriseAddress);

    social_reason.value = enterpriseInfos.razao_social;
    fantasy_name.value = enterpriseInfos.nome_fantasia;
    street.value = enterpriseAddress.rua;
    neighborhood.value = enterpriseAddress.bairro;
    cep_code.value = enterpriseAddress.cep;
    city.value = enterpriseAddress.cidade;
    state.value = enterpriseAddress.estado;
    state_code.value = enterpriseAddress.uf;
}

async function searchEnterprise() {
    const enterpriseID = localStorage.getItem('EMPRESA_ID');

    try {
        const resposta = await fetch(`/enterprise/${enterpriseID}`, {
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

async function searchEnterpriseAddress() {
    const enterpriseID = localStorage.getItem('EMPRESA_ID');

    try {
        const resposta = await fetch(`/enterprise/address/${enterpriseID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            const json = await resposta.json();
            console.log(json)
            return json;
        } else {
            console.log(resposta);
            const texto = await resposta.text();
            console.error(texto);
        }
    } catch (erro) {
        console.error(erro);
    }
}

async function updateEnterprise() {
    const enterpriseID = localStorage.getItem('EMPRESA_ID');

    const enterpriseInformations = {
        socialReason: social_reason.value,
        fantasyName: fantasy_name.value,
        street: street.value,
        neighborhood: neighborhood.value,
        cepCode: cep_code.value,
        city: city.value,
        state: state.value,
        stateCode: state_code.value
    };

    console.log(enterpriseInformations);

    let passwordModal = password_modal.value;

    if (Object.values(enterpriseInformations).some(value => value == null || value.trim() == "")) {
        return alert("Todos os campos precisam estar preenchidos")
    } else if (passwordModal != managerPassword) {
        return alert("Senha incorreta!")
    }

    try {
        const resposta = await fetch(`/enterprise/${enterpriseID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(enterpriseInformations)
        });

        if (resposta.ok) {
            const json = resposta.json();
            changeModal();
            return alert("Alterações feitas com sucesso")
        } else {
            const texto = await resposta.text();
            console.error(texto);
        }
    } catch (error) {
        console.error(error);
    }
}

function changeModal() {
    const modal = document.querySelector(".lock");
    modal.classList.toggle('hide');
    password_modal.value = "";
}