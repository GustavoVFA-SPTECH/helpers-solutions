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

function selectTempIndMaq1(){
    console.log("Deu certo o dashboardModel");
    var instrucaoSql = `
    SELECT r.temperatura AS Temperatura,
	m.tempMax AS 'TempMax',
    m.tempMinima AS 'TempMin',
    m.nome AS Maquina
    FROM registro AS r
    JOIN maquina AS m
    ON r.fkMaquina = m.idMaquina
    WHERE idMaquina = 1;
    `
    console.log("Chamando a instrucaoSql" + instrucaoSql)
    return database.executar(instrucaoSql);
}

function selectTempIndMaq2(){
    console.log("Deu certo o dashboardModel");
    var instrucaoSql = `
    SELECT r.temperatura AS Temperatura,
	m.tempMax AS 'TempMax',
    m.tempMinima AS 'TempMin',
    m.nome AS Maquina
    FROM registro AS r
    JOIN maquina AS m
    ON r.fkMaquina = m.idMaquina
    WHERE idMaquina = 2;
    `
    console.log("Chamando a instrucaoSql" + instrucaoSql)
    return database.executar(instrucaoSql);
}

function selectTempIndMaq3(){
    console.log("Deu certo o dashboardModel");
    var instrucaoSql = `
    SELECT r.temperatura AS Temperatura,
	m.tempMax AS 'TempMax',
    m.tempMinima AS 'TempMin',
    m.nome AS Maquina
    FROM registro AS r
    JOIN maquina AS m
    ON r.fkMaquina = m.idMaquina
    WHERE idMaquina = 3;
    `
    console.log("Chamando a instrucaoSql" + instrucaoSql)
    return database.executar(instrucaoSql);
}




module.exports = {
    selectTempAtual,
    selectTempMedia,
    selectTempIndMaq1,
    selectTempIndMaq2,
    selectTempIndMaq3,
};