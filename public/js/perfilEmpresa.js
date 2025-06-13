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
            if (json.funcao_empresa != 'Admin') {
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

    console.log(enterpriseInfos);
    fantasy_name.value = enterpriseInfos.nome_fantasia;
    social_reason.value = enterpriseInfos.razao_social;
    street.value = enterpriseInfos.rua;
    neighborhood.value = enterpriseInfos.bairro;
    cep_code.value = enterpriseInfos.cep;
    city.value = enterpriseInfos.cidade;
    state.value = enterpriseInfos.estado;
    number.value = enterpriseInfos.numero;
    phone.value = enterpriseInfos.telefone;

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

async function updateEnterprise() {
    const enterpriseID = localStorage.getItem('EMPRESA_ID');

    const enterpriseInformations = {
        fantasyName: fantasy_name.value,
        socialReason: social_reason.value,
        street: street.value,
        neighborhood: neighborhood.value,
        cepCode: cep_code.value,
        city: city.value,
        state: state.value,
        number: number.value,
        phone: phone.value
    };

    console.log(enterpriseInformations);

    const userID = localStorage.USER_ID;
    const passwordModal = password_modal.value;
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
        return Swal.fire("Erro", "Senha incorreta!", "error");
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
            registrarAtividade(12);
            return alert("Alterações feitas com sucesso")
        } else {
            const texto = await resposta.text();
            console.error(texto);
        }
    } catch (error) {
        console.error(error);
    }
}

async function deleteEnterprise() {
    const enterpriseID = localStorage.getItem('EMPRESA_ID');
    
    const userID = localStorage.USER_ID;
    const passwordModal = password_modal_delete.value;
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
        return Swal.fire("Erro", "Senha incorreta!", "error");
    }

    try {
        const resposta = await fetch(`/enterprise/${userID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            changeModal();
            alert("Empresa excluída com sucesso");
            limparSessao();
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

function changeModalDelete() {
    const modal = document.querySelector(".lockDelete");
    modal.classList.toggle('hideDelete');
    password_modal_delete.value = "";
}