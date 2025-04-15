import React, { useState } from 'react';
import '../styles/EditProfile.css';
import { FaPen, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Ícones importados

const EditProfile = () => {
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    endereco: '',
    contato: '',
    estado: '',
    cidade: '',
    senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', form);
    alert('Perfil salvo com sucesso!');
  };

  const handleCancel = () => {
    alert('Alterações canceladas.');
  };

  return (
    <div className="edit-profile-container">
      <aside className="edit-profile-sidebar">
        <div className="edit-profile-sidebar-header">
          <span className="back-button">&lt;</span>
          <span className="edit-profile-title">Meu Perfil</span>
        </div>

        <ul className="edit-profile-sidebar-menu">
          <li className="edit-profile-sidebar-item">
            <FaPen /> Editar perfil
          </li>
          <li className="edit-profile-sidebar-item active">
            <FaCog /> Configurações
          </li>
          <li className="edit-profile-sidebar-item">
            <FaSignOutAlt /> Sair da conta
          </li>
        </ul>
      </aside>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h1 className="edit-profile-form-title">Dados Pessoais</h1>

        <div className="edit-profile-row">
          <div className="edit-profile-group">
            <label className="edit-profile-label">Nome</label>
            <input
              type="text"
              name="nome"
              className="edit-profile-input"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="edit-profile-group">
            <label className="edit-profile-label">Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              className="edit-profile-input"
              value={form.sobrenome}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="edit-profile-group">
          <label className="edit-profile-label">Email</label>
          <input
            type="email"
            name="email"
            className="edit-profile-input"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="edit-profile-group">
          <label className="edit-profile-label">Endereço</label>
          <input
            type="text"
            name="endereco"
            className="edit-profile-input"
            value={form.endereco}
            onChange={handleChange}
          />
        </div>

        <div className="edit-profile-group">
          <label className="edit-profile-label">Número para contato</label>
          <input
            type="text"
            name="contato"
            className="edit-profile-input"
            value={form.contato}
            onChange={handleChange}
          />
        </div>

        <div className="edit-profile-row">
          <div className="edit-profile-group">
            <label className="edit-profile-label">Estado</label>
            <select
              name="estado"
              className="edit-profile-input"
              value={form.estado}
              onChange={handleChange}
            >
              <option value="">Selecione um estado</option>
              {[
                'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
                'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
                'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
              ].map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>

          <div className="edit-profile-group">
            <label className="edit-profile-label">Cidade</label>
            <select
              name="cidade"
              className="edit-profile-input"
              value={form.cidade}
              onChange={handleChange}
            >
              <option value="">NULL</option>
            </select>
          </div>
        </div>

        <div className="edit-profile-group">
          <label className="edit-profile-label">Senha</label>
          <input
            type="password"
            name="senha"
            className="edit-profile-input"
            value={form.senha}
            onChange={handleChange}
          />
        </div>

        <div className="edit-profile-buttons">
          <button type="button" className="edit-profile-button cancel" onClick={handleCancel}>
            Cancelar
          </button>
          <button type="submit" className="edit-profile-button save">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
