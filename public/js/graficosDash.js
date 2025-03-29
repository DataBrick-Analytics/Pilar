const chartlinha = document.getElementById('chartLine');

const chart = new Chart(chartlinha, {
    type: "line",
    data: {
        labels: XXXXX,
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
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
})