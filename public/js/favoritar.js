const container = document.querySelector('.container-regioes');
if (container) {
    container.addEventListener('click', function (event) {

        console.log("CLICADO!")
        const userID = localStorage.getItem('USER_ID');
        const enterpriseID = localStorage.getItem('EMPRESA_ID');
        const propertyID = isNaN(Number(event.target.id)) ? null : Number(event.target.id)

        const jaFavorito = event.target.classList.contains('ativa')

        if (!jaFavorito) {
            favoritar(userID, enterpriseID, propertyID, event)

        } else if (jaFavorito) {
            desfavoritar(propertyID, event)
        }


        if (event.target.classList.contains('botao-fechar')) {
            const card = event.target.closest('.box-regiao');
            if (card) card.style.display = 'none';
        }
    });
} else {
    console.log("Container não encontrado!")
}


function favoritar(user, enterprise, property, event) {

    if (user == null || enterprise == null || property == null) {
        console.log("Dados inválidos - Removendo Classe Ativa")
        event.target.classList.remove('ativa')
        return
    }
    fetch("/favorites/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            userID: user,
            enterpriseID: enterprise,
            favoriteLand: property,
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            Swal.fire({
                icon: "success",
                title: "Feito!",
                text: "Terreno favoritado com sucesso!",
                color: "#FFFFFF",
                background: "#2C3E50"
            })
            event.target.classList.add('ativa');
        } else {
            event.classList.remove('ativa');
            console.error("Erro ao favoritar:", resposta.status);
        }
    }).catch(function (resposta) {
        event.target.classList.remove('ativa')
        console.log("ERRO: " + resposta)
    })
}

function desfavoritar(property, event) {
    if (property == null) {
        const valores = {property}

        valores.forEach(function (item) {
            if (item === null) {
                console.log(`${item} está nulo!`)
            }
        })
    }

    Swal.fire({
        title: "Remover Favorito?",
        text: "Será necessário favoritar novamente se fizer isso.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, remover!",
        color: "#FFFFFF",
        background: "#2C3E50"
    }).then((result) => {
        if (result.isConfirmed) {

            fetch(`/favorites/delete/${property}`, {
                method: "DELETE",

            }).then(function (resposta) {
                if (resposta.ok) {
                    event.target.classList.remove('ativa')
                    Swal.fire({
                        icon: "success",
                        title: "Feito!",
                        text: "Terreno removido dos seus favoritos.",
                        color: "#FFFFFF",
                        background: "#2C3E50"
                    })

                } else {
                    console.error("Erro ao remover favorito!", resposta.status)
                    Swal.fire({
                        title: "Erro!",
                        text: "Não foi possível remover o terreno dos seus favoritos.",
                        icon: "error",
                        color: "#FFFFFF",
                        background: "#2C3E50"
                    })
                }
            }).catch(function (err) {
                console.error("Erro de rede: " + err)
                Swal.fire({
                    title: "Erro!",
                    text: "Problema de conexão. Tente novamente.",
                    icon: "error",
                    color: "#FFFFFF",
                    background: "#2C3E50"
                })
            })
        }
    })
}

async function verificarFavoritosExistentes() {
    const userID = localStorage.getItem('USER_ID');
    const enterpriseID = localStorage.getItem('EMPRESA_ID');

    console.log("Verificando favoritos para:", {userID, enterpriseID});

    if (!userID || !enterpriseID) {
        console.log("UserID ou EnterpriseID não encontrados no localStorage");
        return;
    }

    try {
        const response = await fetch(`/favorites/user/${userID}/${enterpriseID}`);

        if (!response.ok) {
            console.log("Erro ao buscar favoritos:", response.status);
            return;
        }

        const favoritos = await response.json();
        console.log("Favoritos retornados:", favoritos);

        favoritos.forEach(favorito => {
            const botaoFavorito = document.getElementById(favorito.favoriteLand);
            if (botaoFavorito && botaoFavorito.classList.contains('botao-favoritos')) {
                botaoFavorito.classList.add('ativa');
                console.log(`Distrito ${favorito.favoriteLand} marcado como favorito`);
            }
        });

        console.log(`${favoritos.length} favoritos marcados na interface`);

    } catch (error) {
        console.log("Erro ao verificar favoritos existentes:", error);
    }
}