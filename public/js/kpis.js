let securityData = []
var securityDataSum = 0
var populationRegion = 0
var comercialBuildings = 0;
var residencialBuildings = 0;
var totalBuildings = 0;

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
                comercialBuildings = parseInt(json[0].total_comercial) + parseInt(json[0].total_garagens_depositos) + parseInt(json[0].total_industrial) + (parseInt(json[0].total_misto)/2)
                residencialBuildings = parseInt(json[0].total_residencial) + (parseInt(json[0].total_misto)/2)
                totalBuildings = parseInt(json[0].total_comercial) + parseInt(json[0].total_garagens_depositos) + parseInt(json[0].total_industrial) + parseInt(json[0].total_misto) + parseInt(json[0].total_residencial)

                if (residencialBuildings > (0.7 * totalBuildings)){
                    kpitipo.innerHTML = "Residencial"
                } 
                else{
                    kpitipo.innerHTML = "Comercial"
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
        console.log(erro);4
    });
}
