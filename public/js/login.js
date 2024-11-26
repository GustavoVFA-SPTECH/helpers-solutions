// //Realiza o login do usuario
// function login(){
//     var senhaTeste = 'T3st#123';
//     var usuarioTeste = 'Urubu100';
    
//     var usuario = document.getElementById('ipt_usuario').value;
//     var senha = document.getElementById('ipt_senhaLogin').value;
//     var alerta = document.getElementById('alertamodal');

//     if(usuario == usuarioTeste && senha == senhaTeste){
//         alerta.style.display = "flex";
//         // alert('Login realizado com sucesso!');
//         valLogin.innerHTML = ""
//         // window.location.href = 'dashboard.html';
//     } else {
        // valLogin.innerHTML = "Usuario ou Senha incorreto"
//         ipt_senhaLogin.style.outline = "none";
//         ipt_senhaLogin.style.border = "solid red 2px";
//         ipt_usuario.style.outline = "none";
//         ipt_usuario.style.border = "solid red 2px";
//     }
// }

function login() {
    // aguardar();

    var usuarioVar = document.getElementById('ipt_usuario').value;
    var senhaVar = document.getElementById('ipt_senhaLogin').value;
    var alerta = document.getElementById('alertamodal');
    
    if (usuarioVar == "" || senhaVar == "") {
        valLogin.innerHTML = "Preencha os dados para prosseguir!"
        return false;
    }
    // else {
    //     setInterval(sumirMensagem, 5000)
    // }

    console.log("FORM LOGIN: ", usuarioVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuarioServer: usuarioVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {

            resposta.json().then(json => {
                // console.log(json);
                console.log(JSON.stringify(json));
            console.log("Dados recebidos: ", json)

            sessionStorage.ID_USUARIO = json.id;
            sessionStorage.NOME_USUARIO = json.usuario;
            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.RAZAO_SOCIAL = json.razaoSocial;

                var btnProsseguir = document.getElementById('btn_prosseguir');
                btnProsseguir.innerHTML = `Conectando`;

                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}