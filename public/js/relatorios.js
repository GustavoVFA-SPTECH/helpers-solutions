async function carregarSetores() {
    try {
      // Obtém o idEmpresa do sessionStorage
      const idEmpresa = sessionStorage.getItem('ID_EMPRESA');
  
      // Verifica se o idEmpresa está presente no sessionStorage
      if (!idEmpresa) {
          console.error('ID da empresa não encontrado no sessionStorage');
          return;
      }
  
      // Faz a requisição para a rota que retorna os setores
      const response = await fetch(`/dashboard/setores/${idEmpresa}`);
      
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
          throw new Error('Erro ao obter setores');
      }
  
      // Converte a resposta para JSON
      const data = await response.json();
  
      // Verifica se há setores na resposta
      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
          // Seleciona o elemento <select> pelo ID
          const selectElement = document.getElementById('fkSetor');
  
          // Limpa o conteúdo do <select> antes de adicionar novas opções
          selectElement.innerHTML = '';
  
          // Adiciona uma opção para cada setor
          data.data.forEach(setor => {
              const option = document.createElement('option');
              option.value = setor.idSetor;  // O valor da opção é o id do setor
              option.textContent = setor.Nome;  // O texto da opção é o nome do setor
              selectElement.appendChild(option);
          });
  
  
      } else {
          console.log('Nenhum setor encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar setores:', error);
    }
}

carregarSetores();

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

function carregarRelatoriosFiltro() {
    const inicio = document.getElementById('horarioInicio').value;
    const final = document.getElementById('horarioFinal').value;
    const setor = document.getElementById('fkSetor').value;
    
    // Formata as datas corretamente
    const inicioDate = `${inicio} 00:00:00`;
    const finalDate = `${final} 23:59:59`;

    // Faz o fetch passando as variáveis de filtro para o backend
    fetch('/relatorios/filtrado', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inicioServer: inicioDate,
            finalServer: finalDate,
            setorServer: setor
        })
    })
    .then(function (resposta) {
        if (resposta.ok) {
            return resposta.json();
        } else {
            throw "Erro ao obter os relatórios filtrados!";
        }
    })
    .then(function (dados) {
        console.log("Resposta recebida: ", JSON.stringify(dados));

        const tabela = document.querySelector('.relatorios');
        
        // Remove as linhas anteriores da tabela
        tabela.querySelectorAll('tr:not(:first-child)').forEach(function (linha) {
            linha.remove();
        });

        // Preenche a tabela com os dados recebidos
        dados.forEach(function (item) {
            var formatoData = new Date(item.horario).toLocaleDateString("PT-BR", { hour: "2-digit", minute: "2-digit" });

            var novaLinha = document.createElement('tr');
            
            var celulaHorario = document.createElement('td');
            celulaHorario.textContent = formatoData;
            
            var celulaMaquina = document.createElement('td');
            celulaMaquina.textContent = item.maquina;

            var celulaTemperatura = document.createElement('td');
            celulaTemperatura.textContent = item.temp;

            var celulaStatus = document.createElement('td');
            celulaStatus.textContent = item.stats;

            novaLinha.appendChild(celulaHorario);
            novaLinha.appendChild(celulaMaquina);
            novaLinha.appendChild(celulaTemperatura);
            novaLinha.appendChild(celulaStatus);

            tabela.appendChild(novaLinha);
        });
    })
    .catch(function (erro) {
        console.error(erro);
    });
}

carregarRelatorios();
