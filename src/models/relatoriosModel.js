var database = require("../database/config")

function relatorios(){
    console.log("Deu certo o relatoriosModel");
    var instrucaoSql = `
    SELECT Horário as horario, Máquina as maquina, Temperatura as temp, stats FROM RegistroMaquina;
    `
    console.log("Chamando a instrucaoSql" + instrucaoSql)
    return database.executar(instrucaoSql);
}

module.exports = {
  relatorios
};