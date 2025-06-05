var database = require("../database/config");


async function createEnterpriseAndUser(cadastro) {
  try {
    const checkEnterprise = await database.execute(`SELECT id_empresa FROM empresas WHERE cnpj = ${cadastro.cnpj}`)

    let cadastroEmpresa
    let cadastroUsuario

    if (checkEnterprise.length == 0) {
      console.log("Empresa não cadastrada, será necessário cadastrar.")
      cadastroEmpresa = await database.execute(
        `INSERT INTO empresas (nome,cnpj,data_criacao,date_edicao) VALUES (?, ?, ?, ?)`
        , values = [cadastro.nomeEmpresa, cadastro.cnpj, new Date(), new Date()]
      );
    } else {
      console.log("Empresa já cadastrada, não será necessário cadastrar novamente.")
      return
    }
    const idEmpresa = cadastroEmpresa.insertId

    cadastroUsuario = await database.execute(
      `INSERT INTO usuarios (nome, email, senha, fk_empresa, cpf, data_nasc, funcao_empresa, data_criacao, data_edicao)
      VALUES (?, ?, SHA2(?, 256), ?, ?, ?, ?, ?, ?)`,
      values = [
        cadastro.nomeUsuario,
        cadastro.email,
        cadastro.senha,
        idEmpresa,
        cadastro.cpf,
        cadastro.dtNasc,
        cadastro.funcao,
        new Date(),
        new Date()
      ])

    return "Usuario Criado com sucesso";

  } catch (error) {
    console.error('Erro ao inserir empresa:', error.message);
    throw error;
  }
}

async function autenticateEnterprise(enterprise) {
  const query = `
      SELECT id_empresa, nome, cnpj 
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


module.exports = {
  createEnterpriseAndUser,
  autenticateEnterprise,
  editEnterprise,
  deleteEnterprise,
  getEnterpriseEmployees
}
