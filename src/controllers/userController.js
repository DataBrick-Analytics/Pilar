var userModel = require("../models/userModel");

function authenticateUser(req, res) {
    const user = req.body;

    if (!user.email || !user.senha) {
        return res.status(400).json({ 
            error: "Dados inválidos",
            message: "Email e senha são obrigatórios"
        });
    }

    userModel.authenticateUser(user.email, user.senha)
        .then(function (resultado) {
            if (resultado && resultado.auth) {
                return res.status(200).json({
                    message: "Usuário autenticado com sucesso",
                    usuario: {
                        id: resultado.usuario.id_usuario,
                        nome: resultado.usuario.nome,
                        email: resultado.usuario.email,
                        funcao_empresa: resultado.usuario.funcao_empresa,
                        fk_empresa: resultado.usuario.fk_empresa,
                        data_cadastro: resultado.usuario.data_cadastro
                    }
                });
            } else {
                return res.status(401).json({
                    error: "Autenticação falhou",
                    message: "Email ou senha inválidos"
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro na autenticação:", erro);
            return res.status(500).json({
                error: "Erro interno",
                message: "Erro ao realizar autenticação"
            });
        });
}


async function createUser(req, res) {
    const user = req.body;
    console.log("Dados recebidos:", user);

    try {
        // Validação de e-mail
        const emailJaExiste = await userModel.checkEmail(user.email);
        if (emailJaExiste.length > 0) {
            return res.status(400).json({
                error: "Email já cadastrado. Tente outro."
            });
        }

        // Validação de CPF
        const cpfJaExiste = await userModel.checkCpf(user.cpf);
        if (cpfJaExiste.length > 0) {
            return res.status(400).json({
                error: "CPF já cadastrado. Tente outro."
            });
        }

        // Criação do usuário
        const resultado = await userModel.createUser(user);

        if (resultado.affectedRows > 0) {
            return res.status(201).json({
                message: "Usuário criado com sucesso",
                usuario: {
                    nome: user.nome,
                    email: user.email,
                    fk_empresa: user.fk_empresa,
                    funcao_empresa: user.funcao_empresa,
                    data_nasc: user.data_nasc,
                    cpf: user.cpf
                }
            });
        } else {
            return res.status(500).json({
                message: "Erro ao criar usuário. Nenhuma linha foi afetada."
            });
        }

    } catch (erro) {
        console.error("Erro no banco:", erro);
        return res.status(500).json({
            error: "Erro ao criar usuário",
            message: erro.message
        });
    }
}

async function editUser(req, res) {
    const user = req.body;
    const id = req.params.id;
    console.log("ID:", id);
    console.log("Chego no controller, Dados recebidos:", user);

    if (!id) {
        return res.status(400).json({ error: "ID não fornecido" });
    }

    if (!user || !user.nome || !user.email || !user.senha || !user.cpf || !user.data_nasc) {
        return res.status(400).json({
            error: "Dados incompletos",
            message: "Todos os campos são obrigatórios",
        });
    }

    try {
        const emailResult = await userModel.checkEmailAndIdUser(user.email,id);
        if (
            emailResult.length > 0 &&
            emailResult[0].id_usuario !== Number(id)
        ) {
            return res.status(400).json({
                error: "Email já cadastrado para outro usuário",
            });
        }

        const cpfResult = await userModel.checkCpfAndIdUser(user.cpf,id);

        if (
            cpfResult.length > 0 &&
            cpfResult[0].id_usuario !== Number(id)
        ) {
            return res.status(400).json({
                error: "CPF já cadastrado para outro usuário",
            });
        }

        const resultado = await userModel.editUser(user, id);

        console.log("Resultado do banco:", resultado);

        if (resultado) {
            return res.status(200).json({
                message: "Usuário atualizado com sucesso",
                usuario: {
                    id: Number(id),
                    nome: user.nome,
                    email: user.email,
                    senha: user.senha,
                    cpf: user.cpf,
                    data_nasc: user.data_nasc,
                    funcao_empresa: user.funcao_empresa,
                },
            });
        } else {
            console.error("Resposta inesperada do banco.");
            return res.status(201).json({
                message: "Usuário atualizado com sucesso",
                warning: "Resposta do banco incompleta",
                usuario: {
                    id: Number(id),
                    nome: user.nome,
                    email: user.email,
                    senha: user.senha,
                    cpf: user.cpf,
                    data_nasc: user.data_nasc,
                },
            });
        }
    } catch (erro) {
        console.error("Erro ao atualizar usuário:", erro);
        return res.status(400).json({
            error: "Erro ao atualizar usuário",
            message: erro.sqlMessage || erro.message,
        });
    }
}


function deleteUser(req, res) {
    const id = req.params.id;
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

function searchUserById(req, res) {
    const id = req.params.id;
    console.log("ID usúario:", id);

    if (id == undefined || id == null) {
        return res.status(400).json({
            error: "O id está undefined ou nulo!"
        });
    }

    userModel.searchUserById(id)
        .then(infosUsuario => {
            if (infosUsuario) {
                return res.status(201).json({
                    nome: infosUsuario[0].nome,
                    email: infosUsuario[0].email,
                    cpf: infosUsuario[0].cpf,
                    data_nasc: infosUsuario[0].data_nasc,
                    senha: infosUsuario[0].senha,
                    funcao_empresa: infosUsuario[0].funcao_empresa
                })
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar o usuário:", erro);
            res.status(500).json({
                error: erro.sqlMessage || erro.message
            });
        });
}


async function checkPassword(req, res) {
    const { idUsuario, senha } = req.body;

    try {
        const resultado = await userModel.checkPassword(idUsuario, senha);

        if (resultado.length > 0) {
            res.status(200).json(1); // Senha válida
        } else {
            res.status(200).json(0); // Senha inválida
        }
    } catch (erro) {
        console.error("Erro ao validar senha:", erro);
        res.status(500).json({ erro: "Erro interno" });
    }
}


async function salvarValoresFormulario(req, res) {
    const valoresFormulario = req.body.valoresFormulario;
    const idUsuario = req.body.idUsuario;
    
    try {
        const resultado = await userModel.salvarValoresFormulario(valoresFormulario, idUsuario);
        return res.status(201).json({ message: "Escolhas salvas com sucesso!", resultado });
    } catch (erro) {
        console.error("Erro no Controller:", erro);
        return res.status(500).json({ message: "Erro ao salvar escolhas", erro });
    }
}

async function pegarValoresDistritosEscolhas(req, res) {
    const idUsuario = req.params.id;
    
    try {
        const resultado = await userModel.pegarValoresDistritosEscolhas(idUsuario);
        return res.status(201).json({ message: "Escolhas coletadas", resultado });
    } catch (erro) {
        console.error("Erro no Controller:", erro);
        return res.status(500).json({ message: "Erro ao realizar a coleta", erro });
    }
}

module.exports = {
    authenticateUser,
    createUser,
    editUser,
    deleteUser,
    searchUserById,
    checkPassword,
    salvarValoresFormulario,
    pegarValoresDistritosEscolhas
};