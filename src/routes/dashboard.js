var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


router.get("/dashboard", function (req, res) {
    dashboardController.dashboardTempAtual(req, res);
})

router.get("/dashboard", function (req, res) {
    dashboardController.dashboardTempMedia(req, res);
})

router.get("/dashboard", function (req, res) {
    dashboardController.dashboardTempInd(req, res);
})

module.exports = router;