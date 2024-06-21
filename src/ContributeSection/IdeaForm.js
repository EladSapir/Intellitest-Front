// IdeaForm.js
import React from 'react';
import './IdeaForm.css';

const IdeaForm = () => {
  return (
    <div className="idea-form">
      <h3>Have an idea?</h3>
      <h4>More toolkits, better UI or a smarter way to adjust accuracy? Tell us your ideas below!</h4>
      <p className='inputs-title'>Email Address</p>
      <input type="email" placeholder="Enter Email Address" />
      <p className='inputs-title'>Drop Ideas Here</p>
      <textarea placeholder="Drop Ideas Here"></textarea>
      <button className="send-button">Send</button>
    </div>
  );
};

export default IdeaForm;
