import React, { useState, useEffect } from 'react';
import './MyModels.css';
import axios from 'axios';

const MyModels = ({ user, expanded }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [models, setModels] = useState([]);
  const backend = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.post(`${backend}/model/getModels`, {
          id: currentUser.id
        });
        const fetchedModels = Array.isArray(response.data) ? response.data : [];
        setModels(fetchedModels);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, [currentUser.id, backend]);

  return (
    <div className={`models-container ${expanded ? 'expanded-navbar' : ''}`}>
      <h1>My Models</h1>
      <div className="models-list">
        {models.map((model, index) => (
          <div className="model-card" key={index}>
            <div className="model-header">
              <h2>{model.name}</h2>
              <span className="model-type">Sport Vector Machine</span>
            </div>
            <div className="model-details">
              <div className="detail-item">
                <p className='details-title'>Last Learning Cycle:</p>
                <div className="model-info">
                  <span className="status-icon green-circle material-icons">fiber_manual_record</span>
                  <p className='details-info'>{model.status}</p>
                </div>
              </div>
              <div className="detail-item">
                <p className='details-title'>Last Accuracy Percentage:</p>
                <div className="model-info">
                  <span className="status-icon yellow-circle material-icons">track_changes</span>
                  <p className='details-info'>{model.accuracy}</p>
                </div>
              </div>
              <div className="detail-item">
                <p className='details-title'>Last Time Updated:</p>
                <p className='details-info-2'>{model.updated}</p>
              </div>
              <div className="detail-item">
                <p className='details-title'>Creation Date:</p>
                <p className='details-info-2'>{model.created}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyModels;
