import styles from "./RegisterSelector.module.css";
import { ArrowLeft } from "lucide-react"; // ou use emoji: ←

const RegisterSelector = ({ onSelect }) => {
  return (
    <div className={styles.container}>


      <div className={styles.content}>
        <h2>Vamos criar seu cadastro!</h2>
        <p>Primeiro, escolha como deseja acessar a nossa plataforma:</p>

        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => onSelect("contratante")}>
            Sou contratante
          </button>
          <button className={styles.button} onClick={() => onSelect("freelancer")}>
            Sou freelancer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSelector;
