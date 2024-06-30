import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import './ConfusionMatrix.css';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ConfusionMatrix = () => {
  const [data, setData] = useState({
    labels: ['Positive', 'Negative'], 
    datasets: [
      {
        label: 'True Positive',
        data: [0, 0], 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'False Positive',
        data: [0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'True Negative',
        data: [0, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'False Negative',
        data: [0, 0],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
    ],
  });

  useEffect(() => {
    fetch('/api/confusion-matrix-data')
      .then(response => response.json())
      .then(fetchedData => {
        if (fetchedData.values.length) {
          const [truePositive, falsePositive, trueNegative, falseNegative] = fetchedData.values;
          setData({
            labels: ['Positive', 'Negative'], 
            datasets: [
              {
                label: 'True Positive',
                data: [truePositive, 0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              },
              {
                label: 'False Positive',
                data: [falsePositive, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              },
              {
                label: 'True Negative',
                data: [0, trueNegative],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              },
              {
                label: 'False Negative',
                data: [0, falseNegative],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
              }
            ]
          });
        }
      });
  }, []);


  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Predicted Condition'
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Actual Condition'
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          max: 1
        }
      }
    }
  };

  return (
    <div className="confusion-matrix">
      <h3>Confusion Matrix</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ConfusionMatrix;
