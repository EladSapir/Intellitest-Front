import React from 'react';
import think from '../Images/think.png'
import './ImageSection.css';

const ImageSection = () => (
  <div className="image-container">
    <div className="text-content">
      <h3>Empower Your AI Innovations: Unleash the Power of Testing!</h3>
      <h4>Welcome to AI Testing Empowerment</h4>
      <p>
        Welcome to a world where AI testing is not just a necessity but a catalyst for innovation! Our platform empowers individuals and organizations to validate and optimize AI-based systems with confidence and precision. Whether you're a seasoned professional or a curious newcomer, our intuitive tools and comprehensive testing methodologies are here to support your journey towards AI excellence.
      </p>
      <a href="#top" className="start-button">Start Testing Today!</a>
    </div>
    <img src={think} alt="Empower AI Innovations" className="image" />
  </div>
);

export default ImageSection;
