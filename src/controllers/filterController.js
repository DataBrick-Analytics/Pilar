const filterModel = require('../models/filterModel');


async function getRegionByFilter(req, res) {
    try {
        const {
            precoMin,
            violenciaMax,
            densidadeMax,
            zona
        } = req.body;

        const filtros = {
            precoMin: precoMin !== undefined ? Number(precoMin) : undefined,
            violenciaMax: violenciaMax !== undefined ? Number(violenciaMax) : undefined,
            densidadeMax: densidadeMax !== undefined ? Number(densidadeMax) : undefined,
            zona: zona || undefined
        };

        // Validação básica
        if (
            (filtros.precoMin !== undefined && isNaN(filtros.precoMin)) ||
            (filtros.violenciaMax !== undefined && isNaN(filtros.violenciaMax)) ||
            (filtros.densidadeMax !== undefined && isNaN(filtros.densidadeMax))
        ) {
            return res.status(400).json({erro: "Parâmetros numéricos inválidos"});
        }

        // Chamada do model
        const distritos = await filterModel.getRegionByFilter(filtros);

        res.status(200).json(distritos);
    } catch (erro) {
        console.error("Erro ao filtrar distritos:", erro);
        res.status(500).json({erro: "Erro interno ao buscar distritos"});
    }
}


async function getRandomRegion(req, res) {
    try {
        const distritos = await filterModel.getRandomRegion();
        res.status(200).json(distritos);
    } catch (erro) {
        console.error("Erro ao filtrar distritos:", erro);
        res.status(500).json({erro: "Erro interno ao buscar distritos"});
    }
}

module.exports = {
    getRegionByFilter,
    getRandomRegion
}