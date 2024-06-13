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
import { RegisterClient } from './pages/client/RegisterClient'
import { ProtectedRoute } from './components/ProtectedRoute'
import {UserConfiguration} from "@/pages/client/UserConfiguration.tsx";
// import HeaderUser from './components/HeaderUser'

const USER_PATH = '/user'

function App() {
  return (
    <main>
      <BrowserRouter>
        <HeaderSelector />
        <Routes>
          <Route index element={<Landing />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/auth/login' element={<LoginClient />} />
          <Route path='/auth/register' element={<RegisterClient />} />
          <Route path='/date' element={<DatePickerDemo />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/date" element={<DatePickerDemo />} />
          <Route path={`/auth${USER_PATH}/register`} element={<RegisterUser />} />
          <Route path={`/auth${USER_PATH}/login`} element={<LoginUser />} />
          <Route path='/api/me' element={<UserConfiguration />} />

          <Route element={<ProtectedRoute />}>
            <Route path={`${USER_PATH}/dashboard`} element={<Dashboard />} />
          </Route>
          <Route path={`${USER_PATH}/analytics`} element={<Analytics />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

function HeaderSelector() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith(USER_PATH);

  return isAdminRoute ? "" : <Header />;
}

export default App
