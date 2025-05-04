import { useState, useEffect } from 'react';
import RegisterSelector from '../../components/RegisterSelector/RegisterSelector';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import BackButton from '../../components/BackButton/BackButton';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 950);

  const handleBack = () => {
    setSelectedType(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 950);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        {selectedType ? (
          <>
            <div className={styles.mobileBackButton}>
              <BackButton onClick={handleBack} />
            </div>
            <RegisterForm type={selectedType} />
          </>
        ) : (
          <RegisterSelector selectedType={selectedType} onSelect={setSelectedType} onBack={handleBack} />
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        {selectedType ? (
          <div className={styles.desktopBackButton}>
            <BackButton onClick={handleBack} />
          </div>
        ) : (
          <RegisterSelector selectedType={selectedType} onSelect={setSelectedType} onBack={handleBack} />
        )}
      </div>
      <div className={styles.rightSide}>
        {selectedType && <RegisterForm type={selectedType} />}
      </div>
    </div>
  );
};

export default RegisterPage;
