const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("myChart_2");
const ctx3 = document.getElementById("myChart_3");

// Criação do gradiente
const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0.1, "rgba(255,240,0,1)"); // Cor amarela
gradient.addColorStop(0.9, "rgba(255,170,0,1)"); // Cor laranja
gradient.addColorStop(0.5, "rgba(219,89,6,1)"); // Cor vermelha
Chart.defaults.color = "#FFF";

//Grafico Temperatura média
const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Sensor 1",
      "Sensor 2",
      "Sensor 3",
      "Sensor 4",
      "Sensor 5",
      "Sensor 6",
      "Sensor 7",
      "Sensor 8",
      "Sensor 9",
      "Sensor 10",
      "Sensor 11",
      "Sensor 12",
    ],
    datasets: [
      {
        label: "",
        data: [90, 95, 110, 100, 115, 98, 90, 95, 110, 100, 115, 98],
        borderWidth: 1,
        backgroundColor: gradient, // Use o gradiente como cor de fundo
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 150, // Define a escala máxima do eixo Y
        ticks: {
          stepSize: 20, // Define o intervalo do eixo Y para 10 em 10
        },
        title: {
          display: true, // Mostra o título do eixo Y
          text: "Temperatura (ºC)", // Texto do título do eixo Y
          font: {
            size: 14, // Tamanho da fonte do título
          },
          color: "#FFFFFF", // Cor da fonte do título
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Temperatura média dos sensores ultimas 24h",
        font: {
          size: 20, // Tamanho da fonte da legenda
        },
      },
    },
  },
});
//Grafico temperatura atual dos sensores
const chart2 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: [""],
    datasets: [
      {
        label: "Sensor 1",
        data: [97],
        borderWidth: 1,
        backgroundColor: "rgba(255, 165, 0, 1)", // Laranja
      },
      {
        label: "Sensor 2",
        data: [20],
        borderWidth: 1,
        backgroundColor: "rgba(78, 150, 244)", // Laranja Escuro
      },
      {
        label: "Sensor 3",
        data: [90],
        borderWidth: 1,
        backgroundColor: "rgba(255, 120, 0, 1)", // Laranja Claro
      },
      {
        label: "Sensor 4",
        data: [110],
        borderWidth: 1,
        backgroundColor: "rgba(255, 110, 0, 1)", // Laranja mais intenso
      },
      {
        label: "Sensor 5",
        data: [200],
        borderWidth: 1,
        backgroundColor: "rgba(255, 0, 0)", // Laranja mais escuro
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
          display: true, // Mostra o título do eixo Y
          text: "Temperatura (ºC)", // Texto do título do eixo Y
          font: {
            size: 16, // Tamanho da fonte do título
            weight: "bold",
          },
          padding: 0,
          color: "#FFFFFF", // Cor da fonte do título
        },
      },
      y: {
        display: true, // Exibe o eixo Y
        title: {
          display: true, // Exibe a legenda
          text: "Máquinas", // Texto da legenda do eixo Y
          font: {
            size: 20, // Tamanho da fonte da legenda
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Temperatura atual dos sensores",
        font: {
          size: 20, // Tamanho da fonte da legenda
        },
        padding: 0,
      },
    },
  },
});
//Grafico temperatura individual do sensor
const chart3 = new Chart(ctx3, {
  type: "line",
  data: {
    labels: [
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
    ],
    datasets: [
      {
        label: "Temperatura",
        data: [105, 110, 125, 115, 130, 123, 115, 110, 125, 115, 130, 122, 135],
        borderWidth: 2,
        backgroundColor: "#eb9a05",
        borderColor: "#eb9a05",
        color: "#eb9a05",
      },
      {
        label: "Temperatura maxima",
        data: [
          150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
        ],
        borderWidth: 2,
        // backgroundColor: "blue",
        borderColor: "red",
        color: "#fff",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "Temperatura minima",
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        borderWidth: 2,
        // backgroundColor: "blue",
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
          display: true, // Mostra o título do eixo Y
          text: "Temperatura (ºC)", // Texto do título do eixo Y
          font: {
            size: 14, // Tamanho da fonte do título
          },
          color: "#FFFFFF", // Cor da fonte do título
        },
      },
      x: {
        display: true, // Exibe o eixo Y
        title: {
          display: true, // Exibe a legenda
          text: "Horário", // Texto da legenda do eixo Y
          font: {
            size: 16, // Tamanho da fonte da legenda
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
          size: 20, // Tamanho da fonte da legenda
        },
        padding: 0,
      },
    },
  },
});

//Reseta a cor dos botões anteriores
function resetButtonStyles() {
  var buttons = document.querySelectorAll("#btn_dia, #btn_mes, #btn_ano");
  buttons.forEach(function (btn) {
    btn.style.backgroundColor = "#f66b0e";
    btn.style.color = "#FFF";
  });
}
//Muda o grafico para as ultimas 24 horas
function dia() {
  resetButtonStyles(); // Reseta os estilos dos botões
  var btn = document.getElementById("btn_dia");
  chart.data.datasets[0].data = [
    90, 95, 110, 100, 115, 98, 90, 95, 110, 100, 115, 98,
  ];
  chart.options.plugins.title.text =
    "Temperatura média dos sensores ultimas 24h";
  btn.style.backgroundColor = "#FFF";
  btn.style.color = "#a54809";
  chart.update();
}
//Muda o grafico para os ultimos 30 dias
function mes() {
  resetButtonStyles(); // Reseta os estilos dos botões
  var btn = document.getElementById("btn_mes");
  chart.data.datasets[0].data = [
    110, 90, 80, 95, 120, 115, 100, 95, 110, 103, 108, 107,
  ];
  chart.options.plugins.title.text =
    "Temperatura média dos sensores ultimos 30 dias";
  btn.style.backgroundColor = "#FFF";
  btn.style.color = "#a54809";
  chart.update();
}
//Muda o grafico para o ultimo ano
function ano() {
  resetButtonStyles(); // Reseta os estilos dos botões
  var btn = document.getElementById("btn_ano");
  chart.data.datasets[0].data = [
    100, 80, 70, 85, 110, 105, 90, 85, 100, 93, 98, 97,
  ];
  chart.options.plugins.title.text =
    "Temperatura média dos sensores ultimo ano";
  btn.style.backgroundColor = "#FFF";
  btn.style.color = "#a54809";
  chart.update();
}

function sensorChange(value) {
  if (value === "1") {
    sensor1();
  } else if (value === "2") {
    sensor2();
  } else if (value === "3") {
    sensor3();
  }
}

function sensor1() {
  chart3.data.datasets[0].data = [105, 110, 125, 115, 130, 123, 115, 110, 125, 115, 130, 122, 135];
  chart3.update();
}

function sensor2() {
  chart3.data.datasets[0].data = [120, 100, 90, 105, 130, 125, 110, 105, 120, 113, 118, 117, 120];
  chart3.update();
}

function sensor3() {
  chart3.data.datasets[0].data = [135, 122, 130, 115, 125, 110, 115, 123, 130, 115, 125, 110, 105];
  chart3.update();
}