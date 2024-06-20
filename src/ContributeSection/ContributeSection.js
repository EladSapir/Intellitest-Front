import React from 'react';
import './ContributeSection.css';
import IdeaForm from './IdeaForm';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const ContributeSection = () => {
  return (
    <div className="contribute-section">
      <h2>Wanna Contribute?</h2>

      <div className="contribute-content">
        <div className="contact-section">
          <div className="contact-card">
            <img src="path/to/elad-image.jpg" alt="Elad Sapir" />
            <h3>Elad Sapir</h3>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/elad-sapir"><FaLinkedin size={30} /></a>
              <a href="https://github.com/elad-sapir"><FaGithub size={30} /></a>
            </div>
          </div>
          
          <div className="come-say-hi">
            <h4>Come say hi!</h4>
          </div>

          <div className="contact-card">
            <img src="path/to/solal-image.jpg" alt="Solal Ohana" />
            <h3>Solal Ohana</h3>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/solal-ohana"><FaLinkedin size={30} /></a>
              <a href="https://github.com/solal-ohana"><FaGithub size={30} /></a>
            </div>
          </div>
        </div>
        
        <div className="idea-section">
          <IdeaForm />
        </div>
      </div>
    </div>
  );
};

export default ContributeSection;
