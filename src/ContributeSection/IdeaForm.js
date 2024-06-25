import React, { useState } from 'react';
import './IdeaForm.css';
import axios from 'axios';

const backend = process.env.REACT_APP_BACKEND_URL;

const IdeaForm = () => {
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !idea) {
      alert('Please fill out both fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`${backend}/idea/addIdea`, {
        email,
        idea
      });

      if (response.status === 200) {
        setSuccessMessage('Thanks, Your idea has been submitted successfully!');
        setEmail('');
        setIdea('');
      } else {
        alert('There was an issue submitting your idea. Please try again.');
      }
    } catch (error) {
      alert('There was an issue submitting your idea. Please try again.');
    }
  };

  return (
    <div className="idea-form">
      <h3>Have an idea?</h3>
      <h4>More toolkits, better UI or a smarter way to adjust accuracy? Tell us your ideas below!</h4>
      <form onSubmit={handleSubmit}>
        <p className='inputs-title'>Email Address</p>
        <input 
          type="email" 
          placeholder="Enter Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <p className='inputs-title'>Drop Ideas Here</p>
        <textarea className='idea-textarea'
          placeholder="Drop Ideas Here" 
          value={idea} 
          onChange={(e) => setIdea(e.target.value)}
        ></textarea>
        <button type="submit" className="send-button">Send</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default IdeaForm;
