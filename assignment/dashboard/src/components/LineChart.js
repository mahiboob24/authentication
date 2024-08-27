import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import './chartSetup'


const LineChart = React.memo(({ data }) => {
  const chartData = useMemo(() => ({
    labels: data.labels,
    datasets: [
      {
        label: 'User Data',
        data: data.values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointHoverBorderColor: '#fff',
      },
    ],
  }), [data]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X-Axis Label',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y-Axis Label',
        },
      },
    },
  }), []);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
});

export default LineChart;
