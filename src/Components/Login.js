import React from 'react';
import './Login.css';

const Login = () => (
  <div className="login-container">
    <div className="login-form">
      <input type="email" placeholder="Email Address" className="input" />
      <input type="password" placeholder="Password" className="input" />
      <button className="button">Login</button>
    </div>
  </div>
);

export default Login;
