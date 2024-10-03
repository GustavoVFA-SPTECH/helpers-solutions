function valSenha(){
    var senha = document.getElementById('ipt_senha');
    var tamanho = senha.length;
    var esp = false;
    var num = false;
    var validos = '!@#$%&?';

    for(var i = 0; i < tamanho; i++){
        for(var j = 0; j < validos.length; j++){
            if(senha[i] == validos[j]){
                esp = true;
            }
            if(!isNaN(senha[i])){
                num = true;
            }
        }
    }

    if(tamanho < 8){
        // Mensagem caso a senha seja muito curta
    }
    else if(!esp){
        // Mensagem caso a senha não tenha caracteres especiais
    }
    else if(tamanho > 30){
        // mensagem caso a senha seja muito longa
    }
    else if(senha.toUpperCase() != senha){
        //mensagem caso senha seja minuscula
    }
    else if(senha.toLowerCase() != senha){
        //mensagem caso senha seja maiuscula
    }
    else if(!num){
        //mensagem caso senha não tenha números
    }


}