import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './NavBar.css';

const NavBar = ({ username }) => {
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <div className="logo-circle">
          <span className="logo-text">{initials}</span>
        </div>
      </div>
      <div className="navbar-menu">
        <ul>
          <li className="menu-item">
            <i className="fas fa-tachometer-alt"></i>
          </li>
          <li className="menu-item">
            <i className="fas fa-plus"></i>
          </li>
          <li className="menu-item">
            <i className="fas fa-list"></i>
          </li>
        </ul>
      </div>
      <div className="navbar-footer">
        <ul>
          <li className="menu-item">
            <i className="fas fa-question-circle"></i>
          </li>
          <li className="menu-item logout-icon">
            <i className="fas fa-sign-out-alt"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
