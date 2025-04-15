import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from '../pages/Register/RegisterPage'
import PersonalData from '../pages/PersonalData/PersonalData'
import Profile from '../pages/Profile/Profile'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/dadosPessoais" element={<PersonalData />} />
      <Route path="/perfil" element={<Profile />} />

    </Routes>
  )
}

export default AppRoutes
