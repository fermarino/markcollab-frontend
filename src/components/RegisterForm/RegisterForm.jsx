import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../Input/Input';
import Button from '../Button/Button';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import useRegisterValidation from '../../hooks/useRegisterValidation';
import { formatCpfCnpj, stripFormatting } from '../../utils/formatUtils';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './RegisterForm.module.css';

const API_BASE = 'http://localhost:8080/api/auth/register';

export default function RegisterForm({ type }) {
  const validate = useRegisterValidation(type);
  const [formData, setFormData]         = useState({
    name:'', username:'', company:'', cpfCnpj:'', email:'', password:''
  });
  const [clientErrors, setClientErrors] = useState({});
  const [serverError, setServerError]   = useState(null);
  const [submitting, setSubmitting]     = useState(false);
  const [success, setSuccess]           = useState(false);
  const [showPwd, setShowPwd]           = useState(false);

  const handleChange = ({ target:{name,value} }) => {
    if (name==='cpfCnpj') {
      const digits = stripFormatting(value).slice(0,14);
      setFormData(fd => ({ ...fd, cpfCnpj: formatCpfCnpj(digits) }));
    } else {
      setFormData(fd => ({ ...fd, [name]: value }));
    }
    setClientErrors(ce => ({ ...ce, [name]: '' }));
    setServerError(null);
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setServerError(null);

    const frontErr = validate(formData);
    if (Object.keys(frontErr).length) {
      setClientErrors(frontErr);
      return;
    }

    setSubmitting(true);
    setClientErrors({});

    const payload = {
      name:     formData.name.trim(),
      username: formData.username.trim(),
      cpf:      stripFormatting(formData.cpfCnpj),
      email:    formData.email.trim(),
      password: formData.password,
      role:     type==='freelancer' ? 'FREELANCER' : 'EMPLOYER',
      ...(type==='contratante' && { companyName: formData.company.trim() })
    };

    try {
      await axios.post(API_BASE, payload);
      setSuccess(true);
    } catch (err) {
      const resp = err.response;
      let msg = 'Não foi possível conectar ao servidor.';
      if (resp?.data) {
        if (resp.data.message) msg = resp.data.message;
        else if (typeof resp.data === 'string') msg = resp.data;
      }
      if (resp?.status === 400) {
        if (msg.includes('username:') || msg.includes('cpf:') || msg.includes('email:')) {
          const top = msg.split(';').map(p=>p.split(':')[1].trim()).join('; ');
          setServerError(top);
        } else {
          const fe = {};
          msg.split(';').forEach(pair=>{
            const [f,m] = pair.split(':').map(s=>s.trim());
            if (['name','username','company','cpf','email','password'].includes(f)) {
              fe[f==='cpf'?'cpfCnpj':f] = m;
            }
          });
          setClientErrors(fe);
        }
      } else {
        setServerError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <SuccessMessage
        title="Conta criada com sucesso!"
        text="Sua conta foi criada."
        linkText="Clique aqui para entrar."
        linkTo="/login"
      />
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className={styles.serverError}>{serverError}</div>
      )}

      <Input
        label="Nome Completo"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={clientErrors.name}
      />

      <Input
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={clientErrors.username}
      />

      {type==='contratante' && (
        <Input
          label="Nome da Empresa"
          name="company"
          value={formData.company}
          onChange={handleChange}
          error={clientErrors.company}
        />
      )}

      <Input
        label="CPF ou CNPJ"
        name="cpfCnpj"
        value={formData.cpfCnpj}
        onChange={handleChange}
        error={clientErrors.cpfCnpj}
      />

      <Input
        label="E-mail"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={clientErrors.email}
      />

      <Input
        label="Senha"
        name="password"
        type={showPwd ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        error={clientErrors.password}
        icon={showPwd ? FaEyeSlash : FaEye}
        onIconClick={() => setShowPwd(v=>!v)}
      />

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Enviando...' : 'Cadastrar'}
      </Button>
    </form>
  );
}
