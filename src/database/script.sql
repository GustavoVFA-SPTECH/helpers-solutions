CREATE DATABASE IF NOT EXISTS Helpers ;
USE Helpers;

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    telefone CHAR(11),
    email VARCHAR(70) NOT NULL,
    userName VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    responsavel VARCHAR(45) NOT NULL
);

INSERT INTO Empresa (razaoSocial, CNPJ, telefone, email, userName, senha, responsavel
) VALUES
('Empresa A', '12345678000195', '1234567890', 'contato@empresaa.com', 'Usuario1', 'Urubu@100', 'João Silva'),
('Empresa B', '98765432000198', '0987654321', 'contato@empresab.com', 'Usuario2', 'Urubu@200', 'Maria Oliveira');

CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    CEP CHAR(8),
    Logradouro VARCHAR(100),
    Numero VARCHAR(45),
    Complemento VARCHAR(45),
    Bairro VARCHAR(45),
    Cidade VARCHAR(45),
    Estado VARCHAR(45),
    fkEmpresaEnd INT,
    CONSTRAINT fkEmpresaEnd FOREIGN KEY (fkEmpresaEnd) REFERENCES Empresa (idEmpresa)
);

select * from Endereco;

INSERT INTO Endereco (CEP, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, fkEmpresaEnd) VALUES
('12345678', 'Rua A', '100', 'Apto 101', 'Bairro A', 'Cidade A', 'Estado A', 1),
('87654321', 'Rua B', '200', '', 'Bairro B', 'Cidade B', 'Estado B', 2);


CREATE TABLE Acesso (
    idAcesso INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkEmpresa INT,
    CONSTRAINT fkAcessoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Setor(
idSetor INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
fkEmpresa INT,
CONSTRAINT fkSetorEmpresa FOREIGN KEY (fkEmpresa)
	REFERENCES empresa(idEmpresa)
);

CREATE TABLE Maquina (
    idMaquina INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45),
    Tipo VARCHAR(45),
    tempMax DECIMAL(5, 2),
    tempMinima DECIMAL (5, 2),
    fkSetor INT,
    CONSTRAINT fkMaquinaSetor FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor)
);


CREATE TABLE Registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    Temperatura FLOAT,
    fkMaquina INT,
    CONSTRAINT fkRegistroMaquina FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina)
);

INSERT INTO Setor (Nome, fkEmpresa) VALUES
('Setor A', 1),
('Setor B', 2);

INSERT INTO Maquina (Nome, Tipo, tempMax, fkSetor) VALUES
('Máquina A', 'Tipo A', 150.00, 1),
('Máquina B', 'Tipo B', 150.00, 2),
('Máquina B', 'Tipo B', 150.00, 2),
('Máquina A', 'Tipo A', 150.00, 1),
('Máquina B', 'Tipo B', 150.00, 2);

INSERT INTO Registro (Temperatura, fkMaquina) VALUES
(114.00, 1),
(20.00, 2),
(111.50, 3),
(110.00, 4),
(200.00, 5);


SELECT * FROM Registro;

-- Select do registro com maquina
SELECT r.temperatura as Temperatura, r.dataHora as "Horario Registro", m.nome as Maquina
FROM Registro as r
JOIN Maquina as m
JOIN Setor
ON m.fkSetor = setor.idSetor;

-- Select do registro com maquina e empresa dona
SELECT r.temperatura as Temperatura, r.dataHora as "Horario Registro", m.nome as Maquina, e.razaoSocial as Empresa
FROM Registro as r
JOIN Maquina as m
JOIN Setor
ON m.fkSetor = setor.idSetor
JOIN Empresa as e
ON setor.fkEmpresa = e.idEmpresa;

-- Select com concat e formatação de data
SELECT CONCAT('A ', m.nome, ' atingiu: ', r.temperatura, 'ºC às: ', DATE_FORMAT(r.dataHora, '%H:%i:%s'), ' do dia: ', DATE_FORMAT(r.dataHora, '%d/%m/%Y')) AS Mensagem
FROM Registro as r
JOIN Maquina as m
ON r.fkMaquina = m.idMaquina;

-- VIEW
CREATE VIEW RegistroMaquina
as
SELECT r.temperatura as Temperatura, r.dataHora as Horário, m.nome as Máquina,
CASE
WHEN Temperatura < 100
THEN 'Resfriamento'
WHEN Temperatura < 140
THEN 'OK'
ELSE 'Superaquecimento'
END AS Stats
FROM Registro as r
JOIN Maquina as m
ON r.fkMaquina = m.idMaquina;

select Horário, Máquina, Temperatura, stats from RegistroMaquina;