function calculateRuntime(originalTime, percentParallel, numThreads) {
    percentParallel /= 100.0;
    return originalTime * (1 - percentParallel) + originalTime * percentParallel / numThreads;
}

function getOriginalRuntime() {
    return +document.getElementById("runtime").value;
}

function getPercentParallel() {
    return +document.getElementById("percentParallel").value;
}

function recalculateData() {
    let originalRuntime = getOriginalRuntime();
    let percentParallel = getPercentParallel();
    $("#runtime-label").html("Program Runtime: " + originalRuntime + "s");
    $("#parallel-label").html("Percent Parallel: " + percentParallel + "%");
    return [...Array(20).keys()].map(input => calculateRuntime(originalRuntime, percentParallel, input))
}

function recalculateDataSpeedup() {
    let originalRuntime = getOriginalRuntime();
    return recalculateData().map(item => originalRuntime / item);
}

function recalculateBarData() {
    return [100 - getPercentParallel(), getPercentParallel()];
}

// Chart configurations
let chartRuntime = new Chart(
    document.getElementById('chart_runtime'),
    {
        type: 'line',
        data: {
            labels: [...Array(20).keys()],
            datasets: [
                {
                    label: 'Runtime',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: recalculateData()
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Threads',
                    },
                    min: 1,
                },
                y: {
                    title: {
                        display: true,
                        text: 'Parallel Runtime',
                    },
                    min: 0,
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Parallel Runtime'
                },
                legend: {
                    display: false,
                },
            },
        },
    }
);

let chartSpeedup = new Chart(
    document.getElementById('chart_speedup'),
    {
        type: 'line',
        data: {
            labels: [...Array(20).keys()],
            datasets: [
                {
                    label: 'Speedup',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: recalculateDataSpeedup(),
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Threads',
                    },
                    min: 1,
                },
                y: {
                    title: {
                        display: true,
                        text: 'Speedup',
                    },
                    min: 0,
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Speedup'
                },
                legend: {
                    display: false,
                },
            },
        },
    }
);

let chartBar = new Chart(
    document.getElementById('chart_bar'),
    {
        type: 'bar',
        data: {
            labels: ['Sequential', 'Parallel'],
            datasets: [
                {
                    label: 'Sequential',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: recalculateBarData(),
                },
            ],
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '% of Code',
                    },
                    min: 0,
                    max: 100,
                },
                y: {},
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Parallelized'
                },
                legend: {
                    display: false,
                },
            },
        },
    }
);

// Event listeners
$(document).ready(function() {
    $(".update-chart").change(function () {
        chartRuntime.data.datasets[0].data = recalculateData();
        chartRuntime.update();
        chartSpeedup.data.datasets[0].data = recalculateDataSpeedup();
        chartSpeedup.update();
        chartBar.data.datasets[0].data = recalculateBarData();
        chartBar.update();
    });
}); 