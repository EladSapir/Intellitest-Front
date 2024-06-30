import React, { useState } from 'react';
import './App.css';
import GlobalStyle from './GlobalStyle';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import NavBar from './Dashboard-Components/NavBar';

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
      {isLoggedIn ? (
        <NavBar user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
