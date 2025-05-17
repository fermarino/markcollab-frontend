import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Menu, X } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import MainLogo from '../../assets/img/logo_markcollab.png';
import { AuthContext } from '../../context/AuthContext'; 

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // tipo de usuário

  const { isLoggedIn, role } = useContext(AuthContext);

  if (isLoggedIn === null) return null;

  const getMeusProjetosPath = () => {
  if (userRole === 'freelancer') return '/meusprojetosf';
  if (userRole === 'employer') return '/meusprojetos';
  return '/';
};


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Decodificando o token JWT para extrair o tipo de usuário
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeJwt(token);
      setUserRole(user?.role.toLowerCase()); // Ex: "freelancer" ou "employer"
    } else {
      setUserRole(null);
    }
  }, []);
  

  
  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          <FaFacebookF />
          <FaInstagram />
        </div>
        <div className="topbar-right">
          <MdEmail size={18} />
          <span>atendimentomarkcollab@gmail.com</span>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="main-navbar">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <img src={MainLogo} alt="MarkCollab Logo" />
          </Link>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>

            {!isLoggedIn && (
              <>
                <li><Link to="/sobre">Sobre</Link></li>
                <li><Link to="/servicos">Serviços</Link></li>
              </>
            )}

            {isLoggedIn ? (
              <>
                <li><Link to={getMeusProjetosPath()}>Projetos</Link></li>
                <li><Link>Notificações</Link></li>
                
                <li><Link to="/perfil">Conta</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="btn outlined">Login</Link></li>
                <li><Link to="/cadastro" className="btn outlined">Cadastro</Link></li>
              </>
            )}
          </ul>

          <button className="menu-btn" onClick={toggleSidebar}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar mobile */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <ul onClick={closeSidebar}>
            <li><Link to="/">Home</Link></li>

            {!isLoggedIn && (
              <>
                <li><Link to="/sobre">Sobre</Link></li>
                <li><Link to="/servicos">Serviços</Link></li>
              </>
            )}

            {isLoggedIn ? (
              <>
                <li><Link to="/notificacoes">Notificações</Link></li>
                <li><Link to={getMeusProjetosPath()}>Meus Projetos</Link></li>
                <li><Link to="/perfil">Perfil</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/cadastro">Cadastro</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
