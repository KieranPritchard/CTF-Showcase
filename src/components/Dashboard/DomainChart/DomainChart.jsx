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
    Title
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title);

function DomainChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch("/CTF-Showcase/stats.json")
            .then((r) => r.json())
            .then((json) => {
                const expertise = json.domain_expertise;
                setChartData({
                    labels: expertise.labels,
                    datasets: [{
                        label: 'Challenges Solved',
                        data: expertise.data,
                        backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        borderColor: '#00FF88',
                        borderWidth: 2,
                        pointRadius: 5,
                        pointBackgroundColor: '#00FF88',
                        pointBorderColor: '#111',
                        pointHoverBackgroundColor: '#121A22',
                        pointHoverBorderColor: '#00FF88',
                    }],
                });
            })
            .catch((err) => console.error("Error loading JSON:", err));
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                display: false // ❌ Removed Legend Key
            },
            title: { 
                display: true, 
                text: 'Domain Expertise',
                color: '#00FF88', 
                font: { size: 18, weight: 'bold' },
                padding: { bottom: 20 }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(17, 17, 17, 0.9)',
                titleColor: '#00FF88',
                borderColor: '#00FF88',
                borderWidth: 1,
                displayColors: false,
            },
        },
        scales: {
            r: {
                beginAtZero: true,
                suggestedMax: 5,
                angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                pointLabels: {
                    color: '#00FF88',
                    font: { size: 12, weight: 'bold' }
                },
                ticks: {
                    stepSize: 1,
                    color: '#00FF88',
                    backdropColor: 'transparent'
                }
            }
        }
    };

    if (!chartData) return <div style={{ color: '#00FF88' }}>Loading Domain Stats...</div>;

    return (
        <div style={{ height: '450px', width: '100%', padding: '20px', background: '#121A22', borderRadius: '12px' }}>
            <Radar data={chartData} options={options} />
        </div>
    );
}

export default DomainChart;