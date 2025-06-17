import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 1. USE O SERVIÇO 'api'
import api from '../../services/api';
import styles from './ProjectDelivery.module.css'; 
import { FiPaperclip, FiLink, FiCheckCircle } from 'react-icons/fi'; 

export default function ProjectDelivery() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [links, setLinks] = useState('');
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(e.target.files)]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('deliveryText', text);
    formData.append('deliveryLinks', links);
    files.forEach(file => {
      formData.append('attachments', file);
    });

    // 2. USE 'api.post' E O CAMINHO CORRETO. NOTE QUE A VARIÁVEL DE AMBIENTE NÃO É MAIS USADA AQUI.
    // O 'Content-Type' é importante para upload de arquivos.
    api.post(`/api/projects/${projectId}/deliver`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        navigate('/meusprojetosfreelancer');
      })
      .catch((err) => {
        console.error("Erro ao entregar o projeto:", err);
        setError('Falha ao enviar a entrega. Verifique os dados e tente novamente.');
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <form className={styles.deliveryForm} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <FiCheckCircle className={styles.headerIcon} />
            <h2 className={styles.formTitle}>Entregar Projeto</h2>
            <p className={styles.formSubtitle}>Envie os materiais para a avaliação do contratante.</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="links" className={styles.label}><FiLink /> Links (Repositório, Drive, etc.)</label>
            <input
              id="links"
              type="url"
              className={styles.input}
              value={links}
              onChange={e => setLinks(e.target.value)}
              placeholder="https://github.com/seu-usuario/seu-projeto"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="text" className={styles.label}>Descrição da Entrega</label>
            <textarea
              id="text"
              className={styles.textarea}
              value={text}
              onChange={e => setText(e.target.value)}
              rows={6}
              placeholder="Descreva o que foi feito, como testar e outras instruções importantes."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="files" className={styles.label}><FiPaperclip /> Anexos</label>
            <input
              id="files"
              type="file"
              multiple
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <div className={styles.fileList}>
                <p>Arquivos selecionados:</p>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Confirmar Entrega'}
          </button>
        </form>
      </div>
    </div>
  );
}
