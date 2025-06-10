var express = require("express");
var router = express.Router();
var districtController = require("../controllers/districtController");


router.get("/district/searchAllDistricts", function (req, res) {
    districtController.searchAllDistricts(req, res);
});


module.exports = router;