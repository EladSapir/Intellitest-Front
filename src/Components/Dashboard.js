import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Dashboard-Components/NavBar';
import HistoryGraph from '../Dashboard-Components/HistoryGraph';
import ConfusionMatrix from '../Dashboard-Components/ConfusionMatrix';
import StatusCard from '../Dashboard-Components/StatusCard';
import DeleteModule from '../Dashboard-Components/DeleteModule';
import './Dashboard.css';
import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_URL;
const learningBackend = process.env.REACT_APP_TOOLKIT_LEARN_URL;

const Dashboard = ({ user, onLogout }) => {
  const location = useLocation();
  const { model } = location.state;

  const [statusData, setStatusData] = useState({
    lastAccuracyPercentage: '',
    lastLearningCycle: '',
    lastLearningCycleTime: '',
    isLearning: false,
  });

  const [confusionMatrixData, setConfusionMatrixData] = useState({
    truePositive: 0,
    falsePositive: 0,
    trueNegative: 0,
    falseNegative: 0,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

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

        setConfusionMatrixData({
          truePositive: historyData.confusion_matrix_tp,
          falsePositive: historyData.confusion_matrix_fp,
          trueNegative: historyData.confusion_matrix_tn,
          falseNegative: historyData.confusion_matrix_fn,
        });

        const modelResponse = await axios.post(`${backend}/model/getModel`, {
          model_id: model._id,
        });

        setIsRunning(modelResponse.data.isRunning);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [model._id]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a file first");
      return;
    }

    try {
      const modelResponse = await axios.post(`${backend}/model/getModel`, {
        model_id: model._id,
      });

      const modelData = modelResponse.data;

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('k', '7');
      formData.append('target', 'Risk');
      formData.append('checkboxes', `${modelData.impute},${modelData.encode},${modelData.scale},${modelData.feature_select},${modelData.remove_outliers}`);

      const response = await axios.post(`${learningBackend}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const [csvAfterToolKitGist, encodedCsv, scaledCsv, relativePathCsv] = response.data.data;

      const updateModel = {
        model_id: modelData._id,
        CSVpath: csvAfterToolKitGist,
        encode_csv: encodedCsv,
        scale_csv: scaledCsv,
      };

      const updateRes = await axios.post(`${backend}/model/update`, updateModel, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response of update:", updateRes);

      const learnData = {
        db: relativePathCsv,
        user_id: user.id,
        model_id: modelData._id,
        modelType: 'SVC',
      };

      await axios.post(`${learningBackend}/runImprovement`, learnData);

    } catch (error) {
      console.error('Error:', error);
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
              subtitle={statusData.lastAccuracyPercentage}
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
            {isRunning ? (
              <StatusCard
                title="Live Learning Cycle"
                isLiveLearning={true}
              />
            ) : (
              <StatusCard
                title="Update CSV"
                value=""
                icon="file_upload"
                iconColor="#FACC15"
                link={{ url: "#", text: "Choose File" }}
                onFileChange={handleFileChange}
                onUpload={handleUpload}
              />
            )}
          </div>
          <div className="charts">
            <HistoryGraph modelId={model._id} />
            <ConfusionMatrix 
              truePositive={confusionMatrixData.truePositive}
              falsePositive={confusionMatrixData.falsePositive}
              trueNegative={confusionMatrixData.trueNegative}
              falseNegative={confusionMatrixData.falseNegative}
            />
          </div>
          <DeleteModule user={user} modelId={model._id} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
