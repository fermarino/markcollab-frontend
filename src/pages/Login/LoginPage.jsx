import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/auth/login', { identifier, password });
      console.log('Resposta completa:', response.data);
      const { token, role, cpf } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (cpf) {
        localStorage.setItem('cpf', cpf); // ✅ Armazena CPF somente se existir
      } else {
        console.warn('CPF não retornado no login. Verifique a resposta da API.');
      }

      navigate('/meusprojetos');
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link to="/" className={styles.back}>
          ← Voltar
        </Link>
      </div>

      <div className={styles.right}>
        <div className={styles.formWrapper}>
          <img src="/logo.png" alt="MarkCollab" className={styles.logo} />
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <Input
              icon={FaEnvelope}
              type="text"
              placeholder="Email"
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
            <Button type="submit">Login</Button>
          </form>
          <div className={styles.signup}>
            Ainda não possui uma conta? <Link to="/cadastro">Crie agora</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
