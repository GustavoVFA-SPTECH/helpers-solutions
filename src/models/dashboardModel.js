var database = require("../database/config");

const getSetores = async (idEmpresa) => {
  try {
    const setores = await database.executar(
      `SELECT idSetor, Nome FROM Setor WHERE fkEmpresa = ${idEmpresa}`
    );

    return setores;
  } catch (error) {
    return error;
  }
};

const grafico1 = async (opcao, setor) => {
  try {
    if (opcao == 1) {
      const registros =
        await database.executar(`select DATE_FORMAT(datahora, '%d/%m') as Data, truncate(avg(temperatura),0) as media 
                                                        from Registro 
                                                        join Maquina 
                                                        on fkMaquina = idMaquina
                                                        join Setor
                                                        on fkSetor = idSetor
                                                        where Setor.Nome COLLATE utf8mb4_bin = "${setor}"
                                                        group by Data 
                                                        order by Data desc 
                                                        limit 7;`);
      return registros;
    } else if (opcao == 2) {
      const registros =
        await database.executar(`select month(datahora) as Data, truncate(avg(temperatura),0) as media from Registro 
                                                        join Maquina 
                                                        on fkMaquina = idMaquina
                                                        join Setor
                                                        on fkSetor = idSetor
                                                        where Setor.Nome COLLATE utf8mb4_bin = "${setor}" and datahora >= '2024-01-01'
                                                        group by Data order by Data asc limit 12;`);
      return registros;
    } else if (opcao == 3) {
      const registros =
        await database.executar(`select year(datahora) as Data, truncate(avg(temperatura),0) as media from Registro 
                                                        join Maquina 
                                                        on fkMaquina = idMaquina
                                                        join Setor
                                                        on fkSetor = idSetor
                                                        where Setor.Nome COLLATE utf8mb4_bin = "${setor}"
                                                        group by Data order by Data ASC limit 12;`);
      return registros;
    }
  } catch (error) {
    return error;
  }
};

const grafico2 = async (idMaquina) => {
  try {
    const registros = await database.executar(
      `SELECT temperatura, tempMax, tempMinima, nome, dataHora FROM Registro JOIN Maquina ON fkMaquina = idMaquina WHERE fkMaquina = ${idMaquina} ORDER BY dataHora DESC LIMIT 1`
    );

    return registros;
  } catch (error) {
    return error;
  }
};

const getMaquinas = async (idSetor) => {
  try {
    const maquinas = await database.executar(
      `SELECT idMaquina, nome FROM Maquina WHERE fkSetor = ${idSetor}`
    );
    return maquinas;
  } catch (error) {
    return error;
  }
};

const getGrafico2 = async (idSetor) => {
  try {
    const [cont] = await database.executar(
      `SELECT count(*) as qtdSensor FROM Maquina WHERE fkSetor = ${idSetor}`
    );
    const qtd = cont.qtdSensor;

    if (!cont) {
    } else {
      const maquinas =
        await database.executar(`SELECT nome, temperatura, dataHora FROM registro
                    JOIN maquina ON fkMaquina = idMaquina
                    WHERE fkSetor = ${idSetor}
                    GROUP BY nome, temperatura, dataHora
                    ORDER BY dataHora DESC
                    LIMIT ${qtd}`);
      return maquinas;
    }
  } catch (error) {
    return error;
  }
};

const getKPI1 = async (idEmpresa) => {
  try {
    const [aquecimento] = await database.executar(`SELECT 
    COUNT(máquina) AS total_maquinas 
FROM 
    RegistroMaquina 
JOIN 
    setor 
ON 
    fkSetor = idSetor 
WHERE 
    fkEmpresa = ${idEmpresa}
    AND horário >= NOW() - INTERVAL 5 MINUTE 
    AND stats COLLATE utf8mb4_bin = 'Superaquecimento' 
GROUP BY 
    máquina, temperatura, nome, stats;
`);
    const qtd = aquecimento.total_maquinas;
    console.log(qtd);

    return qtd;
  } catch (error) {
    return error;
  }
};

const getKPI2 = async (idEmpresa) => {
  try {
    const [resfriar] = await database.executar(`SELECT 
    COUNT(máquina) AS total_maquinas 
FROM 
    RegistroMaquina 
JOIN 
    setor 
ON 
    fkSetor = idSetor 
WHERE 
    fkEmpresa = ${idEmpresa}
    AND horário >= NOW() - INTERVAL 5 MINUTE 
    AND stats COLLATE utf8mb4_bin = 'Resfriamento' 
GROUP BY 
    máquina, temperatura, nome, stats;
`);
    const qtd = resfriar.total_maquinas;
    console.log(qtd);
    return qtd;
  } catch (error) {
    return error;
  }
};

const getDataKPI1 = async (idEmpresa) => {
  try {
    const aquecimento = await database.executar(`WITH RankedTemperatures AS (
    SELECT 
        rm.máquina, 
        rm.temperatura, 
        s.nome, 
        rm.stats,
        ROW_NUMBER() OVER (
            PARTITION BY rm.máquina 
            ORDER BY rm.temperatura DESC
        ) AS row_num
    FROM 
        RegistroMaquina rm
    JOIN 
        setor s 
    ON 
        rm.fkSetor = s.idSetor
    WHERE 
        fkEmpresa = ${idEmpresa}
        AND rm.horário >= NOW() - INTERVAL 10 MINUTE
        AND rm.stats COLLATE utf8mb4_bin = 'Superaquecimento'
)
SELECT 
    máquina, 
    temperatura, 
    nome, 
    stats
FROM 
    RankedTemperatures
WHERE 
    row_num = 1;
`);
    return aquecimento;
  } catch (error) {
    return error;
  }
};

const getDataKPI2 = async (idEmpresa) => {
  try {
    const resfriar = await database.executar(`WITH RankedTemperatures AS (
    SELECT 
        rm.máquina, 
        rm.temperatura, 
        s.nome, 
        rm.stats,
        ROW_NUMBER() OVER (
            PARTITION BY rm.máquina 
            ORDER BY rm.temperatura DESC
        ) AS row_num
    FROM 
        RegistroMaquina rm
    JOIN 
        setor s 
    ON 
        rm.fkSetor = s.idSetor
    WHERE 
        fkEmpresa = ${idEmpresa}
        AND rm.horário >= NOW() - INTERVAL 10 MINUTE
        AND rm.stats COLLATE utf8mb4_bin = 'Resfriamento'
)
SELECT 
    máquina, 
    temperatura, 
    nome, 
    stats
FROM 
    RankedTemperatures
WHERE 
    row_num = 1;`);
    return resfriar;
  } catch (error) {
    return error;
  }
};


module.exports = {
  getMaquinas,
  grafico1,
  grafico2,
  getSetores,
  getGrafico2,
  getKPI1,
  getKPI2,
  getDataKPI1,
  getDataKPI2,
};
