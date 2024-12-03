DROP DATABASE IF EXISTS Helpers;
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
CONSTRAINT fkUsuarioEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

INSERT INTO Empresa (razaoSocial, CNPJ, telefone, responsavel
) VALUES
('Empresa A', '12345678000195', '1234567890',  'João Silva'),
('Empresa B', '98765432000198', '0987654321',  'Maria Oliveira'),
('Empresa C', '11223344000199', '1122334455', 'Carlos Pereira'),
('Empresa D', '22334455000188', '2233445566', 'Ana Souza'),
('Empresa E', '33445566000177', '3344556677', 'Roberto Lima'),
('Empresa F', '44556677000166', '4455667788', 'Fernanda Alves'),
('Empresa G', '55667788000155', '5566778899', 'Paulo Santos');

INSERT INTO Usuario (email, userName, senha, fkEmpresa) VALUES
('contato@empresaa.com', 'Usuario1', 'Urubu@100',1),
('contato@empresab.com', 'Usuario2', 'Urubu@200',2),
('contato@empresac.com', 'Usuario3', 'Urubu@300', 3),
('contato@empresad.com', 'Usuario4', 'Urubu@400', 4),
('contato@empresae.com', 'Usuario5', 'Urubu@500', 5),
('contato@empresaf.com', 'Usuario6', 'Urubu@600', 6),
('contato@empresag.com', 'Usuario7', 'Urubu@700', 7);


SELECT idUsuario, email, userName, razaoSocial FROM Usuario
        JOIN Empresa
        ON fkEmpresa = idEmpresa
        WHERE email = 'contato@empresab.com' AND senha = 'Urubu@200';

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

INSERT INTO Endereco (CEP, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, fkEmpresaEnd) VALUES
('12345678', 'Rua A', '100', 'Apto 101', 'Bairro A', 'Cidade A', 'Estado A', 1),
('87654321', 'Rua B', '200', '', 'Bairro B', 'Cidade B', 'Estado B', 2),
('11223344', 'Travessa C', '300', 'Casa 3', 'Bela Vista', 'Belo Horizonte', 'MG', 3),
('44332211', 'Alameda D', '400', 'Sala 4', 'Copacabana', 'Curitiba', 'PR', 4),
('55667788', 'Praça E', '500', 'Loja 5', 'Liberdade', 'Porto Alegre', 'RS', 5),
('99887766', 'Estrada F', '600', 'Galpão 6', 'Moema', 'Florianópolis', 'SC', 6),
('66778899', 'Rodovia G', '700', 'Km 7', 'Pinheiros', 'Salvador', 'BA', 7);


CREATE TABLE Acesso (
    idAcesso INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    CONSTRAINT fkAcessoUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario)
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
('Setor B', 1),
('Setor C', 1),
('Setor D', 2),
('Setor E', 2),
('Setor F', 2),
('Setor G', 3),
('Setor H', 3),
('Setor I', 3),
('Setor J', 4),
('Setor K', 4),
('Setor L', 4),
('Setor M', 5),
('Setor N', 5),
('Setor O', 5),
('Setor P', 6),
('Setor Q', 6),
('Setor R', 6),
('Setor S', 7),
('Setor T', 7),
('Setor U', 7);


