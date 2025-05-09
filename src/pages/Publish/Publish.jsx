import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar.jsx';
import './Publish.css';
import axios from 'axios';

const Publish = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    specifications: '',
    deadline: '',
    projectPrice: ''
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // Integração com a IA para gerar descrição automática
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const employerCpf = localStorage.getItem('cpf');
    const token = localStorage.getItem('token');

    if (!employerCpf) {
      console.error('CPF do contratante não encontrado no localStorage');
      return;
    }

    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    const body = {
      projectTitle: project.name,
      projectDescription: project.description,
      projectSpecifications: project.specifications,
      deadline: project.deadline,
      projectPrice: parseFloat(project.projectPrice),
      open: true,
      status: "Ativo"
    };

    console.log("Enviando projeto:", body);

    axios.post(
      `http://localhost:8080/api/projects/${employerCpf}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => {
        console.log("Projeto publicado:", response.data);
        alert("Projeto publicado com sucesso!");
        // Opcional: limpar formulário após sucesso
        setProject({
          name: '',
          description: '',
          specifications: '',
          deadline: '',
          projectPrice: ''
        });
      })
      .catch(error => {
        console.error("Erro ao publicar o projeto:", error);
        if (error.response) {
          console.error("Detalhes do erro:", error.response.data);
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="project-edit-container">
        <a href="/meusprojetos" className="back-link">&larr; Voltar</a>
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

          <label>Preço</label>
          <input
            type="number"
            name="projectPrice"
            className="input-field bordered"
            value={project.projectPrice}
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

export default Publish;
