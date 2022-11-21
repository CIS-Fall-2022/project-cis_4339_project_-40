<template>
        <canvas ref="myChart"></canvas> <!-- references chart -->
    </template>
    <!-- THis is a template we got from class and from Chart JS. -->
    <script> 
    import { Chart, registerables } from 'chart.js'
    Chart.register(...registerables);
    export default {
        props: { //props that will be used for labels and chart data
            label: {
                type: Array,
            },
            chartData: {
                type: Array,
            },
        }, 
        async mounted() {
            console.log(this.chartData);
            await new Chart(this.$refs.myChart, {
                type: "bar",
                data: {
                    labels: this.label,
                    datasets: [
                        {
                            label: "Total Attendees",  //labels for the bar graph and the data that will be pushed into it from the backend.
                            backgroundColor: "rgb(189, 209, 228)",
                            data: this.chartData,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            min: 0
                        }
                    }
                }
            });
        },
    };
    </script>