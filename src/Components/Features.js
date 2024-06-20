import React from 'react';
import friendlyIconDefault from '../Images/user-friendly-default.svg';
import simpleIconDefault from '../Images/simple-default.svg';
import realtimeIconDefault from '../Images/real-time-default.svg';
import friendlyIconHover from '../Images/user-friendly-hover.svg';
import simpleIconHover from '../Images/simple-hover.svg';
import realtimeIconHover from '../Images/real-time-hover.svg';

import './Features.css';

const Features = () => (
  <div>
    <div className='features-title'>
      <h3>Why Partner with Us?</h3>
    </div>
    <div className="features-container">
      <div className="feature-box" onMouseEnter={e => handleMouseEnter(e, friendlyIconHover)} onMouseLeave={e => handleMouseLeave(e, friendlyIconDefault)}>
        <img src={friendlyIconDefault} alt="friendly-icon" className="feature-icon" />        
        <h4 className="feature-title">User-Friendly Interface</h4>
        <p className="feature-description">Our platform features an intuitive interface designed for ease of use, allowing you to execute tests and analyze results effortlessly.</p>
      </div>
      <div className="feature-box" onMouseEnter={e => handleMouseEnter(e, simpleIconHover)} onMouseLeave={e => handleMouseLeave(e, simpleIconDefault)}>
        <img src={simpleIconDefault} alt="simple-icon" className="feature-icon" />        
        <h4 className="feature-title">Simplified Testing Process</h4>
        <p className="feature-description">Our intuitive platform makes AI testing accessible to all, eliminating the need for complex technical knowledge.</p>
      </div>
      <div className="feature-box" onMouseEnter={e => handleMouseEnter(e, realtimeIconHover)} onMouseLeave={e => handleMouseLeave(e, realtimeIconDefault)}>
        <img src={realtimeIconDefault} alt="realtime-icon" className="feature-icon" />        
        <h4 className="feature-title">Real-time Insights</h4>
        <p className="feature-description">With our fast and efficient testing tools, we enabling you to fine-tune your AI applications for optimal performance and reliability.</p>
      </div>
    </div>
  </div>
);

const handleMouseEnter = (e, hoverIcon) => {
  const img = e.currentTarget.querySelector('img');
  img.src = hoverIcon;
};

const handleMouseLeave = (e, defaultIcon) => {
  const img = e.currentTarget.querySelector('img');
  img.src = defaultIcon;
};

export default Features;
