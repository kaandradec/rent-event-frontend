import { Button } from "@/components/ui/button"
import { DashboardMenu } from "@/components/DashboardMenu"
import { DashboardHeader } from "@/components/DashboardHeader";
import { useState } from "react";

export default function Dashboard() {

  const [selectedItemMenu, setSelectedItemMenu] = useState(0)

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
  <h1>Gestion de ordenes</h1>
  <p>Aqui se gestionan las ordenes de generación del evento del cliente</p>
</>)

const DashboardServices = () => (
  <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Inventario</h1>
    </div>
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          No existen servicios
        </h3>
        <p className="text-sm text-muted-foreground">
          Puedes agregar un nuevo servicio
        </p>
        <Button className="mt-4">Añadir servicio</Button>
      </div>
    </div>
  </main>
)

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






