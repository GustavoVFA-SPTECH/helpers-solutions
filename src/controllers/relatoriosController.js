var relatoriosModel = require("../models/relatoriosModel");

function relatorios(req, res) {
    
    relatoriosModel.relatorios()
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


function filtroRelatorios(req, res){
    const idSetor = req.body.setorServer;
    const inicio = req.body.inicioServer;
    const final = req.body.finalServer;

    relatoriosModel.relatorioFiltrado(idSetor, inicio, final)
    .then(function(resultado){
        res.json(resultado);
    }).catch(
        function(erro){
            console.log(erro);
        }
    )
}
function filtroMaquina(req, res){
    const idMaquina = req.body.maquinaServer;

    relatoriosModel.relatorioMaquina(idMaquina)
    .then(function(resultado){
        res.json(resultado);
    }).catch(
        function(erro){
            console.log(erro);
        }
    )
}

module.exports = {
    relatorios,
    filtroRelatorios,
    filtroMaquina
}