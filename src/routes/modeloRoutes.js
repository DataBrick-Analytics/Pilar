var express = require("express");
var router = express.Router();

var modeloController = require("../controllers/modeloController");

// INSERT
router.post("/teste", function (req, res) {
  modeloController.insertBancoModelo(req, res);
})

// SELECT
router.get("/teste/:caminhoVariavel", function (req, res) {
  modeloController.selectBancoModelo(req, res);
});

// UPDATE
router.put("/teste/:caminhoVariavel", function (req, res) {
  modeloController.updateBancoModelo(req, res);
});

// DELETE
router.delete("/teste/:caminhoVariavel", function (req, res) {
  modeloController.deleteBancoModelo(req, res);
});

module.exports = router;