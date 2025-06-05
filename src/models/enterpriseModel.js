var database = require("../database/config");
const { get } = require("../routes/enterpriseRoutes");


async function createEnterprise(enterprise) {
  const query = `
  INSERT INTO empresas (nome, endereco, telefone, email, data_cadastro, senha)
  VALUES (?, ?, ?, ?, ?, sha2(?, 256))
  `;

  const values = [
    enterprise.nome,
    enterprise.endereco,
    enterprise.telefone,
    enterprise.email,
    new Date(),
    enterprise.senha
  ];

  try {
    const resultado = await database.execute(query, values);
    console.log('Empresa inserida com sucesso:', resultado);
    return resultado;

  } catch (error) {
    console.error('Erro ao inserir empresa:', error.message);
    throw error;
  }
}

async function autenticateEnterprise(enterprise) {
  const query = `
      SELECT id_empresa, nome, endereco, telefone, email 
        FROM empresas 
      WHERE email = ? 
  AND senha = SHA2(?, 256);  `
  const values = [enterprise.email, enterprise.senha]

  try {
    return resultado = await database.execute(query, values)

  } catch (error) {
    console.error("Erro ao localizar a empresa", error.message)
    throw error
  }
}

async function editEnterprise(enterprise, idEnterprise) {

  const query = `
  UPDATE empresas
  SET nome = ?,
      endereco = ?,
      telefone = ?,
      email = ?,
      senha = ?
  WHERE id_empresa = ?
  `;

  const values = [
    enterprise.nome,
    enterprise.endereco,
    enterprise.telefone,
    enterprise.email,
    enterprise.senha,
    idEnterprise
  ];


  try {
    const [resultado] = await database.execute(query, values);
    console.log('Usuário inserido com sucesso:', resultado);
  } catch (error) {
    console.error('Erro ao inserir usuário:', error.message);
  }

}



async function deleteEnterprise(idEnterprise) {
  console.log("ID para exclusão:", idEnterprise);
  const query = `DELETE FROM empresas WHERE id_empresa  = ?`;

  try {
    const resultado = await database.execute(query, [idEnterprise]);
    if (idEnterprise == null || idEnterprise == undefined) {
      throw new Error('Id Está indifinido.');
    }
    if (resultado.affectedRows === 0) {
      throw new Error('Nenhuma empresa encontrada com o ID fornecido.');
    }
    console.log('Empresa deletada com sucesso:', resultado);
    return resultado;

  } catch (error) {
    console.error('Erro ao deletar empresa:', error.message);
    throw error;
  }
}

async function getEnterpriseEmployees(fkEmpresa) {
  console.log("Entrei no getEnterpriseEmployees()")

  try{
    const query = `SELECT * FROM usuarios WHERE fk_empresa = ${fkEmpresa};`
    const resultado = await database.execute(query);
    
    if (resultado.length > 0) {
      console.log("SELECT no banco feito")
      return resultado;
    }
  } catch (error){
    console.error("Erro ao selecionar funcionarios", error.message)
    throw error
  }
}

async function getEnterpriseById(idEnterprise) {
  try{
    const query = `SELECT * FROM empresas WHERE id_empresa = ${idEnterprise};`
    const resultado = await database.execute(query);
    
    if (resultado.length > 0) {
      return resultado;
    }
  } catch (error) {
    console.error("Erro ao buscar pela empresa ", error.message)
    throw error
  }
}


module.exports = {
  createEnterprise,
  autenticateEnterprise,
  editEnterprise,
  deleteEnterprise,
  getEnterpriseEmployees,
  getEnterpriseById
}
