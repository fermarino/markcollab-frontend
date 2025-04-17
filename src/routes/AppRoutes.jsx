import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from '../pages/Register/RegisterPage'
import ProjectEdit from '../pages/ProjectEdit/ProjectEdit'
import Publish from '../pages/Publish/Publish'
import Proposals from '../pages/Proposals/Proposals'
import MyProjects1 from '../pages/MyProjects1/MyProjects1'
import BuscarProjetos from "../pages/BuscarProjetos/BuscarProjetos";
import FazerProposta from "../pages/FazerProposta/FazerProposta";
import MeusProjetosF from "../pages/MeusProjetosF/MeusProjetosF";
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Services from '../pages/Services/Services'
import PersonalData from '../pages/PersonalData/PersonalData'
import Profile from '../pages/Profile/Profile'



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/servicos" element={<Services />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/ProjectEdit" />} />
      <Route path="/editarprojeto" element={<ProjectEdit />} />
      <Route path="/" element={<Navigate to="/Publish" />} />
      <Route path="/publicar" element={<Publish />} />
      <Route path="/" element={<Navigate to="/Proposals" />} />
      <Route path="/propostas" element={<Proposals />} />
      <Route path="/" element={<Navigate to="/MyProjects1" />} />
      <Route path="/meusprojetos" element={<MyProjects1 />} />
      <Route path="/buscarprojetos" element={<BuscarProjetos />} />
      <Route path="/fazerproposta" element={<FazerProposta />} />
      <Route path="/meusprojetosf" element={<MeusProjetosF />} />
      <Route path="/dadosPessoais" element={<PersonalData />} />
      <Route path="/perfil" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
