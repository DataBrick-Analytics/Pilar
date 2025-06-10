var database = require("../database/config");


async function createEnterpriseAndUser(cadastro) {
  try {
    const checkEnterprise = await database.execute(
        `SELECT id_empresa FROM empresa WHERE cnpj = ?`,
        [cadastro.cnpj]
    );

    if (checkEnterprise.length > 0) {
      console.log("Empresa já cadastrada, não será necessário cadastrar novamente.");
      return "Empresa já cadastrada, não será necessário cadastrar novamente.";
    }

    console.log("Empresa não cadastrada, será necessário cadastrar.");

    // Cadastra a empresa
    const cadastroEmpresa = await database.execute(
        `INSERT INTO empresa (razao_social, nome_fantasia, cnpj, data_criacao, date_edicao) VALUES (?, ?, ?, ?, ?)`,
        [cadastro.razaoSocial, cadastro.nomeFantasia, cadastro.cnpj, new Date(), new Date()]
    );

    // Validação: empresa cadastrada com sucesso?
    const idEmpresa = cadastroEmpresa?.insertId;
    if (!idEmpresa) {
      console.error("Falha ao cadastrar empresa. Encerrando processo.");
      return;
    }

    // Cadastra endereço
    await database.execute(
        `INSERT INTO endereco (
        rua, bairro, cep, cidade, estado, uf, fk_empresa, data_criacao, data_edicao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          cadastro.rua,
          cadastro.bairro,
          cadastro.cep,
          cadastro.cidade,
          cadastro.estado,
          cadastro.uf,
          idEmpresa
        ]
    );

    // Cadastra telefone
    await database.execute(
        `INSERT INTO telefone (telefone, fk_empresa, data_criacao, data_edicao)
       VALUES (?, ?, NOW(), NOW())`,
        [cadastro.telefone, idEmpresa]
    );

    // Cadastra usuário
    await database.execute(
        `INSERT INTO usuario (nome, email, senha, fk_empresa, cpf, data_nasc, funcao_empresa, data_criacao, data_edicao)
       VALUES (?, ?, SHA2(?, 256), ?, ?, ?, ?, ?, ?)`,
        [
          cadastro.nomeUsuario,
          cadastro.email,
          cadastro.senha,
          idEmpresa,
          cadastro.cpf,
          cadastro.dtNasc,
          "Admin",
          new Date(),
          new Date()
        ]
    );

    return "Usuário criado com sucesso.";

  } catch (error) {
    console.error('Erro ao inserir empresa:', error.message);
    throw error;
  }
}


async function editEnterprise(enterprise, idEnterprise) {

  const query = `
  UPDATE empresa
  SET nome = ?,
      endereco = ?,
      telefone = ?,
      email = ?,
      senha = ?
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
  const query = `DELETE FROM empresa WHERE id_empresa  = ?`;

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
    const query = `SELECT * FROM usuario WHERE fk_empresa = ${fkEmpresa};`

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

async function checkCnpj(cnpj) {
  const query = `SELECT cnpj FROM empresa WHERE cnpj = ?;`
  const resultado = await database.execute(query,[cnpj]);

  if (resultado.length > 0) {
    return resultado;
  } else{
    return [];
  }
}

async function checkRazaoSocialcnpj(razaoSocial) {
  const query = `SELECT razao_social FROM empresa WHERE razao_social = ?;`;
  const resultado = await database.execute(query, [razaoSocial]);

  if (resultado.length > 0) {
    return resultado;
  } else {
    return [];
  }
}







module.exports = {
  createEnterpriseAndUser,
  editEnterprise,
  deleteEnterprise,
  getEnterpriseEmployees,
  getEnterpriseById,
  getEnterpriseAddress,
  checkCnpj,
  checkRazaoSocialcnpj,
}