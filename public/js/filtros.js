async function filterRegion() {
    const zona = document.getElementById("filtroZona").value
    const priceM2 = document.getElementById("filtroValorM2").value
    const violencia = document.getElementById("filtroViolencia").value
    const densidade = document.getElementById("filtroDensidade").value

    const objFilter = {
        zona: zona || undefined,
        violenciaMax: violencia ? Number(violencia) : undefined,
        densidadeMax: densidade ? Number(densidade) : undefined,
        precoMin: priceM2,

    }

    console.log(objFilter)
    try {
        const response = await fetch("/filter/getRegionByFilter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objFilter)
        })

        if (!response.ok) {
            const text = await response.text()
            console.error("Resposta do servidor não OK", response.status, text)
            return
        }

        const respostaJson = await response.json()
        const regions = Array.isArray(respostaJson) ? respostaJson : [respostaJson];

        console.log(regions)
        const container = document.querySelector(".container-regioes")
        container.innerHTML = ""

        regions.forEach(region => {
            const card = document.createElement("div")
            card.className = "box-regiao"
            card.innerHTML = `
                <div class="box-regiao-cima">
                    <div class="box-titulo-botoes"">
                        <div class="titulo-regiao"><h1>Região #${region.id_distrito}</h1></div>
                        <div class="botao-favoritos" id="${region.id_distrito}">&#9733;</div>
                        <div class="botao-fechar">X</div>
                    </div>
                    <p>${region.nome_distrito} / Região ${region.zona} / R$${region.preco_m2} </p>
                </div>
                <div class="box-regiao-baixo">
                    <div class="box-botao">Acessar Região</div>
                </div>
            `
            container.appendChild(card)
        })
    } catch (error){
        console.log("Erro ao gerar os cards", error)
    }
}




async function generateRandomRegionCards(){
    try {
        const response = await fetch("/filter/getRandomRegion", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        const randomRegions = await response.json()
        const container = document.querySelector(".container-regioes")
        container.innerHTML = ""

        randomRegions.forEach(region => {
            const card = document.createElement("div")
            card.className = "box-regiao"
            card.innerHTML = `
                <div class="box-regiao-cima">
                    <div class="box-titulo-botoes">
                        <div class="titulo-regiao"><h1>Região #${region.id_distrito}</h1></div>
                        <div class="botao-favoritos" id="${region.id_distrito}">&#9733;</div>
                        <div class="botao-fechar">X</div>
                    </div>
                    <p>Nome: ${region.nome_distrito} / Zona ${region.zona} </p>
                </div>
                <div class="box-regiao-baixo">
                    <div class="box-botao">Acessar Região</div>
                </div>
            `
            container.appendChild(card)
        })
    } catch (error){
        console.log("Erro ao gerar os cards", error)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    generateRandomRegionCards()
})