async function loadAverageIncome() {
    let graphicData = [{
        "renda_domiciliar_quinto_mais_pobre": 0,
        "renda_domiciliar_segundo_quinto_mais_pobre": 0,
        "renda_domiciliar_terceiro_quinto_mais_pobre": 0,
        "renda_domiciliar_quarto_quinto_mais_pobre": 0,
        "renda_domiciliar_quinto_mais_rico": 0
    }];

    try {
        const resposta = await fetch(`/data/getMediaByFifth/${regionId}`, {
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
    let graphicData;

    try {
        const resposta = await fetch(`/data/getPriceFluctuation/${regionId}`, {
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

    const mediasPorMes = graphicData.reduce((acc, item) => {
        const data = new Date(item.data_precificacao);
        const mesAno = data.toISOString().substring(0, 7);

        if (!acc[mesAno]) {
            acc[mesAno] = {
                soma: 0,
                quantidade: 0,
                mes: data.toLocaleDateString('pt-BR', { month: 'long' })
            };
        }

        acc[mesAno].soma += parseFloat(item.preco);
        acc[mesAno].quantidade += 1;

        return acc;
    }, {});

    // Calcular médias finais e preparar dados para o gráfico
    const dadosProcessados = Object.entries(mediasPorMes)
        .sort(([mesAnoA], [mesAnoB]) => mesAnoA.localeCompare(mesAnoB))
        .map(([_, dados]) => ({
            mes: dados.mes.charAt(0).toUpperCase() + dados.mes.slice(1),
            media: dados.soma / dados.quantidade
        }));

    const meses = dadosProcessados.map(item => item.mes);
    const medias = dadosProcessados.map(item => item.media);

    const ctx = document.getElementById('meuGrafico').getContext('2d');
    const meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: '',
                data: medias,
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
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadAverageIncome();
    loadPriceFluctuation();
});