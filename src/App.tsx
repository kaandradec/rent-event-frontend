import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { DatePickerDemo } from './components/DatePickerDemo'
import Inicio from './pages/Inicio'
import Dashboard from './pages/administrativo/Dashboard'
import Landing from './pages/cliente/Landing'
import Home from './pages/cliente/Home'
import Analytics from './pages/administrativo/Analytics'
import LoginClient from './pages/administrativo/Login'
import { Register } from './pages/administrativo/Register'

function App() {

  const ADMIN_PATH = '/admin'

  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Landing />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginClient />} />
          <Route path="/date" element={<DatePickerDemo />} />
          <Route path={`${ADMIN_PATH}/dashboard`} element={<Dashboard />} />
          <Route path={`${ADMIN_PATH}/analytics`} element={<Analytics />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
