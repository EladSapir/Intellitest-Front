// App.js
import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import GlobalStyle from './GlobalStyle';
import LandingPage from './Components/LandingPage';
import NavBar from './Dashboard-Components/NavBar';
import MyModels from './Dashboard-Components/MyModels';
import Dashboard from './Components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const myModelsRef = useRef();

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleNavbarToggle = (isExpanded) => {
    setNavbarExpanded(isExpanded);
  };

  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        {isLoggedIn ? (
          <>
            <NavBar 
              user={user} 
              onLogout={handleLogout} 
              onToggleExpand={handleNavbarToggle} 
              myModelsRef={myModelsRef} 
            />
            <div className="content-container">
              <Routes>
                <Route 
                  path="/mymodels" 
                  element={<MyModels user={user} navbarExpanded={navbarExpanded} ref={myModelsRef} />} 
                />
                <Route 
                  path="/dashboard/:modelId" 
                  element={<Dashboard user={user} onLogout={handleLogout} />} 
                />
                <Route path="*" element={<Navigate to="/mymodels" />} />
              </Routes>
            </div>
          </>
        ) : (
          <LandingPage onLogin={handleLogin} />
        )}
      </Router>
    </div>
  );
}

export default App;
