import { Navigate, Route, Routes } from 'react-router-dom';
import BuscarProjetos from "../pages/BuscarProjetos/BuscarProjetos";
import FazerProposta from "../pages/FazerProposta/FazerProposta";
import MeusProjetosF from "../pages/MeusProjetosF/MeusProjetosF";
import RegisterPage from '../pages/Register/RegisterPage';
import PersonalData from '../pages/PersonalData/PersonalData'
import Profile from '../pages/Profile/Profile'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cadastro" />} />
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
