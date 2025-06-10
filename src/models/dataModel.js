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

async function getUrbanMeshDensity(fkDistrito) {
    try {
        const query = `
            WITH calculos AS (
                SELECT
                    m.fk_distrito,
                    SUM(COALESCE(m.qtd_pontos_onibus, 0) + COALESCE(m.qtd_estacoes_trem_metro, 0)) / d.area AS valor_mobilidade_por_area
                FROM mobilidade m
                JOIN distrito d ON m.fk_distrito = d.id_distrito
                WHERE d.area IS NOT NULL AND d.area != 0
                GROUP BY m.fk_distrito, d.area
            ),
            ordenado AS (
                SELECT
                    c.fk_distrito,
                    c.valor_mobilidade_por_area,
                    d.nome_distrito,
                    ROW_NUMBER() OVER (ORDER BY c.valor_mobilidade_por_area DESC) AS row_num
                FROM calculos c
                JOIN distrito d ON c.fk_distrito = d.id_distrito
            )
            SELECT
                fk_distrito,
                nome_distrito,
                valor_mobilidade_por_area,
                row_num
            FROM ordenado
            WHERE fk_distrito = ?;
        `;

        return await database.execute(query, [fkDistrito]);
    } catch (error) {
        console.error("Houve um erro ao localizar os dados", error.message);
        throw error;
    }
}

async function getPriceSquareMeter(fkBairro) {
    const query = `
        WITH medias AS (
            SELECT
                fk_distrito,
                AVG(preco / area) AS media_preco_por_area
            FROM precificacao
            WHERE area IS NOT NULL AND area != 0
            GROUP BY fk_distrito
        ),
        ordenado AS (
            SELECT
                fk_distrito,
                media_preco_por_area,
                ROW_NUMBER() OVER (ORDER BY media_preco_por_area ASC) AS row_num
            FROM medias
        )
            SELECT
                fk_distrito,
                media_preco_por_area,
                row_num
            FROM ordenado
            WHERE fk_distrito = ?;
    `;

    const values = [fkBairro];

    try {
        return resultado = await database.execute(query, values);
    } catch (error) {
        console.error("Houve um erro ao localizar os dados", error.message);
        throw error;
    }
}

async function getViolenceIndex(fkDistrito) {
    const query = `
        SELECT resultado.num_linha, resultado.indice_violencia
        FROM (
                 SELECT
                     d.id_distrito,
                     SUM(
                             COALESCE(s.furtos_regiao, 0)
                                 + COALESCE(s.roubos_cargas, 0)
                                 + COALESCE(s.roubos, 0)
                                 + COALESCE(s.roubos_veiculos, 0)
                                 + COALESCE(s.furtos_veiculos, 0)
                                 + COALESCE(s.latrocinios, 0)
                                 + COALESCE(s.homicidio_doloso_acidente_transito, 0)
                                 + COALESCE(s.homicidio_culposo_acidente_transito, 0)
                                 + COALESCE(s.homicidio_culposo, 0)
                     ) / d.populacao AS indice_violencia,
                     ROW_NUMBER() OVER (
                     ORDER BY
                     SUM(
                     COALESCE(s.furtos_regiao, 0)
                     + COALESCE(s.roubos_cargas, 0)
                     + COALESCE(s.roubos, 0)
                     + COALESCE(s.roubos_veiculos, 0)
                     + COALESCE(s.furtos_veiculos, 0)
                     + COALESCE(s.latrocinios, 0)
                     + COALESCE(s.homicidio_doloso_acidente_transito, 0)
                     + COALESCE(s.homicidio_culposo_acidente_transito, 0)
                     + COALESCE(s.homicidio_culposo, 0)
                     ) / d.populacao DESC
             ) AS num_linha
            FROM distrito d
        JOIN seguranca s ON s.fk_distrito = d.id_distrito
            WHERE d.populacao IS NOT NULL AND d.populacao > 0
            GROUP BY d.id_distrito, d.populacao
                ) AS resultado
            WHERE resultado.id_distrito = ?;
    `;
    const values = [fkDistrito];

    try {
        return await database.execute(query, values);
    } catch (error) {
        console.error("Houve um erro ao localizar os dados", error.message);
        throw error;
    }
}

// GRAFICOS
async function getMediaByFifth(idBairro) {
    const query = `
        SELECT
            AVG(renda_domiciliar_quinto_mais_pobre) / 12 AS media_quinto_mais_pobre,
            AVG(renda_domiciliar_segundo_quinto_mais_pobre) / 12 AS media_segundo_quinto_mais_pobre,
            AVG(renda_domiciliar_terceiro_quinto_mais_pobre) / 12 AS media_terceiro_quinto_mais_pobre,
            AVG(renda_domiciliar_quarto_quinto_mais_pobre) / 12 AS media_quarto_quinto_mais_pobre,
            AVG(renda_domiciliar_quinto_mais_rico) / 12 AS media_quinto_mais_rico
        FROM info_regiao
        WHERE fk_distrito = ?;
    `;
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
        SELECT
            YEAR(STR_TO_DATE(data_precificacao, '%Y-%m-%d %H:%i:%s')) AS ano,
            AVG(preco / area) AS media_preco_metro_quadrado
        FROM precificacao
        WHERE fk_distrito = ?
          AND preco IS NOT NULL
          AND area IS NOT NULL
          AND area > 0
          AND data_precificacao IS NOT NULL
        GROUP BY ano
        ORDER BY ano DESC
        LIMIT 5;
        `;
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
        SELECT
            fk_distrito,
            COUNT(*) as total_escolas
        FROM educacao
        WHERE fk_distrito = ?
        GROUP BY fk_distrito;
    `;
    const values = [fkBairro];

    try {
        return await database.execute(query, values)
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
        GROUP BY fk_distrito;
    `;
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
        GROUP BY fk_distrito;
    `;
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