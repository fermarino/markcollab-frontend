import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import './Navbar.css';
import MainLogo from '../../assets/img/logo_markcollab.png';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, role } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(role);

  useEffect(() => setUserRole(role), [role]);

  const toggleSidebar = () => setSidebarOpen(o => !o);
  const closeSidebar = () => setSidebarOpen(false);

  const getProjetos = () =>
    userRole === 'freelancer' ? '/meusprojetosf' : '/meusprojetos';

  return (
    <>
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
      <nav className="main-navbar">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <img src={MainLogo} alt="MarkCollab Logo" />
          </Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {!isLoggedIn && <>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/servicos">Serviços</Link></li>
            </>}
            {isLoggedIn ? <>
              <li><Link to={getProjetos()}>Projetos</Link></li>
              <li><Link to="/notificacoes">Notificações</Link></li>
              <li><Link to="/perfil">Conta</Link></li>
            </> : <>
              <li><Link to="/login" className="btn outlined">Login</Link></li>
              <li><Link to="/cadastro" className="btn outlined">Cadastro</Link></li>
            </>}
          </ul>
          <button className="menu-btn" onClick={toggleSidebar}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} onClick={closeSidebar}>
          <ul>
            <li><Link to="/">Home</Link></li>
            {!isLoggedIn && <>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/servicos">Serviços</Link></li>
            </>}
            {isLoggedIn ? <>
              <li><Link to={getProjetos()}>Projetos</Link></li>
              <li><Link to="/notificacoes">Notificações</Link></li>
              <li><Link to="/perfil">Perfil</Link></li>
            </> : <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/cadastro">Cadastro</Link></li>
            </>}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
