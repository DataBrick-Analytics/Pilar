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

function createUser(req, res) {
    const user = req.body;
    console.log("Dados recebidos:", user);

    userModel.createUser(user)
        .then(function (resultado) {
            console.log("Resultado do banco:", resultado);
        
            if (resultado.affectedRows > 0) {
                return res.status(201).json({
                    message: "Usuário criado com sucesso",
                    usuario: {
                        nome: user.nome,
                        email: user.email,
                        fk_empresa: user.fk_empresa,
                        funcao_empresa: user.funcao_empresa
                    }
                });
            } else {
                console.error("Resposta inesperada do banco.");
                return res.status(500).json({ 
                    message: "Erro ao criar usuário",
                    warning: "Resposta do banco incompleta",
                });
            }
        })
        .catch(function (erro) {
            console.error("Erro no banco:", erro);
            return res.status(400).json({ 
                error: "Erro ao criar usuário",
                message: erro.sqlMessage || erro.message 
            });
        });
}

function editUser(req, res) {
    const user = req.body;
    const id = req.params.id;
    console.log("ID:", id);
    console.log("Dados recebidos:", user);

    // Validations
    if (!id) {
        return res.status(400).json({ error: "ID não fornecido" });
    }

    if (!user || !user.nome || !user.email || !user.senha || !user.cpf || !user.data_nasc) {
        return res.status(400).json({ 
            error: "Dados incompletos",
            message: "Todos os campos são obrigatórios" 
        });
    }

    userModel.editUser(user, id)
        .then(function (resultado) {
            console.log("Resultado do banco:", resultado);
            
            if (resultado) {
                return res.status(200).json({
                    message: "Usuário atualizado com sucesso",
                    usuario: {
                        id: user.id_usuario,
                        nome: user.nome,
                        email: user.email,
                        senha: user.senha,
                        cpf: user.cpf,
                        data_nasc: user.data_nasc
                    }
                });
            } else {
                console.error("Resposta inesperada do banco.");
                return res.status(201).json({ 
                    message: "Usuário atualizado com sucesso",
                    warning: "Resposta do banco incompleta",
                    usuario: {
                        id: user.id_usuario,
                        nome: user.nome,
                        email: user.email,
                        senha: user.senha,
                        cpf: user.cpf,
                        data_nasc: user.data_nasc
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

module.exports = {
    authenticateUser,
    createUser,
    editUser,
    deleteUser,
    searchUserById
};