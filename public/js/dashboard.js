const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("myChart_2");
const ctx3 = document.getElementById("myChart_3");

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
        text: "Temperatura média dos sensores ultimas 24h",
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
        label: "Sensor 1",
        data: [97],
        borderWidth: 1,
        backgroundColor: "rgba(255, 165, 0, 1)", 
      },
      {
        label: "Sensor 2",
        data: [20],
        borderWidth: 1,
        backgroundColor: "rgba(78, 150, 244)", 
      },
      {
        label: "Sensor 3",
        data: [90],
        borderWidth: 1,
        backgroundColor: "rgba(255, 120, 0, 1)", 
      },
      {
        label: "Sensor 4",
        data: [110],
        borderWidth: 1,
        backgroundColor: "rgba(255, 110, 0, 1)", 
      },
      {
        label: "Sensor 5",
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
        text: "Temperatura atual dos sensores",
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
        min: 20,
        max: 180,
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
  },
});

sessionStorage.ID_EMPRESA = 1;

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
  
    const select = document.getElementById('slc_sensor');

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

    // Zera os dados do gráfico
    chart3.data.labels = [];
    chart3.data.datasets[0].data = [];
    chart3.data.datasets[1].data = [];
    chart3.data.datasets[2].data = [];
    chart3.update();

    // Faz a requisição para a rota com o idMaquina
    const response = await fetch(`/dashboard/grafico2/${value}`);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    // Obtém os dados do JSON
    const data = await response.json();

    // Atualiza os dados do gráfico de 1 em 1 segundo
    let index = 0;
    intervalId = setInterval(() => {
      if (index < data.data.length) {
        const ponto = data.data[index];
        const horario = new Date(ponto.dataHora).toLocaleTimeString();

        // Adiciona os novos valores
        chart3.data.labels.push(horario);
        chart3.data.datasets[0].data.push(ponto.temperatura);
        chart3.data.datasets[1].data.push(Number(ponto.tempMax));
        chart3.data.datasets[2].data.push(Number(ponto.tempMinima));

        // Limita o gráfico para mostrar apenas os últimos 5 pontos
        if (chart3.data.labels.length > 5) {
          chart3.data.labels.shift();
          chart3.data.datasets[0].data.shift();
          chart3.data.datasets[1].data.shift();
          chart3.data.datasets[2].data.shift();
        }

        // Atualiza o gráfico
        chart3.update();
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  } catch (error) {
    console.error('Erro ao carregar os dados do gráfico:', error);
  }
}

function informacoes_menuLateral(){
  public_empresa.innerHTML= `${sessionStorage.RAZAO_SOCIAL}`;
  public_nome.innerHTML= `${sessionStorage.NOME_USUARIO}`;
}