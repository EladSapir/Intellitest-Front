import React, { useState } from 'react';
import axios from 'axios';
import './ProfilePopup.css';

const ProfilePopup = ({ user, onClose }) => {
  const [userData, setUserData] = useState({
    name: user.fullName,
    email: user.email,
    newEmail: user.email,
    password: '',
    repeatPassword: '',
    typeOfUse: user.typeOfUse || 'Private'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    if (userData.password !== userData.repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    // Reset messages
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/user/update', {
        fullname: userData.name,
        email: user.email, // old email
        newEmail: userData.newEmail,
        password: userData.password
      });
      setSuccess('User data updated successfully');
      onClose();
    } catch (error) {
      setError('There was an error updating the user data');
      console.error("There was an error updating the user data!", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/user/${user.id}`);
      console.log("User account deleted successfully");
      onClose();
    } catch (error) {
      setError('There was an error deleting the user account');
      console.error("There was an error deleting the user account!", error);
    }
  };

  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Profile</h2>
        <div className="profile-header">
          <div className="profile-avatar">{userData.name.split(' ').map(n => n[0]).join('')}</div>
          <div className="profile-name">
            <span>{userData.name}</span>
            <button className="edit-button">
              <span className="material-icons">edit</span>
            </button>
          </div>
        </div>
        <div className="profile-field">
          <label>Email Address</label>
          <input 
            type="email" 
            value={userData.newEmail} 
            name="newEmail" 
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="profile-field">
          <label>Password</label>
          <input 
            type="password" 
            value={userData.password} 
            name="password" 
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="profile-field">
          <label>Repeat Password</label>
          <input 
            type="password" 
            value={userData.repeatPassword} 
            name="repeatPassword" 
            onChange={handleChange}
            placeholder="Repeat Password"
          />
        </div>
        <div className="profile-field">
          <label>Type of use</label>
          <div>
            <input className="radio-button"
              type="radio" 
              name="typeOfUse" 
              value="Private" 
              checked={userData.typeOfUse === 'Private'}
              onChange={handleChange}
            /> Private
            <input  className="radio-button"
              type="radio" 
              name="typeOfUse" 
              value="Business" 
              checked={userData.typeOfUse === 'Business'}
              onChange={handleChange}
            /> Business
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button className="update-button" onClick={handleUpdate}>Update</button>
        <div className="delete-account-section">
          <h3>Delete Account</h3>
          <p>Deleting your account would erase all your data, <strong>this step can't be undone!</strong></p>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
        <p className="note-message">Deleting your account would be possible only if there is no learning cycle live!</p>
      </div>
    </div>
  );
};

export default ProfilePopup;
