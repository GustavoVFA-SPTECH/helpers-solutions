var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        senha: resultadoAutenticar[0].senha,
                                        aquarios: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razao = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer
    var telefone = req.body.telefoneServer;
    var responsavel = req.body.responsavelServer;

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(razao, cnpj, email, telefone, responsavel)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    
}

function cadastrarEndereco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var complemento = req.body.complementoServer;

    usuarioModel.puxarFkEmpresa(cnpj)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
                                        
                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        var fkEmpresa = resultadoAutenticar[0].idEmpresa
                        console.log('Fk da Empresa:', fkEmpresa);

                        usuarioModel.cadastrarEndereco(fkEmpresa,cep, logradouro, numero, bairro, cidade, estado, complemento)
                            .then(
                                function (resultado) {
                                    res.json(resultado);
                                }
                            ).catch(
                                function (erro) {
                                    console.log(erro);
                                    console.log(
                                        "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                                        erro.sqlMessage
                                    );
                                    res.status(500).json(erro.sqlMessage);
                                }
                            );

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    
}

function cadastrarUsuario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeUsuario = req.body.nomeUsuarioServer;
    var senha = req.body.senhaServer;
    var cnpj = req.body.cnpjServer;

    usuarioModel.puxarFkEmpresa(cnpj)
    .then(
        function (resultadoAutenticar) {
            console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
                                
            if (resultadoAutenticar.length == 1) {
                console.log(resultadoAutenticar);
                var fkEmpresa = resultadoAutenticar[0].idEmpresa
                console.log('Fk da Empresa:', fkEmpresa);

                usuarioModel.cadastrarUsuario(fkEmpresa, nomeUsuario,  senha)
                    .then(
                        function (resultado) {
                            res.json(resultado);
                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        }
                    );

            } else if (resultadoAutenticar.length == 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
    
}

module.exports = {
    autenticar,
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarUsuario
}