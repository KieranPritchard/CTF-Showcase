import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

function DomainChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch("/CTF-Showcase/stats.json")
            .then((r) => r.json())
            .then((json) => {
                const expertise = json.domain_expertise;
                
                setChartData({
                    labels: expertise.labels,
                    datasets: [
                        {
                            label: 'Challenges Solved',
                            data: expertise.data,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 2,
                            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        },
                    ],
                });
            })
            .catch((err) => console.error("Error loading JSON:", err));
    }, []);

    const options = {
        scales: {
            r: {
                beginAtZero: true,
                // Since your max value is 6, setting a suggestedMax 
                // ensures the chart isn't cramped at the edges.
                suggestedMax: 7, 
                ticks: {
                    stepSize: 1 // Good for count-based data (1, 2, 3...)
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Subtle grid for dark mode
                },
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                pointLabels: {
                    font: {
                        size: 12
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false // Often looks cleaner on single-dataset radar charts
            }
        },
        maintainAspectRatio: false
    };

    if (!chartData) return <div>Loading...</div>;

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Radar data={chartData} options={options} />
        </div>
    );
}

export default DomainChart