INSERT INTO Maquina (Nome, Tipo, tempMax, tempMinima, fkSetor) VALUES
('Máquina 1', 'Tipo A', 140.00, 110.00, 1),
('Máquina 2', 'Tipo B', 140.00, 110.00, 1),
('Máquina 3', 'Tipo C', 140.00, 110.00, 1),
('Máquina 4', 'Tipo A', 140.00, 110.00, 1),
('Máquina 5', 'Tipo B', 140.00, 110.00, 1),
('Máquina 6', 'Tipo C', 140.00, 110.00, 2),
('Máquina 7', 'Tipo A', 140.00, 110.00, 2),
('Máquina 8', 'Tipo B', 140.00, 110.00, 2),
('Máquina 9', 'Tipo C', 140.00, 110.00, 2),
('Máquina 10', 'Tipo A', 140.00, 110.00, 2),
('Máquina 11', 'Tipo B', 140.00, 110.00, 3),
('Máquina 12', 'Tipo C', 140.00, 110.00, 3),
('Máquina 13', 'Tipo A', 140.00, 110.00, 3),
('Máquina 14', 'Tipo B', 140.00, 110.00, 3),
('Máquina 15', 'Tipo C', 140.00, 110.00, 3),
('Máquina 16', 'Tipo A', 140.00, 110.00, 4),
('Máquina 17', 'Tipo B', 140.00, 110.00, 4),
('Máquina 18', 'Tipo C', 140.00, 110.00, 4),
('Máquina 19', 'Tipo A', 140.00, 110.00, 4),
('Máquina 20', 'Tipo B', 140.00, 110.00, 4),
('Máquina 21', 'Tipo C', 140.00, 110.00, 5),
('Máquina 22', 'Tipo A', 140.00, 110.00, 5),
('Máquina 23', 'Tipo B', 140.00, 110.00, 5),
('Máquina 24', 'Tipo C', 140.00, 110.00, 5),
('Máquina 25', 'Tipo A', 140.00, 110.00, 5),
('Máquina 26', 'Tipo B', 140.00, 110.00, 6),
('Máquina 27', 'Tipo C', 140.00, 110.00, 6),
('Máquina 28', 'Tipo A', 140.00, 110.00, 6),
('Máquina 29', 'Tipo B', 140.00, 110.00, 6),
('Máquina 30', 'Tipo C', 140.00, 110.00, 6),
('Máquina 31', 'Tipo A', 140.00, 110.00, 7),
('Máquina 32', 'Tipo B', 140.00, 110.00, 7),
('Máquina 33', 'Tipo C', 140.00, 110.00, 7),
('Máquina 34', 'Tipo A', 140.00, 110.00, 7),
('Máquina 35', 'Tipo B', 140.00, 110.00, 7);

