var database = require("../database/config");


// CRIAR USUARIO

async function createEnterpriseAndUser(cadastro) {
  try {
    const checkEnterprise = await database.execute(
       ` SELECT id_empresa FROM empresa WHERE cnpj = ?`,
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
        ` INSERT INTO endereco (
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


function editEnterprise(data, idEmpresa) {
  // Atualizar empresa
  const queryEmpresa = `
    UPDATE empresa
    SET 
      razao_social = ?,
      nome_fantasia = ?,
      date_edicao = NOW()
    WHERE id_empresa = ?
  `;

  // Atualizar endereço
  const queryEndereco = `
    UPDATE endereco
    SET 
      rua = ?,
      numero = ?,
      bairro = ?,
      cidade = ?,
      estado = ?,
      data_edicao = NOW()
    WHERE fk_empresa = ?
    LIMIT 1
  `;

  // Atualizar primeiro telefone
  const queryTelefone = `
    UPDATE telefone
    SET 
      telefone = ?,
      data_edicao = NOW()
    WHERE fk_empresa = ?
    ORDER BY id_telefone ASC
    LIMIT 1
  `;

  return database.execute(queryEmpresa, [data.razao_social, data.nome_fantasia, idEmpresa])
      .then(() => database.execute(queryEndereco, [
        data.rua,
        data.numero,
        data.bairro,
        data.cidade,
        data.estado,
        idEmpresa
      ]))
      .then(() => database.execute(queryTelefone, [data.telefone, idEmpresa]));
}



async function deleteEnterprise(idUserLogado,idEnterprise) {
  try {
    // 1. Buscar dados do usuário logado (função + empresa)
    const usuarioRows = await database.execute(
        `SELECT id_usuario, funcao_empresa, fk_empresa FROM usuario WHERE id_usuario = ?`,
        [idUserLogado]
    );

    if (usuarioRows.length === 0) {
      throw new Error("Usuário não encontrado.");
    }

    const { id_usuario, funcao_empresa, fk_empresa } = usuarioRows[0];

    // 2. Verificar se há outros usuários na mesma empresa
    const usuariosMesmaEmpresa = await database.execute(
        ` SELECT COUNT(*) AS total FROM usuario WHERE fk_empresa = ? AND id_usuario != ?`,
        [fk_empresa, id_usuario]
    );

    const outrosUsuarios = usuariosMesmaEmpresa[0].total;

    if (outrosUsuarios > 0) {
      throw new Error("Não é possível excluir a conta. Existem outros usuários na empresa.");
    }

    // 3. Apagar dados relacionados ao usuário
    await database.execute(`DELETE FROM favorito WHERE fk_usuario = ?`, [idUserLogado]);
    await database.execute(`DELETE FROM acao_de_usuario WHERE fk_usuario = ?`, [idUserLogado]);

    // 4. Apagar usuário
    await database.execute(`DELETE FROM usuario WHERE id_usuario = ?`, [idUserLogado]);

    // 5. Apagar a empresa (já que ele é o último usuário)
    await database.execute(`DELETE FROM empresa WHERE id_empresa = ?`, [fk_empresa]);

    console.log(`Usuário ${idUserLogado} e empresa ${fk_empresa} excluídos com sucesso`);
    return { success: true, message: "Conta e empresa excluídas com sucesso." };

  } catch (error) {
    console.error("Erro ao excluir usuário/empresa:", error.message);
    throw error;
  }
}

//PEGAR DADOS
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
  const query = `SELECT e.nome_fantasia,e.razao_social,en.rua,en.bairro,en.cep,
                               en.cidade,en.estado,t.telefone
                            FROM empresa e
                        JOIN endereco en
                            ON e.id_empresa=en.fk_empresa 
                        JOIN telefone t
                            ON e.id_empresa=t.fk_empresa
                        WHERE e.id_empresa = ${idEnterprise};`
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


//VALIDAÇÃO CNPJ E  RAZAO SOCIAL
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

async function checkCnpjAndEnterprise(cnpj, idEmpresa) {
  const query = `SELECT cnpj FROM empresa WHERE cnpj = ? AND id_empresa != ?;`
  const resultado = await database.execute(query,[cnpj, idEmpresa]);

  if (resultado.length > 0) {
    return resultado;
  } else{
    return [];
  }
}


async function checkRazaoSocialAndEnterprise(razaoSocial, idEmpresa) {
  const query = `SELECT razao_social FROM empresa WHERE razao_social = ? AND id_empresa != ? ;`;
  const resultado = await database.execute(query, [razaoSocial, idEmpresa]);

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
  checkCnpjAndEnterprise,
  checkRazaoSocialAndEnterprise
}