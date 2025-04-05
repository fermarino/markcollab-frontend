import styles from './Input.module.css';

const Input = ({ label, name, value, onChange, type = 'text', error, placeholder, maxLength, icon: Icon }) => (
  <div className={styles.inputGroup}>
    <label htmlFor={name}>{label}</label>
    
    <div className={`${styles.inputWrapper} ${error ? styles.inputError : ''}`}>
      {Icon && <span className={styles.icon}><Icon /></span>}
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>

    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default Input;
