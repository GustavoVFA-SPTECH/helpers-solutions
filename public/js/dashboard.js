const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("myChart2");
const ctx3 = document.getElementById("myChart3");

const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0.1, "rgba(255,240,0,1)"); 
gradient.addColorStop(0.9, "rgba(255,170,0,1)"); 
gradient.addColorStop(0.5, "rgba(219,89,6,1)"); 
Chart.defaults.color = "#FFF";


const chart = new Chart(ctx, {
  type: "line",
  data: {    
    labels: [],
    datasets: [
      {
        data: '',
        borderWidth: 2,
        backgroundColor: "#eb9a05",
        borderColor: "#ffffff",
        color: "#ffb9a05",
        fill:true,
        tension: 0.4,
      },
      {
        data: [],
        borderWidth: 1,
        backgroundColor: gradient, 
      },
    ],
  },
  options: {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          font: {
            size: 16,
            weight: "bold",
          },
          padding:0,
          color: "#FFFFFF", // Cor do texto
        },
        ticks: {
          maxRotation: 0, // Impede a rotação das labels
          minRotation: 0, // Impede a rotação das labels
        },
      },
      y: {
        beginAtZero: true,
        min: 20,
        max: 160, 
        ticks: {
          stepSize: 20, 
        },
        title: {
          display: true, 
          text: "Temperatura (ºC)", 
          font: {
            size: 14, 
            weight: 'bold',
          },
          color: "#FFFFFF", 
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: "Temperatura média das máquinas ultimas 24h",
        font: {
          size: 20, 
        },
      },
    },
  },
});

const chart2 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: [],  // Labels (nomes das máquinas) serão populadas dinamicamente
    datasets: []  // Os datasets também serão populados dinamicamente
  },
  options: {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          font: {
            size: 15,  // Aumenta o tamanho das labels no eixo X
          },
        },
        title: {
          display: true,
          text: "Temperatura (ºC)", 
          font: {
            size: 20,  // Tamanho da fonte do título do eixo X
            weight: "bold",
          },
          padding: 0,
          color: "#FFFFFF",
        },
      },
      y: {
        display: true,
        title: {
          display: true, 
          text: "",  // Título vazio para o eixo Y
          font: {
            size: 20,  // Tamanho do título do eixo Y
          },
        },
        ticks: {
          font: {
            size: 17,  // Aumenta o tamanho das labels no eixo Y
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Temperatura atual das máquinas",
        font: {
          size: 20,  // Tamanho da fonte do título do gráfico
        },
        padding: 0,
      },
    },
  },
});


const chart3 = new Chart(ctx3, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Temperatura",
        data: '',
        borderWidth: 2,
        backgroundColor: "#eb9a05",
        borderColor: "#eb9a05",
        color: "#eb9a05",
      },
      {
        label: "Temperatura maxima",
        data: [],
        borderWidth: 2,
        
        borderColor: "red",
        color: "#fff",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "Temperatura minima",
        data: [],
        borderWidth: 2,
        
        borderColor: "rgb(78, 150, 244)",
        color: "#fff",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
        title: {
          display: true, 
          text: "Temperatura (ºC)", 
          font: {
            size: 20, 
          },
          color: "#FFFFFF", 
        },
        ticks: {
          font: {
            size: 15,  // Aumenta o tamanho das labels no eixo Y
          },
        },
      },
      x: {
        display: true, 
        title: {
          display: true, 
          text: "Horário", 
          font: {
            size: 20, 
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 15,  // Aumenta o tamanho das labels no eixo Y
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Temperatura indiviual",
        font: {
          size: 20, 
        },
        padding: 0,
      },
    },
    responsive: true
  },
});

let intervalId;  // Declarar intervalId no escopo global

