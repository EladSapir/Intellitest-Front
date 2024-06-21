// ContributeSection.js
import React from 'react';
import './ContributeSection.css';
import IdeaForm from './IdeaForm';
import linkedIn from '../Images/LinkedIn.svg';
import gitHub from '../Images/gitHub.svg';
import elad from '../Images/elad.png';
import solal from '../Images/solal.png';

const ContributeSection = () => {
  return (
    <div className="contribute-section">
      <h2 className="contribute-title">Wanna Contribute?</h2>
      <div className="contribute-content">
        <div className="contact-section">
          <h3 className="come-say-hi">Come say hi!</h3>
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-card-content">
                <img src={elad} alt="Elad Sapir" className="profile-pic" />
                <h3>Elad Sapir</h3>
              </div>
              <div className="social-links">
                <div className="social-link">
                  <a href="https://www.linkedin.com/in/elad-sapir">
                    <img src={linkedIn} alt="LinkedIn" />
                    <span>LinkedIn</span>
                  </a>
                </div>
                <div className="social-link">
                  <a href="https://github.com/elad-sapir">
                    <img src={gitHub} alt="GitHub" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-content">
                <img src={solal} alt="Solal Ohana" className="profile-pic" />
                <h3>Solal Ohana</h3>
              </div>
              <div className="social-links">
                <div className="social-link">
                  <a href="https://www.linkedin.com/in/solal-ohana">
                    <img src={linkedIn} alt="LinkedIn" />
                    <span>LinkedIn</span>
                  </a>
                </div>
                <div className="social-link">
                  <a href="https://github.com/solal10">
                    <img src={gitHub} alt="GitHub" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
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
