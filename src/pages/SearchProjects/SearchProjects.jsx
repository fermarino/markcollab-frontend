import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
// 1. USE O SERVIÇO 'api'
import api from "../../services/api";
import Pagination from "../../components/Pagination/Pagination.jsx";
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx';
import styles from "./SearchProjects.module.css";
import { FiXCircle } from "react-icons/fi";

export default function SearchProjects() {
  const [projetos, setProjetos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtrados, setFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  
  // O token é injetado automaticamente pelo 'api.js'

  useEffect(() => {
    // 2. USE 'api.get'
    api.get("projects/open")
    .then(({ data }) => {
      const abertos = data.filter(p => p.status === "Aberto");
      setProjetos(abertos);
      setFiltrados(abertos);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
      // Idealmente, tratar o erro de forma mais visual
    });
  }, []); // Removido o 'token' da dependência, pois não é mais necessário

  useEffect(() => {
    const txt = busca.toLowerCase();
    setCurrentPage(1);
    setFiltrados(projetos.filter(p =>
      p.projectTitle.toLowerCase().includes(txt) ||
      p.projectSpecifications.toLowerCase().includes(txt)
    ));
  }, [busca, projetos]);


  const totalPages = Math.ceil(filtrados.length / itemsPerPage);
  const paged = filtrados.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
      return (
          <div className={styles.pageWrapper}>
              <div className={styles.loadingState}>Buscando projetos...</div>
          </div>
      );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Encontre o Projeto Perfeito</h1>
          <p className={styles.subtitle}>Explore dezenas de oportunidades e dê o próximo passo na sua carreira.</p>
        </div>

        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon}/>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Pesquise por título, tecnologia, área..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {paged.length > 0 ? (
          <>
            <div className={styles.cardsGrid}>
              {paged.map(proj => (
                <ProjectCard
                  key={proj.projectId}
                  project={proj}
                  showDetailsButton={true}
                  showSendProposal={true}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.paginationWrapper}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <FiXCircle className={styles.emptyStateIcon} />
            <h3>Nenhum projeto encontrado</h3>
            <p>Não encontramos nenhum projeto com os termos da sua busca. Tente outras palavras-chave.</p>
          </div>
        )}
      </div>
    </div>
  );
}
