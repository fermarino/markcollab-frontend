import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popupcancelar from "../../components/CancelProject/CancelProject";
import "./MyProjects1.css";

const projetosMock = [
  { id: 1, nome: "Nome_do_projeto", descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor si.", status: "Concluído", cor: "#28a745" },
  { id: 2, nome: "Nome_do_projeto", descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor si.", status: "Andamento", cor: "#ffc107" },
  { id: 3, nome: "Nome_do_projeto", descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor si.", status: "Analisar proposta", cor: "#dc3545" },
  { id: 4, nome: "Nome_do_projeto", descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor si.", status: "Concluído", cor: "#28a745" },
];

const MyProjects1 = () => {
  const [menuAberto, setMenuAberto] = useState(null);
  const [popupVisivel, setPopupVisivel] = useState(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const toggleMenu = (id) => {
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
     
      <div className="container">
        <h1 className="titulo">Meus projetos</h1>
        <button className="botao-criar"> + Criar novo projeto</button>
        <div className="projetos">
          {projetosMock.map((projeto) => (
            <div key={projeto.id} className="projeto-card">
              <div className="projeto-info">
                <h3>{projeto.nome}</h3>
                <p>{projeto.descricao}</p>
              </div>
              <div className="projeto-status" style={{ backgroundColor: projeto.cor }}>
                {projeto.status}
              </div>
              <div className="menu-container">
                <button className="menu-button" onClick={() => toggleMenu(projeto.id)}>⋮</button>
                {menuAberto === projeto.id && (
                  <div className="menu-opcoes">
                    <Link to={`/editar/${projeto.id}`} className="menu-item">Editar projeto</Link>
                    <button className="menu-item" onClick={() => abrirPopupCancelar(projeto.id)}>Cancelar projeto</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {popupVisivel && <Popupcancelar onClose={fecharPopupCancelar} onConfirm={confirmarCancelamento} />}
    </div>
  );
};

export default MyProjects1;