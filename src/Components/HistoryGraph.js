import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './HistoryGraph.css';

function HistoryGraph() {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Accuracy Over Time',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
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
    <div className="history-graph">
      <h3>History Graph</h3>
      <canvas id="historyGraph" ref={canvasRef} width="400" height="400"></canvas>
    </div>
  );
}

export default HistoryGraph;
