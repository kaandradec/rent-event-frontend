import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Dashboard from './pages/user/Dashboard'
import Landing from './pages/client/Landing'
import Home from './pages/client/Home'
import Analytics from './pages/user/Analytics'
import { LoginUser } from './pages/user/Login'
import { RegisterUser } from './pages/user/Register'
import { LoginClient } from './pages/client/LoginClient'
import { RegisterClient } from './pages/client/RegisterClient.tsx'
import { ProtectedRoute } from './components/ProtectedRoute'
import DevTool from './components/DevTool'
import { ClientConfiguration } from './pages/client/ClientConfiguration.tsx'
import DashboardServicesUpdate from './components/DashBoardServices/DashboardServicesUpdate.tsx'
import HeaderPreLogin from "@/components/HeaderPreLogin";

import { About } from './pages/client/About.tsx'

const USER_PATH = '/user'

function App() {

    return (
        <main>
            <BrowserRouter>
                <HeaderSelector />
                <Routes>
                    {/* Rutas de cliente */}
                    <Route index element={<Landing />} />
                    <Route path='/inicio' element={<Inicio />} />
                    <Route path='/auth/login' element={<LoginClient />} />
                    <Route path='/auth/register' element={<RegisterClient />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/home" element={<Home />} />
                    <Route path={`/auth${USER_PATH}/register`} element={<RegisterUser />} />
                    <Route path={`/auth${USER_PATH}/login`} element={<LoginUser />} />
                    <Route path='/account/config' element={<ClientConfiguration />} />

                    {/* Rutas protegidas, solo acceso a usuario(Empleado)*/}
                    <Route element={<ProtectedRoute />}>
                        <Route path={`${USER_PATH}/dashboard`} element={<Dashboard />} />
                        <Route path={`${USER_PATH}/dashboard/services/update/:codigo`}
                            element={<DashboardServicesUpdate />} />
                    </Route>
                    <Route path={`${USER_PATH}/analytics`} element={<Analytics />} />
                </Routes>
            </BrowserRouter>
            <DevTool />
        </main>
    )
}

function HeaderSelector() {
    const location = useLocation();
    const pathName = location.pathname;

    const isAdminRoute = pathName.startsWith(USER_PATH);
    const isNotLoggedIn = pathName.startsWith("/auth" || "/inicio");
    // pathName.length==1 es "/"
    const isLanding = pathName.length == 1 || pathName.startsWith("/landing");

    return isAdminRoute ? "" : ((isNotLoggedIn || isLanding) ? <HeaderPreLogin /> : <Header />);
}

export default App
