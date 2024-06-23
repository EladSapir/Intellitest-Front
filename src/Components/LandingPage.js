import React, { useState } from 'react';
import Header from '../LandingPage-Components/Header';
import MainSection from '../LandingPage-Components/MainSection';
import Features from '../LandingPage-Components/Features';
import ImageSection from '../LandingPage-Components/ImageSection';
import Footer from '../LandingPage-Components/Footer';
import bgImg from '../Images/Logo.svg';
import bgImg2 from '../Images/BG2.svg';
import Contribute from '../ContributeSection/ContributeSection';

function LandingPage({ onLogin }) {
    const [user, setUser] = useState(null);
  
    const handleLogin = (userData) => {
      setUser(userData);
      onLogin(userData);
    };
  
    return (
      <div>
        <Header user={user} />
        <div className="content-container">
          <div className="background-image">
            <img src={bgImg} alt="bgImage" className="bg-img" />
          </div>
          <MainSection onLogin={handleLogin} />
          <Features />
          <ImageSection />
          <Contribute />
          <div className="background-image2">
            <img src={bgImg2} alt="bgImage2" className="bg-img2" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
export default LandingPage;
