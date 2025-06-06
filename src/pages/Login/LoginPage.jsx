import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import { AuthContext } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [identifier, setIdentifier] = useState('');
  const [password,   setPassword]   = useState('');
  const [showPwd,    setShowPwd]    = useState(false);
  const [error,      setError]      = useState('');
  const [loading,    setLoading]    = useState(false);
  const [success,    setSuccess]    = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/login', { identifier, password });
      const { token, role, cpf } = res.data;
      login(token, role);
      if (cpf) localStorage.setItem('cpf', cpf);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className={styles.page}>
          <SuccessMessage
            title="Login realizado!"
            text="Você está logado."
            linkText="Ir para o início"
            linkTo="/"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.left}>
            <h2>Conecte-se ao MarkCollab</h2>
            <p>Entre na sua conta para aproveitar todos os benefícios da plataforma MarkCollab.</p>
          </div>
          <div className={styles.right}>
            <h2>Entre na sua conta</h2>
            <form onSubmit={handleSubmit} noValidate className={styles.form}>
              <Input
                name="identifier"
                type="text"
                placeholder="Email, CPF ou Username"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                error={error && !password ? error : ''}
              />

              <Input
                name="password"
                type={showPwd ? 'text' : 'password'}
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={error && password ? error : ''}
                icon={showPwd ? FaEyeSlash : FaEye}
                onIconClick={() => setShowPwd(v => !v)}
              />

              <div className={styles.forgot}>
                <Link to="/esqueci-senha">Esqueci minha senha</Link>
              </div>

              {error && <div className={styles.serverError}>{error}</div>}

              <Button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className={styles.signup}>
              Ainda não possui uma conta?{' '}
              <Link to="/cadastro">Crie agora</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
