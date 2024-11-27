function carregarRelatorios(){
    
    
    fetch("/relatorios/relatorios").then(function (resposta){
        if(resposta.ok){
            if(resposta.status == 204){
                throw "Nenhum resultado encontrado!";
            }

            resposta.json().then(function(resposta){
                console.log("Resposta recebida: ", JSON.stringify(resposta));
                dadosHorarios.innerHTML += `${resposta[0].Horário}`
            })
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function(resposta){
        console.error(resposta)
    });

}