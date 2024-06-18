import React from 'react';
import friendly from '../Images/user-friendly.png';
import simple from '../Images/simple.png'
import realtime from '../Images/real-time.png'

import './Features.css';

const Features = () => (
  <div>
    <div className='features-title'>
      <h4>Why Partner with Us?</h4>
    </div>
    <div className="features-container">
      <div className="feature-box">
      <img src={friendly} alt="friendly-icon" className="feature-friendly-icon" />        
      <h4 className="feature-title">User-Friendly Interface</h4>
        <p className="feature-description">Our platform features an intuitive interface designed for ease of use, allowing you to execute tests and analyze results effortlessly.</p>
      </div>
      <div className="feature-box">
      <img src={simple} alt="friendly-icon" className="feature-simple-icon" />        
        <h4 className="feature-title">Simplified Testing Process</h4>
        <p className="feature-description">Our intuitive platform makes AI testing accessible to all, eliminating the need for complex technical knowledge.</p>
      </div>
      <div className="feature-box">
      <img src={realtime} alt="friendly-icon" className="feature-realtime-icon" />        
        <h4 className="feature-title">Real-time Insights</h4>
        <p className="feature-description">With our fast and efficient testing tools, we enabling you to fine-tune your AI applications for optimal performance and reliability.</p>
      </div>
    </div>
  </div>
);

export default Features;
