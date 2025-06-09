async function filterRegion() {
    const zone = document.getElementById("filtroZona").value
    const predominance = document.getElementById("filtroPredominancia").value
    const priceM2 = document.getElementById("filtroValorM2").value
    const size = document.getElementById("filtroTamanho").value

    const objFilter = {zone, predominance, priceM2, size}

    console.log(objFilter)
    try {
        const response = await fetch("/filter/getRegionByFilter", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objFilter)
        })
        const regions = await response.json()
        const container = document.querySelector(".container-regioes")
        container.innerHTML = ""

        regions.forEach(region => {
            const card = document.createElement("div")
            card.className = "box-regiao"
            card.innerHTML = `
                <div class="box-regiao-cima">
                    <div class="box-titulo-botoes">
                        <div class="titulo-regiao"><h1>Região X1</h1></div>
                        <div class="botao-favoritos">&#9733;</div>
                        <div class="botao-fechar">X</div>
                    </div>
                    <p>Um belo apartamento moderno no centro da cidade</p>
                </div>
                <div class="box-regiao-baixo">
                    <div class="box-botao">Acessar Região</div>
                </div>
            `
            container.appendChild(region)
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
                        <div class="titulo-regiao"><h1>Região X1</h1></div>
                        <div class="botao-favoritos">&#9733;</div>
                        <div class="botao-fechar">X</div>
                    </div>
                    <p>Um belo apartamento moderno no centro da cidade</p>
                </div>
                <div class="box-regiao-baixo">
                    <div class="box-botao">Acessar Região</div>
                </div>
            `
            container.appendChild(region)
        })
    } catch (error){
        console.log("Erro ao gerar os cards", error)
    }
}