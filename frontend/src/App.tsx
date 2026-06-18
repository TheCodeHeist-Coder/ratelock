import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import LandingPage from './screens/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/dashboard/DashboardLayout'
import ProjectsList from './screens/Dashboard'
import ProjectDetail from './screens/ProjectDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* Authenticated app */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<ProjectsList />} />
            <Route path='projects/:projectId' element={<ProjectDetail />} />
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
