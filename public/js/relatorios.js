function carregarRelatorios(){
    
    
    fetch("/relatorios/relatorios").then(function (resposta){
        if(resposta.ok){
            if(resposta.status == 204){
                throw "Nenhum resultado encontrado!";
            }

            resposta.json().then(function(resposta){
                console.log("Resposta recebida: ", JSON.stringify(resposta));
                
                
                for(var i = 0; i < resposta.length; i++){
                    var formmatDate = new Date(resposta[i].horario).toLocaleDateString("PT-BR", {hour: "2-digit", minute: "2-digit"})
                    dadosHorarios.innerHTML += `${formmatDate}<br>`
                    dadosMaq.innerHTML += `${resposta[i].maquina}<br>`
                    dadosTemp.innerHTML += `${resposta[i].temp}<br>`
                    dadosStatus.innerHTML += `${resposta[i].Stats}<br>`
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function(resposta){
        console.error(resposta)
    });

}