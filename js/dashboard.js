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
          stepSize: 10, // Define o intervalo do eixo Y para 10 em 10
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Temperatura média dos sensores',
      },
    },
  },
});

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: [
      "Maquinas"
    ],
    datasets: [
      {
        label: "Sensor 1",
        data: [97],
        borderWidth: 1,
        backgroundColor: 'rgba(255, 165, 0, 1)', // Laranja
      },
      {
        label: "Sensor 2",
        data: [20],
        borderWidth: 1,
        backgroundColor: 'rgba(78, 150, 244)', // Laranja Escuro
      },
      {
        label: "Sensor 3",
        data: [90],
        borderWidth: 1,
        backgroundColor: 'rgba(255, 120, 0, 1)', // Laranja Claro
      },
      {
        label: "Sensor 4",
        data: [110],
        borderWidth: 1,
        backgroundColor: 'rgba(255, 110, 0, 1)', // Laranja mais intenso
      },
      {
        label: "Sensor 5",
        data: [200],
        borderWidth: 1,
        backgroundColor: 'rgba(255, 0, 0)', // Laranja mais escuro
      }
    ],
  },
  options: {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 150,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Temperatura atual dos sensores',
      },
    },
  },
});




new Chart(ctx3, {
  type: "line",
  data: {
    labels: ["8:00", "9:00", "10:00", "11:00", "12:00", '13:00', '14:00', '15:00', '16:00', '17:00', '18:00','19:00', '20:00'],
    datasets: [
      {
        label: "Sensor 1",
        data: [90, 95, 110, 100, 115, 98, 100, 95, 110, 100, 115, 107, 120],
        borderWidth: 2,
        backgroundColor: gradient,
        borderColor: gradient,
        color: '#fff',
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 200,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Temperatura indiviual',
      },
    },
  },
});

