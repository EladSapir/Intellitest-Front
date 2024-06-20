import React from 'react';
import './StatusCard.css';

const StatusCard = ({ title, value, icon, iconColor, subtitle, link, isLiveLearning }) => {
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
          <p>{value}</p>
          {subtitle && <small>{subtitle}</small>}
        </div>
      </div>
      {link && <a href={link.url} className="status-link">{link.text}</a>}
    </div>
  );
};

export default StatusCard;
