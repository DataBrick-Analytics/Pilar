const e = require("express");
var enterpriseModel = require("../models/enterpriseModel");

function createEnterprise(req, res) {
    var enterprise = req.body

    console.log("Dados recebidos:", enterprise);

    if (enterprise == undefined || enterprise == null) {
        return res.status(400).json({ error: "A empresa está undefined ou nula!" });
    }
    if (enterprise.nome == undefined || enterprise.nome == null) {
        return res.status(400).json({ error: "Nome está undefined ou nulo!" });
    }
    if (enterprise.endereco == undefined || enterprise.endereco == null) {
        return res.status(400).json({ error: "Endereço está undefined ou nulo!" });
    }
    if (enterprise.telefone == undefined || enterprise.telefone == null) {
        return res.status(400).json({ error: "Telefone está undefined ou nulo!" });
    }
    if (enterprise.email == undefined || enterprise.email == null) {
        return res.status(400).json({ error: "Email está undefined ou nulo!" });
    }
    if (enterprise.senha == undefined || enterprise.senha == null) {
        return res.status(400).json({ error: "Senha está undefined ou nula!" });
    }

    enterpriseModel.createEnterprise(enterprise)
        .then(function (resultado) {
            console.log('voltou pro then do controller')

            if (resultado) {
                return res.status(201).json({
                    message: "Empresa criada com sucesso",
                    id: resultado.insertId
                });
            } else {
                res.status(400).json({
                    error: "Erro ao criar empresa"
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao criar empresa:", erro);
            res.status(500).json({
                error: erro.sqlMessage || erro.message
            });
        });
}

function autenticateEnterprise(req, res) {
    var enterprise = req.body

    if (enterprise.email == undefined || enterprise.email == null) {
        return res.status(400).json({ error: "Email está undefined ou nulo!" });
    }
    if (enterprise.senha == undefined || enterprise.senha == null) {
        return res.status(400).json({ error: "Senha está undefined ou nula!" });
    }

    enterpriseModel.autenticateEnterprise(enterprise)
        .then(function (resultado) {
            if (resultado) {
                return res.status(200).json({
                    message: "Empresa localizada com sucesso!",
                    message: resultado,
                    id: resultado.id_empresa,
                    nome: resultado.nome,
                    email: resultado.email,
                    endereco: resultado.endereco,
                    telefone: resultado.telefone

                })
            } else {
                res.status(404).json({
                    message: "Não foi possível localizar a empresa"
                })
            }
        })
        .catch(function (erro) {
            console.error("Erro ao localizar empresa:", erro);
            res.status(500).json({
                error: erro.sqlMessage || erro.message
            });
        })
}

function editEnterprise(req, res) {
    var enterprise = req.body;
    var id = req.params.id;
    console.log("ID:", id);
    console.log("Dados recebidos:", enterprise);

    if (id == undefined || id == null) {
        return res.status(400).json({ error: "O id está undefined ou nulo!" });
    }
    if (enterprise == undefined || enterprise == null) {
        return res.status(400).json({ error: "A empresa está undefined ou nula!" });
    }
    if (enterprise.nome == undefined || enterprise.nome == null) {
        return res.status(400).json({ error: "Nome está undefined ou nulo!" });
    }
    if (enterprise.endereco == undefined || enterprise.endereco == null) {
        return res.status(400).json({ error: "Endereço está undefined ou nulo!" });
    }
    if (enterprise.telefone == undefined || enterprise.telefone == null) {
        return res.status(400).json({ error: "Telefone está undefined ou nulo!" });
    }
    if (enterprise.email == undefined || enterprise.email == null) {
        return res.status(400).json({ error: "Email está undefined ou nulo!" });
    }
    if (enterprise.senha == undefined || enterprise.senha == null) {
        return res.status(400).json({ error: "Senha está undefined ou nula!" });
    }

    enterpriseModel.editEnterprise(enterprise, id)
        .then(function (resultado) {
            res.status(200).json({
                message: "Empresa atualizada com sucesso",
                resultado: resultado
            });
        })
        .catch(function (erro) {
            console.error("Erro ao atualizar empresa:", erro);
            res.status(500).json({
                error: erro.sqlMessage || erro.message
            });
        });
}

function deleteEnterprise(req, res) {
    var id = req.params.id;
    console.log("ID para exclusão:", id);

    if (id == undefined || id == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    enterpriseModel.deleteEnterprise(id)
        .then(function (resultado) {
            res.status(200).json({
                message: "Empresa deletada com sucesso",
                resultado: resultado
            });
        })
        .catch(function (erro) {
            console.error("Erro ao deletar empresa:", erro);
            res.status(500).json({
                error: erro.sqlMessage || erro.message
            });
        });
}

module.exports = {
    createEnterprise,
    autenticateEnterprise,
    editEnterprise,
    deleteEnterprise
};