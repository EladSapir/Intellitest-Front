import React, { useState } from 'react';
import axios from 'axios';
import './ProfilePopup.css';
import eyeIcon from '../Images/eye-icon.png';
import DeleteConfirmationPopup from './DeleteConfirmationPopup'; // Import the new component

const backend = process.env.REACT_APP_BACKEND_URL;

const ProfilePopup = ({ user, onClose, updateUser, onLogout }) => {
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
  const [isEditingName, setIsEditingName] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // New state

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

    setError('');
    setSuccess('');

    try {
      const payload = {
        newfullname: userData.name,
        email: user.email,
        newpassword: userData.password,
        newaccountType: userData.typeOfUse === 'Business'
      };

      if (userData.newEmail !== user.email) {
        payload.newEmail = userData.newEmail;
      }

      const response = await axios.post(`${backend}/user/edit`, payload);

      if (response.status === 200) {
        setSuccess('User data updated successfully');
        updateUser({
          fullName: userData.name,
          email: userData.newEmail,
          typeOfUse: userData.typeOfUse
        });
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('There was an error updating the user data');
      }
      console.error("There was an error updating the user data!", error);
    }
  };

  const handleDelete = async (password) => {
    try {
      const response = await axios.post(`${backend}/user/delete`, { email: user.email, password }); // Include password in payload

      if (response.status === 200) {
        console.log("User account deleted successfully");
        onLogout();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('There was an error deleting the user account');
      }
      console.error("There was an error deleting the user account!", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Profile</h2>
        <div className="profile-header">
          <div className="profile-avatar">{userData.name.split(' ').slice(0, 2).map(n => n[0]).join('')}</div>
          <div className="profile-name">
            {isEditingName ? (
              <input
                type="text"
                value={userData.name}
                name="name"
                onChange={handleChange}
                onBlur={() => setIsEditingName(false)}
                autoFocus
              />
            ) : (
              <span>{userData.name}</span>
            )}
            <button className="edit-button" onClick={() => setIsEditingName(true)}>
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
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={userData.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <button type="button" className="toggle-password" onClick={toggleShowPassword}>
              <img src={eyeIcon} alt="Toggle visibility" />
            </button>
          </div>
        </div>
        <div className="profile-field">
          <label>Repeat Password</label>
          <div className="password-input-container">
            <input
              type={showRepeatPassword ? "text" : "password"}
              value={userData.repeatPassword}
              name="repeatPassword"
              onChange={handleChange}
              placeholder="Repeat Password"
            />
            <button type="button" className="toggle-password" onClick={toggleShowRepeatPassword}>
              <img src={eyeIcon} alt="Toggle visibility" />
            </button>
          </div>
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
            <input className="radio-button"
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
          <button className="delete-button" onClick={() => setShowDeleteConfirmation(true)}>Delete</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
        <p className="note-message">Deleting your account would be possible only if there is no learning cycle live!</p>
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmationPopup
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
};

export default ProfilePopup;
