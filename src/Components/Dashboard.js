import React, { useEffect, useState } from 'react';
import NavBar from '../Dashboard-Components/NavBar';
import HistoryGraph from '../Dashboard-Components/HistoryGraph';
import ConfusionMatrix from '../Dashboard-Components/ConfusionMatrix';
import StatusCard from '../Dashboard-Components/StatusCard';
import DeleteModule from '../Dashboard-Components/DeleteModule';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [statusData, setStatusData] = useState({
    liveLearningCycle: '',
    lastAccuracyPercentage: '',
    lastLearningCycle: '',
    lastLearningCycleTime: '',
    isLearning: false
  });

  useEffect(() => {
    // Fetch status data from the backend server
    fetch(`/api/status-data?userId=${user.id}`)
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
  }, [user.id]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <NavBar username={user.fullName} />
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
