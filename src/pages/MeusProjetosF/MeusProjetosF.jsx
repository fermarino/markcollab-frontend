import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popupcancelar from "../../components/CancelProject/CancelProject.jsx";
import "./MeusprojetosF.css";
import Navbar from '../../components/navbar/Navbar.jsx';
import axios from "axios";

const MeusprojetosF = () => {
  const [projetos, setProjetos] = useState([]);
  const [menuAberto, setMenuAberto] = useState(null);
  const [popupVisivel, setPopupVisivel] = useState(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const cpf = localStorage.getItem("cpf");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!cpf || !token) {
      alert("CPF ou token não encontrados. Faça login novamente.");
      return;
    }

    const fetchProjetos = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/employer/${cpf}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjetos(response.data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        alert("Erro ao carregar os projetos.");
      }
    };

    fetchProjetos();
  }, [cpf, token]);

  const toggleMenu = (id) => {
    // Se o menu do projeto for aberto, fechamos ele. Caso contrário, abrimos.
    setMenuAberto(menuAberto === id ? null : id);
  };

  const abrirPopupCancelar = (projetoId) => {
    setProjetoSelecionado(projetoId);
    setPopupVisivel(true);
  };

  const fecharPopupCancelar = () => {
    setPopupVisivel(false);
    setProjetoSelecionado(null);
  };

  const confirmarCancelamento = () => {
    console.log(`Projeto ${projetoSelecionado} cancelado.`);
    fecharPopupCancelar();
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="titulo">Meus projetos</h1>
          <Link to="/buscarprojetos" className="botao-criar">Bucar projetos</Link>
        <div className="projetos">
          {projetos.map((projeto) => (
            <div key={projeto.id} className="projeto-card">
              <div className="projeto-info">
                <h3>{projeto.projectTitle}</h3>
                <p>{projeto.projectDescription}</p>
              </div>
              <div className="projetos-status" style={{ backgroundColor: projeto.status === "Concluído" ? "#28a745" : projeto.status === "Em andamento" ? "#ffc107" : "#dc3545" }}>
                {projeto.status}
              </div>
           
            </div>
          ))}
        </div>
      </div>

      {popupVisivel && <Popupcancelar onClose={fecharPopupCancelar} onConfirm={confirmarCancelamento} />}
    </div>
  );
};

export default MeusprojetosF;
