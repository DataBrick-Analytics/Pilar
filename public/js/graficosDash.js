const chartLine = document.getElementById('chartLine');
new Chart(chartLine, {
    type: 'line',
    data: {
        labels: ['label', 'label', 'label', 'label', 'label', 'label'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },x: {
                grid: {
                    display: false
                }
            }
        }
    }
});


const chartPie = document.getElementById('chartPie')
new Chart(chartPie, {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})

const chartPolar = document.getElementById('chartPolar')
new Chart(chartPolar, {
    type: 'polarArea',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },x: {
                grid: {
                    display: false
                }
            }
        }
    }
})

const chartBar = document.getElementById('chartBar')
new Chart(chartBar, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: '#e66c2f',
            borderColor: '#e66c2f',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },x: {
                grid: {
                    display: false
                }
            }
        }
    }
})

const chartBar2 = document.getElementById('chartBar2')
new Chart(chartBar2, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [20, 19, 7, 5, 2, 12],
            backgroundColor: '#EE82EE',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },x: {
                grid: {
                    display: false
                }
            }
        }
    }
})

const chartBar3 = document.getElementById('chartBar3')
new Chart(chartBar3, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: '#008B8B',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                }
            },x: {
                grid: {
                    display: false
                }
            }
        }
    }
})