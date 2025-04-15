import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../pages/Register/RegisterPage';
import EditProfile from '../pagesF/EditProfile'; // Importando o componente de edição

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/editprofile" element={<EditProfile />} /> {/* Nova rota adicionada */}
    </Routes>
  );
};

export default AppRoutes;
