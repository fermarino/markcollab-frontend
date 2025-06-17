import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom'; // <-- IMPORTANTE: useSearchParams
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { FiCheckCircle, FiLoader, FiAlertCircle } from 'react-icons/fi';
import styles from './PaymentStatus.module.css';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  // Não use 'user' e 'employerCpf' do AuthContext diretamente para os IDs de contratação aqui,
  // pois o AuthContext pode não estar totalmente inicializado no redirecionamento.
  // Os IDs virão da URL.
  const { addToast } = useToast();

  const [statusMessage, setStatusMessage] = useState('Confirmando pagamento...');
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams(); // <-- Use este hook para ler os parâmetros da URL

  useEffect(() => {
    // Pegar os IDs da URL via external_reference
    const collectionStatus = searchParams.get('collection_status');
    const paymentId = searchParams.get('payment_id');
    const externalReferenceJson = searchParams.get('external_reference');

    // Validação de status de pagamento do MP e presença do external_reference
    if (collectionStatus !== 'approved' || !externalReferenceJson) {
        setStatusMessage('Erro: Pagamento não aprovado ou informações ausentes.');
        setError(true);
        setIsProcessing(false);
        addToast('error', 'Pagamento não confirmado ou dados incompletos.');
        return;
    }

    let parsedExternalReference;
    try {
        // Parseia o JSON contido no external_reference
        parsedExternalReference = JSON.parse(externalReferenceJson);
    } catch (e) {
        console.error("ERRO: Falha ao parsear external_reference JSON:", e);
        setStatusMessage('Erro: Dados de contratação inválidos.');
        setError(true);
        setIsProcessing(false);
        addToast('error', 'Dados de contratação corrompidos.');
        return;
    }

    // Extrai os IDs do objeto JSON parseado
    const { projectId, freelancerCpf, employerCpf, projectPrice } = parsedExternalReference; 

    // Validação final da presença dos IDs
    if (!projectId || !freelancerCpf || !employerCpf) {
      setStatusMessage('Erro: Informações de projeto ou contratação ausentes na URL. Não foi possível finalizar a contratação.');
      setError(true);
      setIsProcessing(false);
      addToast('error', 'Erro ao finalizar a contratação: IDs ausentes na URL.');
      return;
    }

    // --- CHAMADA PARA O BACKEND PARA CONFIRMAR A CONTRATAÇÃO ---
    // Agora employerCpf e freelancerCpf vêm da URL (via external_reference).
    api.post(`/projects/${projectId}/hire/${freelancerCpf}/${employerCpf}`)
      .then(res => {
        setStatusMessage('Pagamento APROVADO! Projeto contratado com sucesso!');
        setIsProcessing(false);
        setError(false);
        addToast('success', 'Contratação realizada!');
        setTimeout(() => {
          navigate('/contratante/meus-projetos');
        }, 3000);
      })
      .catch(err => {
        console.error("DEBUG: Erro ao confirmar contratação no backend:", err);
        setStatusMessage(`Pagamento APROVADO, mas houve um erro ao finalizar a contratação. Contate o suporte. Detalhe: ${err.response?.data?.message || err.message}`);
        setError(true);
        setIsProcessing(false);
        addToast('error', 'Erro na confirmação da contratação.');
      });
  }, [searchParams, navigate, addToast]); // Dependências do useEffect

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {isProcessing ? (
          <div className={styles.processingState}>
            <FiLoader className={styles.spinIcon} />
            <p>{statusMessage}</p>
          </div>
        ) : (
          <div className={`${styles.statusDisplay} ${error ? styles.error : styles.success}`}>
            {error ? <FiAlertCircle className={styles.icon} /> : <FiCheckCircle className={styles.icon} />}
            <h2 className={styles.message}>{statusMessage}</h2>
            {!error && <p>Você será redirecionado em breve.</p>}
            <Link to="/contratante/meus-projetos" className={styles.btnBackToProjects}>Voltar para Meus Projetos</Link>
          </div>
        )}
      </div>
    </div>
  );
}