var express = require("express");
var router = express.Router();
var favoritesController = require("../controllers/favoritesController");


// POST
router.post("/favorites/create", function (req, res) {
    favoritesController.createFavorite(req, res);
})

// GET
router.get("/favorites/:id", function (req, res) {
  favoritesController.searchFavoritesByUserId(req, res);
});

// UPDATE
router.put("/favorites/edit/:userId/:oldDistrito", function (req, res) {
  favoritesController.editFavorite(req, res);
});

// DELETE
router.delete("/favorites/delete/:id", function (req, res) {
  favoritesController.deleteFavorite(req, res);
});

// GET
router.get("/favorites/user/:userID/:enterpriseID", function (req, res) {
    favoritesController.getFavoritesByUser(req,res)
})




module.exports = router;