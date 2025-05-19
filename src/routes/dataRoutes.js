var express = require("express");
var router = express.Router();

var dataController = require("../controllers/dataController");

// router.post("/data", function (req, res) {
//     dataController.getPopulationRegionController(req, res);
// });

// router.post("/data", function (req, res) {
//     dataController.getPopulationRegionController(req, res);
// });

router.post("/data", function (req, res) {
    dataController.getRegionType(req, res);
});

module.exports = router;