import React, { useState } from 'react';
import './MainSection.css';
import TitleSection from './TitleSection';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const MainSection = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLoginSubmit = (userData) => {
    onLogin(userData);
  };

  const handleSignUpSubmit = (userData) => {
    onLogin(userData);
  };

  return (
    <div className="main-container">
      <div className="content-section">
        <TitleSection />
        <div className="login-section">
          <div className="form-container">
            {isSignUp ? (
              <SignUpForm toggleForm={toggleForm} onSubmit={handleSignUpSubmit} />
            ) : (
              <LoginForm toggleForm={toggleForm} onSubmit={handleLoginSubmit} />
            )}
          </div>
        </div>
      </div>
      <div className="scroll-down-section">
        <div className="mouse"></div>
      </div>
    </div>
  );
};

export default MainSection;
