var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/userController");

// POST
router.post("/user", function (req, res) {
  usuarioController.createUser(req, res);
})

// POST
router.post("/user/autenticar", function (req, res) {
    usuarioController.authenticateUser(req, res);
})

// UPDATE
router.put("/user/:id", function (req, res) {
  usuarioController.editUser(req, res);
});

// DELETE
router.delete("/user/:id", function (req, res) {
  usuarioController.deleteUser(req, res);
});

// GET
router.get("/user/:id", function (req, res) {
  usuarioController.searchUserById(req, res);
});



module.exports = router;