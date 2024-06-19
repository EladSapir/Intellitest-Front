import React, { useState } from 'react';
import eye from '../Images/eye-icon.png';
import './MainSection.css';

const MainSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="main-container">
      <div className="content-section">
        <div className="text-section">
          <h1 className="title">
            Revolutionize 
            <span className="title-second-line">AI Accuracy</span>
          </h1>
          <h2 className="subtitle">Join the Future Today!</h2>
        </div>
        <div className="login-section">
          <div className="form-container"> {/* Center content vertically */}
            {isSignUp ? (
              <div className="login-form sign-up-form">
                <h3 className="login-title">Sign up</h3>
                <div className="input-group">
                  <label htmlFor="full-name" className="input-label">Full Name</label>
                  <input type="text" id="full-name" placeholder="Full Name Here" className="input" />
                </div>
                <div className="input-group">
                  <label htmlFor="email" className="input-label">Email Address</label>
                  <input type="email" id="email" placeholder="Enter Email Address" className="input" />
                </div>
                <div className="input-group">
                  <label htmlFor="password" className="input-label">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter Password"
                      className="input"
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                      <img src={eye} alt="Toggle visibility" className="eye-icon" />
                    </button>
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="repeat-password" className="input-label">Repeat Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="repeat-password"
                      placeholder="Enter Password"
                      className="input"
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                      <img src={eye} alt="Toggle visibility" className="eye-icon" />
                    </button>
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Type of use</label>
                  <div className="radio-group">
                    <label>
                      <input type="radio" name="type-of-use" value="private" defaultChecked />
                      Private
                    </label>
                    <label>
                      <input type="radio" name="type-of-use" value="business" />
                      Business
                    </label>
                  </div>
                </div>
                <button className="login-button">Sign up</button>
                <div className="login-footer">
                  <p>
                    Have an account? <a href="#" className="login-link" onClick={toggleForm}>Login</a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="login-form">
                <h3 className="login-title">Log in</h3>
                <div className="input-group">
                  <label htmlFor="email" className="input-label">Email Address</label>
                  <div className="input-wrapper">
                    <input type="email" id="email" placeholder="Enter Email Address" className="input" />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="password" className="input-label">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter Password"
                      className="input"
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                      <img src={eye} alt="Toggle visibility" className="eye-icon" />
                    </button>
                  </div>
                </div>
                <div className="remember-me">
                  <input type="checkbox" id="keep-signed-in" />
                  <label htmlFor="keep-signed-in">Keep me signed in</label>
                </div>
                <p className="remember-me-warning">
                  Not your device? Use a private browsing window to sign in and close it when you're done.
                </p>
                <button className="login-button">Log in</button>
                <div className="login-footer">
                  <p>
                    Forgot your password? <a href="#" className="reset-password">Reset Your Password</a>
                  </p>
                  <p>
                    Don’t have an account? <a href="#" className="register" onClick={toggleForm}>Register</a>
                  </p>
                </div>
              </div>
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
