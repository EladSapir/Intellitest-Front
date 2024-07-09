import React from 'react';
import './LogoutPopup.css';

const LogoutPopup = ({ show, onClose, onLogout }) => {
  if (!show) return null;

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="logout-popup-overlay">
      <div className="logout-popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className="logout-popup-buttons">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <button className="stay-in-button btn-landingpage" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
