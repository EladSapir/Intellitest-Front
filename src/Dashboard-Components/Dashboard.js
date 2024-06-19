import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import HistoryGraph from './HistoryGraph';
import ConfusionMatrix from './ConfusionMatrix';
import StatusCard from './StatusCard';
import DeleteModule from './DeleteModule';
import './Dashboard.css';

const Dashboard = () => {
  const [statusData, setStatusData] = useState({
    liveLearningCycle: '',
    lastAccuracyPercentage: '',
    lastLearningCycle: ''
  });

  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch status data from the backend server
    fetch('/api/status-data')
      .then(response => response.json())
      .then(data => {
        setStatusData({
          liveLearningCycle: data.liveLearningCycle,
          lastAccuracyPercentage: data.lastAccuracyPercentage,
          lastLearningCycle: data.lastLearningCycle
        });
      });

    // Fetch username from the backend server
    fetch('/api/username')
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <NavBar username={username} />
      <div className="dashboard">
        <div className="status-cards">
          <StatusCard title="Live Learning Cycle" value={statusData.liveLearningCycle} />
          <StatusCard title="Last Accuracy Percentage" value={statusData.lastAccuracyPercentage} />
          <StatusCard title="Last Learning Cycle" value={statusData.lastLearningCycle} />
          <StatusCard title="Update CSV" value="Update" />
        </div>
        <div className="charts">
          <HistoryGraph />
          <ConfusionMatrix />
        </div>
        <DeleteModule />
      </div>
    </div>
  );
};

export default Dashboard;
