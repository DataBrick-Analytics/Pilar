var express = require("express");
var router = express.Router();

var enterpriseController = require("../controllers/enterpriseController");

// INSERT
router.post("/enterprise", function (req, res) {
    enterpriseController.createEnterprise(req, res);
});

// UPDATE
router.put("/enterprise/:id", function (req, res) {
    enterpriseController.editEnterprise(req, res);
});

// DELETE
router.delete("/enterprise/:id", function (req, res) {
    enterpriseController.deleteEnterprise(req, res);
});

module.exports = router;