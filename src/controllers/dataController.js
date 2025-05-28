var dataModel = require("../models/dataModel");

// function getSecurityRegionController(req, res){
//     dataModel.getSecurityRegion()
//     .then(
//         function(resultado) {
//             res.json(resultado);
//         }
//     ).catch(
//         function (erro) {
//             console.log(erro);
//             console.log(
//                 "\nHouve um erro na coleta de novos Dados:",
//                 erro.sqlMessage
//             );
//             res.status(500).json(erro.sqlMessage);
//         }
//     );
// }


// function getPopulationRegionController(req, res){
//     dataModel.getPopulationRegion()
//     .then(
//         function(resultado) {
//             res.json(resultado);
//         }
//     ).catch(
//         function (erro) {
//             console.log(erro);
//             console.log(
//                 "\nHouve um erro na coleta de novos Dados:",
//                 erro.sqlMessage
//             );
//             res.status(500).json(erro.sqlMessage);
//         }
//     );
// }


function getRegionType(req, res){
    var idBairro = req.param.id;
    console.log("ID recebido:", id);
    // Verifica se o ID está definido e não é nulo
    if (id == undefined || id == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    dataModel.getRegionType(idBairro)
    .then(
        function(resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro na coleta de novos Dados:",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}


function getMediaByFifth(req, res){
    var idBairro = req.param.id;
    console.log("ID recebido:", id);

    // Verifica se o ID está definido e não é nulo
    if (id == undefined || id == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }
    dataModel.getMediaByFifth(idBairro)
    .then(
        function(resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro na coleta de novos Dados:",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
    
}

function getRegionType(req, res) {
    dataModel.getRegionType()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro na coleta de novos Dados:",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function getDensidadeUrbana(req, res) {
    const fkBairro = localStorage.getItem("FK_BAIRRO")

    if (fkBairro == undefined) {
        return res.status(400).send("fkBairro está undefined")
    }

    dataModel.getDensidadeUrbana(fkBairro)
        .then(
            function (resultado) {
                res.status(200).json(resultado)
                console.log("Valor Densidade: " + resultado)
            }
        ).catch(
            function (erro) {
                console.log("Houve um erro ao pegar a Densidade")
                res.status(500).json(erro.sqlMessage)
            }
        )
}



module.exports = {
    // getSecurityRegionController,
    // getPopulationRegionController
    getRegionType,
    getMediaByFifth
}