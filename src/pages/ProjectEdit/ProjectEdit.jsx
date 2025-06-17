import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './ProjectEdit.css';

const ProjectEdit = () => {
  const { id } = useParams(); // O nome do parâmetro na sua rota deve ser 'id'
  const [project, setProject] = useState({
    projectTitle: '',
    projectDescription: '',
    projectSpecifications: '',
    deadline: '',
    projectPrice: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para guardar a mensagem de erro
  const navigate = useNavigate();
  const cpf = localStorage.getItem('cpf');

  useEffect(() => {
    // ✅ CORREÇÃO: Só executa a busca se o 'id' for válido
    if (id) {
      setLoading(true); // Garante que o estado de loading seja ativado
      api.get(`projects/${id}`)
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
          setLoading(false); // Garante que o loading termine mesmo em caso de erro
        });
    } else {
      // Caso o ID não esteja presente na URL
      console.error("ID do projeto não fornecido na URL.");
      setError("ID do projeto não encontrado.");
      setLoading(false);
    }
  }, [id]); // O efeito depende do 'id'

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

    api.put(`projects/${id}/${cpf}`, payload)
      .then(() => {
        alert('✅ Projeto atualizado com sucesso!');
        // Navega para uma rota absoluta
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
    <div className="project-edit-container">
      <button onClick={() => navigate(-1)} className="back-link">&larr; Voltar</button>
      <h2 className="edit-title">Editar projeto</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Nome do projeto</label>
        <input
          type="text"
          name="projectTitle"
          className="input-field bordered"
          value={project.projectTitle}
          onChange={handleChange}
          required
        />

        <label>Descrição do projeto</label>
        <textarea
          name="projectDescription"
          className="textarea-field"
          value={project.projectDescription}
          onChange={handleChange}
          required
        />

        <label>Especificações do projeto</label>
        <textarea
          name="projectSpecifications"
          className="textarea-field"
          value={project.projectSpecifications}
          onChange={handleChange}
          required
        />

        <label>Prazo de entrega</label>
        <input
          type="date"
          name="deadline"
          className="input-field bordered"
          value={project.deadline}
          onChange={handleChange}
        />

        <label>Preço do projeto</label>
        <input
          type="number"
          step="0.01"
          name="projectPrice"
          className="input-field bordered"
          value={project.projectPrice}
          onChange={handleChange}
          required
        />

        <label>Status do projeto</label>
        <select
          name="status"
          className="input-field bordered"
          value={project.status}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o status</option>
          <option value="Aberto">Aberto</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
        </select>

        <button type="submit" className="edit-button">Salvar alterações</button>
      </form>
    </div>
  );
};

export default ProjectEdit;