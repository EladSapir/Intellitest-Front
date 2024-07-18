import React, { useState } from 'react';
import './NavBar.css';
import LogoutPopup from './LogoutPopup';
import ProfilePopup from './ProfilePopup';
import AddModulePopup from './AddModulePopup';
import HelpPopup from './HelpPopup';

const NavBar = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const initials = currentUser.fullName.split(' ').map(n => n[0]).join('');
  const [expanded, setExpanded] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showAddModulePopup, setShowAddModulePopup] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const toggleExpanded = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  const openLogoutPopup = () => {
    setShowLogoutPopup(true);
  };

  const closeLogoutPopup = () => {
    setShowLogoutPopup(false);
  };

  const openProfilePopup = () => {
    setShowProfilePopup(true);
  };

  const closeProfilePopup = () => {
    setShowProfilePopup(false);
  };

  const openAddModulePopup = () => {
    setShowAddModulePopup(true);
  };

  const closeAddModulePopup = () => {
    setShowAddModulePopup(false);
  };

  const openHelpPopup = () => {
    setShowHelpPopup(true);
  };

  const closeHelpPopup = () => {
    setShowHelpPopup(false);
  };

  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
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
            <span className="account-type">{currentUser.typeOfUse} Account</span>
            <br />
            <span className="full-name">{currentUser.fullName}</span>
          </div>
        )}
      </div>
      <div className="separator"></div> {/* Separator line above the menu */}
      <div className="navbar-menu">
        <div className="menu-title">Menu</div>
        <ul>
          <li className="menu-item" data-tooltip="Dashboard">
            <span className="material-symbols-outlined icon">space_dashboard</span>
            {expanded && <span>Dashboard</span>}
          </li>
          <li className="menu-item" data-tooltip="New Model" onClick={openAddModulePopup}>
            <span className="material-symbols-outlined icon">library_add</span>
            {expanded && <span>New Model</span>}
          </li>
          <li className="menu-item" data-tooltip="My Models">
            <span className="material-symbols-outlined icon">wysiwyg</span>
            {expanded && <span>My Models</span>}
          </li>
          <li className="menu-item" data-tooltip="Edit Profile" onClick={openProfilePopup}>
            <span className="material-symbols-outlined icon">Edit</span>
            {expanded && <span>Edit Profile</span>}
          </li>
        </ul>
      </div>
      <div className="separator"></div> {/* Separator line below the menu */}
      <div className="navbar-footer">
        <ul>
          <li className="menu-item" data-tooltip="Help" onClick={openHelpPopup}>
            <span className="material-symbols-outlined icon">help_outline</span>
            {expanded && <span>Help</span>}
          </li>
          <li className="menu-item logout-icon" data-tooltip="Logout Account" onClick={openLogoutPopup}>
            <span className="material-symbols-outlined icon">logout</span>
            {expanded && <span>Logout Account</span>}
          </li>
        </ul>
      </div>
      <button className="toggle-button" onClick={toggleExpanded}>
        {expanded ? '<' : '>'}
      </button>
      <LogoutPopup show={showLogoutPopup} onClose={closeLogoutPopup} onLogout={onLogout} />
      {showProfilePopup && <ProfilePopup user={currentUser} onClose={closeProfilePopup} updateUser={updateUser} onLogout={onLogout} />}
      {showAddModulePopup && <AddModulePopup isOpen={showAddModulePopup} onClose={closeAddModulePopup} user={currentUser} />}
      <HelpPopup show={showHelpPopup} onClose={closeHelpPopup} />
    </div>
  );
};

export default NavBar;
