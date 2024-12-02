var express = require("express");
var router = express.Router();

var relatoriosController = require("../controllers/relatoriosController");


router.get("/relatorios", function (req, res) {
    relatoriosController.relatorios(req, res);
})

router.post("/filtrado", function(req, res){
    relatoriosController.filtroRelatorios(req, res)
})

module.exports = router;