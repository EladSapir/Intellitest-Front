import React, { useState } from 'react';
import axios from 'axios';
import eye from '../Images/eye-icon.png';
import './SignUpForm.css';
const backend = process.env.REACT_APP_BACKEND_URL;

const SignUpForm = ({ toggleForm, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [signUpStatus, setSignUpStatus] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };
    let newFormData = { ...formData, [id]: value };

   
    switch (id) {
      case 'fullName':
        newErrors.fullName = value.trim() === '' ? 'Full Name is required' : '';
        break;
      case 'email':
        newErrors.email = !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email address (example@ex.com)' : '';
        break;
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
        newErrors.password = !passwordRegex.test(value)
          ? 'Password must be at least 8 characters, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
          : '';
        break;
      case 'repeatPassword':
        newErrors.repeatPassword = value !== formData.password ? 'Passwords do not match' : '';
        break;
      default:
        break;
    }

    setFormData(newFormData);
    setErrors(newErrors);
    setIsFormValid(
      newFormData.fullName.trim() !== '' &&
      newErrors.fullName === '' &&
      newFormData.email.trim() !== '' &&
      newErrors.email === '' &&
      newFormData.password.trim() !== '' &&
      newErrors.password === '' &&
      newFormData.repeatPassword.trim() !== '' &&
      newErrors.repeatPassword === ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post(`${backend}/user/register`, {
          fullname: formData.fullName, 
          email: formData.email,
          password: formData.password,
          accountType: false 
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(JSON.stringify(response, null, 2)); 
        console.log(JSON.stringify(response.data, null, 2)); 
        const userData = {
          id: response.data._id,
          fullName: response.data.FullName, 
          email: response.data.Email,
        };
        console.log(userData)
        onSubmit(userData);
        setSignUpStatus('Sign-up successful!');
      } catch (error) {
        setSignUpStatus('Sign-up failed: ' + (error.response ? error.response.data.error : error.message));
      }
    }
  };

  return (
    <form className="login-form sign-up-form" onSubmit={handleSubmit}>
      <h3 className="login-title">Sign up</h3>
      <div className="input-group">
        <label htmlFor="fullName" className="input-label">Full Name</label>
        <input 
          type="text" 
          id="fullName" 
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
        <label htmlFor="repeatPassword" className="input-label">Repeat Password</label>
        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="repeatPassword"
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
            <input type="radio" name="typeOfUse" value="private" defaultChecked />
            Private
          </label>
          <label>
            <input type="radio" name="typeOfUse" value="business" />
            Business
          </label>
        </div>
      </div>
      <button className={`login-button ${!isFormValid ? 'disabled' : 'btn-landingpage'}`} type="submit" disabled={!isFormValid}>Sign up</button>
      {signUpStatus && <p className={`sign-up-status ${signUpStatus.includes('failed') ? 'error' : ''}`}>{signUpStatus}</p>}
      <div className="login-footer">
        <p>
          Have an account? <a href="#" className="login-link" onClick={toggleForm}>Login</a>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
