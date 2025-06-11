var database = require('../database/config');


async function getRegionByFilter({ precoMin, violenciaMax, densidadeMax, zona }) {

    // Validação básica dos parâmetros
    if (
        precoMin !== undefined && typeof precoMin !== 'number' ||
        violenciaMax !== undefined && typeof violenciaMax !== 'number' ||
        densidadeMax !== undefined && typeof densidadeMax !== 'number' ||
        zona !== undefined && typeof zona !== 'string'
    ) {
        throw new Error('Parâmetros inválidos');
    }

    let havingConditions = [];
    let whereConditions = [];
    let params = [];

    // WHERE: Zona
    if (zona) {
        whereConditions.push("d.zona = ?");
        params.push(zona);
    }

    // HAVING: Condições agregadas
    if (precoMin !== undefined) {
        havingConditions.push("preco_m2 <= ?");
        params.push(precoMin);
    }

    if (violenciaMax !== undefined) {
        havingConditions.push("indice_violencia_percentual <= ?");
        params.push(violenciaMax);
    }

    if (densidadeMax !== undefined) {
        havingConditions.push("densidade_mobilidade <= ?");
        params.push(densidadeMax);
    }

    const whereClause = whereConditions.length ? `WHERE ${whereConditions.join(" AND ")}` : "";
    const havingClause = havingConditions.length ? `HAVING ${havingConditions.join(" AND ")}` : "";

const query = `
WITH violencia_por_distrito AS (
    SELECT 
        s.fk_distrito,
        SUM(
            COALESCE(s.furtos_regiao, 0) +
            COALESCE(s.roubos_cargas, 0) +
            COALESCE(s.roubos, 0) +
            COALESCE(s.roubos_veiculos, 0) +
            COALESCE(s.furtos_veiculos, 0) +
            COALESCE(s.latrocinios, 0) +
            COALESCE(s.homicidio_doloso_acidente_transito, 0) +
            COALESCE(s.homicidio_culposo_acidente_transito, 0) +
            COALESCE(s.homicidio_culposo, 0)
        ) AS total_crimes
    FROM seguranca s
    GROUP BY s.fk_distrito
    ),
    total_violencia_geral AS (
        SELECT 
            SUM(v.total_crimes / NULLIF(d.populacao, 0) * 1000) AS total
        FROM violencia_por_distrito v
        JOIN distrito d ON d.id_distrito = v.fk_distrito
    )
    SELECT 
        d.id_distrito,
        d.nome_distrito,
        d.zona,
        ROUND((v.total_crimes / NULLIF(d.populacao, 0) * 1000) / tv.total * 100, 2) AS indice_violencia_percentual,
        ROUND(AVG(pre.preco / NULLIF(pre.area, 0)), 2) AS preco_m2,
        ROUND(
            (COALESCE(m.qtd_pontos_onibus, 0) + COALESCE(m.qtd_estacoes_trem_metro, 0)) 
            / NULLIF(d.area, 0), 6
        ) AS densidade_mobilidade

    FROM distrito d
    JOIN violencia_por_distrito v ON v.fk_distrito = d.id_distrito
    JOIN precificacao pre ON pre.fk_distrito = d.id_distrito
    JOIN mobilidade m ON m.fk_distrito = d.id_distrito
    JOIN total_violencia_geral tv ON TRUE

    ${whereClause}

    GROUP BY
        d.id_distrito,
        d.nome_distrito,
        d.zona,
        d.populacao,
        d.area,
        m.qtd_pontos_onibus,
        m.qtd_estacoes_trem_metro,
        v.total_crimes

    ${havingClause}

    ORDER BY preco_m2 ASC
    LIMIT 6;
    `;
    const rows = await database.execute(query, params);
    return rows;
}

async function getRandomRegion(){
    const query = `
        SELECT id_distrito, nome_distrito, zona, area
            FROM distrito
        ORDER BY RAND() LIMIT 6;`

    const result = await database.execute(query);
    return result;
}

module.exports = {
    getRegionByFilter,
    getRandomRegion
};
