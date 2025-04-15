import React, { useState } from 'react';
import './Publish.css';

const Publish = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    specifications: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const gerarDescricaoAutomatica = () => {
    const descricao = `Este projeto intitulado "${project.name}" visa atender às demandas do cliente com base nas especificações fornecidas.`;
    setProject({ ...project, description: descricao });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/projects/update', project)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <>
   
      <div className="project-edit-container">
        <a href="/projects" className="back-link">&larr; Voltar</a>
        <h2 className="edit-title">Publicar projeto</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>Nome do projeto</label>
          <input type="text" name="name" className="input-field bordered" value={project.name} onChange={handleChange} required />

          <label>Especificações do projeto</label>
          <textarea name="specifications" className="textarea-field" value={project.specifications} onChange={handleChange} required />

          <label>Prazo de entrega</label>
          <input type="date" name="deadline" className="input-field bordered" value={project.deadline} onChange={handleChange} required />

          <label>Descrição do projeto</label>
          <textarea name="description" className="textarea-field" value={project.description} onChange={handleChange} required />

          <button type="button" className="auto-desc-button" onClick={gerarDescricaoAutomatica}>
            🤖 Gerar descrição automática
          </button>

          <button type="submit" className="edit-button">Publicar projeto</button>
        </form>
      </div>
      
    </>
  );
};

export default Publish;