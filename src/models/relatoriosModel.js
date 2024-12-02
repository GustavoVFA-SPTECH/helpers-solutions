var database = require("../database/config")

function relatorios(){
    var instrucaoSql = `
    SELECT Horário as horario, Máquina as maquina, Temperatura as temp, stats FROM RegistroMaquina ORDER BY Horário DESC;
    `
    console.log("Chamando a instrucaoSql" + instrucaoSql)
    return database.executar(instrucaoSql);
}

function relatorioFiltrado(idSetor, inicio, final){
    const log = database.executar(`SELECT Horário AS horario, Máquina AS maquina, Temperatura AS temp, stats FROM RegistroMaquina WHERE Horário BETWEEN '${inicio}' AND '${final}' AND fkSetor = ${idSetor} ORDER BY Horário DESC;
`)
    return log;
}

module.exports = {
  relatorios,
  relatorioFiltrado
};