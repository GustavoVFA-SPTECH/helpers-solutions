function carregarRelatorios() {
    fetch("/relatorios/relatorios").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!";
            }

            resposta.json().then(function (dados) {
                console.log("Resposta recebida: ", JSON.stringify(dados));
                const tabela = document.querySelector('.relatorios');
                tabela.querySelectorAll('tr:not(:first-child)').forEach(function (linha) {
                    linha.remove();
                });
                for (var i = 0; i < dados.length; i++) {
                    var formatoData = new Date(dados[i].horario).toLocaleDateString("PT-BR", { hour: "2-digit", minute: "2-digit" });

                    var novaLinha = document.createElement('tr');

                    var celulaHorario = document.createElement('td');
                    celulaHorario.textContent = formatoData;

                    var celulaMaquina = document.createElement('td');
                    celulaMaquina.textContent = dados[i].maquina;

                    var celulaTemperatura = document.createElement('td');
                    celulaTemperatura.textContent = dados[i].temp;

                    var celulaStatus = document.createElement('td');
                    celulaStatus.textContent = dados[i].Stats;

                    novaLinha.appendChild(celulaHorario);
                    novaLinha.appendChild(celulaMaquina);
                    novaLinha.appendChild(celulaTemperatura);
                    novaLinha.appendChild(celulaStatus);

                    tabela.appendChild(novaLinha);
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (erro) {
        console.error(erro);
    });
}

carregarRelatorios();
