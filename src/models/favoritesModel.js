var database = require("../database/config");

async function createFavorites(favorite) {
    const querySelect = `SELECT * FROM favorito WHERE fk_usuario = ? AND fk_empresa = ? AND fk_distrito = ?`;

    const isAlreadyFavorited = await database.execute(
        querySelect, [favorite.userID, favorite.enterpriseID, favorite.favoriteLand]
    );

    if(isAlreadyFavorited.length > 0){
        throw new Error("Este terreno já está favoritado por este usuário.")
    }

    const query = `
        INSERT INTO favorito (fk_usuario, fk_empresa, fk_distrito, data_favorito, data_edicao) VALUES (?, ?, ?, NOW(), NOW())
    `;

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

async function countFavoritesByUser(fk_usuario) {
    try {
        const query = `SELECT COUNT(*) AS total
                       FROM favorito
                       WHERE fk_usuario = ?`;
        const [rows] = await database.execute(query, [fk_usuario]);

        if (!rows || rows.length === 0) {
            return [{total: 0}];
        }

        return rows;
    } catch (error) {
        console.error("Erro ao contar favoritos:", error);
        return [{total: 0}];
    }
}


async function editFavorites(userId, oldDistrito, newDistrito) {

    const dataEdicao = new Date();

    const query = `
        UPDATE favorito
        SET fk_distrito = ?,
            data_edicao = ?
        WHERE fk_usuario = ?
          AND fk_distrito = ?`;

    const values = [
        newDistrito,
        dataEdicao,
        userId,
        oldDistrito
    ];

    try {
        const result = await database.execute(query, values);

        if (result.affectedRows === 0) {
            throw new Error("Favorito não encontrado para este usuário");
        }

        return {
            success: true,
            fk_usuario: userId,
            oldDistrito: oldDistrito,
            newDistrito: newDistrito,
            data_edicao: dataEdicao
        };
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}


async function deleteFavorite(favoriteId) {
    console.log("ID para exclusão:", favoriteId);
    const query = `
        DELETE
        FROM favorito
        WHERE fk_distrito = ? `

    const values = [favoriteId];

    try {
        return await database.execute(query, values);
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

async function searchFavoritesByUserId(userId, enterpriseId) {
    const query = `
        SELECT
            d.id_distrito,
            d.nome_distrito,
            d.zona
        FROM favorito f
                 JOIN distrito d ON f.fk_distrito = d.id_distrito
        WHERE f.fk_usuario = ? AND f.fk_empresa = ? 
        LIMIT 6`;

    try {
        return await database.execute(query, [userId, enterpriseId]);
    } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        throw error;
    }
}

async function getFavoritesByUser(userID, enterpriseID) {
    const query = `
        SELECT fk_distrito as favoriteLand
        FROM favorito
        WHERE fk_usuario = ?
          AND fk_empresa = ?
    `;

    try {
        const result = await database.execute(query, [userID, enterpriseID]);
        console.log("Favoritos encontrados no banco:", result);
        return result;
    } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        throw error;
    }
}


module.exports = {
    createFavorites,
    countFavoritesByUser,
    editFavorites,
    deleteFavorite,
    searchFavoritesByUserId,
    getFavoritesByUser
};