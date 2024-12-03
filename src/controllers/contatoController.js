var contatoModel = require("../models/contatoModel");

function contatar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var emailCtt = req.body.emailCttServer;
    var text = req.body.textServer;


        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        contatoModel.contatar(nome, emailCtt, text)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao enviar a mensagem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
// }

module.exports = {
    contatar
}