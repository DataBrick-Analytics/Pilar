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
                     ) / d.populacao ASC
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

async function getRegiaoRecomendada() {
    const query = `
    WITH ultimas_10_por_distrito AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY fk_distrito ORDER BY data_precificacao DESC) AS rn
    FROM precificacao
),
filtradas AS (
    SELECT *
    FROM ultimas_10_por_distrito
    WHERE rn <= 10
),
limites AS (
    SELECT 
        fk_distrito,
        MAX(CASE WHEN rn = 1 THEN preco END) AS preco_mais_recente,
        MAX(CASE WHEN rn = 2 THEN preco END) AS preco_mais_antigo
    FROM filtradas
    GROUP BY fk_distrito
),
renda_media_aproximada as (
SELECT 
fk_distrito,
    (
        COALESCE(renda_domiciliar_quinto_mais_pobre, 0) +
        COALESCE(renda_domiciliar_segundo_quinto_mais_pobre, 0) +
        COALESCE(renda_domiciliar_terceiro_quinto_mais_pobre, 0) +
        COALESCE(renda_domiciliar_quarto_quinto_mais_pobre, 0) +
        COALESCE(renda_domiciliar_quinto_mais_rico, 0)
    ) / 5 AS renda_media_aproximada
FROM info_regiao
),
cte_final as(
SELECT 
    d.id_distrito,
    d.nome_distrito,
    d.zona,
    ROUND(((
		SUM(
			COALESCE(s.furtos_regiao, 0) + COALESCE(s.roubos_cargas, 0) + COALESCE(s.roubos, 0) +
			COALESCE(s.roubos_veiculos, 0) + COALESCE(s.furtos_veiculos, 0) + COALESCE(s.latrocinios, 0) +
			COALESCE(s.homicidio_doloso_acidente_transito, 0) + COALESCE(s.homicidio_culposo_acidente_transito, 0) +
			COALESCE(s.homicidio_culposo, 0)
            )
        ) / NULLIF(ir.populacao_total, 0)
    ) / (
        SELECT 
            (
                SUM(COALESCE(s2.furtos_regiao, 0)) +
                SUM(COALESCE(s2.roubos_cargas, 0)) +
                SUM(COALESCE(s2.roubos, 0)) +
                SUM(COALESCE(s2.roubos_veiculos, 0)) +
                SUM(COALESCE(s2.furtos_veiculos, 0)) +
                SUM(COALESCE(s2.latrocinios, 0)) +
                SUM(COALESCE(s2.homicidio_doloso_acidente_transito, 0)) +
                SUM(COALESCE(s2.homicidio_culposo_acidente_transito, 0)) +
                SUM(COALESCE(s2.homicidio_culposo, 0))
            ) / NULLIF(SUM(ir2.populacao_total), 0)
        FROM seguranca s2
        JOIN info_regiao ir2 ON s2.fk_distrito = ir2.fk_distrito
    ) * 100, 2) AS indice_violencia_percentual,

    ROUND(ir.populacao_total / (NULLIF(SUM(p.area_terreno_m2), 0) / 10000), 2) AS densidade_malha_urbana,
    ROUND(AVG(pre.preco), 2) AS preco_m2,
	COUNT(DISTINCT pa.id_parques) as qtd_parques,
    COUNT(DISTINCT e.id_educacao) as qtd_escolas,
    COUNT(DISTINCT sa.id_saude) as qtd_saude,
    rma.renda_media_aproximada,
	ROUND(((l.preco_mais_recente - l.preco_mais_antigo) / l.preco_mais_antigo) * 100, 2) AS ultima_alteracao_percentual
FROM distrito d
JOIN seguranca s ON d.id_distrito = s.fk_distrito
JOIN info_regiao ir ON d.id_distrito = ir.fk_distrito
JOIN propriedade p ON d.id_distrito = p.fk_distrito
JOIN precificacao pre ON d.id_distrito = pre.fk_distrito
JOIN parque pa ON d.id_distrito = pa.fk_distrito
JOIN educacao e ON d.id_distrito = e.fk_distrito
JOIN saude sa ON d.id_distrito = sa.fk_distrito
JOIN renda_media_aproximada rma ON d.id_distrito = rma.fk_distrito  
JOIN limites l on d.id_distrito = l.fk_distrito
GROUP BY d.id_distrito, d.nome_distrito, d.zona, ir.populacao_total, rma.renda_media_aproximada
ORDER BY 4 ASC, 7 DESC
LIMIT 4
)
SELECT nome_distrito, zona FROM cte_final;

    `;

  try {
    const rows = await database.execute(query);
    console.log("Tipo de rows:", Array.isArray(rows), rows);
    return rows;
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
    getParksByRegion,

    //REGIÕES RECOMENDADAS
    getRegiaoRecomendada
};