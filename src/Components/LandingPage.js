import React from 'react';
import Header from '../LandingPage-Components/Header';
import MainSection from '../LandingPage-Components/MainSection';
import Features from '../LandingPage-Components/Features';
import ImageSection from '../LandingPage-Components/ImageSection';
import Footer from '../LandingPage-Components/Footer';
import bgImg from '../Images/Logo.svg';
import bgImg2 from '../Images/BG2.svg';
import Contribute from '../ContributeSection/ContributeSection';

function LandingPage({ onLogin }) {
  return (
    <div>
      <Header />
      <div className="content-container">
        <div className="background-image">
          <img src={bgImg} alt="bgImage" className="bg-img" />
        </div>
        <MainSection onLogin={onLogin} />
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
