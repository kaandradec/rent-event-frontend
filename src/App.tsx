import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { DatePickerDemo } from './components/DatePickerDemo'
import Inicio from './pages/Inicio'
import Dashboard from './pages/user/Dashboard'
import Landing from './pages/client/Landing'
import Home from './pages/client/Home'
import Analytics from './pages/user/Analytics'
import { LoginUser } from './pages/user/Login'
import { RegisterUser } from './pages/user/Register'
import { LoginClient } from './pages/client/LoginClient'
import HeaderUser from './components/HeaderUser'

const ADMIN_PATH = '/user'

function App() {
  return (
    <main>
      <BrowserRouter>
        <HeaderSelector />
        <Routes>
          <Route index element={<Landing />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/login' element={<LoginClient />} />
          <Route path='/date' element={<DatePickerDemo />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/date" element={<DatePickerDemo />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path={`${ADMIN_PATH}/login`} element={<LoginUser />} />
          <Route path={`${ADMIN_PATH}/dashboard`} element={<Dashboard />} />
          <Route path={`${ADMIN_PATH}/analytics`} element={<Analytics />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

function HeaderSelector() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith(ADMIN_PATH);

  return isAdminRoute ? <HeaderUser /> : <Header />;
}

export default App
