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
    dataModel.getRegionType()
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

module.exports = {
    // getSecurityRegionController,
    // getPopulationRegionController
    getRegionType
}