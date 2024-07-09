import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import './ConfusionMatrix.css';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ConfusionMatrix = ({ truePositive, falsePositive, trueNegative, falseNegative }) => {
  const maxValue = Math.max(truePositive, falsePositive, trueNegative, falseNegative);
  const yAxisMax = Math.ceil(maxValue * 1.5);

  const [data, setData] = useState({
    labels: ['Positive', 'Negative'],
    datasets: [
      {
        label: 'True Positive',
        data: [truePositive, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barPercentage: 0.9, // Increase bar width
        categoryPercentage: 0.9, // Center bars
      },
      {
        label: 'False Positive',
        data: [falsePositive, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        barPercentage: 0.9,
        categoryPercentage: 0.9,
      },
      {
        label: 'True Negative',
        data: [0, trueNegative],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barPercentage: 0.9,
        categoryPercentage: 0.9,
      },
      {
        label: 'False Negative',
        data: [0, falseNegative],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        barPercentage: 0.9,
        categoryPercentage: 0.9,
      }
    ],
  });

  useEffect(() => {
    setData({
      labels: ['Positive', 'Negative'],
      datasets: [
        {
          label: 'True Positive',
          data: [truePositive, 0],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          barPercentage: 0.9,
          categoryPercentage: 0.9,
        },
        {
          label: 'False Positive',
          data: [falsePositive, 0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          barPercentage: 0.9,
          categoryPercentage: 0.9,
        },
        {
          label: 'True Negative',
          data: [0, trueNegative],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barPercentage: 0.9,
          categoryPercentage: 0.9,
        },
        {
          label: 'False Negative',
          data: [0, falseNegative],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
          barPercentage: 0.9,
          categoryPercentage: 0.9,
        }
      ]
    });
  }, [truePositive, falsePositive, trueNegative, falseNegative]);

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
          stepSize: Math.ceil(yAxisMax / 10),
          max: yAxisMax
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="confusion-matrix">
      <h3>Confusion Matrix</h3>
      <div className='confusion-div'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ConfusionMatrix;
