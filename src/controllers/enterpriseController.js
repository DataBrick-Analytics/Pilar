
var enterpriseModel = require("../models/enterpriseModel");
const { saveUserActivity } = require('../externServices/userActivityService');


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
    var enterprise = req.body;

    if (!enterprise.email || !enterprise.senha) {
        return res.status(400).json({ error: "Email ou senha está undefined ou nulo!" });
    }

    enterpriseModel.autenticateEnterprise(enterprise)
        .then(async function (resultado) {
            if (resultado.length === 1) {
                const siteResponse = {
                    idEmpresa: resultado[0].id_empresa,
                    nomeEmpresa: resultado[0].nome,
                    email: resultado[0].email,
                    endereco: resultado[0].endereco,
                    telefone: resultado[0].telefone
                };

                const userActivityData = {
                    userActivityId: {
                        fkEnterprise: resultado[0].id_empresa,
                        userId: null,
                        idActivity: 1
                    }
                };

                try {
                    await saveUserActivity(userActivityData); 
                    console.log("Atividade registrada com sucesso!");
                } catch (error) {
                    console.error("Erro ao salvar atividade:", error.message);
                }

                return res.json(siteResponse);

            } else if (resultado.length === 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao localizar empresa:", erro);
            res.status(500).json({ error: erro.sqlMessage || erro.message });
        });
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