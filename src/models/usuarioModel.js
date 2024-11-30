var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, email, userName, razaoSocial FROM Usuario 
        JOIN Empresa
        ON fkEmpresa = idEmpresa
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function logAcesso_usuario(id, horario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function logAcesso_usuario(): ", id)
    

    var instrucaoSql = `
    INSERT INTO Acesso ( dataHora, fkUsuario) VALUES ('${horario}', ${id} );
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarFkEmpresa(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
        SELECT idEmpresa, razaoSocial, CNPJ, responsavel, telefone FROM Empresa WHERE cnpj = '${cnpj}' ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa( razao, cnpj, telefone, responsavel) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razao, cnpj, telefone, responsavel)
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Empresa (razaoSocial, CNPJ, telefone, responsavel) VALUES ('${razao}', '${cnpj}', '${telefone}', '${responsavel}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarUsuario(id, email, nomeUsuario, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():")
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Usuario (userName,  senha, email, fkEmpresa) VALUES ('${nomeUsuario}', '${senha}', '${email}', ${id});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEndereco(fkEmpresa, cep, logradouro, numero, bairro, cidade, estado ,complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var instrucaoSql = `
        INSERT INTO Endereco (CEP, Logradouro, Numero, Complemento, Bairro, Cidade, Estado , fkEmpresaEnd) VALUES ('${cep}', '${logradouro}', '${numero}', '${complemento}', '${bairro}', '${cidade}', '${estado}', ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarSetor(fkEmpresa, nomeSetor){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSetor():");

    var instrucaoSql = `
    INSERT INTO Setor (idSetor, nome, fkEmpresa) VALUES (${nomeSetor}, '${'setor ' + nomeSetor}', ${fkEmpresa});
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function buscarSetor(setor, fkEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarSetor():");

    var instrucaoSql = `
    SELECT idSetor, nome FROM setor WHERE nome = 'setor ${setor}' AND fkEmpresa = ${fkEmpresa};
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

function cadastrarMaquina(NomeMaquina, Maquina, TempMaxima, TempMinima, fkSetor){

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucaoSql = `
    INSERT INTO Maquina (Nome, Tipo, TempMax, TempMinima, fkSetor) VALUES ('${NomeMaquina}', '${Maquina}', ${TempMaxima}, ${TempMinima}, ${fkSetor});
`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);



}

module.exports = {
    autenticar,
    logAcesso_usuario,
    cadastrarEmpresa,
    cadastrarUsuario,
    puxarFkEmpresa,
    cadastrarEndereco,
    cadastrarSetor,
    cadastrarMaquina,
    buscarSetor
};