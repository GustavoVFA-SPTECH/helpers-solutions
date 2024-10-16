const ctx = document.getElementById("myChart");
  const ctx2 = document.getElementById("myChart_2");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Sensor 1", "Sensor 2", "Sensor 3", "Sensor 4", "Sensor 5", "Sensor 6"],
      datasets: [
        {
          label: "Temperatura Média por Sensor",
          data: [90, 95, 110, 100, 115, 98],
          borderWidth: 1,
          backgroundColor: "#F66B0E",
        },
      ],
    },
    options: {  
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          backgroundColor: "#F66B0E",
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });