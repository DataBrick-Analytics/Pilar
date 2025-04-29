var userModel = require("../models/userModel");

function createUser(req, res) {
    var user = req.body;
    console.log("Dados recebidos:", user);

    if (user == undefined || user == null) {
        return res.status(400).json({ error: "O usuário está undefined ou nulo!" });
    }
    if (user.nome == undefined || user.nome == null) {
        return res.status(400).json({ error: "Seu nome está undefined ou nulo!" });
    }
    if (user.email == undefined || user.email == null) {
        return res.status(400).json({ error: "Seu email está undefined ou nulo!" });
    }
    if (user.senha == undefined || user.senha == null) {
        return res.status(400).json({ error: "Sua senha está undefined ou nula!" });
    }
    if (user.fk_empresa == undefined || user.fk_empresa == null) {
        return res.status(400).json({ error: "Sua empresa está undefined ou nula!" });
    }
    if (user.fk_funcao == undefined || user.fk_funcao == null) {
        return res.status(400).json({ error: "Sua função está undefined ou nula!" });
    }

    userModel.createUser(user)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                res.status(201).json({
                    message: "Usuário criado com sucesso",
                    id: resultado.insertId
                });
            } else {
                res.status(400).json({
                    error: "Erro ao criar usuário"
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao criar usuário:", erro);
            res.status(500).json({
                error: erro.sqlMessage || erro.message
            });
        });
}

function editUser(req, res) {
    var user = req.body;
    var id = req.params.id;
    console.log("ID:", id);
    console.log("Dados recebidos:", user);

    if (id == undefined || id == null) {
        return res.status(400).json({ error: "O id está undefined ou nulo!" });
    }
    if (id.length < 1) {
        return res.status(400).json({ error: "O id está vazio!" });
    }
    if (user == undefined || user == null) {
        return res.status(400).json({ error: "O usuário está undefined ou nulo!" });
    }
    if (user.nome == undefined || user.nome == null) {
        return res.status(400).json({ error: "Seu nome está undefined ou nulo!" });
    }
    if (user.email == undefined || user.email == null) {
        return res.status(400).json({ error: "Seu email está undefined ou nulo!" });
    }
    if (user.senha == undefined || user.senha == null) {
        return res.status(400).json({ error: "Sua senha está undefined ou nula!" });
    }
    if (user.fk_empresa == undefined || user.fk_empresa == null) {
        return res.status(400).json({ error: "Sua empresa está undefined ou nula!" });
    }
    if (user.fk_funcao == undefined || user.fk_funcao == null) {
        return res.status(400).json({ error: "Sua função está undefined ou nula!" });
    }

    userModel.editUser(user, id)
        .then(function (resultado) {
            res.status(200).json({
                message: "Usuário atualizado com sucesso",
                resultado: resultado
            });
        })
        .catch(function (erro) {
            console.error("Erro ao atualizar usuário:", erro);
            res.status(500).json({
                error: erro.sqlMessage || erro.message
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

module.exports = {
    createUser,
    editUser,
    deleteUser
};