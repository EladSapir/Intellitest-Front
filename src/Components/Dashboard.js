import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Dashboard-Components/NavBar';
import HistoryGraph from '../Dashboard-Components/HistoryGraph';
import ConfusionMatrix from '../Dashboard-Components/ConfusionMatrix';
import StatusCard from '../Dashboard-Components/StatusCard';
import DeleteModule from '../Dashboard-Components/DeleteModule';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = ({ user, onLogout }) => {
  const location = useLocation();
  const { model } = location.state;

  const [statusData, setStatusData] = useState({
    lastAccuracyPercentage: '',
    lastLearningCycle: '',
    lastLearningCycleTime: '',
    isLearning: false,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const backend = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyResponse = await axios.post(`${backend}/modelHistory/history`, {
          model_id: model._id
        });

        const historyData = historyResponse.data;
        setStatusData(prevStatusData => ({
          ...prevStatusData,
          lastAccuracyPercentage: historyData.accuracy || 'Pending',
          lastLearningCycle: historyData.lastLearningCycle || 'Pending',
          lastLearningCycleTime: historyData.updatedAt ? new Date(historyData.updatedAt).toLocaleString() : 'Pending',
        }));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [model._id, backend]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a file first");
      return;
    }

    try {
      // Step 1: Make a POST request to get the model data using the model ID
      const modelResponse = await axios.post(`${backend}/model/getModel`, {
        model_id: model._id
      });

      const modelData = modelResponse.data;
      console.log("Model Data:", modelData);

      // Step 2: Upload the selected file
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('model_id', model._id);


    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <NavBar user={user} onLogout={onLogout} />
        <div className="dashboard">
          <div className="status-cards">
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
              link={{ url: "#", text: "Choose File" }}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
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
