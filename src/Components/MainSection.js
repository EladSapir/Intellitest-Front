import React from 'react';
import './MainSection.css';
import TitleSection from '../LandingPage-Components/TitleSection';
import LoginForm from '../LandingPage-Components/LoginForm';
import SignUpForm from '../LandingPage-Components/SignUpForm';

const MainSection = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLoginSubmit = (formData) => {
    // Implement your login submission logic here
    console.log('Login form submitted:', formData);
  };

  const handleSignUpSubmit = (formData) => {
    // Implement your sign-up submission logic here
    console.log('Sign-up form submitted:', formData);
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
