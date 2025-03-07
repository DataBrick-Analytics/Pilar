var database = require("../database/config");

function testeComandoSql(valorTeste) {

    var instrucaoSql = `SELECT * FROM tabelaTeste WHERE campoTeste like '${valorTeste}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    testeComandoSql
}
