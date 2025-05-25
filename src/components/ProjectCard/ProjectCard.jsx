import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

export default function ProjectCard({
  project,
  showDropdown = false,
  showViewProposals = false,
  showSendProposal = false,
  hideStatus = false,
  onEdit,
  onCancel,
  onSendProposal
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const {
    id,
    projectTitle,
    projectDescription,
    projectSpecifications,
    deadline,
    projectPrice,
    status
  } = project;

  const statusColor =
    status === 'Concluído'     ? '#28a745' :
    status === 'Em andamento'  ? '#ffc107' :
                                '#2C65F6';

  return (
    <div className={styles.card} ref={ref}>
      {showDropdown && (
        <button
          className={styles.btnMenu}
          onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
          aria-label="Menu"
          type="button"
        >
          ⋮
        </button>
      )}
      {menuOpen && (
        <div className={styles.dropdown} onClick={e => e.stopPropagation()}>
          {onEdit && (
            <button
              className={`${styles.btn} ${styles.secondary} ${styles.btnMedium}`}
              onClick={() => onEdit(id)}
              type="button"
            >
              Editar
            </button>
          )}
          {onCancel && (
            <button
              className={`${styles.btn} ${styles.danger} ${styles.btnMedium}`}
              onClick={() => onCancel(id)}
              type="button"
            >
              Cancelar
            </button>
          )}
        </div>
      )}

      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{projectTitle}</h2>

        <p className={styles.inline}>
          <span className={styles.cardLabel}>Especificações:</span>
          <span className={styles.cardText}>{projectSpecifications}</span>
        </p>

        <p className={styles.inline}>
          <span className={styles.cardLabel}>Descrição:</span>
          <span className={styles.cardText}>{projectDescription}</span>
        </p>

        <p className={styles.cardInfo}>
          <strong>Prazo:</strong>{' '}
          {new Date(deadline).toLocaleDateString()}
        </p>
        <p className={styles.cardInfo}>
          <strong>Preço:</strong>{' '}
          {projectPrice?.toLocaleString('pt-BR', {
            style: 'currency', currency: 'BRL'
          })}
        </p>
      </div>

      <div
        className={`${styles.cardFooter} ${
          hideStatus ? styles.footerEnd : ''
        }`}
      >
        {!hideStatus && (
          <span
            className={styles.statusBadge}
            style={{ backgroundColor: statusColor }}
          >
            {status}
          </span>
        )}

        {showViewProposals && (
          <Link to={`/propostas/${id}`} className={styles.btnOutlined}>
            Ver propostas
          </Link>
        )}
        {showSendProposal && (
          <button
            className={styles.btnOutlined}
            onClick={() => onSendProposal(id)}
            type="button"
          >
            Fazer proposta
          </button>
        )}
      </div>
    </div>
  );
}
