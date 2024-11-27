var dashboardModel = require("../models/dashboardModel");

function dashboard(req, res) {
    
    dashboardModel.dashboard()
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
    dashboard
}