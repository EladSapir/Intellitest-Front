import React from 'react';
import './DeleteModule.css';

const DeleteModule = () => {
  const handleDelete = () => {
    // Handle delete functionality
    alert('Module deleted');
  };

  return (
    <div className="delete-module">
      <div className="delete-module-content">
        <i className="fas fa-trash-alt"></i>
        <span>Delete Module</span>
      </div>
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default DeleteModule;
