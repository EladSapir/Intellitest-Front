import React from 'react';
import logo from '../Images/logo.png';
import './Header.css';

const Header = () => (
    <div className="header-container">
        <div className="logo-container-dashboard">
            <img className="logo" src={logo} alt="IntelliTest" />
            <span className="logo-text-dashboard">IntelliTest</span>
        </div>
        <div className="nav-links">
            <a href="#contribute">Contact Us</a>
            <a href="#">Buy us a coffee</a>
        </div>
    </div>
);

export default Header;
