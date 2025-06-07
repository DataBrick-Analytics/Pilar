let securityData = []
var securityDataSum = 0
var populationRegion = 0
var comercialBuildings = 0;
var residencialBuildings = 0;
var totalBuildings = 0;

document.addEventListener('DOMContentLoaded', function () {
    getHospitalsByRegion();
    getSchoolsByRegion();
    getUrbanMeshDensity();
    getPriceSquareMeter()
    getViolenceIndex()
    catchKPI()
})

// // fetch("/data/getPopulationRegion", {
// //     method: "POST",
// //     headers: {
// //         "Content-Type": "application/json"
// //     }
// // }).then(function (resposta) {
// //     console.log("Peguei as informações da população no banco");

// //     if (resposta.ok) {
// //         console.log(resposta);

// //         resposta.json().then(json => {
// //             console.log(json);
// //             populationRegion += json[0];

// //         });

// //     } else {
// //         console.log(resposta);
// //         resposta.text().then(texto => {
// //             console.error(texto);
// //             finalizarAguardar(texto);
// //         });
// //     }

// // }).catch(function (erro) {
// //     console.log(erro);
// // });

// fetch("/data/getRegionType", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     }
// }).then(function (resposta) {
//     console.log("Peguei as informações da região no banco");

//     if (resposta.ok) {
//         console.log(resposta);

//         resposta.json().then(json => {
//             console.log(json);
//             for (let i = 0; i < json.length; i++) {
//                 securityData.push(json[i]);
//             }

//             for (let i = 0; i < securityData.length; i++) {
//                 securityDataSum += securityData[i];
//             }

//             kpiseguranca.innerHTML = securityDataSum / populationRegion
//         });

//     } else {
//         console.log(resposta);
//         resposta.text().then(texto => {
//             console.error(texto);
//             finalizarAguardar(texto);
//         });
//     }

// }).catch(function (erro) {
//     console.log(erro);
// });

function catchKPI() {
    fetch("/data/getRegionType", {
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
                    kpitipo.innerhtml = "Residencial"
                    kpitipovalor.innerhtml = `${residencialBuildings}%`

                } else {
                    kpitipo.innerhtml = "Comercial"
                    kpitipovalor.innerhtml = `${comercialBuildings}%`

                }
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


async function getUrbanMeshDensity() {
    const fkBairro = 10;
    // console.log("ID recebido:", fkBairro);
    // if (!fkBairro == undefined || !fkBairro == null) {

    fetch(`/data/getUrbanMeshDensity/${fkBairro}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    resposta = json;
                    console.log("Voltei pra função original" + resposta.valorDensidade);
                    kpimalhaurbana.innerText = `${resposta.valorDensidade}/ha`
                });
            } else {
                console.log("Houve um erro durante a requisição")
            }
        }
    ).catch(function (erro) {
        console.error(erro)
    })
}

async function getHospitalsByRegion() {
    const kpiHospitais = document.getElementById("kpiHospitais")
    const fkBairro = 10
    try {
        const resposta = await fetch(`/data/getHospitalsByRegion/${fkBairro}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (resposta.ok) {
            const dados = await resposta.json();
            console.log("Dados recebidos:", dados);
            if (dados && dados.total_pontos_saude !== undefined) {
                kpiHospitais.innerText = dados.total_pontos_saude;
            } else {
                kpiHospitais.innerText = "0";
            }
        } else {
            throw new Error("Erro ao buscar dados dos hospitais");
        }
    } catch (erro) {
        console.error("Erro:", erro);
        kpiHospitais.innerText = "Erro ao carregar dados";
    }
}



async function getSchoolsByRegion() {
    const kpiEscolas = document.getElementById("kpiEscolas")
    const fkBairro = 10
    try {
        const resposta = await fetch(`/data/getSchoolsRegion/${fkBairro}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (resposta.ok) {
            const dados = await resposta.json()
            console.log("Dados recebidos: " + dados)

            if (dados && dados.total_escolas !== undefined) {
                kpiEscolas.innerText = dados.total_escolas;
            } else {
                kpiEscolas.innerText = "0";
            }
        } else {
            throw new Error("Erro ao buscar dados das escolas");
        }
    }catch (erro) {
        console.error("Erro:", erro);
        kpiEscolas.innerText = "Erro ao carregar dados";
    }
}



async function getPriceSquareMeter(){
    const kpiValorMetro = document.getElementById("kpivalor")
    const fkBairro = 10
    kpiValorMetro.innerText=''

    try {
        const resposta = await fetch(`/data/getPriceSquareMeter/${fkBairro}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(resposta.ok){
            const dados = await resposta.json()
            console.log("Dados recebidos: " + dados)
            if(dados[0] && dados[0].preco !== undefined){
                kpiValorMetro.innerText = "R$" + Number(dados[0].preco);
            } else {
                kpiValorMetro.innerText = "0";
            }
        } else {
            throw new Error("Erro ao buscar dados das escolas");
        }
    } catch (erro) {
        console.error("Erro:", erro);
        kpiValorMetro.innerText = "Erro ao carregar dados";
    }
}

async function getViolenceIndex(){
    const kpiViolencia = document.getElementById("kpiseguranca")
    const fkBairro = 10
    kpiViolencia.innerText=''

    try {
        const resposta = await fetch(`/data/getViolenceIndex/${fkBairro}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(resposta.ok){
            const dados = await resposta.json()
            console.log("Dados recebidos: " + dados)

            if(dados[0] && dados[0].indice_violencia_percentual !== undefined){
                kpiViolencia.innerText = dados[0].indice_violencia_percentual + '%'
            } else {
                kpiViolencia.innerText = "0";
            }
        } else {
            throw new Error("Erro ao buscar dados de violência");
        }
    } catch (erro) {
        console.error("Erro:", erro);
        kpiViolencia.innerText = "Erro ao carregar dados";
    }
}

