import React, { useState } from 'react';
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

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        {isLoggedIn ? (
          <>
            <NavBar user={user} onLogout={handleLogout} />
            <div className="content-container">
              <Routes>
                <Route path="/mymodels" element={<MyModels user={user} />} />
                <Route path="/dashboard/:modelId" element={<Dashboard user={user} onLogout={handleLogout} />} />
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
