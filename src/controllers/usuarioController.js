var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;
    var horario = req.body.horarioServer;

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
                            var id = resultadoAutenticar[0].idUsuario                            
                            return usuarioModel.logAcesso_usuario(id, horario)
                                .then(() => {
                                    res.json({
                                        id: resultadoAutenticar[0].idUsuario,
                                        usuario: resultadoAutenticar[0].userName,
                                        email: resultadoAutenticar[0].email,
                                        razaoSocial:resultadoAutenticar[0].razaoSocial,
                                        idEmpresa:resultadoAutenticar[0].fkEmpresa
                                    });
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
    console.log("razao controller:" ,razao)
    console.log("cnpj controller:" ,cnpj)
    console.log("email controller:" ,email)
    console.log("telefone controller:" ,telefone)
    console.log("responsavel controller:" ,responsavel)
    console.log("nomeUsuario controller:" ,nomeUsuario)
    console.log("senha controller:" ,senha)

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(razao, cnpj, telefone, responsavel)
            .then(
                function (resultado) {
                    usuarioModel.puxarFkEmpresa(cnpj).then(function (resultado) {
                        if (resultado.length > 0) {
                            res.status(200).json(resultado);
                            var id = resultado[0].idEmpresa
                            usuarioModel.cadastrarUsuario(id, email, nomeUsuario, senha)
                            .then(
                                function (resultado) {
                                    res.json(resultado);                                   
                                }
                            ).catch(
                                function (erro) {
                                    console.log(erro);
                                    console.log(
                                        "\nHouve um erro ao realizar o cadastro do Usuário! Erro: ",
                                        erro.sqlMessage
                                    );
                                    res.status(500).json(erro.sqlMessage);
                                }
                            );
                        } else {
                            res.status(204).send("Nenhum resultado encontrado!")
                        }
                    }).catch(function (erro) {
                        console.log(erro);
                        console.log("Houve um erro ao buscar o id da Empresa: ", erro.sqlMessage);
                        res.status(500).json(erro.sqlMessage);
                    });
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
        } else {
            return usuarioModel.cadastrarSetor(fkEmpresa, setor)
            .then(
                function (resultado) {
                    console.log("Setor criado, id: ", setorId)
                    let novoSetorId = resultado.insertId;
                    res.json({ 
                        idSetor: resultado.insertId,
                        message: "Setor cadastrado com sucesso" 
                    });;
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
                                          
module.exports = {
    autenticar,
    cadastrarEmpresa,
    cadastrarEndereco,
    cadastrarMaquinas,
    cadastrarSetor
}