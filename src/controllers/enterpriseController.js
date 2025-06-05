
var enterpriseModel = require("../models/enterpriseModel");
const { saveUserActivity } = require('../externServices/userActivityService');


function createEnterpriseAndUser(req, res) {
    var cadastro = req.body

    console.log("Dados recebidos:", cadastro);

    if (cadastro.nomeEmpresa == undefined || cadastro.nomeEmpresa == null) {
        return res.status(400).json({ error: "O nome da Empresa está undefined ou nula!" });
    }
    if (cadastro.cnpj == undefined || cadastro.cnpj == null) {
        return res.status(400).json({ error: "CNPJ está undefined ou nulo!" });
    }
    if (cadastro.nomeUsuario == undefined || cadastro.nomeUsuario == null) {
        return res.status(400).json({ error: "O nome do usuario está undefined ou nulo!" });
    }
    if (cadastro.cpf == undefined || cadastro.cpf == null) {
        return res.status(400).json({ error: "CPF está undefined ou nulo!" });
    }
    if (cadastro.email == undefined || cadastro.email == null) {
        return res.status(400).json({ error: "Email está undefined ou nulo!" });
    }
    if (cadastro.senha == undefined || cadastro.senha == null) {
        return res.status(400).json({ error: "Senha está undefined ou nula!" });
    }
    if (cadastro.dtNasc == undefined || cadastro.dtNasc == null) {
        return res.status(400).json({ error: "dtNasc está undefined ou nula!" });
    }
    if (cadastro.funcao == undefined || cadastro.funcao == null) {
        return res.status(400).json({ error: "Função está undefined ou nula!" });
    }
    console.log(cadastro.dtNasc)
    
    enterpriseModel.createEnterpriseAndUser(cadastro)
        .then(function (resultado) {
            console.log('voltou pro then do controller')

            if (resultado) {
                return res.status(201).json({
                    message: "Model executado com sucesso",
                    resultado: resultado
                });
            } else {
                res.status(400).json({
                    error: "Erro ao criar empresa",
                    message: "Empresa já cadastrada, não será necessário cadastrar novamente."
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

async function getEnterpriseEmployees(req, res) {
    console.log("Acessando controller")
    const fkEmpresa = localStorage.getItem('EMPRESA_ID')
    
    try {
        const allEmployees = await enterpriseModel.getEnterpriseEmployees(fkEmpresa)
        return res.status(200).json(allEmployees)
    } catch (erro) {
            console.log(erro)
            console.log("Houve um erro ao pegar os funcionários.", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
    }
}

module.exports = {
    createEnterpriseAndUser,
    editEnterprise,
    deleteEnterprise,
    getEnterpriseEmployees
};
