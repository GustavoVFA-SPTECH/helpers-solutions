var database = require("../database/config")

function relatorios(){
    console.log("Deu certo o relatoriosModel");
    var instrucaoSql = `
    SELECT Horário, Máquina, Temperatura, stats FROM RegistroMaquina;
    `
    console.log("Chamando a instrucaoSql" + instrucaoSql)
    return database.executar(instrucaoSql);
}

module.exports = {
  relatorios
};