INSERT INTO Registro (dataHora, Temperatura, fkMaquina) VALUES
('2024-01-15 09:00:00', 110.2, 1),
('2024-01-15 09:05:00', 112.1, 1),
('2024-01-15 09:10:00', 115.5, 1),
('2024-01-15 09:15:00', 118.8, 1),
('2024-01-15 09:20:00', 120.2, 1),
('2024-01-15 09:25:00', 122.1, 1),
('2024-01-15 09:00:00', 158.4, 2),
('2024-01-15 09:05:00', 167.7, 2),
('2024-01-15 09:10:00', 170.9, 2),
('2024-01-15 09:15:00', 177.2, 2),
('2024-01-15 09:20:00', 183.6, 2),
('2024-01-15 09:25:00', 190.3, 2),
('2024-01-15 09:00:00', 100.3, 3),
('2024-01-15 09:05:00', 95.4, 3),
('2024-01-15 09:10:00', 91.1, 3),
('2024-01-15 09:15:00', 83.2, 3),
('2024-01-15 09:20:00', 69.7, 3),
('2024-01-15 09:25:00', 55.9, 3),
('2024-01-15 09:00:00', 125.7, 4),
('2024-01-15 09:05:00', 127.4, 4),
('2024-01-15 09:10:00', 130.6, 4),
('2024-01-15 09:15:00', 132.9, 4),
('2024-01-15 09:20:00', 135.3, 4),
('2024-01-15 09:25:00', 138.1, 4),
('2024-01-15 09:00:00', 110.4, 5),
('2024-01-15 09:05:00', 112.7, 5),
('2024-01-15 09:10:00', 115.9, 5),
('2024-01-15 09:15:00', 118.6, 5),
('2024-01-15 09:20:00', 120.1, 5),
('2024-01-15 09:25:00', 122.5, 5),
('2024-01-15 09:00:00', 125.8, 6),
('2024-01-15 09:05:00', 127.3, 6),
('2024-01-15 09:10:00', 130.4, 6),
('2024-01-15 09:15:00', 132.6, 6),
('2024-01-15 09:20:00', 135.7, 6),
('2024-01-15 09:25:00', 138.0, 6),
('2024-01-15 09:00:00', 110.9, 7),
('2024-01-15 09:05:00', 112.2, 7),
('2024-01-15 09:10:00', 115.3, 7),
('2024-01-15 09:15:00', 118.4, 7),
('2024-01-15 09:20:00', 120.6, 7),
('2024-01-15 09:25:00', 122.9, 7),
('2024-01-15 09:00:00', 125.9, 8),
('2024-01-15 09:05:00', 127.0, 8),
('2024-01-15 09:10:00', 130.0, 8),
('2024-01-15 09:15:00', 132.0, 8),
('2024-01-15 09:20:00', 135.0, 8),
('2024-01-15 09:25:00', 138.0, 8),
('2024-01-15 09:00:00', 110.5, 9),
('2024-01-15 09:05:00', 112.3, 9),
('2024-01-15 09:10:00', 115.7, 9),
('2024-01-15 09:15:00', 118.9, 9),
('2024-01-15 09:20:00', 120.4, 9),
('2024-01-15 09:25:00', 122.8, 9),
('2024-01-15 09:00:00', 125.1, 10),
('2024-01-15 09:05:00', 127.6, 10),
('2024-01-15 09:10:00', 130.3, 10),
('2024-01-15 09:15:00', 132.7, 10),
('2024-01-15 09:20:00', 135.4, 10),
('2024-01-15 09:25:00', 138.2, 10),
('2024-01-15 09:00:00', 110.6, 11),
('2024-01-15 09:05:00', 112.9, 11),
('2024-01-15 09:10:00', 115.2, 11),
('2024-01-15 09:15:00', 118.5, 11),
('2024-01-15 09:20:00', 120.8, 11),
('2024-01-15 09:25:00', 122.3, 11),
('2024-01-15 09:00:00', 125.7, 12),
('2024-01-15 09:05:00', 127.4, 12),
('2024-01-15 09:10:00', 130.6, 12),
('2024-01-15 09:15:00', 132.9, 12),
('2024-01-15 09:20:00', 135.3, 12),
('2024-01-15 09:25:00', 138.1, 12),
('2024-01-15 09:00:00', 110.4, 13),
('2024-01-15 09:05:00', 112.7, 13),
('2024-01-15 09:10:00', 115.9, 13),
('2024-01-15 09:15:00', 118.6, 13),
('2024-01-15 09:20:00', 120.1, 13),
('2024-01-15 09:25:00', 122.5, 13),
('2024-01-15 09:00:00', 125.8, 14),
('2024-01-15 09:05:00', 127.3, 14),
('2024-01-15 09:10:00', 130.4, 14),
('2024-01-15 09:15:00', 132.6, 14),
('2024-01-15 09:20:00', 135.7, 14),
('2024-01-15 09:25:00', 138.0, 14),
('2024-01-15 09:00:00', 110.9, 15),
('2024-01-15 09:05:00', 112.2, 15),
('2024-01-15 09:10:00', 115.3, 15),
('2024-01-15 09:15:00', 118.4, 15),
('2024-01-15 09:20:00', 120.6, 15),
('2024-01-15 09:25:00', 122.9, 15),
('2024-01-15 09:00:00', 125.5, 16),
('2024-01-15 09:05:00', 127.8, 16),
('2024-01-15 09:10:00', 130.7, 16),
('2024-01-15 09:15:00', 132.4, 16),
('2024-01-15 09:20:00', 135.9, 16),
('2024-01-15 09:25:00', 138.5, 16),
('2024-01-15 09:00:00', 110.8, 17),
('2024-01-15 09:05:00', 112.5, 17),
('2024-01-15 09:10:00', 115.8, 17),
('2024-01-15 09:15:00', 118.7, 17),
('2024-01-15 09:20:00', 120.2, 17),
('2024-01-15 09:25:00', 122.6, 17),
('2024-01-15 09:00:00', 125.4, 18),
('2024-01-15 09:05:00', 127.1, 18),
('2024-01-15 09:10:00', 130.5, 18),
('2024-01-15 09:15:00', 132.3, 18),
('2024-01-15 09:20:00', 135.2, 18),
('2024-01-15 09:25:00', 138.6, 18),
('2024-01-15 09:00:00', 110.1, 19),
('2024-01-15 09:05:00', 112.4, 19),
('2024-01-15 09:10:00', 115.6, 19),
('2024-01-15 09:15:00', 118.3, 19),
('2024-01-15 09:20:00', 120.5, 19),
('2024-01-15 09:25:00', 122.7, 19),
('2024-01-15 09:00:00', 125.3, 20),
('2024-01-15 09:05:00', 127.2, 20),
('2024-01-15 09:10:00', 130.8, 20),
('2024-01-15 09:15:00', 132.1, 20),
('2024-01-15 09:20:00', 135.5, 20),
('2024-01-15 09:25:00', 138.7, 20),
('2024-01-15 09:00:00', 110.0, 21),
('2024-01-15 09:05:00', 112.8, 21),
('2024-01-15 09:10:00', 115.4, 21),
('2024-01-15 09:15:00', 118.1, 21),
('2024-01-15 09:20:00', 120.0, 21),
('2024-01-15 09:25:00', 122.2, 21),
('2024-01-15 09:00:00', 125.9, 22),
('2024-01-15 09:05:00', 127.0, 22),
('2024-01-15 09:10:00', 130.0, 22),
('2024-01-15 09:15:00', 132.0, 22),
('2024-01-15 09:20:00', 135.0, 22),
('2024-01-15 09:25:00', 138.0, 22),
('2024-01-15 09:00:00', 110.5, 23),
('2024-01-15 09:05:00', 112.3, 23),
('2024-01-15 09:10:00', 115.7, 23),
('2024-01-15 09:15:00', 118.9, 23),
('2024-01-15 09:20:00', 120.4, 23),
('2024-01-15 09:25:00', 122.8, 23),
('2024-01-15 09:00:00', 125.1, 24),
('2024-01-15 09:05:00', 127.6, 24),
('2024-01-15 09:10:00', 130.3, 24),
('2024-01-15 09:15:00', 132.7, 24),
('2024-01-15 09:20:00', 135.4, 24),
('2024-01-15 09:25:00', 138.2, 24),
('2024-01-15 09:00:00', 110.6, 25),
('2024-01-15 09:05:00', 112.9, 25),
('2024-01-15 09:10:00', 115.2, 25),
('2024-01-15 09:15:00', 118.5, 25),
('2024-01-15 09:20:00', 120.8, 25),
('2024-01-15 09:25:00', 122.3, 25),
('2024-01-15 09:00:00', 125.7, 26),
('2024-01-15 09:05:00', 127.4, 26),
('2024-01-15 09:10:00', 130.6, 26),
('2024-01-15 09:15:00', 132.9, 26),
('2024-01-15 09:20:00', 135.3, 26),
('2024-01-15 09:25:00', 138.1, 26),
('2024-01-15 09:00:00', 110.4, 27),
('2024-01-15 09:05:00', 112.7, 27),
('2024-01-15 09:10:00', 115.9, 27),
('2024-01-15 09:15:00', 118.6, 27),
('2024-01-15 09:20:00', 120.1, 27),
('2024-01-15 09:25:00', 122.5, 27),
('2024-01-15 09:00:00', 125.8, 28),
('2024-01-15 09:05:00', 127.3, 28),
('2024-01-15 09:10:00', 130.4, 28),
('2024-01-15 09:15:00', 132.6, 28),
('2024-01-15 09:20:00', 135.7, 28),
('2024-01-15 09:25:00', 138.0, 28),
('2024-01-15 09:00:00', 110.9, 29),
('2024-01-15 09:05:00', 112.2, 29),
('2024-01-15 09:10:00', 115.3, 29),
('2024-01-15 09:15:00', 118.4, 29),
('2024-01-15 09:20:00', 120.6, 29),
('2024-01-15 09:25:00', 122.9, 29),
('2024-01-15 09:00:00', 125.5, 30),
('2024-01-15 09:05:00', 127.8, 30),
('2024-01-15 09:10:00', 130.7, 30),
('2024-01-15 09:15:00', 132.4, 30),
('2024-01-15 09:20:00', 135.9, 30),
('2024-01-15 09:25:00', 138.5, 30),
('2024-01-15 09:00:00', 110.8, 31),
('2024-01-15 09:05:00', 112.5, 31),
('2024-01-15 09:10:00', 115.8, 31),
('2024-01-15 09:15:00', 118.7, 31),
('2024-01-15 09:20:00', 120.2, 31),
('2024-01-15 09:25:00', 122.6, 31),
('2024-01-15 09:00:00', 125.4, 32),
('2024-01-15 09:05:00', 127.1, 32),
('2024-01-15 09:10:00', 130.5, 32),
('2024-01-15 09:15:00', 132.3, 32),
('2024-01-15 09:20:00', 135.2, 32),
('2024-01-15 09:25:00', 138.6, 32),
('2024-01-15 09:00:00', 110.1, 33),
('2024-01-15 09:05:00', 112.4, 33),
('2024-01-15 09:10:00', 115.6, 33),
('2024-01-15 09:15:00', 118.3, 33),
('2024-01-15 09:20:00', 120.5, 33),
('2024-01-15 09:25:00', 122.7, 33),
('2024-01-15 09:00:00', 125.3, 34),
('2024-01-15 09:05:00', 127.2, 34),
('2024-01-15 09:10:00', 130.8, 34),
('2024-01-15 09:15:00', 132.1, 34),
('2024-01-15 09:20:00', 135.5, 34),
('2024-01-15 09:25:00', 138.7, 34),
('2024-01-15 09:00:00', 110.0, 35),
('2024-01-15 09:05:00', 112.8, 35),
('2024-01-15 09:10:00', 115.4, 35),
('2024-01-15 09:15:00', 118.1, 35),
('2024-01-15 09:20:00', 120.0, 35),
('2024-01-15 09:25:00', 122.2, 35);

