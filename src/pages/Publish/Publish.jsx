import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar.jsx';
import './Publish.css';
import axios from 'axios';

const Publish = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    specifications: '',
    deadline: ''
  });

  // Atualizar o estado dos campos do formulário
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // Função para chamar o backend que vai interagir com a IA
  const gerarDescricaoAutomatica = () => {
    const projectData = {
      name: project.name,
      specifications: project.specifications,
      deadline: project.deadline
    };

    axios.post('http://localhost:8080/api/ia/gerar-descricao', projectData)
      .then(response => {
        const descricaoGerada = response.data.descricao;
        setProject(prevState => ({
          ...prevState,
          description: descricaoGerada
        }));
      })
      .catch(error => {
        console.error("Erro ao chamar a IA:", error);
      });
  };

  // Enviar dados do projeto para o backend
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/projects', project)
      .then(response => {
        console.log("Projeto publicado:", response.data);
      })
      .catch(error => {
        console.error("Erro ao publicar o projeto:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="project-edit-container">
        <a href="/projects" className="back-link">&larr; Voltar</a>
        <h2 className="edit-title">Publicar projeto</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>Nome do projeto</label>
          <input
            type="text"
            name="name"
            className="input-field bordered"
            value={project.name}
            onChange={handleChange}
            required
          />

          <label>Especificações do projeto</label>
          <textarea
            name="specifications"
            className="textarea-field"
            value={project.specifications}
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

          <label>Descrição do projeto</label>
          <textarea
            name="description"
            className="textarea-field"
            value={project.description}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="auto-desc-button"
            onClick={gerarDescricaoAutomatica}
          >
            🤖 Gerar descrição automática
          </button>

          <button type="submit" className="edit-button">Publicar projeto</button>
        </form>
      </div>
    </>
  );
};

export default Publish;