import React from 'react';
import './ContributeSection.css';
import IdeaForm from './IdeaForm';
import linkedIn from '../Images/LinkedIn.svg'
import gitHub from '../Images/gitHub.svg'


const ContributeSection = () => {
  return (
    <div className="contribute-section">
      <h2 className='title'>Wanna Contribute?</h2>

      <div className="contribute-content">
        <div className="contact-section">
          <h3 className="come-say-hi">Come say hi!</h3>
          <div className="contact-cards">
            <div className="contact-card">
              <img src="path/to/elad-image.jpg" alt="Elad Sapir" />
              <h3>Elad Sapir</h3>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/elad-sapir"><img src={linkedIn} alt="linkedIn1" /></a>
                <a href="https://github.com/elad-sapir"><img src={gitHub} alt="GitHub1" /></a>
              </div>
            </div>

            <div className="contact-card">
              <img src="path/to/solal-image.jpg" alt="Solal Ohana" />
              <h3>Solal Ohana</h3>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/solal-ohana"><img src={linkedIn} alt="linkedIn2" /></a>
                <a href="https://github.com/solal10"><img src={gitHub} alt="GitHub2" /></a>
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
