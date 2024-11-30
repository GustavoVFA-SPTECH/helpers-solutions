var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


router.get("/dashboard", function (req, res) {
    dashboardController.dashboardTempAtual(req, res);
})

router.get("/dashboard", function (req, res) {
    dashboardController.dashboardTempMedia(req, res);
})

router.get("/grafico3S1", function (req, res) {
    dashboardController.dashboardTempInd1(req, res);
})

router.get("/grafico3S2", function (req, res) {
    dashboardController.dashboardTempInd2(req, res);
})

router.get("/grafico3S3", function (req, res) {
    dashboardController.dashboardTempInd3(req, res);
})

module.exports = router;