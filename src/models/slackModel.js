let database = require('../database/config');

async function saveSlack(userId, cargo, canalSlack) {
    const query = `INSERT INTO tabelaSlack (fk_usuario, cargo, canalSlack, data_criacao, data_edicao) VALUES (?, ?, ?, NOW(), NOW())`;
    const values = [userId, cargo, canalSlack];

    try {
        return await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao salvar dados do Slack:", error);
        throw error;
    }
}

async function getAllById(userId) {
    const query = `SELECT * FROM notificacao WHERE fk_usuario = ?`;
    const values = [userId];

    try {
        return await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao buscar dados do Slack:", error);
        throw error;
    }
}

async function updateSlack(canalSlack, cargo, notificationID) {
    const query = `UPDATE notificacao SET data_edicao = NOW(), canal = ?, usuario = ? WHERE id_notificacao = ?`;
    const values = [canalSlack, cargo, notificationID];

    try {
        return await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao atualizar dados do Slack:", error);
        throw error;
    }
}

async function deleteSlack(notificationID) {
    const query = `DELETE FROM notificacao WHERE id_notificacao = ?`;
    const values = [notificationID];

    try {
        return await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao deletar dados do Slack:", error);
        throw error;
    }
}

module.exports = {
    saveSlack,
    getAllById,
    updateSlack,
    deleteSlack
}