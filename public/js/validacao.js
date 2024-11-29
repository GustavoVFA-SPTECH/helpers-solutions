// nomeServer: nomeVar,
// emailServer: emailVar,
// senhaServer: senhaVar,
// idEmpresaVincularServer: idEmpresaVincular




//Valida o campo de razão social
function valRazaoSocial() {
  var razao = document.getElementById("ipt_razao").value;
  val1.innerHTML = ``;
  var termina =
    razao.endsWith("ME") ||
      razao.endsWith("S.A") ||
      razao.endsWith("LTDA") ||
      razao.endsWith("EPP")
      ? true
      : false; // Validação de final da razão social

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

//Valida o campo de senha
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

  // Valida caracteres especiais, numeros, Maiuscula e minuscula
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
  //Confirmação de senha
  var confirmSenha = ipt_confirmar_senha.value;
  var senhasIguais = confirmSenha == senha;
  if (!confirmSenha == "") {
    if (senhasIguais) {
      ipt_confirmar_senha.style.outline = "solid #22c55e 2px";
      ipt_confirmar_senha.style.border = "#22c55e";
    } else {
      val3.innerHTML += `As senhas não batem`;
      ipt_confirmar_senha.style.outline = "none";
      ipt_confirmar_senha.style.border = "solid red 2px";
    }
  } else {
    ipt_confirmar_senha.style.outline = "none";
    ipt_confirmar_senha.style.border = "solid red 2px";
  }

  return tam && num && esp && min && max && senhasIguais;
}

//Valida o campo de CNPJ
function valCNPJ() {
  var cnpj = document.getElementById("ipt_cnpj").value;
  val1.innerHTML = "";
  var mensagem = "";
  var tamanho = cnpj.length;
  var tam = false;

  //Limita a entrada de caracteres da input para apenas números
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

//Valida o campo de email
function valEmail() {
  var email = document.getElementById("ipt_email").value;
  val1.innerHTML = "";
  var mensagem = "";

  //Valida arroba e ponto
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

  val3.innerHTML = mensagem;

  return arroba && ponto;
}

//Valida o campo de telefone
function valTelefone() {
  var telefone = document.getElementById("ipt_telefone").value;
  val1.innerHTML = "";
  var tamanho = telefone.length;
  var tam = false;
  var mensagem = "";

  //Limita a entrada de caracteres da input para apenas números
  telefone = telefone.replace(/[^\d]/g, "");

  document.getElementById("ipt_telefone").value = telefone;

  if (tamanho != 11) {
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

//Valida o campo de CEP
function valCEP() {
  var cep = document.getElementById("ipt_cep").value;
  val1.innerHTML = "";
  var mensagem = "";
  var tam = false;
  var tamanho = cep.length;

  //Limita a entrada de caracteres da input para apenas números
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

//Valida se todos os campos estão preenchidos
function valNulo() {
  var vazio = true;
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      vazio = false;
      break;
    }
  }

  console.log(vazio);
  console.log(inputs);

  return vazio;
}

//Valida o campo de numero
function numero() {
  var numero = document.getElementById("ipt_numero").value;

  //Limita a entrada de caracteres da input para apenas números
  numero = numero.replace(/[^\d]/g, "");

  document.getElementById("ipt_numero").value = numero;
}

//Valida geral de todos os campos para concluir login
function valCadastro() {
  var cadastro =
    valNulo() &&
      valRazaoSocial() &&
      valSenha() &&
      valCNPJ() &&
      valEmail() &&
      valTelefone() &&
      valCEP()
      ? true
      : false;

  console.log(cadastro);

  if (cadastro) {
    Cadastrar()
  } else {
    alert("Por favor, preencha todos os campos corretamente.");
  }
}

function Cadastrar(){
  var razaoVar = ipt_razao.value;
  var cnpjVar = ipt_cnpj.value;
  var telefoneVar = ipt_telefone.value;
  var responsavelVar = ipt_responsavel.value;
  var cepVar = ipt_cep.value;
  var logradouroVar = ipt_logradouro.value;
  var numeroVar = ipt_numero.value;
  var bairroVar = ipt_bairro.value;
  var cidadeVar =ipt_cidade.value
  var estadoVar = ipt_estado.value
  var complementoVar = ipt_complemento.value;
  var nomeUsuarioVar = ipt_nomeUsuario.value;
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;

  console.log("Telefone:", telefoneVar)
  
  fetch("/usuarios/cadastrar_empresa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razaoServer: razaoVar,
      cnpjServer: cnpjVar,
      emailServer: emailVar,
      telefoneServe: telefoneVar,
      responsavelServer: responsavelVar,
      nomeUsuarioServer : nomeUsuarioVar,
      senhaServer : senhaVar
    }),
  }).then(function (resposta) {
      console.log("resposta: ", resposta);
  
      if (resposta.ok) {
        console.log("Deu certo")

        fetch("/usuarios/cadastrar_endereco", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cnpjServer : cnpjVar,
            cepServer : cepVar,
            logradouroServer : logradouroVar,
            numeroServer : numeroVar,
            bairroServer : bairroVar,
            cidadeServer: cidadeVar,
            estadoServer : estadoVar,
            complementoServer : complementoVar
          }),
        }).then(function (resposta) {
            console.log("resposta: ", resposta);   

              // SE ENDEREÇO DER ERRO CAI AQUI
              if (resposta.ok) {
              console.log("Deu certo")
              btn_finalizar

              var btnFinalizar = document.getElementById('btn_finalizar');
              btnFinalizar.innerHTML = `Cadastrando`;

              setTimeout(() => {
                window.location = "paglogin.html";
              }, "1000");

            } else {
              throw "Houve um erro ao tentar realizar o cadastro do endereço!";
            }
          })
          .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
          });

        
        
      } else {
        throw "Houve um erro ao tentar realizar o cadastro da empresa!";
      }
    })
     // SE EMPRESA DER ERRO CAI AQUI
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
  
  return false;

}

function cadastrarMaquina(){
  
  var Maquina = sltMaquina.value
  var NomeMaquina = iptNomeMaquina.value
  var TempMaxima = Number(iptTempMaxima.value)
  var TempMinima = Number(iptTempMinima.value)
  var setor = Number(iptSetor.value)
  var idEmpresa = sessionStorage.ID_USUARIO


  console.log("Dados enviados: ", {
    NomeMaquinaServer: NomeMaquina,
    MaquinaServer: Maquina,
    TempMaximaServer: TempMaxima,
    TempMinimaServer: TempMinima,
    SetorServer: setor,
    idEmpresaServer : idEmpresa
});

fetch("/usuarios/cadastrar_setor", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    SetorServer: setor,
    idEmpresaServer : idEmpresa    
  }),
}).then(function (resposta) {
    console.log("resposta: ", resposta);   
      if (resposta.ok) {
      console.log("Deu certo")
    }
    return resposta.json()
  })
  .then(function (dadosSetor) {
    console.log("Setor processado:", dadosSetor);

    return fetch("/usuarios/cadastrar_maquinas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        NomeMaquinaServer: NomeMaquina,
        MaquinaServer: Maquina,
        TempMaximaServer: TempMaxima,
        TempMinimaServer: TempMinima,
        SetorServer: setor,
        idEmpresaServer : idEmpresa
        
      }),
    })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);
                    
                    if (resposta.ok) {                       
                      alert("Máquina cadastrada com sucesso!")
                    }
                  })
                })
                  
             
                  

}



