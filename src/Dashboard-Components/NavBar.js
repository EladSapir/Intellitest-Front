import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import LogoutPopup from './LogoutPopup';
import ProfilePopup from './ProfilePopup';
import AddModulePopup from './AddModulePopup';
import HelpPopup from './HelpPopup'; // Import the HelpPopup component

const NavBar = ({ user, onLogout, onToggleExpand, myModelsRef }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const initials = currentUser.fullName.split(' ').slice(0, 2).map(n => n[0]).join('');
  const [expanded, setExpanded] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showAddModulePopup, setShowAddModulePopup] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false); // Add state for HelpPopup
  const navigate = useNavigate();

  const handleMouseLeave = () => {
    setExpanded(false);
    onToggleExpand(false);
  };

  const toggleExpanded = () => {
    setExpanded(prevExpanded => !prevExpanded);
    onToggleExpand(!expanded);
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
    if (myModelsRef.current) {
      myModelsRef.current.fetchModels();
    }
  };

  const openHelpPopup = () => {
    setShowHelpPopup(true); // Open HelpPopup
  };

  const closeHelpPopup = () => {
    setShowHelpPopup(false); // Close HelpPopup
  };

  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  const handleMyModelsClick = () => {
    if (window.location.pathname === '/mymodels') {
      if (myModelsRef.current) {
        myModelsRef.current.fetchModels();
      }
    } else {
      navigate('/mymodels');
    }
  };

  return (
    <div className="navbar-container">
      <div className={`navbar ${expanded ? 'expanded' : ''}`} onMouseLeave={handleMouseLeave}>
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
            <li className="menu-item" data-tooltip="New Model" onClick={openAddModulePopup}>
              <span className="material-symbols-outlined icon">library_add</span>
              {expanded && <span className='navbar-choice'>New Model</span>}
            </li>
            <li className="menu-item" data-tooltip="My Models" onClick={handleMyModelsClick}>
              <span className="material-symbols-outlined icon">wysiwyg</span>
              {expanded && <span className='navbar-choice'>My Models</span>}
            </li>
            <li className="menu-item" data-tooltip="Edit Profile" onClick={openProfilePopup}>
              <span className="material-symbols-outlined icon">edit</span>
              {expanded && <span className='navbar-choice'>Edit Profile</span>}
            </li>
          </ul>
        </div>
        <div className="separator"></div> {/* Separator line below the menu */}
        <div className="navbar-footer">
          <ul>
            <li className="menu-item" data-tooltip="Help" onClick={openHelpPopup}> {/* Add onClick event */}
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
          <span className="material-icons">
            {expanded ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>
        <LogoutPopup show={showLogoutPopup} onClose={closeLogoutPopup} onLogout={onLogout} />
        {showProfilePopup && <ProfilePopup user={currentUser} onClose={closeProfilePopup} updateUser={updateUser} onLogout={onLogout} />}
        {showAddModulePopup && <AddModulePopup isOpen={showAddModulePopup} onClose={closeAddModulePopup} user={currentUser} />}
        {showHelpPopup && <HelpPopup show={showHelpPopup} onClose={closeHelpPopup} />} {/* Add HelpPopup */}
      </div>
    </div>
  );
};

export default NavBar;
