var database = require('../database/config');

async function getRegionByFilter(filter) {
    const query = `
        SELECT d.id_distrito,
               d.nome_distrito,
               d.zona,

               ROUND((
                     (
                         SUM(
                             COALESCE(s.furtos_regiao, 0) + COALESCE(s.roubos_cargas, 0) +
                             COALESCE(s.roubos, 0) +
                             COALESCE(s.roubos_veiculos, 0) + COALESCE(s.furtos_veiculos, 0) +
                             COALESCE(s.latrocinios, 0) +
                             COALESCE(s.homicio_doloso_acidente_transito, 0) +
                             COALESCE(s.homicidio_culposo_acidente_transito, 0) +
                             COALESCE(s.homicidio_culposo, 0)
                         )
                         ) / NULLIF(ir.populacao_total, 0)
                         ) / (SELECT (
                             SUM(COALESCE(s2.furtos_regiao, 0)) +
                             SUM(COALESCE(s2.roubos_cargas, 0)) +
                             SUM(COALESCE(s2.roubos, 0)) +
                             SUM(COALESCE(s2.roubos_veiculos, 0)) +
                             SUM(COALESCE(s2.furtos_veiculos, 0)) +
                             SUM(COALESCE(s2.latrocinios, 0)) +
                             SUM(COALESCE(s2.homicio_doloso_acidente_transito, 0)) +
                             SUM(COALESCE(s2.homicidio_culposo_acidente_transito, 0)) +
                             SUM(COALESCE(s2.homicidio_culposo, 0))
                         ) / NULLIF(SUM(ir2.populacao_total), 0)
        FROM seguranca s2
               JOIN info_regiao ir2 ON s2.fk_distrito = ir2.fk_distrito) * 100,2) AS indice_violencia_percentual,
        ROUND(ir.populacao_total / (NULLIF(SUM(p.area_terreno_m2), 0) / 10000), 2) AS densidade_malha_urbana,
        ROUND(AVG(pre.preco), 2) AS preco_m2

        FROM distrito d
             JOIN seguranca s ON d.id_distrito = s.fk_distrito
             JOIN info_regiao ir ON d.id_distrito = ir.fk_distrito
             JOIN propriedade p ON d.id_distrito = p.fk_distrito
             JOIN precificacao pre ON d.id_distrito = pre.fk_distrito

        WHERE d.zona = 'Oeste'

        GROUP BY d.id_distrito, d.nome_distrito, d.zona, ir.populacao_total
        HAVING preco_m2 >= 3000000.00
           AND indice_violencia_percentual <= 500.66
           AND densidade_malha_urbana <= 12000000

        ORDER BY preco_m2 ASC LIMIT 1000;`

    const values = {
        // valores para substituir no SELECT
    }

    try{
        const resultado = await database.execute(query, values)
        return resultado
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

module.exports = {
    getRegionByFilter
}