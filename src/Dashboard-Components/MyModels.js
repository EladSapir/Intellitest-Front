import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MyModels.css';
import axios from 'axios';

const MyModels = forwardRef(({ user, navbarExpanded }, ref) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [models, setModels] = useState([]);
  const [modelHistories, setModelHistories] = useState({});
  const backend = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const location = useLocation();

  const fetchModels = async () => {
    try {
      const response = await axios.post(`${backend}/model/getModels`, {
        id: currentUser.id
      });
      const fetchedModels = Array.isArray(response.data) ? response.data : [];
      setModels(fetchedModels);

      // Fetch model history for each model
      const historyPromises = fetchedModels.map(async (model) => {
        try {
          const historyResponse = await axios.post(`${backend}/modelHistory/history`, {
            model_id: model._id
          });
          return { modelId: model._id, history: historyResponse.data };
        } catch (error) {
          // Handle no history case without logging an error
          return { modelId: model._id, history: null };
        }
      });

      const histories = await Promise.all(historyPromises);
      const historyMap = histories.reduce((acc, { modelId, history }) => {
        acc[modelId] = history;
        return acc;
      }, {});
      setModelHistories(historyMap);
    } catch (error) {
      console.error('Error fetching models or histories:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchModels
  }));

  useEffect(() => {
    fetchModels();
  }, [currentUser.id, backend]);

  const handleModelClick = (model) => {
    navigate(`/dashboard/${model._id}`, { state: { model, history: modelHistories[model._id] } });
  };

  const formatPercentage = (number) => {
    let percentage = (number * 100).toFixed(4);
    percentage = parseFloat(percentage).toString(); // Remove trailing zeros
    return `${percentage}%`;
  };

  const alertMessage = location.state?.alert;

  return (
    <div className={`models-container ${navbarExpanded ? 'expanded-navbar' : ''}`}>
      <h1>My Models</h1>
      <div className="models-list">
        {models.map((model, index) => {
          const history = modelHistories[model._id];
          const statusIconClass = history ? 'green-circle' : 'red-circle';
          const statusText = history ? 'Completed' : 'Pending';

          return (
            <div className="model-card" key={index} onClick={() => handleModelClick(model)}>
              <div className="model-header">
                <h2>{model.name}</h2>
                <span className="model-type">{history?.modelType || 'N/A'}</span>
              </div>
              <div className="model-details">
                <div className="detail-item">
                  <p className='details-title'>Last Learning Cycle:</p>
                  <div className="model-info">
                    <span className={`status-icon ${statusIconClass} material-icons`}>fiber_manual_record</span>
                    <p className='details-info'>{statusText}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <p className='details-title'>Last Accuracy Percentage:</p>
                  <div className="model-info">
                    <span className="status-icon yellow-circle material-icons">track_changes</span>
                    <p className='details-info'>{history ? formatPercentage(history.accuracy) : 'Pending'}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <p className='details-title'>Last Time Updated:</p>
                  <p className='details-info-2'>{history ? new Date(history.updatedAt).toLocaleString() : 'Pending'}</p>
                </div>
                <div className="detail-item">
                  <p className='details-title'>Creation Date:</p>
                  <p className='details-info-2'>{new Date(model.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default MyModels;
