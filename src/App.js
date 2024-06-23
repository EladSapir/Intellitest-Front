import React from 'react';
import './App.css';
import GlobalStyle from './GlobalStyle';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <div className="App">
      <GlobalStyle />
      {/* <LandingPage/> */}
      <Dashboard />
    </div>
  );
}

export default App;