var opcao_global;
async function grafico1 (opcao) {
  opcao_global = opcao;
  var IdSetor = slc_setor.value
  var setor = lista_setores[IdSetor-1]

  try {
    const graficoMedia = async () => {
      try {                
        const resposta = await fetch(`/dashboard/grafico1/${opcao}/${setor}`);
        if (!resposta.ok) {
          throw new Error(`Erro na requisição: ${resposta.statusText}`);
        }

        // Obtém os dados do JSON
        const data = await resposta.json();
        console.log("Dados recebidos da média:", data); 
         // Log dos dados recebidos para depuração
         var lista_x=[]
         var lista_y=[]
         var lista_meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro', 'Novembro','Dezembro']
         console.log("Tamanho do array:", data.data.length);

         for (let cont = 0; cont < data.data.length; cont++) {
           const elemento = data.data[cont];
           var x = elemento.Data

          if(opcao == 2){
            var x = lista_meses[elemento.Data -1]
          }

          var y = elemento.media

          lista_x.push(x)
          lista_y.push(y)     
         }


         if(opcao == 1){
          chart.config.options.plugins.title.text = "Temperatura média das últimos 24 hrs";
          chart.options.scales.x.title.text = "Dia"; 
        } else if(opcao == 2){
           chart.config.options.plugins.title.text = "Temperatura média dos últimos meses";
           chart.options.scales.x.title.text = "Mês"; 
        } else if (opcao == 3){
          chart.config.options.plugins.title.text = "Temperatura média dos últimos anos";
          chart.options.scales.x.title.text = "Ano"; 
        }
         chart.data.labels = lista_x;
         chart.data.datasets[0].data = lista_y;        
         chart.update();
      } catch (error) {
        console.error('Erro ao carregar os dados do gráfico média:', error);
      }
    };

    // Faz a requisição inicial para carregar os dados
    await graficoMedia();    
  } catch (error) {
    console.error('Erro ao carregar os dados do gráfico:', error);
  }
}

lista_setores = []
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
        const selectElement = document.getElementById('slc_setor');

        // Limpa o conteúdo do <select> antes de adicionar novas opções
        selectElement.innerHTML = '';

        // Adiciona uma opção para cada setor
        data.data.forEach(setor => {
            const option = document.createElement('option');
            option.value = setor.idSetor;  // O valor da opção é o id do setor
            option.textContent = setor.Nome;  // O texto da opção é o nome do setor
            lista_setores.push(setor.Nome)
            selectElement.appendChild(option);
        });

        // Chama a função para preencher as máquinas e carregar o gráfico com o setor selecionado
        const idSetor = selectElement.value; // Pegue o valor do setor selecionado
        await preencherSelect(idSetor); 
        await grafico1(1)// Chama para preencher as máquinas e carregar o gráfico

    } else {
        
    }
  } catch (error) {
    console.error('Erro ao carregar setores:', error);
  }
}

