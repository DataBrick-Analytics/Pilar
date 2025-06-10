var database = require("../database/config");

async function createFavorites(favorite) {

    const isAlreadyFavorited = await database.execute(`
        SELECT * FROM favorito WHERE fk_usuario = ? AND fk_empresa = ? AND fk_distrito = ?;
    `, [favorite.userID, favorite.enterpriseID, favorite.favoriteLand])

    if(isAlreadyFavorited.length > 0){
        throw new Error("Este terreno já está favoritado por este usuário.")
    }

    const query = `
        INSERT INTO favorito (fk_usuario, fk_empresa, fk_distrito, data_favorito, data_edicao)
        VALUES (?, ?, ?, NOW(), NOW());`

    const values = [
        favorite.userID,
        favorite.enterpriseID,
        favorite.favoriteLand
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

async function editFavorites(favorite, idFavorite) {
    const query = `
   UPDATE favoritos 
    SET fk_usuario = ?,
      fk_empresa = ?,
      fk_propriedade = ?,
      data_favorito = ? 
    WHERE id_favorito = ?;
    `;

       const values = [
        favorite.fk_usuario,
        favorite.fk_empresa,
        favorite.fk_propriedade,
        favorite.id_favorito,
    ];

    try {
        const result = await database.execute(query, values);
        return result[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}


async function deleteFavorite(idFavorite) {
    const query = `
    DELETE FROM favorite WHERE id_favorito = ?
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



async function searchFavoriteByUserId(idUser) {
    const query = `
    SELECT * FROM favorites WHERE fk_usuario = ?
    `;

    try {
        const [resultado] = await database.execute(query, [idUser]);
        console.log('Usuários encontrados com sucesso:', resultado);
        return resultado[0];
    } catch (error) {
        console.error('Erro ao procurar usuario:', error.message);
        throw error;
    }

}



module.exports = {
    createFavorites,
    editFavorites,
    deleteFavorite,
    searchFavoriteByUserId,
}
