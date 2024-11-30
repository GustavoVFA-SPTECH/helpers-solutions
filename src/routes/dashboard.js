var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get('/setores/:idEmpresa', function (req, res) {
    dashboardController.getSetores(req, res)
})

router.get('/maquinas', function (req, res) {
    dashboardController.getMaquina(req, res)
})

router.get("/grafico2/:idMaquina", function (req, res) {
    dashboardController.criarGrafico2(req, res)
})

module.exports = router;