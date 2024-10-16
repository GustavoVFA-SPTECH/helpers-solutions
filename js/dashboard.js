const ctx = document.getElementById("myChart");
const ctx2 = document.getElementById("myChart_2");
const ctx3 = document.getElementById("myChart_3");
const ctx4 = document.getElementById("myChart_4");

// Criação do gradiente
const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0.1, "rgba(255,240,0,1)"); // Cor amarela
gradient.addColorStop(0.9, "rgba(255,170,0,1)"); // Cor laranja
gradient.addColorStop(0.5, "rgba(219,89,6,1)"); // Cor vermelha
Chart.defaults.color = '#FFF';

new Chart(ctx, {
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
        label: "Temperatura Média por Sensor",
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
          stepSize: 10, // Define o intervalo do eixo Y para 10 em 10
        },
      },
    },
  },
});



new Chart(ctx2, {
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
        label: "Temperatura Atual das Sensores",
        data: [97, 93, 118, 105, 135, 108, 93, 95, 112, 100, 105, 80],
        borderWidth: 1,
        backgroundColor: gradient,
      },
    ],
  },
  options: {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 150, // Define a escala máxima do eixo Y
        ticks: {
          stepSize: 10, // Define o intervalo do eixo Y para 10 em 10
        },
      },
    },
  },
});


new Chart(ctx3, {
  type: "line",
  data: {
    labels: ["8:00", "9:00", "10:00", "11:00", "12:00", '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    datasets: [
      {
        label: "Temperatura do Sensor 1",
        data: [90, 95, 110, 100, 115, 98, 100, 95, 110, 100, 115],
        borderWidth: 2,
        backgroundColor: gradient,
        borderColor: gradient,
        color: '#fff',
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        max: 130,
      },
    },
  },
});

new Chart(ctx4, {
  type: "doughnut",
  data: {
    labels: [
      "Sensor 1",
      "Sensor 2",
      "Sensor 3",
      "Sensor 4",
      "Sensor 5",
      "Sensor 6",
    ],
    datasets: [
      {
        label: "Temperatura Média por Sensor",
        data: [90, 95, 110, 100, 115, 98],
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
          stepSize: 10, // Define o intervalo do eixo Y para 10 em 10
        },
      },
    },
  },
});