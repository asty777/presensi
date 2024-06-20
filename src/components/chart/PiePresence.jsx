import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const PiePresence = () => {
  const [chartData, setChartData] = useState(null);
  const { guid_user } = useParams();

  useEffect(() => {
    fetchChartData();
  }, [guid_user]);

  const fetchChartData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://192.168.10.103:8008/company/user/presence/graph/${guid_user}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = response.data;
      const presenceByMonth = data.presenceByMonth;
      const labels = Object.keys(presenceByMonth);
      const percentages = labels.map(month => parseFloat(presenceByMonth[month].hadirPercentage));

      console.log("Labels:", labels);
      console.log("Percentages:", percentages);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Presence Percentage',
            data: percentages,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Failed to fetch chart data:', error.message);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = parseFloat(currentValue).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Presensi Kehadiran</h2>
      {chartData ? <Pie data={chartData} options={options} /> : <p>Loading chart data...</p>}
    </div>
  );
};

export default PiePresence;


