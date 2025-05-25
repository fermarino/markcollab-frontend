import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar.jsx';
import Popupcancelar from '../../components/CancelProject/CancelProject.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx';
import styles from './MyProjectsEmployer.module.css';

export default function MyProjectsEmployer() {
  const [projetos, setProjetos]         = useState([]);
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [popupVisivel, setPopupVisivel] = useState(false);
  const [selId, setSelId]               = useState(null);
  const [currentPage, setCurrentPage]   = useState(1);
  const itemsPerPage                    = 3;
  const cpf   = localStorage.getItem('cpf');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (cpf && token) {
      axios.get(`http://localhost:8080/api/projects/employer/${cpf}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(({ data }) => setProjetos(data))
      .catch(() => alert('Erro ao carregar projetos.'));
    }
  }, [cpf, token]);

  const listaFiltrada = filterStatus === 'Todos'
    ? projetos
    : projetos.filter(p => p.status === filterStatus);

  const totalPages = Math.ceil(listaFiltrada.length / itemsPerPage);
  const paged = listaFiltrada.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit   = id => navigate(`/editarprojeto/${id}`);
  const handleCancel = id => { setSelId(id); setPopupVisivel(true); };

  const confirmCancel = () => {
    axios.delete(`http://localhost:8080/api/projects/${selId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setProjetos(prev => prev.filter(x => x.id !== selId)))
    .catch(() => alert('Erro ao cancelar projeto.'));
    setPopupVisivel(false);
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
              onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
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

        {paged.length > 0 ? (
          <>
            <div className={styles.cards}>
              {paged.map(p => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  showDropdown
                  showViewProposals={p.status === 'Aberto'}
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
        ) : (
          <p className={styles.noProjects}>Nenhum projeto encontrado.</p>
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
