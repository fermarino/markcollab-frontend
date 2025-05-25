import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar.jsx';
import Input from '../../components/Input/Input.jsx';
import axios from 'axios';
import styles from './Publish.module.css';

export default function Publish() {
  const [project, setProject] = useState({
    name: '',
    specifications: '',
    description: '',
    deadline: '',
    projectPrice: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const cpf   = localStorage.getItem('cpf');
  const token = localStorage.getItem('token');

  const handleChange = e => {
    const { name, value } = e.target;
    setProject(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));
  };

  const handlePriceBlur = () => {
    let raw = project.projectPrice.replace(/\D/g, '');
    let num = parseFloat(raw) / 100;
    if (isNaN(num)) num = 0;
    if (num > 20000) num = 20000;
    setProject(p => ({
      ...p,
      projectPrice: num.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }));
    setErrors(e => ({ ...e, projectPrice: '' }));
  };

  const gerarDescricaoIA = () => {
    const { name, specifications, deadline } = project;
    axios.post('/api/ia/gerar-descricao', { name, specifications, deadline })
      .then(res => {
        const desc = res.data.descricao?.trim();
        if (!desc) throw new Error();
        setProject(p => ({ ...p, description: desc }));
        setErrors(e => ({ ...e, description: '' }));
      })
      .catch(() => setErrors(e => ({ ...e, description: 'Não foi possível gerar descrição.' })));
  };

  const validate = () => {
    const e = {};
    if (!project.name.trim()) e.name = 'Nome é obrigatório.';
    if (!project.specifications.trim()) e.specifications = 'Especificações são obrigatórias.';
    if (!project.description.trim()) e.description = 'Descrição é obrigatória.';
    if (!project.deadline) {
      e.deadline = 'Prazo é obrigatório.';
    } else {
      const today = new Date(); today.setHours(0,0,0,0);
      const sel = new Date(project.deadline);
      if (sel < today) e.deadline = 'Selecione uma data válida.';
    }
    const preco = parseFloat(
      project.projectPrice.replace(/[R$.]/g,'').replace(',','.')
    );
    if (isNaN(preco) || preco <= 0 || preco > 20000) {
      e.projectPrice = 'Digite um valor válido';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    if (!cpf || !token) return alert('Faça login novamente.');
    if (!validate()) return;
    const preco = parseFloat(
      project.projectPrice.replace(/[R$.]/g,'').replace(',','.')
    );
    axios.post(`/api/projects/${cpf}`, {
      projectTitle: project.name,
      projectSpecifications: project.specifications,
      projectDescription: project.description,
      deadline: project.deadline,
      projectPrice: preco,
      open: true,
      status: 'Ativo'
    }, { headers: { Authorization: `Bearer ${token}` }})
    .then(() => {
      setSuccessMsg('Projeto publicado com sucesso!');
      setProject({ name:'', specifications:'', description:'', deadline:'', projectPrice:'' });
      setErrors({});
      setSubmitted(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    })
    .catch(() => alert('Erro ao publicar projeto.'));
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.card}>
        <h2 className={styles.title}>Publique o que você precisa!</h2>
        {successMsg && <div className={styles.success}>{successMsg}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Nome do projeto"
            name="name"
            value={project.name}
            onChange={handleChange}
            error={submitted && errors.name}
          />

          <label className={styles.label}>Especificações</label>
          <textarea
            name="specifications"
            className={`${styles.textarea} ${submitted && errors.specifications ? styles.inputError : ''}`}
            value={project.specifications}
            onChange={handleChange}
          />
          {submitted && errors.specifications && (
            <span className={styles.error}>{errors.specifications}</span>
          )}

          <label className={styles.label}>Descrição</label>
          <textarea
            name="description"
            className={`${styles.textarea} ${submitted && errors.description ? styles.inputError : ''}`}
            value={project.description}
            onChange={handleChange}
          />
          {submitted && errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}

          <button
            type="button"
            className={styles.iaButton}
            onClick={gerarDescricaoIA}
          >
            🤖 Gerar descrição com IA
          </button>

          <Input
            label="Prazo de entrega"
            name="deadline"
            type="date"
            value={project.deadline}
            onChange={handleChange}
            error={submitted && errors.deadline}
          />

          <Input
            label="Preço"
            name="projectPrice"
            type="text"
            value={project.projectPrice}
            onChange={handleChange}
            onBlur={handlePriceBlur}
            error={submitted && errors.projectPrice}
            placeholder="R$ 0,00"
          />

          <button type="submit" className={styles.publishButton}>
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
}
