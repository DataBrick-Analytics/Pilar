let securityData = []
var securityDataSum = 0
var populationRegion = 0

fetch("/data/getPopulationRegion", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (resposta) {
    console.log("Peguei as informações da população no banco");

    if (resposta.ok) {
        console.log(resposta);

        resposta.json().then(json => {
            console.log(json);
            populationRegion += json[0];

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

fetch("/data/getSecurityRegion", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (resposta) {
    console.log("Peguei as informações de segurança no banco");

    if (resposta.ok) {
        console.log(resposta);

        resposta.json().then(json => {
            console.log(json);
            for (let i = 0; i < json.length; i++) {
                securityData.push(json[i]);
            }

            for (let i = 0; i < securityData.length; i++) {
                securityDataSum += securityData[i];
            }

            kpiseguranca.innerHTML = securityDataSum / populationRegion
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