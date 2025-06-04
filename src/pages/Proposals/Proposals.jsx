import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar.jsx';
import './Proposals.css';

const Proposals = () => {
  const [project, setProject] = useState(null);
  const [proposals, setProposals] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Token gerado no login
  const token = localStorage.getItem('token');
  // CPF do employer (armazenado no login)
  const employerCpf = localStorage.getItem('cpf');

  // 1) Carrega dados do projeto (título, descrição, etc.)
  useEffect(() => {
    if (!projectId || !token) return;
    axios
      .get(`http://localhost:8080/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setProject(res.data))
      .catch(err => console.error('Erro ao carregar projeto:', err));
  }, [projectId, token]);

  // 2) Carrega as propostas daquele projeto
  useEffect(() => {
    if (!projectId || !token) return;
    axios
      .get(`http://localhost:8080/api/interests/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        console.log('RESPOSTA /api/interests/project:', res.data);
        setProposals(res.data);
      })
      .catch(err => console.error('Erro ao carregar propostas:', err));
  }, [projectId, token]);

  // 3) Aceitar proposta → POST /api/projects/{projectId}/hire/{freelancerCpf}/{employerCpf}
  const aceitarProposta = (freelancerCpf) => {
    if (!freelancerCpf) {
      alert('CPF do freelancer indefinido');
      return;
    }
    if (!employerCpf) {
      alert('CPF do empregador não encontrado. Faça login novamente.');
      return;
    }

    axios
      .post(
        `http://localhost:8080/api/projects/${projectId}/hire/${freelancerCpf}/${employerCpf}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert('Proposta aceita! Projeto movido para "Em andamento".');
        // Redireciona para a lista de projetos do empregador
        navigate('/meusprojetos');
      })
      .catch(err => {
        console.error('Erro ao aceitar proposta:', err);
        // Exibe, quando possível, a mensagem retornada pelo backend
        const mensagem = err.response?.data || err.message;
        alert(`Erro ao aceitar proposta: ${mensagem}`);
      });
  };

  // 4) Recusar proposta → PUT /api/interests/{interestId}/status
  const rejeitarProposta = (interestId) => {
    if (!interestId) {
      alert('ID da proposta indefinido');
      return;
    }
    axios
      .put(
        `http://localhost:8080/api/interests/${interestId}/status`,
        "Recusado",
        {
          headers: {
            'Content-Type': 'text/plain',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Atualiza localmente o status para “Recusado”, sem recarregar tudo
        setProposals(prev =>
          prev.map(p =>
            p.id === interestId
              ? { ...p, status: "Recusado" }
              : p
          )
        );
      })
      .catch(err => {
        console.error('Erro ao recusar proposta:', err);
        const mensagem = err.response?.data || err.message;
        alert(`Erro ao recusar proposta: ${mensagem}`);
      });
  };

  if (!project) return <div>Carregando...</div>;

  return (
    <div className="proposta-container">
      <Navbar />

      <div className="proposta-content">
        <Link to="/meusprojetos" className="back-link">&larr; Voltar</Link>

        <div className="proposta-details">
          <h2 className="proposta-project-title">{project.projectTitle}</h2>
          <p><strong>Descrição:</strong> {project.projectDescription}</p>
          <p><strong>Especificações:</strong> {project.projectSpecifications}</p>
          <p><strong>Prazo:</strong> {project.deadline}</p>
          <p>
            <strong>Preço:</strong> R$ {project.projectPrice?.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="proposta-proposals">
          <h3 className="proposta-section-title">Propostas Recebidas</h3>

          {proposals.length === 0 ? (
            <div className="no-proposals-msg">
              <p>Nenhuma proposta recebida ainda.</p>
            </div>
          ) : (
            <div className="cards-wrapper">
              {proposals.map((p) => (
                <div key={p.id} className="card-proposta">
                  {/* Exibe nome do freelancer ou “— Sem nome —” se estiver ausente */}
                  <h4 className="proposta-freelancer-name">
                    {p.freelancerName || "— Sem nome —"}
                  </h4>

                  <p><strong>Descrição:</strong> {p.proposalDescription}</p>
                  <p><strong>Valor:</strong> R$ {p.proposalValue}</p>
                  <p><strong>Entrega:</strong> {p.deliveryDate}</p>
                  <p><strong>Status:</strong> {p.status}</p>

                  <div className="proposta-buttons">
                    <button
                      className="proposta-button proposta-accept"
                      onClick={() => aceitarProposta(p.freelancerCpf)}
                      disabled={p.status !== "Aguardando resposta"}
                    >
                      Aceitar
                    </button>

                    <button
                      className="proposta-button proposta-reject"
                      onClick={() => rejeitarProposta(p.id)}
                      disabled={p.status !== "Aguardando resposta"}
                    >
                      Recusar
                    </button>

                    {/* Link para visualizar perfil de freelancer */}
                    <Link
                      to={`/perfilfreelancer/${p.freelancerCpf}`}
                      className="ver-perfil-btn"
                    >
                      Ver perfil
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proposals;
