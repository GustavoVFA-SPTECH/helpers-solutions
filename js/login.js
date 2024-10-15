//Realiza o login do usuario
function login(){
    var senhaTeste = 'T3st#123';
    var usuarioTeste = 'Urubu100';
    
    var usuario = document.getElementById('ipt_usuario').value;
    var senha = document.getElementById('ipt_senhaLogin').value;

    if(usuario == usuarioTeste && senha == senhaTeste){
        alert('Login realizado com sucesso!');
        valLogin.innerHTML = ""
        window.location.href = 'dashboard.html';
    } else {
        valLogin.innerHTML = "Usuario e Senha incorretos"
        ipt_senhaLogin.style.outline = "none";
        ipt_senhaLogin.style.border = "solid red 2px";
        ipt_usuario.style.outline = "none";
        ipt_usuario.style.border = "solid red 2px";
    }
}