import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import LandingPage from './screens/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
