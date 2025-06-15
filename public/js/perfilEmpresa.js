var managerPassword;

// Máscara para CEP
document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('cep_code');
    if (cepInput) {
        cepInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '').slice(0, 8);
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }

    // Máscara para Telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '').slice(0, 11);
            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 5) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                value = value.replace(/(\d*)/, '($1');
            }
            e.target.value = value;
        });
    }
});


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

function formatarCEP(cep) {
    cep = cep.replace(/\D/g, '').slice(0, 8);
    return cep.replace(/(\d{5})(\d)/, '$1-$2');
}

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '').slice(0, 11);
    if (telefone.length > 10) {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length > 5) {
        return telefone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (telefone.length > 2) {
        return telefone.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        return telefone.replace(/(\d*)/, '($1');
    }
}


async function setEnterpriseInfos() {
    const enterpriseInfos = await searchEnterprise();

    console.log(enterpriseInfos);
    fantasy_name.value = enterpriseInfos.nome_fantasia;
    social_reason.value = enterpriseInfos.razao_social;
    street.value = enterpriseInfos.rua;
    neighborhood.value = enterpriseInfos.bairro;
    cep_code.value = formatarCEP(enterpriseInfos.cep);
    city.value = enterpriseInfos.cidade;
    state.value = enterpriseInfos.estado;
    number.value = enterpriseInfos.numero;
    phone.value = formatarTelefone(enterpriseInfos.telefone);
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


function limparCEP(cep) {
    return cep.replace(/\D/g, '');
}

function limparTelefone(telefone) {
    return telefone.replace(/\D/g, '');
}


async function updateEnterprise() {
    const enterpriseID = localStorage.getItem('EMPRESA_ID');

    const cepLimpo = limparCEP(cep_code.value);
    const telefoneLimpo = limparTelefone(phone.value);

    const enterpriseInformations = {
        fantasyName: fantasy_name.value,
        socialReason: social_reason.value,
        street: street.value,
        neighborhood: neighborhood.value,
        cepCode: cepLimpo,
        city: city.value,
        state: state.value,
        number: number.value,
        phone: telefoneLimpo
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
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Senha incorreta',
            color: "#FFFFFF",
            background: "#2C3E50",
            confirmButtonColor: "#C45824"
        });
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
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Empresa alterada com sucesso',
                color: "#FFFFFF",
                background: "#2C3E50",
                confirmButtonColor: "#C45824"
            });
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
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Senha incorreta!',
            color: "#FFFFFF",
            background: "#2C3E50",
            confirmButtonColor: "#C45824"
        });
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
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Empresa deletada com sucesso',
                color: "#FFFFFF",
                background: "#2C3E50",
                confirmButtonColor: "#C45824"
            });
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