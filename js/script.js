function valSenha() {
  var input_senha = document.getElementById("ipt_senha");
  var senha = input_senha.value;
  var tamanho = senha.length;
  var esp = false;
  var num = false;
  var validos = "!@#$%&?";
  var nao_validou = 0;


  for (var i = 0; i < tamanho; i++) {
    for (var j = 0; j < validos.length; j++) {
      if (senha[i] == validos[j]) {
        esp = true;
      }
      if (!isNaN(senha[i])) {
        num = true;
      }
    }
  }

  var mensagem = "Sua senha não cumpre os requisitos. Ela precisa:<br>";

  if (tamanho < 8) {
    nao_validou++
    // Mensagem caso a senha seja muito curta
    // alert('Senha muito curta')
    mensagem += `Conter pelo menos 8 dígitos<br>`;
  }

  if (!esp) {
    nao_validou++
    // Mensagem caso a senha não tenha caracteres especiais
    mensagem += `Conter pelo menos 1 caractere especial (ex: !@#$%&?)<br>`;
  }
  
  if (tamanho > 30) {
    nao_validou++
    // mensagem caso a senha seja muito longa
    mensagem = `Senha muito grande! Sua senha precisa conter no máximo 30 caracteres<br>`;
  }

  if (senha.toLowerCase() != senha || senha == '') {
    //mensagem caso senha seja minuscula
    mensagem += `Conter pelo menos 1 letra minúscula<br>`
  }
  
  if (senha.toUpperCase() != senha || senha == '') {
    //mensagem caso senha seja maiuscula
    mensagem += `Conter pelo menos 1 letra maiúscula<br>`
  }
  
  if (!num) {
    nao_validou++
    //mensagem caso senha não tenha números
    mensagem += `Conter pelo menos 1 número<br>`
  }


  if(nao_validou > 0) {
    validacao.innerHTML = `<span>${mensagem}</span>`;
  } else {
    validacao.innerHTML = ``;
  }
  // alert(mensagem)
}

function valRazaoSocial() {
  var razao = document.getElementById("ipt_razao");
  var termina =
    razao.endsWith("ME") ||
    razao.endsWith("S.A") ||
    razao.endsWith("LTDA") ||
    razao.endsWith("EPP") ? true : false;
    
    console.log(termina)
}

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
