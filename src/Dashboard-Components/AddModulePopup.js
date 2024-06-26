import React, { useState } from 'react';
import './AddModulePopup.css';

const AddModulePopup = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [moduleName, setModuleName] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [toolkit, setToolkit] = useState([]);
  const [interval, setInterval] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleToolkitChange = (e) => {
    const value = e.target.value;
    setToolkit((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
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
          <h2> Hey username</h2>
          <h3>Welcome to Intellitest!, Let’s build your model!</h3>
          
        </div>
        <div className="popup-body">
            <h4>Step {step}</h4>
            <p>Choose Name for your module</p>
          {step === 1 && (
            <div>
              <input
                type="text"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                placeholder="Module Name"
              />
              <button className="next-step-button" onClick={nextStep}>Next Step</button>
              {renderProgressBars()}
            </div>
          )}
          {step === 2 && (
            <div>
              <input
                type="file"
                onChange={(e) => setCsvFile(e.target.files[0])}
                placeholder="Click To Upload File"
              />
              <button className="prev-step-button" onClick={prevStep}>Go Back</button>
              <button className="next-step-button" onClick={nextStep}>Next Step</button>
              {renderProgressBars()}
            </div>
          )}
          {step === 3 && (
            <div>
              {['Toolkit 1', 'Toolkit 2', 'Toolkit 3', 'Toolkit 4', 'Toolkit 5'].map((item) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    value={item}
                    checked={toolkit.includes(item)}
                    onChange={handleToolkitChange}
                  />
                  {item}
                </label>
              ))}
              <button className="prev-step-button" onClick={prevStep}>Go Back</button>
              <button className="next-step-button" onClick={nextStep}>Next Step</button>
              {renderProgressBars()}
            </div>
          )}
          {step === 4 && (
            <div>
              <label>
                <input
                  type="radio"
                  value="Once a week"
                  checked={interval === 'Once a week'}
                  onChange={(e) => setInterval(e.target.value)}
                />
                Once a week
              </label>
              <label>
                <input
                  type="radio"
                  value="Once a month"
                  checked={interval === 'Once a month'}
                  onChange={(e) => setInterval(e.target.value)}
                />
                Once a month
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
              <button className="prev-step-button" onClick={prevStep}>Go Back</button>
              <button className="next-step-button" onClick={nextStep}>Next Step</button>
              {renderProgressBars()}
            </div>
          )}
          {step === 5 && (
            <div>
              <p>Name: {moduleName}</p>
              <p>CSV File: {csvFile ? csvFile.name : ''}</p>
              <p>Tool Kit: {toolkit.join(', ')}</p>
              <p>Running Intervals: {interval}</p>
              <button className="prev-step-button" onClick={prevStep}>Go Back</button>
              <button className="next-step-button" onClick={handleSubmit}>Approve and Go To Dashboard</button>
              {renderProgressBars()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddModulePopup;
