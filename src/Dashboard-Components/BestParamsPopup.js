import React from 'react';
import './BestParamsPopup.css';

const BestParamsPopup = ({ show, onClose, historyResponse, modelResponse }) => {
  if (!show) return null;

  const paramsSVC = historyResponse?.paramsSVC;
  const urls = {
    CSVpath: modelResponse?.CSVpath,
    encode_csv: modelResponse?.encode_csv,
    scale_csv: modelResponse?.scale_csv,
  };

  return (
    <div className="bestparams-popup-overlay">
      <div className="bestparams-popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Best Parameters</h2>
        {paramsSVC && (
          <div className='bestparams-div'>
            <p><strong>C:</strong> {paramsSVC.C}</p>
            <p><strong>Gamma:</strong> {paramsSVC.gamma}</p>
            <p><strong>Kernel:</strong> {paramsSVC.kernel}</p>
          </div>
        )}
        <div className="bestparams-urls bestparams-div">
          {urls.CSVpath && urls.CSVpath !== 'https://example.example' && <p><strong>CSV Path:</strong> <a href={urls.CSVpath} target="_blank" rel="noopener noreferrer">CSV Path</a></p>}
          {urls.encode_csv && urls.encode_csv !== 'https://example.example' && <p><strong>Encoded CSV:</strong> <a href={urls.encode_csv} target="_blank" rel="noopener noreferrer">Encoded CSV</a></p>}
          {urls.scale_csv && urls.scale_csv !== 'https://example.example' && <p><strong>Scaled CSV:</strong> <a href={urls.scale_csv} target="_blank" rel="noopener noreferrer">Scaled CSV</a></p>}
        </div>
        <div className="bestparams-buttons">
          <button className="bestparams-stay-in-button btn-landingpage" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BestParamsPopup;
