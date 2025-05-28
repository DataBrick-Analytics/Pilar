var express = require("express");
var router = express.Router();

var dataController = require("../controllers/dataController");

// router.post("/data", function (req, res) {
//     dataController.getPopulationRegionController(req, res);
// });

// router.post("/data", function (req, res) {
//     dataController.getPopulationRegionController(req, res);
// });

router.get("/data/getRegionType/:id", function (req, res) {
    dataController.getRegionType(req, res);
});

router.get("/data/getMediaByFifth/:id", function (req, res) {
    dataController.getMediaByFifth(req, res);
});

module.exports = router;