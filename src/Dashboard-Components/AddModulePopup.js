import React, { useState } from 'react';
import './AddModulePopup.css';

const AddModulePopup = ({ isOpen, onClose, user }) => {
  const [step, setStep] = useState(1);
  const [moduleName, setModuleName] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [csvFileName, setCsvFileName] = useState('');
  const [toolkit, setToolkit] = useState([]);
  const [interval, setInterval] = useState('Manual running');
  const [errorMessage, setErrorMessage] = useState('');
  const [stepErrorMessage, setStepErrorMessage] = useState('');

  const toolkitDescriptions = {
    Imputer: 'Fills missing values in the dataset.',
    'Feature Selection': 'Selects the most relevant features for the model.',
    Encoder: 'Transforms categorical data into numerical format.',
    'Remove Outlayer': 'Removes data points that are significantly different from others.',
    Scaler: 'Scales data to a standard range or distribution.',
  };

  const calculatePercentage = () => {
    return (step / 5) * 100;
  };

  const nextStep = () => {
    if (step === 1 && !moduleName) {
      setStepErrorMessage('Module Name is required.');
    } else if (step === 2 && !csvFile) {
      setStepErrorMessage('Please upload a CSV file.');
    } else {
      setStepErrorMessage('');
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleToolkitChange = (e) => {
    const value = e.target.value;
    setToolkit((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleDivClick = (e, value) => {
    e.stopPropagation();
    handleToolkitChange({ target: { value } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'text/csv') {
      setErrorMessage('Please upload a .csv file');
      setCsvFile(null);
      setCsvFileName('');
    } else {
      setErrorMessage('');
      setCsvFile(file);
      setCsvFileName(file ? file.name : '');
    }
  };

  const handleSubmit = () => {
    // Submit logic here
    onClose();
  };

  const renderProgressBars = () => {
    return (
      <div className="progress-bars">
        {[1, 2, 3, 4, 5].map((barStep) => (
          <div key={barStep} className={`progress-bar ${step >= barStep ? 'filled' : ''}`}></div>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="popup-header">
          <h2>Hey {user.fullName}</h2>
          <h3>Welcome to Intellitest!, Let’s build your model!</h3>
        </div>
        <div className="popup-body">
          <h4>Step {step}</h4>

          {step === 1 && (
            <div className="popup-step">
              <p className='title-steps'>Choose Name for your module</p>
              <input
                type="text"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                placeholder="Module Name"
              />
              {stepErrorMessage && <p className="error-message-step">*{stepErrorMessage}</p>}
              <button className="next-step-button" onClick={nextStep}>Next Step</button>
              {renderProgressBars()}
              <p className="progress-percentage">{calculatePercentage()}%</p>
            </div>
          )}

          {step === 2 && (
            <div className="popup-step">
              <p className='title-steps'>Upload your CSV File</p>
              <input
                type="text"
                value={csvFileName}
                placeholder="No file chosen"
                readOnly
                onClick={() => document.getElementById('file-upload').click()}
              />
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload" className="file-upload-button">
                <i className="material-icons">cloud_upload</i>
                Click To Upload File
              </label>
              <h5 className='Warning'>*Module with images should be created as a separate CSV file</h5>
              {errorMessage && <p className="error-message-step">*{errorMessage}</p>}
              {!errorMessage && stepErrorMessage && <p className="error-message-step">*{stepErrorMessage}</p>}
              <button className="prev-step-button" onClick={prevStep}>Go Back</button>
              <button className="next-step-button" onClick={nextStep} disabled={!!errorMessage}>Next Step</button>
              {renderProgressBars()}
              <p className="progress-percentage">{calculatePercentage()}%</p>
            </div>
          )}

          {step === 3 && (
            <div className="popup-step">
              <p className='title-steps'>Choose your toolkit</p>
              <div className="toolkit-checkboxes">
                {Object.keys(toolkitDescriptions).map((item) => (
                  <label key={item} className="tooltip-container-step">
                    <div className="checkbox-wrapper" onClick={(e) => handleDivClick(e, item)}>
                      <input
                        type="checkbox"
                        value={item}
                        checked={toolkit.includes(item)}
                        onChange={handleToolkitChange}
                      />
                      {item}
                    </div>
                    <span className="tooltip-wrapper">
                      <i className="material-icons tooltip-icon-step">help</i>
                      <span className="tooltip-text-step">{toolkitDescriptions[item]}</span>
                    </span>
                  </label>
                ))}
              </div>
              <button className="prev-step-button" onClick={prevStep}>Go Back</button>
              <button className="next-step-button" onClick={nextStep}>Next Step</button>
              {renderProgressBars()}
              <p className="progress-percentage">{calculatePercentage()}%</p>
            </div>
          )}

          {step === 4 && (
            <div className="popup-step">
              <p className='title-steps'>Choose running intervals</p>
              <div className="interval-radiobutton">
                <label>
                  <input
                    type="radio"
                    value="Once a week"
                    checked={interval === 'Once a week'}
                    onChange={(e) => setInterval(e.target.value)}
                    disabled
                  />
                  Once a week - Coming Soon
                </label>
                <label>
                  <input
                    type="radio"
                    value="Once a month"
                    checked={interval === 'Once a month'}
                    onChange={(e) => setInterval(e.target.value)}
                    disabled
                  />
                  Once a month - Coming Soon
                </label>
                <label>
                  <input
                    type="radio"
                    value="Manual running"
                    checked={interval === 'Manual running'}
                    onChange={(e) => setInterval(e.target.value)}
                  />
                  Manual running
                </label>
              </div>
              <button className="prev-step-button" onClick={prevStep}>Go Back</button>
              <button className="next-step-button" onClick={nextStep}>Next Step</button>
              {renderProgressBars()}
              <p className="progress-percentage">{calculatePercentage()}%</p>
            </div>
          )}

          {step === 5 && (
            <div>
              <p className='title-steps'>Name: {moduleName}</p>
              <p className='title-steps'>CSV File: {csvFile ? csvFile.name : ''}</p>
              <p className='title-steps'>Tool Kit: {toolkit.join(', ')}</p>
              <p className='title-steps'>Running Intervals: {interval}</p>
              <button className="prev-step-button step-5-button" onClick={prevStep}>Go Back</button>
              <button className="next-step-button step-5-button" onClick={handleSubmit}>Approve and Go To Dashboard</button>
              {renderProgressBars()}
              <p className="progress-percentage">{calculatePercentage()}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddModulePopup;
