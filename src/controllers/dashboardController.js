var dashboardModel = require("../models/dashboardModel");

function dashboardTempAtual(req, res) {
    
    dashboardModel.selectTempAtual()
    .then(
        function(resultado){
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a consulta!",
                    erro.slqMessege
                );
                res.status(500).json(erro.slqMessege0);
            })
}

function dashboardTempMedia(req, res) {
    
    dashboardModel.selectTempMedia()
    .then(
        function(resultado){
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a consulta!",
                    erro.slqMessege
                );
                res.status(500).json(erro.slqMessege0);
            })
}

function dashboardTempInd(req, res) {
    
    dashboardModel.selectTempInd()
    .then(
        function(resultado){
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a consulta!",
                    erro.slqMessege
                );
                res.status(500).json(erro.slqMessege0);
            })
}

module.exports = {
    dashboardTempAtual,
    dashboardTempMedia,
    dashboardTempInd
}