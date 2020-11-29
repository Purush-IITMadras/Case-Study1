const red = 'rgb(255, 99, 132)'; // red
const blue = 'rgb(54, 162, 235)'; // blue
const chart1 = document.getElementById('box-2').getContext('2d');
const chart2 = document.getElementById('box-3').getContext('2d');

let slider_1 = document.getElementById('flow_inlet');
let slider_2 = document.getElementById('heat_inlet');
let slider_3 = document.getElementById('initial_level');
let text_1 = document.getElementById('text-1');
let text_2 = document.getElementById('text-2');
let text_3 = document.getElementById('text-3');



let min_time_slider = document.getElementById('time1');
let min_time_input = document.getElementById('min-time');

let max_time_slider = document.getElementById('time2');
let max_time_input = document.getElementById('max-time');


min_time_input.oninput = function(){
    min_time_slider.value = this.value;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
}

max_time_input.oninput = function(){
    max_time_slider.value = 20;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
}

min_time_slider.oninput = function(){
    min_time_input.value = this.value;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
}

max_time_slider.oninput = function(){
    max_time_input.value = this.value;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
}

text_1.oninput = function(){
    slider_1.value = this.value*1000;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
};

text_2.oninput = function(){
    slider_2.value = this.value;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
};

text_3.oninput = function(){
    slider_3.value = this.value*20;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
};

slider_1.oninput = function(){
    text_1.value = this.value/1000;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
};
slider_2.oninput = function(){
    text_2.value = this.value;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
};
slider_3.oninput = function(){
    text_3.value = this.value/20;
    makechart(text_1.value, text_2.value, text_3.value, min_time_input.value, max_time_input.value );
};

function makechart(flow_inlet, heat_inlet, initial_level, min_time, max_time) { 

    let entry = {
        flow_inlet: flow_inlet,
        heat_inlet: heat_inlet,
        initial_level: initial_level,
        time1: min_time,
        time2: max_time
    }
    // console.log(entry);
    fetch(`${window.origin}/process-entry`, {
        method: "POST",
        body: JSON.stringify(entry),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json",
        })
    })
    .then(function (res) {
        if (res.status !== 200) {
            console.log(`Response is not 200: ${res.status}`);
            return;
        }
        
        res.json().then(function (val) {
            chart = new Chart(chart1, {
                type: 'line',
                data: {
                    labels: val.time,
                    datasets: [{
                        backgroundColor: red,
                        borderColor: red,
                        data: val.liquid_level,
                        fill: false,
                        label: 'Liquid level'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        ticks: {
                            stepSize: 15
                        },
                        yAxes: [{
                            display: true,
                            labelString: "Liquid Level",
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Time(Mins)"
                            }
                        }]
                    }
                }
            });
            chart = new Chart(chart2, {
                type: 'line',
                data: {
                    labels: val.time,
                    datasets: [{
                        backgroundColor: blue,
                        borderColor: blue,
                        data: val.temperature,
                        fill: false,
                        label: 'Temperature'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        ticks: {
                            stepSize: 15
                        },
                        yAxes: [{
                            display: true,
                            labelString: "Temperature",
                            ticks: {
                                beginAtZero: false
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Time(Mins)"
                            }
                        }]
                    }
                }  
            });
        });   
    });
}   

