const data = {
  labels: compra,
  emprestimo,
  venda,
  pix,
  datasets: [
    {
      label: "My first dataset",
      backgroundColor: [
        "rgb(255,99,132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(105, 205, 86)",
      ],
      active: true,
      hoverOffset: 5,
      borderColor: "rgb(0,0,0)",
      data: [50, 30, 10, 50],
    },
  ],
};
const config = {
  type: "pie",
  data: data,
  options: {},
};
const myChart = new Chart(document.getElementById("myChart"), config);
