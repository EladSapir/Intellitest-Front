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
    lastLearningCycle: '',
    lastLearningCycleTime: '',
    isLearning: false
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
          lastLearningCycle: data.lastLearningCycle,
          lastLearningCycleTime: data.lastLearningCycleTime,
          isLearning: data.isLearning
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
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <NavBar username={username} />
        <div className="dashboard">
          <div className="status-cards">
            {statusData.isLearning ? (
              <StatusCard
                title="Live Learning Cycle"
                value={statusData.liveLearningCycle}
                isLiveLearning={true}
              />
            ) : (
              <StatusCard
                title="New Learning Cycle"
                value=""
                icon="play_arrow"
                iconColor="#FACC15"
              />
            )}
            <StatusCard
              title="Last Accuracy Percentage"
              value={statusData.lastAccuracyPercentage}
              icon="track_changes"
              iconColor="#FACC15"
            />
            <StatusCard
              title="Last Learning Cycle"
              value={statusData.lastLearningCycle}
              icon="menu_book"
              iconColor="#FACC15"
              subtitle={statusData.lastLearningCycleTime}
            />
            <StatusCard
              title="Update CSV"
              value=""
              icon="file_upload"
              iconColor="#FACC15"
              link={{ url: "#", text: "Update" }}
            />
          </div>
          <div className="charts">
            <HistoryGraph />
            <ConfusionMatrix />
          </div>
          <DeleteModule />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
