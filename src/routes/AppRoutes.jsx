import { Navigate, Route, Routes } from 'react-router-dom';
import BuscarProjetos from "../pages/BuscarProjetos/BuscarProjetos";
import FazerProposta from "../pages/FazerProposta/FazerProposta";
import MeusProjetosF from "../pages/MeusProjetosF/MeusProjetosF";
import RegisterPage from '../pages/Register/RegisterPage';


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
      <Route path="/buscarprojetos" element={<BuscarProjetos />} />
      <Route path="/fazerproposta" element={<FazerProposta />} />
      <Route path="/meusprojetos" element={<MeusProjetosF />} />
      <Route path="/dadosPessoais" element={<PersonalData />} />
      <Route path="/perfil" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
