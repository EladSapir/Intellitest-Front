import React from 'react';
import Header from './Components/Header';
import MainSection from './Components/MainSection';
import Features from './Components/Features';
import ImageSection from './Components/ImageSection';
import Footer from './Components/Footer';
import './App.css';
import GlobalStyle from './GlobalStyle';
import bgImg from './Images/Logo.svg';
import bgImg2 from './Images/BG2.svg';
import Dashboard from './Dashboard-Components/Dashboard';
import Contribute from './ContributeSection/ContributeSection'


function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <div className="content-container">
        <div className="background-image">
          <img src={bgImg} alt="bgImage" className="bg-img" />
        </div>
        <MainSection />
        <Features />
        <ImageSection />  
        <Contribute/>
        <div className="background-image2">
          <img src={bgImg2} alt="bgImage2" className="bg-img2" />
        </div>
      </div> 
       <Footer />
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
