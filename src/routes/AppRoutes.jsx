import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from '../pages/Register/RegisterPage'
import ProjectEdit from '../pages/ProjectEdit/ProjectEdit'
import Publish from '../pages/Publish/Publish'
import Proposals from '../pages/Proposals/Proposals'
import MyProjects1 from '../pages/MyProjects1/MyProjects1'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/ProjectEdit" />} />
      <Route path="/editarprojeto" element={<ProjectEdit />} />
      <Route path="/" element={<Navigate to="/Publish" />} />
      <Route path="/publicar" element={<Publish />} />
      <Route path="/" element={<Navigate to="/Proposals" />} />
      <Route path="/propostas" element={<Proposals />} />
      <Route path="/" element={<Navigate to="/MyProjects1" />} />
      <Route path="/meusprojetos" element={<MyProjects1 />} />
    </Routes>
  )
}

export default AppRoutes
