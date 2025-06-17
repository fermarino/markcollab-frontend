import React from 'react';
import './CancelProject.css'; 
import { FiAlertTriangle } from 'react-icons/fi';

const CancelProject = ({ onClose, onConfirm }) => {
  return (
    <div className="cancel-modal-backdrop" onClick={onClose}>
      <div className="cancel-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="cancel-modal-icon-wrapper">
          <FiAlertTriangle className="cancel-modal-icon" />
        </div>
        
        <h2 className="cancel-modal-title">Confirmar Cancelamento</h2>
        
        <p className="cancel-modal-text">
          Você tem certeza que deseja cancelar este projeto? Esta ação não pode ser desfeita.
        </p>

        <div className="cancel-modal-footer">
          <button className="cancel-modal-button secondary" onClick={onClose}>
            Não, voltar
          </button>
          <button className="cancel-modal-button danger" onClick={onConfirm}>
            Sim, cancelar
          </button>
        </div>

      </div>
    </div>
  );
};

export default CancelProject;