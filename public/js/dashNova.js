const ctx = document.getElementById('meuGrafico').getContext('2d');

const meuGrafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar'],
        datasets: [{
            label: '', // sem legenda
            data: [10, 12,15],
            borderColor: 'white', // linha branca
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // preenchimento suave (opcional)
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // oculta legenda
            },
            title: {
                display: false // oculta título
            }
        },
        scales: {
            x: {
                grid: {
                    display: false // remove linhas verticais
                },
                ticks: {
                    color: 'white' // texto do eixo X branco
                }
            },
            y: {
                grid: {
                    color: 'white' // apenas linhas horizontais brancas
                },
                ticks: {
                    color: 'white' // texto do eixo Y branco
                }
            }
        }
    }
});


const ctx2 = document.getElementById('meuGraficoBarras').getContext('2d');

const meuGraficoBarras = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [{
            label: '', // sem legenda
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'white', // cor das barras
            borderRadius: 5 // borda arredondada das barras (opcional)
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // oculta legenda
            },
            title: {
                display: false // oculta título
            }
        },
        scales: {
            x: {
                grid: {
                    display: false // remove linhas verticais
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                grid: {
                    color: 'white' // linhas horizontais brancas
                },
                ticks: {
                    color: 'white'
                }
            }
        }
    }
});

