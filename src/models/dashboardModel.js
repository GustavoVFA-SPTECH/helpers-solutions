var database = require("../database/config")



const grafico2 = async (idMaquina) => {

    try {
        const registros = await database.executar(`SELECT temperatura, tempMax, tempMinima, nome, dataHora FROM Registro JOIN Maquina ON fkMaquina = idMaquina WHERE fkMaquina = ${idMaquina}`)

        return registros;
    } catch (error) {
        return error
    }
    
}

const getMaquinas = async () =>{
    try {
        const maquinas = await database.executar(`SELECT idMaquina, nome FROM Maquina`)
        return maquinas;
        
    } catch (error) {
        return error
    }
}

module.exports = {
    getMaquinas,
    grafico2,
};