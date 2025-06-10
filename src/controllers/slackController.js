const slackModel = require('../models/slackModel');

async function saveSlack(req, res) {
    const userID = req.params.id;
    const cargo = req.body.cargo;
    const canalSlack = req.body.canalSlack;
    const enterpriseId = req.body.enterpriseId;

    try {
        const slackParams = await slackModel.saveSlack(userID, cargo, canalSlack, enterpriseId);
        return res.status(200).json(slackParams);
    } catch (error) {
        console.error("Erro ao salvar dados do Slack:", error);
        return res.status(500).json(error);
    }
}

async function getAllById(req, res) {
    const userID = req.params.id;

    try {
        const slackParams = await slackModel.getAllById(userID);
        return res.status(200).json(slackParams);
    } catch (error) {
        console.error("Erro ao buscar dados do Slack:", error);
        return res.status(500).json(error);
    }
}

async function updateSlack(req, res) {
    const notificationID = req.params.id;
    const canal  = req.body.canal;
    const cargo = req.body.cargo;

    try {
        const slackParams = await slackModel.updateSlack(canal, cargo, notificationID);
        return res.status(200).json(slackParams);
    } catch (error) {
        console.error("Erro ao buscar dados do Slack:", error);
        return res.status(500).json(error);
    }
}

async function updateStatus(req, res) {
    const notificationID = req.params.id;
    const status = req.body.status;

    try {
        const slackParams = await slackModel.updateStatus(notificationID, status);
        return res.status(200).json(slackParams);
    } catch (error) {
        console.error("Erro ao buscar dados do Slack:", error);
        return res.status(500).json(error);
    }
}

async function deleteSlack(req, res) {
    const notificationID = req.params.id;

    try {
        const slackParams = await slackModel.deleteSlack(notificationID);
        return res.status(200).json(slackParams);
    } catch (error) {
        console.error("Erro ao buscar dados do Slack:", error);
        return res.status(500).json(error);
    }
}

module.exports = {
    saveSlack,
    getAllById,
    updateSlack,
    deleteSlack,
    updateStatus
}