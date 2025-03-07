var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;

/*

    NÃO APAGUE ESSE ARQUIVO, ELE É RESPONSÁVEL POR DIRECIONAR PARA A HOME PAGE
    NÃO APAGUE ESSE ARQUIVO, ELE É RESPONSÁVEL POR DIRECIONAR PARA A HOME PAGE
    NÃO APAGUE ESSE ARQUIVO, ELE É RESPONSÁVEL POR DIRECIONAR PARA A HOME PAGE

*/