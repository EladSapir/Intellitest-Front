import React, { useState } from 'react';
import axios from 'axios';
import eye from '../Images/eye-icon.png';
import './LoginForm.css';

const backend = process.env.REACT_APP_BACKEND_URL;

const LoginForm = ({ toggleForm, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };
    let newFormData = { ...formData, [id]: value };

    // Validation logic
    switch (id) {
      case 'email':
        newErrors.email = !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email address (example@ex.com)' : '';
        break;
      case 'password':
        newErrors.password = value.trim() === '' ? 'Password is required' : '';
        break;
      default:
        break;
    }

    setFormData(newFormData);
    setErrors(newErrors);
    setIsFormValid(
      newFormData.email.trim() !== '' &&
      newErrors.email === '' &&
      newFormData.password.trim() !== '' &&
      newErrors.password === ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post(`${backend}/user/login`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const userData = {
          id: response.data._id,
          fullName: response.data.FullName,
          email: response.data.Email,
        };
        onSubmit(userData);
        setLoginStatus('Login successful!');
      } catch (error) {
        setLoginStatus('Login failed: ' + (error.response ? error.response.data.error : error.message));
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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
      <button className={`login-button ${!isFormValid ? 'disabled' : ''}`} type="submit" disabled={!isFormValid}>Log in</button>
      {loginStatus && <p className={`login-status ${loginStatus.includes('failed') ? 'error' : ''}`}>{loginStatus}</p>}
      <div className="login-footer">
        <p>
          Forgot your password? <a href="#" className="reset-password">Reset Your Password</a>
        </p>
        <p>
          Don’t have an account? <a href="#" className="register" onClick={toggleForm}>Register</a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
