CREATE DATABASE Helpers;
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

CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45),
    numeroSerie VARCHAR(45)
);

INSERT INTO Sensor (Nome, numeroSerie) VALUES
('Sensor 1', 'SN123456'),
('Sensor 2', 'SN654321'),
('Sensor 3', 'SN456789'),
('Sensor 4', 'SN987654'),
('Sensor 5', 'SN321654');


CREATE TABLE Registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    Temperatura FLOAT,
    fkSensor INT,
    CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
);

INSERT INTO Registro (Temperatura, fkSensor) VALUES
(114.00, 1),
(20.00, 2),
(111.50, 3),
(110.00, 4),
(200.00, 5);

CREATE TABLE Maquina (
    idMaquina INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45),
    Tipo VARCHAR(45),
    tempMax DECIMAL(5, 2),
    Setor VARCHAR(45),
    fkEmpresa INT,
    CONSTRAINT fkMaquinaEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa),
    fkSensor INT,
    CONSTRAINT fkMaquinaSensor FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
);

INSERT INTO Maquina (Nome, Tipo, tempMax, Setor, fkEmpresa, fkSensor) VALUES
('Máquina A', 'Tipo A', 150.00, 'Setor A', 1, 1),
('Máquina B', 'Tipo B', 150.00, 'Setor B', 2, 2),
('Máquina B', 'Tipo B', 150.00, 'Setor B', 2, 3),
('Máquina A', 'Tipo A', 150.00, 'Setor A', 1, 4),
('Máquina B', 'Tipo B', 150.00, 'Setor B', 2, 5);


SELECT * FROM Registro;

-- Select do registro com maquina
SELECT r.temperatura as Temperatura, r.dataHora as "Horario Registro", m.nome as Maquina
FROM Registro as r
JOIN Sensor as s
ON r.fkSensor = s.idSensor
JOIN Maquina as m
ON m.fkSensor = s.idSensor;

-- Select do registro com maquina e empresa dona
SELECT r.temperatura as Temperatura, r.dataHora as "Horario Registro", m.nome as Maquina, e.razaoSocial as Empresa
FROM Registro as r
JOIN Sensor as s
ON r.fkSensor = s.idSensor
JOIN Maquina as m
ON m.fkSensor = s.idSensor
JOIN Empresa as e
ON m.fkEmpresa = e.idEmpresa;

-- Select com concat e formatação de data
SELECT CONCAT('A ', m.nome, ' atingiu: ', r.temperatura, 'ºC às: ', DATE_FORMAT(r.dataHora, '%H:%i:%s'), ' do dia: ', DATE_FORMAT(r.dataHora, '%d/%m/%Y')) AS Mensagem
FROM Registro as r
JOIN Sensor as s
ON r.fkSensor = s.idSensor
JOIN Maquina as m
ON m.fkSensor = s.idSensor;

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
JOIN Sensor as s
ON r.fkSensor = s.idSensor
JOIN Maquina as m
ON m.fkSensor = s.idSensor;

select Horário, Máquina, Temperatura, stats from RegistroMaquina;