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

INSERT INTO Empresa (razaoSocial, CNPJ, email, responsavel
) VALUES
('Empresa A', '12345678000195', 'contato@empresaa.com', 'João Silva'),
('Empresa B', '98765432000198', 'contato@empresab.com', 'Maria Oliveira');

INSERT INTO Usuario (userName, senha, fKEmpresa) VALUES
('usuario1', 'Senha@123', 1),
('usuario2', 'Senha456!', 2);

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
    fkUsuario INT,
    CONSTRAINT fkAcessoUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario)
);

INSERT INTO Acesso (fkUsuario) VALUES
(1),
(2);


CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45),
    numeroSerie VARCHAR(45)
);

INSERT INTO Sensor (Nome, numeroSerie) VALUES
('Sensor A', 'SN123456'),
('Sensor B', 'SN654321');


CREATE TABLE Registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    Temperatura DECIMAL(5, 2),
    fkSensor INT,
    CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
);

INSERT INTO Registro (Temperatura, fkSensor) VALUES
(141.50, 1),
(115.00, 2);

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
('Máquina A', 'Tipo A', 75.00, 'Setor A', 1, 1),
('Máquina B', 'Tipo B', 80.00, 'Setor B', 2, 2);


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