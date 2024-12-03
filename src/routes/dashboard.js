var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get('/setores/:idEmpresa', function (req, res) {
    dashboardController.getSetores(req, res)
})

router.get('/maquinas/:idSetor', function (req, res) {
    dashboardController.getMaquina(req, res)
})

router.get("/grafico3/:idMaquina", function (req, res) {
    dashboardController.criarGrafico3(req, res)
})

router.get("/grafico2/:idSetor", function (req, res) {
    dashboardController.criarGrafico2(req, res)
})


module.exports = router;