async function loadAverageIncome() {
    let graphicData = [{
        "renda_domiciliar_quinto_mais_pobre": 0,
        "renda_domiciliar_segundo_quinto_mais_pobre": 0,
        "renda_domiciliar_terceiro_quinto_mais_pobre": 0,
        "renda_domiciliar_quarto_quinto_mais_pobre": 0,
        "renda_domiciliar_quinto_mais_rico": 0
    }];

    try {
        const resposta = await fetch(`/data/getMediaByFifth/${fkDistrito}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            graphicData = await resposta.json();
        } else {
            console.log(resposta);
        }
    } catch (erro) {
        console.error(erro);
    }

    const ctx2 = document.getElementById('meuGraficoBarras').getContext('2d');
    const meuGraficoBarras = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['1/5', '2/5', '3/5', '4/5', '5/5'],
            datasets: [{
                label: '',
                data: Object.values(graphicData[0]),
                backgroundColor: 'white',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    grid: {
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }
    });
}

async function loadPriceFluctuation() {
    let graphicData = [
        {
            "ano": 2025,
            "media_preco_metro_quadrado": "0"
        },
        {
            "ano": 2024,
            "media_preco_metro_quadrado": "0"
        },
        {
            "ano": 2023,
            "media_preco_metro_quadrado": "0"
        },
        {
            "ano": 2022,
            "media_preco_metro_quadrado": "0"
        },
        {
            "ano": 2021,
            "media_preco_metro_quadrado": "0"
        }
    ];

    try {
        const resposta = await fetch(`/data/getPriceFluctuation/${fkDistrito}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.ok) {
            let data = await resposta.json();
            if (data.length > 0) {
                graphicData = data;
            }
        } else {
            console.log(resposta);
        }
    } catch (erro) {
        console.error(erro);
    }

    const ctx = document.getElementById('meuGrafico').getContext('2d');
    const meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.values(graphicData).map(item => item.ano).reverse(),
            datasets: [{
                label: '',
                data: Object.values(graphicData).map(item => item.media_preco_metro_quadrado).reverse(),
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    grid: {
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    },
                    min: 0
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadAverageIncome();
    loadPriceFluctuation();
});