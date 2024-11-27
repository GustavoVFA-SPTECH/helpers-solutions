var express = require("express");
var router = express.Router();

var relatoriosController = require("../controllers/relatoriosController");


router.get("/relatorios", function (req, res) {
    relatoriosController.relatorios(req, res);
})

module.exports = router;