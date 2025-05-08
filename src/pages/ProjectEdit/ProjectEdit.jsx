import React, { useState } from 'react';
import './ProjectEdit.css';
import Navbar from '../../components/navbar/Navbar.jsx';

const ProjectEdit = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    specifications: '',
    deadline: '',
    status: ''
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/projects/update', project)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <>
      <Navbar/>
      <div className="project-edit-container">
        <a href="/meusprojetos" className="back-link">&larr; Voltar</a>
        
        <h2 className="edit-title">Editar projeto</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>Nome do projeto</label>
          <input type="text" name="name" className="input-field bordered" value={project.name} onChange={handleChange} required />
          
          <label>Descrição do projeto</label>
          <textarea name="description" className="textarea-field" value={project.description} onChange={handleChange} required />
          
          <label>Especificações do projeto</label>
          <textarea name="specifications" className="textarea-field" value={project.specifications} onChange={handleChange} required />
          
          <label>Prazo de entrega</label>
          <input type="date" name="deadline" className="input-field bordered" value={project.deadline} onChange={handleChange} required />
          <label>Status do projeto</label>
        <select name="status" className="input-field bordered" value={project.status} onChange= {handleChange} required>
          <option value="">Selecione o status</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
          <option value="Analisando propostas">Analisando propostas</option>
       </select>
          <button type="submit" className="edit-button">Editar projeto</button>
        </form>
      </div>
     
    </>
  );
};

export default ProjectEdit;