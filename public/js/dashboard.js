const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("myChart2");
const ctx3 = document.getElementById("myChart3");

const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0.1, "rgba(255,240,0,1)"); 
gradient.addColorStop(0.9, "rgba(255,170,0,1)"); 
gradient.addColorStop(0.5, "rgba(219,89,6,1)"); 
Chart.defaults.color = "#FFF";


const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        borderWidth: 1,
        backgroundColor: gradient, 
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 150, 
        ticks: {
          stepSize: 20, 
        },
        title: {
          display: true, 
          text: "Temperatura (ºC)", 
          font: {
            size: 14, 
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
    labels: [""],
    datasets: [
      {
        label: "Máquina 1",
        data: [97],
        borderWidth: 1,
        backgroundColor: "rgba(255, 165, 0, 1)", 
      },
      {
        label: "Máquina 2",
        data: [20],
        borderWidth: 1,
        backgroundColor: "rgba(78, 150, 244)", 
      },
      {
        label: "Máquina 3",
        data: [90],
        borderWidth: 1,
        backgroundColor: "rgba(255, 120, 0, 1)", 
      },
      {
        label: "Máquina 4",
        data: [110],
        borderWidth: 1,
        backgroundColor: "rgba(255, 110, 0, 1)", 
      },
      {
        label: "Máquina 5",
        data: [200],
        borderWidth: 1,
        backgroundColor: "rgba(255, 0, 0)", 
      },
    ],
  },
  options: {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 180,
        ticks: {
          stepSize: 10,
        },
        title: {
          display: true, 
          text: "Temperatura (ºC)", 
          font: {
            size: 16, 
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
          text: "Máquinas", 
          font: {
            size: 20, 
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Temperatura atual das máquinas",
        font: {
          size: 20, 
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
            size: 14, 
          },
          color: "#FFFFFF", 
        },
      },
      x: {
        display: true, 
        title: {
          display: true, 
          text: "Horário", 
          font: {
            size: 16, 
            weight: "bold",
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
            selectElement.appendChild(option);
        });

        // Chama a função para preencher as máquinas e carregar o gráfico com o setor selecionado
        const idSetor = selectElement.value; // Pegue o valor do setor selecionado
        await preencherSelect(idSetor); // Chama para preencher as máquinas e carregar o gráfico

    } else {
        console.log('Nenhum setor encontrado');
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
        const response = await fetch(`/dashboard/grafico2/${value}`);
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // Obtém os dados do JSON
        const data = await response.json();
        console.log("Dados recebidos:", data);  // Log dos dados recebidos para depuração

        // Verifica se a estrutura de dados existe antes de tentar acessar
        if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
          // Itera sobre todos os pontos de dados
          data.data.forEach((item) => {
            // Verifica se o item contém as propriedades necessárias
            if (item.dataHora && item.temperatura !== undefined && item.tempMax !== undefined && item.tempMinima !== undefined) {
              const horario = new Date(item.dataHora).toLocaleTimeString();
              
              console.log(`Novo ponto: ${horario}, Temperatura: ${item.temperatura}, Max: ${item.tempMax}, Min: ${item.tempMinima}`);

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

              console.log("Dados do gráfico após inserção:", chart3.data);  // Log do gráfico após inserção dos dados

              // Atualiza o gráfico após adicionar os novos dados
              chart3.update();
            } else {
              console.error("O item não contém todas as propriedades necessárias.");
            }
          });
        } else {
          console.log("Nenhum dado válido para processar ou estrutura de dados inesperada.");
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
});



function informacoes_menuLateral(){
  var Empresa = document.getElementById('public_empresa')
  var Usuario = document.getElementById('public_nome')
  Empresa.innerHTML= `${sessionStorage.RAZAO_SOCIAL}`;
  Usuario.innerHTML= `${sessionStorage.NOME_USUARIO}`;
}

