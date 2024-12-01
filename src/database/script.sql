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
('Máquina 1', 'Tipo A', 150.00, 110.00, 1),
('Máquina 2', 'Tipo B', 150.00, 110.00, 1),
('Máquina 3', 'Tipo C', 150.00, 110.00, 1),
('Máquina 4', 'Tipo A', 150.00, 110.00, 2),
('Máquina 5', 'Tipo B', 150.00, 110.00, 2),
('Máquina 6', 'Tipo C', 150.00, 110.00, 2),
('Máquina 7', 'Tipo A', 150.00, 110.00, 3),
('Máquina 8', 'Tipo B', 150.00, 110.00, 3),
('Máquina 9', 'Tipo C', 150.00, 110.00, 3),
('Máquina 10', 'Tipo A', 150.00, 110.00, 4),
('Máquina 11', 'Tipo B', 150.00, 110.00, 4),
('Máquina 12', 'Tipo C', 150.00, 110.00, 4),
('Máquina 13', 'Tipo A', 150.00, 110.00, 5),
('Máquina 14', 'Tipo B', 150.00, 110.00, 5),
('Máquina 15', 'Tipo C', 150.00, 110.00, 5),
('Máquina 16', 'Tipo A', 150.00, 110.00, 6),
('Máquina 17', 'Tipo B', 150.00, 110.00, 6),
('Máquina 18', 'Tipo C', 150.00, 110.00, 6),
('Máquina 19', 'Tipo A', 150.00, 110.00, 7),
('Máquina 20', 'Tipo B', 150.00, 110.00, 7),
('Máquina 21', 'Tipo C', 150.00, 110.00, 7);



