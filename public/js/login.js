
function login() {
    // aguardar();

    var usuarioVar = document.getElementById('ipt_usuario').value;
    var senhaVar = document.getElementById('ipt_senhaLogin').value;
    var horarioVar = ObterDateTime();
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
            senhaServer: senhaVar,
            horarioServer: horarioVar
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
            sessionStorage.RAZAO_SOCIAL= json.razaoSocial;
            sessionStorage.ID_EMPRESA = json.idEmpresa;

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

function ObterDateTime(){
    var data = new Date();
  
    var ano = data.getFullYear();
    var mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
    var dia = data.getDate().toString().padStart(2, '0'); 
  
    // Formando a data no formato YYYY-MM-DD
    var dataFormatada = `${ano}-${mes}-${dia}`;
  
    // Extraindo a hora, minuto e segundo
    var hora = data.getHours().toString().padStart(2, '0');
    var minuto = data.getMinutes().toString().padStart(2, '0');
    var segundo = data.getSeconds().toString().padStart(2, '0');
  
    var horaFormatada = `${hora}:${minuto}:${segundo}`;
  
    var DataFormartadaMySQL = `${dataFormatada} ${horaFormatada}`;
  
    console.log(DataFormartadaMySQL);
  
    return DataFormartadaMySQL
  }


function sumirMensagem() {
    cardErro.style.display = "none"
}