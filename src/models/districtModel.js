var database = require("../database/config");

async function searchAllDistricts() {
    try {
        const query = `
            SELECT id_distrito, nome_distrito, area
                FROM distrito
            ORDER BY nome_distrito ASC;
        `;

        const rows = await database.execute(query);
        return rows;
    } catch (error) {
        console.error("Erro ao buscar distritos:", error);
        throw error;
    }
}


module.exports = {
searchAllDistricts
};