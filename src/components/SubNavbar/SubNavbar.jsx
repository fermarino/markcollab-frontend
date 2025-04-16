// SubNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaIdCard, FaSignOutAlt } from 'react-icons/fa';
import './SubNavbar.css';

const SubNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  };

  return (
    <div className="subnavbar">
      <button onClick={() => navigate('/perfil')}>
        <FaUser className="icon" />
        Perfil
      </button>
      <button onClick={() => navigate('/dadospessoais')}>
        <FaIdCard className="icon" />
        Dados pessoais
      </button>
      <button onClick={handleLogout}>
        <FaSignOutAlt className="icon" />
        Sair da conta
      </button>
    </div>
  );
};

export default SubNavbar;
