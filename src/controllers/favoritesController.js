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
            console.error("Erro no banco:", erro);
            return res.status(400).json({
                error: "Erro ao favoritar terreno",
                message: erro.sqlMessage || erro.message
            });
        })
}

// const alreadyFavorited = await favoritesModel.hasAlreadyFavorited(
//     fk_usuario,
//     fk_empresa,
//     fk_distrito
// );
// console.log("Já favoritado:", alreadyFavorited);

// if (alreadyFavorited) {
//     return res.status(409).json({
//         error: "Este item já foi favoritado por este usuário."
//     });
// }

//const countResult = await favoritesModel.countFavoritesByUser(fk_usuario);
//const total = countResult.total; // Access the total from the first row
//console.log("Total de favoritos do usuário:", total, "tipo:", typeof total);

//if (total >= 6) { // Changed to >= to properly enforce limit of 6
//    console.log("Limite de favoritos atingido. Total atual:", total);
//    return res.status(403).json({
//        error: "Limite de 6 favoritos atingido."
//    });
//}

//const result = await favoritesModel.createFavorite(favorite);
//
//if (result.affectedRows > 0) {
//    return res.status(201).json({
//        message: "Favorito criado com sucesso",
//        favorito: {
//            nome: favorite.nome,
//            fk_usuario: favorite.fk_usuario,
//            fk_empresa: favorite.fk_empresa,
//            fk_distrito: favorite.fk_distrito
//        }
//    });
//} else {
//    console.error("Resposta inesperada do banco.");
//    return res.status(500).json({
//        error: "Erro ao criar favorito",
//        message: "Resposta do banco incompleta"
//    });
//}


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

function searchFavoritesByUserId(req, res) {
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

function getFavoritesByUser(req, res) {
    const userID = req.params.userID;
    const enterpriseID = req.params.enterpriseID;

    if(userID === undefined) return res.status(400).send("IdUser está undefined ou nulo!")
    if(enterpriseID === undefined) return res.status(400).send("enterpriseID está undefined ou nulo!")

    favoritesModel.getFavoritesByUser(userID, enterpriseID)
        .then(function (resultado) {
            console.log("Favoritos retornados:", resultado);
            return res.status(200).json(resultado); // ✅ Retorna direto o array
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