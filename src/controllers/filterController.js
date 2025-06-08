var filterModel = require('../models/filterModel');

async function getRegionByFilter(req, res) {
    const filtros = req.body;

    if (filtros.size === undefined) return res.status(400).send("Tamanho está undefined ou nulo!")
    if (filtros.priceM2 === undefined) return res.status(400).send("Preço está undefined ou nulo!")
    if (filtros.zone === undefined) return res.status(400).send("Zona está undefined ou nula!")
    if (filtros.predominance === undefined) return res.status(400).send("Predominancia está undefined ou nula!")

    try {
        const filteredRegions = await filterModel.getRegionByFilter(filtros) || null
        if(filteredRegions !== null){
            return res.status(200).json(filteredRegions)
        }
    } catch (erro) {
        console.log(erro)
        console.log("Houve um erro ao filtrar as regiões.", erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
    }
}

module.exports = {
    getRegionByFilter
}