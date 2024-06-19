import React, { useState } from 'react';
import eye from '../Images/eye-icon.png';
import './MainSection.css';

const MainSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setIsFormValid(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    // Validation logic
    switch (id) {
      case 'full-name':
        newErrors.fullName = value.trim() === '' ? 'Full Name is required' : '';
        break;
      case 'email':
        newErrors.email = !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email address (example@ex.com)' : '';
        break;
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (isSignUp) {
          newErrors.password = !passwordRegex.test(value)
            ? 'Password must be at least 8 characters, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
            : '';
        } else {
          newErrors.password = value.trim() === '' ? 'Password is required' : '';
        }
        break;
      case 'repeat-password':
        newErrors.repeatPassword = value !== document.getElementById('password').value ? 'Passwords do not match' : '';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    if (isSignUp) {
      setIsFormValid(
        value.trim() !== '' &&
        newErrors.fullName === '' &&
        newErrors.email === '' &&
        newErrors.password === '' &&
        newErrors.repeatPassword === ''
      );
    } else {
      setIsFormValid(
        value.trim() !== '' &&
        newErrors.email === '' &&
        newErrors.password === ''
      );
    }
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
          <div className="form-container">
            {isSignUp ? (
              <div className="login-form sign-up-form">
                <h3 className="login-title">Sign up</h3>
                <div className="input-group">
                  <label htmlFor="full-name" className="input-label">Full Name</label>
                  <input 
                    type="text" 
                    id="full-name" 
                    placeholder="Full Name Here" 
                    className={`input ${errors.fullName ? 'input-error' : ''}`}
                    onChange={handleInputChange} 
                  />
                  {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                </div>
                <div className="input-group">
                  <label htmlFor="email" className="input-label">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter Email Address" 
                    className={`input ${errors.email ? 'input-error' : ''}`}
                    onChange={handleInputChange} 
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="input-group">
                  <label htmlFor="password" className="input-label">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter Password"
                      className={`input ${errors.password ? 'input-error' : ''}`}
                      onChange={handleInputChange}
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                      <img src={eye} alt="Toggle visibility" className="eye-icon" />
                    </button>
                  </div>
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div className="input-group">
                  <label htmlFor="repeat-password" className="input-label">Repeat Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="repeat-password"
                      placeholder="Enter Password"
                      className={`input ${errors.repeatPassword ? 'input-error' : ''}`}
                      onChange={handleInputChange}
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                      <img src={eye} alt="Toggle visibility" className="eye-icon" />
                    </button>
                  </div>
                  {errors.repeatPassword && <p className="error-message">{errors.repeatPassword}</p>}
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
                <button className={`login-button ${!isFormValid ? 'disabled' : ''}`} disabled={!isFormValid}>Sign up</button>
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
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Enter Email Address" 
                      className={`input ${errors.email ? 'input-error' : ''}`}
                      onChange={handleInputChange} 
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="password" className="input-label">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter Password"
                      className={`input ${errors.password ? 'input-error' : ''}`}
                      onChange={handleInputChange}
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                      <img src={eye} alt="Toggle visibility" className="eye-icon" />
                    </button>
                  </div>
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div className="remember-me">
                  <input type="checkbox" id="keep-signed-in" />
                  <label htmlFor="keep-signed-in">Keep me signed in</label>
                </div>
                <p className="remember-me-warning">
                  Not your device? Use a private browsing window to sign in and close it when you're done.
                </p>
                <button className={`login-button ${!isFormValid ? 'disabled' : ''}`} disabled={!isFormValid}>Log in</button>
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
