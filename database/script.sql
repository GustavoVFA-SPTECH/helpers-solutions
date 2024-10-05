CREATE DATABASE Helpers;
USE Helpers;

CREATE TABLE Empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    email VARCHAR(70) NOT NULL,
    responsavel VARCHAR(45) NOT NULL
);

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(45),
	senha VARCHAR(45) NOT NULL,
	fKEmpresa INT,
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE Endereco(
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
	CEP CHAR(14),
	numero VARCHAR(45),
	fkEmpresaEnd INT,
	CONSTRAINT fkEmpresaEnd FOREIGN KEY (fkEmpresaEnd) REFERENCES empresa(idEmpresa)
);

CREATE TABLE Acesso(
	idAcesso INT PRIMARY KEY AUTO_INCREMENT,
	dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
	fkUsuario INT,
	CONSTRAINT fkAcessoUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT, 
Nome VARCHAR(45),
numeroSerie VARCHAR(45),
fkEmpresa INT,
	CONSTRAINT fkSensorEmpresa FOREIGN KEY (fkEmpresa)
		REFERENCES Empresa(idEmpresa),
fkMaquina INT,
	CONSTRAINT fkSensorMaquina FOREIGN KEY (fkMaquina)
		REFERENCES Maquina(idMaquina)
);

CREATE TABLE Registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dataHora DATETIME,
Temperatura DECIMAL(5,2),
fkSensor INT,
	CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor)
		REFERENCES Sensor(idSensor)
);

CREATE TABLE Maquina (
idMaquina INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
Tipo VARCHAR(45),
tempMax DECIMAL(5,2),
Setor VARCHAR(45)
);