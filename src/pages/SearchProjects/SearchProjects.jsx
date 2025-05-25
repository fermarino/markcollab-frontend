import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Navbar from '../../components/navbar/Navbar.jsx';
import Pagination from "../../components/Pagination/Pagination.jsx";
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx';
import styles from "./SearchProjects.module.css";

export default function SearchProjects() {
  const [projetos, setProjetos]   = useState([]);
  const [busca, setBusca]         = useState("");
  const [filtrados, setFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const token        = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:8080/api/projects/open", token && {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(({ data }) => {
      const abertos = data.filter(p => p.status === "Aberto");
      setProjetos(abertos);
      setFiltrados(abertos);
    })
    .catch(() => alert("Erro ao carregar os projetos."));
  }, [token]);

  const handleBuscaChange = e => {
    const txt = e.target.value.toLowerCase();
    setBusca(txt);
    setCurrentPage(1);
    setFiltrados(projetos.filter(p =>
      p.projectTitle.toLowerCase().includes(txt) ||
      p.projectSpecifications.toLowerCase().includes(txt)
    ));
  };

  const totalPages = Math.ceil(filtrados.length / itemsPerPage);
  const start      = (currentPage - 1) * itemsPerPage;
  const paged      = filtrados.slice(start, start + itemsPerPage);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Buscar projetos</h1>
          <p className={styles.subtitle}>Encontre os melhores projetos para você</p>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Pesquise por título, área..."
            value={busca}
            onChange={handleBuscaChange}
          />
          <button className={styles.searchButton}><FaSearch /></button>
        </div>

        {paged.length > 0 ? (
          <>
            <div className={styles.cards}>
              {paged.map(proj => (
                <ProjectCard
                  key={proj.projectId}
                  project={{
                    id: proj.projectId,
                    projectTitle: proj.projectTitle,
                    projectDescription: proj.projectDescription,
                    projectSpecifications: proj.projectSpecifications,
                    deadline: proj.deadline,
                    projectPrice: proj.projectPrice,
                    status: proj.status
                  }}
                  showSendProposal
                  hideStatus
                  onSendProposal={id => window.location = `/fazerproposta/${id}`}
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
    </>
  );
}
