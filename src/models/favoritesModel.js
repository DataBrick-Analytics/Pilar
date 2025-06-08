var database = require("../database/config");


async function hasAlreadyFavorited(fk_usuario, fk_empresa, fk_distrito) {
    try {
        const query = `
            SELECT 1 FROM favorito
            WHERE fk_usuario = ? AND fk_empresa = ? AND fk_distrito = ?
        `;
        const [rows] = await database.execute(query, [fk_usuario, fk_empresa, fk_distrito]);
        return rows;
    } catch (error) {
        console.error("Erro ao verificar favorito:", error);
        throw error;
    }
}


async function countFavoritesByUser(fk_usuario) {
    try {
        const query = `SELECT COUNT(*) AS total FROM favorito WHERE fk_usuario = ?`;
        const [rows] = await database.execute(query, [fk_usuario]);

        if (!rows || rows.length === 0) {
            return [{ total: 0 }];
        }

        return rows;
    } catch (error) {
        console.error("Erro ao contar favoritos:", error);
        return [{ total: 0 }];
    }
}


async function createFavorite(favorite) {
    const query = `
        INSERT INTO favorito (fk_usuario, fk_empresa, fk_distrito, data_favorito)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        favorite.fk_usuario,
        favorite.fk_empresa,
        favorite.fk_distrito,
        favorite.data_favorito || new Date()
    ];

    const result = await database.execute(query, values);
    return result;
}


async function editFavorites(userId, oldDistrito, newDistrito) {
    
    const dataEdicao = new Date();

    const query = `
        UPDATE favorito
        SET 
            fk_distrito = ?,
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
        DELETE FROM favorito 
        WHERE id_favorito = ? `

         const values = [favoriteId];

    try {
        return await database.execute(query,values );
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}


async function searchFavoriteByUserId(userId) {
    const query = `
        SELECT 
            f.*,
            d.nome_distrito 
        FROM favorito f
        JOIN distrito d ON f.fk_distrito = d.id_distrito
        WHERE f.fk_usuario = ?
        ORDER BY f.data_favorito DESC`;

    try {
        const [resultado] = await database.execute(query, [userId]);
        return resultado;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}


async function searchFavoritesByUserId(userId) {
    const query = `
      SELECT 
            f.id_favorito,
            f.fk_usuario,
            f.fk_empresa,
            f.fk_distrito,
            f.data_favorito,
            d.id_distrito,
            d.nome_distrito,
            d.area,
            d.data_criacao AS distrito_data_criacao,
            d.data_edicao AS distrito_data_edicao
        FROM favorito f
        JOIN distrito d ON f.fk_distrito = d.id_distrito
        WHERE f.fk_usuario = ?`;

    try {
        const result = await database.execute(query, [userId]);
        return result;
    } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        throw error;
    }
}

module.exports = {
    createFavorite,
    hasAlreadyFavorited,
    countFavoritesByUser,
    editFavorites,
    deleteFavorite,
    searchFavoriteByUserId,
    searchFavoritesByUserId
};