CREATE TABLE Contato (
idContato INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
Email VARCHAR(100),
Mensagem VARCHAR(240)
);

SELECT * FROM Registro;
SELECT * FROM Contato;

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
SELECT r.temperatura as Temperatura, r.dataHora as Horário, m.nome as Máquina, fkSetor,
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

select * from registro;

SELECT 
m.nome AS 'Nome',
r.temperatura AS 'Temperatura'
FROM Registro AS r
JOIN Maquina AS m 
ON r.fkMaquina = m.idMaquina
WHERE fkSetor = 1 limit 1;

SELECT 
m.nome AS 'Nome',
r.temperatura AS 'Temperatura'
FROM Registro AS r
JOIN Maquina AS m ON r.fkMaquina = m.idMaquina
WHERE fkSetor = 1
ORDER BY r.dataHora DESC;

select * from registro;
select * from maquina order by idMaquina desc;

SELECT nome, avg(temperatura) as temp FROM registro
JOIN Maquina
ON fkMaquina = idMaquina
WHERE fkSetor = 1
GROUP BY nome, temp;

SELECT nome, temperatura, dataHora
FROM registro r
JOIN maquina m ON r.fkMaquina = m.idMaquina
WHERE r.fkSetor = 1
GROUP BY nome, temperatura, dataHora
ORDER BY dataHora DESC
LIMIT ;


