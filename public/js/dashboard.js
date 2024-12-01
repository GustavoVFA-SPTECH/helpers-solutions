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


function resetButtonStyles() {
  var buttons = document.querySelectorAll("#btn_dia, #btn_mes, #btn_ano");
  buttons.forEach(function (btn) {
    btn.style.backgroundColor = "#f66b0e";
    btn.style.color = "#FFF";
  });
}

async function preencherSelect() {
  try {
    
    const response = await fetch('/dashboard/maquinas')
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    const select = document.getElementById('sltSensor');

    select.innerHTML = '';
   
    data.data.forEach((maquina, index) => {
      const option = document.createElement('option');
      option.value = maquina.idMaquina;
      option.textContent = maquina.nome;
      
      if (index === 0) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao preencher o select:', error);
  }
}

window.onload = preencherSelect;

// Função para atualizar os dados do gráfico de 1 em 1 segundo
let intervalId;

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

// Função que será chamada ao carregar a página ou ao selecionar a máquina
window.onload = async () => {
  // Preenche o select com as máquinas
  await preencherSelect();

  // Pega o valor do primeiro sensor (ou valor inicial desejado)
  const select = document.getElementById('sltSensor');
  const value = select.value;

  // Inicia a atualização do gráfico automaticamente
  sensorChange(value);
};

// Função para preencher o select com máquinas
async function preencherSelect() {
  try {
    const response = await fetch('/dashboard/maquinas');
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    const select = document.getElementById('sltSensor');
    select.innerHTML = '';

    data.data.forEach((maquina, index) => {
      const option = document.createElement('option');
      option.value = maquina.idMaquina;
      option.textContent = maquina.nome;
      if (index === 0) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao preencher o select:', error);
  }
}

// Função para atualizar o gráfico com o novo sensor selecionado
document.getElementById('sltSensor').addEventListener('change', (event) => {
  // Chama a função de atualização de gráfico quando a seleção muda
  const value = event.target.value;
  sensorChange(value);
});


function informacoes_menuLateral(){
  var Empresa = document.getElementById('public_empresa')
  var Usuario = document.getElementById('public_nome')
  Empresa.innerHTML= `${sessionStorage.RAZAO_SOCIAL}`;
  Usuario.innerHTML= `${sessionStorage.NOME_USUARIO}`;
}