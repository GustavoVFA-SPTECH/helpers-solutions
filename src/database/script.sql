CREATE DATABASE Helpers;
USE Helpers;

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    CNPJ CHAR(14) UNIQUE NOT NULL,
    telefone CHAR(11),    
    responsavel VARCHAR(45) NOT NULL
);

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
userName VARCHAR(45) NOT NULL,
senha VARCHAR(45) NOT NULL,
email VARCHAR(100) NOT NULL,
fkEmpresa INT,
constraint fkUsuarioEmpresa foreign key (fkEmpresa) references Empresa(idEmpresa)
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

INSERT INTO Maquina (Nome, Tipo, tempMax, tempMinima, fkSetor) VALUES
('Máquina 1', 'Tipo A', 150.00, 70, 1),
('Máquina 2', 'Tipo B', 150.00, 90, 2),
('Máquina 3', 'Tipo B', 150.00, 50, 2);

INSERT INTO Registro (dataHora, Temperatura, fkMaquina) VALUES
('2023-06-01 10:00:00', 105.2, 1),
('2023-06-01 10:05:00', 107.1, 1),
('2023-06-01 10:10:00', 108.5, 1),
('2023-06-01 10:15:00', 106.8, 1),
('2023-06-01 10:20:00', 109.2, 1),
('2023-06-01 10:25:00', 100.1, 1),
('2023-06-02 09:00:00', 102.4, 2),
('2023-06-02 09:05:00', 103.7, 2),
('2023-06-02 09:10:00', 104.9, 2),
('2023-06-02 09:15:00', 106.2, 2),
('2023-06-02 09:20:00', 107.6, 2),
('2023-06-02 09:25:00', 108.3, 2),
('2023-06-02 10:00:00', 120.3, 3),
('2023-06-02 10:05:00', 122.4, 3),
('2023-06-02 10:10:00', 130.1, 3),
('2023-06-02 10:15:00', 150.2, 3),
('2023-06-02 10:20:00', 157.7, 3),
('2023-06-02 10:25:00', 159.9, 3);


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