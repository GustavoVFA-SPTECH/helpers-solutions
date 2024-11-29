var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(usuario, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                            res.json({
                                id: resultadoAutenticar[0].idEmpresa,
                                usuario: resultadoAutenticar[0].userName,
                                email: resultadoAutenticar[0].email,
                                razaoSocial: resultadoAutenticar[0].razaoSocial,
                            });
                        }
                     
                    else if (resultadoAutenticar.length == 0) {
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
    var telefone = req.body.telefoneServe;
    var responsavel = req.body.responsavelServer;
    var nomeUsuario = req.body.nomeUsuarioServer;
    var senha = req.body.senhaServer;
    console.log("Telefone controller:" ,telefone)

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(nomeUsuario, senha, razao, cnpj, email, telefone, responsavel)
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

function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razao = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer
    var telefone = req.body.telefoneServe;
    var responsavel = req.body.responsavelServer;
    var nomeUsuario = req.body.nomeUsuarioServer;
    var senha = req.body.senhaServer;
    console.log("Telefone controller:" ,telefone)

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(nomeUsuario, senha, razao, cnpj, email, telefone, responsavel)
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
function cadastrarMaquinas(req, res){
    var Maquina = req.body.MaquinaServer;
    var NomeMaquina = req.body.NomeMaquinaServer;
    var TempMaxima = req.body.TempMaximaServer;
    var TempMinima = req.body.TempMinimaServer;
    var fkSetor = req.body.SetorServer;
    
           usuarioModel.cadastrarMaquina(NomeMaquina, Maquina, TempMaxima, TempMinima, fkSetor)
           .then(
               function (resultado) {
                   res.json(resultado);
               }
           ).catch(
               function (erro) {
                   console.log(erro);
                   console.log(
                       "\nHouve um erro ao realizacadastro da empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                    }
                    );

                    }


function cadastrarSetor(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkEmpresa = req.body.idEmpresaServer;
    var setor = req.body.SetorServer;

    usuarioModel.buscarSetor(setor, fkEmpresa)
    .then(function (resultadoSetor) {

        

        if(resultadoSetor && resultadoSetor.length > 0){

            console.log("resultado setor ", resultadoSetor)
            let = setorId = resultadoSetor[0].idSetor
            console.log("Setor existe, id: ", setorId)
            res.json({ idSetor: setorId });
        }else{
            return usuarioModel.cadastrarSetor(fkEmpresa, setor)
            .then(
                function (resultado) {
                    res.json(resultado);
                    res.json({ idSetor: resultado.insertId });
                    console.log("Setor criado, id: ", setorId)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da maquina Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
        }
                        })
                    }


module.exports = {
    autenticar,
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarMaquinas,
    cadastrarSetor
}