INSERT INTO Registro (dataHora, Temperatura, fkMaquina) VALUES
('2023-06-01 10:00:00', 110.2, 1),
('2023-06-01 10:05:00', 112.1, 1),
('2023-06-01 10:10:00', 115.5, 1),
('2023-06-01 10:15:00', 118.8, 1),
('2023-06-01 10:20:00', 120.2, 1),
('2023-06-01 10:25:00', 122.1, 1),
('2023-06-02 09:00:00', 158.4, 2),
('2023-06-02 09:05:00', 167.7, 2),
('2023-06-02 09:10:00', 170.9, 2),
('2023-06-02 09:15:00', 177.2, 2),
('2023-06-02 09:20:00', 183.6, 2),
('2023-06-02 09:25:00', 190.3, 2),
('2023-06-02 10:00:00', 100.3, 3),
('2023-06-02 10:05:00', 95.4, 3),
('2023-06-02 10:10:00', 91.1, 3),
('2023-06-02 10:15:00', 83.2, 3),
('2023-06-02 10:20:00', 69.7, 3),
('2023-06-02 10:25:00', 55.9, 3),
('2023-06-03 11:00:00', 125.2, 4),
('2023-06-03 11:05:00', 127.5, 4),
('2023-06-03 11:10:00', 130.3, 4),
('2023-06-03 11:15:00', 132.8, 4),
('2023-06-03 11:20:00', 135.1, 4),
('2023-06-03 11:25:00', 138.4, 4),
('2023-06-03 12:00:00', 110.5, 5),
('2023-06-03 12:05:00', 112.6, 5),
('2023-06-03 12:10:00', 115.4, 5),
('2023-06-03 12:15:00', 118.9, 5),
('2023-06-03 12:20:00', 120.3, 5),
('2023-06-03 12:25:00', 122.8, 5),
('2023-06-04 13:00:00', 125.6, 6),
('2023-06-04 13:05:00', 127.9, 6),
('2023-06-04 13:10:00', 130.2, 6),
('2023-06-04 13:15:00', 132.5, 6),
('2023-06-04 13:20:00', 135.8, 6),
('2023-06-04 13:25:00', 138.1, 6),
('2023-06-04 14:00:00', 110.7, 7),
('2023-06-04 14:05:00', 112.9, 7),
('2023-06-04 14:10:00', 115.6, 7),
('2023-06-04 14:15:00', 118.3, 7),
('2023-06-04 14:20:00', 120.9, 7),
('2023-06-04 14:25:00', 122.5, 7),
('2023-06-05 10:00:00', 110.5, 8),
('2023-06-05 10:05:00', 112.3, 8),
('2023-06-05 10:10:00', 115.7, 8),
('2023-06-05 10:15:00', 118.9, 8),
('2023-06-05 10:20:00', 120.4, 8),
('2023-06-05 10:25:00', 122.8, 8),
('2023-06-06 09:00:00', 125.1, 9),
('2023-06-06 09:05:00', 127.6, 9),
('2023-06-06 09:10:00', 130.3, 9),
('2023-06-06 09:15:00', 132.7, 9),
('2023-06-06 09:20:00', 135.4, 9),
('2023-06-06 09:25:00', 138.2, 9),
('2023-06-07 10:00:00', 110.6, 10),
('2023-06-07 10:05:00', 112.9, 10),
('2023-06-07 10:10:00', 115.2, 10),
('2023-06-07 10:15:00', 118.5, 10),
('2023-06-07 10:20:00', 120.8, 10),
('2023-06-07 10:25:00', 122.3, 10),
('2023-06-08 11:00:00', 125.7, 11),
('2023-06-08 11:05:00', 127.4, 11),
('2023-06-08 11:10:00', 130.6, 11),
('2023-06-08 11:15:00', 132.9, 11),
('2023-06-08 11:20:00', 135.3, 11),
('2023-06-08 11:25:00', 138.1, 11),
('2023-06-09 12:00:00', 110.4, 12),
('2023-06-09 12:05:00', 112.7, 12),
('2023-06-09 12:10:00', 115.9, 12),
('2023-06-09 12:15:00', 118.6, 12),
('2023-06-09 12:20:00', 120.1, 12),
('2023-06-09 12:25:00', 122.5, 12),
('2023-06-10 13:00:00', 125.8, 13),
('2023-06-10 13:05:00', 127.3, 13),
('2023-06-10 13:10:00', 130.4, 13),
('2023-06-10 13:15:00', 132.6, 13),
('2023-06-10 13:20:00', 135.7, 13),
('2023-06-10 13:25:00', 138.0, 13),
('2023-06-11 14:00:00', 110.9, 14),
('2023-06-11 14:05:00', 112.2, 14),
('2023-06-11 14:10:00', 115.3, 14),
('2023-06-11 14:15:00', 118.4, 14),
('2023-06-11 14:20:00', 120.6, 14),
('2023-06-11 14:25:00', 122.9, 14),
('2023-06-12 15:00:00', 125.5, 15),
('2023-06-12 15:05:00', 127.8, 15),
('2023-06-12 15:10:00', 130.7, 15),
('2023-06-12 15:15:00', 132.4, 15),
('2023-06-12 15:20:00', 135.9, 15),
('2023-06-12 15:25:00', 138.5, 15),
('2023-06-13 16:00:00', 110.8, 16),
('2023-06-13 16:05:00', 112.5, 16),
('2023-06-13 16:10:00', 115.8, 16),
('2023-06-13 16:15:00', 118.7, 16),
('2023-06-13 16:20:00', 120.2, 16),
('2023-06-13 16:25:00', 122.6, 16),
('2023-06-14 17:00:00', 125.4, 17),
('2023-06-14 17:05:00', 127.1, 17),
('2023-06-14 17:10:00', 130.5, 17),
('2023-06-14 17:15:00', 132.3, 17),
('2023-06-14 17:20:00', 135.2, 17),
('2023-06-14 17:25:00', 138.6, 17),
('2023-06-15 18:00:00', 110.1, 18),
('2023-06-15 18:05:00', 112.4, 18),
('2023-06-15 18:10:00', 115.6, 18),
('2023-06-15 18:15:00', 118.3, 18),
('2023-06-15 18:20:00', 120.5, 18),
('2023-06-15 18:25:00', 122.7, 18),
('2023-06-16 19:00:00', 125.3, 19),
('2023-06-16 19:05:00', 127.2, 19),
('2023-06-16 19:10:00', 130.8, 19),
('2023-06-16 19:15:00', 132.1, 19),
('2023-06-16 19:20:00', 135.5, 19),
('2023-06-16 19:25:00', 138.7, 19),
('2023-06-17 20:00:00', 110.0, 20),
('2023-06-17 20:05:00', 112.8, 20),
('2023-06-17 20:10:00', 115.4, 20),
('2023-06-17 20:15:00', 118.1, 20),
('2023-06-17 20:20:00', 120.0, 20),
('2023-06-17 20:25:00', 122.2, 20),
('2023-06-18 21:00:00', 125.9, 21),
('2023-06-18 21:05:00', 127.0, 21),
('2023-06-18 21:10:00', 130.0, 21),
('2023-06-18 21:15:00', 132.0, 21),
('2023-06-18 21:20:00', 135.0, 21),
('2023-06-18 21:25:00', 138.0, 21);



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