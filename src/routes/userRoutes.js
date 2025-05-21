var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/userController");

// INSERT
router.post("/user", function (req, res) {
  usuarioController.createUser(req, res);
})

// INSERT
router.post("/user/autenticar", function (req, res) {
    usuarioController.authenticateUser(req, res);
})

// SELECT
router.get("/AllUsers/:id", function (req, res) {
  usuarioController.serchUserByEnterpriseId(req, res);
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