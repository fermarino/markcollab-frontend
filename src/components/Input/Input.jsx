import styles from './Input.module.css';

const Input = ({ label, name, value, onChange, type = 'text', error, placeholder, maxLength }) => (
  <div className={styles.inputGroup}>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder || `Digite seu${label.toLowerCase().startsWith('s') ? 'a' : ''} ${label.toLowerCase()}`}
      className={error ? styles.inputError : ''}
      maxLength={maxLength}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default Input;
