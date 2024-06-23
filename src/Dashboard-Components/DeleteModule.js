import React, { useState } from 'react';
import './DeleteModule.css';
import eyeIcon from '../Images/eye-icon.png'; // Import the eye icon

const DeleteModule = () => {
  const [expanded, setExpanded] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = () => {
    // Handle delete functionality
    alert('Module deleted');
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
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
