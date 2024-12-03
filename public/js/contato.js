function contatar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = ipt_nome_contatenos.value;
    var emailCttVar = ipt_email_contatenos.value;
    var textVar = ipt_text_contatenos.value;
    

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      emailCttVar == "" ||
      textVar == ""
    ) {
      return false;
    }

    // Enviando o valor da nova input
    fetch("/contato/contatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailCttServer: emailCttVar,
        textServer: textVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          alert('Mensagem enviada com sucesso!')
        } else {
          throw "Houve um erro ao tentar enviar a mensagem!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        
      });

    return false;
  }