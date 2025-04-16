import React from "react";
import { Link } from "react-router-dom";
import "./FazerProposta.css";

const FazerProposta = () => {
  return (
    <div className="fazerproposta-container">
      {/* Espaço reservado para Navbar */}

      <div className="fazerproposta-content">
        <Link to="/buscarprojetos" className="voltar">
          ← Voltar
        </Link>
        <h2 className="titulo">
          Enviar <span>proposta</span>
        </h2>

        <div className="campo">
          <label>Valor da proposta</label>
          <input type="text" placeholder="Insira aqui o valor de sua proposta" />
        </div>

        <div className="campo">
          <label>Descrição da proposta</label>
          <textarea placeholder="Insira aqui a descrição proposta detalhada"></textarea>
        </div>

        <div className="campo">
          <label>Data de entrega</label>
          <input type="date" />
        </div>

        <button className="btn-enviar">Enviar proposta</button>
      </div>

      {/* Espaço reservado para o rodapé */}
    </div>
  );
};

export default FazerProposta;
