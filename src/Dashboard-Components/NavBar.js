import React, { useState } from 'react';
import './NavBar.css';

const NavBar = ({ username }) => {
  const initials = username.substring(0, 2).toUpperCase();
  const [expanded, setExpanded] = useState(false);

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const toggleExpanded = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  return (
    <div
      className={`navbar ${expanded ? 'expanded' : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="navbar-logo">
        <div className="logo-circle">
          <span className="logo-text">{initials}</span>
        </div>
        {expanded && (
          <div className="username">
            <span className="account-type">Basic Account</span>
            <span className="full-name">{username}</span>
          </div>
        )}
      </div>
      <div className="separator"></div> {/* Separator line above the menu */}
      <div className="navbar-menu">
        <div className="menu-title">Menu</div>
        <ul>
          <li className="menu-item">
            <span className="material-symbols-outlined icon">space_dashboard</span>
            {expanded && <span>Dashboard</span>}
          </li>
          <li className="menu-item">
            <span className="material-symbols-outlined icon">library_add</span>
            {expanded && <span>New Model</span>}
          </li>
          <li className="menu-item">
            <span className="material-symbols-outlined icon">wysiwyg</span>
            {expanded && <span>My Models</span>}
          </li>
        </ul>
      </div>
      <div className="separator"></div> {/* Separator line below the menu */}
      <div className="navbar-footer">
        <ul>
          <li className="menu-item">
            <span className="material-symbols-outlined icon">help_outline</span>
            {expanded && <span>Help</span>}
          </li>
          <li className="menu-item logout-icon">
            <span className="material-symbols-outlined icon">logout</span>
            {expanded && <span>Logout Account</span>}
          </li>
        </ul>
      </div>
      <button className="toggle-button" onClick={toggleExpanded}>
        {expanded ? '<' : '>'}
      </button>
    </div>
  );
};

export default NavBar;
