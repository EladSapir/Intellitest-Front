import React from 'react';
import './StatusCard.css';

const StatusCard = ({ title, value, icon, iconColor, subtitle, link, isLiveLearning, onFileChange, onUpload }) => {
  return (
    <div className="status-card">
      <div className="content">
        {isLiveLearning ? (
          <div className="ring-container">
            <div className="ringring"></div>
            <div className="circle"></div>
          </div>
        ) : (
          icon && <span className="material-icons status-icon" style={{ color: iconColor }}>{icon}</span>
        )}
        <div className="text">
          <h3>{title}</h3>
          {subtitle && <small>{subtitle}</small>}
        </div>
        {link && (
        <div className='upload-dashboard'>
          <input type="file" accept=".csv" onChange={onFileChange} style={{ display: 'none' }} id="file-upload" />
          <label htmlFor="file-upload" className="file-upload-label">{link.text}</label>
          <button onClick={onUpload} className="file-upload-button-dashboard"> <i className="material-icons">cloud_upload</i>Upload</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default StatusCard;
