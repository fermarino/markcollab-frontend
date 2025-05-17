import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar.jsx';
import SubNavbar from '../../components/SubNavbar/SubNavbar';
import './PersonalData.css';

const PersonalData = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/api/user/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setUserData(data);
      setFormData(data); // Preenche os dados para edição
      setIsEmployer(data.role === 'employer');
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setUserData(formData);
        setIsEditing(false);
        alert('Dados atualizados com sucesso!');
      } else {
        alert('Erro ao atualizar os dados.');
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar os dados.');
    }
  };

  const handleCancel = () => {
    setFormData(userData); 
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className="personal-data-container">
        <div className="header-actions">
          <h2>Dados pessoais</h2>
          {!isEditing && (
            <button className="editData-btn" onClick={() => setIsEditing(true)}>
              Editar dados
            </button>
          )}
        </div>

        <form className='profile_form'>
          
          <label className='personal_label'>Nome</label>
          <input
            type="text"
            name="name"
            value={formData?.name || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className='personal_input'
          />

          <label className='personal_label'>Email</label>
          <input
            type="email"
            name="email"
            value={formData?.email || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className='personal_input'
          />

          <label className='personal_label'>CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData?.cpf || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className='personal_input'
          />

          {isEmployer && (
            <>
              <label className='personal_label'>Nome da empresa</label>
              <input
                type="text"
                name="companyName"
                value={formData?.companyName || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className='personal_input'
              />
            </>
          )}

          <label className='personal_label'>Senha</label>
          <input
            type="password"
            name="password"
            placeholder={isEditing ? 'Digite nova senha' : ''}
            onChange={handleChange}
            disabled={!isEditing}
            className='personal_input'
          />

          {isEditing && (
            <div className="form-buttons">
              <button type="button" onClick={handleSave}>Salvar</button>
              <button type="button" onClick={handleCancel}>Cancelar</button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default PersonalData;
