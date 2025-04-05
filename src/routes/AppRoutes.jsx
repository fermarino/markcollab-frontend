import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from '../pages/Register/RegisterPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/cadastro" element={<RegisterPage />} />
    </Routes>
  )
}

export default AppRoutes
