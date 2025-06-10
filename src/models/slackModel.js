let database = require('../database/config');

async function saveSlack(userId, cargoMecionado, canalSlack, enterpriseId) {
    const query = `INSERT INTO notificacao (canal, cargo, status, fk_usuario, fk_empresa, data_criacao, data_edicao) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;
    const values = [canalSlack, cargoMecionado, 1, userId, enterpriseId];

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
    const query = `UPDATE notificacao SET data_edicao = NOW(), canal = ?, cargo = ? WHERE id_notificacao = ?`;
    const values = [canalSlack, cargo, notificationID];

    try {
        return await database.execute(query, values);
    } catch (error) {
        console.error("Erro ao atualizar dados do Slack:", error);
        throw error;
    }
}

async function updateStatus(notificationID, status) {
    const query = `UPDATE notificacao SET status = ? WHERE id_notificacao = ?`;

    if (status) {
        status = 1;
    } else {
        status = 0;
    }

    const values = [status, notificationID];



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
    deleteSlack,
    updateStatus
}