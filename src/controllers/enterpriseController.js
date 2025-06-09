var enterpriseModel = require("../models/enterpriseModel");
var userModel = require("../models/userModel");

function createEnterpriseAndUser(req, res) {
    const cadastro = req.body;

    console.log("Dados recebidos:", cadastro);

    if (cadastro.nomeFantasia === undefined || cadastro.nomeFantasia == null) {
        return res.status(400).json({error: "O nome da Empresa está undefined ou nula!"});
    }
    if (cadastro.cnpj === undefined || cadastro.cnpj == null) {
        return res.status(400).json({error: "CNPJ está undefined ou nulo!"});
    }
    if (cadastro.nomeUsuario === undefined || cadastro.nomeUsuario == null) {
        return res.status(400).json({error: "O nome do usuario está undefined ou nulo!"});
    }
    if (cadastro.cpf === undefined) {
        return res.status(400).json({error: "CPF está undefined ou nulo!"});
    }
    if (cadastro.email === undefined || cadastro.email == null) {
        return res.status(400).json({error: "Email está undefined ou nulo!"});
    }
    if (cadastro.senha === undefined || cadastro.senha == null) {
        return res.status(400).json({error: "Senha está undefined ou nula!"});
    }
    if (cadastro.dtNasc === undefined || cadastro.dtNasc == null) {
        return res.status(400).json({error: "Data de nascimento está undefined ou nula!"});
    }
    if (cadastro.razaoSocial === undefined || cadastro.razaoSocial == null) {
        return res.status(400).json({error: "Razão Social está undefined ou nula!"});
    }
    if (cadastro.uf === undefined || cadastro.uf == null) {
        return res.status(400).json({error: "UF está undefined ou nula!"});
    }
    if (cadastro.cep === undefined || cadastro.cep == null) {
        return res.status(400).json({error: "CEP está undefined ou nulo!"});
    }
    if (cadastro.rua === undefined || cadastro.rua == null) {
        return res.status(400).json({error: "Rua está undefined ou nula!"});
    }
    if (cadastro.numero === undefined || cadastro.numero == null) {
        return res.status(400).json({error: "Número está undefined ou nulo!"});
    }
    if (cadastro.complemento === undefined || cadastro.complemento == null) {
        return res.status(400).json({error: "Complemento está undefined ou nulo!"});
    }
    if (cadastro.bairro === undefined || cadastro.bairro == null) {
        return res.status(400).json({error: "Bairro está undefined ou nulo!"});
    }
    if (cadastro.cidade === undefined || cadastro.cidade == null) {
        return res.status(400).json({error: "Cidade está undefined ou nula!"});
    }
    if (cadastro.estado === undefined || cadastro.estado == null) {
        return res.status(400).json({error: "Estado está undefined ou nulo!"});
    }
    if (cadastro.telefone === undefined || cadastro.telefone == null) {
        return res.status(400).json({error: "Telefone está undefined ou nulo!"});
    }
    if (cadastro.dtNasc === undefined || cadastro.dtNasc == null) {
        return res.status(400).json({error: "dtNasc está undefined ou nula!"});
    }
    if (cadastro.razaoSocial === undefined || cadastro.razaoSocial == null) {
        return res.status(400).json({error: "Função está undefined ou nula!"});
    }

    enterpriseModel.createEnterpriseAndUser(cadastro)
        .then(function (resultado) {
            console.log('voltou pro then do controller')

            enterpriseModel.checkCnpj(cadastro.cnpj)
                .then((cnpjExistente) => {
                    if (cnpjExistente.length > 0) {
                        res.status(409).json({error: "CNPJ já cadastrado."});
                        return Promise.reject('CNPJ duplicado');
                    }
                    return enterpriseModel.checkRazaoSocialcnpj(cadastro.razaoSocial);
                })
                .then((razaoExistente) => {
                    if (razaoExistente.length > 0) {
                        res.status(409).json({error: "Razão Social já cadastrada."});
                        return Promise.reject('Razão Social duplicada');
                    }
                    return userModel.checkEmail(cadastro.email);
                })
                .then((emailExistente) => {
                    if (emailExistente.length > 0) {
                        res.status(409).json({error: "Email já cadastrado."});
                        return Promise.reject('Email duplicado');
                    }
                    return userModel.checkCpf(cadastro.cpf);
                })
                .then((cpfExistente) => {
                    if (cpfExistente.length > 0) {
                        res.status(409).json({error: "CPF já cadastrado."});
                        return Promise.reject('CPF duplicado');
                    }
                    return enterpriseModel.createEnterpriseAndUser(cadastro);
                })
                .then((resultado) => {
                    if (resultado) {
                        return res.status(201).json({
                            message: "Empresa e usuário criados com sucesso",
                            resultado: resultado
                        });
                    } else {
                        return res.status(400).json({
                            error: "Erro ao criar empresa",
                            message: "Empresa já cadastrada, não será necessário cadastrar novamente."
                        });
                    }
                })
                .catch((erro) => {
                    if (
                        erro === 'CNPJ duplicado' ||
                        erro === 'Razão Social duplicada' ||
                        erro === 'Email duplicado' ||
                        erro === 'CPF duplicado'
                    ) {
                        return;
                    }

                    console.error("Erro inesperado:", erro);
                    if (!res.headersSent) {
                        res.status(500).json({
                            error: erro.sqlMessage || erro.message || 'Erro interno'
                        });
                    }
                });
        })
}

function editEnterprise(req, res) {
    const enterprise = req.body;
    const id = req.params.id;
    console.log("ID:", id);
    console.log("Dados recebidos:", enterprise);

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
    const id = req.params.id;
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
    const fkEmpresa = req.params.id

    try {
        const allEmployees = await enterpriseModel.getEnterpriseEmployees(fkEmpresa)
        return res.status(200).json(allEmployees)
    } catch (erro) {
        console.log(erro)
        console.log("Houve um erro ao pegar os funcionários.", erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
    }
}

async function getEnterpriseById(req, res) {
    const idEnterprise = req.params.id;

    try {
        const enterpriseData = await enterpriseModel.getEnterpriseById(idEnterprise);
        return res.status(200).json(enterpriseData[0]);
    } catch (error) {
        console.error(error);
        console.error(`Houve um erro ao buscar pela empresa do ID ${idEnterprise}`);
        return res.status(500).json(error.sqlMessage);
    }
}

async function getEnterpriseAddress(req, res) {
    const idEnterprise = req.params.id;

    try {
        const enterpriseAddress = await enterpriseModel.getEnterpriseAddress(idEnterprise);
        return res.status(200).json(enterpriseAddress[0]);
    } catch (error) {
        console.error(error);
        console.error(`Houve um erro ao buscar pela empresa do ID ${idEnterprise}`);
        return res.status(500).json(error.sqlMessage);
    }
}

module.exports = {
    createEnterpriseAndUser,
    editEnterprise,
    deleteEnterprise,
    getEnterpriseEmployees,
    getEnterpriseById,
    getEnterpriseAddress
};
