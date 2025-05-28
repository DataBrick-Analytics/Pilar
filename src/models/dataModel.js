var database = require("../database/config");

// async function getSecurityRegion(req, res) {
//   const query = `
//         SELECT 
//         furtos_regiao,
//         roubos_cargas,
//         roubos,
//         roubos_veiculos,
//         furtos_veiculos,
//         latrocinios,
//         homicidio_doloso_acidente_transito,
//         homicidio_culposo_acidente_transito,
//         homicidio_culposo FROM seguranca WHERE blablabla`

//   try {
//     return resultado = await database.execute(query, values)

//   } catch(error){
//     console.error("Erro ao localizar a informação", error.message)
//     throw error
//   }
// }

// async function getPopulationRegion(req, res) {
//     const query = `
//           SELECT 
//           populacao FROM info_regiao WHERE blablabla`
  
//     try {
//       return resultado = await database.execute(query, values)
  
//     } catch(error){
//       console.error("Erro ao localizar a informação", error.message)
//       throw error
//     }
//   }

async function getRegionType(req, res) {
    const query = `
          SELECT
            SUM(CASE WHEN uso_iptu IN (10, 12, 13, 14, 20, 21, 22, 24, 25) THEN 1 ELSE 0 END) AS total_residencial,
            SUM(CASE WHEN uso_iptu IN (23, 30, 31, 32, 40, 41, 42, 85) THEN 1 ELSE 0 END) AS total_comercial,
            SUM(CASE WHEN uso_iptu IN (50, 51, 60, 61) THEN 1 ELSE 0 END) AS total_industrial,
            SUM(CASE WHEN uso_iptu IN (23, 24, 26, 62, 63) THEN 1 ELSE 0 END) AS total_garagens_depositos,
            SUM(CASE WHEN uso_iptu IN (22, 32, 42) THEN 1 ELSE 0 END) AS total_misto
          FROM propriedades; `
  
    try {
      return resultado = await database.execute(query)
    } catch(error){
      console.error("Erro ao localizar a informação", error.message)
      throw error
    }
  }


  async function getDensidadeMalhaUrbana(fkBairro) {
    const areaHectares = `SELECT area_terreno_m2 FROM propriedades WHERE fk_bairro = ${fkBairro}` / 10_000
    const populacaoUrbana = `SELECT populacao_total FROM info_regiao where fk_bairro = ${fkBairro}`

    // calculo para Densidade = populacaoUrbada / area (em hectares)
    try{
      await database.execute(areaHectares, populacaoUrbana)
      const densidade = populacaoUrbana / areaHectares
      return densidade;

    } catch(error){
      console.error("Houve um erro ao localizar os dados", error.message)
      throw error
    }
  }




module.exports = {
  //  getSecurityRegion,
  //  getPopulationRegion,
   getRegionType,
   getDensidadeMalhaUrbana
};

