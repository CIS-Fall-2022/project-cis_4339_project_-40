<template>
        <canvas ref="myChart"></canvas> <!-- references chart -->
    </template>

    <script>
    import { Chart, registerables } from 'chart.js'
    Chart.register(...registerables);
    export default {
        props: {
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
                            label: "Total Attendees",
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