var database = require("../database/config");


async function createEnterprise(enterprise) {
  const query = `
  INSERT INTO empresas (nome,cnpj,data_criacao)
  VALUES (?, ?, ?)
  `;

  const values = [
    enterprise.nome,
    enterprise.cnpj,
    new Date()
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

  console.log("Dados recebidos para edição:", enterprise);

  const queryEnterpriseData = `
  UPDATE empresas
  SET nome_fantasia = ?,
      razao_social = ?,
      data_edicao = NOW()
  WHERE id_empresa = ?
  `;

  const valuesEnterpriseData = [
    enterprise.fantasyName,
    enterprise.socialReason,
    idEnterprise
  ];

  const queryEnterpriseAddress = `
  UPDATE enderecos SET
      rua = ?,
      bairro = ?,
      cep = ?,
      cidade = ?,
      estado = ?,
      uf = ?,
      data_edicao = NOW()
  WHERE fk_empresa = ?
  `;

  const valuesEnterpriseAddress = [
    enterprise.street,
    enterprise.neighborhood,
    enterprise.cepCode,
    enterprise.city,
    enterprise.state,
    enterprise.stateCode,
    idEnterprise
  ];

  try {
    const resultadoData = await database.execute(queryEnterpriseData, valuesEnterpriseData);
    const resultadoAddress = await database.execute(queryEnterpriseAddress, valuesEnterpriseAddress);
    const resultado = [resultadoData, resultadoAddress];
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

  try {
    const query = `SELECT * FROM usuarios WHERE fk_empresa = ${fkEmpresa};`
    const resultado = await database.execute(query);

    if (resultado.length > 0) {
      console.log("SELECT no banco feito")
      return resultado;
    }
  } catch (error) {
    console.error("Erro ao selecionar funcionarios", error.message)
    throw error
  }
}

async function getEnterpriseById(idEnterprise) {
  const query = `SELECT * FROM empresas WHERE id_empresa = ${idEnterprise};`
  const resultado = await database.execute(query);

  if (resultado.length > 0) {
    return resultado;
  } else {
    throw "Não foi possível buscar pela empresa";
  }
}

async function getEnterpriseAddress(idEnterprise) {
  const query = `SELECT * FROM enderecos WHERE fk_empresa = ${idEnterprise};`
  const resultado = await database.execute(query);

  if (resultado.length > 0) {
    console.log(resultado);
    return resultado;
  } else {
    throw "Não foi possivel buscar o endereço da empresa";
  }
}


module.exports = {
  createEnterprise,
  autenticateEnterprise,
  editEnterprise,
  deleteEnterprise,
  getEnterpriseEmployees,
  getEnterpriseById,
  getEnterpriseAddress
}