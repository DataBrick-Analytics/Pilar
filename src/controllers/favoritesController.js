var favoritesModel = require("../models/favoritesModel");

async function createFavorite(req, res) {
    try {
        const favorite = req.body;
        console.log("Dados recebidos:", favorite);

        const { fk_usuario, fk_empresa, fk_distrito } = favorite;

        if (!fk_usuario || !fk_empresa || !fk_distrito) {
            return res.status(400).json({ 
                error: "Campos obrigatórios ausentes." 
            });
        }

        const alreadyFavorited = await favoritesModel.hasAlreadyFavorited(
            fk_usuario, 
            fk_empresa, 
            fk_distrito
        );
        console.log("Já favoritado:", alreadyFavorited);

        if (alreadyFavorited) {
            return res.status(409).json({ 
                error: "Este item já foi favoritado por este usuário." 
            });
        }

        const countResult = await favoritesModel.countFavoritesByUser(fk_usuario);
        const total = countResult.total; // Access the total from the first row
        console.log("Total de favoritos do usuário:", total, "tipo:", typeof total);

        if (total >= 6) { // Changed to >= to properly enforce limit of 6
            console.log("Limite de favoritos atingido. Total atual:", total);
            return res.status(403).json({ 
            error: "Limite de 6 favoritos atingido." 
        });
}

        const result = await favoritesModel.createFavorite(favorite);
        
        if (result.affectedRows > 0) {
            return res.status(201).json({
                message: "Favorito criado com sucesso",
                favorito: {
                    nome: favorite.nome,
                    fk_usuario: favorite.fk_usuario,
                    fk_empresa: favorite.fk_empresa,
                    fk_distrito: favorite.fk_distrito
                }
            });
        } else {
            console.error("Resposta inesperada do banco.");
            return res.status(500).json({ 
                error: "Erro ao criar favorito",
                message: "Resposta do banco incompleta"
            });
        }

    } catch (error) {
        console.error("Erro ao criar favorito:", error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                error: "Este item já foi favoritado por este usuário."
            });
        }

        res.status(500).json({
            error: "Erro interno ao criar favorito",
            message: error.message
        });
    }
}


async function editFavorite(req, res) {
    try {
        const userId = req.params.userId;
        const oldDistrito = req.params.oldDistrito;
        const newDistrito = req.body.fk_distrito;
        
        console.log("User ID:", userId);
        console.log("Distrito Antigo:", oldDistrito);
        console.log("Novo Distrito:", newDistrito);

        if (!userId || !oldDistrito || !newDistrito) {
            return res.status(400).json({ 
                error: "Dados incompletos", 
                message: "ID do usuário, distrito atual e novo distrito são obrigatórios" 
            });
        }

        const currentFavorite = await favoritesModel.searchFavoriteByUserId(userId);
        const empresaId = currentFavorite.fk_empresa;

        const alreadyFavorited = await favoritesModel.hasAlreadyFavorited(
            userId, 
            empresaId, 
            newDistrito
        );

        if (alreadyFavorited) {
            return res.status(409).json({ 
                error: "Este distrito já está favoritado por este usuário",
                message: "Não é possível atualizar para um distrito já favoritado"
            });
        }

        const resultado = await favoritesModel.editFavorites(userId, oldDistrito, newDistrito);
        
        if (resultado.success) {
            return res.status(200).json({
                message: "Favorito atualizado com sucesso",
                favorito: {
                    fk_usuario: resultado.fk_usuario,
                    distrito_anterior: resultado.oldDistrito,
                    novo_distrito: resultado.newDistrito,
                    data_edicao: resultado.data_edicao
                }
            });
        } else {
            return res.status(404).json({ 
                error: "Favorito não encontrado"
            });
        }

    } catch (erro) {
        console.error("Erro ao atualizar favorito:", erro);
        return res.status(500).json({ 
            error: "Erro ao atualizar favorito",
            message: erro.sqlMessage || erro.message 
        });
    }
}

function deleteFavorite(req, res) {
    const favoriteId = req.params.id;
    console.log("ID para exclusão:", favoriteId);

    if (!favoriteId) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    favoritesModel.deleteFavorite(favoriteId)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                return res.status(200).json({
                    message: "Favorito deletado com sucesso"
                });
            } else {
                return res.status(404).json({
                    error: "Favorito não encontrado"
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao deletar favorito:", erro);
            return res.status(500).json({
                error: erro.sqlMessage || erro.message
            });
        });
}

function searchFavoritesByUserId (req, res) {
    const userId = req.params.id;
    console.log("ID usúario:", userId);

    if (!userId) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    favoritesModel.searchFavoritesByUserId(userId)
        .then(function (resultado) {
            res.status(200).json({
                message: "Favoritos encontrados com sucesso",
                resultado: resultado
            });
        })
        .catch(function (erro) {
            console.error("Erro ao deletar usuário:", erro);
            res.status(500).json({
                error: erro.sqlMessage || erro.message
            });
        });
}



module.exports = {
    createFavorite,
    editFavorite,
    deleteFavorite,
    searchFavoritesByUserId,
};