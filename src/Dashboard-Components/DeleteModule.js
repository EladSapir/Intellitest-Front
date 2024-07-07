// DeleteModule.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteModule.css';
import eyeIcon from '../Images/eye-icon.png';
import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_URL;

const DeleteModule = ({ user, modelId }) => {
  const [expanded, setExpanded] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // Login request to verify the password
      const loginResponse = await axios.post(`${backend}/user/login`, {
        email: user.email,
        password: password
      });

      if (loginResponse.status === 200) {
        // Password is correct, proceed with delete request
        await axios.post(`${backend}/model/deleteModel`, {
          model_id: modelId,
        });

        // Navigate to models list with success message
        navigate('/mymodels', { state: { alert: 'Model deleted successfully' } });
      }
    } catch (error) {
      console.error('Error verifying password or deleting module:', error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          if (data.error === 'Invalid password') {
            setErrorMessage('Incorrect password. Please try again.');
          } else if (data.error === 'User does not exist') {
            setErrorMessage('User does not exist.');
          } else {
            setErrorMessage('Missing required fields.');
          }
        } else {
          setErrorMessage('An error occurred while deleting the module.');
        }
      } else {
        setErrorMessage('An error occurred while deleting the module.');
      }
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
    setErrorMessage('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`delete-module ${expanded ? 'expanded' : ''}`}>
      <div className="delete-module-header">
        <div className="delete-module-content" onClick={toggleExpanded}>
          <i className="fas fa-trash-alt"></i>
          <span>Delete Module</span>
        </div>
        {!expanded && (
          <button onClick={toggleExpanded} className="delete-button">Delete</button>
        )}
      </div>
      {expanded && (
        <div className="delete-module-expanded-content">
          <h2>This step can’t be undone!</h2>
          <p>You will lose all your data, history, and any information related to *module name*</p>
          <p>Are you sure you want to delete the module?</p>
          <div className="delete-module-input">
            <label>Enter password to authorize delete</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={toggleShowPassword}
              >
                <img src={eyeIcon} alt="Toggle Password Visibility" />
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div className="delete-module-buttons">
            <button className="cancel-button" onClick={toggleExpanded}>Cancel</button>
            <button
              className={`confirm-delete-button ${!password ? 'disabled' : ''}`}
              onClick={handleDelete}
              disabled={!password}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModule;
