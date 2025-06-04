// src/AppRoutes.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../pages/Register/RegisterPage';
import ProjectEdit from '../pages/ProjectEdit/ProjectEdit';
import Publish from '../pages/Publish/Publish';
import Proposals from '../pages/Proposals/Proposals';
import MyProjectsEmployer from '../pages/MyProjectsEmployer/MyProjectsEmployer';
import SearchProjects from "../pages/SearchProjects/SearchProjects";
import SendProposal from "../pages/SendProposal/SendProposal";
import MyProjectsFreelancer from "../pages/MyProjectsFreelancer/MyProjectsFreelancer"; // <—
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import ServicesPage from '../pages/ServicesPage/ServicesPage';
import PersonalData from '../pages/PersonalData/PersonalData';
import Profile from '../pages/Profile/Profile';
import FreelancerProfile from '../pages/FreelancerProfile/FreelancerProfile';
import LoginPage from '../pages/Login/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/servicos" element={<ServicesPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/editarprojeto/:id" element={<ProjectEdit />} />
      <Route path="/publicar" element={<Publish />} />
      <Route path="/propostas/:projectId" element={<Proposals />} />
      <Route path="/meusprojetos" element={<MyProjectsEmployer />} />
      <Route path="/buscarprojetos" element={<SearchProjects />} />
      <Route path="/fazerproposta/:projectId" element={<SendProposal />} />
      <Route path="/meusprojetosfreelancer" element={<MyProjectsFreelancer />} /> {/* <— */}
      <Route path="/dadosPessoais" element={<PersonalData />} />

      {/* Rota para o próprio usuário logado */}
      <Route path="/perfil" element={<Profile />} />

      {/* Rota para visualizar perfil de outro freelancer */}
      <Route path="/perfilfreelancer/:cpf" element={<FreelancerProfile />} />
    </Routes>
  );
};

export default AppRoutes;
