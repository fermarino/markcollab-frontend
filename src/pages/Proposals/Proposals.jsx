import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import styles from './Proposals.module.css';
import {
  FiArrowLeft, FiCheck, FiX, FiFileText, FiLoader, FiAlertCircle,
  FiUser, FiDollarSign, FiCalendar
} from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Proposals() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const employerCpf = user?.cpf;

  const [project, setProject] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    if (!projectId) {
      setError('ID do projeto não encontrado.');
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all([
      api.get(`projects/${projectId}`),
      api.get(`interests/project/${projectId}`)
    ])
      .then(([pRes, iRes]) => {
        setProject(pRes.data);
        setProposals(Array.isArray(iRes.data) ? iRes.data : []);
      })
      .catch(err => {
        console.error("Falha ao carregar dados:", err);
        setError('Falha ao carregar dados do projeto. ' + (err.response?.data?.message || err.message));
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleAccept = async (freelancerCpf) => {
    if (!projectId || !employerCpf || !project?.projectId) {
      addToast('error', 'Não foi possível iniciar o pagamento. Faltam informações do projeto ou do empregador.');
      return;
    }

    if (project.status !== 'Aberto') {
      addToast('warning', 'Este projeto não pode ser aceito no status atual. Apenas projetos "Abertos" podem ser aceitos.');
      return;
    }

    try {
      console.log(`Tentando contratar freelancer ${freelancerCpf} para projeto ${projectId} pelo empregador ${employerCpf}`);
      
      await api.post(`projects/${projectId}/hire/${freelancerCpf}/${employerCpf}`);
      addToast('success', 'Freelancer contratado! Redirecionando para o pagamento...');

      const response = await api.post(`payment/${project.projectId}/pay/${employerCpf}`);
      const initPointUrl = response.data;

      if (initPointUrl) {
        window.location.href = initPointUrl;
      } else {
        addToast('error', 'Não foi possível obter a URL de pagamento do Mercado Pago.');
      }

    } catch (err) {
      console.error("Erro ao aceitar proposta, contratar ou iniciar pagamento:", err);
      const errorMessage = err.response?.data?.message || 'Ocorreu um erro ao aceitar a proposta ou iniciar o pagamento.';
      addToast('error', errorMessage);
    }
  };

  const handleReject = async (interestId) => {
    try {
      await api.put(`interests/${interestId}/status`, 'Recusado', {
        headers: { 'Content-Type': 'text/plain' }
      });
      setProposals(ps => ps.map(p => p.id === interestId ? { ...p, status: 'Recusado' } : p));
      addToast('info', 'Proposta recusada.');
    } catch (err) {
      console.error("Erro ao recusar proposta:", err);
      addToast('error', 'Não foi possível recusar a proposta.');
    }
  };

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loadingState}><FiLoader className={styles.spinIcon} /> Carregando...</div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Link to="/contratante/meus-projetos" className={styles.btnBack}>
          <FiArrowLeft /> Voltar para Meus Projetos
        </Link>
        {error && <div className={styles.errorBanner}><FiAlertCircle /> {error}</div>}

        {project && <h1 className={styles.projectTitle}>Propostas para: "{project.projectTitle}"</h1>}

        {proposals.length > 0 ? (
          <div className={styles.proposalsGrid}>
            {proposals.map(p => (
              <div key={p.id} className={styles.proposalCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.freelancerName}>{p.freelancerName}</h3>
                  <span className={`${styles.statusBadge} ${styles[p.status.toLowerCase().replace(/\s+/g, '')]}`}>
                    {p.status}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.proposalMeta}>
                    <span><FiDollarSign /> {Number(p.proposalValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    <span><FiCalendar /> {new Date(p.deliveryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
                  </div>
                  <blockquote className={styles.proposalDescription}>
                    {p.proposalDescription}
                  </blockquote>
                </div>
                <div className={styles.cardActions}>
                  <Link to={`/perfis/${p.freelancerCpf}`} className={styles.btnProfile}>
                    <FiUser /> Ver Perfil
                  </Link>
                  {p.status.toLowerCase() === 'aguardando resposta' && (
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleReject(p.id)} className={styles.btnReject}>
                        <FiX /> Rejeitar
                      </button>
                      <button onClick={() => handleAccept(p.freelancerCpf)} className={styles.btnAccept}>
                        <FiCheck /> Aceitar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FiFileText className={styles.emptyStateIcon} />
            <h3>Nenhuma proposta recebida</h3>
            <p>Quando freelancers demonstrarem interesse, as propostas aparecerão aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
}