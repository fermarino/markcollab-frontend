import React from 'react';
import './CancelProject.css'; 
import { FaDoorOpen } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 



const CancelProject = ({ onClose, onConfirm }) => {
  const navigate = useNavigate(); 

  const handleConfirmExit = () => {
    onConfirm(); 
    onClose(); 
  };

  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="popup-header">
          <FaDoorOpen className="popup-header-icon" /> 
          <span className="popup-header-title">CANCELAR PROJETO</span>
        </div>

        {/* Texto principal do pop-up */}
        <div className="popup-body">
          <p className="popup-message">TEM CERTEZA QUE DESEJA CANCELAR O PROJETO?</p>
        </div>

        {/* Botões de "SAIR" e "CANCELAR" */}
        <div className="popup-footer">
        <button className="popup-button sim" onClick={onClose}>
            SIM
          </button>
          <button className="popup-button nao" onClick={onClose}>
            NÃO
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelProject;
