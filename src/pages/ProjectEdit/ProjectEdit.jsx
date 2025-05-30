import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar.jsx';
import axios from 'axios';
import './ProjectEdit.css';

const ProjectEdit = () => {
  const { id } = useParams();
  const [project, setProject] = useState({
    projectTitle: '',
    projectDescription: '',
    projectSpecifications: '',
    deadline: '',
    projectPrice: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cpf = localStorage.getItem('cpf');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios
      .get(`http://localhost:8080/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const p = res.data;
        setProject({
          projectTitle: p.projectTitle,
          projectDescription: p.projectDescription,
          projectSpecifications: p.projectSpecifications,
          deadline: p.deadline?.split("T")[0],
          projectPrice: p.projectPrice,
          status: p.status
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao carregar projeto');
      });
  }, [id, token]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/projects/${id}/${cpf}`, {
        ...project,
        projectPrice: parseFloat(project.projectPrice)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert("Projeto atualizado com sucesso!");
        navigate('/meusprojetos');
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao atualizar projeto');
      });
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <Navbar />
      <div className="project-edit-container">
        <a href="/meusprojetos" className="back-link">&larr; Voltar</a>
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
            required
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
    </>
  );
};

export default ProjectEdit;
