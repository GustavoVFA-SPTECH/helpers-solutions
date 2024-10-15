function valRazaoSocial() {
  var razao = document.getElementById("ipt_razao").value;
  val1.innerHTML = ``;
  var termina =
    razao.endsWith("ME") ||
    razao.endsWith("S.A") ||
    razao.endsWith("LTDA") ||
    razao.endsWith("EPP")
      ? true
      : false;

  if (!termina) {
    val1.innerHTML += `A razão social deve conter o Pós-fixo 'ME, S.A, LTDA, EPP'`;
    ipt_razao.style.outline = "none";
    ipt_razao.style.border = "solid red 2px";
  } else {
    ipt_razao.style.outline = "solid #22c55e 2px";
    ipt_razao.style.border = "#22c55e";
  }

  return termina;
}

function valSenha() {
  var senha = document.getElementById("ipt_senha").value;
  var tamanho = senha.length;
  var esp = false;
  var num = false;
  var min = false;
  var max = false;
  var tam = false;
  var validos = "!@#$%&?";
  var mensagem = "";

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

  if (tamanho < 8 || tamanho > 30) {
    mensagem += `A senha deve conter entre 8 e 30 caracteres <br>`;
  } else {
    tam = true;
  }

  if (!num) mensagem += `A senha deve conter 1 número <br>`;

  if (!esp)
    mensagem += `A senha deve conter 1 caracter especial: '!@#$%&?' <br>`;

  if (!min) mensagem += `A senha deve conter 1 letra minúscula <br>`;

  if (!max) mensagem += `A senha deve conter 1 letra maiúscula <br>`;

  val3.innerHTML = mensagem;

  if (senha == "") mensagem = `Preencha o campo para continuar <br>`;
  ipt_senha.style.outline = "none";
  ipt_senha.style.border = "solid red 2px";
  if (num && esp && min && max && tam) {
    ipt_senha.style.outline = "solid #22c55e 2px";
    ipt_senha.style.border = "#22c55e";
  }

  var confirmSenha = ipt_confirmar_senha.value;
  var senhasIguais = confirmSenha == senha;
  if (!confirmSenha == "") {
    if (senhasIguais) {
      ipt_confirmar_senha.style.outline = "solid #22c55e 2px";
      ipt_confirmar_senha.style.border = "#22c55e";
    } else {
      validacao.innerHTML += `As senhas não batem`;
      ipt_confirmar_senha.style.outline = "none";
      ipt_confirmar_senha.style.border = "solid red 2px";
    }
  } else {
    ipt_confirmar_senha.style.outline = "none";
    ipt_confirmar_senha.style.border = "solid red 2px";
  }

  return tam && num && esp && min && max && senhasIguais;
}

function valCNPJ() {
  var cnpj = document.getElementById("ipt_cnpj").value;
  val1.innerHTML = "";
  var mensagem = "";
  var tamanho = cnpj.length;
  var tam = false;

  cnpj = cnpj.replace(/[^\d]/g, "");

  document.getElementById("ipt_cnpj").value = cnpj;

  if (tamanho != 14) {
    mensagem += `O CNPJ deve conter 14 caracteres<br>`;
    ipt_cnpj.style.outline = "none";
    ipt_cnpj.style.border = "solid red 2px";
  } else {
    tam = true;
  }

  if (cnpj == "") {
    mensagem += "Preencha o CNPJ para continuar";
    ipt_cnpj.style.outline = "none";
    ipt_cnpj.style.border = "solid red 2px";
  }

  val1.innerHTML = mensagem;

  if (tam) {
    ipt_cnpj.style.outline = "solid #22c55e 2px";
    ipt_cnpj.style.border = "#22c55e";
  }

  return tam;
}

function valEmail() {
  var email = document.getElementById("ipt_email").value;
  val1.innerHTML = "";
  var mensagem = "";

  var arroba = email.includes("@");
  var ponto = email.includes(".");

  if (!arroba) {
    mensagem += "Email inválido. O email deve conter '@'<br>";
    ipt_email.style.outline = "none";
    ipt_email.style.border = "solid red 2px";
  }

  if (!ponto) {
    mensagem += "Email inválido. O email deve conter '.'<br>";
    ipt_email.style.outline = "none";
    ipt_email.style.border = "solid red 2px";
  }

  if (ponto && arroba) {
    ipt_email.style.outline = "solid #22c55e 2px";
    ipt_email.style.border = "#22c55e";
  }

  val1.innerHTML = mensagem;

  return arroba && ponto;
}

function valTelefone() {
  var telefone = document.getElementById("ipt_telefone").value;
  val1.innerHTML = "";
  var tamanho = telefone.length;
  var tam = false;
  var mensagem = "";

  telefone = telefone.replace(/[^\d]/g, "");

  document.getElementById("ipt_telefone").value = telefone;

  if (tamanho != 10) {
    mensagem += `O telefone deve conter 11 numeros incluindo o DDD`;
    ipt_telefone.style.outline = "none";
    ipt_telefone.style.border = "solid red 2px";
  } else {
    tam = true;
    ipt_telefone.style.outline = "solid #22c55e 2px";
    ipt_telefone.style.border = "#22c55e";
  }

  val1.innerHTML = mensagem;

  return tam;
}

function valCEP() {
  var cep = document.getElementById("ipt_cep").value;
  val1.innerHTML = "";
  var mensagem = "";
  var tam = false;
  var tamanho = cep.length;

  cep = cep.replace(/[^\d]/g, "");
  document.getElementById("ipt_cep").value = cep;

  if (tamanho != 8) {
    mensagem += "O CEP deve conter 8 caracteres";
    ipt_cep.style.outline = "none";
    ipt_cep.style.border = "solid red 2px";
  } else {
    tam = true;
    ipt_cep.style.outline = "solid #22c55e 2px";
    ipt_cep.style.border = "#22c55e";
  }

  val2.innerHTML = mensagem;

  return tam;
}

function valNulo(){
  var nulo = false;
  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++){
    if(inputs[i].value == ''){
      nulo = true;
      break;
    }
  }
  
  return nulo;
}

function valCadastro() {
  var cadastro =
    valRazaoSocial() &&
    valSenha() &&
    valCNPJ() &&
    valEmail() &&
    valTelefone() &&
    valCEP() && valNulo() ? true : false;

    if(cadastro){
      window.location.replace('paglogin.html');
    }
}
