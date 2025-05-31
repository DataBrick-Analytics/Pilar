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
        fk_empresa,
        data_cadastro
    FROM usuarios 
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
    INSERT INTO usuarios (nome, email, senha, fk_empresa, funcao_empresa, data_cadastro)
    VALUES (?, ?, ?, ?, ?, NOW())
    `;

    const values = [
        user.nome,
        user.email,
        user.senha,
        user.fk_empresa, 
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
    UPDATE usuarios 
    SET nome = ?,
        email = ?,
        senha = ?,
        cpf = ?,
        data_nasc = ?,
        data_edicao = now()
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
        return result[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

async function deleteUser(idUser) {
    const query = `
    DELETE FROM usuarios WHERE id_usuario = ?
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
    SELECT * FROM usuarios WHERE fk_empresa = ?
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
    SELECT 
        id_usuario,
        nome,
        email,
        senha,
        fk_empresa,
        cpf,
        DATE_FORMAT(data_nasc, '%Y-%m-%d') AS data_nasc,
        funcao_empresa,
        data_criacao,
        data_edicao
    FROM usuarios
    WHERE id_usuario = ?
    `;

    try {
        const resultado = await database.execute(query, [idUser]);
        console.log('Usuários encontrados com sucesso:', resultado);
        return resultado;
    } catch (error) {
        console.error('Erro ao procurar usuario:', error.message);
        throw error;
    }
}

module.exports = {
    createUser,
    editUser,
    deleteUser,
    authenticateUser,
    searchUsersByEnterpriseId,
    searchUserById
}
