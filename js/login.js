function login(){
    var senhaTeste = 'T3st#123';
    var usuarioTeste = 'Urubu100';
    
    var usuario = document.getElementById('ipt_usuario').value;
    var senha = document.getElementById('ipt_senhaLogin').value;

    if(usuario == usuarioTeste && senha == senhaTeste){
        alert('Login realizado com sucesso!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
}