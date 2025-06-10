var express = require("express");
var router = express.Router();
var favoritosController = require("../controllers/favoritesController");


// POST
router.post("/favorites/create", function (req, res) {
    favoritosController.createFavorite(req, res);
})

// GET
router.get("/favorites/:id", function (req, res) {
  favoritosController.searchFavoritesByUserId(req, res);
});

// UPDATE
router.put("/favorites/edit/:userId/:oldDistrito", function (req, res) {
  favoritosController.editFavorite(req, res);
});

// DELETE
router.delete("/favorites/delete/:id", function (req, res) {
  favoritosController.deleteFavorite(req, res);
});




module.exports = router;