var database = require("../database/config")

const getSetores = async (idEmpresa) => {
    try {
        const setores = await database.executar(`SELECT idSetor, Nome FROM Setor WHERE fkEmpresa = ${idEmpresa}`)

        return setores;
    } catch (error) {
        return error
    }
}

const grafico1 = async (opcao,setor) => {

    try {
        if(opcao == 1){
            const registros = await database.executar(`select DATE_FORMAT(datahora, '%d/%m') as Data, truncate(avg(temperatura),0) as media 
                                                        from Registro 
                                                        join Maquina 
                                                        on fkMaquina = idMaquina
                                                        join Setor
                                                        on fkSetor = idSetor
                                                        where Setor.Nome = "${setor}"
                                                        group by Data 
                                                        order by Data desc 
                                                        limit 7;`)    
            return registros;
        }else if(opcao == 2){
            const registros = await database.executar(`select month(datahora) as Data, truncate(avg(temperatura),0) as media from Registro 
                                                        join Maquina 
                                                        on fkMaquina = idMaquina
                                                        join Setor
                                                        on fkSetor = idSetor
                                                        where Setor.Nome = "${setor}" and datahora >= '2024-01-01'
                                                        group by Data order by Data asc limit 12;`)    
            return registros;            
        }else if(opcao == 3){
            const registros = await database.executar(`select year(datahora) as Data, truncate(avg(temperatura),0) as media from Registro 
                                                        join Maquina 
                                                        on fkMaquina = idMaquina
                                                        join Setor
                                                        on fkSetor = idSetor
                                                        where Setor.Nome = "${setor}"
                                                        group by Data order by Data ASC limit 12;    `)    
            return registros;
        }
    } catch (error) {
        return error
    }    
}

const grafico2 = async (idMaquina) => {

    try {
        const registros = await database.executar(`SELECT temperatura, tempMax, tempMinima, nome, dataHora FROM Registro JOIN Maquina ON fkMaquina = idMaquina WHERE fkMaquina = ${idMaquina} ORDER BY dataHora DESC LIMIT 1`)

        return registros;
    } catch (error) {
        return error
    }
    
}

const getMaquinas = async (idSetor) =>{
    try {
        const maquinas = await database.executar(`SELECT idMaquina, nome FROM Maquina WHERE fkSetor = ${idSetor}`)
        return maquinas;
        
    } catch (error) {
        return error
    }
}

const getGrafico2 = async (idSetor) => {
    try {
        const [cont] = await database.executar(`SELECT count(*) as qtdSensor FROM Maquina WHERE fkSetor = ${idSetor}`);
        const qtd = cont.qtdSensor

        if(!cont){

        }else{
            const maquinas = await database.executar(`SELECT nome, temperatura, dataHora FROM registro
                    JOIN maquina ON fkMaquina = idMaquina
                    WHERE fkSetor = ${idSetor}
                    GROUP BY nome, temperatura, dataHora
                    ORDER BY dataHora DESC
                    LIMIT ${qtd}`)
                    return maquinas
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    getMaquinas,
    grafico1,
    grafico2,
    getSetores,
    getGrafico2
};