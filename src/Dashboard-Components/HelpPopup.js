import React from 'react';
import './HelpPopup.css';

const HelpPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="help-popup-overlay">
      <div className="help-popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Getting Started: Goals and Key Information</h2>
        <p>
          Our goal is to help you track your models while trying to improve their accuracy. We provide the best parameters for creating SVMs to achieve optimal results. You can update your CSV files with new data to see if parameter changes are needed. The toolkit provides additional options to help you achieve the best accuracy for your system.
        </p>
        <div className="toolkit-item">
          <i className="fas fa-fill-drip icon"></i>
          <div className="toolkit-text">
            <strong>Imputer:</strong> This toolkit addresses missing values in your datasets. Missing values occur when no data value is stored for a variable in an observation. Currently, the system decides the imputation strategy. In future updates, you'll be able to choose your preferred method for filling in missing values.
          </div>
        </div>
        <div className="toolkit-item">
          <i className="fas fa-exchange-alt icon"></i>
          <div className="toolkit-text">
            <strong>Encoder:</strong> Converts categorical data into numerical form, which is essential for models like SVM that require numerical input. The encoder ensures all your non-numeric data is properly transformed for model compatibility.
          </div>
        </div>
        <div className="toolkit-item">
          <i className="fas fa-ruler-combined icon"></i>
          <div className="toolkit-text">
            <strong>Scaler:</strong> Adjusts the range of your data to improve model performance. By normalizing the data, the scaler ensures that features contribute equally to the model's learning process.
          </div>
        </div>
        <div className="toolkit-item">
          <i className="fas fa-filter icon"></i>
          <div className="toolkit-text">
            <strong>Feature Selection:</strong> Selects the most relevant features from your dataset, reducing model complexity and enhancing predictive accuracy. Note: You need to decide the 'k', the number of features to be selected, and specify the 'target' column, which represents the result in each row, so the model can learn properly.
          </div>
        </div>
        <div className="toolkit-item">
          <i className="fas fa-trash-alt icon"></i>
          <div className="toolkit-text">
            <strong>Remove Outliers:</strong> Identifies and removes anomalous data points to ensure a more robust and reliable model.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPopup;
