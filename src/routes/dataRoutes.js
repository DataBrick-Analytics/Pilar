var express = require("express");
var router = express.Router();

var dataController = require("../controllers/dataController");

//KPIS
router.get("/data/getRegionType/:id", function (req, res) {
    dataController.getRegionType(req, res);
});

router.get("/data/getUrbanMeshDensity/:id", function (req, res) {
    dataController.getUrbanMeshDensity(req, res)
})

router.get("/data/getViolenceIndex/:id", function (req, res) {
    dataController.getViolenceIndex(req, res);
});


router.get("/data/getPriceSquareMeter/:id", function (req, res) {
    dataController.getPriceSquareMeter(req, res);
});

//GRAFICOS
router.get("/data/getPriceFluctuation/:id", function (req, res) {
    dataController.getPriceFluctuation(req, res)
})

router.get("/data/getMediaByFifth/:id", function (req, res) {
    dataController.getMediaByFifth(req, res);
});


//AUXILIARES
router.get("/data/getSchoolsRegion/:id", function (req, res) {
    dataController.getSchoolsRegion(req, res)
})

router.get("/data/getHospitalsByRegion/:id", function (req, res) {
    dataController.getHospitalsByRegion(req, res)
})

router.get("/data/getParksByRegion/:id", function (req, res) {
    dataController.getParksByRegion(req, res)
})




module.exports = router;