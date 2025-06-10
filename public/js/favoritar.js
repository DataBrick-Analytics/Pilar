
const container = document.querySelector('.container-regioes');
if (container) {
    container.addEventListener('click', function (event) {

        console.log("CLICADO!")
        const userID = localStorage.getItem('USER_ID');
        const enterpriseID = localStorage.getItem('EMPRESA_ID');
        const propertyID = isNaN(Number(event.target.id)) ? null : Number(event.target.id)

        const jaFavorito = event.target.classList.contains('ativa')

        if (!jaFavorito) {
            event.target.classList.toggle('ativa');
            favoritar(userID, enterpriseID, propertyID)

        } else if (jaFavorito) {
            event.target.classList.remove('ativa')
            desfavoritar(propertyID)
        }


        if (event.target.classList.contains('botao-fechar')) {
            const card = event.target.closest('.box-regiao');
            if (card) card.style.display = 'none';
        }
    });
} else {
    console.log("Container não encontrado!")
}


function favoritar(user, enterprise, property) {

    if (user == null || enterprise == null || property == null) {
        const valores = {user, enterprise, property}

        valores.forEach(function (item) {
            if (item === null) {
                console.log(`${item} está nulo!`)
            }
        })
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
        }
    }).catch(function (resposta) {
        console.log("ERRO: " + resposta)
    })
}

function desfavoritar(property) {
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
            }).catch(function (err){
                console.error("Erro de rede: " + err)
                Swal.fire({
                    title:"Erro!",
                    text: "Problema de conexão. Tente novamente.",
                    icon: "error",
                    color: "#FFFFFF",
                    background: "#2C3E50"
                })
            })
        }
    })
}
