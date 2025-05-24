import React, { useState, useEffect } from "react";
import "./BuscarProjetos.css";
import { FaSearch } from "react-icons/fa";
import Navbar from '../../components/navbar/Navbar.jsx';
import { Link } from "react-router-dom";
import axios from "axios";

function BuscarProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [busca, setBusca] = useState("");
  const [projetosFiltrados, setProjetosFiltrados] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchProjetos = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {}; // Não envia Authorization se não tiver token

      const response = await axios.get("http://localhost:8080/api/projects/open", config);
      setProjetos(response.data);
      setProjetosFiltrados(response.data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      alert("Erro ao carregar os projetos.");
    }
  };

  fetchProjetos();
}, []);

  const handleBuscaChange = (e) => {
    const texto = e.target.value.toLowerCase();
    setBusca(texto);

    const filtrados = projetos.filter((proj) =>
      proj.projectTitle.toLowerCase().includes(texto) ||
      proj.projectSpecifications.toLowerCase().includes(texto)
    );

    setProjetosFiltrados(filtrados);
  };

  return (
    <>
      <Navbar />
      <div className="buscar-container">
        <br /><br /><br />
        <div className="buscar-header">
          <h1 className="buscar-titulo">Buscar projetos</h1>
          <p className="buscar-subtitulo">Encontre os melhores projetos para você</p>
        </div>

        <div className="buscar-input-container">
          <input
            type="text"
            className="buscar-input"
            placeholder="Pesquise por nome, área..."
            value={busca}
            onChange={handleBuscaChange}
          />
          <button className="buscar-botao">
            <FaSearch />
          </button>
        </div>

        <div className="projetos-lista">
          {projetosFiltrados.length > 0 ? (
            projetosFiltrados.map((proj) => (
              <div key={proj.projectId} className="projeto-card">
                <h2 className="projeto-nome">{proj.projectTitle}</h2>
                <p className="projeto-descricao">{proj.projectDescription}</p>
                <div className="botoes-projeto">
                  <Link to={`/fazerproposta/${proj.projectId}`} className="ver-propostas-btn">Enviar proposta</Link>
                  <Link to="/perfilfreelancer" className="ver-propostas-btn">Ver perfil</Link>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum projeto encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BuscarProjetos;