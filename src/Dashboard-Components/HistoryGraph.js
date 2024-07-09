import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import './HistoryGraph.css';
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const HistoryGraph = ({ modelId }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      label: 'Accuracy',
      data: [],
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1,
      pointRadius: 5,
      pointBackgroundColor: 'rgba(255, 206, 86, 1)',
      fill: false, // Ensure the area under the line is filled
      backgroundColor: '#FDE047'
    }],
  });

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/modelHistory/getAllHistory`, {
          model_id: modelId
        });

        if (response.headers['content-type'].includes('application/json')) {
          const historyData = response.data;
          console.log("solal " + JSON.stringify(historyData, null, 2)); 

          if (historyData && Array.isArray(historyData)) {
            const labels = historyData.map(item => new Date(item.createdAt));
            const values = historyData.map(item => (item.accuracy * 100).toFixed(2)); // Convert accuracy to percentage

            const minDate = new Date(Math.min(...labels));
            const maxDate = new Date(Math.max(...labels));
            const dateRange = maxDate - minDate;

            const extendedMinDate = new Date(minDate.getTime() - dateRange * 0.1);
            const extendedMaxDate = new Date(maxDate.getTime() + dateRange * 0.1);

            setData({
              labels,
              datasets: [{
                label: 'Accuracy',
                data: values,
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(255, 206, 86, 1)',
                backgroundColor:  'rgb(255, 205, 86)',
                fill: true, // Ensure the area under the line is filled
               
              }]
            });

            setOptions(prevOptions => ({
              ...prevOptions,
              scales: {
                ...prevOptions.scales,
                x: {
                  type: 'time',
                  time: {
                    unit: 'day'
                  },
                  min: extendedMinDate,
                  max: extendedMaxDate
                }
              }
            }));
          } else {
            console.error('Invalid history data format:', historyData);
          }
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistoryData();
  }, [modelId]);

  const [options, setOptions] = useState({
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function(value) {
            return value + '%'; 
          }
        }
      },
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    }
  });

  return (
    <div className="history-graph">
      <h3>History Graph</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default HistoryGraph;
