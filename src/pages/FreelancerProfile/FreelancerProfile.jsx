
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import axios from 'axios';
import './FreelancerProfile.module.css';

const FreelancerProfile = () => {
  const { cpf } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cpf) {
      alert('CPF do freelancer não informado.');
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/freelancers/${cpf}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        setFreelancer(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar perfil do freelancer:', err);
        alert('Erro ao carregar perfil do freelancer.');
        setLoading(false);
      });
  }, [cpf]);

  if (loading) {
    return (
      <div className="freelancer-profile-page">
        <Navbar />
        <div className="loading">Carregando perfil do freelancer...</div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="freelancer-profile-page">
        <Navbar />
        <div className="error">Perfil não encontrado.</div>
        <Link to="/meusprojetos" className="back-link">&larr; Voltar</Link>
      </div>
    );
  }

  return (
    <div className="freelancer-profile-page">
      <Navbar />

      <div className="personal-data-container">
        <div className="profile-header">
          <h2>Perfil do Freelancer</h2>
          <div className="profile-info">
            <div>
              <div className="profile-picture">
                <img
                  src={freelancer.profilePicture || '/default-avatar.png'}
                  alt="Foto de perfil"
                />
              </div>
            </div>

            <div className="profile-name">
              <h3>{freelancer.name}</h3>
            </div>
          </div>
        </div>

        <div className="profile_form">
          <label className="profile_label">Usuário</label>
          <input
            type="text"
            value={freelancer.username || ''}
            disabled
            className="profile_input"
          />

          <label className="profile_label">Email</label>
          <input
            type="email"
            value={freelancer.email || ''}
            disabled
            className="profile_input"
          />

          {freelancer.portfolioLink && (
            <>
              <label className="profile_label">Portfólio</label>
              <a
                href={freelancer.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="profile_input"
                style={{ textDecoration: 'underline', color: '#0066ff' }}
              >
                {freelancer.portfolioLink}
              </a>
            </>
          )}

          {freelancer.aboutMe && (
            <>
              <label className="profile_label">Sobre mim</label>
              <textarea
                value={freelancer.aboutMe}
                disabled
                className="aboutInput"
              />
            </>
          )}

          {freelancer.experience && (
            <>
              <label className="profile_label">Experiência Profissional</label>
              <textarea
                value={freelancer.experience}
                disabled
                className="aboutInput"
              />
            </>
          )}

          <Link to="/meusprojetos" className="back-link">&larr; Voltar</Link>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
