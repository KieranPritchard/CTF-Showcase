import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// Line chart for progression timeline
function TimelineChart() {
    // State to hold the chart data
    const [chartData, setChartData] = useState(null);

    // Use effect to fetch stats on mount
    useEffect(() => {
        // Fetches the stats from the json file
        fetch("/CTF-Showcase/stats.json")
            // Converts the response to json
            .then((r) => r.json())
            .then((json) => {
                // Takes the timeline data
                const timeline = json.timeline;
                // Sets the chart labels and dataset
                setChartData({
                    labels: timeline.labels,
                    datasets: [
                        {
                            label: 'Total Challenges Solved',
                            data: timeline.data,
                            borderColor: '#00FF88',
                            backgroundColor: 'rgba(0, 255, 136, 0.1)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 5,
                            pointHoverRadius: 8,
                            pointBackgroundColor: '#00FF88',
                            pointBorderColor: '#111',
                            pointHoverBackgroundColor: '#121A22',
                            pointHoverBorderColor: '#00FF88',
                        }
                    ],
                });
            })
            // Catches the error
            .catch((err) => console.error("Error loading timeline:", err));
    }, []);

    // Chart options for styling and behaviour
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                position: 'top',
                labels: {
                    color: '#ffffff', // Label color for legend
                    font: { size: 14, family: 'Inter, sans-serif' },
                    padding: 20
                }
            },
            title: { 
                display: true, 
                text: 'Progression Timeline',
                color: '#00FF88', // Label color for title
                font: { size: 18, weight: 'bold' },
                padding: { bottom: 20 }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(17, 17, 17, 0.9)',
                titleColor: '#00FF88',
                titleFont: { size: 14, weight: 'bold' },
                bodyColor: '#ffffff',
                bodyFont: { size: 13 },
                borderColor: '#00FF88',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                cornerRadius: 4,
                caretSize: 6,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#00FF88', // Label color for X-axis (Dates)
                    font: { size: 12 }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)', // Subtle grid lines
                    drawBorder: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: { 
                    stepSize: 1,
                    color: '#00FF88', // Label color for Y-axis (Numbers)
                    font: { size: 12 }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)', // Subtle grid lines
                    drawBorder: false
                }
            }
        }
    };

    // If data hasnt arrived yet, show loading instead of crashing
    if (!chartData) return <div style={{ color: '#00FF88' }}>Loading Timeline...</div>;

    return (
        <div style={{ 
            height: '450px', 
            width: '100%', 
            padding: '20px', 
            background: '#121A22', // Dark background to make white labels pop
            borderRadius: '12px' 
        }}>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default TimelineChart;