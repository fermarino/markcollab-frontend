import { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './RegisterForm.module.css';
import { formatCpfCnpj, formatPhone, stripFormatting } from '../../utils/formatUtils';
import { Link } from 'react-router-dom';

const RegisterForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    cpfCnpj: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const cpfCnpjClean = stripFormatting(formData.cpfCnpj);
    const phoneClean = stripFormatting(formData.phone);

    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (type === 'contratante' && !formData.company) newErrors.company = 'Nome da empresa é obrigatório';
    if (!cpfCnpjClean || (cpfCnpjClean.length !== 11 && cpfCnpjClean.length !== 14))
      newErrors.cpfCnpj = 'CPF ou CNPJ inválido';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido';
    if (!phoneClean || phoneClean.length < 10) newErrors.phone = 'Telefone inválido';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'cpfCnpj') newValue = formatCpfCnpj(value);
    if (name === 'phone') newValue = formatPhone(value);

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        ...formData,
        cpfCnpj: stripFormatting(formData.cpfCnpj),
        phone: stripFormatting(formData.phone),
      };

      console.log('Enviando para o back:', payload);
      alert('Cadastro realizado com sucesso!');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Nome"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      {type === 'contratante' && (
        <Input
          label="Nome da Empresa"
          name="company"
          value={formData.company}
          onChange={handleChange}
          error={errors.company}
        />
      )}

      <Input
        label="CPF ou CNPJ"
        name="cpfCnpj"
        value={formData.cpfCnpj}
        onChange={handleChange}
        error={errors.cpfCnpj}
        maxLength={18}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label="Telefone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        maxLength={15}
      />

      <Input
        label="Senha"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Digite sua senha"
      />

      <div className={styles.actions}>
        <Button type="submit">Cadastrar</Button>
      </div>

      <div className={styles.loginMessage}>
        Já possui uma conta? <Link to="/login">Faça o login</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
