CREATE DATABASE Helpers;
USE Helpers;

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    email VARCHAR(70) NOT NULL,
    responsavel VARCHAR(45) NOT NULL
);

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(45),
    senha VARCHAR(45) NOT NULL,
    fKEmpresa INT,
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

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

CREATE TABLE Acesso (
    idAcesso INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    CONSTRAINT fkAcessoUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario)
);

CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45),
    numeroSerie VARCHAR(45)
);

CREATE TABLE Registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    Temperatura DECIMAL(5, 2),
    fkSensor INT,
    CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
);

CREATE TABLE Maquina (
    idMaquina INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45),
    Tipo VARCHAR(45),
    tempMax DECIMAL(5, 2),
<<<<<<< Updated upstream
    Setor VARCHAR(45),
    fkEmpresa INT,
    CONSTRAINT fkMaquinaEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa),
    fkSensor INT,
    CONSTRAINT fkMaquinaSensor FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
=======
    Setor VARCHAR(45)
>>>>>>> Stashed changes
);
