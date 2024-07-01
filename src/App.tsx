import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Dashboard from './pages/user/Dashboard'
import Landing from './pages/client/Landing'
import Analytics from './pages/user/Analytics'
import { LoginUser } from './pages/user/Login'
import { RegisterUser } from './pages/user/Register'
import { LoginClient } from './pages/client/LoginClient'
import { RegisterClient } from './pages/client/RegisterClient.tsx'
import { ProtectedRoute } from './components/ProtectedRoute'
import DevTool from './components/DevTool'
import { ClientConfiguration } from './pages/client/ClientConfiguration.tsx'
import DashboardServicesUpdate from './components/DashBoardServices/DashboardServicesUpdate.tsx'

import { About } from './pages/client/About.tsx'
import Services from './pages/client/Services.tsx'
import { ClientTelefonoConf } from "@/pages/client/ClientTelefonoConf.tsx";
import { ClientPassConf } from "@/pages/client/ClientPassConf.tsx";
import Cart from './pages/client/Cart.tsx'
import {ClienteRegionConf} from "@/pages/client/ClienteRegionConf.tsx";
import {ClientePreguntaSeguraConf} from "@/pages/client/ClientePreguntaSeguraConf.tsx";
import {RecuperarContrasenia} from "@/pages/client/RecuperarContrasenia.tsx";
import {CambiarPassPreguntaSegura} from "@/pages/client/CambiarPassPreguntaSegura.tsx";

const USER_PATH = '/user'

function App() {

    return (
        <main>
            <BrowserRouter>
                <Header />
                <Routes>
                    {/* Rutas de cliente */}
                    <Route index element={<Landing />} />
                    <Route path='/inicio' element={<Inicio />} />
                    <Route path='/auth/login' element={<LoginClient />} />
                    <Route path='/auth/recuperar-pass' element={<RecuperarContrasenia />} />
                    <Route path='/auth/cambiar-pass' element={<CambiarPassPreguntaSegura />} />
                    <Route path='/auth/register' element={<RegisterClient />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path={`/auth${USER_PATH}/register`} element={<RegisterUser />} />
                    <Route path={`/auth${USER_PATH}/login`} element={<LoginUser />} />
                    <Route path='/account/config' element={<ClientConfiguration />} />
                    <Route path='/account/config/genero' element={<ClientConfiguration />} />
                    <Route path='/account/config/telefono' element={<ClientTelefonoConf />} />
                    <Route path='/account/config/pass' element={<ClientPassConf />} />
                    <Route path='/account/config/region' element={<ClienteRegionConf />} />
                    <Route path='/account/config/pregunta-segura' element={<ClientePreguntaSeguraConf />} />

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

export default App
