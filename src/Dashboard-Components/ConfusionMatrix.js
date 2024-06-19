import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './ConfusionMatrix.css';

// Register the components to be used with Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ConfusionMatrix = () => {
  const [data, setData] = useState({
    datasets: [],
  });

  useEffect(() => {
    fetch('/api/confusion-matrix-data')
      .then(response => response.json())
      .then(data => {
        setData({
          datasets: [{
            label: 'Confusion Matrix',
            data: data.values,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }]
        });
      });
  }, []);

  return (
    <div className="confusion-matrix">
      <h3>Confusion Matrix</h3>
      <Scatter data={data} />
    </div>
  );
};

export default ConfusionMatrix;
