import React from "react";
import "./BuscarProjetos.css";
import { FaSearch } from "react-icons/fa";

function BuscarProjetos() {
  return (
    <div className="buscar-container">
      {/* Navbar será adicionada aqui */}
      <br />
      <br />
      <br />

      <div className="buscar-header">
        <h1 className="buscar-titulo">Buscar projetos</h1>
        <p className="buscar-subtitulo">Encontre os melhores projetos para você</p>
      </div>

      <div className="buscar-input-container">
        <input
          type="text"
          className="buscar-input"
          placeholder="Pesquise por nome, área..."
        />
        <button className="buscar-botao">
          <FaSearch />
        </button>
      </div>

      <div className="projetos-lista">
        {[1, 2, 3, 4].map((item, index) => (
          <div key={index} className="projeto-card">
            <h2 className="projeto-nome">Nome_do_projeto</h2>
            <p className="projeto-descricao">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="projeto-botao">Enviar proposta</button>
          </div>
        ))}
      </div>

      {/* Rodapé será adicionado aqui */}
    </div>
  );
}

export default BuscarProjetos;
