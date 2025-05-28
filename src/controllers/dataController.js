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
    getDensidadeUrbana
}