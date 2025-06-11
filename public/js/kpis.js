let securityData = []
var securityDataSum = 0
var populationRegion = 0
var comercialBuildings = 0;
var residencialBuildings = 0;
var totalBuildings = 0;
const fkDistrito = localStorage.getItem('REGIAO_ID');

document.addEventListener('DOMContentLoaded', function () {
    getViolenceIndex();
    getUrbanMeshDensity();
    getPriceSquareMeter();
    getRegionType();
    getParksByRegion();
    getHospitalsByRegion();
    getSchoolsByRegion();
})

function getRegionType() {
    fetch(`/data/getRegionType/${fkDistrito}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        console.log("Peguei as informações de tipo de região no banco");

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                comercialBuildings = parseInt(json[0].total_comercial) + parseInt(json[0].total_garagens_depositos) + parseInt(json[0].total_industrial) + (parseInt(json[0].total_misto) / 2)
                residencialBuildings = parseInt(json[0].total_residencial) + (parseInt(json[0].total_misto) / 2)
                totalBuildings = parseInt(json[0].total_comercial) + parseInt(json[0].total_garagens_depositos) + parseInt(json[0].total_industrial) + parseInt(json[0].total_misto) + parseInt(json[0].total_residencial)

                if (residencialBuildings > (0.7 * totalBuildings)) {
                    kpitipo.innerHTML = "Residencial"
                    const residencialPercentage = (residencialBuildings / (totalBuildings) * 100).toFixed(2);
                    kpitipovalor.innerHTML = `${residencialPercentage}%`

                } else {
                    kpitipo.innerHTML = "Comercial"
                    const comercialPercentage = (comercialBuildings / (totalBuildings) * 100).toFixed(2);
                    kpitipovalor.innerHTML = `${comercialBuildings}%`

                }
            });

        } else {
            console.log(resposta);
            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
            kpitipo.innerHTML = "0 "
        }

    }).catch(function (erro) {
        console.log(erro);
    });
}


async function getUrbanMeshDensity() {
    fetch(`/data/getUrbanMeshDensity/${fkDistrito}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    let valorMalhaUrbana = Number(json[0].valor_mobilidade_por_area);
                    kpimalhaurbana.innerText = `${(valorMalhaUrbana.toFixed(2))} pa*/km²`;
                    top_malha_urbana.innerText = json[0].row_num + "º";

                    const nome_regiao = json[0].nome_distrito
                        .split(' ')
                        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
                        .join(' ');

                    regiao_nome.innerHTML = nome_regiao;
                });
            } else {
                console.log("Houve um erro durante a requisição")
                kpimalhaurbana.innerHTML = "0 "
            }
        }
    ).catch(function (erro) {
        console.error(erro)
    })
}

async function getParksByRegion() {
    const kpiParques = document.getElementById("kpiParques");

    try {
        const resposta = await fetch(`/data/getParksByRegion/${fkDistrito}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (resposta.ok) {
            const dados = await resposta.json();
            console.log("Dados recebidos:", dados);
            if (dados.length > 0) {
                kpiParques.innerText = dados[0].qtde_parques;
            } else {
                kpiParques.innerText = "0";
            }
        } else {
            throw new Error("Erro ao buscar dados dos parques");
        }
    } catch (erro) {
        console.error("Erro:", erro);
        kpiParques.innerText = "0";
    }
}

async function getHospitalsByRegion() {
    const kpiHospitais = document.getElementById("kpiHospitais")
    try {
        const resposta = await fetch(`/data/getHospitalsByRegion/${fkDistrito}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (resposta.ok) {
            const dados = await resposta.json();
            console.log("Dados recebidos:", dados);
            if (dados) {
                kpiHospitais.innerText = dados.total_pontos_saude;
            } else {
                kpiHospitais.innerText = "0";
            }
        } else {
            throw new Error("Erro ao buscar dados dos hospitais");
        }
    } catch (erro) {
        console.error("Erro:", erro);
        kpiHospitais.innerText = "0";
    }
}



async function getSchoolsByRegion() {
    const kpiEscolas = document.getElementById("kpiEscolas")
    try {
        const resposta = await fetch(`/data/getSchoolsRegion/${fkDistrito}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (resposta.ok) {
            const dados = await resposta.json()
            console.log("Dados recebidos: " + dados)

            if (dados) {
                kpiEscolas.innerText = dados.total_escolas;
            } else {
                kpiEscolas.innerText = "0";
            }
        } else {
            throw new Error("Erro ao buscar dados das escolas");
        }
    }catch (erro) {
        console.error("Erro:", erro);
        kpiEscolas.innerText = "0";
    }
}



async function getPriceSquareMeter(){
    const kpiValorMetro = document.getElementById("kpivalor")
    kpiValorMetro.innerText=''

    try {
        const resposta = await fetch(`/data/getPriceSquareMeter/${fkDistrito}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(resposta.ok){
            const dados = await resposta.json()
            console.log("Dados recebidos: " + dados)
            if(dados.length > 0){
                kpiValorMetro.innerText = "R$" + Number(dados[0].media_preco_por_area).toFixed(2);
                top_valor_metro.innerText = dados[0].row_num + "º";
            } else {
                kpiValorMetro.innerText = "0";
            }
        } else {
            throw new Error("Erro ao buscar dados das escolas");
        }
    } catch (erro) {
        console.error("Erro:", erro);
        kpiValorMetro.innerText = "0";
    }
}

async function getViolenceIndex(){
    const kpiViolencia = document.getElementById("kpiseguranca")
    kpiViolencia.innerText=''

    try {
        const resposta = await fetch(`/data/getViolenceIndex/${fkDistrito}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(resposta.ok){
            const dados = await resposta.json()
            console.log("Dados recebidos: " + dados)

            if(dados){
                kpiViolencia.innerText = Number(dados[0].indice_violencia).toFixed(2) + '%'
                top_violencia.innerText = dados[0].num_linha + "º";
            } else {
                kpiViolencia.innerText = "0";
            }
        } else {
            throw new Error("Erro ao buscar dados de violência");
        }
    } catch (erro) {
        console.error("Erro:", erro);
        kpiViolencia.innerText = "0";
    }
}

