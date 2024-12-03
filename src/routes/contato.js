var express = require("express");
var router = express.Router();

var contatoController = require("../controllers/contatoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/contatar", function (req, res) {
    console.log("AQUIUI")
    contatoController.contatar(req, res);
})

module.exports = router;