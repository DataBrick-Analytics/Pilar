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
    const enterpriseInfos = await searchProfile();


}

async function searchEnterprise() {
    
}