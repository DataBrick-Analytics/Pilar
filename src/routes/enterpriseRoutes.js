var express = require("express");
var router = express.Router();

var enterpriseController = require("../controllers/enterpriseController");

// INSERT
router.post("/enterprise/cadastrar", function (req, res) {
    enterpriseController.createEnterprise(req, res);
});

// SELECT
router.post("/enterprise/autenticar", function (req, res) {
    enterpriseController.autenticateEnterprise(req, res);
})

// UPDATE
router.put("/enterprise/:id", function (req, res) {
    enterpriseController.editEnterprise(req, res);
});

// DELETE
router.delete("/enterprise/:id", function (req, res) {
    enterpriseController.deleteEnterprise(req, res);
});

module.exports = router;