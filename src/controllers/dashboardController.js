var dashboardModel = require("../models/dashboardModel");

const getMaquina = async (req, res) => {
    try {
        const maquinas = await dashboardModel.getMaquinas();

        if(!maquinas){
            res.status(404).json({
                message: "Nenhuma maquina encontrada"
            })
        }else{
            res.status(200).json({
                data: maquinas
            })
        }
    } catch (error) {
        return error;
    }

}

const criarGrafico2 = async (req, res) => {
    const {idMaquina} = req.params;

    try {
        const registros = await dashboardModel.grafico2(idMaquina);

        if(!registros){
            res.status(404).json({
                message: "Nenhum registro encontrado"
            })
        }else{
            res.status(200).json({
                data: registros
            })
        }

    } catch (error) {
        return error
    }
}

module.exports = {
    criarGrafico2,
    getMaquina
}