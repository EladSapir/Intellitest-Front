import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './HistoryGraph.css';

// Register the components to be used with Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoryGraph = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch('/api/history-data')
      .then(response => response.json())
      .then(data => {
        setData({
          labels: data.labels,
          datasets: [{
            label: 'Accuracy',
            data: data.values,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }]
        });
      });
  }, []);

  return (
    <div className="history-graph">
      <h3>History Graph</h3>
      <Line data={data} />
    </div>
  );
};

export default HistoryGraph;
