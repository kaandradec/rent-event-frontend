import { DashboardMenu } from "@/components/DashboardMenu"
import { DashboardHeader } from "@/components/DashboardHeader";
import { useState } from "react";

import { DashboardServices } from "@/components/DashBoardServices/DashboardServices";

export default function Dashboard() {

  const [selectedItemMenu, setSelectedItemMenu] = useState(2)

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardMenu selectedItemMenu={selectedItemMenu} setSelectedItemMenu={setSelectedItemMenu} />
      <div className="flex flex-col">
        <DashboardHeader />
        {
          selectedItemMenu === 0 && <DashboardDashboard />
        }
        {
          selectedItemMenu === 1 && <DashboardOrders />
        }
        {
          selectedItemMenu === 2 && <DashboardServices />
        }
        {
          selectedItemMenu === 3 && <DashboardClients />
        }
        {
          selectedItemMenu === 4 && <DashboardIncidents />
        }
        {
          selectedItemMenu === 5 && <DashboardAnalytics />
        }
      </div>
    </div>
  )
}

// TODO: Crear ficheros para cada componente listado en el Dashboard ⬇️
const DashboardDashboard = () => (<>
  <h1>Panel General</h1>
  <p>Aqui se muestra el panel general de la aplicación</p>
</>)

const DashboardOrders = () => (<>
  <h1>PROXIMAMENTE: Gestion de ordenes</h1>
</>)

const DashboardClients = () => (<>
  <h1>Gestion de Clientes</h1>
  <p>Aqui se gestionan los clientes que contratan los eventos</p>
</>)


const DashboardIncidents = () => (<>
  <h1>Gestion de Incidencias</h1>
  <p>Aqui se gestionan las incidencias que se presentan en los eventos</p>
</>)

const DashboardAnalytics = () => (<>
  <h1>Analíticas</h1>
  <p>Aqui se muestran las analíticas de los eventos</p>
</>)






