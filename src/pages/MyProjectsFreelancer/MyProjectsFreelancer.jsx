// src/pages/MyProjectsFreelancer/MyProjectsFreelancer.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axios from "axios";
import "./MyProjectsFreelancer.css";

const MyProjectsFreelancer = () => {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cpf = localStorage.getItem("cpf");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!cpf || !token) {
      alert("CPF ou token não encontrados. Faça login novamente.");
      setLoading(false);
      return;
    }

    // Chama o endpoint /api/projects/freelancer/{cpf}
    axios
      .get(`http://localhost:8080/api/projects/freelancer/${cpf}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        console.log("Projetos contratados para freelancer:", data);
        setProjetos(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar projetos contratados (Freelancer):", error);
        alert("Erro ao carregar os projetos.");
        setLoading(false);
      });
  }, [cpf, token]);

  if (loading) {
    return (
      <div className="pageWrapper">
        <Navbar />
        <div className="loading">Carregando seus projetos contratados...</div>
      </div>
    );
  }

  return (
    <div className="pageWrapper">
      <Navbar />
      <div className="container">
        <div className="header">
          <h1 className="title">Meus Projetos (Freelancer)</h1>
          <Link to="/buscarprojetos" className="btn primary btnBuscar">
            Buscar Projetos
          </Link>
        </div>

        {projetos.length > 0 ? (
          <div className="cards">
            {projetos.map((projeto) => (
              <div key={projeto.projectId} className="projeto-card">
                <div className="projeto-info">
                  <h3>{projeto.projectTitle}</h3>
                  <p>{projeto.projectDescription}</p>
                  <p>
                    <strong>Prazo:</strong>{" "}
                    {projeto.deadline
                      ? new Date(projeto.deadline).toLocaleDateString()
                      : "-"}
                  </p>
                  <p>
                    <strong>Preço:</strong>{" "}
                    R${" "}
                    {typeof projeto.projectPrice === "number"
                      ? projeto.projectPrice.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })
                      : projeto.projectPrice}
                  </p>
                </div>
                <div
                  className="projetos-status"
                  style={{
                    backgroundColor:
                      projeto.status === "Concluído"
                        ? "#28a745"
                        : projeto.status === "Em andamento"
                        ? "#ffc107"
                        : "#dc3545",
                  }}
                >
                  {projeto.status}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="noProjects">Você ainda não foi contratado em nenhum projeto.</p>
        )}
      </div>
    </div>
  );
};

export default MyProjectsFreelancer;
