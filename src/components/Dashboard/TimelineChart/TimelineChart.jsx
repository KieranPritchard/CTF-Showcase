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

function TimelineChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch("/CTF-Showcase/stats.json")
            .then((r) => r.json())
            .then((json) => {
                const timeline = json.timeline;
                
                setChartData({
                    labels: timeline.labels,
                    datasets: [
                        {
                            label: 'Total Challenges Solved',
                            data: timeline.data,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.1)',
                            fill: true, // Fills the area under the line
                            tension: 0.4, // Makes the line curved/smooth
                            pointRadius: 5,
                            pointHoverRadius: 8,
                        },
                    ],
                });
            })
            .catch((err) => console.error("Error loading timeline:", err));
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Progression Timeline' },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
            }
        }
    };

    if (!chartData) return <div>Loading Timeline...</div>;

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default TimelineChart