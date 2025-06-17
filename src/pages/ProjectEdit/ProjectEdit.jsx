import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './ProjectEdit.css';

const ProjectEdit = () => {
  // ATUALIZAÇÃO: Alterado de { id } para { projectId } para corresponder à rota
  const { projectId } = useParams();
  const [project, setProject] = useState({
    projectTitle: '',
    projectDescription: '',
    projectSpecifications: '',
    deadline: '',
    projectPrice: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const cpf = localStorage.getItem('cpf');

  useEffect(() => {
    // ATUALIZAÇÃO: Usando a variável 'projectId'
    if (projectId) {
      setLoading(true);
      // ATUALIZAÇÃO: Usando 'projectId' na chamada da API
      api.get(`projects/${projectId}`)
        .then((res) => {
          const p = res.data;
          setProject({
            projectTitle: p.projectTitle || '',
            projectDescription: p.projectDescription || '',
            projectSpecifications: p.projectSpecifications || '',
            deadline: p.deadline ? p.deadline.split('T')[0] : '',
            projectPrice: p.projectPrice != null ? p.projectPrice : '',
            status: p.status || ''
          });
        })
        .catch((err) => {
          console.error('Erro ao carregar projeto (GET):', err.response || err);
          setError('Erro ao carregar o projeto. Verifique o ID e tente novamente.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error("ID do projeto não fornecido na URL.");
      setError("ID do projeto não encontrado.");
      setLoading(false);
    }
    // ATUALIZAÇÃO: Adicionada 'projectId' como dependência do useEffect
  }, [projectId]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const deadlineParaEnviar = project.deadline.trim() === '' ? null : project.deadline;
    const payload = {
      projectTitle: project.projectTitle,
      projectDescription: project.projectDescription,
      projectSpecifications: project.projectSpecifications,
      deadline: deadlineParaEnviar,
      projectPrice: parseFloat(project.projectPrice),
      status: project.status
    };
    // ATUALIZAÇÃO: Usando 'projectId' na chamada PUT da API
    api.put(`projects/${projectId}/${cpf}`, payload)
      .then(() => {
        alert('✅ Projeto atualizado com sucesso!');
        navigate('/meusprojetos');
      })
      .catch((err) => {
        console.error('Erro ao atualizar projeto (PUT):', err.response || err);
        const msgBackend = err.response?.data?.message || err.message;
        alert(`❌ Erro ao atualizar projeto: ${msgBackend}`);
      });
  };

  if (loading) return <p className="loading-message">Carregando...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="project-edit-page">
      <div className="project-edit-container">
        <div className="form-header">
          <button onClick={() => navigate(-1)} className="back-button">&larr; Voltar</button>
          <h2 className="edit-title">Editar Projeto</h2>
        </div>
        
        <form className="edit-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="projectTitle">Nome do projeto</label>
            <input
              id="projectTitle"
              type="text"
              name="projectTitle"
              className="form-input"
              value={project.projectTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectDescription">Descrição do projeto</label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              className="form-input"
              value={project.projectDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectSpecifications">Especificações do projeto</label>
            <textarea
              id="projectSpecifications"
              name="projectSpecifications"
              className="form-input"
              value={project.projectSpecifications}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="deadline">Prazo de entrega</label>
              <input
                id="deadline"
                type="date"
                name="deadline"
                className="form-input"
                value={project.deadline}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="projectPrice">Preço do projeto (R$)</label>
              <input
                id="projectPrice"
                type="number"
                step="0.01"
                name="projectPrice"
                className="form-input"
                value={project.projectPrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status do projeto</label>
            <select
              id="status"
              name="status"
              className="form-input"
              value={project.status}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o status</option>
              <option value="Aberto">Aberto</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
          
          <button type="submit" className="submit-button">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
};

export default ProjectEdit;