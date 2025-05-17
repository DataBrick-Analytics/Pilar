var database = require("../database/config");

async function getSecurityRegion(req, res) {
  const query = `
        SELECT 
        furtos_regiao,
        roubos_cargas,
        roubos,
        roubos_veiculos,
        furtos_veiculos,
        latrocinios,
        homicidio_doloso_acidente_transito,
        homicidio_culposo_acidente_transito,
        homicidio_culposo FROM seguranca WHERE blablabla`

  try {
    return resultado = await database.execute(query, values)

  } catch(error){
    console.error("Erro ao localizar a informação", error.message)
    throw error
  }
}

async function getPopulationRegion(req, res) {
    const query = `
          SELECT 
          populacao FROM info_regiao WHERE blablabla`
  
    try {
      return resultado = await database.execute(query, values)
  
    } catch(error){
      console.error("Erro ao localizar a informação", error.message)
      throw error
    }
  }


module.exports = {
   getSecurityRegion,
   getPopulationRegion
};