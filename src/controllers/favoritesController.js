var favoritesModel = require("../models/favoritesModel");


function createFavorite(req, res) {

    const dataFavorite = req.body;

    if (dataFavorite.userID === undefined || dataFavorite.userID == null) return res.status(400).send("ID do Usuario está undefined ou nulo!")
    if (dataFavorite.enterpriseID === undefined || dataFavorite.enterpriseID == null) return res.status(400).send("ID da Enterprise está undefined ou nulo")
    if (dataFavorite.favoriteLand === undefined || dataFavorite.favoriteLand == null) return res.status(400).send("Propriedade favorita está undefined ou nula")

    console.log("Dados recebidos:", dataFavorite);

    favoritesModel.createFavorites(dataFavorite)
        .then(function (resultado) {
            console.log("Resultado do banco:", resultado);

            if (resultado.affectedRows > 0) {
                return res.status(201).json({
                    message: "Terreno favoritado com sucesso"
                });
            } else {
                return res.status(500).json({
                    message: "Erro ao Favoritar Terreno",
                    warning: "Resposta do inesperada do banco",
                });
            }
        })
        .catch(function (erro) {
            return res.status(400).json({
                error: "Erro ao favoritar terreno",
                message: erro.sqlMessage || erro.message
            });
        })
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

async function searchFavoritesByUserId(req, res) {
    const userId = req.params.userID;
    const enterpriseId = req.params.enterpriseID;

    console.log("ID usúario:" + userId);
    console.log("ID empresa:" + enterpriseId);

    if (!userId) return res.status(400).send("userID está NULO ou undefined!")
    if (!enterpriseId) return res.status(400).send("enterpriseID está NULO ou undefined!")

    try {
        const favoritados = await favoritesModel.searchFavoritesByUserId(userId, enterpriseId)
        return res.status(200).json(favoritados)
    } catch (erro) {
        console.error("Erro ao deletar usuário:", erro);
        res.status(500).json({
            error: erro.sqlMessage || erro.message
        })
    }
}

function getFavoritesByUser(req, res) {
    const userID = req.params.userID;
    const enterpriseID = req.params.enterpriseID;

    if (userID === undefined) return res.status(400).send("IdUser está undefined ou nulo!")
    if (enterpriseID === undefined) return res.status(400).send("enterpriseID está undefined ou nulo!")

    favoritesModel.getFavoritesByUser(userID, enterpriseID)
        .then(function (resultado) {
            console.log("Favoritos retornados:", resultado);
            return res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.error("Erro ao buscar favoritos:", erro);
            return res.status(500).json({
                error: "Erro ao buscar favoritos",
                message: erro.message
            });
        });

}

module.exports = {
    createFavorite,
    searchFavoritesByUserId,
    editFavorite,
    deleteFavorite,
    getFavoritesByUser

};