import React from 'react';
import Header from './Components/Header';
import MainSection from './Components/MainSection';
import Features from './Components/Features';
import ImageSection from './Components/ImageSection';
import Footer from './Components/Footer';
import Login from './Components/Login';
import './App.css';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <MainSection />
      <Features />
      <ImageSection />
      <Footer />
    </div>
  );
}

export default App;
