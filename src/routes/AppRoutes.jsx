import { Navigate, Route, Routes } from 'react-router-dom';
import BuscarProjetos from "../pages/BuscarProjetos/BuscarProjetos";
import FazerProposta from "../pages/FazerProposta/FazerProposta";
import MeusProjetosF from "../pages/MeusProjetosF/MeusProjetosF";
import RegisterPage from '../pages/Register/RegisterPage';
import EditProfile from '../pagesF/EditProfile'; // Importando o componente de edição
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/editprofile" element={<EditProfile />} /> {/* Nova rota adicionada */}
      <Route path="/buscarprojetos" element={<BuscarProjetos />} />
      <Route path="/fazerproposta" element={<FazerProposta />} />
      <Route path="/meusprojetos" element={<MeusProjetosF />} />
    </Routes>
  );
};

export default AppRoutes;
