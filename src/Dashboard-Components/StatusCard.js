import React, { useState } from 'react';
import './StatusCard.css';

const StatusCard = ({ title, value, icon, iconColor, subtitle, link, isLiveLearning, onFileChange, onUpload }) => {
  const [fileName, setFileName] = useState('Upload File');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    onFileChange(event);
  };

  const formatSubtitle = (subtitle) => {
    if (!isNaN(subtitle) && subtitle < 1) {
      let percentage = (subtitle * 100).toFixed(4);
      percentage = parseFloat(percentage).toString(); // Remove trailing zeros
      return `${percentage}%`;
    }
    return subtitle;
  };

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
        <div className="text-status-card">
          <h3>{title}</h3>
          {subtitle && <small>{formatSubtitle(subtitle)}</small>}
        </div>
        {link && (
          <div className='upload-dashboard'>
            <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
            <label htmlFor="file-upload" className="file-upload-label-dashboard">{fileName}</label>
            <button onClick={onUpload} className="file-upload-button-dashboard"><i className="material-icons">cloud_upload</i>Upload</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
