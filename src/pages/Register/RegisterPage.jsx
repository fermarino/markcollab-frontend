import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '../../components/navbar/Navbar';
import BackButton from '../../components/BackButton/BackButton';
import RegisterSelector from '../../components/RegisterSelector/RegisterSelector';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleBack = () => setSelectedType(null);

  const blueContent = {
    contratante: {
      title: 'Melhores freelancers para você',
      bullets: [
        'Publique sua vaga rapidamente',
        'Avalie candidatos em minutos',
        'Pague com segurança',
      ],
    },
    freelancer: {
      title: 'Oportunidades incríveis',
      bullets: [
        'Mostre seu portfólio',
        'Conecte-se com grandes empresas',
        'Receba pagamentos rápidos',
      ],
    },
  };

  const { title, bullets } = selectedType
    ? blueContent[selectedType]
    : { title: '', bullets: [] };

  if (isMobile) {
    return (
      <>
        <Navbar />
        {!selectedType ? (
          <div className={styles.mobileBlue}>
            <RegisterSelector onSelect={setSelectedType} />
          </div>
        ) : (
          <div className={styles.mobileForm}>
            <BackButton onClick={handleBack} />
            <RegisterForm type={selectedType} />
            <p className={styles.loginLink}>
              Já possui uma conta? <Link to="/login">Faça login</Link>
            </p>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.leftSide}>
            {selectedType ? (
              <>
                <BackButton onClick={handleBack} />
                <div className={styles.blueInner}>
                  <h2>{title}</h2>
                  <ul>
                    {bullets.map((txt, i) => (
                      <li key={i}>
                        <FaCheckCircle className={styles.checkIcon} />
                        {txt}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <RegisterSelector onSelect={setSelectedType} />
            )}
          </div>
          <div className={`${styles.rightSide} ${selectedType ? styles.fadeIn : ''}`}>
            {selectedType && (
              <>
                <RegisterForm type={selectedType} />
                <p className={styles.loginLink}>
                  Já possui uma conta? <Link to="/login">Faça login</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
