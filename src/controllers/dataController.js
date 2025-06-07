var dataModel = require("../models/dataModel");

//KPIS
function getRegionType(req, res) {
    const fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);

    // Verifica se o ID está definido e não é nulo
    if (fkBairro == undefined || fkBairro == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    dataModel.getRegionType(fkBairro)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro na coleta de novos Dados:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function getPriceSquareMeter(req, res) {
    const fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    if (fkBairro == undefined || fkBairro == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    dataModel.getPriceSquareMeter(fkBairro)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro na coleta de novos Dados:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });

    console.log("ID recebido:", fkBairro);
}

function getUrbanMeshDensity(req, res) {
    const fkBairro = req.params.id; // dado mocado para testes

    if (fkBairro == undefined) {
        return res.status(400).send("fkBairro está undefined");
    }

    dataModel.getUrbanMeshDensity(fkBairro)
        .then(function (densidade) {
            console.log("Valor Densidade: " + densidade.valorDensidade);
            return res.status(201).json(densidade);
        })
        .catch(function (erro) {
            console.log("Houve um erro ao pegar a densidade urbana");
            res.status(500).json(erro.sqlMessage);
        });
}

function getViolenceIndex(req, res) {
    const fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);

    // Verifica se o ID está definido e não é nulo
    if (fkBairro == undefined || fkBairro == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    dataModel.getViolenceIndex(fkBairro)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro na coleta de novos Dados:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

//GRAFICOS
function getMediaByFifth(req, res) {
    const fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);

    if (fkBairro == undefined || fkBairro == null) {
        return res.status(400).json({
            error: "O idBairro está undefined ou nulo!"
        });
    }

    dataModel.getMediaByFifth(fkBairro)
        .then(function (resultado) {
            return res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro na coleta de novos Dados:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function getPriceFluctuation(req, res) {
    const fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);

    if (fkBairro === undefined || fkBairro == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    dataModel.getPriceFluctuation(fkBairro)
        .then(function (resultado) {
            return res.status(200).json({
                preco: resultado.preco
            });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro na coleta de novos Dados:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

//AUXILIARES
async function getSchoolsRegion(req, res) {
    const fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);

    if(fkBairro === undefined){
        return res.status(400).send("fkbairro está undefined")
    }

    await dataModel.getSchoolsRegion(fkBairro)
        .then(function (resultado) {
            console.log("Qtd de escolas encontradas: " + resultado.length);
            return res.status(200).json({
                total_escolas: resultado.length
            });
        })
        .catch(function (erro) {
            console.log("Houve um erro ao pegar as escolas");
            res.status(500).json(erro.sqlMessage);
        });
}

async function getHospitalsByRegion(req, res) {
    const fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);

    if (fkBairro === undefined) {
        return res.status(400).send("fkBairro está undefined");
    }

    await dataModel.getHospitalsByRegion(fkBairro)
        .then(function (resultado) {
            console.log("Qtd de hospitais encontradas: " + resultado.length);
            return res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("Houve um erro ao pegar os hospitais");
            res.sendStatus(500).json(erro.sqlMessage);
        });
}

function getParksByRegion(req, res) {
    const fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);

    if (fkBairro == undefined) {
        return res.sendStatus(400).send("fkBairro está undefined");
    }

    dataModel.getParksByRegion(fkBairro)
        .then(function (resultado) {
            console.log("Qtd de parques encontradas: " + resultado.length);
            return res.sendStatus(200).send(resultado.length);
        })
        .catch(function (erro) {
            console.log("Houve um erro ao pegar os parques");
            res.sendStatus(500).json(erro.sqlMessage);
        });
}

module.exports = {
    //KPIS
    getRegionType,
    getPriceSquareMeter,
    getUrbanMeshDensity,
    getViolenceIndex,

    //GRAFICOS
    getMediaByFifth,
    getPriceFluctuation,

    //AUXILIARES
    getSchoolsRegion,
    getHospitalsByRegion,
    getParksByRegion
};