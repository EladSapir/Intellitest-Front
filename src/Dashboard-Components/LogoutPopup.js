import React from 'react';
import './LogoutPopup.css';

const LogoutPopup = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="logout-popup-overlay">
      <div className="logout-popup">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Sad to see you leave :(</h2>
        <p>Are you sure you want to log out?</p>
        <div className="logout-popup-buttons">
          <button className="logout-button" onClick={() => { /* handle logout logic here */ }}>Log out</button>
          <button className="stay-in-button" onClick={onClose}>Stay In</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
