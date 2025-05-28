var express = require("express");
var router = express.Router();

var dataController = require("../controllers/dataController");

// router.post("/data", function (req, res) {
//     dataController.getPopulationRegionController(req, res);
// });

// router.post("/data", function (req, res) {
//     dataController.getPopulationRegionController(req, res);
// });

router.get("/data/getRegionType", function (req, res) {
    dataController.getRegionType(req, res);
});

router.get("/data/getDensidadeUrbana", function (req, res) {
    dataController.getDensidadeUrbana(req, res)
})

router.get("/data/getEscolasRegiao", function (req, res) {
    dataController.getEscolasRegiao(req, res)
})

router.get("/data/getHospitaisRegiao", function (req, res) {
    dataController.getHospitalRegiao(req, res)
})

module.exports = router;