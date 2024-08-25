import React from 'react';
import './Footer.css';
import logo from '../Images/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo-container">
        <img src={logo} alt="IntelliTest Logo" className="logo" />
        <span className="logo-text-dashboard">IntelliTest</span>
      </div>
      <div className="footer-menu">
        <a href="#why">Why</a>
        <a href="#coffee">Buy us a coffee</a>
      </div>
      <div className="footer-social">
        <a href="https://www.facebook.com/profile.php?id=61563772570003" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com/intelli.test?igsh=MXJucHFoNGwyZmR1cw==" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/company/intellitest" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
