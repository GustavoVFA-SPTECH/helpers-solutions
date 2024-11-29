var database = require("../database/config")

function selectTempAtual(){
    console.log("Deu certo o dashboardModel");
    var instrucaoSql = `
    SELECT r.temperatura AS Temperatura,
    m.nome AS Maquina
    FROM registro AS r
    JOIN maquina AS m
    ON r.fkMaquina = m.idMaquina;
    `
    console.log("Chamando a instrucaoSql" + instrucaoSql)
    return database.executar(instrucaoSql);
}

function selectTempMedia(){
    console.log("Deu certo o dashboardModel");
    var instrucaoSql = `
    SELECT TRUNCATE(AVG(r.temperatura) ,2) AS Temperatura,
    m.nome AS Maquina
    FROM registro AS r
    JOIN maquina AS m
    ON r.fkMaquina = m.idMaquina
    GROUP BY maquina;
    ` 


    console.log("Chamando a instrucaoSql" + instrucaoSql)
    return database.executar(instrucaoSql);
}

function selectTempInd(){
    console.log("Deu certo o dashboardModel");
    var instrucaoSql = `
    SELECT r.temperatura AS Temperatura,
	m.tempMax AS 'TempMax',
    m.tempMinima AS 'TempMin',
    m.nome AS Maquina
    FROM registro AS r
    JOIN maquina AS m
    ON r.fkMaquina = m.idMaquina;
    `
    console.log("Chamando a instrucaoSql" + instrucaoSql)
    return database.executar(instrucaoSql);
}




module.exports = {
    selectTempAtual,
    selectTempMedia,
    selectTempInd
};