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


function limparSessao() {
  var btnSair = document.getElementById('btn_sair');
  btnSair.innerHTML = `Saindo`;

  sessionStorage.clear();
  
  setTimeout(() => {
    window.location.href = 'paglogin.html';
  }, 1000);
}