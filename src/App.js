import React, { useState } from 'react';
import './App.css';
import GlobalStyle from './GlobalStyle';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  return (
    <div className="App">
      <GlobalStyle />
      {isLoggedIn ? (
        <Dashboard user={user} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
