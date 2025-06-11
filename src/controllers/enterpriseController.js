var enterpriseModel = require("../models/enterpriseModel");
var userModel = require("../models/userModel");

async function createEnterpriseAndUser(req, res) {
    const cadastro = req.body;

    console.log("Dados recebidos:", cadastro);

    // Validações de campos obrigatórios sem usar for
    if (!cadastro.nomeFantasia) {
        return res.status(400).json({ error: "O nome da Empresa está undefined ou nulo!" });
    }
    if (!cadastro.cnpj) {
        return res.status(400).json({ error: "CNPJ está undefined ou nulo!" });
    }
    if (!cadastro.nomeUsuario) {
        return res.status(400).json({ error: "O nome do usuário está undefined ou nulo!" });
    }
    if (!cadastro.cpf) {
        return res.status(400).json({ error: "CPF está undefined ou nulo!" });
    }
    if (!cadastro.email) {
        return res.status(400).json({ error: "Email está undefined ou nulo!" });
    }
    if (!cadastro.senha) {
        return res.status(400).json({ error: "Senha está undefined ou nula!" });
    }
    if (!cadastro.dtNasc) {
        return res.status(400).json({ error: "Data de nascimento está undefined ou nula!" });
    }
    if (!cadastro.razaoSocial) {
        return res.status(400).json({ error: "Razão Social está undefined ou nula!" });
    }
    if (!cadastro.uf) {
        return res.status(400).json({ error: "UF está undefined ou nula!" });
    }
    if (!cadastro.cep) {
        return res.status(400).json({ error: "CEP está undefined ou nulo!" });
    }
    if (!cadastro.rua) {
        return res.status(400).json({ error: "Rua está undefined ou nula!" });
    }
    if (!cadastro.numero) {
        return res.status(400).json({ error: "Número está undefined ou nulo!" });
    }
    if (!cadastro.complemento) {
        return res.status(400).json({ error: "Complemento está undefined ou nulo!" });
    }
    if (!cadastro.bairro) {
        return res.status(400).json({ error: "Bairro está undefined ou nulo!" });
    }
    if (!cadastro.cidade) {
        return res.status(400).json({ error: "Cidade está undefined ou nula!" });
    }
    if (!cadastro.estado) {
        return res.status(400).json({ error: "Estado está undefined ou nulo!" });
    }
    if (!cadastro.telefone) {
        return res.status(400).json({ error: "Telefone está undefined ou nulo!" });
    }

    try {
        // Verificações de duplicidade
        const [cnpjExistente, razaoExistente, emailExistente, cpfExistente] = await Promise.all([
            enterpriseModel.checkCnpj(cadastro.cnpj),
            enterpriseModel.checkRazaoSocialcnpj(cadastro.razaoSocial),
            userModel.checkEmail(cadastro.email),
            userModel.checkCpf(cadastro.cpf)
        ]);

        if (cnpjExistente.length > 0) {
            return res.status(409).json({ error: "CNPJ já cadastrado." });
        }
        if (razaoExistente.length > 0) {
            return res.status(409).json({ error: "Razão Social já cadastrada." });
        }
        if (emailExistente.length > 0) {
            return res.status(409).json({ error: "Email já cadastrado." });
        }
        if (cpfExistente.length > 0) {
            return res.status(409).json({ error: "CPF já cadastrado." });
        }

        // Cadastro
        const resultado = await enterpriseModel.createEnterpriseAndUser(cadastro);

        return res.status(201).json({
            message: "Empresa e usuário criados com sucesso",
            resultado
        });

    } catch (erro) {
        console.error("Erro inesperado:", erro);
        return res.status(500).json({
            error: erro.sqlMessage || erro.message || 'Erro interno ao cadastrar empresa e usuário.'
        });
    }
}


function editEnterprise(req, res) {
    const enterprise = req.body;
    const id = req.params.id;

    console.log("ID:", id);
    console.log("Dados recebidos:", enterprise);

    // 1. Verificar se todos os campos obrigatórios estão presentes
    if (
        !id ||
        !enterprise.fantasyName ||
        !enterprise.socialReason ||
        !enterprise.street ||
        !enterprise.neighborhood ||
        !enterprise.cepCode ||
        !enterprise.city ||
        !enterprise.state ||
        !enterprise.number ||
        !enterprise.phone
    ) {
        return res.status(400).json({
            error: "Todos os campos são obrigatórios!"
        });
    }

    // Converter nomes dos campos
    const dadosConvertidos = {
        razao_social: enterprise.socialReason,
        nome_fantasia: enterprise.fantasyName,
        rua: enterprise.street,
        numero: enterprise.number,
        bairro: enterprise.neighborhood,
        cidade: enterprise.city,
        estado: enterprise.state,
        telefone: enterprise.phone
    };

    enterpriseModel.checkRazaoSocialAndEnterprise(dadosConvertidos.razao_social, id)
        .then((razaoExiste) => {
            if (razaoExiste.length > 0) {
                throw new Error("Já existe uma empresa com essa razão social.");
            }

            return enterpriseModel.editEnterprise(dadosConvertidos, id);
        })
        .then((resultado) => {
            res.status(200).json({
                message: "Empresa atualizada com sucesso",
                resultado: resultado
            });
        })
        .catch((erro) => {
            console.error("Erro ao atualizar empresa:", erro);
            res.status(400).json({
                error: erro.message || "Erro ao atualizar empresa"
            });
        });
}



function deleteEnterprise(req, res) {
    const idUser= req.params.idUser;


    console.log("ID para exclusão:", idUser);

    // if (idUser == "undefined" ||  idUser == "null") {
    //     return res.status(400).json({
    //         error: "O id está undefined ou nulo!"
    //     });
    // }

    enterpriseModel.deleteEnterprise(idUser)
        .then(function (resultado) {
            res.status(200).json({
                message: "Empresa deletada com sucesso",
                resultado: resultado
            });
        })
        .catch(function (erro) {
            console.error("Erro ao deletar empresa:", erro);
            res.status(500).json({
                error: erro.message
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
