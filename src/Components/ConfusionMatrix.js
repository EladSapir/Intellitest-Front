import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ConfusionMatrix.css';

function ConfusionMatrix() {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['True Positive', 'False Positive', 'False Negative', 'True Negative'],
        datasets: [{
          label: 'Confusion Matrix',
          data: [65, 59, 80, 81],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      chartRef.current.destroy();
    };
  }, []);

  return (
    <div className="confusion-matrix">
      <h3>Confusion Matrix</h3>
      <canvas id="confusionMatrix" ref={canvasRef} width="400" height="400"></canvas>
    </div>
  );
}

export default ConfusionMatrix;
