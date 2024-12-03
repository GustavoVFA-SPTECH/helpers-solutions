var database = require("../database/config")

function contatar(nome, emailCtt, text) {
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Contato (Nome, Email, Mensagem) VALUES ('${nome}', '${emailCtt}', '${text}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    contatar
};