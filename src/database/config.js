var mysql = require("mysql2");

var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

const pool = mysql.createPool(mySqlConfig);
const promisePool = pool.promise();

async function execute(instrucao, values = []) {
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    try {
        const [results] = await promisePool.execute(instrucao, values);
        console.log("Resultados:", results);
        return results;
    } catch (error) {
        console.error("Erro na execução da query:", error);
        throw error;
    }
}

module.exports = {
    execute
};