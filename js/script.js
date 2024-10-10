var guardarSenha = "";
var validouSenha = false;
// var validouSenha =
function valSenha() {
<<<<<<< HEAD
  var senha = document.getElementById("ipt_senha").value;
=======
  validouSenha = false;
  var input_senha = document.getElementById("ipt_senha");
  var input_confirmar_senha = document.getElementById("ipt_confirmar_senha");
  var senha = input_senha.value;
  var confirmar_senha = input_confirmar_senha.value;
>>>>>>> c3547567de7aebe800623373a77ecb64fd4fbc36
  var tamanho = senha.length;
  var esp = false;
  var num = false;
  var min = false;
  var max = false;
  var validos = "!@#$%&?";
  // validacao.innerHTML = "";
  var mensagem = "";
  var mensagem_senhas_diferentes = "";

  for (var i = 0; i < tamanho; i++) {
    for (var j = 0; j < validos.length; j++) {
      if (senha[i] == validos[j]) {
        esp = true;
      }
      if (!isNaN(senha[i])) {
        num = true;
      }
    }
    if (senha[i].toUpperCase() != senha[i]) {
      min = true;
    }
    if (senha[i].toLowerCase() != senha[i]) {
      max = true;
    }
  }

  if (tamanho < 8 || tamanho > 30)
    mensagem += `A senha deve conter entre 8 e 30 caracteres <br>`;

  if (!num) mensagem += `A senha deve conter 1 número <br>`;

  if (!esp)
    mensagem += `A senha deve conter 1 caracter especial: '!@#$%&?' <br>`;

  if (!min) mensagem += `A senha deve conter 1 letra minúscula <br>`;

  if (!max) mensagem += `A senha deve conter 1 letra maiúscula <br>`;

<<<<<<< HEAD

=======
>>>>>>> c3547567de7aebe800623373a77ecb64fd4fbc36
  //  validacao.innerHTML += `A senha deve conter 1 letra minúscula`

  // Senha Vazia
  // if (senha == '') validacao.innerHTML = '';
  if (senha == "") mensagem = `Preencha o campo para continuar <br>`;
  input_senha.style.outline = "none";
  input_senha.style.border = "solid red 2px";
  if (num && esp && min && max) {
    input_senha.style.outline = "solid #22c55e 2px";
    input_senha.style.border = "#22c55e";
    guardarSenha = ``;
    guardarSenha = senha;
    validouSenha = true;
  }

<<<<<<< HEAD
  var confirmSenha = ipt_confirmar_senha.value
  var senhasIguais = confirmSenha == senha;
if(!confirmSenha == ''){
  if(senhasIguais){
  }else{
    validacao.innerHTML += `As senhas não batem`
  }
}

=======
  validacao.innerHTML = mensagem;
}

function continuar() {
  var alert_modal = document.getElementById("modal");

  if (validouSenha) {
    alert_modal.style.display = "flex";
    alert_modal.innerHTML = `
            <div class="box_modal">
          <div class="icon">
            <img
              height="140px"
              src="../assets/verified_high_quality.gif"
              alt="Imagem de verificação aprovada"
            />
          </div>
          <div class="titulo">
            <h2>Cadastro efetuado com sucesso!</h2>
          </div>
          <div class="info">
            <span>Clique no botão de continuar para ir para a tela de login</span>
          </div>
          <div class="btn">
            <a href="paglogin.html">Continuar</a>
          </div>
        </div>
    `;
  }
>>>>>>> c3547567de7aebe800623373a77ecb64fd4fbc36
}

function valRazaoSocial() {
  var razao = document.getElementById("ipt_razao");
  var termina =
    razao.endsWith("ME") ||
    razao.endsWith("S.A") ||
    razao.endsWith("LTDA") ||
    razao.endsWith("EPP")
      ? true
      : false;

  console.log(termina);
}

//Troca de pagina de cadastro

function step_01() {
  var box_form_1 = document.getElementById("form_1");
  var box_form_2 = document.getElementById("form_2");
  var box_form_3 = document.getElementById("form_3");

  box_form_1.style.display = "none";
  box_form_2.style.display = "block";
  box_form_3.style.display = "none";
}

function step_02() {
  var box_form_1 = document.getElementById("form_1");
  var box_form_2 = document.getElementById("form_2");
  var box_form_3 = document.getElementById("form_3");

  box_form_1.style.display = "none";
  box_form_2.style.display = "none";
  box_form_3.style.display = "block";
}

function retornar_tela_01() {
  var box_form_1 = document.getElementById("form_1");
  var box_form_2 = document.getElementById("form_2");
  var box_form_3 = document.getElementById("form_3");

  box_form_1.style.display = "block";
  box_form_2.style.display = "none";
  box_form_3.style.display = "none";
}

function retornar_tela_02() {
  var box_form_1 = document.getElementById("form_1");
  var box_form_2 = document.getElementById("form_2");
  var box_form_3 = document.getElementById("form_3");

  box_form_1.style.display = "none";
  box_form_2.style.display = "block";
  box_form_3.style.display = "none";
}
