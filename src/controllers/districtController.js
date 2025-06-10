
var districtModel= require("../models/districtModel");


function searchAllDistricts(req, res){
    districtModel.searchAllDistricts()
        .then(function(districts) {
            res.status(200).json(districts);
        })
        .catch(function(error) {
            console.error("Erro ao buscar distritos:", error);
            res.status(500).json({ error: "Erro ao buscar distritos" });
        }); 
}

module.exports = {
   searchAllDistricts
};
