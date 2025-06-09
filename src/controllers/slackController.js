const slackModel = require('../models/slackModel');

async function saveSlack(req, res) {
    const userID = req.params.id;
    const cargo = req.body.cargo;
    const canalSlack = req.body.canalSlack;

    try {
        const slackParams = await slackModel.saveSlack(userID, cargo, canalSlack);
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

    try {
        const slackParams = await slackModel.updateSlack(notificationID);
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
    deleteSlack
}