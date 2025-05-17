import React, { useState } from 'react';
import './Proposals.css';
import Navbar from '../../components/navbar/Navbar.jsx';
import { Link } from 'react-router-dom';

const Proposals = () => {
    const [deadline, setDeadline] = useState('');
   
    return (
         
        <div className="proposta-container"><Navbar />  
            <div className="proposta-content">
              
            <a href="/meusprojetos" className="back-link">&larr; Voltar</a>
                <div className="proposta-details">
                    <h3 className="proposta-project-title">Nome_do_projeto</h3>
                    <h4 className="proposta-section-title">Descrição do projeto</h4>
                    <p className="proposta-description-box">
                    Texto da proposta dele.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor si.
                    </p>
                    
                    <h4 className="proposta-section-title">Especificações do projeto</h4>
                    <p className="proposta-description-box">
                    Texto da proposta dele.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor si.
                    </p>
                    
                    <h4 className="proposta-section-title">Prazo de entrega</h4>
                    <p className="proposta-prazo">
                     17/05/2025
                    </p>
                    <h4 className="proposta-section-title">Preço</h4>
<p className="proposta-preco">
  R$ 1.500,00
</p>

                </div>

                <div className="proposta-proposals">
                    <h3 className="proposta-section-title">Propostas</h3>
                    {[1, 2].map((index) => (
                        <div key={index} className="proposta-box">
                            <h4 className="proposta-freelancer-name">Nome_do_freelancer</h4>
                            <p className='proposal-p'>Texto da proposta dele. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor si.</p>
                            <div className="proposta-buttons">
                                <button className="proposta-button proposta-accept">Aceitar proposta</button>
                                <button className="proposta-button proposta-reject">Recusar proposta</button>
                               <Link to="/perfilfreelancer" className="ver-propostas-btn">Ver perfil</Link>
                            </div>
                        </div>
                    ))}
                </div>  
            </div>
        
        </div>
    );
};

export default Proposals;