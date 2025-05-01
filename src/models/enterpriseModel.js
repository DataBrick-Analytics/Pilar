var database = require("../database/config");


async function createEnterprise(enterprise) {
  const query = `
  INSERT INTO tb_empresa (nome, endereco, telefone, email, data_cadastro, senha)
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
  SELECT * FROM tb_empresa WHERE email = ? AND senha = sha2(? , 256)
  `
  const values = [
    enterprise.email,
    enterprise.senha
  ]

  try {
    const resultado = await database.execute(query, values)
    
    if(resultado.affectedRows == 1){
      console.log("Empresa localizada com sucesso: ", resultado)
      
      return resultado
    }
  } catch(error){
    console.error("Erro ao localizar a empresa", error.message)
    throw error
  }
}

async function editEnterprise(enterprise, idEnterprise) {

  const query = `
  UPDATE tb_empresa
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
  const query = `DELETE FROM tb_empresa WHERE id_empresa  = ?`;

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


module.exports = {
  createEnterprise,
  autenticateEnterprise,
  editEnterprise,
  deleteEnterprise
}
