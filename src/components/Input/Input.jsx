import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label, name, value, onChange,
  type = 'text', error, placeholder,
  maxLength, icon: Icon, onIconClick
}) => (
  <div className={styles.inputGroup}>
    <label htmlFor={name}>{label}</label>
    <div className={`${styles.inputWrapper} ${error ? styles.inputError : ''}`}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {Icon && (
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onIconClick}
        >
          <Icon />
        </button>
      )}
    </div>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default Input;
