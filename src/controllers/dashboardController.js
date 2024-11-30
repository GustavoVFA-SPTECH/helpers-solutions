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

function dashboardTempInd1(req, res) {
    
    dashboardModel.selectTempIndMaq1()
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

function dashboardTempInd2(req, res) {
    
    dashboardModel.selectTempIndMaq2()
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

function dashboardTempInd3(req, res) {
    
    dashboardModel.selectTempIndMaq3()
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
    dashboardTempInd1,
    dashboardTempInd2,
    dashboardTempInd3
}