var database = require("../database/config");

//AUTENTICAR
async function authenticateUser(email, senha) {
    if (!email || !senha) {
        console.error('Email ou senha não fornecidos');
        return {
            auth: false,
            message: "Credenciais inválidas"
        };
    }

    const query = `
        SELECT id_usuario,
               nome,
               email,
               funcao_empresa,
               fk_empresa
        FROM usuario
        WHERE email = ?
          AND senha = sha2(?, 256)
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

//CRIAR USUARIO
async function createUser(user) {
    const query = `
        INSERT INTO usuario (nome, email, senha, fk_empresa, cpf, data_nasc, funcao_empresa, data_criacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const values = [
        user.nome,
        user.email,
        user.senha,
        user.fk_empresa,
        user.cpf,
        user.data_nasc,
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


//EDITAR USUARIO
async function editUser(user, idUser) {
    const query = `
        UPDATE usuario
        SET cpf            = ?,
            nome           = ?,
            email          = ?,
            senha          = ?,
            data_nasc      = ?,
            funcao_empresa = ?,
            data_edicao    = NOW()
        WHERE id_usuario = ?;
    `;

    const values = [
        user.cpf,
        user.nome,
        user.email,
        user.senha,
        user.data_nasc,
        user.funcao_empresa,
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


//DELETAR USUARIO
async function deleteUser(idUser) {
    try {
        // 1. Buscar dados do usuário (função + empresa)
        const usuarioRows = await database.execute(
            `SELECT funcao_empresa, fk_empresa
             FROM usuario
             WHERE id_usuario = ?`,
            [idUser]
        );
        console.log(usuarioRows.length);
        if (usuarioRows.length === 0) {
            throw new Error("Usuário não encontrado.");
        }

        const funcao = usuarioRows[0].funcao_empresa;
        console.log("Funcao:" + usuarioRows[0].funcao_empresa)
        const empresaId = usuarioRows[0].fk_empresa;
        console.log("Empresa:" + empresaId)

        // 2. Se for admin, verificar se é o único admin da empresa
        if (funcao === 'Admin') {
            const admins = await database.execute(
                `SELECT COUNT(*) as total
                 FROM usuario
                 WHERE fk_empresa = ?
                   AND funcao_empresa = 'Admin'
                   AND id_usuario != ?`,
                [empresaId, idUser]
            );

            const totalAdmins = admins[0].total;
            console.log("Total de administradores:" + totalAdmins)
            if (totalAdmins === 0) {
                throw new Error("Este é o único administrador da empresa e não pode ser excluído.");
            }
        }

        // 3. Verificar e excluir favoritos, se existirem
        const favoritos = await database.execute(
            `SELECT *
             FROM favorito
             WHERE fk_usuario = ?`,
            [idUser]
        );

        if (favoritos.length > 0) {
            await database.execute(
                `DELETE
                 FROM favorito
                 WHERE fk_usuario = ?`,
                [idUser]
            );
            console.log("Favoritos excluídos.");
        }

        // 4. Verificar e excluir ações, se existirem
        const acoes = await database.execute(
            `SELECT *
             FROM acao_de_usuario
             WHERE fk_usuario = ?`,
            [idUser]
        );

        if (acoes.length > 0) {
            await database.execute(
                `DELETE
                 FROM acao_de_usuario
                 WHERE fk_usuario = ?`,
                [idUser]
            );
            console.log("Ações de usuário excluídas.");
        }

        // 5. Excluir o usuário
        const resultado = await database.execute(
            `DELETE
             FROM usuario
             WHERE id_usuario = ?`,
            [idUser]
        );

        if (resultado.affectedRows > 0) {
            console.log(`Usuário ID ${idUser} excluído com sucesso.`);
            return {success: true, message: "Usuário excluído com sucesso."};
        } else {
            throw new Error("Usuário não encontrado ou já excluído.");
        }

    } catch (error) {
        console.error("Erro ao deletar usuário:", error.message);
        throw error;
    }
}

//Metodos GET


async function searchUserById(idUser) {
    const query = `
        SELECT *
        FROM usuario
        WHERE id_usuario = ?`;

    try {
        const resultado = await database.execute(query, [idUser]);
        console.log('Usuários encontrados com sucesso:', resultado);
        return resultado;
    } catch (error) {
        console.error('Erro ao procurar usuario:', error.message);
        throw error;
    }
}


// Validação Email e CPF
async function checkEmail(email) {
    const query = `SELECT email
                   FROM usuario
                   WHERE email = ?;`;
    const resultado = await database.execute(query, [email]);

    if (resultado.length > 0) {
        return resultado;
    } else {
        return [];
    }
}

async function checkCpf(cpf) {
    const query = `SELECT cpf
                   FROM usuario
                   WHERE cpf = ?;`;
    const resultado = await database.execute(query, [cpf]);

    if (resultado.length > 0) {
        return resultado;
    } else {
        return [];
    }
}


module.exports = {
    createUser,
    editUser,
    deleteUser,
    authenticateUser,
    searchUserById,
    checkEmail,
    checkCpf
}
