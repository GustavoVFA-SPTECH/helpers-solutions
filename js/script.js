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

function step_01() {
    var box_form_1 = document.getElementById('form_1');
    var box_form_2 = document.getElementById('form_2');
    var box_form_3 = document.getElementById('form_3');

    box_form_1.style.display = 'none';
    box_form_2.style.display = 'block';
    box_form_3.style.display = 'none';
}

function step_02() {
    var box_form_1 = document.getElementById('form_1');
    var box_form_2 = document.getElementById('form_2');
    var box_form_3 = document.getElementById('form_3');

    box_form_1.style.display = 'none';
    box_form_2.style.display = 'none';
    box_form_3.style.display = 'block';
}

function retornar_tela_01() {
    var box_form_1 = document.getElementById('form_1');
    var box_form_2 = document.getElementById('form_2');
    var box_form_3 = document.getElementById('form_3');

    box_form_1.style.display = 'block';
    box_form_2.style.display = 'none';
    box_form_3.style.display = 'none';
}

function retornar_tela_02() {
    var box_form_1 = document.getElementById('form_1');
    var box_form_2 = document.getElementById('form_2');
    var box_form_3 = document.getElementById('form_3');

    box_form_1.style.display = 'none';
    box_form_2.style.display = 'block';
    box_form_3.style.display = 'none';
}