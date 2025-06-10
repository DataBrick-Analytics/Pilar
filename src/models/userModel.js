var database = require("../database/config");

async function authenticateUser(email, senha) {
    if (!email || !senha) {
        console.error('Email ou senha não fornecidos');
        return {
            auth: false,
            message: "Credenciais inválidas"
        };
    }

    const query = `
    SELECT 
        id_usuario,
        nome,
        email,
        funcao_empresa,
        fk_empresa
    FROM usuario
    WHERE email = ? AND senha = ?
    `;

    try {
        const result = await database.execute(query, [email, senha]);
        console.log('Resultado bruto:', result);

        const rows = result[0];
        console.log('Linhas encontradas:', rows);
        
        // Check if rows exists and has properties
        if (rows && rows.id_usuario) {
            console.log('Usuário encontrado:', rows);
            
            return {
                auth: true,
                usuario: rows
            };
        }

        console.log('Nenhum usuário encontrado para:', email);
        return {
            auth: false,
            message: "Email ou senha inválidos"
        };

    } catch (error) {
        console.error('Erro na autenticação:', error);
        return {
            auth: false,
            message: "Erro ao autenticar usuário"
        };
    }
}

async function createUser(user) {
    const query = `
    INSERT INTO usuario (nome, email, senha, fk_empresa, funcao_empresa, data_cadastro)
    VALUES (?, ?, ?, ?, ?, NOW())
    `;  

    const values = [
        user.nomeUsuario,
        user.email,
        user.senha,
        user.fk_empresa,
        user.cpf,
        user.dtNasc,
        user.funcao_empresa
    ];

    try {
        const resultado = await database.execute(query, values);
        console.log('Database result:', resultado);
        return resultado;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

async function editUser(user, idUser) {
    const query = `
    UPDATE usuario
    SET nome = ?, 
        email = ?, 
        senha = ?, 
        funcao_empresa = ?,
        fk_empresa = ?
    WHERE id_usuario = ?
    `;

    const values = [
        user.nome,
        user.email,
        user.senha,
        user.cpf,
        user.data_nasc,
        idUser
    ];

    try {
        const result = await database.execute(query, values);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

async function deleteUser(idUser) {
    const query = `
    DELETE FROM usuario WHERE id_usuario = ?
    `;

    try {
        console.log(query)
        const resultado = await database.execute(query, [idUser]);
        console.log('Usuário deletado com sucesso:', resultado);
        return resultado;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.message);
        throw error;
    }
}


async function searchUsersByEnterpriseId(idEnterprise) {
    const query = `
    SELECT * FROM usuario WHERE fk_empresa = ?
    `;

    try {
        const [resultado] = await database.execute(query, [idEnterprise]);
        console.log('Usuários encontrados com sucesso:', resultado);
        return resultado[0];
    } catch (error) {
        console.error('Erro ao procurar usuario:', error.message);
        throw error;
    }
}

async function searchUserById(idUser) {
    const query = `
    SELECT * FROM usuario WHERE id_usuario = ?`;

    try {
        const resultado = await database.execute(query, [idUser]);
        console.log('Usuários encontrados com sucesso:', resultado);
        return resultado;
    } catch (error) {
        console.error('Erro ao procurar usuario:', error.message);
        throw error;
    }
}

async function checkEmail(email) {
    const query = `SELECT email FROM usuario WHERE email = ?;`;
    const resultado = await database.execute(query, [email]);

    if (resultado.length > 0) {
        return resultado;
    } else {
        return [];
    }
}

async function checkCpf(cpf) {
    const query = `SELECT cpf FROM usuario WHERE cpf = ?;`;
    const resultado = await database.execute(query, [cpf]);

    if (resultado.length > 0) {
        return resultado;
    } else {
        return [];
    }
}



async function salvarEscolhas(idUsuario,escolhas) {
    const query = `
        INSERT INTO escolhas_formulario (etapa1, etapa2, etapa3, fk_id_usuario)
        VALUES (?, ?, ?, ?)
    `;

    const values = [escolhas[0], escolhas[1], escolhas[2], idUsuario];

    try {
        const resultado = await database.execute(query, values);
        return resultado;
    } catch (error) {
        console.error("Erro ao salvar escolhas:", error);
        throw error;
    }
}

module.exports = {
    createUser,
    editUser,
    deleteUser,
    authenticateUser,
    searchUserById,
    searchUsersByEnterpriseId,
    checkEmail,
    checkCpf,
    salvarEscolhas
}
