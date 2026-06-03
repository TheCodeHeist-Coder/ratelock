import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import LandingPage from './screens/LandingPage'
import Dashboard from './screens/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
