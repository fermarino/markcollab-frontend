// src/pages/MyProjectsEmployer/MyProjectsEmployer.jsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Popupcancelar from '../../components/CancelProject/CancelProject.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx';
import styles from './MyProjectsEmployer.module.css';

export default function MyProjectsEmployer() {
  const [projetos, setProjetos] = useState([]);
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [popupVisivel, setPopupVisivel] = useState(false);
  const [selId, setSelId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const cpf = localStorage.getItem('cpf');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // 1) Carrega TODOS os projetos do empregador (área “Empregador”)
  useEffect(() => {
    if (!cpf || !token) return;

    axios
      .get(`https://markcollab-backend.onrender.com/api/projects/employer/${cpf}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        console.log('Projetos recebidos do backend:', data);
        setProjetos(data || []);
      })
      .catch((err) => {
        console.error('Erro ao carregar projetos:', err);
        alert('Erro ao carregar projetos.');
        setProjetos([]);
      });
  }, [cpf, token]);

  // Função para normalizar string de status
  const normalize = (str) => (str || '').trim().toLowerCase();

  // 2) Filtra localmente pelo status selecionado
  const listaFiltrada =
    filterStatus === 'Todos'
      ? projetos
      : projetos.filter(
          (p) => normalize(p.status) === normalize(filterStatus)
        );

  console.log(
    'FilterStatus:', filterStatus,
    '| Projetos filtrados:',
    JSON.stringify(listaFiltrada)
  );

  // 3) Paginação local: exibe apenas 3 itens por página
  const totalPages = Math.ceil(listaFiltrada.length / itemsPerPage);
  const paged = listaFiltrada.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (id) => navigate(`/editarprojeto/${id}`);

  const handleCancel = (id) => {
    setSelId(id);
    setPopupVisivel(true);
  };

  const confirmCancel = () => {
    axios
      .delete(`https://markcollab-backend.onrender.com/api/projects/${selId}/${cpf}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setProjetos((prev) => prev.filter((x) => x.projectId !== selId));
        setPopupVisivel(false);
      })
      .catch((err) => {
        console.error('Erro ao cancelar projeto:', err);
        alert('Erro ao cancelar projeto.');
        setPopupVisivel(false);
      });
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Meus Projetos</h1>
          <div className={styles.headerActions}>
            <select
              className={styles.selectStatus}
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>Todos</option>
              <option>Aberto</option>
              <option>Em andamento</option>
              <option>Concluído</option>
            </select>
            <Link
              to="/publicar"
              className={`${styles.btn} ${styles.primary} ${styles.btnPublish}`}
            >
              Publicar Projeto
            </Link>
          </div>
        </div>

        {listaFiltrada.length === 0 ? (
          filterStatus === 'Todos' ? (
            <p className={styles.noProjects}>Nenhum projeto encontrado.</p>
          ) : (
            <p className={styles.noProjects}>
              Você não tem projetos <strong>"{filterStatus}"</strong>.
            </p>
          )
        ) : (
          <>
            <div className={styles.cards}>
              {paged.map((p) => (
                <ProjectCard
                  key={p.projectId}
                  project={p}
                  showDropdown
                  showViewProposals={normalize(p.status) === normalize('Aberto')}
                  onEdit={handleEdit}
                  onCancel={handleCancel}
                />
              ))}
            </div>
            <div className={styles.paginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>

      {popupVisivel && (
        <Popupcancelar
          onClose={() => setPopupVisivel(false)}
          onConfirm={confirmCancel}
        />
      )}
    </div>
  );
}