// Esta função preencherá o select com as máquinas e fará a consulta ao gráfico
async function preencherSelect(idSetor) {
  try {
    // Faz a requisição para obter as máquinas do setor
    const response = await fetch(`/dashboard/maquinas/${idSetor}`);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
  
    // Seleciona o elemento <select> para preencher
    const select = document.getElementById('sltSensor');
    select.innerHTML = ''; // Limpa o conteúdo atual do select
    
    // Preenche o select com as máquinas
    data.data.forEach((maquina, index) => {
      const option = document.createElement('option');
      option.value = maquina.idMaquina;
      option.textContent = maquina.nome;
      
      // Marca a primeira opção como selecionada
      if (index === 0) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    // Depois de preencher o select, chama a função para carregar o gráfico com o primeiro valor
    const value = select.value;
    await sensorChange(value); // Chama a função de mudança de sensor para carregar o gráfico
    await grafico2(idSetor)
  } catch (error) {
    console.error('Erro ao preencher o select:', error);
  }
}

// Função para atualizar o gráfico com o novo sensor selecionado
async function sensorChange(value) {
  try {
    // Limpa qualquer intervalo anterior
    if (intervalId) clearInterval(intervalId);

    // Função que realiza a requisição e atualiza o gráfico
    const fetchDataAndUpdateChart = async () => {
      try {
        // Faz a requisição para a rota com o idMaquina
        const response = await fetch(`/dashboard/grafico3/${value}`);
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // Obtém os dados do JSON
        const data = await response.json();
        

        // Verifica se a estrutura de dados existe antes de tentar acessar
        if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
          // Itera sobre todos os pontos de dados
          data.data.forEach((item) => {
            // Verifica se o item contém as propriedades necessárias
            if (item.dataHora && item.temperatura !== undefined && item.tempMax !== undefined && item.tempMinima !== undefined) {
              const horario = new Date(item.dataHora).toLocaleTimeString();
              
              // Verifica se o gráfico já contém 10 pontos e remove o primeiro se necessário
              if (chart3.data.labels.length === 10 && chart3.data.datasets[0].data.length === 10) {
                // Remove o primeiro item de cada lista para garantir que só existem 10 pontos
                chart3.data.labels.shift();
                chart3.data.datasets[0].data.shift();
                chart3.data.datasets[1].data.shift();
                chart3.data.datasets[2].data.shift();
              }

              // Adiciona os novos valores ao gráfico
              chart3.data.labels.push(horario);
              chart3.data.datasets[0].data.push(item.temperatura);
              chart3.data.datasets[1].data.push(Number(item.tempMax));
              chart3.data.datasets[2].data.push(Number(item.tempMinima));

              

              // Atualiza o gráfico após adicionar os novos dados
              chart3.update();
            } else {
              console.error("O item não contém todas as propriedades necessárias.");
            }
          });
        } else {
          
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do gráfico:', error);
      }
    };

    // Faz a requisição inicial para carregar os dados
    await fetchDataAndUpdateChart();

    // Cria o intervalo para a repetição a cada 1 segundo
    intervalId = setInterval(async () => {
      await fetchDataAndUpdateChart();
    }, 1000); // Atualiza a cada 1 segundo
    
  } catch (error) {
    console.error('Erro ao carregar os dados do gráfico:', error);
  }
}

// Chamando carregarSetores() para iniciar o processo de carregamento
document.addEventListener('DOMContentLoaded', () => {
  carregarSetores(); // Inicia o carregamento de setores
});

// Adiciona o evento de mudança para o select de setores
document.getElementById('slc_setor').addEventListener('change', async (event) => {
  const idSetor = event.target.value;  // Obtém o id do setor selecionado
  await preencherSelect(idSetor);  // Preenche as máquinas e atualiza o gráfico
  await grafico2(idSetor);  // Atualiza o gráfico com o novo setor selecionado
  await grafico1(opcao_global);
});


let intervalo; // Variável para armazenar o ID do intervalo e limpar se necessário

// Função que será chamada ao carregar a página para inicializar o gráfico 2

async function grafico2(idSetor) {
  try {
    // Função para fazer a requisição e atualizar o gráfico
    const fetchDataAndUpdateChart = async () => {
      // Realiza a requisição para a API
      const response = await fetch(`/dashboard/grafico2/${idSetor}`);
      const data = await response.json();

      // Extraindo os nomes das máquinas e as temperaturas
      const labels = data.data.map(item => item.nome);  // Nomes das máquinas
      const temperaturas = data.data.map(item => item.temperatura);  // Temperaturas das máquinas

      // Função para gerar a cor com base na temperatura
      const generateColor = (temperatura) => {
        if (temperatura > 140) {
          return "rgba(255, 0, 0, 1)";  // Vermelho para temperaturas maiores que 140
        } else if (temperatura < 100) {
          return "rgba(78, 150, 255, 1)";  // Azul para temperaturas menores que 100
        } else {
          return "rgb(149, 245, 154)";  // Laranja para temperaturas entre 100 e 140
        }
      };

      // Verificando se chart2 e datasets estão definidos
      if (!chart2.data.datasets || chart2.data.datasets.length === 0) {
        // Inicializa o dataset caso não esteja definido
        chart2.data.datasets = [{
          label: "Temperaturas das Máquinas", 
          data: temperaturas,  // Temperaturas associadas a cada máquina
          borderWidth: 1,
          backgroundColor: temperaturas.map(generateColor),  // Atribui cor com base na temperatura
        }];
      } else {
        // Atualizando os datasets com as novas temperaturas e cores
        chart2.data.datasets[0].data = temperaturas;  // Temperaturas associadas a cada máquina
        chart2.data.datasets[0].backgroundColor = temperaturas.map(generateColor);  // Atribui cor com base na temperatura
      }

      // Atualizando as labels do gráfico
      chart2.data.labels = labels;  // Nomes das máquinas no eixo Y

      // Atualiza o gráfico sem recriar a estrutura
      chart2.update();
    };

    // Atualiza o gráfico inicialmente
    await fetchDataAndUpdateChart();

    // Configura o intervalo para atualizar o gráfico a cada 1 segundo
    if (intervalo) clearInterval(intervalo); // Limpa o intervalo anterior
    intervalo = setInterval(fetchDataAndUpdateChart, 1000);  // Atualiza a cada 1 segundo

  } catch (error) {
    console.error("Erro ao carregar ou atualizar o gráfico:", error);
  }
}