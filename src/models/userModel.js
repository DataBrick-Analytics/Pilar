var database = require("../database/config");


async function createUser(user) {

    const query = `
    INSERT INTO usuarios (nome, email, senha, data_cadastro, fk_empresa, fk_funcao)
    VALUES (?, ?, ?, NOW(), ?, ?)
     `;

    const values = [
        user.nome,
        user.email,
        user.senha,
        user.fk_empresa,
        user.fk_funcao
    ];

    try {
        const [resultado] = await database.execute(query, values);
        console.log('Usuário inserido com sucesso:', resultado);
      } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
      }
}


async function editUser(user,idUser) {

    const query = `
    UPDATE usuarios
     SET nome = ?,
        email = ?,
        senha = ?,
        fk_funcao = ?
    WHERE id_usuario = ?
     
    `;

    const values = [
        user.nome,
        user.email,
        user.senha,
        user.fk_funcao,
        idUser
    ];

    try {
        const [resultado] = await database.execute(query, values);
        console.log('Usuário inserido com sucesso:', resultado);
      } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
      } 
    
}

async function deleteUser(idUser) {

    const query = `
    DELETE usuarios FROM WHERE id_usuario= ?
    `;

    try {
        const [resultado] = await database.execute(query, [idUser]);
        console.log('Usuário inserido com sucesso:', resultado);
      } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
      }
    
}



module.exports = {
    createUser,
    editUser,
    deleteUser
}
