var express = require("express");
var router = express.Router();

var favoritosController = require("../controllers/favoritesController");


// POST
router.post("/favorite/create", function (req, res) {
    favoritosController.authenticateUser(req, res);
})

// GET
router.get("favorite/:id", function (req, res) {
  favoritosController.searchFavoriteByUserId(req, res);
});

// UPDATE
router.put("/favorite/:id", function (req, res) {
  favoritosController.editUser(req, res);
});

// DELETE
router.delete("/favorite/:id", function (req, res) {
  favoritosController.deleteUser(req, res);
});




module.exports = router;