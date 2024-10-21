CREATE DATABASE Helpers;
USE Helpers;

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    email VARCHAR(70) NOT NULL,
    responsavel VARCHAR(45) NOT NULL
);

INSERT INTO Empresa (razaoSocial, CNPJ, email, responsavel) VALUES
('Empresa A', '12345678000195', 'contato@empresaa.com', 'João Silva'),
('Empresa B', '98765432000198', 'contato@empresab.com', 'Maria Oliveira');


CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(45),
    senha VARCHAR(45) NOT NULL,
    fKEmpresa INT,
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

INSERT INTO Usuario (userName, senha, fKEmpresa) VALUES
('usuario1', 'Senha@123', 1),
('usuario2', 'Senha456!', 2);

CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    CEP CHAR(14),
    Logradouro VARCHAR(100),
    Numero VARCHAR(45),
    Complemento VARCHAR(45),
    Bairro VARCHAR(45),
    Cidade VARCHAR(45),
    Estado VARCHAR(45),
    fkEmpresaEnd INT,
    CONSTRAINT fkEmpresaEnd FOREIGN KEY (fkEmpresaEnd) REFERENCES empresa (idEmpresa)
);

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
(22.50, 1),
(25.00, 2);

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


SELECT * FROM registro;

SELECT r.temperatura as Temperatura, r.dataHora as "Horario Registro", m.nome as Maquina
FROM registro as r
JOIN sensor as s
ON r.fkSensor = s.idSensor
JOIN maquina as m
ON m.fkSensor = s.idSensor;
