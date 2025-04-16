import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Menu, X } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import MainLogo from '../../assets/img/logo_markcollab.png'

const Navbar = ({ isLoggedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

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
            <img src= {MainLogo} alt="MarkCollab Logo" />
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
                <li><Link to="/notificacoes">Notificações</Link></li>
                <li><Link to="/perfil">Perfil</Link></li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="btn outlined">Login</Link>
                </li>
                <li>
                  <Link to="/cadastro" className="btn outlined">Cadastro</Link>
                </li>
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
