var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

// CADASTRANDO INFORMAÇÕES DO USUÁRIO
router.post("/cadastrar_empresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/cadastrar_endereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})
// FIM DAS ROTAS DE CADASTRO

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;