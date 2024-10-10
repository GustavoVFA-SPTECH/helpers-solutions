var guardarSenha = "";
var validouSenha = false;
var validouSenha = ''
function valSenha() {
  var senha = document.getElementById("ipt_senha").value;
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

  var confirmSenha = ipt_confirmar_senha.value
  var senhasIguais = confirmSenha == senha;
  if (!confirmSenha == '') {
    if (senhasIguais) {
    } else {
      validacao.innerHTML += `As senhas não batem`
    }
  }

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
