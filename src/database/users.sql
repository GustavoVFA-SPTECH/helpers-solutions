USE Helpers;


-- Usuario de inserção VM
CREATE USER 'Inserir'@'%' IDENTIFIED BY 'Inserir#DB2024';

GRANT ALL PRIVILEGES ON *.* TO 'Inserir'@'%' WITH GRANT OPTION;

-- Usuario geral Banco de Dados
CREATE USER 'Helpers'@'%' IDENTIFIED BY 'Helpers#BD2024';

GRANT ALL PRIVILEGES ON *.* TO 'Helpers'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;




SELECT 
    P.nome AS Jogador,
    C.Server AS Servidor,
    CL.nome AS Classe,
    CL.subClasse AS Subclasse,
    GROUP_CONCAT(I.nomeEquipamento SEPARATOR ', ') AS Equipamentos, 
    G.nomeGuilda AS Guilda,
    CASE 
        WHEN G.nomeGuilda IS NOT NULL THEN PL.nome
        ELSE 'Sem guilda'
    END AS Lider_Guilda, 
    GROUP_CONCAT(DISTINCT A1.nome SEPARATOR ', ') AS Amigos
FROM 
    Pessoa P
JOIN Perfil PF
    ON P.idPessoa = PF.idPessoa
LEFT JOIN Conexão CN
    ON PF.idPessoa = CN.idPessoa AND PF.idVersão = CN.idVersão
LEFT JOIN Server C
    ON CN.idMundo = C.idServer
LEFT JOIN Classe CL
    ON PF.fkClasse = CL.idClasse
LEFT JOIN Item I
    ON PF.idPessoa = I.idPessoa AND PF.idVersão = I.idVersão
LEFT JOIN Guilda G
    ON PF.fkGuilda = G.idGuilda
LEFT JOIN Pessoa PL
    ON G.fkPessoaLíder = PL.idPessoa
LEFT JOIN Amigos AM
    ON PF.idPessoa = AM.Perfil_idPessoa1 AND PF.idVersão = AM.Perfil_idVersão1
LEFT JOIN Pessoa A1
    ON AM.Perfil_idPessoa2 = A1.idPessoa
WHERE 
    P.idPessoa = ? -- Substitua "?" pelo ID específico do jogador
GROUP BY 
    P.nome, C.Server, CL.nome, CL.subClasse, G.nomeGuilda, PL.nome 
ORDER BY 
    P.nome ASC, C.Server ASC; 
