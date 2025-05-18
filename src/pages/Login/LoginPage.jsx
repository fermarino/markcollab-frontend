import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './LoginPage.module.css';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { identifier, password });
      const { token, role, cpf } = response.data;

      login(token, role);

      if (cpf) localStorage.setItem('cpf', cpf);

      navigate('/');
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.back}>← Voltar</Link>
        </div>
        <div className={styles.right}>
          <div className={styles.formWrapper}>
            <h2>Entre na sua conta</h2>
            <form onSubmit={handleLogin}>
              <Input
                icon={FaEnvelope}
                type="text"
                placeholder="Email, CPF ou Username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <Input
                icon={FaLock}
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={styles.forgot}>Esqueci a senha</div>
              {error && <div className={styles.error}>{error}</div>}
              <Button type="submit">Entrar</Button>
            </form>
            <div className={styles.signup}>
              Ainda não possui uma conta? <Link to="/cadastro">Crie agora</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
