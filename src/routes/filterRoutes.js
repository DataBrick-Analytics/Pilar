var express = require('express');
var router = express.Router();

var filterController = require('../controllers/filterController');

router.get("/filter", (req,res) => {
    filterController.getRegionByFilter(req,res)
})

module.exports = router;