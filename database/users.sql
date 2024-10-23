USE Helpers;


-- Usuario de inserção VM
CREATE USER 'Inserir'@'%' IDENTIFIED BY 'Inserir#DB2024';

GRANT INSERT ON *.* TO 'Inserir'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;


-- Usuario geral Banco de Dados
CREATE USER 'Helpers'@'%' IDENTIFIED BY 'Helpers#BD2024';

GRANT ALL PRIVILEGES ON *.* TO 'Helpers'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;