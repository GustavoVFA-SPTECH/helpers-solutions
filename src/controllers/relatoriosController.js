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


module.exports = {
    relatorios
}