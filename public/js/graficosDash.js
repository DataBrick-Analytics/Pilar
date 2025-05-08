
const ctx2 = document.getElementById('meuGraficoBarras').getContext('2d');
const meuGraficoBarras = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['1/5', '2/5', '3/5', '4/5', '5/5'],
        datasets: [{
            label: '', // sem legenda
            data: [329.29, 649.43,1085.64, 1721.35, 4024.75],
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

const ctx = document.getElementById('meuGrafico').getContext('2d');
const meuGrafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Outubro', 'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro'],
        datasets: [{
            label: '', // sem legenda
            data: [9520, 9920, 10062, 11036, 11460],
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



