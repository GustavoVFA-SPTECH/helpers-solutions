function simular(){
    var maquina= select_maquina.value;
    var tempoMed= Number(input_tempoMed.value);
    var impacto= Number(select_impacto.value);

    var producao_media = 0;

    // Validações de inputs vazias
    if (!maquina.trim()){
        alert("Por favor, selecione uma máquina.");
        return;
    }
    if (!tempoMed) {
        alert("Por favor, informe um tempo médio válido (em horas).");
        return;
    }
    if (!impacto) {
        alert("Por favor, informe o impacto causado.");
        return;
    }
    if (tempoMed < 0 || tempoMed > 24) {
        alert("O tempo total médio deve ser um valor entre 0 e 24 horas.");
        return;
    }


    // Definir a média de produção por hora da máquina selecionada
    if( maquina == "Centrífuga" ){
        producao_media =  300000.00 / 24 // 12 mil e 500 reais p/h
    }
    if( maquina == "Axial" ){
        producao_media = 240000.00 / 24 // 10 mil reais p/h
    }
    if( maquina == "Deslocamento Horizontal" ){
        producao_media = 228000.00 / 24 // 9,5 mil reais p/h
    }

    // Desconto das horas sem operar, decorrente de paradas repentinas
    var paradas_repentinas = tempoMed - impacto;

    // Para saber o faturamento por dia
    var faturamento_dia = producao_media * paradas_repentinas;

    // Para saber o quanto deixou de faturar durante as horas paradas
    var sem_faturar = impacto * producao_media;
    var string_sem_faturar = sem_faturar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    //Em porcentagem
    var porcentagem =  (impacto / tempoMed) * 100;
    console.log (porcentagem)

    // Mensalmente
    var preju_mensal = sem_faturar * 30;
    var string_preju_mensal = preju_mensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    //Anual
    var preju_anual = preju_mensal * 12;
    var string_preju_anual = preju_anual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    // COM NOSSA SOLUÇÃO
    var solucao = 0;
    
    if(impacto == 1){
        solucao = sem_faturar * 0.3;
    }
    if(impacto == 2){
        solucao = producao_media + producao_media * 0.3;
    }
    if(impacto == 3){
        solucao = (producao_media*2) + producao_media * 0.3;
    }

    var solucao_mensal = solucao * 30;
    solucao = solucao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    solucao_mensal = solucao_mensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    divOutput.innerHTML= `<br><b><span class="resultado-titulo">Resultado:<br></span></b><br>

    <b><span class="resultado-sem-solucao">Sem a nossa solução<br><br></span></b>

    <p>Identificamos que a máquina ${maquina} deixou de produzir <span class="texto-destaque-negativo">${string_sem_faturar}</span> por dia, ou seja, significa <span class="texto-destaque-negativo">${porcentagem.toFixed(1)}%</span> do tempo de produção, em escala <b>MENSAL</b> será <span class="texto-destaque-negativo">${string_preju_mensal}</span> e <b>ANUAL</b> de <span class="texto-destaque-negativo">${string_preju_anual}</span>.<br><p>
    
    <b><span class="titulo-com-solucao">Com a nossa solução<br></span></b>
   
    <p>Com a nossa solução de monitoramento de temperatura da máquina <span class="texto-destaque-positivo">${maquina}</span>, você pode melhorar a produtividade da organização em até <span class="texto-destaque-positivo">30%</span>, o que resulta em um aumento de <span class="texto-destaque-positivo">${solucao}</span> no faturamento diário, totalizando <span class="texto-destaque-positivo">${solucao_mensal}</span> por mês.</p>`;


}