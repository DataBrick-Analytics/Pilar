var modeloModel = require("../models/modeloModel");

function modeloFuncaoController(req, res) {

    modeloModel.testeComandoSql()
        .then(
            function (resultado) {
                res.status(200).json(resultado); // Json do resultado obtido
            }
        )
        .catch(
            function (erro) {
                console.log("Mensagem de erro padrão: " + erro);
                console.log("Mensagem de erro SQL: " + erro.sqlMessage);
                res.status(500).json(erro.sqlMessage); // Json do erro recebido
            }
        )
}

module.exports = {
    modeloFuncaoController
}