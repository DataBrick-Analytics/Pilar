var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/userController");

// INSERT
router.post("/user", function (req, res) {
  usuarioController.createUser(req, res);
})

// SELECT
router.get("/user/:id", function (req, res) {
  usuarioController.selectBancoModelo(req, res);
});

// UPDATE
router.put("/user/:id", function (req, res) {
  usuarioController.editUser(req, res);
});

// DELETE
router.delete("/user/:id", function (req, res) {
  usuarioController.deleteUser(req, res);
});

module.exports = router;