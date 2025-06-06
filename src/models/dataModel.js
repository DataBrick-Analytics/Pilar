var database = require("../database/config");

// KPIS
async function getRegionType(idBairro) {
    const query = `
        SELECT
            SUM(CASE WHEN uso_iptu IN (10, 12, 13, 14, 20, 21, 22, 24, 25) THEN 1 ELSE 0 END) AS total_residencial,
            SUM(CASE WHEN uso_iptu IN (23, 30, 31, 32, 40, 41, 42, 85) THEN 1 ELSE 0 END) AS total_comercial,
            SUM(CASE WHEN uso_iptu IN (50, 51, 60, 61) THEN 1 ELSE 0 END) AS total_industrial,
            SUM(CASE WHEN uso_iptu IN (23, 24, 26, 62, 63) THEN 1 ELSE 0 END) AS total_garagens_depositos,
            SUM(CASE WHEN uso_iptu IN (22, 32, 42) THEN 1 ELSE 0 END) AS total_misto
        FROM propriedade 
        WHERE ?;`;

    const values = [idBairro];

    try {
        return resultado = await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao localizar a informação", error.message);
        throw error;
    }
}

async function getUrbanMeshDensity(fkBairro) {
    // calculo para Densidade = populacaoUrbada / area (em hectares)
    try {
        const areaRow = await database.execute(
            `SELECT SUM(area_terreno_m2) AS total_area 
             FROM propriedade 
             WHERE fk_distrito = ?`, 
            [fkBairro]
        );
        const populacaoRow = await database.execute(
            `SELECT populacao_total 
             FROM info_regiao 
             WHERE fk_distrito = ?`, 
            [fkBairro]
        );

        const areaM2 = parseFloat((areaRow[0]?.total_area || 0));
        const populacaototal = populacaoRow[0].populacao_total || 0;

        if (areaM2 == 0 || isNaN(areaM2)) return 0;
        const densidade = populacaototal / (areaM2 / 10_000); // area em hectares

        const objDensidade = { valorDensidade: parseInt(densidade) };

        return objDensidade;
    } catch (error) {
        console.error("Houve um erro ao localizar os dados", error.message);
        throw error;
    }
}

async function getPriceSquareMeter(fkBairro) {
    const query = `
        SELECT preco 
        FROM precificacao 
        WHERE fk_distrito = ? 
        ORDER BY data_precificacao DESC 
        LIMIT 1;`;
    const values = [fkBairro];

    try {
        return resultado = await database.execute(query, values);
    } catch (error) {
        console.error("Houve um erro ao localizar os dados", error.message);
        throw error;
    }
}

async function getViolenceIndex(fkBairro) {
    const query = `
        SELECT 
            d.nome_distrito,
            ROUND((
                (
                    (
                        COALESCE(s.furtos_regiao, 0) +
                        COALESCE(s.roubos_cargas, 0) +
                        COALESCE(s.roubos, 0) +
                        COALESCE(s.roubos_veiculos, 0) +
                        COALESCE(s.furtos_veiculos, 0) +
                        COALESCE(s.latrocinios, 0) +
                        COALESCE(s.homicio_doloso_acidente_transito, 0) +
                        COALESCE(s.homicidio_culposo_acidente_transito, 0) +
                        COALESCE(s.homicidio_culposo, 0)
                    ) / NULLIF(ir.populacao_total, 0)
                ) /
                (
                    SELECT 
                        SUM((
                            COALESCE(s2.furtos_regiao, 0) +
                            COALESCE(s2.roubos_cargas, 0) +
                            COALESCE(s2.roubos, 0) +
                            COALESCE(s2.roubos_veiculos, 0) +
                            COALESCE(s2.furtos_veiculos, 0) +
                            COALESCE(s2.latrocinios, 0) +
                            COALESCE(s2.homicio_doloso_acidente_transito, 0) +
                            COALESCE(s2.homicidio_culposo_acidente_transito, 0) +
                            COALESCE(s2.homicidio_culposo, 0)
                        ) / NULLIF(ir2.populacao_total, 0))
                    FROM seguranca s2
                    JOIN info_regiao ir2 ON s2.fk_distrito = ir2.fk_distrito
                )
            ) * 100, 2) AS indice_violencia_percentual
        FROM seguranca s
        JOIN distrito d ON s.fk_distrito = d.id_distrito
        JOIN info_regiao ir ON s.fk_distrito = ir.fk_distrito
        WHERE s.fk_distrito = ?;`;
    const values = [fkBairro];

    try {
        return resultado = await database.execute(query, values);
    } catch (error) {
        console.error("Houve um erro ao localizar os dados", error.message);
        throw error;
    }
}

// GRAFICOS
async function getMediaByFifth(idBairro) {
    const query = `
        SELECT 
            renda_domiciliar_quinto_mais_pobre,
            renda_domiciliar_segundo_quinto_mais_pobre,
            renda_domiciliar_terceiro_quinto_mais_pobre,
            renda_domiciliar_quarto_quinto_mais_pobre,
            renda_domiciliar_quinto_mais_rico
        FROM info_regiao 
        WHERE fk_distrito = ?;`;
    const values = [idBairro];

    try {
        return resultado = await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao localizar a informação", error.message);
        throw error;
    }
}

async function getPriceFluctuation(fkBairro) {
    const query = `
        SELECT preco, data_precificacao 
        FROM precificacao 
        WHERE fk_distrito = ?;`;
    const values = [fkBairro];

    try {
        return resultado = await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao localizar a informação", error.message);
        throw error;
    }
}

// AUXILIARES
async function getSchoolsRegion(fkBairro) {
    const query = `
        SELECT * 
        FROM educacao 
        WHERE fk_distrito = ?`;
    const values = [fkBairro];

    try {
        return resultado = await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao localizar a informação", error.message);
        throw error;
    }
}

async function getHospitalsByRegion(fkBairro) {
    const query = `
        SELECT 
            fk_distrito, 
            COUNT(*) AS total_pontos_saude
        FROM saude
        WHERE fk_distrito = ?
        GROUP BY fk_distrito;`;
    const values = [fkBairro];

    try {
        return resultado = await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao localizar a informação", error.message);
        throw error;
    }
}

async function getParksByRegion(fkBairro) {
    const query = `
        SELECT 
            fk_distrito,
            COUNT(*) AS qtde_parques
        FROM parque
        WHERE fk_distrito = ?
        GROUP BY fk_distrito;`;
    const values = [fkBairro];

    try {
        return resultado = await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao localizar a informação", error.message);
        throw error;
    }
}

module.exports = {
    // KPI
    getRegionType,
    getPriceSquareMeter,
    getUrbanMeshDensity,
    getViolenceIndex,

    // GRAFICOS
    getMediaByFifth,
    getPriceFluctuation,

    // AUXILIARES
    getSchoolsRegion,
    getHospitalsByRegion,
    getParksByRegion
};