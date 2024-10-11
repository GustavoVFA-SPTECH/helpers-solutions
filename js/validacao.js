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
    val1.innerHTML = `A razão social deve conter o Pós-fixo 'ME, S.A, LTDA, EPP'`;
  }
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
}

function valCNPJ() {
  var cnpj = document.getElementById("ipt_cnpj").value;
  val1.innerHTML = "";
  var mensagem = '';
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

  if(tam){
    ipt_cnpj.style.outline = "solid #22c55e 2px";
    ipt_cnpj.style.border = "#22c55e";
  }
}
