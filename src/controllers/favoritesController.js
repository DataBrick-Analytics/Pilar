var favoritesModel = require("../models/favoritesModel");


function createFavorite(req, res) {
    const dataFavorite = req.body;

    if(dataFavorite.userID === undefined || dataFavorite.userID == null) return res.status(400).send("ID do Usuario está undefined ou nulo!")
    if(dataFavorite.enterpriseID === undefined || dataFavorite.enterpriseID == null) return res.status(400).send("ID da Enterprise está undefined ou nulo")
    if(dataFavorite.favoriteLand === undefined || dataFavorite.favoriteLand == null) return res.status(400).send("Propriedade favorita está undefined ou nula")

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
        });
}

function editUser(req, res) {
    var user = req.body;
    var id = req.params.id;
    console.log("ID:", id);
    console.log("Dados recebidos:", user);

    // Validations
    if (!id) {
        return res.status(400).json({ error: "ID não fornecido" });
    }

    if (!user || !user.nome || !user.email || !user.senha || !user.funcao_empresa || !user.fk_empresa) {
        return res.status(400).json({ 
            error: "Dados incompletos",
            message: "Todos os campos são obrigatórios" 
        });
    }

    userModel.editUser(user, id)
        .then(function (resultado) {
            console.log("Resultado do banco:", resultado);
            
            // Simplified check without destructuring
            if (resultado) {
                return res.status(200).json({
                    message: "Usuário atualizado com sucesso",
                    usuario: {
                        id: id,
                        nome: user.nome,
                        email: user.email,
                        funcao_empresa: user.funcao_empresa,
                        fk_empresa: user.fk_empresa
                    }
                });
            } else {
                console.error("Resposta inesperada do banco.");
                return res.status(201).json({ 
                    message: "Usuário atualizado com sucesso",
                    warning: "Resposta do banco incompleta",
                    usuario: {
                        id: id,
                        nome: user.nome,
                        email: user.email,
                        funcao_empresa: user.funcao_empresa,
                        fk_empresa: user.fk_empresa
                    }
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao atualizar usuário:", erro);
            return res.status(400).json({ 
                error: "Erro ao atualizar usuário",
                message: erro.sqlMessage || erro.message 
            });
        });
}


function deleteUser(req, res) {
    var id = req.params.id;
    console.log("ID para exclusão:", id);

    if (id == undefined || id == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    userModel.deleteUser(id)
        .then(function (resultado) {
            res.status(200).json({
                message: "Usuário deletado com sucesso",
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




function searchFavoriteByUserId (req, res) {
    var id = req.params.id;
    console.log("ID usúario:", id);

    if (id == undefined || id == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    favoritesModel.searchFavoriteByUserId(id)
        .then(function (resultado) {
            res.status(200).json({
                message: "Usuário encontrados com sucesso",
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
    editUser,
    deleteUser,
    searchFavoriteByUserId,
};