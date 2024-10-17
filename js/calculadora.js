function calcularPrejuizo() {

    var tipoMaquina = maquinas.value;
    console.log("Tipo de máquina selecionado:", tipoMaquina);
    var temperaturaMedia = Number(iptTemperaturaMedia.value);
    var tempoTotalOperacao = Number(iptTotalTempoOperacao.value);
    var tempoInativo = 24 - tempoTotalOperacao;
    var custoHora = Number(iptCustoHora.value);

    var temperaturaIdeal = 0;

    var downtimeSemSolucao = Math.round((tempoInativo / tempoTotalOperacao) * 100);
    var custoSemSolucaoDia = (tempoInativo * custoHora).toFixed(2);
    var custoSemSolucaoAnual = (custoSemSolucaoDia * 365).toFixed(2);

    var downtimeComSolucao = Math.round(((tempoInativo - tempoInativo * 0.3) / tempoTotalOperacao) * 100);

    var custoComSolucaoDia = ((tempoInativo - tempoInativo * 0.3) * custoHora).toFixed(2);
    var custoComSolucaoAnual = (custoComSolucaoDia * 365).toFixed(2);
    var vidaUtilGeral = 0; // em anos

    if (!tipoMaquina) {
        alert("Por favor, selecione uma máquina.");
        return;
    }
    if (!tempoTotalOperacao) {
        alert("Por favor, informe um tempo total de operação válido (em horas).");
        return;
    }
    if (!temperaturaMedia) {
        alert("Por favor, informe uma temperatura válida.");
        return;
    }
    if (!custoHora) {
        alert("Por favor, informe um custo por hora válido (em dólares)");
        return;
    }

    if (tempoTotalOperacao < 0 || tempoTotalOperacao > 24) {
        alert("O tempo total de operação deve ser um valor entre 0 e 24 horas.");
        return;
    }

    if (temperaturaMedia < 0) {
        alert("A temperatura média não pode ser negativa.");
        return;
    
    }   

    if (tipoMaquina == "centrifuga") {
          temperaturaIdeal = 150;
          vidaUtilGeral = 15;
        } else if (tipoMaquina == "axial") {
          temperaturaIdeal = 200;
          vidaUtilGeral = 20;
        } else if (tipoMaquina == "deslocamentopositivo") {
          temperaturaIdeal = 100;
          vidaUtilGeral = 15;
        }

        var vidaUtil = vidaUtilGeral;

        divOutput.innerHTML = `
            <br>
            <h2>Prejuízos sem a Nossa Solução:</h2>
        `;
        if (temperaturaMedia > temperaturaIdeal) {
            // Caso a temperatura esteja acima do ideal, calcular a redução da vida útil da máquina em dias
            
            vidaUtilGeral = vidaUtilGeral - (temperaturaMedia - temperaturaIdeal) / 365;

            // plota as informações sobre a temperatura na div de output
            divOutput.innerHTML += `
                <h4>Se a ${tipoMaquina} operasse a temperatura de ${temperaturaIdeal}ºC, sua vida útil seria de ${vidaUtil} anos</h4>
                <h4>Porém, operando com a temperatura de ${temperaturaMedia}ºC, gera uma <b style="color: red;">perda de ${Math.round(365 * (Math.round(vidaUtilGeral) - vidaUtilGeral))} dias de sua vida util por hora</b>.</h4>
            `;
        }
          // Plota o resto das informações e cálculos complementares
          divOutput.innerHTML += `
            <h4>Porcentagem do tempo de inatividade da máquina em 1 dia: <b style="color: red;">${downtimeSemSolucao}%</b></h4>

            <h4>Custo das horas inativas da máquina: <b style="color: red;">US$${custoSemSolucaoDia}</b></h4>

            <h4>Supondo uma média em que a planta fica inativa por ano, o prejuízo será de: <b style="color: red;">US$${custoSemSolucaoAnual}</b></h4>

            <br>

            <h2>Melhorias com a Nossa Solução:</h2>

            <h4>Porcentagem do tempo de inatividade da máquina em 1 dia: <b style="color: green;">${downtimeComSolucao}%,<b style="color:black"> reduzindo em</b> ${downtimeSemSolucao-downtimeComSolucao}%</b></h4>

            <h4>O novo custo com a inatividade da máquina será de: <b style="color: green;">US$${custoComSolucaoDia}</b>, <b style="color: black;">economizando</b> um total de <b style="color: green;">US$${(custoSemSolucaoDia - custoComSolucaoDia).toFixed(2)}</b></h4>
            
            <b style="color: black;">economizando</b> um total de: <b style="color: green;">US$${Math.round(custoSemSolucaoAnual - custoComSolucaoAnual)}</b> 
        `;
      
}