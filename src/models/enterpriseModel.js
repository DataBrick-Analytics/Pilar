var database = require("../database/config");


// CRIAR USUARIO
async function createEnterpriseAndUser(req, res) {
  const cadastro = req.body;

  console.log("Dados recebidos:", cadastro);

  // Validações de campos obrigatórios sem usar for
  if (!cadastro.nomeFantasia) {
    return res.status(400).json({ error: "O nome da Empresa está undefined ou nulo!" });
  }
  if (!cadastro.cnpj) {
    return res.status(400).json({ error: "CNPJ está undefined ou nulo!" });
  }
  if (!cadastro.nomeUsuario) {
    return res.status(400).json({ error: "O nome do usuário está undefined ou nulo!" });
  }
  if (!cadastro.cpf) {
    return res.status(400).json({ error: "CPF está undefined ou nulo!" });
  }
  if (!cadastro.email) {
    return res.status(400).json({ error: "Email está undefined ou nulo!" });
  }
  if (!cadastro.senha) {
    return res.status(400).json({ error: "Senha está undefined ou nula!" });
  }
  if (!cadastro.dtNasc) {
    return res.status(400).json({ error: "Data de nascimento está undefined ou nula!" });
  }
  if (!cadastro.razaoSocial) {
    return res.status(400).json({ error: "Razão Social está undefined ou nula!" });
  }
  if (!cadastro.uf) {
    return res.status(400).json({ error: "UF está undefined ou nula!" });
  }
  if (!cadastro.cep) {
    return res.status(400).json({ error: "CEP está undefined ou nulo!" });
  }
  if (!cadastro.rua) {
    return res.status(400).json({ error: "Rua está undefined ou nula!" });
  }
  if (!cadastro.numero) {
    return res.status(400).json({ error: "Número está undefined ou nulo!" });
  }
  if (!cadastro.complemento) {
    return res.status(400).json({ error: "Complemento está undefined ou nulo!" });
  }
  if (!cadastro.bairro) {
    return res.status(400).json({ error: "Bairro está undefined ou nulo!" });
  }
  if (!cadastro.cidade) {
    return res.status(400).json({ error: "Cidade está undefined ou nula!" });
  }
  if (!cadastro.estado) {
    return res.status(400).json({ error: "Estado está undefined ou nulo!" });
  }
  if (!cadastro.telefone) {
    return res.status(400).json({ error: "Telefone está undefined ou nulo!" });
  }

  try {
    const [cnpjExistente, razaoExistente, emailExistente, cpfExistente] = await Promise.all([
      enterpriseModel.checkCnpj(cadastro.cnpj),
      enterpriseModel.checkRazaoSocialcnpj(cadastro.razaoSocial),
      userModel.checkEmail(cadastro.email),
      userModel.checkCpf(cadastro.cpf)
    ]);

    if (cnpjExistente.length > 0) {
      return res.status(409).json({ error: "CNPJ já cadastrado." });
    }
    if (razaoExistente.length > 0) {
      return res.status(409).json({ error: "Razão Social já cadastrada." });
    }
    if (emailExistente.length > 0) {
      return res.status(409).json({ error: "Email já cadastrado." });
    }
    if (cpfExistente.length > 0) {
      return res.status(409).json({ error: "CPF já cadastrado." });
    }

    // Cadastro
    const resultado = await enterpriseModel.createEnterpriseAndUser(cadastro);

    return res.status(201).json({
      message: "Empresa e usuário criados com sucesso",
      resultado
    });

  } catch (erro) {
    console.error("Erro inesperado:", erro);
    return res.status(500).json({
      error: erro.sqlMessage || erro.message || 'Erro interno ao cadastrar empresa e usuário.'
    });
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