import React from "react";
import { Link } from "react-router-dom";
import "./MeusProjetosF.css";

const MeusProjetosF = () => {
    const projetos = [
        {
            id: 1,
            nome: "Nome_do_projeto",
            descricao:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            status: "Concluído",
            cor: "#28a745",
        },
        {
            id: 2,
            nome: "Nome_do_projeto",
            descricao:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            status: "Andamento",
            cor: "#ffc107",
        },
        {
            id: 3,
            nome: "Nome_do_projeto",
            descricao:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            status: "Analisar proposta",
            cor: "#dc3545",
        },
    ];

    return (
        <div className="meusprojetos-container">
            <div className="meusprojetos-content">
                <Link to="/buscarprojetos" className="voltar">
                    ← Voltar
                </Link>
                <h1 className="titulo">Meus projetos</h1>

                <div className="projetos">
                    {projetos.map((projeto) => (
                        <div key={projeto.id} className="projeto-card">
                            <div className="projeto-info">
                                <h3>{projeto.nome}</h3>
                                <p>{projeto.descricao}</p>
                            </div>
                            <div
                                className="projeto-status"
                                style={{ backgroundColor: projeto.cor }}
                            >
                                {projeto.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MeusProjetosF;
