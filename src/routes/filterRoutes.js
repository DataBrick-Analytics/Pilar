var express = require('express');
var router = express.Router();

var filterController = require('../controllers/filterController');

router.get("/filter/getRegionByFilter", (req, res) => {
    filterController.getRegionByFilter(req, res)
})

router.get("/filter/getRandomRegion", (req, res) => {
        filterController.getRandomRegion(req, res)
    }
)

module.exports = router;