import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './HistoryGraph.css';

// Register the components to be used with Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoryGraph = () => {
  // Get the current month and set up the last 6 months labels
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = new Date().getMonth();
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => monthNames[(currentMonth - i + 12) % 12]).reverse();

  const [data, setData] = useState({
    labels: lastSixMonths,
    datasets: [{
      label: 'Accuracy',
      data: Array(6).fill(0),
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }],
  });

  useEffect(() => {
    fetch('/api/history-data')
      .then(response => response.json())
      .then(fetchedData => {
        if (fetchedData.labels.length && fetchedData.values.length) {
          setData({
            labels: fetchedData.labels,
            datasets: [{
              label: 'Accuracy',
              data: fetchedData.values,
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1
            }]
          });
        }
      });
  }, []);

  // Chart options with y-axis scale from 0% to 100% with 10% intervals
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function(value) {
            return value + '%'; // Add percentage sign to y-axis labels
          }
        }
      }
    }
  };

  return (
    <div className="history-graph">
      <h3>History Graph</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default HistoryGraph;
