import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './RegisterForm.module.css';
import { formatCpfCnpj, formatPhone, stripFormatting } from '../../utils/formatUtils';
import { FaUser, FaBuilding, FaIdCard, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import axios from 'axios';

const RegisterForm = ({ type }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    company: '',
    cpfCnpj: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    const cpfCnpjClean = stripFormatting(formData.cpfCnpj);
    const phoneClean = stripFormatting(formData.phone);

    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.username) newErrors.username = 'Username é obrigatório';
    if (type === 'contratante' && !formData.company) newErrors.company = 'Empresa é obrigatória';
    if (!cpfCnpjClean || (cpfCnpjClean.length !== 11 && cpfCnpjClean.length !== 14)) newErrors.cpfCnpj = 'CPF/CNPJ inválido';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!phoneClean || phoneClean.length < 10) newErrors.phone = 'Telefone inválido';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: formData.name,
      username: formData.username,
      cpf: stripFormatting(formData.cpfCnpj),
      email: formData.email,
      phone: stripFormatting(formData.phone),
      password: formData.password,
      role: type === 'freelancer' ? 'FREELANCER' : 'EMPLOYER',
      ...(type === 'contratante' ? { companyName: formData.company } : {})
    };

    try {
      await axios.post('/api/auth/register', payload);
      setSuccessMessage('Cadastro realizado com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar: ' + (err.response?.data || 'Erro inesperado.'));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

      <Input label="Nome" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <Input label="Username público" name="username" value={formData.username} onChange={handleChange} error={errors.username} />
      {type === 'contratante' && (
        <Input label="Nome da Empresa" name="company" value={formData.company} onChange={handleChange} error={errors.company} />
      )}
      <Input label="CPF ou CNPJ" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} error={errors.cpfCnpj} />
      <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <Input label="Telefone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
      <Input label="Senha" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
      <Button type="submit">Cadastrar</Button>
    </form>
  );
};

export default RegisterForm;
